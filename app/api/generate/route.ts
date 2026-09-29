import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, grade, topic, numQ } = await req.json();

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
[Question]

IMPORTANT FORMATTING RULES:
- Do NOT use asterisks * or ** for bold
- Do NOT use hash #
- Do NOT use pipe |
- Do NOT use markdown at all
- Write QUESTION in caps and marks in brackets, plain text only
- For subheadings like Case Study, Essay, Analysis, just write them in CAPS with colon: CASE STUDY:
`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const exam = data.choices?.[0]?.message?.content || "Failed to generate exam.";
    return NextResponse.json({ exam });
  } catch (err) {
    return NextResponse.json({ exam: "Error generating exam." }, { status: 500 });
  }
}
