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

// HIGHLIGHTED TOPICS PER LEARNING AREA - from your notes
const topicsBySubject: Record<string, string[]> = {
  "English": ["Comprehension - Passage 1", "Comprehension - Passage 2", "Comprehension - Passage 3", "Grammar - Nouns", "Grammar - Verbs", "Grammar - Adjectives", "Cloze Test", "Literature - Poem", "Literature - Story", "Composition"],
  "Kiswahili": ["Ufahamu - Aya 1", "Ufahamu - Aya 2", "Ufahamu - Aya 3", "Sarufi - Nomino", "Sarufi - Vitenzi", "Kuziba Pengo", "Fasihi - Hadithi", "Fasihi - Shairi", "Insha"],
  "Mathematics": ["Numbers - Whole Numbers", "Numbers - Fractions", "Numbers - Decimals", "Numbers - Percentages", "Operations - Addition", "Operations - Subtraction", "Multiplication", "Division", "Geometry", "Measurement", "Algebra", "According to Curriculum Design"],
  "IRE": ["Quran - Surah", "Quran - Tajweed", "Quran - Tafsir", "Hadith - 2 Qs", "Hadith - Sunnah", "Fiqh - Salah", "Fiqh - Saum", "Tawheed", "Akhlaq", "Seerah"],
  "CRE": ["Creation", "Old Testament", "Life of Jesus", "Church History", "Christian Values"],
  "HRE": ["Dharma", "Karma", "Vedas", "Hindu Festivals", "Scriptures"],
};

const suggestedTopics: Record<string, string[]> = topicsBySubject;

function RealDiagram({ desc, figNum }: { desc: string, figNum: number }) {
  return (<div style={{border:'2px solid black', margin:'12px 0'}}><div style={{background:'black', color:'white', fontSize:'10px', padding:'4px 8px'}}>DIAGRAM {figNum}</div><div style={{padding:'6px', background:'white', textAlign:'center', fontSize:'12px'}}>{desc}</div></div>);
}

function CleanSpace({ grade, subject }: { grade: string, subject: string }) {
  const isMath = technicalSubjects.includes(subject);
  const isLower = ["Grade 1","Grade 2","Grade 3","Grade 4"].includes(grade);
  if (isMath) {
    return (<div style={{marginTop:'10px', marginBottom:'28px'}}><div style={{border:'1px dashed #888', height:isLower?'75px':'100px', width:'100%', background:'#fff'}}></div></div>);
  } else {
    const lineCount = isLower? 3 : 5;
    return (<div style={{marginTop:'10px', marginBottom:'28px'}}><div style={{width:'100%'}}>{Array.from({length: lineCount}).map((_, i) => (<div key={i} style={{height:'32px', borderBottom:'1px solid #999', background:'white'}}></div>))}</div></div>);
  }
}

export default function Home() {
  const [schoolName, setSchoolName] = useState("IRSHAAD ISLAMIC SCHOOL");
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [grade, setGrade] = useState("Grade 4");
  const [subject, setSubject] = useState("IRE");
  const [topics, setTopics] = useState<string[]>(["Quran - Surah", "Quran - Tajweed", "Hadith - 2 Qs"]);
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if(file){ const reader = new FileReader(); reader.onload = (ev) => setSchoolLogo(ev.target?.result as string); reader.readAsDataURL(file); } };

  useEffect(() => {
    const sug = topicsBySubject[subject] || [];
    if(subject==="English" || subject==="Kiswahili"){
      setTopics(sug.slice(0,5)); // Auto highlight Comprehension + Language
      setStructure("Mixed"); // English must be Mixed as per notes
    } else if (subject==="Mathematics") {
      setTopics(["Numbers - Whole Numbers", "Operations - Addition", "According to Curriculum Design"]);
      setStructure("Structured");
    } else if (subject==="IRE") {
      setTopics(["Quran - Surah", "Quran - Tajweed", "Quran - Tafsir", "Hadith - 2 Qs", "Hadith - Sunnah"]); // 3 Quran + 2 Hadith
      setStructure("Structured");
    } else {
      setTopics(sug.slice(0,2));
    }
  }, [subject]);

  const addTopic = () => { if (topicInput.trim() &&!topics.includes(topicInput.trim())) { setTopics([...topics, topicInput.trim()]); setTopicInput(""); } };
  const removeTopic = (t: string) => setTopics(topics.filter(x => x!== t));

  const generateExam = async () => {
    setLoading(true); setExam(""); setIsEditing(false);
    const code = `MG-${grade.replace("Grade ","G")}-${subject.substring(0,3).toUpperCase()}-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*900)+100}`;
    setPaperCode(code);

    // Build special prompt as per your handwritten notes
    let formatInstruction = "";
    if(subject==="English" || subject==="Kiswahili"){
      formatInstruction = `FORMAT MUST BE: Section A: Reading Comprehension - 3 short passages each with 5 marks questions (Total 15mks). Section B: Language questions, Cloze test, Literature. Follow CBC.`;
    } else if (subject==="Mathematics") {
      formatInstruction = `FORMAT: Numbers as you go according to curriculum design - progress from whole numbers, fractions, decimals, operations sequentially.`;
    } else if (subject==="IRE") {
      formatInstruction = `FORMAT: Quran - 3 questions, Hadith - 2 questions as per class syllabus, plus Fiqh, Tawheed. Total ${numQ} questions.`;
    }

    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, grade, topic: topics.join(", ") + " | " + formatInstruction, numQ, examType, difficulty, structure, schoolName }) });
      const data = await res.json(); setExam(data.exam);
    } catch { setExam("Error generating exam."); }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if(!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'height=900,width=800');
    if(win){
      win.document.write(`<html><head><title>${schoolName}</title><style>body{font-family: Times New Roman, serif; margin:0; color:black; -webkit-print-color-adjust:exact;}.cover-page{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;padding:30px 25px;box-sizing:border-box;page-break-after:always;position:relative;overflow:hidden}.watermark{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:80px;font-weight:900;color:rgba(0,0,0,0.06);letter-spacing:4px;pointer-events:none;z-index:0;white-space:nowrap}.school-badge{width:65px!important;height:65px!important;object-fit:contain;}.questions-page{padding:30px; font-size:13px; line-height:1.7;} @media print{.cover-page{height:100vh;}}</style></head><body>${content}</body></html>`);
      win.document.close(); win.focus(); setTimeout(()=>win.print(), 400);
    }
  };

  const renderExamWithSpaces = (text: string) => {
    if (!text) return null;
    const shouldShowSpaces = includeSpaces && structure!== "Multiple Choice";
    const blocks = text.split(/(?=\n?\d+\.\s|SECTION [AB]:)/g).filter(b => b.trim().length > 0);
    return blocks.map((block, idx) => {
      let fig = 0;
      const parts = block.split(/(\[DIAGRAM:.*?\])/g);
      const rendered = parts.map((part, i) => {
        if (part.startsWith("[DIAGRAM:")) { fig++; const desc = part.replace("[DIAGRAM:", "").replace("]", "").trim(); return <RealDiagram key={i} desc={desc} figNum={fig} />; }
        else { let cleaned = part.replace(/\\\(/g, "").replace(/\\\)/g, "").replace(/\\\[/g, "").replace(/\\\]/g, "").replace(/\^2/g, "²").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*/g, "").replace(/\n/g, "<br/>"); return <span key={i} dangerouslySetInnerHTML={{ __html: cleaned }} />; }
      });
      const isSectionHeader = block.includes("SECTION");
      return (<div key={idx} style={{pageBreakInside: isSectionHeader? 'avoid':'auto', marginBottom: isSectionHeader? '12px':'18px', fontWeight: isSectionHeader? 'bold':'normal'}}><div>{rendered}</div>{!isSectionHeader && shouldShowSpaces && <CleanSpace grade={grade} subject={subject} />}</div>);
    });
  };

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🧠</div><h1 className="text-xl font-bold">MtihaniGen AI</h1></div><div className="text-right text-sm"><div className="font-bold">{schoolName}</div></div></div>
      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-xl p-6 shadow border">
          <h2 className="text-xl font-bold text-[#0d3d4f] mb-1">Create New Exam</h2>
          <p className="text-[11px] text-gray-500 mb-4">Dropdown & highlight topics as per learning area - your notes implemented</p>
          <label className="text-xs font-bold mt-4 block">🏫 SCHOOL NAME</label><input value={schoolName} onChange={e=>setSchoolName(e.target.value.toUpperCase())} className="w-full border p-2.5 rounded-lg mt-1 font-bold mb-3" />
          <label className="text-xs font-bold block">🛡️ SCHOOL BADGE (65px print)</label><div className="flex items-center gap-3 mt-1 mb-4"><input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm border p-2 rounded-lg w-full" />{schoolLogo && <img src={schoolLogo} alt="badge" className="w-12 h-12 rounded border object-contain bg-white"/>}</div>
          <label className="text-xs font-bold">CLASS / GRADE</label><select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{Object.keys(subjectsByGrade).map(g=><option key={g}>{g}</option>)}</select>
          <label className="text-xs font-bold">SUBJECT - {subject==="English"||subject==="Kiswahili"? "Section A: 3 passages x5mks": subject==="Mathematics"? "Numbers as per curriculum": subject==="IRE"? "Quran 3 Qs + Hadith 2 Qs":""}</label><select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 mb-3">{subjectsByGrade[grade]?.map(s=><option key={s}>{s}</option>)}</select>

          <label className="text-xs font-bold">TOPICS - Dropdown & Highlight (as per learning area)</label>
          <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-lg mt-1 mb-2">
            <div className="text-[10px] font-bold text-yellow-800">Suggested for {subject}:</div>
            <div className="flex flex-wrap gap-1 mt-1">{(topicsBySubject[subject]||[]).map(t=><button key={t} onClick={()=>!topics.includes(t)&&setTopics([...topics,t])} className={`text-[10px] px-2 py-1 rounded-full border ${topics.includes(t)?'bg-green-600 text-white border-green-600':'bg-white hover:bg-blue-100'}`}>{t}</button>)}</div>
          </div>
          <div className="flex gap-2 mt-1 mb-2"><input list="topic-suggestions" value={topicInput} onChange={e=>setTopicInput(e.target.value)} placeholder="Or type custom topic" className="flex-1 border p-2.5 rounded-lg bg-gray-50" /><button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button></div>
          <div className="flex flex-wrap gap-2 mb-3">{topics.map(t=><span key={t} className="bg-blue-100 px-3 py-1 rounded-full text-sm">{t} <button onClick={()=>removeTopic(t)}>×</button></span>)}</div>

          <label className="text-xs font-bold">STRUCTURE - Auto set by notes</label><div className="flex gap-2 mb-3 mt-1">{["Multiple Choice","Structured","Mixed"].map(s=><button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm ${structure===s?'bg-blue-600 text-white':'bg-gray-100'}`}>{s}</button>)}</div>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3"><div className="flex items-center justify-between"><div><div className="text-xs font-bold">📝 Answer Space - Clean (No labels)</div><div className="text-[10px] text-gray-600">{technicalSubjects.includes(subject)? "Math = dashed box only" : "Other = lines only"}</div></div><button onClick={()=>setIncludeSpaces(!includeSpaces)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${includeSpaces?'bg-green-600 text-white':'bg-gray-300'}`}>{includeSpaces?'ON':'OFF'}</button></div></div>
          <label className="text-xs font-bold">QUESTIONS</label><div className="flex items-center gap-3 mt-1 mb-6"><button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg">−</button><span className="border px-5 py-2 rounded-lg font-bold">{numQ}</span><button onClick={()=>setNumQ(Math.min(100,numQ+1))} className="border w-9 h-9 rounded-lg">+</button></div>
          <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow">{loading?"Generating...":"✨ Generate Exam"}</button>
        </div>
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b"><h2 className="font-bold">Preview</h2><div className="flex gap-2"><button onClick={()=>setIsEditing(!isEditing)} className={`border text-sm px-3 py-1.5 rounded-lg ${isEditing?'bg-yellow-400':'bg-white'}`}>{isEditing?"✔ Done":"✏️ Edit"}</button><button onClick={handleDownloadPDF} disabled={!exam} className="bg-[#0d3d4f] text-white text-sm px-4 py-1.5 rounded-lg">⬇ Download PDF</button></div></div>
          <div className="p-4 bg-[#f5f7fb] min-h-[800px]"><div className="bg-white rounded-xl shadow-lg border overflow-hidden"><div ref={printRef}>
                <div className="cover-page p-8 text-center relative" style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between', pageBreakAfter:'always'}}><div className="watermark">{firstName}</div><div className="relative z-10 flex flex-col items-center">{schoolLogo? <img src={schoolLogo} alt="Badge" className="school-badge" style={{width:'65px', height:'65px', objectFit:'contain', marginTop:'12px'}}/> : <div className="school-badge flex items-center justify-center bg-gray-100 border rounded-full text-xl" style={{width:'65px', height:'65px'}}>🏫</div>}<h1 className="text-[20px] font-bold uppercase mt-3">{schoolName}</h1><div className="w-16 h-0.5 bg-black mx-auto my-4"></div></div><div className="relative z-10"><h2 className="text-[15px] font-bold uppercase">{subject} - {grade.toUpperCase()} - {examType.toUpperCase()} EXAMINATION</h2><p className="text-[11px] mt-2 font-mono">{paperCode}</p></div><div className="relative z-10 space-y-2 text-[13px]"><p><strong>TIME:</strong> {examType==="End term"?"40 MINUTES":"1 HOUR"}</p><p><strong>DATE:</strong> {new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' })}</p><p><strong>QUESTIONS:</strong> {numQ}</p></div><div className="relative z-10 border-2 border-black p-4 text-left text-[12px] max-w-[90%] mx-auto bg-white/80"><strong>INSTRUCTIONS:</strong><br/>Answer ALL questions in the spaces provided.</div><div className="relative z-10 mb-6"><p className="text-[10px] text-gray-600">This paper consists of {numQ} printed questions</p></div></div>
                <div className="questions-page p-6 relative"><div className="watermark" style={{fontSize:'70px'}}>{firstName}</div><div className="relative z-10"><div className="text-center font-bold text-[11px] mb-4 border-b pb-2 flex justify-between"><span>{schoolName} | {subject}</span><span>{paperCode}</span></div>{!exam && <p className="text-gray-400 text-center mt-10">Your notes implemented - Generate to see English 3 passages format</p>}{exam && <div className={`text-[13px] leading-7 ${isEditing?'border-2 border-dashed border-yellow-400 p-2':''}`} contentEditable={isEditing} suppressContentEditableWarning>{renderExamWithSpaces(exam)}</div>}</div></div>
          </div></div></div>
        </div>
      </div>
    </div>
  );
}
