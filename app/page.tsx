"use client";
import { useState, useEffect, useRef } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE"],
  "Grade 2": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE"],
  "Grade 3": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE"],
  "Grade 4": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE"],
  "Grade 5": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE"],
  "Grade 6": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE"],
  "Grade 7": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "Computer Studies"],
  "Grade 8": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "Computer Studies"],
  "Grade 9": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "Computer Studies"],
  "Grade 10": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "Business", "Agriculture"],
  "Grade 11": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "Business", "Agriculture"],
  "Grade 12": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "Business", "Agriculture"],
};

function RealDiagram({ desc, figNum }: { desc: string, figNum: number }) {
  const d = desc.toLowerCase();
  let svg: any = null;
  if (d.includes("pendulum") || d.includes("bob")) {
    svg = (<svg viewBox="0 0 300 160" className="w-full h-[160px]"><line x1="50" y1="20" x2="250" y2="20" stroke="black" strokeWidth="3"/><circle cx="150" cy="20" r="4" fill="black"/><line x1="150" y1="20" x2="150" y2="110" stroke="black" strokeWidth="2"/><circle cx="150" cy="125" r="18" fill="none" stroke="black" strokeWidth="2.5"/><text x="155" y="15" fontSize="12" fontWeight="bold">A-Pivot</text><text x="165" y="65" fontSize="12" fontWeight="bold">B-String</text><text x="175" y="130" fontSize="12" fontWeight="bold">C-Bob</text></svg>);
  } else if (d.includes("lever")) {
    svg = (<svg viewBox="0 0 300 130" className="w-full h-[150px]"><polygon points="140,70 160,70 150,100" fill="black"/><line x1="30" y1="70" x2="270" y2="70" stroke="black" strokeWidth="3"/><rect x="40" y="45" width="30" height="20" fill="none" stroke="black" strokeWidth="2"/><text x="30" y="40" fontSize="11" fontWeight="bold">B-Effort</text><rect x="220" y="45" width="30" height="20" fill="black"/><text x="210" y="40" fontSize="11" fontWeight="bold">A-Load</text><text x="130" y="115" fontSize="11" fontWeight="bold">C-Fulcrum</text></svg>);
  } else {
    svg = (<svg viewBox="0 0 300 120" className="w-full h-[120px]"><rect x="10" y="10" width="280" height="100" fill="none" stroke="black" strokeWidth="2" rx="6"/><text x="20" y="50" fontSize="11" fontWeight="bold">{desc.slice(0,60)}</text></svg>);
  }
  return (
    <div className="my-4 border-[3px] border-black bg-white rounded-lg overflow-hidden print:border-black">
      <div className="bg-black text-white text-[10px] font-bold px-3 py-1 flex justify-between"><span>DIAGRAM {figNum}</span><span>KICD • BLACK & WHITE</span></div>
      <div className="p-1 bg-white">{svg}</div>
      <div className="px-3 py-1.5 text-[11px] text-black bg-gray-50 border-t text-center">{desc}</div>
    </div>
  );
}

export default function Home() {
  const [schoolName, setSchoolName] = useState("MUMIAS PRIMARY SCHOOL");
  const [schoolLevel, setSchoolLevel] = useState("Primary + JSS"); // extent
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
  const [isEditing, setIsEditing] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const getAllowedGrades = () => {
    if (schoolLevel === "Primary Only") return Object.keys(subjectsByGrade).filter(g => ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"].includes(g));
    if (schoolLevel === "JSS Only") return ["Grade 7","Grade 8","Grade 9"];
    if (schoolLevel === "Senior Only") return ["Grade 10","Grade 11","Grade 12"];
    return Object.keys(subjectsByGrade).slice(0,9); // Primary + JSS
  };

  useEffect(() => {
    const allowed = getAllowedGrades();
    if(!allowed.includes(grade)) setGrade(allowed[0]);
  }, [schoolLevel]);

  useEffect(() => { setSubject(subjectsByGrade[grade]?.[0] || "Mathematics"); }, [grade]);

  const addTopic = () => { if (topicInput.trim() &&!topics.includes(topicInput.trim())) { setTopics([...topics, topicInput.trim()]); setTopicInput(""); } };
  const removeTopic = (t: string) => setTopics(topics.filter(x => x!== t));

  const generateExam = async () => {
    setLoading(true); setExam(""); setIsEditing(false);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, grade, topic: topics.join(", ") || "all topics", numQ, examType, difficulty, structure, schoolName }) });
      const data = await res.json(); setExam(data.exam);
    } catch { setExam("Error generating exam."); }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if(!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'height=800,width=800');
    if(win){
      win.document.write(`<html><head><title>${schoolName} - ${subject}</title><style>body{font-family:Arial;padding:20px;color:black}.no-print{display:none} svg{max-width:100%}.border-black{border:2px solid black} @media print{body{padding:0}}</style></head><body>${content}</body></html>`);
      win.document.close(); win.focus(); win.print();
    }
  };

  const renderExam = (text: string) => {
    if (!text) return null;
    let fig = 0;
    const parts = text.split(/(\[DIAGRAM:.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith("[DIAGRAM:")) { fig++; const desc = part.replace("[DIAGRAM:", "").replace("]", "").trim(); return <RealDiagram key={i} desc={desc} figNum={fig} />; }
      else { const cleaned = part.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*/g, "").replace(/\n/g, "<br/>"); return <span key={i} dangerouslySetInnerHTML={{ __html: cleaned }} />; }
    });
  };

  const isKiswahili = subject.toLowerCase().includes("kiswahili");

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🧠</div>
          <h1 className="text-2xl font-bold">MtihaniGen AI</h1>
          <span className="bg-[#7de2e6] text-[#0d3d4f] text-[10px] px-3 py-1 rounded-full font-bold ml-2">AI EXAM GENERATOR</span>
        </div>
        <div className="text-right leading-tight"><div className="font-bold">{schoolName}</div><div className="text-xs opacity-80">Teacher Jane ▼</div></div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        {/* LEFT - DASHBOARD */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <p className="text-gray-500 text-sm mb-4">Dashboard — School sets its own extent</p>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
            <label className="text-xs font-bold text-gray-700">🏫 NAME OF THE SCHOOL (Will appear on exam paper)</label>
            <input value={schoolName} onChange={e=>setSchoolName(e.target.value.toUpperCase())} placeholder="MUMIAS PRIMARY SCHOOL" className="w-full border p-2.5 rounded-lg mt-1 bg-white font-bold text-[#0d3d4f]" />
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-gray-600">📚 SCHOOL EXTENT - To what level can exams be set?</label>
            <select value={schoolLevel} onChange={e=>setSchoolLevel(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50">
              <option>Primary Only</option>
              <option>Primary + JSS</option>
              <option>JSS Only</option>
              <option>Senior Only</option>
              <option>Primary + JSS + Senior</option>
            </select>
            <p className="text-[10px] text-gray-500 mt-1">If you choose Primary Only, you will only see Grade 1-6. JSS Only = Grade 7-9.</p>
          </div>

          <label className="text-xs font-bold text-gray-600">CLASS / GRADE</label>
          <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-4">
            {getAllowedGrades().map(g => <option key={g}>{g}</option>)}
          </select>

          <label className="text-xs font-bold text-gray-600">SUBJECT</label>
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-4">
            {subjectsByGrade[grade]?.map(s => <option key={s}>{s}</option>)}
          </select>

          <label className="text-xs font-bold text-gray-600">TOPIC / STRAND</label>
          <div className="flex gap-2 mt-1 mb-2"><input value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Add topic" className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div>
          <div className="flex flex-wrap gap-2 mb-4">{topics.map(t => (<span key={t} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>))}</div>

          <label className="text-xs font-bold text-gray-600">TYPE OF EXAM</label>
          <div className="flex gap-2 mb-4 mt-1">{["Opener","Mid-term","End term"].map(type => (<button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm ${examType===type?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{type}</button>))}</div>

          <label className="text-xs font-bold text-gray-600">DIFFICULTY</label>
          <div className="flex gap-2 mb-4 mt-1">{["Easy","Medium","Hard"].map(d => (<button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm ${difficulty===d?'bg-blue-600 text-white':'bg-gray-100'}`}>{d}</button>))}</div>

          <label className="text-xs font-bold text-gray-600">NUMBER OF QUESTIONS</label>
          <div className="flex items-center gap-3 mt-1 mb-6"><button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg bg-white">−</button><span className="border px-5 py-2 rounded-lg bg-white font-bold">{numQ}</span><button onClick={()=>setNumQ(Math.min(50,numQ+1))} className="border w-9 h-9 rounded-lg bg-white">+</button></div>

          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg">{loading? "Generating..." : "✨ Generate Exam with Diagrams"}</button>
        </div>

        {/* RIGHT - PREVIEW */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b flex-wrap gap-2">
            <h2 className="font-bold">Preview</h2>
            <div className="flex gap-2">
              <button onClick={()=>setIsEditing(!isEditing)} className={`border text-sm px-3 py-1.5 rounded-lg ${isEditing?'bg-yellow-400 text-black':'bg-white'}`}>{isEditing?"✔ Done Editing":"✏️ Edit"}</button>
              <button onClick={handleDownloadPDF} disabled={!exam} className="bg-[#0d3d4f] text-white text-sm px-4 py-1.5 rounded-lg disabled:opacity-50">⬇ Download PDF</button>
            </div>
          </div>

          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            <div ref={printRef} className="bg-white p-6 rounded-xl shadow-lg border relative overflow-hidden">
              <div className="absolute top-40 left-10 text-gray-200 text-6xl rotate-[-30deg] opacity-10 font-bold pointer-events-none">DRAFT<br/>MtihaniGen AI</div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="font-bold text-[#0d3d4f] text-[13px]">{isKiswahili? "🇰🇪 " + schoolName : "🇰🇪 " + schoolName}</div>
                <div className="w-14 h-14 bg-white border flex items-center justify-center text-[8px]">QR CODE</div>
              </div>

              <h3 className="text-center font-bold text-[14px] text-[#0d3d4f] mb-1 relative z-10">
                {isKiswahili? `${schoolName} - ${subject.toUpperCase()} - ${grade.toUpperCase()}` : `${schoolName} - ${subject.toUpperCase()} - ${grade.toUpperCase()} EXAM PAPER`}
              </h3>
              <p className="text-center text-[10px] text-gray-600 mb-3 relative z-10">
                {isKiswahili? `Mada: ${topics.join(" | ")} | ${difficulty} | Maswali ${numQ} | Muda: ${examType==="End term"?"Dakika 40":"Saa 1 Dakika 30"}` : `Strand: ${topics.join(" | ")} | ${difficulty} | ${numQ} Qs | ${examType==="End term"?"40 Minutes":"1 HR 30 MINS"}`}
              </p>

              <div className="bg-blue-50 p-2.5 rounded text-[11px] mb-4 relative z-10 border">
                {isKiswahili? <><strong>MAELEKEZO:</strong> Jibu maswali YOTE. Kila swali lina alama 1. Chagua jibu bora panapohitajika.</> : <><strong>Instructions:</strong> Answer ALL questions. Each question carries 1 mark. Choose the best answer where applicable.</>}
              </div>

              {!exam && <p className="text-gray-400 text-sm text-center mt-20 relative z-10">{isKiswahili? "Bonyeza kutengeneza mtihani na michoro":"Click Generate Exam to see preview here with CLEAR diagrams"}</p>}

              {exam && (
                <div className={`text-[13px] leading-6 text-black relative z-10 ${isEditing?'border-2 border-yellow-400 border-dashed p-2 rounded':''}`} contentEditable={isEditing} suppressContentEditableWarning={true}>
                  {renderExam(exam)}
                </div>
              )}

              <div className="text-[8px] text-gray-400 mt-8 border-t pt-2 flex justify-between relative z-10">
                <span>Generated by MtihaniGen AI • {new Date().toLocaleDateString()} • {schoolName}</span>
                <span>Scan to verify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
