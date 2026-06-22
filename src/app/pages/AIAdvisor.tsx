import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  Loader2,
  HelpCircle
} from "lucide-react";
import { aiService, ChatMessage } from "../services/aiService";
import { UXThinkingSection } from "../components/UXThinking";

export function AIAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Välkommen till FleetPulse AI Advisor! Jag har full insikt i din Transport Intelligence-graf (fordonskostnader, rutter, förarbeteenden och fakturor).\n\nVad vill du optimera i din verksamhet idag? Välj ett snabbval nedan eller ställ en egen fråga.",
      timestamp: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Vilka fordon kostar mest just nu?",
    "Varför är Customer A olönsam?",
    "Hur sparar vi 500 000 kr nästa år?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
    };

    // Calculate next state
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputVal("");
    setIsTyping(true);

    try {
      const replyText = await aiService.getReplies(text, nextMessages);
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* UX Thinking */}
      

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Quick Questions sidebar */}
        <div className="md:col-span-1 space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 px-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Fråga AI direkt
          </h3>
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="text-left text-xs bg-white hover:bg-slate-100 disabled:opacity-50 border border-gray-200 text-gray-700 p-3 rounded-xl font-medium transition-all shadow-sm hover:shadow shrink-0 md:shrink-0 flex items-center justify-between gap-2"
              >
                <span>{q}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0 hidden md:block" />
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="md:col-span-3">
          <Card className="border-gray-200 bg-white flex flex-col h-[520px] overflow-hidden shadow-md rounded-xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">AI Advisor</h4>
                  <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Ansluten till Transport Intelligence Graph
                  </p>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      msg.sender === "ai" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    }`}>
                      {msg.sender === "ai" ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                      msg.sender === "ai"
                        ? "bg-white text-gray-800 border-gray-200 shadow-sm whitespace-pre-line"
                        : "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/10"
                    }`}>
                      {/* Simple check to format markdown headers slightly nicer in plain text bubbles */}
                      {msg.text.split("\n").map((line, i) => {
                        if (line.startsWith("### ")) {
                          return <h5 key={i} className="font-bold text-sm text-gray-950 mt-1 mb-2 first:mt-0">{line.replace("### ", "")}</h5>;
                        }
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return <p key={i} className="font-bold text-xs mt-1 mb-1">{line.replace(/\*\*/g, "")}</p>;
                        }
                        return <p key={i}>{line}</p>;
                      })}
                      <span className={`block text-[10px] mt-2 text-right ${
                        msg.sender === "ai" ? "text-gray-400" : "text-blue-200"
                      }`}>{msg.timestamp}</span>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 max-w-[80%]"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                      <span className="text-xs text-gray-500 font-medium">Analyserar transportdata...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-4 border-t border-gray-200 bg-white flex gap-2"
            >
              <Input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ställ en fråga till Advisor (t.ex. 'Hur ser marginalen ut för Customer A?')..."
                className="flex-1 border-gray-200 text-sm focus-visible:ring-blue-500 rounded-xl"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 shrink-0" disabled={isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
