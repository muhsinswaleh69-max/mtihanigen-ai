import CreateExamForm from "./components/CreateExamForm";
export default function Home(){
 return (<main className="max-w-6xl mx-auto p-4 md:p-8"><h1 className="font-bold text-xl mb-6">📘 MtihaniGen AI - CBC Compliant</h1><div className="grid lg:grid-cols-2 gap-6"><CreateExamForm /><div className="bg-white rounded-2xl p-8 border border-dashed text-center"><p>Preview will appear here after generation</p></div></div></main>)
}
