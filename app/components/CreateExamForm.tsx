"use client";
import { useState } from "react";

const SUBJECTS = ["English", "Kiswahili", "Mathematics", "Science & Technology", "Social Studies", "CRE", "Agriculture", "Creative Arts"];
const CLASSES = ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
const TOPICS: any = {
  "Mathematics": ["Fractions", "Decimals", "Algebra", "Geometry", "Measurement", "Money", "Time"],
  "English": ["Grammar", "Comprehension", "Composition", "Vocabulary", "Functional Writing"],
  "Science & Technology": ["Living Things", "Matter", "Energy", "Human Body", "Environment"],
  "Social Studies": ["People and Population", "Culture", "Resources", "Governance"],
  "Kiswahili": ["Sarufi", "Ufahamu", "Insha", "Msamiati"]
};

export default function CreateExamForm() {
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 7");
  const [topic, setTopic] = useState("Fractions");
  const [numQ, setNumQ] = useState(10);
  const [generating, setGenerating] = useState(false);
  const [exam, setExam] = useState("");

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setExam(`MITIHANIGEN AI - OFFICIAL EXAM
Subject: ${subject} | Class: ${grade} | Topic: ${topic} | Questions: ${numQ}
CBC / KICD Compliant - Competency Based

INSTRUCTIONS: Answer all questions.

1. Define ${topic} and give two real-life examples from Kenya. (4 marks)

2. A Grade 7 learner in Mumias has... (Application question about ${topic}) Explain your answer. (6 marks)

3. Differentiate between... related to ${topic}. (5 marks)

4. Solve: [AI Generated ${subject} problem for ${grade} level - ${topic}]

5. Critical Thinking: How does ${topic} help in your community? Give 3 points. (6 marks)

... and ${numQ - 5} more questions...

---
[DEMO MODE] To make it real AI: Connect OpenAI API key in next step. M-Pesa payment unlocks PDF download.
`);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-5">
      <h2 className="font-bold text-lg text-[#1e3a5f]">Create Exam</h2>

      <div>
        <label className="text-sm font-medium">Subject</label>
        <select value={subject} onChange={e=>{setSubject(e.target.value); setTopic((TOPICS[e.target.value]||["General"])[0])}} className="w-full mt-1 border rounded-xl p-3 bg-white">
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
        {generating? "Generating with AI..." : "✨ Generate Exam with AI"}
      </button>

      {exam && (
        <div className="mt-2 space-y-3">
          <div className="bg-[#f3f6fa] rounded-xl p-4 whitespace-pre-wrap text-sm font-mono border max-h-[400px] overflow-auto">{exam}</div>
          <button className="w-full bg-green-600 text-white rounded-xl p-3 font-semibold hover:bg-green-700">
            Pay 50 KES with M-Pesa to Download PDF
          </button>
          <p className="text-[11px] text-gray-500 text-center">M-Pesa Daraja API will be connected next</p>
        </div>
      )}
    </div>
  );
}
