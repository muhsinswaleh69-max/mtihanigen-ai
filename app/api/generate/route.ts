import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, grade, topic, numQ } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ exam: "ERROR: GROQ_API_KEY missing in Vercel Settings." });
  }

  const isKiswahili = subject.toLowerCase().includes("kiswahili");

  const prompt = isKiswahili ? `
Wewe ni mtunzi wa mitihani wa CBC KICD Kenya.
Tunga mtihani wa ${grade} ${subject}.
Mada: ${topic}
Idadi ya maswali: ${numQ}

MASHARTI:
- Fuata kikamilifu mtaala wa KICD wa ${grade} ${subject}
- Tumia muktadha wa Kenya: majina kama Njeri, Otieno, Mumias, Kisumu
- Format lazima iwe hivi:

KISWAHILI - ${grade.toUpperCase().replace("GRADE", "GREDI YA")}
MUDA: SAA 1 NA DAKIKA 30

SWALI LA 1 (ALAMA 5)
[Swali]

SWALI LA 2 (ALAMA 6)
[Swali]

MUHIMU:
- Andika maelekezo YOTE kwa Kiswahili sanifu
- USITUMIE * # | - maandishi matupu tu
- Vichwa kama Uchunguzi Kifani, Insha andika kwa HERUFI KUBWA: UCHUNGUZI KIFANI:
` : `
You are a Kenyan CBC KICD exam setter.
Generate a ${grade} ${subject} exam.
Topic: ${topic}
Number of questions: ${numQ}

REQUIREMENTS:
- Strictly follow KICD syllabus for ${grade} ${subject}
- Use Kenyan context: names like Njeri, Otieno, Mumias, Kisumu
- Format:

${subject.toUpperCase()} - ${grade.toUpperCase()}
TIME: 1 HR 30 MINS

QUESTION 1 (5 MARKS)
[Question]

QUESTION 2 (6 MARKS)
[Question]

IMPORTANT:
- All instructions in English
- Do NOT use * # | - plain text only. CAPS for headings like CASE STUDY:
`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ exam: `GROQ API ERROR: ${JSON.stringify(data)}` });
    }
    const exam = data.choices?.[0]?.message?.content || "Failed to generate exam.";
    return NextResponse.json({ exam });
  } catch (err: any) {
    return NextResponse.json({ exam: `SERVER ERROR: ${err.message}` }, { status: 500 });
  }
}
