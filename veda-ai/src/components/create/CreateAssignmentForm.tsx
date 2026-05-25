"use client";

import { useState, useRef } from "react";
import { CloudUpload, X, Plus, Calendar as CalendarIcon, ArrowLeft, ArrowRight, Minus, FileText as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface QuestionTypeRow {
  id: string;
  type: string;
  questions: number;
  marks: number;
}

export function CreateAssignmentForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rows, setRows] = useState<QuestionTypeRow[]>([
    { id: '1', type: 'Multiple Choice Questions', questions: 4, marks: 1 },
    { id: '2', type: 'Short Questions', questions: 3, marks: 2 },
    { id: '3', type: 'Diagram/Graph-Based Questions', questions: 5, marks: 5 },
    { id: '4', type: 'Numerical Problems', questions: 5, marks: 5 },
  ]);

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), type: '', questions: 0, marks: 0 }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: keyof QuestionTypeRow, value: string | number | null) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value as string | number } : r));
  };

  const totalQuestions = rows.reduce((sum, r) => sum + (Number(r.questions) || 0), 0);
  const totalMarks = rows.reduce((sum, r) => sum + ((Number(r.questions) || 0) * (Number(r.marks) || 0)), 0);

  const handleSubmit = () => {
    // Navigate to output screen
    router.push('/output');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[24px] border border-gray-100 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.02)]">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">Assignment Details</h2>
        <p className="text-sm text-gray-500">Basic information about your assignment</p>
      </div>

      <div className="space-y-8">
        {/* File Upload */}
        <div 
          className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept=".jpeg,.png,.jpg,.pdf"
          />
          {selectedFile ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <FileIcon className="w-6 h-6 text-green-500" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">{selectedFile.name}</p>
              <p className="text-xs text-gray-500 mb-4">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <Button variant="outline" className="rounded-full px-6 font-medium" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}>Remove File</Button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CloudUpload className="w-6 h-6 text-gray-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Choose a file or drag & drop it here</p>
              <p className="text-xs text-gray-500 mb-4">(JPEG, PNG, up to 10MB)</p>
              <Button variant="outline" className="rounded-full px-6 font-medium bg-gray-50/50 hover:bg-gray-100 border-gray-200">Browse Files</Button>
            </>
          )}
          <p className="text-xs text-gray-400 mt-4">Upload images of your preferred document/image</p>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-semibold mb-2">Due Date</label>
          <div className="relative">
            <Input type="date" placeholder="DD-MM-YYYY" className="h-12 rounded-xl text-gray-700 w-full pl-4 pr-10" />
            <CalendarIcon className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Question Types */}
        <div>
          <label className="block text-sm font-semibold mb-4">Question Type</label>
          
          <div className="space-y-4 md:space-y-3">
            {/* Desktop header */}
            <div className="hidden md:flex items-center gap-4 px-2 mb-2">
              <div className="flex-1"></div>
              <div className="w-6 text-center"></div>
              <div className="w-32 text-center text-xs font-semibold text-gray-500">No. of Questions</div>
              <div className="w-32 text-center text-xs font-semibold text-gray-500">Marks</div>
            </div>

            {rows.map((row) => (
              <div key={row.id} className="relative">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center gap-4">
                  <Select value={row.type} onValueChange={(val) => updateRow(row.id, 'type', val)}>
                    <SelectTrigger className="flex-1 h-12 rounded-xl bg-gray-50 border-none font-medium">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Multiple Choice Questions">Multiple Choice Questions</SelectItem>
                      <SelectItem value="Short Questions">Short Questions</SelectItem>
                      <SelectItem value="Diagram/Graph-Based Questions">Diagram/Graph-Based Questions</SelectItem>
                      <SelectItem value="Numerical Problems">Numerical Problems</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <button onClick={() => removeRow(row.id)} className="w-6 flex justify-center text-gray-400 hover:text-red-500">
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="w-32 h-12 flex items-center justify-between bg-gray-50 border-none rounded-xl p-1">
                    <button onClick={() => updateRow(row.id, 'questions', Math.max(0, row.questions - 1))} className="w-10 h-full flex items-center justify-center text-gray-400 hover:bg-gray-200 rounded-lg">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-700">{row.questions}</span>
                    <button onClick={() => updateRow(row.id, 'questions', row.questions + 1)} className="w-10 h-full flex items-center justify-center text-gray-400 hover:bg-gray-200 rounded-lg">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="w-32 h-12 flex items-center justify-between bg-gray-50 border-none rounded-xl p-1">
                    <button onClick={() => updateRow(row.id, 'marks', Math.max(0, row.marks - 1))} className="w-10 h-full flex items-center justify-center text-gray-400 hover:bg-gray-200 rounded-lg">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-700">{row.marks}</span>
                    <button onClick={() => updateRow(row.id, 'marks', row.marks + 1)} className="w-10 h-full flex items-center justify-center text-gray-400 hover:bg-gray-200 rounded-lg">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden bg-gray-50 rounded-2xl p-4 mb-4 relative">
                  <button onClick={() => removeRow(row.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <X className="w-5 h-5" />
                  </button>
                  
                  <Select value={row.type} onValueChange={(val) => updateRow(row.id, 'type', val)}>
                    <SelectTrigger className="w-full bg-white border h-12 rounded-xl mb-4 pr-10 font-medium">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Multiple Choice Questions">Multiple Choice Questions</SelectItem>
                      <SelectItem value="Short Questions">Short Questions</SelectItem>
                      <SelectItem value="Diagram/Graph-Based Questions">Diagram/Graph-Based Questions</SelectItem>
                      <SelectItem value="Numerical Problems">Numerical Problems</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-center text-gray-500 mb-2">No. of Questions</label>
                      <div className="flex items-center justify-between bg-white border rounded-xl p-1 h-12">
                        <button onClick={() => updateRow(row.id, 'questions', Math.max(0, row.questions - 1))} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{row.questions}</span>
                        <button onClick={() => updateRow(row.id, 'questions', row.questions + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-center text-gray-500 mb-2">Marks</label>
                      <div className="flex items-center justify-between bg-white border rounded-xl p-1 h-12">
                        <button onClick={() => updateRow(row.id, 'marks', Math.max(0, row.marks - 1))} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{row.marks}</span>
                        <button onClick={() => updateRow(row.id, 'marks', row.marks + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between">
            <Button variant="ghost" onClick={addRow} className="text-black font-semibold justify-start p-0 hover:bg-transparent md:w-auto w-fit mb-4 md:mb-0">
              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-2">
                <Plus className="w-4 h-4" />
              </div>
              Add Question Type
            </Button>
            
            <div className="flex flex-col text-right font-semibold text-sm">
              <div className="text-gray-600">Total Questions: <span className="text-black">{totalQuestions}</span></div>
              <div className="text-gray-600">Total Marks: <span className="text-black">{totalMarks}</span></div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-semibold mb-2">Additional Information (For better output)</label>
          <div className="relative">
            <Textarea 
              placeholder="e.g. Generate a question paper for 2 hours examination..." 
              className="min-h-[100px] resize-none rounded-2xl bg-gray-50 border-none p-4 pr-12"
            />
            <div className="absolute bottom-4 right-4 cursor-pointer hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t flex items-center justify-between">
          <Button variant="outline" className="rounded-full px-6 h-12 font-semibold" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 h-12 font-semibold" onClick={handleSubmit}>
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
