
import CreateExamForm from "./components/CreateExamForm";
export default function Home() {
  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">📘 MtihaniGen AI - CBC Compliant</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <CreateExamForm />
        <div className="bg-white rounded-2xl p-8 border border-dashed flex items-center justify-center text-center">
          <div>
            <div className="text-5xl mb-4">📝</div>
            <p className="font-bold">Preview</p>
            <p className="text-sm text-gray-500">Generated exam will appear here</p>
          </div>
        </div>
      </div>
    </main>
  );
}
