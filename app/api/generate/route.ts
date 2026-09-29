import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subject, grade, topic, numQ, examType, difficulty, structure, schoolName } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ exam: "ERROR: GROQ_API_KEY missing in Vercel > Settings > Environment Variables" });
    }

    const isKiswahili = subject.toLowerCase().includes("kiswahili");
    const isDiagramSubject = ["science", "math", "bio", "chem", "phys", "agri", "geography"].some(s => subject.toLowerCase().includes(s));
    const diagramCount = Math.ceil(Number(numQ) / 5);

    const diagramInstruction = isDiagramSubject? `
DIAGRAM RULE: Include ${diagramCount} diagrams as: [DIAGRAM: clear black and white drawing of X labelled A,B,C]
` : ``;

    const prompt = isKiswahili? `
Wewe ni mwalimu wa KICD CBC Kenya wa ${schoolName}.
Tunga mtihani wa ${grade} ${subject}.
Mada za ndani (usizichapishe): ${topic}
Maswali: ${numQ}, Aina: ${structure}, Ugumu: ${difficulty} (usichapishe ugumu)
${diagramInstruction}
Andika Kiswahili sanifu tu. Usianndike Topic au Difficulty.
Format: SEHEMU A: MASWALI YA KUCHAGUA, kisha SEHEMU B
` : `
You are KICD CBC exam setter for ${schoolName}.
Grade: ${grade}, Subject: ${subject}, Internal Topics (DO NOT PRINT): ${topic}
Questions: ${numQ}, Structure: ${structure}, Difficulty: ${difficulty} (DO NOT PRINT DIFFICULTY)
${diagramInstruction}
Kenyan context. Plain text only. Do not print Topic or Difficulty.
Format: SECTION A: MULTIPLE CHOICE, SECTION B: SHORT ANSWER
`;

    // Groq models - tries in order until one works
    const MODELS = [
      "llama-3.3-70b-versatile",
      "llama3-70b-8192",
      "llama3-8b-8192",
      "mixtral-8x7b-32768",
      "gemma2-9b-it"
    ];

    let lastError = "";
    for (const model of MODELS) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 4000
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          lastError = `${model}: ${data.error?.message || JSON.stringify(data)}`;
          continue; // try next model
        }
        const text = data.choices?.[0]?.message?.content;
        if (text) return NextResponse.json({ exam: text });
      } catch (e: any) {
        lastError = e.message;
        continue;
      }
    }

    return NextResponse.json({ exam: `GROQ ERROR: All models failed. Last error: ${lastError}. Go to console.groq.com > API Keys > Check your key is valid and has credits.` });

  } catch (err: any) {
    return NextResponse.json({ exam: `SERVER ERROR: ${err.message}` }, { status: 500 });
  }
}
