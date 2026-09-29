"use client";
import { useState, useEffect } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 2": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 3": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 4": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 5": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 6": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 7": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 8": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 9": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 10": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture"],
  "Grade 11": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture"],
  "Grade 12": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture"],
};

export default function Home() {
  const [grade, setGrade] = useState("Grade 7");
  const [subject, setSubject] = useState("Integrated Science");
  const [topics, setTopics] = useState(["Energy", "Forces", "Environment"]);
  const [topicInput, setTopicInput] = useState("");
  const [examType, setExamType] = useState("End term");
  const [difficulty, setDifficulty] = useState("Medium");
  const [structure, setStructure] = useState("Mixed");
  const [numQ, setNumQ] = useState(10);
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { setSubject(subjectsByGrade[grade][0]); }, [grade]);

  const addTopic = () => {
    if (topicInput.trim() &&!topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput("");
    }
  };
  const removeTopic = (t: string) => setTopics(topics.filter(x => x!== t));

  const generateExam = async () => {
    setLoading(true); setExam("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject, grade,
          topic: topics.join(", ") || "all topics",
          numQ, examType, difficulty, structure
        }),
      });
      const data = await res.json();
      setExam(data.exam);
    } catch (e) { setExam("Error generating exam."); }
    setLoading(false);
  };

  const formatExam = (text: string) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
     .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
     .replace(/\*\*/g, '').replace(/\*/g, '')
     .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      {/* HEADER */}
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🧠</div>
          <h1 className="text-2xl font-bold">MtihaniGen AI</h1>
          <span className="bg-[#7de2e6] text-[#0d3d4f] text-xs px-3 py-1 rounded-full font-bold ml-2">AI EXAM GENERATOR</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>🔔 ⚙️</span>
          <span className="font-bold">Teacher Jane<br/><span className="font-normal text-xs">Mumias Primary</span></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-2 gap-6 mt-4">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <p className="text-gray-500 text-sm mb-6">Configure exam parameters to generate KCSE CBC compliant questions</p>

          <label className="text-sm font-bold">Class</label>
          <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2 rounded-lg mb-4 mt-1 bg-gray-50">
            {Object.keys(subjectsByGrade).map(g => <option key={g}>{g}</option>)}
          </select>

          <label className="text-sm font-bold">Subject</label>
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2 rounded-lg mb-4 mt-1 bg-gray-50">
            {subjectsByGrade[grade].map(s => <option key={s}>{s}</option>)}
          </select>

          <label className="text-sm font-bold">Topic</label>
          <div className="flex gap-2 mt-1 mb-2">
            <input value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Add topic" className="flex-1 border p-2 rounded-lg bg-gray-50" />
            <button onClick={addTopic} className="bg-[#0d3d4f] text-white px-4 rounded-lg">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map(t => (
              <span key={t} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {t} <button onClick={()=>removeTopic(t)}>×</button>
              </span>
            ))}
          </div>

          <label className="text-sm font-bold">Exam Type</label>
          <div className="flex gap-2 mb-4 mt-1">
            {["Opener","Mid-term","End term"].map(type => (
              <button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm ${examType===type?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{type}</button>
            ))}
          </div>

          <label className="text-sm font-bold">Difficulty</label>
          <div className="flex gap-2 mb-4 mt-1">
            {["Easy","Medium","Hard"].map(d => (
              <button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm ${difficulty===d?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{d}</button>
            ))}
          </div>

          <label className="text-sm font-bold">Structure</label>
          <div className="flex gap-2 mb-4 mt-1">
            {["Multiple Choice","Structured","Mixed"].map(s => (
              <button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm ${structure===s?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{s}</button>
            ))}
          </div>

          <label className="text-sm font-bold">Number of Questions</label>
          <div className="flex items-center gap-2 mt-1 mb-6">
            <button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-8 h-8 rounded">−</button>
            <span className="border px-4 py-1 rounded bg-white">{numQ}</span>
            <button onClick={()=>setNumQ(numQ+1)} className="border w-8 h-8 rounded">+</button>
          </div>

          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg">
            {loading? "Generating..." : "✨ Generate Exam"}
          </button>

          <div className="bg-blue-50 p-3 rounded-lg mt-4 text-sm">
            💡 AI Credits remaining: 12 / 20<br/>
            <a className="text-blue-600 font-bold">View generation history →</a>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold">Generated Exam Preview</h2>
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Generated • Ready</span>
              <button className="border text-sm px-3 py-1 rounded-lg">⬇ Download PDF</button>
              <button className="border text-sm px-3 py-1 rounded-lg">✏️ Edit</button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 min-h-[700px]">
            <div className="bg-white p-6 rounded-xl shadow-lg border relative">
              <div className="absolute top-0 right-0 text-gray-200 text-5xl rotate-[-20deg] opacity-20 font-bold mt-32 mr-10">DRAFT MtihaniGen AI</div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 font-bold text-[#0d3d4f]">
                  <span className="text-2xl">🇰🇪</span> MUMIAS PRIMARY SCHOOL
                </div>
                <div className="w-12 h-12 bg-black">QR</div>
              </div>

              <h3 className="text-center font-bold text-lg text-[#0d3d4f] mb-1">GRADE {grade.replace("Grade ","")} {subject.toUpperCase()} — EXAM PAPER</h3>
              <p className="text-center text-xs text-gray-600 mb-4">
                Strand: {topics.join(" | ")} | KCSE CBC Competency-Based Curriculum | {difficulty} Difficulty | {numQ} Questions | Duration: {examType==="End term"?"40 Minutes":"1 HR 30 MINS"}
              </p>

              <div className="bg-blue-50 p-2 rounded text-xs mb-4">
                <strong>Instructions:</strong> Answer ALL questions. Each question carries 1 mark. Choose the best answer where applicable.
              </div>

              {!exam && <p className="text-gray-400 text-sm text-center mt-20">Click Generate Exam to see preview here</p>}

              {exam && <div className="text-sm leading-6" dangerouslySetInnerHTML={{ __html: formatExam(exam) }} />}

              <div className="text-[9px] text-gray-500 mt-8 border-t pt-2 flex justify-between">
                <span>Generated by MtihaniGen AI • {new Date().toLocaleDateString()} • Document ID: MG-AI-EX-G7-SCI-ENERGY-0929</span>
                <span>Scan to verify authenticity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
