"use client";
import { useState, useEffect } from "react";

const subjectsByGrade: Record<string, string[]> = {
  "Grade 1": ["Literacy Activities", "Kiswahili Language Activities", "Mathematical Activities", "Environmental Activities", "Hygiene and Nutrition Activities", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Activities", "Indigenous Language"],
  "Grade 2": ["Literacy Activities", "Kiswahili Language Activities", "Mathematical Activities", "Environmental Activities", "Hygiene and Nutrition Activities", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Activities", "Indigenous Language"],
  "Grade 3": ["Literacy Activities", "Kiswahili Language Activities", "Mathematical Activities", "Environmental Activities", "Hygiene and Nutrition Activities", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Activities", "Indigenous Language"],
  "Grade 4": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Arts"],
  "Grade 5": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Arts"],
  "Grade 6": ["Mathematics", "English", "Kiswahili", "Science and Technology", "Social Studies", "Agriculture", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Arts"],
  "Grade 7": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Arts and Sports", "Business Studies", "Computer Studies"],
  "Grade 8": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Arts and Sports", "Business Studies", "Computer Studies"],
  "Grade 9": ["Mathematics", "English", "Kiswahili", "Integrated Science", "Social Studies", "Agriculture and Nutrition", "Pre-Technical Studies", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Creative Arts and Sports", "Business Studies", "Computer Studies"],
  "Grade 10": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Business Studies", "Agriculture", "Computer Studies", "Home Science"],
  "Grade 11": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Business Studies", "Agriculture", "Computer Studies", "Home Science"],
  "Grade 12": ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "Christian Religious Education (CRE)", "Islamic Religious Education (IRE)", "Hindu Religious Education (HRE)", "Business Studies", "Agriculture", "Computer Studies", "Home Science"],
};

export default function Home() {
  const [grade, setGrade] = useState("Grade 7");
  const [subject, setSubject] = useState(subjectsByGrade["Grade 7"][0]);
  const [topic, setTopic] = useState("all topics");
  const [numQ, setNumQ] = useState("10");
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSubject(subjectsByGrade[grade][0]);
  }, [grade]);

  const generateExam = async () => {
    setLoading(true);
    setExam("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, grade, topic, numQ }),
      });
      const data = await res.json();
      setExam(data.exam);
    } catch (e) {
      setExam("Error generating exam. Try again.");
    }
    setLoading(false);
  };

  const formatExam = (text: string) => {
    return text
   .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-black">$1</strong>')
   .replace(/###\s*(.*)/g, '<h3 class="font-bold text-lg mt-6 mb-2 text-blue-900">$1</h3>')
   .replace(/##\s*(.*)/g, '<h2 class="font-bold text-xl mt-6 mb-2">$1</h2>')
   .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">MtihaniGen AI KE</h1>
        <p className="text-center text-gray-600 mb-6">Generate CBC KICD Compliant Exams with AI</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">✨ Generate Real Exam with AI</h2>

            <label className="block text-sm font-medium mb-1">Class</label>
            <select value={grade} onChange={(e)=>setGrade(e.target.value)} className="w-full border p-2 rounded mb-3">
              {Object.keys(subjectsByGrade).map(g => <option key={g}>{g}</option>)}
            </select>

            <label className="block text-sm font-medium mb-1">Learning Area / Subject - for {grade}</label>
            <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="w-full border p-2 rounded mb-3">
              {subjectsByGrade[grade].map(s => <option key={s}>{s}</option>)}
            </select>

            <label className="block text-sm font-medium mb-1">Topic</label>
            <input value={topic} onChange={(e)=>setTopic(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="e.g. all topics" />

            <label className="block text-sm font-medium mb-1">No. of Questions</label>
            <input value={numQ} onChange={(e)=>setNumQ(e.target.value)} className="w-full border p-2 rounded mb-4" type="number" />

            <button onClick={generateExam} disabled={loading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 disabled:bg-gray-400">
              {loading? "Generating... Please wait" : "✨ Generate Real Exam with AI"}
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Preview - {subject} {grade}</h2>
            {!exam && <p className="text-gray-400 text-sm">Preview will appear here after generation</p>}
            {exam && (
              <>
                <div className="border p-4 rounded bg-white text-sm leading-6 text-gray-800 max-h-[650px] overflow-y-auto"
                     dangerouslySetInnerHTML={{ __html: formatExam(exam) }}
                />
                <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold">
                  Pay 50 KES with M-Pesa to Download PDF
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
