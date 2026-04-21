"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import ChatBox from "@/components/ChatBox";
import DocumentUpload from "@/components/DocumentUpload";
import PDFExport from "@/components/PDFExport";
import OfficialDocs from "@/components/OfficialDocs";

export default function Home() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 md:p-12">
      <div className="w-full space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-cyan-400">
            VisaLens <span className="text-white">AI Copilot</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Your legal-tech partner for global mobility and compliance.
          </p>
        </header>

        {/* --- MAIN DASHBOARD --- */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Inputs & Setup */}
            <section className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <span className="text-cyan-400">01.</span> Setup
              </h2>
              <ChatBox 
                onResponse={setResponse} 
                onLoading={setLoading} 
                onCategory={setCategory} 
              />
              <DocumentUpload />
            </section>

            {/* RIGHT COLUMN: AI Results Display */}
            <section className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <span className="text-cyan-400">02.</span> AI Agent Results
              </h2>

              {/* State: Loading */}
              {loading && (
                <Card className="bg-slate-800 border-slate-700 shadow-xl min-h-96 flex items-center justify-center">
                  <CardContent className="pt-6 text-center">
                    <div className="space-y-4">
                      <div className="animate-spin text-cyan-400 text-3xl">⚡</div>
                      <p className="text-slate-300 font-medium">Analyzing with Groq Compound...</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* State: Content Loaded */}
              {response && !loading && (
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 shadow-2xl min-h-96">
                  <CardContent className="p-8">
                    {/* Analysis Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/20">
                      <span className="text-2xl">🛡️</span>
                      <span className="text-lg font-bold text-cyan-400">Compliance Analysis</span>
                    </div>

                    {/* Markdown Content Area */}
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyan-500/20">
                      <div className="prose prose-invert prose-cyan max-w-none 
                        prose-p:leading-relaxed prose-p:text-slate-200 
                        prose-headings:text-cyan-400 prose-headings:font-bold
                        prose-li:text-slate-300 prose-strong:text-white
                        prose-table:border prose-table:border-slate-700
                        prose-th:bg-slate-800 prose-th:p-2 prose-td:p-2 prose-td:border-t prose-td:border-slate-800">
                        
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {response}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6 pt-4 border-t border-cyan-500/20">
                      <PDFExport content={response} category={category} />
                      <OfficialDocs category={category} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* State: Initial/Empty */}
              {!response && !loading && (
                <Card className="bg-slate-800/50 border border-slate-700/50 shadow-xl min-h-96 flex items-center justify-center">
                  <CardContent className="pt-6 text-center">
                    <div className="space-y-3">
                      <div className="text-5xl">📋</div>
                      <p className="text-slate-400 font-medium">Submit your visa details to see compliance analysis</p>
                      <p className="text-slate-500 text-sm">Results will appear here with detailed guidance</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center pt-12 border-t border-slate-900">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            Powered by Groq Compound • VisaLens Compliance Engine V1.0
          </p>
        </footer>
      </div>
    </main>
  );
}
