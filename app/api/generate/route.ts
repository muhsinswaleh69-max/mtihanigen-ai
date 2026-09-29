import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subject, grade, topic, numQ, examType, difficulty, structure, schoolName } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ exam: "ERROR: GROQ_API_KEY is missing in Vercel > Settings > Environment Variables. Add it and Redeploy." });
    }

    const isKiswahili = subject.toLowerCase().includes("kiswahili");
    const isDiagramSubject = ["science", "math", "bio", "chem", "phys", "agri", "geography", "pre-technical", "home science"].some(s => subject.toLowerCase().includes(s));
    const diagramCount = Math.ceil(Number(numQ) / 5);

    const diagramInstruction = isDiagramSubject ? `
DIAGRAM RULE: You MUST include ${diagramCount} diagrams. Format each on its own line EXACTLY as:
[DIAGRAM: clear black and white line drawing of pendulum with pivot A, string B, bob C labelled]
` : `If helpful include 1 diagram as [DIAGRAM: description]`;

    const prompt = isKiswahili ? `
Wewe ni mwalimu wa KICD CBC Kenya wa ${schoolName || 'shule'}.
Tunga mtihani wa ${grade} somo ${subject}.
Mada za kufundishia (usizichapishe): ${topic}
Idadi ya maswali: ${numQ}
Aina ya maswali: ${structure} - Multiple Choice ni A,B,C,D. Structured ni maswali mafupi. Mixed ni mchanganyiko.
Ugumu: ${difficulty} (usiandike ugumu kwenye karatasi)
${diagramInstruction}

MUHIMU:
- Andika kwa Kiswahili sanifu PEKEE
- Usianndike Topic au Difficulty kwenye karatasi
- Format:
SEHEMU A: MASWALI YA KUCHAGUA
1. ...
A. B. C. D.

[DIAGRAM: kama inahitajika]

SEHEMU B: MASWALI MAFUPI
` : `
You are a Kenyan KICD CBC exam setter for ${schoolName || 'school'}.
Grade: ${grade}, Subject: ${subject}
Internal Topics (DO NOT PRINT TOPICS OR DIFFICULTY ON PAPER): ${topic}
Number of questions: ${numQ}
Question structure: ${structure} - Multiple Choice = A,B,C,D options. Structured = short answer. Mixed = both.
Difficulty: ${difficulty} (DO NOT PRINT difficulty level on exam paper)
${diagramInstruction}

REQUIREMENTS:
- Follow KICD CBC syllabus
- Kenyan context: use names like Otieno, Njeri
- DO NOT write Topic or Difficulty on the paper itself
- Format:
SECTION A: MULTIPLE CHOICE QUESTIONS
1. ...
A. B. C. D.

[DIAGRAM: if needed]

SECTION B: SHORT ANSWER QUESTIONS
- Plain text only, no * # symbols
`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // FIXED - working Groq model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error("GROQ ERROR:", data);
      return NextResponse.json({ exam: `GROQ ERROR: ${data.error?.message || JSON.stringify(data)}` });
    }

    const examText = data.choices?.[0]?.message?.content;
    if (!examText) {
      return NextResponse.json({ exam: "Failed: Empty response from AI. Try again with fewer questions (e.g. 20)." });
    }

    return NextResponse.json({ exam: examText });

  } catch (err: any) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ exam: `SERVER ERROR: ${err.message}` }, { status: 500 });
  }
}
