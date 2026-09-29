import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, grade, topic, numQ } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ exam: "ERROR: GROQ_API_KEY is missing in Vercel Settings." });
  }

  const prompt = `You are a Kenyan CBC KICD exam setter.
Generate a ${grade} ${subject} exam.
Topic: ${topic}
Number of questions: ${numQ}

REQUIREMENTS:
- Strictly follow Kenya CBC KICD syllabus for ${grade} ${subject}
- Use Kenyan context: names like Njeri, Otieno, Mumias, Kisumu
- Format:
${subject.toUpperCase()} - ${grade.toUpperCase()}
TIME: 1 HR 30 MINS

QUESTION 1 (5 MARKS)
[Question text]

IMPORTANT:
- Do NOT use * or ** or # or |
- No markdown. Plain text only. Use CAPS for headings like CASE STUDY:
`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
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
