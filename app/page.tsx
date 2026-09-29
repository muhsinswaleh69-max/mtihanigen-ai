"use client";
import { useState } from "react";

type ExamType = "Opener" | "Mid-term" | "End term";
type Difficulty = "Easy" | "Medium" | "Hard";
type Structure = "Multiple Choice" | "Structured" | "Mixed";

const TOPIC_OPTIONS = ["Energy", "Forces", "Environment", "Matter", "Light", "Magnetism", "Sound", "Electricity"];

export default function CreateExamForm({ onGenerate }: { onGenerate?: (data: any) => void }) {
  const [classGrade, setClassGrade] = useState("Grade 7");
  const [subject, setSubject] = useState("Science");
  const [topics, setTopics] = useState<string[]>(["Energy", "Forces", "Environment"]);
  const [examType, setExamType] = useState<ExamType>("End term");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [structure, setStructure] = useState<Structure>("Mixed");
  const [sectionA, setSectionA] = useState(6);
  const [sectionB, setSectionB] = useState(4);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  const toggleTopic = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter(t => t!== topic));
    } else {
      setTopics([...topics, topic]);
    }
  };

  const handleMixedChange = (a: number, b: number) => {
    setSectionA(a);
    setSectionB(b);
    setTotalQuestions(a + b);
  };

  const pill = (active: boolean) =>
    `py-2.5 rounded-lg border font-medium transition text-sm ${
      active? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }`;

  const handleGenerate = () => {
    const payload = {
      class: classGrade,
      subject,
      topics, // multi-select array
      examType,
      difficulty,
      structure,
      totalQuestions: structure === "Mixed"? sectionA + sectionB : totalQuestions,
      sectionA: structure === "Mixed"? sectionA : undefined,
      sectionB: structure === "Mixed"? sectionB : undefined,
    };
    if (onGenerate) onGenerate(payload);
    console.log("GENERATE EXAM:", payload);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-[#1e3a5f]">Create New Exam</h2>
      <p className="text-sm text-gray-500 mb-6">Configure exam parameters to generate KCSE CBC compliant questions</p>

      {/* Class */}
      <div className="mb-5">
        <div className="flex justify-between">
          <label className="font-semibold text-sm">Class</label>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Class / Grade</span>
        </div>
        <select value={classGrade} onChange={(e) => setClassGrade(e.target.value)} className="w-full mt-2 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option>Grade 7</option>
          <option>Grade 8</option>
          <option>Grade 9</option>
          <option>Class 8</option>
          <option>Form 4</option>
        </select>
      </div>

      {/* Subject */}
      <div className="mb-5">
        <div className="flex justify-between">
          <label className="font-semibold text-sm">Subject</label>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Subject</span>
        </div>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mt-2 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option>Science</option>
          <option>Mathematics</option>
          <option>English</option>
          <option>Kiswahili</option>
          <option>Social Studies</option>
        </select>
      </div>

      {/* Topic Multi-Select Chips */}
      <div className="mb-5 relative">
        <div className="flex justify-between">
          <label className="font-semibold text-sm">Topic</label>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Topic / Strand</span>
        </div>
        <div onClick={() => setShowTopicDropdown(!showTopicDropdown)} className="w-full mt-2 border border-gray-200 rounded-lg p-2 flex flex-wrap gap-2 min-h-[50px] cursor-pointer bg-white">
          {topics.length === 0 && <span className="text-sm text-gray-400 p-1">Select topics...</span>}
          {topics.map((t) => (
            <span key={t} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {t}
              <button onClick={(e) => { e.stopPropagation(); toggleTopic(t); }} className="font-bold hover:text-blue-900">×</button>
            </span>
          ))}
        </div>
        {showTopicDropdown && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2">
            {TOPIC_OPTIONS.map((opt) => (
              <button key={opt} onClick={() => toggleTopic(opt)} className={`text-left text-sm px-3 py-2 rounded-lg border ${topics.includes(opt)? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"}`}>
                {opt} {topics.includes(opt)? "✓" : ""}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Exam Type */}
      <div className="mb-5">
        <div className="flex justify-between">
          <label className="font-semibold text-sm">Exam Type</label>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Type of Exam</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {(["Opener", "Mid-term", "End term"] as ExamType[]).map((type) => (
            <button key={type} onClick={() => setExamType(type)} className={pill(examType === type)}>{type}</button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-5">
        <div className="flex justify-between">
          <label className="font-semibold text-sm">Difficulty</label>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Difficulty</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
            <button key={d} onClick={() => setDifficulty(d)} className={pill(difficulty === d)}>{d}</button>
          ))}
        </div>
      </div>

      {/* Structure */}
      <div className="mb-3">
        <div className="flex justify-between">
          <label className="font-semibold text-sm">Structure</label>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Question Type</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {(["Multiple Choice", "Structured", "Mixed"] as Structure[]).map((s) => (
            <button key={s} onClick={() => setStructure(s)} className={pill(structure === s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Configure Mixed Sections - Only when Mixed */}
      {structure === "Mixed" && (
        <div className="bg-blue-50/80 rounded-xl p-4 mb-5 border border-blue-100">
          <p className="font-bold text-[#1e3a5f] text-sm mb-3">Configure Mixed Sections</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">☰ SECTION A: Multiple Choice</span>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1 py-1">
                <button onClick={() => handleMixedChange(Math.max(1, sectionA - 1), sectionB)} className="w-7 h-7 rounded hover:bg-gray-100">-</button>
                <span className="w-8 text-center text-sm font-medium">{sectionA}</span>
                <button onClick={() => handleMixedChange(sectionA + 1, sectionB)} className="w-7 h-7 rounded hover:bg-gray-100">+</button>
                <span className="text-[10px] text-gray-500 ml-1 pr-1">questions</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">☰ SECTION B: Structured</span>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1 py-1">
                <button onClick={() => handleMixedChange(sectionA, Math.max(1, sectionB - 1))} className="w-7 h-7 rounded hover:bg-gray-100">-</button>
                <span className="w-8 text-center text-sm font-medium">{sectionB}</span>
                <button onClick={() => handleMixedChange(sectionA, sectionB + 1)} className="w-7 h-7 rounded hover:bg-gray-100">+</button>
                <span className="text-[10px] text-gray-500 ml-1 pr-1">questions</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Number of Questions */}
      <div className="mb-6 flex justify-between items-center">
        <label className="font-semibold text-sm">Number of Questions</label>
        <div className="flex items-center gap-2">
          <button onClick={() => setTotalQuestions(Math.max(1, totalQuestions - 1))} className="border border-gray-200 rounded-lg w-9 h-9 hover:bg-gray-50">−</button>
          <span className="border border-gray-200 rounded-lg w-12 h-9 flex items-center justify-center text-sm font-medium bg-white">
            {structure === "Mixed"? sectionA + sectionB : totalQuestions}
          </span>
          <button onClick={() => setTotalQuestions(totalQuestions + 1)} className="border border-gray-200 rounded-lg w-9 h-9 hover:bg-gray-50">+</button>
        </div>
      </div>

      <button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md transition">
        <span>✨</span> Generate Exam
      </button>
    </div>
  );
}
