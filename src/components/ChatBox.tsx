"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ChatBoxProps {
  onResponse?: (response: string) => void;
  onLoading?: (loading: boolean) => void;
  onCategory?: (category: string) => void;
}

const VISA_TYPES = [
  "US F1 Student Visa", "US F2 Student Visa", "US M1 Student Visa", "US M2 Student Visa",
  "US H1B Work Visa", "US B1 Visitor Visa", "US B2 Visitor Visa", "US B1/B2 Visitor Visa",
  "US L1 Professional Skilled Worker Visa", "UK Student Visa", "UK Tourist Visa",
  "UK Work Visa", "UK Professional Skilled Worker Visa", "Canada Student Visa",
  "Canada Tourist Visa", "Canada Work Visa", "Canada Professional Skilled Worker Visa",
  "Germany Student Visa", "Germany Tourist Visa", "Germany Work Visa",
  "Germany Professional Skilled Worker Visa", "Italy Student Visa", "Italy Tourist Visa",
  "Italy Work Visa", "Italy Professional Skilled Worker Visa", "Australia Student Visa",
  "Australia Tourist Visa", "Australia Work Visa", "Australia Professional Skilled Worker Visa",
  "New Zealand Student Visa", "New Zealand Tourist Visa", "New Zealand Work Visa",
  "New Zealand Professional Skilled Worker Visa", "Austria Student Visa", "Austria Tourist Visa",
  "Austria Work Visa", "Austria Professional Skilled Worker Visa", "Turkey Student Visa",
  "Turkey Tourist Visa", "Turkey Work Visa", "Turkey Professional Skilled Worker Visa",
  "Russia Student Visa", "Russia Tourist Visa", "Russia Work Visa",
  "Russia Professional Skilled Worker Visa", "UAE Student Visa", "UAE Tourist Visa",
  "UAE Work Visa", "UAE Professional Skilled Worker Visa", "France Student Visa",
  "France Tourist Visa", "France Work Visa", "France Professional Skilled Worker Visa",
  "Ireland Student Visa", "Ireland Tourist Visa", "Ireland Work Visa",
  "Ireland Professional Skilled Worker Visa", "China Student Visa", "China Tourist Visa",
  "China Work Visa", "China Professional Skilled Worker Visa", "Japan Student Visa",
  "Japan Tourist Visa", "Japan Work Visa", "Japan Professional Skilled Worker Visa",
  "South Korea Student Visa", "South Korea Tourist Visa", "South Korea Work Visa",
  "South Korea Professional Skilled Worker Visa", "Schengen Tourist visa-Spain"
];

export default function ChatBox({ onResponse, onLoading, onCategory }: ChatBoxProps) {
  const [query, setQuery] = useState(""); // Fixed: Added missing quote
  const [category, setCategory] = useState(VISA_TYPES[0]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [readiness, setReadiness] = useState(0);

  useEffect(() => {
    if (response) { // Fixed: Properly closed block
      let score = 30;
      if (response.toLowerCase().includes("valid")) score += 20;
      if (response.toLowerCase().includes("ready")) score += 30;
      if (response.toLowerCase().includes("checklist")) score += 10;
      setReadiness(Math.min(score, 100));
      onResponse?.(response);
    }
  }, [response]);

  const askVisaAI = async () => {
    if (!query) return;
    setLoading(true);
    onLoading?.(true);
    setReadiness(10);
    try {
      const res = await fetch('/api/visa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Fixed: Moved into config object
        body: JSON.stringify({ category, userQuery: query }),
      });
      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      setResponse("Error connecting to Visa AI.");
      setReadiness(0);
    }
    setLoading(false);
    onLoading?.(false);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-tighter">Visa Readiness Score</span>
          <span className="text-xs font-mono text-white">{readiness}%</span>
        </div>
        <Progress value={readiness} className="h-2 bg-slate-800" />
      </div>

      <div className="space-y-4">
        <select
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            onCategory?.(e.target.value);
          }}
        >
          {VISA_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <textarea
          className="w-full p-4 bg-slate-900 border border-slate-700 rounded-lg text-white min-h-30 outline-none"
          placeholder="Ex: Do I have enough funds for a German student visa?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={askVisaAI} disabled={loading || !query} className="w-full bg-cyan-600 hover:bg-cyan-500 py-6">
          {loading ? "Analyzing with Groq/Compound...." : "Check Readiness"}
        </Button>
      </div>
    </div>
  );
}
