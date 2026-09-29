"use client";
import { useState } from "react";

export default function Home() {
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 7");
  const [topic, setTopic] = useState("Fractions");
  const [numQ, setNumQ] = useState("10");
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-3xl font-bold text-center mb-2">MtihaniGen AI 🇰🇪</h1>
        <p className="text-center text-gray-600 mb-6">Generate CBC KICD Compliant Exams with AI</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT FORM */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">✨ Generate Real Exam with AI</h2>

            <label className="block text-sm font-medium mb-1">Subject</label>
            <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="w-full border p-2 rounded mb-3">
              <option>Mathematics</option><option>English</option><option>Kiswahili</option><option>Science</option><option>Social Studies</option><option>CRE</option><option>Agriculture</option>
            </select>

            <label className="block text-sm font-medium mb-1">Class</label>
            <select value={grade} onChange={(e)=>setGrade(e.target.value)} className="w-full border p-2 rounded mb-3">
              <option>Grade 4</option><option>Grade 5</option><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Form 1</option><option>Form 2</option><option>Form 3</option><option>Form 4</option>
            </select>

            <label className="block text-sm font-medium mb-1">Topic</label>
            <input value={topic} onChange={(e)=>setTopic(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="e.g. Fractions" />

            <label className="block text-sm font-medium mb-1">No. of Questions</label>
            <input value={numQ} onChange={(e)=>setNumQ(e.target.value)} className="w-full border p-2 rounded mb-4" type="number" />

            <button onClick={generateExam} disabled={loading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 disabled:bg-gray-400">
              {loading? "Generating... Please wait 10s" : "✨ Generate Real Exam with AI"}
            </button>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Preview</h2>
            {!exam && <p className="text-gray-400 text-sm">Preview will appear here after generation</p>}
            {exam && (
              <>
                <div className="border p-4 rounded bg-white text-sm leading-6 text-gray-800 max-h-[600px] overflow-y-auto"
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
