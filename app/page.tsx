import CreateExamForm from "./components/CreateExamForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f6fa] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📘</span>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">MtihaniGen AI</h1>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">CBC Compliant</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <CreateExamForm />
          <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-300 flex items-center justify-center text-center">
            <div>
              <div className="text-5xl mb-4">📝</div>
              <p className="font-semibold">Generated Exam Preview</p>
              <p className="text-sm text-gray-500 mt-2">Your Opener / Mid-term / End term exam will appear here after you click Generate</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
