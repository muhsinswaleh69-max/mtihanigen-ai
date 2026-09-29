import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subject, grade, topic, numQ } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        exam: "❌ GROQ_API_KEY is not set in Vercel. Go to Vercel > Settings > Environment Variables > Add GROQ_API_KEY."
      });
    }

    const prompt = `You are an expert Kenyan CBC KICD exam setter, fully compliant.
Task: Create a ${grade} ${subject} exam.
Topic: ${topic}
Number of Questions: ${numQ}

Requirements:
1. Official Kenyan exam format: School Header, Subject, Class, Time, Instructions
2. Use Kenyan context: names Otieno, Wafula, Njeri, Akinyi, places Mumias, Kisumu
3. CBC Competency Based - critical thinking, creativity
4. Marks for each question
5. At the end provide marking scheme
6. Professional ready to print
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "You are a Kenyan CBC KICD exam setter. Create high quality exams." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);
      return NextResponse.json({ exam: `Groq Error: ${JSON.stringify(data)}` });
    }

    const exam = data.choices?.[0]?.message?.content || "No content returned from AI.";
    return NextResponse.json({ exam });

  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json({ exam: `Server Error: ${error.message}` }, { status: 500 });
  }
}
