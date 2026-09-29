import "./globals.css";
export const metadata = { title: "MtihaniGen AI", description: "CBC Exam Generator" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
