import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, grade, topic, numQ, examType, difficulty, structure } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ exam: "ERROR: GROQ_API_KEY missing in Vercel Settings." });
  }

  const isKiswahili = subject.toLowerCase().includes("kiswahili");
  const isDiagramSubject = ["science", "mathematics", "math", "biology", "chemistry", "physics", "agriculture", "geography", "pre-technical", "home science", "creative"].some(s => subject.toLowerCase().includes(s));

  const diagramCount = Math.ceil(Number(numQ) / 4);
  const diagramInstruction = isDiagramSubject? `
DIAGRAM RULE (KICD STANDARD - MANDATORY):
- You MUST include EXACTLY ${diagramCount} to ${diagramCount+1} diagrams.
- Write each diagram on its own line like: [DIAGRAM: clear black and white line drawing of X, labelled A,B,C, exam friendly, KICD style]
- Examples:
[DIAGRAM: Simple electric circuit with battery, bulb and switch, black and white line drawing labelled]
[DIAGRAM: Bean plant showing root, stem, leaves, labelled for primary school]
[DIAGRAM: Right angled triangle with base 6cm height 8cm]
- Diagrams must be simple, black & white, no shading, photocopy friendly.
- Place diagrams close to relevant questions.
` : `
DIAGRAM RULE: If helpful, include 1 simple diagram using format [DIAGRAM: description]
`;

  const prompt = isKiswahili? `
Wewe ni mtunzi wa mitihani wa KICD CBC Kenya.
Tunga mtihani wa ${grade} ${subject}.
Mada: ${topic}
Aina: ${examType}, Ugumu: ${difficulty}, Muundo: ${structure}
Idadi ya maswali: ${numQ}
${diagramInstruction}

MASHARTI:
- Fuata mtaala wa KICD
- Muktadha wa Kenya: Mumias, Kisumu, Njeri, Otieno
- Format:

KISWAHILI - GREDI YA ${grade.replace("Grade ","")}
MUDA: ${examType==="End term"?"DAKIKA 40":"SAA 1 NA DAKIKA 30"}
MAELEKEZO: Jibu maswali YOTE

SEHEMU A: MASWALI YA KUCHAGUA
1. [Swali]
[DIAGRAM: kama inahitajika]

MUHIMU: Kiswahili sanifu tu, maandishi matupu, USITUMIE * # |
` : `
You are a Kenyan KICD CBC exam setter.
Grade: ${grade}, Subject: ${subject}, Topics: ${topic}
Exam Type: ${examType}, Difficulty: ${difficulty}, Structure: ${structure}, Questions: ${numQ}
${diagramInstruction}

REQUIREMENTS:
- Follow KICD CBC syllabus strictly
- Kenyan context: Mumias Primary, Njeri, Otieno
- Format:

${subject.toUpperCase()} - ${grade.toUpperCase()}
TIME: ${examType==="End term"?"40 MINUTES":"1 HR 30 MINS"}
INSTRUCTIONS: Answer ALL questions.

SECTION A: MULTIPLE CHOICE QUESTIONS (${Math.ceil(Number(numQ)*0.6)} MARKS)
1. Which of the following...
[DIAGRAM: description]
A. B. C. D.

SECTION B: SHORT ANSWER QUESTIONS

IMPORTANT: Plain text only, NO markdown * # |, use CAPS for headings.
`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: "openai/gpt-oss-20b", messages: [{ role: "user", content: prompt }], temperature: 0.7 }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ exam: `GROQ ERROR: ${JSON.stringify(data)}` });
    return NextResponse.json({ exam: data.choices?.[0]?.message?.content || "Failed" });
  } catch (err: any) {
    return NextResponse.json({ exam: `SERVER ERROR: ${err.message}` }, { status: 500 });
  }
}
