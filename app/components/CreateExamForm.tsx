"use client";
import { useState } from "react";

const SUBJECTS = ["English", "Kiswahili", "Mathematics", "Science & Technology", "Social Studies", "CRE", "Agriculture", "Creative Arts"];
const CLASSES = ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
const TOPICS: any = {
  "Mathematics": ["Fractions", "Decimals", "Algebra", "Geometry", "Measurement", "Money", "Time"],
  "English": ["Grammar", "Comprehension", "Composition", "Vocabulary", "Functional Writing"],
  "Science & Technology": ["Living Things", "Matter", "Energy", "Human Body", "Environment"],
  "Social Studies": ["People and Population", "Culture", "Resources", "Governance"],
  "Kiswahili": ["Sarufi", "Ufahamu", "Insha", "Msamiati"],
  "CRE": ["Creation", "Bible", "Christian Values"],
  "Agriculture": ["Crops", "Livestock", "Soil", "Conservation"],
  "Creative Arts": ["Music", "Art", "Drama"]
};

export default function CreateExamForm() {
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 7");
  const [topic, setTopic] = useState("Fractions");
  const [numQ, setNumQ] = useState(10);
  const [generating, setGenerating] = useState(false);
  const [exam, setExam] = useState("");

  const generate = async () => {
    setGenerating(true);
    setExam("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, grade, topic, numQ })
      });
      const data = await res.json();
      setExam(data.exam || "Failed to generate. Check API key in Vercel.");
    } catch (error) {
      setExam("Error: Could not connect to AI. Make sure OPENAI_API_KEY is set in Vercel Environment Variables and you redeployed.");
    }
    setGenerating(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-5">
      <h2 className="font-bold text-lg text-[#1e3a5f]">Create Exam (Real AI)</h2>

      <div>
        <label className="text-sm font-medium">Subject</label>
        <select value={subject} onChange={e=>{setSubject(e.target.value); const newTopics = TOPICS[e.target.value] || ["General"]; setTopic(newTopics[0]);}} className="w-full mt-1 border rounded-xl p-3 bg-white">
          {SUBJECTS.map(s=> <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Class</label>
          <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full mt-1 border rounded-xl p-3 bg-white">
            {CLASSES.map(c=> <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Topic</label>
          <select value={topic} onChange={e=>setTopic(e.target.value)} className="w-full mt-1 border rounded-xl p-3 bg-white">
            {(TOPICS[subject] || ["General"]).map((t:string)=> <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Number of Questions: {numQ}</label>
        <input type="range" min={5} max={30} value={numQ} onChange={e=>setNumQ(Number(e.target.value))} className="w-full mt-2" />
      </div>

      <button onClick={generate} disabled={generating} className="w-full bg-[#1e3a5f] text-white rounded-xl p-3 font-semibold hover:bg-[#17314f] disabled:opacity-50">
        {generating? "🤖 AI is generating CBC exam..." : "✨ Generate Real Exam with AI"}
      </button>

      {exam && (
        <div className="mt-2 space-y-3">
          <div className="bg-[#f3f6fa] rounded-xl p-4 whitespace-pre-wrap text-sm font-mono border max-h-[500px] overflow-auto">{exam}</div>
          <button className="w-full bg-green-600 text-white rounded-xl p-3 font-semibold hover:bg-green-700">
            Pay 50 KES with M-Pesa to Download PDF
          </button>
          <p className="text-[11px] text-gray-500 text-center">Real AI connected via /api/generate</p>
        </div>
      )}
    </div>
  );
}
