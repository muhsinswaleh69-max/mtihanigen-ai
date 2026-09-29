import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subject, grade, topic, numQ, examType, difficulty, structure, schoolName } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ exam: "ERROR: GROQ_API_KEY missing in Vercel" });
    }

    const isKiswahili = subject.toLowerCase().includes("kiswahili");
    const isDiagram = ["science","math","bio","chem","phys"].some(s=>subject.toLowerCase().includes(s));

    const prompt = isKiswahili? `
Wewe ni mwalimu wa KICD ${schoolName}. Tunga mtihani wa ${grade} ${subject}.
Mada za ndani (usizichapishe): ${topic}
Maswali: ${numQ}, Aina: ${structure}
${isDiagram?`Include ${Math.ceil(numQ/5)} diagrams as [DIAGRAM: description]`:""}
Kiswahili sanifu tu. Usichapishe Topic au Difficulty.
` : `
You are KICD teacher for ${schoolName}. Grade ${grade} Subject ${subject}
Internal topics (DO NOT PRINT): ${topic}
Questions: ${numQ} Structure: ${structure} Difficulty: ${difficulty} (DO NOT PRINT difficulty)
${isDiagram?`Include ${Math.ceil(numQ/5)} diagrams as [DIAGRAM: description]`:""}
Kenyan context. Plain text.
`;

    // NEW FREE MODELS as of Sept 2026
    const MODELS = [
      "openai/gpt-oss-20b",
      "openai/gpt-oss-120b",
      "meta-llama/llama-4-scout-17b-16e-instruct",
      "qwen/qwen3-32b",
      "llama-3.2-90b-vision-preview"
    ];

    let lastErr = "";
    for (const model of MODELS) {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
        body: JSON.stringify({ model, messages:[{role:"user",content:prompt}], temperature:0.7, max_tokens:4000 })
      });
      const d = await r.json();
      if (!r.ok) { lastErr = `${model}: ${d.error?.message}`; continue; }
      if (d.choices?.[0]?.message?.content) return NextResponse.json({ exam: d.choices[0].message.content });
    }
    return NextResponse.json({ exam: `GROQ ERROR: All models failed. Last: ${lastErr}. Check console.groq.com/docs/models for current free models.` });
  } catch (e:any) {
    return NextResponse.json({ exam: `SERVER ERROR: ${e.message}` }, {status:500});
  }
}
