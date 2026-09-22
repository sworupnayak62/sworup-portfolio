import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, RefreshCw, ArrowRight, User, ExternalLink } from 'lucide-react';
import { queryAgentKnowledge, AgentKnowledgeItem } from '../data/agentEngine';
import { soundSys } from '../utils/audioSynthesis';

interface AIAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  sourceTag?: string;
  suggestedPrompts?: string[];
  actionLink?: {
    label: string;
    sectionId: string;
  };
  timestamp: string;
}

export const AIAgentDrawer: React.FC<AIAgentDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: `Hi there! I'm Sworup's personal AI Assistant. 

Ask me anything about his skills, projects, background, or social links!`,
      sourceTag: "Sworup AI",
      suggestedPrompts: [
        "What are his top skills?",
        "What projects has he built?",
        "Show his LinkedIn & GitHub links",
        "How can I contact or hire Sworup?",
      ],
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isThinking) return;

    soundSys.playClick();
    setInputQuery('');

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Simulated quick retrieval & response
    setTimeout(() => {
      const match: AgentKnowledgeItem = queryAgentKnowledge(query);

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: match.response,
        sourceTag: match.sourceTag,
        suggestedPrompts: match.suggestedPrompts,
        actionLink: match.actionLink,
        timestamp: 'Now',
      };

      soundSys.playChirp();
      setIsThinking(false);
      setMessages((prev) => [...prev, agentMsg]);
    }, 450);
  };

  const handleActionLink = (sectionId: string) => {
    soundSys.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to format text with clickable URLs
  const renderMessageContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 underline underline-offset-2 hover:text-white inline-flex items-center gap-1 font-mono break-all font-semibold"
          >
            <span>{part}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (!isOpen) return null;

  return (
    // Docked at bottom-right corner WITHOUT page backdrop or blur!
    <aside
      aria-label="Sworup AI Assistant Chat"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999] w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[calc(100vh-5rem)] rounded-2xl bg-obsidian-900 border border-cyan-500/30 shadow-2xl shadow-black/90 flex flex-col overflow-hidden backdrop-blur-xl animate-slideUp"
    >
      {/* Header */}
      <div className="p-3.5 sm:p-4 bg-obsidian-950 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="relative p-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-white text-xs sm:text-sm">Sworup AI Assistant</h3>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ONLINE
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Ask questions or get links
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundSys.playClick();
            onClose();
          }}
          className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Close chat"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col space-y-1.5 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Sender Label */}
            <div className="flex items-center space-x-1 text-[9px] font-mono text-slate-500 px-1">
              {msg.sender === 'user' ? (
                <>
                  <span>You</span>
                  <User className="w-2.5 h-2.5" />
                </>
              ) : (
                <>
                  <Bot className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">{msg.sourceTag || 'Sworup AI'}</span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[90%] shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-obsidian-950 font-medium rounded-tr-sm'
                  : 'bg-obsidian-950 border border-white/10 text-slate-200 rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-line font-sans">
                {renderMessageContent(msg.text)}
              </div>

              {/* Action Deep-link Button */}
              {msg.actionLink && (
                <div className="mt-2.5 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleActionLink(msg.actionLink!.sectionId)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-mono text-[11px] border border-cyan-500/25 flex items-center space-x-1.5 transition-all"
                  >
                    <span>{msg.actionLink.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Suggested Prompts */}
            {msg.suggestedPrompts && (
              <div className="pt-1 flex flex-wrap gap-1 max-w-[95%]">
                {msg.suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[10px] font-mono px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all text-left"
                  >
                    &bull; {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[11px] p-2 rounded-lg bg-obsidian-950 border border-cyan-500/20 w-fit">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Sworup AI is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-obsidian-950 border-t border-white/10 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about skills, projects, or links..."
            className="flex-1 px-3 py-2 rounded-xl bg-obsidian-900 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-obsidian-950 font-bold transition-all shrink-0"
            title="Send query"
            aria-label="Send query"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
};
