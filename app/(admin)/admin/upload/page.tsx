"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Upload, FileJson, CheckCircle, AlertTriangle } from "lucide-react";
import { bulkImportQuestions } from "@/app/actions/admin";

export default function BulkUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState<any[] | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [logs, setLogs] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            readFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            readFile(e.dataTransfer.files[0]);
        }
    };

    const readFile = (f: File) => {
        setFile(f);
        setStatus('idle');
        setLogs([]);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (Array.isArray(json)) {
                    setPreview(json);
                } else {
                    setStatus('error');
                    setLogs(["Invalid JSON format. Expected an array of objects."]);
                }
            } catch (err) {
                setStatus('error');
                setLogs(["Failed to parse JSON file. Check syntax."]);
            }
        };
        reader.readAsText(f);
    };

    const handleUpload = async () => {
        if (!preview) return;
        setStatus('uploading');

        try {
            const result = await bulkImportQuestions(preview);
            if (result.success) {
                setStatus('success');
                setLogs([
                    `Successfully imported ${result.count} questions.`,
                    ...(result.errors || [])
                ]);
            } else {
                setStatus('error');
                setLogs([result.error as string, ...(result.details || [])]);
            }
        } catch (err) {
            setStatus('error');
            setLogs(["Network error occurred."]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Bulk Question Upload</h1>
            <p className="text-slate-500 mb-8">Upload a JSON file containing the scraped questions to import them directly.</p>

            <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-slate-50'
                    }`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
            >
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4">
                    <FileJson className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Drag & Drop JSON file here</h3>
                <p className="text-slate-500 text-sm mb-6">or click to browse from your computer</p>

                <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept=".json"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer pointer-events-none">Select File</Button>
                </label>
            </div>

            {preview && (
                <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="font-bold text-slate-700">{preview.length} Questions Detected</span>
                        </div>
                        <Button
                            onClick={handleUpload}
                            disabled={status === 'uploading'}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {status === 'uploading' ? 'Importing...' : 'Start Import'}
                        </Button>
                    </div>

                    <div className="max-h-60 overflow-y-auto bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-600">
                        {JSON.stringify(preview[0], null, 2)}
                        {preview.length > 1 && <p className="mt-2 text-slate-400">...and {preview.length - 1} more items</p>}
                    </div>
                </div>
            )}

            {status !== 'idle' && logs.length > 0 && (
                <div className={`mt-6 p-6 rounded-xl border ${status === 'success' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${status === 'success' ? 'text-emerald-800' : 'text-red-800'}`}>
                        {status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        {status === 'success' ? 'Import Complete' : 'Import Failed'}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                        {logs.map((log, i) => (
                            <li key={i}>{log}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-12">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Expected Format</h3>
                <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                    <pre>{`[
  {
    "question_text": "Which of these is NOT a feature of a Partnership?",
    "subject": "accountancy",
    "topic": "partnership", 
    "difficulty": "medium",
    "correct_option": "c",
    "options": [
      { "id": "a", "text": "Two or more persons" },
      { "id": "b", "text": "Agreement" },
      { "id": "c", "text": "Limited Liability" },
      { "id": "d", "text": "Sharing of Profits" }
    ],
    "explanation": "Partners generally have unlimited liability, unlike a company.",
    "is_pyq": true,
    "pyq_year": 2023
  }
]`}</pre>
                </div>
            </div>
        </div>
    );
}
