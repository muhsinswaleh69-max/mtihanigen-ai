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

function RealDiagram({ desc, figNum }: { desc: string, figNum: number }) {
  const d = desc.toLowerCase();
  let svg = null;

  if (d.includes("lever") || d.includes("fulcrum")) {
    svg = (
      <svg viewBox="0 0 300 120" className="w-full h-[140px]">
        <line x1="20" y1="60" x2="280" y2="60" stroke="black" strokeWidth="3" />
        <path d="M140 60 L150 90 L130 90 Z" fill="black" />
        <rect x="220" y="35" width="40" height="25" fill="none" stroke="black" strokeWidth="2" />
        <text x="240" y="30" fontSize="12" fontWeight="bold">A</text>
        <text x="10" y="30" fontSize="12" fontWeight="bold">B</text>
        <text x="140" y="110" fontSize="12" fontWeight="bold">C</text>
        <text x="235" y="52" fontSize="10">Load</text>
        <text x="5" y="52" fontSize="10">Effort</text>
      </svg>
    );
  } else if (d.includes("incline") || d.includes("block") || d.includes("slide")) {
    svg = (
      <svg viewBox="0 0 300 120" className="w-full h-[140px]">
        <line x1="20" y1="100" x2="280" y2="20" stroke="black" strokeWidth="3" />
        <line x1="20" y1="100" x2="280" y2="100" stroke="black" strokeWidth="1" strokeDasharray="5 5" />
        <rect x="200" y="35" width="30" height="20" fill="black" stroke="black" />
        <text x="100" y="80" fontSize="12">Potential → Kinetic</text>
      </svg>
    );
  } else if (d.includes("circuit") || d.includes("battery") || d.includes("bulb")) {
    svg = (
      <svg viewBox="0 0 300 120" className="w-full h-[140px]">
        <rect x="50" y="50" width="200" height="60" fill="none" stroke="black" strokeWidth="2" />
        <line x1="120" y1="50" x2="120" y2="30" stroke="black" strokeWidth="2" />
        <line x1="130" y1="30" x2="130" y2="50" stroke="black" strokeWidth="2" />
        <line x1="110" y1="40" x2="140" y2="40" stroke="black" strokeWidth="2" />
        <circle cx="180" cy="50" r="12" fill="none" stroke="black" strokeWidth="2" />
        <text x="60" y="20" fontSize="11">Battery - Bulb - Switch</text>
      </svg>
    );
  } else if (d.includes("plant") || d.includes("bean") || d.includes("root")) {
    svg = (
      <svg viewBox="0 0 300 120" className="w-full h-[140px]">
        <line x1="150" y1="30" x2="150" y2="80" stroke="black" strokeWidth="2" />
        <ellipse cx="150" cy="20" rx="20" ry="12" fill="none" stroke="black" strokeWidth="2" />
        <path d="M150 50 Q120 40 110 20" fill="none" stroke="black" strokeWidth="1.5" />
        <path d="M150 50 Q180 40 190 20" fill="none" stroke="black" strokeWidth="1.5" />
        <path d="M150 80 Q130 100 120 110" fill="none" stroke="black" strokeWidth="1.5" />
        <path d="M150 80 Q170 100 180 110" fill="none" stroke="black" strokeWidth="1.5" />
        <text x="10" y="15" fontSize="10">Leaves - Stem - Roots (A,B,C)</text>
      </svg>
    );
  } else {
    svg = (
      <svg viewBox="0 0 300 120" className="w-full h-[140px]">
        <rect x="20" y="20" width="260" height="80" fill="none" stroke="black" strokeWidth="2" />
        <text x="50" y="60" fontSize="12" fontWeight="bold">{desc.substring(0, 55)}</text>
        <text x="50" y="80" fontSize="10">{desc.substring(55, 100)}</text>
      </svg>
    );
  }

  return (
    <div className="my-5 border-[2.5px] border-black bg-white rounded-md overflow-hidden">
      <div className="bg-black text-white text-[10px] font-bold px-2 py-1 flex justify-between">
        <span>DIAGRAM {figNum}</span>
        <span>KICD APPROVED • BLACK & WHITE</span>
      </div>
      <div className="p-2 bg-white">{svg}</div>
      <div className="px-2 pb-2 text-[11px] text-center font-medium text-black border-t border-black/20 pt-1">
        {desc}
      </div>
    </div>
  );
}

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
  const addTopic = () => { if (topicInput.trim()&&!topics.includes(topicInput.trim())) { setTopics([...topics, topicInput.trim()]); setTopicInput(""); } };
  const removeTopic = (t: string) => setTopics(topics.filter(x=>x!==t));

  const generateExam = async () => {
    setLoading(true); setExam("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, grade, topic: topics.join(", ")||"all topics", numQ, examType, difficulty, structure }) });
      const data = await res.json(); setExam(data.exam);
    } catch { setExam("Error"); }
    setLoading(false);
  };

  const renderExam = (text: string) => {
    if (!text) return null;
    let fig = 0;
    const parts = text.split(/(\[DIAGRAM:.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith("[DIAGRAM:")) {
        fig++;
        const desc = part.replace("[DIAGRAM:", "").replace("]", "").trim();
        return <RealDiagram key={i} desc={desc} figNum={fig} />;
      } else {
        const cleaned = part.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*/g, "").replace(/\n/g, "<br/>");
        return <span key={i} dangerouslySetInnerHTML={{ __html: cleaned }} />;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🧠</div><h1 className="text-2xl font-bold">MtihaniGen AI</h1><span className="bg-[#7de2e6] text-[#0d3d4f] text-[10px] px-3 py-1 rounded-full font-bold">AI EXAM GENERATOR</span></div>
        <div className="text-right"><div className="font-bold">Teacher Jane</div><div className="text-xs opacity-80">Mumias Primary ▼</div></div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <p className="text-gray-500 text-sm mb-6">CBC compliant with CLEAR diagrams</p>
          <label className="text-xs font-bold">CLASS</label>
          <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{Object.keys(subjectsByGrade).map(g=><option key={g}>{g}</option>)}</select>
          <label className="text-xs font-bold">SUBJECT</label>
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{subjectsByGrade[grade].map(s=><option key={s}>{s}</option>)}</select>
          <label className="text-xs font-bold">TOPIC</label>
          <div className="flex gap-2 mt-1 mb-2"><input value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Add topic" className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div>
          <div className="flex flex-wrap gap-2 mb-4">{topics.map(t=><span key={t} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>)}</div>
          <div className="flex gap-2 mb-3">{["Opener","Mid-term","End term"].map(type=><button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm ${examType===type?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{type}</button>)}</div>
          <div className="flex gap-2 mb-3">{["Easy","Medium","Hard"].map(d=><button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm ${difficulty===d?'bg-blue-600 text-white':'bg-gray-100'}`}>{d}</button>)}</div>
          <div className="flex gap-2 mb-4">{["Multiple Choice","Structured","Mixed"].map(s=><button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm ${structure===s?'bg-blue-600 text-white':'bg-gray-100'}`}>{s}</button>)}</div>
          <div className="flex items-center gap-3 mb-6"><button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg">−</button><span className="border px-5 py-2 rounded-lg font-bold">{numQ}</span><button onClick={()=>setNumQ(numQ+1)} className="border w-9 h-9 rounded-lg">+</button></div>
          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg">{loading?"Generating CLEAR diagrams...":"✨ Generate Exam with Diagrams"}</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b"><h2 className="font-bold">Preview - CLEAR DIAGRAMS</h2><span className="bg-green-100 text-green-700 text-[11px] px-3 py-1 rounded-full font-bold">Ready</span></div>
          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            <div className="bg-white p-6 rounded-xl shadow-lg border relative">
              <div className="flex justify-between items-start mb-4"><div className="font-bold text-[#0d3d4f] text-sm">🇰🇪 MUMIAS PRIMARY SCHOOL</div><div className="w-14 h-14 border flex items-center justify-center text-[8px]">QR</div></div>
              <h3 className="text-center font-bold text-[15px] text-[#0d3d4f] mb-1">{subject.toUpperCase()} - {grade.toUpperCase()}</h3>
              {!exam && <p className="text-gray-400 text-sm text-center mt-20">Generate to see CLEAR black diagrams</p>}
              {exam && <div className="text-[13px] leading-6 text-black">{renderExam(exam)}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
