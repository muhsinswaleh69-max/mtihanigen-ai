"use client";
import { useState, useEffect, useRef } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE"],
  "Grade 2": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE"],
  "Grade 3": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE"],
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

const suggestedTopics: Record<string, string[]> = {
  "Kiswahili": ["Sarufi", "Ufahamu", "Insha", "Fasihi", "Methali"],
  "Mathematics": ["Algebra", "Geometry", "Triangles", "Logarithms", "Quadratic Equations", "Heron's Formula"],
  "English": ["Grammar", "Comprehension", "Composition"],
  "Integrated Science": ["Energy", "Forces", "Environment"],
  "Biology": ["Cells", "Nutrition", "Reproduction"],
  "Physics": ["Forces", "Energy", "Electricity"],
};

function RealDiagram({ desc, figNum }: { desc: string, figNum: number }) {
  const d = desc.toLowerCase();
  let svg: any = null;

  // EXACT TRIANGLE ABC with sides - like your photo Q11
  if (d.includes("triangle")) {
    const abMatch = desc.match(/AB\s*=\s*(\d+)/i);
    const bcMatch = desc.match(/BC\s*=\s*(\d+)/i);
    const acMatch = desc.match(/AC\s*=\s*(\d+)/i);
    const AB = abMatch? abMatch[1] : "5";
    const BC = bcMatch? bcMatch[1] : "7";
    const AC = acMatch? acMatch[1] : "8";

    svg = (
      <svg viewBox="0 0 340 200" className="w-full h-[200px] bg-white">
        {/* Real triangle */}
        <polygon points="50,150 200,150 90,40" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Vertex labels */}
        <text x="30" y="160" fontSize="14" fontWeight="bold">A</text>
        <text x="205" y="160" fontSize="14" fontWeight="bold">B</text>
        <text x="80" y="25" fontSize="14" fontWeight="bold">C</text>
        {/* Side labels - EXACT */}
        <text x="115" y="165" fontSize="12" fontWeight="bold">{AB} cm</text>
        <text x="150" y="85" fontSize="12" fontWeight="bold">{BC} cm</text>
        <text x="35" y="95" fontSize="12" fontWeight="bold">{AC} cm</text>
        {/* Small right angle marks if needed */}
        <circle cx="50" cy="150" r="3" fill="black"/>
        <circle cx="200" cy="150" r="3" fill="black"/>
        <circle cx="90" cy="40" r="3" fill="black"/>
      </svg>
    );
  }
  // CIRCLE
  else if (d.includes("circle")) {
    const r = desc.match(/(\d+)\s*cm/)?.[1] || "7";
    svg = (<svg viewBox="0 0 300 180" className="w-full h-[180px] bg-white"><circle cx="150" cy="90" r="60" fill="none" stroke="black" strokeWidth="2.5"/><line x1="150" y1="90" x2="210" y2="90" stroke="black" strokeWidth="1.5"/><text x="170" y="80" fontSize="12">{r} cm radius</text><circle cx="150" cy="90" r="2.5" fill="black"/></svg>);
  }
  // RECTANGLE
  else if (d.includes("rectangle") || d.includes("length") && d.includes("width")) {
    svg = (<svg viewBox="0 0 300 180" className="w-full h-[180px] bg-white"><rect x="60" y="40" width="180" height="100" fill="none" stroke="black" strokeWidth="2.5"/><text x="140" y="35" fontSize="12">Length</text><text x="20" y="95" fontSize="12">Width</text></svg>);
  }
  // PENDULUM / PHYSICS
  else if (d.includes("pendulum") || d.includes("bob") || d.includes("lever")) {
    svg = (<svg viewBox="0 0 300 180" className="w-full h-[180px] bg-white"><line x1="50" y1="20" x2="250" y2="20" stroke="black" strokeWidth="3"/><line x1="150" y1="20" x2="150" y2="110" stroke="black" strokeWidth="2"/><circle cx="150" cy="130" r="20" fill="none" stroke="black" strokeWidth="2.5"/></svg>);
  }
  else {
    svg = (<svg viewBox="0 0 340 160" className="w-full h-[160px] bg-white"><rect x="20" y="20" width="300" height="110" rx="10" fill="white" stroke="black" strokeWidth="2"/><text x="170" y="80" textAnchor="middle" fontSize="13" fontWeight="bold">{desc.slice(0,60)}</text></svg>);
  }

  return (
    <div className="my-6 border-[3px] border-black bg-white">
      <div className="bg-black text-white text-[11px] font-bold px-3 py-1.5 flex justify-between"><span>DIAGRAM {figNum}</span><span>EXACT FIGURE - PRINTABLE</span></div>
      <div className="p-2 bg-white flex justify-center">{svg}</div>
      <div className="px-3 py-1.5 text-[11px] text-center border-t bg-gray-50">{desc}</div>
    </div>
  );
}

export default function Home() {
  const [schoolName, setSchoolName] = useState("VISA OSHWAL PRIMARY SCHOOL");
  const [schoolLevel, setSchoolLevel] = useState("Primary + JSS + Senior");
  const [grade, setGrade] = useState("Grade 8");
  const [subject, setSubject] = useState("Mathematics");
  const [topics, setTopics] = useState<string[]>(["Triangles", "Quadratic Equations"]);
  const [topicInput, setTopicInput] = useState("");
  const [examType, setExamType] = useState("End term");
  const [difficulty, setDifficulty] = useState("Medium");
  const [structure, setStructure] = useState("Mixed");
  const [numQ, setNumQ] = useState(12);
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [paperCode, setPaperCode] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const getAllowedGrades = () => {
    if (schoolLevel === "Primary Only") return ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"];
    if (schoolLevel === "JSS Only") return ["Grade 7","Grade 8","Grade 9"];
    if (schoolLevel === "Senior Only") return ["Grade 10","Grade 11","Grade 12"];
    if (schoolLevel === "Primary + JSS") return ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9"];
    return Object.keys(subjectsByGrade);
  };

  useEffect(() => { const allowed = getAllowedGrades(); if(!allowed.includes(grade)) setGrade(allowed[7]||allowed[0]); }, [schoolLevel]);
  useEffect(() => { const first = subjectsByGrade[grade]?.[0]; if(first){ setSubject(first); const sug = suggestedTopics[first]||[]; setTopics(sug.slice(0,2)); } }, [grade]);
  useEffect(() => { const sug = suggestedTopics[subject]||[]; setTopics(sug.length>0? sug.slice(0,2):[]); }, [subject]);

  const addTopic = () => { if (topicInput.trim() &&!topics.includes(topicInput.trim())) { setTopics([...topics, topicInput.trim()]); setTopicInput(""); } };
  const removeTopic = (t: string) => setTopics(topics.filter(x => x!== t));

  const generateExam = async () => {
    setLoading(true); setExam(""); setIsEditing(false);
    const code = `MG-${grade.replace("Grade ","G")}-${subject.substring(0,3).toUpperCase()}-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*900)+100}`;
    setPaperCode(code);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, grade, topic: topics.join(", ") || subject, numQ, examType, difficulty, structure, schoolName }) });
      const data = await res.json(); setExam(data.exam);
    } catch { setExam("Error generating exam."); }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if(!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'height=900,width=800');
    if(win){
      win.document.write(`<html><head><title>${schoolName}</title><style>body{font-family: Times New Roman, serif; margin:0; color:black;}.cover-page{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;padding:40px 30px;box-sizing:border-box;page-break-after:always}.questions-page{padding:30px; font-size:13px; line-height:1.7} svg{max-width:100%}</style></head><body>${content}</body></html>`);
      win.document.close(); win.focus(); setTimeout(()=>win.print(), 400);
    }
  };

  const renderExam = (text: string) => {
    if (!text) return null;
    let fig = 0;
    const parts = text.split(/(\[DIAGRAM:.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith("[DIAGRAM:")) { fig++; const desc = part.replace("[DIAGRAM:", "").replace("]", "").trim(); return <RealDiagram key={i} desc={desc} figNum={fig} />; }
      else {
        let cleaned = part
         .replace(/\\\(/g, "").replace(/\\\)/g, "")
         .replace(/\\\[/g, "").replace(/\\\]/g, "")
         .replace(/\\x\^2/g, "x²").replace(/\^2/g, "²").replace(/\^3/g, "³")
         .replace(/\\log_2/g, "log₂").replace(/_2/g, "₂")
         .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
         .replace(/\*/g, "")
         .replace(/\n/g, "<br/>");
        return <span key={i} dangerouslySetInnerHTML={{ __html: cleaned }} />;
      }
    });
  };

  const isKiswahili = subject.toLowerCase().includes("kiswahili");
  const durationText = examType==="End term"? (isKiswahili?"DAKIKA 40":"40 MINUTES") : examType==="Mid-term"? (isKiswahili?"SAA 1":"1 HOUR") : (isKiswahili?"SAA 1 NA DAKIKA 30":"1 HOUR 30 MINUTES");
  const dateText = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🧠</div><h1 className="text-xl font-bold">MtihaniGen AI</h1></div><div className="text-right text-sm"><div className="font-bold">{schoolName}</div></div></div>
      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-xl p-6 shadow border">
          <h2 className="text-xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <label className="text-xs font-bold mt-4 block">🏫 SCHOOL NAME</label><input value={schoolName} onChange={e=>setSchoolName(e.target.value.toUpperCase())} className="w-full border p-2.5 rounded-lg mt-1 font-bold mb-3" />
          <label className="text-xs font-bold">📚 SCHOOL EXTENT</label><select value={schoolLevel} onChange={e=>setSchoolLevel(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3"><option>Primary Only</option><option>Primary + JSS</option><option>JSS Only</option><option>Senior Only</option><option>Primary + JSS + Senior</option></select>
          <label className="text-xs font-bold">CLASS / GRADE</label><select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{getAllowedGrades().map(g=><option key={g}>{g}</option>)}</select>
          <label className="text-xs font-bold">SUBJECT</label><select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{subjectsByGrade[grade]?.map(s=><option key={s}>{s}</option>)}</select>
          <label className="text-xs font-bold">TOPIC (Not printed)</label><div className="flex gap-2 mt-1 mb-2"><input list="topic-suggestions" value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder={`e.g. ${suggestedTopics[subject]?.[0]||'Enter'}`} className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><datalist id="topic-suggestions">{(suggestedTopics[subject]||[]).map(t=><option key={t} value={t}/>)}</datalist><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div><div className="flex flex-wrap gap-2 mb-3">{topics.map(t=><span key={t} className="bg-blue-100 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>)}</div>
          <label className="text-xs font-bold">TYPE OF EXAM</label><div className="flex gap-2 mb-3 mt-1">{["Opener","Mid-term","End term"].map(type=><button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm ${examType===type?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{type}</button>)}</div>
          <label className="text-xs font-bold">DIFFICULTY (Not printed)</label><div className="flex gap-2 mb-3 mt-1">{["Easy","Medium","Hard"].map(d=><button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm ${difficulty===d?'bg-blue-600 text-white':'bg-gray-100'}`}>{d}</button>)}</div>
          <label className="text-xs font-bold">STRUCTURE OF QUESTIONS</label><div className="flex gap-2 mb-4 mt-1">{["Multiple Choice","Structured","Mixed"].map(s=><button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm ${structure===s?'bg-blue-600 text-white':'bg-gray-100'}`}>{s}</button>)}</div>
          <label className="text-xs font-bold">NUMBER OF QUESTIONS</label><div className="flex items-center gap-3 mt-1 mb-6"><button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg">−</button><span className="border px-5 py-2 rounded-lg font-bold">{numQ}</span><button onClick={()=>setNumQ(Math.min(100,numQ+1))} className="border w-9 h-9 rounded-lg">+</button></div>
          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold">{loading?"Generating...":"✨ Generate Exam"}</button>
        </div>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b"><h2 className="font-bold">Preview</h2><div className="flex gap-2"><button onClick={()=>setIsEditing(!isEditing)} className={`border text-sm px-3 py-1.5 rounded-lg ${isEditing?'bg-yellow-400':'bg-white'}`}>{isEditing?"✔ Done":"✏️ Edit"}</button><button onClick={handleDownloadPDF} disabled={!exam} className="bg-[#0d3d4f] text-white text-sm px-4 py-1.5 rounded-lg">⬇ Download PDF</button></div></div>
          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden relative">
              <div className="absolute top-40 left-10 text-gray-200 text-6xl rotate-[-30deg] opacity-10 font-bold pointer-events-none z-10">DRAFT<br/>MtihaniGen AI</div>
              <div ref={printRef}>
                <div className="cover-page p-8 text-center" style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between', pageBreakAfter:'always'}}>
                  <div><h1 className="text-[24px] font-bold uppercase tracking-wide mt-10">{schoolName}</h1><div className="w-20 h-1 bg-black mx-auto my-6"></div></div>
                  <div><h2 className="text-[18px] font-bold uppercase">{subject} - {grade.toUpperCase()} - {examType.toUpperCase()} EXAMINATION</h2><p className="text-[13px] mt-3 font-mono">{paperCode}</p></div>
                  <div className="space-y-3 text-[14px]"><p><strong>{isKiswahili?"MUDA":"TIME"}:</strong> {durationText}</p><p><strong>{isKiswahili?"TAREHE":"DATE"}:</strong> {dateText}</p><p><strong>{isKiswahili?"MASWALI":"QUESTIONS"}:</strong> {numQ} | <strong>{isKiswahili?"AINA":"TYPE"}:</strong> {structure}</p></div>
                  <div className="border-2 border-black p-5 text-left text-[13px] max-w-[90%] mx-auto leading-relaxed"><strong>{isKiswahili?"MAELEKEZO:":"INSTRUCTIONS:"}</strong><br/>{isKiswahili? `Jibu maswali YOTE. Kila swali lina alama 1. Muda uliotolewa ni ${durationText}.` : `Answer ALL questions. Each question carries 1 mark. Time allowed is ${durationText}.`}</div>
                  <div className="mb-10"><p className="text-[11px] text-gray-600">This paper consists of {numQ} printed questions</p></div>
                </div>
                <div className="questions-page p-6"><div className="text-center font-bold text-[12px] mb-4 border-b pb-2">{schoolName} | {subject} | {paperCode}</div>{!exam && <p className="text-gray-400 text-center mt-10">Generate exam to see questions - starts on page 2</p>}{exam && <div className={`text-[13px] leading-7 ${isEditing?'border-2 border-dashed border-yellow-400 p-2':''}`} contentEditable={isEditing} suppressContentEditableWarning>{renderExam(exam)}</div>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
