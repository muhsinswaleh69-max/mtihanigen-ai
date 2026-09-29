import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, grade, topic, numQ } = await req.json();

  const prompt = `You are an expert Kenyan CBC curriculum exam setter, KICD compliant.
Create a ${grade} ${subject} exam, Topic: ${topic}, ${numQ} questions.
Format: Official Kenyan exam style, with Marks, Competency-based, Application and Critical Thinking.
Use Swahili where relevant for Kiswahili subject. Provide marking scheme at end.
Language: Clear, for ${grade} level in Kenya.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });
    const data = await res.json();
    const exam = data.choices?.[0]?.message?.content || "Failed to generate. Try again.";
    return NextResponse.json({ exam });
  } catch (e) {
    return NextResponse.json({ exam: "Error connecting to AI. Check API key." }, { status: 500 });
  }
}
