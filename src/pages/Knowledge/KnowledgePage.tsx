import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Bot,
  ExternalLink 
} from 'lucide-react';
import { KNOWLEDGE_BASE } from '../../data/knowledge';
import { KnowledgeDoc } from '../../types';

interface KnowledgePageProps {
  onAskAIQuery?: (query: string) => void;
}

export const KnowledgePage: React.FC<KnowledgePageProps> = ({ onAskAIQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc>(KNOWLEDGE_BASE[0]);
  const [testQuery, setTestQuery] = useState('How does Paytm Postpaid work?');
  const [simulatedRAGResult, setSimulatedRAGResult] = useState<{
    retrievedDoc: KnowledgeDoc;
    aiAnswer: string;
  } | null>(null);

  const filteredDocs = KNOWLEDGE_BASE.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRunRAG = (queryToRun?: string) => {
    const q = (queryToRun || testQuery).toLowerCase();
    let found = KNOWLEDGE_BASE.find(d => 
      d.keywords.some(k => q.includes(k)) || 
      d.title.toLowerCase().includes(q) || 
      q.includes(d.category.toLowerCase())
    );

    if (!found) found = KNOWLEDGE_BASE[0];

    setSimulatedRAGResult({
      retrievedDoc: found,
      aiAnswer: found.content
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#002970] tracking-tight">
            Paytm Knowledge Assistant (RAG)
          </h1>
          <p className="text-xs text-slate-500">
            Grounding autonomous teammate responses in verified service documentation and NPCI policies
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-[#002970]">
          <Layers className="h-3.5 w-3.5 text-[#00BAF2]" />
          <span>Vector Database & Grounded Retrieval</span>
        </div>
      </div>

      {/* Interactive RAG Playground Sandbox */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#00BAF2]" />
            <h3 className="font-bold text-slate-900 text-sm">Interactive RAG Retrieval Playground</h3>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            Semantic Embedding Match
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Type a general question (e.g. 'What is Paytm Postpaid?' or 'How to pay electricity bill?')"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#00BAF2] focus:bg-white focus:outline-hidden"
          />
          <button
            onClick={() => handleRunRAG()}
            className="rounded-xl bg-[#002970] hover:bg-[#001f56] text-white px-5 py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <span>Execute RAG</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Sample queries */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1 self-center">Try:</span>
          {[
            'How does Paytm Postpaid work?',
            'How can I pay my electricity bill?',
            'What happens if UPI payment fails?',
            'What is UPI Lite?'
          ].map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTestQuery(sample);
                handleRunRAG(sample);
              }}
              className="rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#002970] border border-slate-200 px-2.5 py-0.5 text-[11px] text-slate-600 transition"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* RAG Results Display */}
        {simulatedRAGResult && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Retrieved Knowledge Chunk */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  Retrieved Knowledge Chunk
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  Score: 0.94 Match
                </span>
              </div>
              <h4 className="font-bold text-slate-900">{simulatedRAGResult.retrievedDoc.title}</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {simulatedRAGResult.retrievedDoc.summary}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {simulatedRAGResult.retrievedDoc.keywords.map((k, i) => (
                  <span key={i} className="text-[9px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                    #{k}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Synthesized Answer */}
            <div className="rounded-xl bg-blue-50/70 p-4 border border-blue-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#002970] flex items-center gap-1">
                  <Bot className="h-3.5 w-3.5 text-[#00BAF2]" />
                  AI Teammate Grounded Response
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                  <CheckCircle2 className="h-3 w-3" /> Grounded
                </span>
              </div>
              <div className="text-slate-800 whitespace-pre-wrap leading-relaxed text-[11px]">
                {simulatedRAGResult.aiAnswer}
              </div>
              {onAskAIQuery && (
                <button
                  onClick={() => onAskAIQuery(testQuery)}
                  className="mt-2 text-xs font-bold text-[#002970] hover:text-[#00BAF2] flex items-center gap-1"
                >
                  <span>Continue in AI Assistant</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Documents Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-[#002970]">
            Verified Service Documentation Catalog ({filteredDocs.length})
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter topics..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#00BAF2] focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setSelectedDoc(doc);
                setTestQuery(doc.title);
                handleRunRAG(doc.title);
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-[#00BAF2] hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-2">
                  {doc.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#002970] font-semibold">
                <span>Inspect Document</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
