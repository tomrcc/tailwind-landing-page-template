import "./css/style.css";

import { Inter } from "next/font/google";
import { EditableRegions } from "@cloudcannon/editable-regions/react";
import CloudCannonEditor from "@/components/cloudcannon-editor";
import site from "@/data/site.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <EditableRegions
          tag="div"
          className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
        >
          {children}
        </EditableRegions>
        <CloudCannonEditor />
      </body>
    </html>
  );
}
