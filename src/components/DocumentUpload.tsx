"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
}

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    Array.from(selectedFiles).forEach((file) => {
      const newFile: UploadedFile = {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type,
        progress: 0,
      };

      setFiles((prev) => [...prev, newFile]);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 20;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
        }
        setFiles((prev) =>
          prev.map((f) => (f.name === file.name ? { ...f, progress: currentProgress } : f))
        );
      }, 300);
    });
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-6">
        <h3 className="text-sm font-bold text-cyan-400 uppercase mb-4 tracking-wider">Upload Required Documents</h3>
        <div className="relative group border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
          <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} />
          <div className="space-y-2">
            <span className="text-3xl text-white">📄</span>
            <p className="text-sm text-slate-300 font-medium">Click or drag your <span className="text-cyan-400 font-bold">Passport or I-20</span> here</p>
            <p className="text-[10px] text-slate-500">PDF, PNG, or JPG (Max 5MB)</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {files.map((file, idx) => (
            <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-200 font-mono truncate max-w-50">{file.name}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">{file.progress === 100 ? "Ready" : "Uploading..."}</span>
              </div>
              <Progress value={file.progress} className="h-1 bg-slate-700" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
