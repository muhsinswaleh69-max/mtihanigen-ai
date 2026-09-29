"use client";
import { useState, useEffect } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental Activities", "Hygiene and Nutrition", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 2": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental Activities", "Hygiene and Nutrition", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 3": ["Literacy Activities", "Kiswahili", "Mathematical Activities", "Environmental Activities", "Hygiene and Nutrition", "CRE", "IRE", "HRE", "Creative Activities"],
  "Grade 4": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE", "Creative Arts"],
  "Grade 5": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE", "Creative Arts"],
  "Grade 6": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "CRE", "IRE", "HRE", "Creative Arts"],
  "Grade 7": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Business Studies", "Computer Studies"],
  "Grade 8": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Business Studies", "Computer Studies"],
  "Grade 9": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "CRE", "IRE", "HRE", "Business Studies", "Computer Studies"],
  "Grade 10": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business Studies", "Agriculture", "Computer Studies", "Home Science"],
  "Grade 11": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business Studies", "Agriculture", "Computer Studies", "Home Science"],
  "Grade 12": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "CRE", "IRE", "HRE", "Business Studies", "Agriculture", "Computer Studies", "Home Science"],
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

  useEffect(() => {
    setSubject(subjectsByGrade[grade][0]);
  }, [grade]);

  const addTopic = () => {
    if (topicInput.trim() &&!topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput("");
    }
  };
  const removeTopic = (t: string) => setTopics(topics.filter(x => x!== t));

  const generateExam = async () => {
    setLoading(true);
    setExam("");
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
    } catch (e) {
      setExam("Error generating exam.");
    }
    setLoading(false);
  };

  const renderExam = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\[DIAGRAM:.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith("[DIAGRAM:")) {
        const desc = part.replace("[DIAGRAM:", "").replace("]", "").trim();
        return (
          <div key={i} className="my-4 border-2 border-dashed border-gray-400 p-4 rounded-lg bg-gray-50 text-center">
            <div className="text-4xl mb-2">📐</div>
            <div className="text-[11px] font-bold text-gray-700 tracking-widest">DIAGRAM</div>
            <div className="text-xs text-gray-600 italic mt-1">{desc}</div>
            <div className="text-[9px] text-gray-400 mt-2">Fig. {Math.floor(i/2)+1} - KICD Standard (Black & White, Photocopy Friendly)</div>
          </div>
        );
      } else {
        const cleaned = part
         .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
         .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
         .replace(/\*\*/g, "").replace(/\*/g, "")
         .replace(/\n/g, "<br/>");
        return <span key={i} dangerouslySetInnerHTML={{ __html: cleaned }} />;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#0d3d4f] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🧠</div>
          <h1 className="text-2xl font-bold">MtihaniGen AI</h1>
          <span className="bg-[#7de2e6] text-[#0d3d4f] text-[10px] px-3 py-1 rounded-full font-bold ml-2">AI EXAM GENERATOR</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span>🔔</span><span>⚙️</span>
          <div className="text-right leading-tight">
            <div className="font-bold">Teacher Jane</div>
            <div className="text-xs opacity-80">Mumias Primary ▼</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold text-[#0d3d4f]">Create New Exam</h2>
          <p className="text-gray-500 text-sm mb-6">Configure exam parameters to generate KCSE CBC compliant questions</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600">CLASS / GRADE</label>
              <select value={grade} onChange={e=>setGrade(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50">
                {Object.keys(subjectsByGrade).map(g => <option key={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600">SUBJECT</label>
              <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50">
                {subjectsByGrade[grade].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600">TOPIC / STRAND</label>
              <div className="flex gap-2 mt-1">
                <input value={topicInput} onChange={e=>setTopicInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTopic()} placeholder="Type topic and press Enter" className="flex-1 border p-2.5 rounded-lg bg-gray-50" />
                <button onClick={addTopic} className="bg-[#0d3d4f] text-white px-5 rounded-lg">Add</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {topics.map(t => (
                  <span key={t} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {t} <button onClick={()=>removeTopic(t)} className="font-bold">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600">TYPE OF EXAM</label>
              <div className="flex gap-2 mt-1">
                {["Opener","Mid-term","End term"].map(type => (
                  <button key={type} onClick={()=>setExamType(type)} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${examType===type?'bg-[#0d3d4f] text-white border-[#0d3d4f]':'bg-gray-100'}`}>{type}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600">DIFFICULTY</label>
              <div className="flex gap-2 mt-1">
                {["Easy","Medium","Hard"].map(d => (
                  <button key={d} onClick={()=>setDifficulty(d)} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${difficulty===d?'bg-blue-600 text-white border-blue-600':'bg-gray-100'}`}>{d}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600">QUESTION TYPE</label>
              <div className="flex gap-2 mt-1">
                {["Multiple Choice","Structured","Mixed"].map(s => (
                  <button key={s} onClick={()=>setStructure(s)} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${structure===s?'bg-blue-600 text-white border-blue-600':'bg-gray-100'}`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600">NUMBER OF QUESTIONS</label>
              <div className="flex items-center gap-3 mt-1">
                <button onClick={()=>setNumQ(Math.max(5,numQ-1))} className="border w-9 h-9 rounded-lg bg-white">−</button>
                <span className="border px-5 py-2 rounded-lg bg-white font-bold">{numQ}</span>
                <button onClick={()=>setNumQ(Math.min(50,numQ+1))} className="border w-9 h-9 rounded-lg bg-white">+</button>
              </div>
            </div>

            <button onClick={generateExam} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-lg mt-2">
              {loading? "Generating with Diagrams..." : "✨ Generate Exam"}
            </button>

            <div className="bg-blue-50 p-3 rounded-xl text-sm flex gap-3 items-start">
              <span className="text-xl">💡</span>
              <div>
                <div>AI Credits remaining: 12 / 20</div>
                <div className="text-blue-600 font-bold">View generation history →</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b flex-wrap gap-2">
            <h2 className="font-bold">Generated Exam Preview</h2>
            <div className="flex gap-2 items-center">
              <span className="bg-green-100 text-green-700 text-[11px] px-3 py-1 rounded-full font-bold">Generated • Ready</span>
              <button className="border text-sm px-3 py-1.5 rounded-lg bg-white">⬇ Download PDF</button>
              <button className="border text-sm px-3 py-1.5 rounded-lg bg-white">✏️ Edit</button>
            </div>
          </div>

          <div className="p-4 bg-[#f5f7fb] min-h-[800px]">
            <div className="bg-white p-6 rounded-xl shadow-lg border relative overflow-hidden">
              <div className="absolute top-40 left-10 text-gray-200 text-6xl rotate-[-30deg] opacity-10 font-bold pointer-events-none select-none">DRAFT<br/>MtihaniGen AI</div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2 font-bold text-[#0d3d4f] text-sm">
                  <span className="text-2xl">🇰🇪</span> MUMIAS PRIMARY SCHOOL
                </div>
                <div className="w-14 h-14 bg-white border flex items-center justify-center text-[8px]">QR CODE</div>
              </div>

              <h3 className="text-center font-bold text-[15px] text-[#0d3d4f] mb-1 relative z-10">
                {subject.includes("Kiswahili")? `GREDI YA ${grade.replace("Grade ","")} ${subject.toUpperCase()} — MTIHANI` : `GRADE ${grade.replace("Grade ","")} ${subject.toUpperCase()} — EXAM PAPER`}
              </h3>
              <p className="text-center text-[10px] text-gray-600 mb-4 relative z-10">
                Strand: {topics.join(" | ")} | KCSE CBC Competency-Based | {difficulty} | {numQ} Qs | Duration: {examType==="End term"?"40 Minutes":"1 HR 30 MINS"}
              </p>

              <div className="bg-blue-50 p-2.5 rounded text-[11px] mb-4 relative z-10">
                <strong>{subject.includes("Kiswahili")?"Maelekezo:":"Instructions:"}</strong> {subject.includes("Kiswahili")?"Jibu maswali YOTE. Kila swali lina alama 1. Chagua jibu bora panapohitajika.":"Answer ALL questions. Each question carries 1 mark. Choose the best answer where applicable."}
              </div>

              {!exam && <p className="text-gray-400 text-sm text-center mt-20 relative z-10">Click Generate Exam to see preview here with diagrams</p>}
              {exam && <div className="text-[13px] leading-6 relative z-10">{renderExam(exam)}</div>}

              <div className="text-[8px] text-gray-400 mt-8 border-t pt-2 flex justify-between relative z-10">
                <span>Generated by MtihaniGen AI • {new Date().toLocaleDateString()} • Doc ID: MG-AI-EX-G7-SCI-ENERGY-0929</span>
                <span>Scan to verify authenticity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
