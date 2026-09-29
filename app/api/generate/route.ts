import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subject, grade, topic, numQ } = await req.json();

    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        exam: "❌ OPENAI_API_KEY is not set. Go to Vercel > Settings > Environment Variables > Add OPENAI_API_KEY and Redeploy." 
      });
    }

    const prompt = `You are an expert Kenyan CBC curriculum exam setter, fully KICD compliant.

Task: Create a ${grade} ${subject} exam.
Topic: ${topic}
Number of Questions: ${numQ}
Level: ${grade} in Kenya

Requirements:
1. Format like official Kenyan exam: School header, Subject, Class, Time, Instructions
2. Include different types: Multiple choice, Short answer, Application, Critical Thinking
3. Marks for each question (e.g. 4 marks, 6 marks)
4. Use Kenyan context: names like Otieno, Wafula, Njeri, places like Mumias, Kisumu, Nairobi
5. CBC Competency Based - include skills: Communication, Critical Thinking, Creativity
6. For Kiswahili subject, write in Kiswahili
7. At the end, provide a brief marking scheme / answer guide

Make it professional and ready to print.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a Kenyan CBC KICD exam setter." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return NextResponse.json({ 
        exam: `OpenAI Error: ${data.error?.message || "Failed"}. Check your API key has credit at platform.openai.com` 
      });
    }

    const exam = data.choices?.[0]?.message?.content || "No content returned from AI.";

    return NextResponse.json({ exam });

  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json({ 
      exam: `Server Error: ${error.message}. Make sure OPENAI_API_KEY is set in Vercel and you redeployed.` 
    }, { status: 500 });
  }
}
