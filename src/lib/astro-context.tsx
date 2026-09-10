import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface AstroProfile {
  name: string;
  dob: string; // yyyy-mm-dd
  tob: string; // HH:mm
  pob: string;
  facePhoto: string | null; // data url
  palmPhoto: string | null; // data url
  faceReading?: string | null;
  palmReading?: string | null;
  createdAt: number;
}

export interface ChatMsg {
  id: number;
  role: "guru" | "user";
  text: string;
}

interface AstroState {
  isAuthed: boolean;
  profile: AstroProfile | null;
  chatHistory: ChatMsg[];
  language: string;
  loginWithGoogle: () => void;
  saveProfile: (p: AstroProfile) => void;
  saveChatHistory: (msgs: ChatMsg[]) => void;
  setLanguage: (code: string) => void;
  reset: () => void;
}

const KEY_AUTH = "astroai_authed";
const KEY_PROFILE = "astroai_profile";
const KEY_CHAT = "astroai_chat";
const KEY_LANG = "astroai_lang";

const AstroContext = createContext<AstroState | null>(null);

export function AstroProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [profile, setProfile] = useState<AstroProfile | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([]);
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    try {
      setIsAuthed(localStorage.getItem(KEY_AUTH) === "true");
      const raw = localStorage.getItem(KEY_PROFILE);
      if (raw) setProfile(JSON.parse(raw));
      const chat = localStorage.getItem(KEY_CHAT);
      if (chat) setChatHistory(JSON.parse(chat));
      const lang = localStorage.getItem(KEY_LANG);
      if (lang) setLanguageState(lang);
    } catch {
      /* ignore */
    }
  }, []);

  const loginWithGoogle = () => {
    setIsAuthed(true);
    try {
      localStorage.setItem(KEY_AUTH, "true");
    } catch {
      /* ignore */
    }
  };

  const saveProfile = (p: AstroProfile) => {
    setProfile(p);
    try {
      localStorage.setItem(KEY_PROFILE, JSON.stringify(p));
    } catch {
      // Quota exceeded (usually large photos) — persist details without images.
      try {
        localStorage.setItem(
          KEY_PROFILE,
          JSON.stringify({ ...p, facePhoto: null, palmPhoto: null }),
        );
      } catch {
        /* ignore */
      }
    }
  };

  const saveChatHistory = (msgs: ChatMsg[]) => {
    setChatHistory(msgs);
    try {
      localStorage.setItem(KEY_CHAT, JSON.stringify(msgs));
    } catch {
      /* ignore */
    }
  };

  const setLanguage = (code: string) => {
    setLanguageState(code);
    try {
      localStorage.setItem(KEY_LANG, code);
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setIsAuthed(false);
    setProfile(null);
    setChatHistory([]);
    setLanguageState("en");
    try {
      localStorage.removeItem(KEY_AUTH);
      localStorage.removeItem(KEY_PROFILE);
      localStorage.removeItem(KEY_CHAT);
      localStorage.removeItem(KEY_LANG);
    } catch {
      /* ignore */
    }
  };

  return (
    <AstroContext.Provider
      value={{
        isAuthed,
        profile,
        chatHistory,
        language,
        loginWithGoogle,
        saveProfile,
        saveChatHistory,
        setLanguage,
        reset,
      }}
    >
      {children}
    </AstroContext.Provider>
  );
}

export function useAstro() {
  const ctx = useContext(AstroContext);
  if (!ctx) throw new Error("useAstro must be used within AstroProvider");
  return ctx;
}
