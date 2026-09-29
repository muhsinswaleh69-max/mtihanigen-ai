import "./globals.css";
export const metadata = { title: "MtihaniGen AI", description: "AI Exam Generator for Kenyan CBC" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-[#f3f6fa] min-h-screen">{children}</body></html>;
}
