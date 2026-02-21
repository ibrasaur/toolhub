import "./globals.css";
import Preloader from "./components/Preloader";

export const metadata = {
  title: "ToolHub — All Tools Within Reach",
  description: "Free tools and courses for students, condensed in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#080808] text-white">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
