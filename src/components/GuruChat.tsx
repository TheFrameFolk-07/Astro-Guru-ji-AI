import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, ScrollText, ChevronDown, Trash2 } from "lucide-react";
import { useAstro } from "@/lib/astro-context";
import { firstName, getSign, nakshatra } from "@/lib/astro-utils";
import { dict, isRtl } from "@/lib/languages";
import { BirthChart } from "./BirthChart";

interface Msg {
  id: number;
  role: "guru" | "user";
  text: string;
}

export function GuruChat() {
  const { profile, chatHistory, saveChatHistory, language } = useAstro();
  const sign = useMemo(() => getSign(profile?.dob ?? ""), [profile]);
  const fn = firstName(profile?.name ?? "");
  const nak = nakshatra(profile);
  const t = dict(language);
  const rtl = isRtl(language);

  const greeting = t.greeting(fn, sign.name, nak, profile?.pob ?? "");

  const [messages, setMessages] = useState<Msg[]>(
    chatHistory.length ? chatHistory : [{ id: 1, role: "guru", text: greeting }],
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(
    chatHistory.length ? Math.max(...chatHistory.map((m) => m.id)) + 1 : 2,
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Persist chat history whenever messages settle (not mid-typing).
  useEffect(() => {
    if (!typing) saveChatHistory(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, typing]);

  // Re-greet in the newly chosen language when the conversation hasn't started.
  const langRef = useRef(language);
  useEffect(() => {
    if (langRef.current === language) return;
    langRef.current = language;
    setMessages((m) =>
      m.length <= 1 ? [{ id: 1, role: "guru", text: greeting }] : [...m, { id: idRef.current++, role: "guru", text: greeting }],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const clearChat = () => {
    const fresh = [{ id: 1, role: "guru" as const, text: greeting }];
    idRef.current = 2;
    setMessages(fresh);
    saveChatHistory(fresh);
  };

  const reply = (q: string) => {
    const r = generateReply(q, { fn, sign, nak, language });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: idRef.current++, role: "guru", text: r }]);
    }, 1300);
  };

  const sendText = (text: string) => {
    const tx = text.trim();
    if (!tx) return;
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text: tx }]);
    setInput("");
    reply(tx);
  };

  return (
    <div className="flex h-full flex-col" dir={rtl ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold">
          <Sparkles className="h-5 w-5 text-[#1a1206]" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-bold text-foreground">Guru Ji</h1>
          <p className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · AI Master Astrologer
          </p>
        </div>
        <button
          onClick={clearChat}
          aria-label="Clear chat"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground active:scale-90"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </header>

      {/* Birth chart toggle */}
      <div className="border-b border-border bg-surface/60">
        <button
          onClick={() => setShowChart((s) => !s)}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gold"
        >
          <ScrollText className="h-4 w-4" /> {t.chartTitle}
          <ChevronDown className={`ms-auto h-4 w-4 transition ${showChart ? "rotate-180" : ""}`} />
        </button>
        {showChart && (
          <div className="px-4 pb-4">
            <BirthChart />
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <Bubble key={m.id} msg={m} />
        ))}
        {typing && (
          <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-saffron/15 px-4 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-gold"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick replies */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2 pt-1">
        {t.chips.map((c) => (
          <button
            key={c}
            onClick={() => sendText(c)}
            className="shrink-0 rounded-full border border-gold/40 bg-surface px-4 py-2 text-sm font-medium text-gold active:scale-95"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-border bg-surface px-3 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendText(input)}
          placeholder={t.placeholder}
          className="h-12 flex-1 rounded-full border border-input bg-surface-2 px-4 text-base text-foreground outline-none focus:border-gold"
        />
        <button
          onClick={() => sendText(input)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold text-[#1a1206] active:scale-95"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isGuru = msg.role === "guru";
  return (
    <div className={`flex ${isGuru ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
          isGuru
            ? "rounded-bl-md bg-saffron/15 text-foreground"
            : "rounded-br-md bg-surface-2 text-foreground"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

const KEYWORDS = {
  career: ["career", "wealth", "money", "job", "करियर", "धन", "नौकरी", "कर्म", "কর্ম", "সম্পদ", "தொழில்", "செல்வம்", "వృత్తి", "సంపద", "करिअर", "કારકિર્દી", "ವೃತ್ತಿ", "കരിയർ", "ਕਰੀਅਰ", "کیریئر", "دولت", "କ୍ୟାରିଅର"],
  love: ["marriage", "love", "relationship", "partner", "विवाह", "प्रेम", "प्यार", "বিবাহ", "প্রেম", "திருமணம்", "காதல்", "వివాహం", "ప్రేమ", "લગ્ન", "ವಿವಾಹ", "ಪ್ರೇಮ", "വിവാഹം", "പ്രണയം", "ਵਿਆਹ", "ਪਿਆਰ", "شادی", "محبت", "ବିବାହ"],
  health: ["health", "body", "wellness", "स्वास्थ्य", "आरोग्य", "সুস্থ", "স্বাস্থ্য", "உடல்நலம்", "ఆరోగ్య", "આરોગ્ય", "ಆರೋಗ್ಯ", "ആരോഗ്യ", "ਸਿਹਤ", "صحت", "ସ୍ୱାସ୍ଥ୍ୟ"],
  saturn: ["sade sati", "saturn", "shani", "साढ़े साती", "साडेसाती", "शनि", "সাড়ে সাতি", "শনি", "சடே சதி", "சனி", "సాడే సతి", "శని", "સાડાસાતી", "ಸಾಡೇ ಸತಿ", "സാഡേ സതി", "ਸਾਢੇ ਸਾਤੀ", "ساڑھے ساتی", "ساڑھے", "ସାଢେ ସାତି"],
};

function match(q: string, list: string[]) {
  return list.some((k) => q.includes(k));
}

function generateReply(
  q: string,
  ctx: { fn: string; sign: { name: string; ruler: string }; nak: string; language: string },
) {
  const ql = q.toLowerCase();
  const { fn, sign, nak, language } = ctx;
  const t = dict(language);
  if (match(ql, KEYWORDS.career)) return t.career(fn, sign.ruler);
  if (match(ql, KEYWORDS.love)) return t.love(fn, sign.name);
  if (match(ql, KEYWORDS.health)) return t.health(fn, nak, sign.ruler);
  if (match(ql, KEYWORDS.saturn)) return t.saturn(sign.name);
  return t.fallback(fn, sign.name, sign.ruler);
}
