"use client";
import { useState, useEffect, useRef } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE"],
  "Grade 2": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE"],
  "Grade 3": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental", "CRE", "IRE", "HRE"],
  "Grade 4": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 5": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 6": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE"],
  "Grade 7": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 8": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 9": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Computer Studies"],
  "Grade 10": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture", "Computer Studies"],
  "Grade 11": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture", "Computer Studies"],
  "Grade 12": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business", "Agriculture", "Computer Studies"],
};

const technicalSubjects = ["Mathematics","Mathematical Activities","Science and Technology","Integrated Science","Biology","Chemistry","Physics","Agriculture","Agriculture and Nutrition","Pre-Technical Studies","Business","Computer Studies"];

const suggestedTopics: Record<string, string[]> = {
  "Kiswahili": ["Sarufi", "Ufahamu", "Insha", "Fasihi"],
  "Mathematics": ["Algebra", "Geometry", "Triangles", "Logarithms"],
  "IRE": ["Quran", "Hadith", "Fiqh", "Tawheed", "Akhlaq"],
  "HRE": ["Dharma", "Karma", "Hindu Festivals"],
  "CRE": ["Creation", "Old Testament", "Life of Jesus"],
};

function RealDiagram({ desc, figNum }: { desc: string, figNum: number }) {
  const d = desc.toLowerCase();
  let svg: any = null;
  if (d.includes("triangle")) {
    const AB = desc.match(/AB\s*=\s*(\d+)/i)?.[1] || "5";
    const BC = desc.match(/BC\s*=\s*(\d+)/i)?.[1] || "7";
    const AC = desc.match(/AC\s*=\s*(\d+)/i)?.[1] || "8";
    svg = (<svg viewBox="0 0 340 200" className="w-full h-[200px] bg-white"><polygon points="50,150 200,150 90,40" fill="white" stroke="black" strokeWidth="2.5"/><text x="30" y="160" fontSize="14" fontWeight="bold">A</text><text x="205" y="160" fontSize="14" fontWeight="bold">B</text><text x="80" y="25" fontSize="14" fontWeight="bold">C</text><text x="115" y="165" fontSize="12" fontWeight="bold">{AB} cm</text><text x="150" y="85" fontSize="12" fontWeight="bold">{BC} cm</text><text x="35" y="95" fontSize="12" fontWeight="bold">{AC} cm</text></svg>);
  } else if (d.includes("circle")) {
    svg = (<svg viewBox="0 0 300 180" className="w-full h-[180px] bg-white"><circle cx="150" cy="90" r="60" fill="none" stroke="black" strokeWidth="2.5"/></svg>);
  } else {
    svg = (<svg viewBox="0 0 340 160" className="w-full h-[160px] bg-white"><rect x="20" y="20" width="300" height="110" rx="10" fill="white" stroke="black" strokeWidth="2"/><text x="170" y="80" textAnchor="middle" fontSize="13" fontWeight="bold">{desc.slice(0,60)}</text></svg>);
  }
  return (<div className="my-6 border-[3px] border-black bg-white"><div className="bg-black text-white text-[11px] font-bold px-3 py-1.5">DIAGRAM {figNum}</div><div className="p-2 bg-white flex justify-center">{svg}</div><div className="px-3 py-1.5 text-[11px] text-center border-t bg-gray-50">{desc}</div></div>);
}

function AnswerSpace({ grade, subject, showWorking, showAnswer }: { grade: string, subject: string, showWorking: boolean, showAnswer: boolean }) {
  if (!showWorking &&!showAnswer) return null;
  const isLower = ["Grade 1","Grade 2","Grade 3","Grade 4"].includes(grade);
  const lineCount = isLower? 4 : 6;
  return (
    <div className="space-container" style={{marginTop:'10px', marginBottom:'30px'}}>
      {showWorking && (
        <div className="working-section">
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'9px', fontWeight:'bold', color:'#555', marginBottom:'4px', textTransform:'uppercase'}}>
            <span>Working Space</span><span style={{fontSize:'8px', fontWeight:'normal'}}>Rough work - will not be marked</span>
          </div>
          <div style={{border:'1px dashed #888', height:'70px', width:'100%', background:'#fcfcfc', marginBottom:'12px'}}></div>
        </div>
      )}
      {showAnswer && (
        <div className="answer-section">
          <div style={{fontSize:'9px', fontWeight:'bold', color:'#333', marginBottom:'4px', textTransform:'uppercase'}}>Answer Space</div>
          <div style={{border:'1px solid #000', width:'100%'}}>
            {Array.from({length: lineCount}).map((_, i) => (
              <div key={i} style={{height:'28px', borderBottom: i===lineCount-1? 'none' : '1px solid #bbb', background:'white'}}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [schoolName, setSchoolName] = useState("IRSHAAD ISLAMIC SCHOOL");
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [schoolLevel, setSchoolLevel] = useState("Primary + JSS + Senior");
  const [grade, setGrade] = useState("Grade 4");
  const [subject, setSubject] = useState("IRE");
  const [topics, setTopics] = useState<string[]>(["Quran", "Hadith"]);
  const [topicInput, setTopicInput] = useState("");
  const [examType, setExamType] = useState("End term");
  const [difficulty, setDifficulty] = useState("Medium");
  const [structure, setStructure] = useState("Structured");
  const [numQ, setNumQ] = useState(20);
  const [includeSpaces, setIncludeSpaces] = useState(true);
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [paperCode, setPaperCode] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const firstName = schoolName.split(" ")[0] || "SCHOOL";
  const isTechnical = technicalSubjects.includes(subject);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if(file){ const reader = new FileReader(); reader.onload = (ev) => setSchoolLogo(ev.target?.result as string); reader.readAsDataURL(file); } };
  const getAllowedGrades = () => {
    if (schoolLevel === "Primary Only") return ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"];
    if (schoolLevel === "JSS Only") return ["Grade 7","Grade 8","Grade 9"];
    if (schoolLevel === "Senior Only") return ["Grade 10","Grade 11","Grade 12"];
    if (schoolLevel === "Primary + JSS") return ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9"];
    return Object.keys(subjectsByGrade);
  };
  useEffect(() => { const allowed = getAllowedGrades(); if(!allowed.includes(grade)) setGrade(allowed[0]); }, [schoolLevel]);
  useEffect(() => { const first = subjectsByGrade[grade]?.[0]; if(first){ setSubject(first); const sug = suggestedTopics[first]||[]; setTopics(sug.slice(0,2)); } }, [grade]);
  const addTopic = () => { if (topicInput.trim() &&!topics.includes(topicInput.trim())) { setTopics([...topics, topicInput.trim()]); setTopicInput(""); } };
  const removeTopic = (t: string) => setTopics(topics.filter(x => x!== t));
  const generateExam = async () => {
    setLoading(true); setExam(""); setIsEditing(false);
    const code = `MG-${grade.replace("Grade ","G")}-${subject.substring(0,3).toUpperCase()}-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*900)+100}`;
    setPaperCode(code);
    try { const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, grade, topic: topics.join(", ") || subject, numQ, examType, difficulty, structure, schoolName }) }); const data = await res.json(); setExam(data.exam); } catch { setExam("Error generating exam."); }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if(!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'height=900,width=800');
    if(win){
      win.document.write(`<html><head><title>${schoolName}</title><style>
        body{font-family: Times New Roman, serif; margin:0; color:black; -webkit-print-color-adjust:exact;}
      .cover-page{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;padding:30px 25px;box-sizing:border-box;page-break-after:always;position:relative;overflow:hidden}
      .watermark{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:80px;font-weight:900;color:rgba(0,0,0,0.06);letter-spacing:4px;pointer-events:none;z-index:0;white-space:nowrap}
      .school-badge{width:65px!important;height:65px!important;max-width:65px!important;max-height:65px!important;object-fit:contain;display:block;margin:0 auto;}
      .questions-page{padding:30px; font-size:13px; line-height:1.7; position:relative; overflow:hidden}
      .working-section div{border:1px dashed #666!important;}
      .answer-section div div{height:28px!important; border-bottom:1px solid #bbb!important;}
        @media print{.cover-page{height:100vh;}.school-badge{width:55px!important;height:55px!important;}}
      </style></head><body>${content}</body></html>`);
      win.document.close(); win.focus(); setTimeout(()=>win.print(), 400);
    }
  };

  const renderExamWithSpaces = (text: string) => {
    if (!text) return null;
    const showWorkingGlobal = includeSpaces && isTechnical && structure!== "Multiple Choice";
    const showAnswerGlobal = includeSpaces && structure!== "Multiple Choice";

    const blocks = text.split(/(?=\n?\d+\.\s)/g).filter(b => b.trim().length > 0);
    return blocks.map((block, idx) => {
      let fig = 0;
      const parts = block.split(/(\[DIAGRAM:.*?\])/g);
      const rendered = parts.map((part, i) => {
        if (part.startsWith("[DIAGRAM:")) { fig++; const desc = part.replace("[DIAGRAM:", "").replace("]", "").trim(); return <RealDiagram key={i} desc={desc} figNum={fig} />; }
        else { let cleaned = part.replace(/\\\(/g, "").replace(/\\\)/g, "").replace(/\\\[/g, "").replace(/\\\]/g, "").replace(/\^2/g, "²").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*/g, "").replace(/\n/g, "<br/>"); return <span key={i} dangerouslySetInnerHTML={{ __html: cleaned }} />; }
      });
      return (<div key={idx} style={{pageBreakInside:'avoid', marginBottom:'16px'}}><div>{rendered}</div><AnswerSpace grade={grade} subject={subject} showWorking={showWorkingGlobal} showAnswer={showAnswerGlobal} /></div>);
    });
  };

  const durationText = examType==="End term"?"40 MINUTES": examType==="Mid-term"?"1 HOUR":"1 HOUR 30 MINUTES";
  const dateText = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🧠</div><h1 className="text-xl font-bold">MtihaniGen AI</h1></div><div className="text-right text-sm"><div className="font-bold">{schoolName}</div></div></div>
      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-xl p-6 shadow border">
          <h2 className="text-xl font-bold text-[#0d3d4f] mb-1">Create New Exam</h2><p className="text-xs text-gray-500 mb-4">Beautiful KNEC design - IRE/HRE included</p>
          <label className="text-xs font-bold mt-4 block">🏫 SCHOOL NAME</label><input value={schoolName} onChange={e=>setSchoolName(e.target.value.toUpperCase())} className="w-full border p-2.5 rounded-lg mt-1 font-bold mb-3 focus:ring-2 focus:ring-[#0d3d4f]" />
          <label className="text-xs font-bold block">🛡️ SCHOOL BADGE / LOGO (small 65px on print)</label><div className="flex items-center gap-3 mt-1 mb-4"><input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm border p-2 rounded-lg w-full" />{schoolLogo && <img src={schoolLogo} alt="badge" className="w-12 h-12 rounded border object-contain bg-white"/>}</div>
          <label className="text-xs font-bold">📚 SCHOOL EXTENT</label><select value={schoolLevel} onChange={e=>setSchoolLevel(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3"><option>Primary Only</option><option>Primary + JSS</option><option>JSS Only</option><option>Senior Only</option><option>Primary + JSS + Senior</option></select>
          <label className="text-xs font-bold">CLASS / GRADE</label><select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{getAllowedGrades().map(g=><option key={g}>{g}</option>)}</select>
          <label className="text-xs font-bold">SUBJECT</label><select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{subjectsByGrade[grade]?.map(s=><option key={s}>{s}</option>)}</select>
          <label className="text-xs font-bold">TOPIC</label><div className="flex gap-2 mt-1 mb-2"><input list="topic-suggestions" value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Enter topic" className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><datalist id="topic-suggestions">{(suggestedTopics[subject]||[]).map(t=><option key={t} value={t}/>)}</datalist><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div><div className="flex flex-wrap gap-2 mb-3">{topics.map(t=><span key={t} className="bg-blue-100 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>)}</div>
          <label className="text-xs font-bold">TYPE</label><div className="flex gap-2 mb-3 mt-1">{["Opener","Mid-term","End term"].map(type=><button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm ${examType===type?'bg-[#0d3d4f] text-white':'bg-gray-100'}`}>{type}</button>)}</div>
          <label className="text-xs font-bold">DIFFICULTY</label><div className="flex gap-2 mb-3 mt-1">{["Easy","Medium","Hard"].map(d=><button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm ${difficulty===d?'bg-blue-600 text-white':'bg-gray-100'}`}>{d}</button>)}</div>
          <label className="text-xs font-bold">STRUCTURE</label><div className="flex gap-2 mb-3 mt-1">{["Multiple Choice","Structured","Mixed"].map(s=><button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm ${structure===s?'bg-blue-600 text-white':'bg-gray-100'}`}>{s}</button>)}</div>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3">
            <div className="flex items-center justify-between">
              <div><div className="text-xs font-bold">📝 STANDARDIZED ANSWER SPACES</div><div className="text-[10px] text-gray-600">{isTechnical? "Math/Science: Working + Answer" : "IRE/CRE/HRE: Answer only"} | {structure==="Multiple Choice"? "MCQ = No spaces" : "Structured = With spaces"}</div></div>
              <button onClick={()=>setIncludeSpaces(!includeSpaces)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${includeSpaces?'bg-green-600 text-white':'bg-gray-300'}`}>{includeSpaces?'ON':'OFF'}</button>
            </div>
          </div>
          <label className="text-xs font-bold">QUESTIONS</label><div className="flex items-center gap-3 mt-1 mb-6"><button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg">−</button><span className="border px-5 py-2 rounded-lg font-bold">{numQ}</span><button onClick={()=>setNumQ(Math.min(100,numQ+1))} className="border w-9 h-9 rounded-lg">+</button></div>
          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow hover:bg-blue-700">{loading?"Generating...":"✨ Generate Exam"}</button>
        </div>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b"><h2 className="font-bold">Preview</h2><div className="flex gap-2"><button onClick={()=>setIsEditing(!isEditing)} className={`border text-sm px-3 py-1.5 rounded-lg ${isEditing?'bg-yellow-400':'bg-white'}`}>{isEditing?"✔ Done":"✏️ Edit"}</button><button onClick={handleDownloadPDF} disabled={!exam} className="bg-[#0d3d4f] text-white text-sm px-4 py-1.5 rounded-lg">⬇ Download PDF</button></div></div>
          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
              <div ref={printRef}>
                <div className="cover-page p-8 text-center relative" style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between', pageBreakAfter:'always'}}>
                  <div className="watermark">{firstName}</div>
                  <div className="relative z-10 flex flex-col items-center">
                    {schoolLogo? <img src={schoolLogo} alt="School Badge" className="school-badge" style={{width:'65px', height:'65px', objectFit:'contain', marginTop:'12px', marginBottom:'8px'}}/> : <div className="school-badge flex items-center justify-center bg-gray-100 border rounded-full text-xl" style={{width:'65px', height:'65px'}}>🏫</div>}
                    <h1 className="text-[20px] font-bold uppercase tracking-wide mt-3">{schoolName}</h1><div className="w-16 h-0.5 bg-black mx-auto my-4"></div>
                  </div>
                  <div className="relative z-10"><h2 className="text-[15px] font-bold uppercase">{subject} - {grade.toUpperCase()} - {examType.toUpperCase()} EXAMINATION</h2><p className="text-[11px] mt-2 font-mono">{paperCode || "MG-G4-IRE-20250929-001"}</p></div>
                  <div className="relative z-10 space-y-2 text-[13px]"><p><strong>TIME:</strong> {durationText}</p><p><strong>DATE:</strong> {dateText}</p><p><strong>QUESTIONS:</strong> {numQ} | <strong>TYPE:</strong> {structure}</p></div>
                  <div className="relative z-10 border-2 border-black p-4 text-left text-[12px] max-w-[90%] mx-auto leading-relaxed bg-white/80"><strong>INSTRUCTIONS:</strong><br/>{structure==="Multiple Choice"? "Answer ALL questions on the answer sheet provided." : "Answer ALL questions in the spaces provided."}</div>
                  <div className="relative z-10 mb-6"><p className="text-[10px] text-gray-600">This paper consists of {numQ} printed questions</p></div>
                </div>
                <div className="questions-page p-6 relative">
                  <div className="watermark" style={{fontSize:'70px'}}>{firstName}</div>
                  <div className="relative z-10"><div className="text-center font-bold text-[11px] mb-4 border-b pb-2 flex justify-between"><span>{schoolName} | {subject}</span><span>{paperCode}</span></div>{!exam && <p className="text-gray-400 text-center mt-10">Generate exam to see questions - your beautiful design is back</p>}{exam && <div className={`text-[13px] leading-7 ${isEditing?'border-2 border-dashed border-yellow-400 p-2':''}`} contentEditable={isEditing} suppressContentEditableWarning>{renderExamWithSpaces(exam)}</div>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
