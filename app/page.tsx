"use client";
import { useState, useEffect } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 4": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 7": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 9": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 10": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture"],
  "Grade 11": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture"],
  "Grade 12": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture"],
};

function RealDiagram({ desc, figNum }: { desc: string, figNum: number }) {
  const d = desc.toLowerCase();
  let svg: any = null;

  if (d.includes("pendulum") || (d.includes("bob") && d.includes("string"))) {
    svg = (
      <svg viewBox="0 0 300 160" className="w-full h-[170px]">
        <line x1="50" y1="20" x2="250" y2="20" stroke="black" strokeWidth="3" />
        <circle cx="150" cy="20" r="4" fill="black" />
        <line x1="150" y1="20" x2="150" y2="110" stroke="black" strokeWidth="2" />
        <circle cx="150" cy="125" r="20" fill="none" stroke="black" strokeWidth="2.5" />
        <text x="155" y="15" fontSize="13" fontWeight="bold">A - Pivot</text>
        <text x="165" y="65" fontSize="13" fontWeight="bold">B - String</text>
        <text x="175" y="130" fontSize="13" fontWeight="bold">C - Bob</text>
        <path d="M150 110 Q 130 125 110 110" stroke="black" fill="none" strokeDasharray="4 2" />
        <path d="M150 110 Q 170 125 190 110" stroke="black" fill="none" strokeDasharray="4 2" />
      </svg>
    );
  } else if (d.includes("lever") || d.includes("fulcrum")) {
    svg = (
      <svg viewBox="0 0 300 140" className="w-full h-[160px]">
        <polygon points="140,80 160,80 150,110" fill="black" />
        <line x1="30" y1="80" x2="270" y2="80" stroke="black" strokeWidth="3" />
        <rect x="40" y="55" width="30" height="25" fill="none" stroke="black" strokeWidth="2" /><text x="45" y="50" fontSize="11" fontWeight="bold">B - Effort</text>
        <rect x="220" y="55" width="30" height="25" fill="black" stroke="black" /><text x="220" y="50" fontSize="11" fontWeight="bold">A - Load</text>
        <text x="135" y="125" fontSize="11" fontWeight="bold">C - Fulcrum</text>
      </svg>
    );
  } else if (d.includes("incline") || d.includes("block") || d.includes("slide")) {
    svg = (
      <svg viewBox="0 0 300 140" className="w-full h-[150px]">
        <line x1="20" y1="120" x2="280" y2="20" stroke="black" strokeWidth="3" />
        <rect x="180" y="30" width="35" height="22" fill="black" />
        <line x1="20" y1="120" x2="280" y2="120" stroke="black" strokeWidth="1" strokeDasharray="6 3" />
        <text x="20" y="15" fontSize="11">PE converts to KE</text>
      </svg>
    );
  } else if (d.includes("river") || d.includes("boat")) {
    svg = (
      <svg viewBox="0 0 300 140" className="w-full h-[150px]">
        <rect x="0" y="30" width="300" height="80" fill="none" stroke="black" strokeWidth="2" />
        <text x="10" y="20" fontSize="11">River flow → 2 m/s</text>
        <line x1="20" y1="50" x2="280" y2="50" stroke="black" strokeWidth="1" markerEnd="url(#arrow)" />
        <rect x="140" y="70" width="40" height="15" fill="black" />
        <line x1="160" y1="70" x2="160" y2="30" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="170" y="45" fontSize="10">Boat across</text>
      </svg>
    );
  } else if (d.includes("circuit")) {
    svg = (
      <svg viewBox="0 0 300 140" className="w-full h-[150px]">
        <rect x="40" y="40" width="220" height="70" fill="none" stroke="black" strokeWidth="2.5" />
        <circle cx="150" cy="40" r="10" fill="none" stroke="black" strokeWidth="2" />
        <line x1="80" y1="40" x2="80" y2="20" stroke="black" strokeWidth="2" /><line x1="90" y1="20" x2="90" y2="40" stroke="black" strokeWidth="3" />
        <text x="50" y="25" fontSize="10">Battery, Bulb, Switch - A,B,C</text>
      </svg>
    );
  } else {
    svg = (
      <svg viewBox="0 0 300 140" className="w-full h-[150px]">
        <rect x="10" y="10" width="280" height="120" fill="none" stroke="black" strokeWidth="2" rx="4" />
        <text x="15" y="40" fontSize="12" fontWeight="bold">{desc.slice(0,45)}</text>
        <text x="15" y="60" fontSize="11">{desc.slice(45,90)}</text>
        <text x="15" y="80" fontSize="11">{desc.slice(90,135)}</text>
        <circle cx="150" cy="105" r="15" fill="none" stroke="black" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <div className="my-5 border-[3px] border-black bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="bg-black text-white text-[11px] font-bold px-3 py-1.5 flex justify-between tracking-wider">
        <span>DIAGRAM {figNum}</span>
        <span>KICD • BLACK & WHITE • CLEAR</span>
      </div>
      <div className="p-1 bg-white">{svg}</div>
      <div className="px-3 py-2 text-[11px] text-black bg-gray-50 border-t-2 border-black text-center font-medium leading-tight">
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
  useEffect(()=>{ setSubject(({"Grade 7": "Integrated Science"} as any)[grade] || "Integrated Science") },[grade]);
  const addTopic = ()=>{ if(topicInput.trim()&&!topics.includes(topicInput.trim())){ setTopics([...topics, topicInput.trim()]); setTopicInput(""); } };
  const removeTopic = (t:string)=>setTopics(topics.filter(x=>x!==t));
  const generateExam = async ()=>{
    setLoading(true); setExam("");
    try{
      const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subject,grade,topic:topics.join(", ")||"all topics",numQ,examType,difficulty,structure})});
      const data=await res.json(); setExam(data.exam);
    }catch{ setExam("Error"); }
    setLoading(false);
  };
  const renderExam = (text:string)=>{
    if(!text) return null;
    let fig=0;
    const parts=text.split(/(\[DIAGRAM:.*?\])/g);
    return parts.map((part,i)=>{
      if(part.startsWith("[DIAGRAM:")){
        fig++; const desc=part.replace("[DIAGRAM:","").replace("]","").trim();
        return <RealDiagram key={i} desc={desc} figNum={fig} />;
      } else {
        const cleaned=part.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");
        return <span key={i} dangerouslySetInnerHTML={{__html:cleaned}} />;
      }
    });
  };
  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🧠</div><h1 className="text-xl font-bold">MtihaniGen AI</h1></div><div className="text-right text-sm"><div className="font-bold">Teacher Jane</div><div className="text-xs opacity-80">Mumias Primary</div></div></div>
      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-xl p-6 shadow border">
          <h2 className="text-xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <div className="mt-4 space-y-3">
            <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg bg-gray-50"><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 4</option><option>Grade 10</option></select>
            <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg bg-gray-50"><option>{subject}</option><option>Mathematics</option><option>Integrated Science</option><option>Biology</option><option>Physics</option></select>
            <div className="flex gap-2"><input value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Add topic" className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div>
            <div className="flex flex-wrap gap-2">{topics.map(t=><span key={t} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>)}</div>
            <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold">{loading?"Drawing CLEAR diagrams...":"✨ Generate Exam with Diagrams"}</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="p-4 border-b font-bold">Preview - DESCRIPTIVE DIAGRAMS</div>
          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            <div className="bg-white p-6 rounded-xl shadow border">
              <div className="font-bold text-sm mb-2">🇰🇪 MUMIAS PRIMARY SCHOOL - {subject.toUpperCase()} {grade.toUpperCase()}</div>
              {!exam && <p className="text-gray-400 text-center mt-20">Click Generate - you will see REAL pendulum diagram</p>}
              {exam && <div className="text-[13px] leading-6 text-black">{renderExam(exam)}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
