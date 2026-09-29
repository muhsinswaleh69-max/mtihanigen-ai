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
    <div className="my-4 border-[2.5px] border-black bg-white rounded">
      <div className="bg-black text-white text-[10px] font-bold px-3 py-1 flex justify-between"><span>DIAGRAM {figNum}</span><span>KICD</span></div>
      <div className="p-1">{svg}</div>
      <div className="px-3 py-1 text-[11px] text-center border-t">{desc}</div>
    </div>
  );
}

export default function Home() {
  const [schoolName, setSchoolName] = useState("VISA OSHWAL PRIMARY SCHOOL");
  const [schoolLevel, setSchoolLevel] = useState("Primary + JSS");
  const [grade, setGrade] = useState("Grade 10");
  const [subject, setSubject] = useState("Mathematics");
  const [topics, setTopics] = useState(["Algebra"]);
  const [topicInput, setTopicInput] = useState("");
  const [examType, setExamType] = useState("End term");
  const [difficulty, setDifficulty] = useState("Hard");
  const [structure, setStructure] = useState("Multiple Choice");
  const [numQ, setNumQ] = useState(50);
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [paperCode, setPaperCode] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const getAllowedGrades = () => {
    if (schoolLevel === "Primary Only") return ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"];
    if (schoolLevel === "JSS Only") return ["Grade 7","Grade 8","Grade 9"];
    if (schoolLevel === "Senior Only") return ["Grade 10","Grade 11","Grade 12"];
    if (schoolLevel === "Primary + JSS + Senior") return Object.keys(subjectsByGrade);
    return ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9"];
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
    const code = `MG-${grade.replace("Grade ","G")}-${subject.substring(0,3).toUpperCase()}-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*900)+100}`;
    setPaperCode(code);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, grade, topic: topics.join(", ") || "all topics", numQ, examType, difficulty, structure, schoolName }) });
      const data = await res.json(); setExam(data.exam);
    } catch { setExam("Error generating exam."); }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if(!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'height=900,width=800');
    if(win){
      win.document.write(`
        <html><head><title>${schoolName} - ${subject} - ${paperCode}</title>
        <style>
          body{font-family: Times New Roman, serif; padding:30px; color:black; line-height:1.6}
          h1{text-align:center; font-size:18px; text-transform:uppercase; margin:0}
          h2{text-align:center; font-size:14px; margin:5px 0}
         .meta{text-align:center; font-size:11px; margin:10px 0}
         .instructions{border:1px solid black; padding:10px; font-size:12px; margin:15px 0}
          @media print{body{padding:10px}}
        </style></head>
        <body>${content}</body></html>`);
      win.document.close(); win.focus(); setTimeout(()=>win.print(), 300);
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
  const durationText = examType==="End term"? "40 MINUTES" : examType==="Mid-term"? "1 HOUR" : "1 HOUR 30 MINUTES";
  const dateText = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center no-print">
        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🧠</div><h1 className="text-xl font-bold">MtihaniGen AI</h1></div>
        <div className="text-right text-sm"><div className="font-bold">{schoolName}</div><div className="text-xs opacity-80">Teacher Jane ▼</div></div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        {/* LEFT */}
        <div className="bg-white rounded-xl p-6 shadow-sm border no-print">
          <h2 className="text-xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <p className="text-xs text-gray-500 mb-4">School dashboard - set your extent</p>

          <label className="text-xs font-bold">🏫 SCHOOL NAME</label>
          <input value={schoolName} onChange={e=>setSchoolName(e.target.value.toUpperCase())} className="w-full border p-2.5 rounded-lg mt-1 bg-white font-bold mb-3" />

          <label className="text-xs font-bold">📚 SCHOOL EXTENT (What level can you set?)</label>
          <select value={schoolLevel} onChange={e=>setSchoolLevel(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">
            <option>Primary Only</option><option>Primary + JSS</option><option>JSS Only</option><option>Senior Only</option><option>Primary + JSS + Senior</option>
          </select>

          <label className="text-xs font-bold">CLASS / GRADE</label>
          <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{getAllowedGrades().map(g=><option key={g}>{g}</option>)}</select>

          <label className="text-xs font-bold">SUBJECT</label>
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{subjectsByGrade[grade]?.map(s=><option key={s}>{s}</option>)}</select>

          <label className="text-xs font-bold">TOPIC</label>
          <div className="flex gap-2 mt-1 mb-2"><input value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Add topic" className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div>
          <div className="flex flex-wrap gap-2 mb-3">{topics.map(t=><span key={t} className="bg-blue-100 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>)}</div>

          <label className="text-xs font-bold">TYPE OF EXAM</label>
          <div className="flex gap-2 mb-3 mt-1">{["Opener","Mid-term","End term"].map(type=><button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm ${examType===type?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{type}</button>)}</div>

          <label className="text-xs font-bold">DIFFICULTY</label>
          <div className="flex gap-2 mb-3 mt-1">{["Easy","Medium","Hard"].map(d=><button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm ${difficulty===d?'bg-blue-600 text-white':'bg-gray-100'}`}>{d}</button>)}</div>

          {/* YOU ASKED - STRUCTURE VISIBLE AGAIN */}
          <label className="text-xs font-bold">STRUCTURE OF QUESTIONS</label>
          <div className="flex gap-2 mb-4 mt-1">{["Multiple Choice","Structured","Mixed"].map(s=><button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${structure===s?'bg-blue-600 text-white border-blue-600':'bg-gray-100'}`}>{s}</button>)}</div>
          <p className="text-[10px] text-gray-500 mb-3">Multiple Choice = A,B,C,D | Structured = short answers | Mixed = both</p>

          <label className="text-xs font-bold">NUMBER OF QUESTIONS</label>
          <div className="flex items-center gap-3 mt-1 mb-6"><button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg bg-white">−</button><span className="border px-5 py-2 rounded-lg bg-white font-bold">{numQ}</span><button onClick={()=>setNumQ(Math.min(100,numQ+1))} className="border w-9 h-9 rounded-lg bg-white">+</button></div>

          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg">{loading?"Generating...":"✨ Generate Exam with Diagrams"}</button>
        </div>

        {/* RIGHT - PREVIEW */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b no-print">
            <h2 className="font-bold">Preview</h2>
            <div className="flex gap-2">
              <button onClick={()=>setIsEditing(!isEditing)} className={`border text-sm px-3 py-1.5 rounded-lg ${isEditing?'bg-yellow-400':'bg-white'}`}>{isEditing?"✔ Done":"✏️ Edit"}</button>
              <button onClick={handleDownloadPDF} disabled={!exam} className="bg-[#0d3d4f] text-white text-sm px-4 py-1.5 rounded-lg">⬇ Download PDF</button>
            </div>
          </div>

          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            {/* Screen preview - with DRAFT watermark */}
            <div className="bg-white p-6 rounded-xl shadow-lg border relative overflow-hidden">
              {/* DRAFT watermark - screen only, no-print */}
              <div className="absolute top-40 left-10 text-gray-200 text-6xl rotate-[-30deg] opacity-10 font-bold pointer-events-none no-print">DRAFT<br/>MtihaniGen AI</div>
              <div className="absolute top-2 left-3 text-[10px] text-gray-400 no-print">KE {schoolName} • QR CODE</div>

              {/* THIS IS WHAT PRINTS - clean */}
              <div ref={printRef}>
                <h1 className="text-center font-bold text-[16px] uppercase tracking-wide">{schoolName}</h1>
                <h2 className="text-center font-bold text-[13px] mt-1 uppercase">{subject} - {grade} {examType.toUpperCase()} EXAM {paperCode && ` - ${paperCode}`}</h2>
                <div className="text-center text-[11px] mt-2 space-y-0.5">
                  <div><strong>TIME:</strong> {isKiswahili? (examType==="End term"?"DAKIKA 40":"SAA 1 NA DAKIKA 30") : durationText} | <strong>DATE:</strong> {dateText}</div>
                  <div>{isKiswahili? `Mada: ${topics.join(", ")}` : `Strand: ${topics.join(", ")}`} | {structure} | {difficulty} | {numQ} Questions</div>
                </div>
                <div className="border border-black p-2.5 text-[11px] mt-4 mb-4">
                  {isKiswahili? <><strong>MAELEKEZO:</strong> Jibu maswali YOTE. Kila swali lina alama 1. Muda uliotolewa ni {durationText.toLowerCase()}.</> : <><strong>INSTRUCTIONS:</strong> Answer ALL questions. Each question carries 1 mark. Time allowed is {durationText}. Date: {dateText}</>}
                </div>
                {!exam && <p className="text-gray-400 text-sm text-center mt-16">Click Generate to see exam</p>}
                {exam && <div className={`text-[13px] leading-6 text-black ${isEditing?'border-2 border-dashed border-yellow-400 p-2':''}`} contentEditable={isEditing} suppressContentEditableWarning>{renderExam(exam)}</div>}
              </div>

              <div className="text-[8px] text-gray-400 mt-8 border-t pt-2 flex justify-between no-print">
                <span>Generated by MtihaniGen AI • {new Date().toLocaleDateString()} • {paperCode}</span><span>School Copy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
