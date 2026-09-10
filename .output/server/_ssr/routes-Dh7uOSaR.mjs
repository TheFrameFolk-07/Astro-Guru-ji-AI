import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as ChevronDown, C as Earth, D as CircleQuestionMark, E as Clock, F as Activity, M as Camera, N as Calendar, O as ChevronRight, P as Brain, S as FileDown, T as Download, _ as Images, a as Sun, b as Hand, c as Send, d as Pencil, f as Moon, g as Leaf, h as MapPin, i as Trash2, j as Check, k as ChevronLeft, l as ScrollText, m as MessageCircle, n as Wind, o as Star, p as MessageSquareText, r as User, s as Sparkles, t as X, u as RefreshCw, v as Heart, w as Droplet, x as FingerprintPattern, y as HeartPulse } from "../_libs/lucide-react.mjs";
import { t as E } from "../_libs/jspdf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dh7uOSaR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY_AUTH = "astroai_authed";
var KEY_PROFILE = "astroai_profile";
var KEY_CHAT = "astroai_chat";
var KEY_LANG = "astroai_lang";
var AstroContext = (0, import_react.createContext)(null);
function AstroProvider({ children }) {
	const [isAuthed, setIsAuthed] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [chatHistory, setChatHistory] = (0, import_react.useState)([]);
	const [language, setLanguageState] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		try {
			setIsAuthed(localStorage.getItem(KEY_AUTH) === "true");
			const raw = localStorage.getItem(KEY_PROFILE);
			if (raw) setProfile(JSON.parse(raw));
			const chat = localStorage.getItem(KEY_CHAT);
			if (chat) setChatHistory(JSON.parse(chat));
			const lang = localStorage.getItem(KEY_LANG);
			if (lang) setLanguageState(lang);
		} catch {}
	}, []);
	const loginWithGoogle = () => {
		setIsAuthed(true);
		try {
			localStorage.setItem(KEY_AUTH, "true");
		} catch {}
	};
	const saveProfile = (p) => {
		setProfile(p);
		try {
			localStorage.setItem(KEY_PROFILE, JSON.stringify(p));
		} catch {
			try {
				localStorage.setItem(KEY_PROFILE, JSON.stringify({
					...p,
					facePhoto: null,
					palmPhoto: null
				}));
			} catch {}
		}
	};
	const saveChatHistory = (msgs) => {
		setChatHistory(msgs);
		try {
			localStorage.setItem(KEY_CHAT, JSON.stringify(msgs));
		} catch {}
	};
	const setLanguage = (code) => {
		setLanguageState(code);
		try {
			localStorage.setItem(KEY_LANG, code);
		} catch {}
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
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AstroContext.Provider, {
		value: {
			isAuthed,
			profile,
			chatHistory,
			language,
			loginWithGoogle,
			saveProfile,
			saveChatHistory,
			setLanguage,
			reset
		},
		children
	});
}
function useAstro() {
	const ctx = (0, import_react.useContext)(AstroContext);
	if (!ctx) throw new Error("useAstro must be used within AstroProvider");
	return ctx;
}
function CosmicBackground({ dense = false }) {
	const [stars, setStars] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setStars(Array.from({ length: dense ? 60 : 36 }).map((_, i) => ({
			id: i,
			top: Math.random() * 100,
			left: Math.random() * 100,
			size: Math.random() * 2 + 1,
			delay: Math.random() * 3,
			dur: 2 + Math.random() * 3
		})));
	}, [dense]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-cosmic" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-1/2 top-[-30%] h-[140vw] w-[140vw] -translate-x-1/2 animate-spin-slow opacity-[0.13]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 400 400",
					className: "h-full w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "200",
							cy: "200",
							r: "180",
							fill: "none",
							stroke: "var(--gold)",
							strokeWidth: "0.6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "200",
							cy: "200",
							r: "140",
							fill: "none",
							stroke: "var(--saffron)",
							strokeWidth: "0.4",
							strokeDasharray: "3 5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "200",
							cy: "200",
							r: "100",
							fill: "none",
							stroke: "var(--gold)",
							strokeWidth: "0.4"
						}),
						Array.from({ length: 12 }).map((_, i) => {
							const a = i / 12 * Math.PI * 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: +(200 + Math.cos(a) * 100).toFixed(2),
								y1: +(200 + Math.sin(a) * 100).toFixed(2),
								x2: +(200 + Math.cos(a) * 180).toFixed(2),
								y2: +(200 + Math.sin(a) * 180).toFixed(2),
								stroke: "var(--gold)",
								strokeWidth: "0.4"
							}, i);
						})
					]
				})
			}),
			stars.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute rounded-full bg-gold animate-twinkle",
				style: {
					top: `${s.top}%`,
					left: `${s.left}%`,
					width: s.size,
					height: s.size,
					animationDelay: `${s.delay}s`,
					animationDuration: `${s.dur}s`
				}
			}, s.id))
		]
	});
}
function SplashScreen() {
	const { loginWithGoogle } = useAstro();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleLogin = () => {
		setLoading(true);
		setTimeout(() => loginWithGoogle(), 1600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col items-center justify-between overflow-hidden px-6 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CosmicBackground, { dense: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-1 flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-8 flex h-32 w-32 items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border border-gold/30 animate-spin-slow" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-3 rounded-full border border-saffron/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-float-slow flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold shadow-[0_0_40px_rgba(255,153,51,0.5)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
									className: "h-10 w-10 text-[#1a1206]",
									strokeWidth: 1.6
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "absolute -right-1 -top-1 h-6 w-6 text-gold animate-twinkle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "absolute -bottom-2 left-0 h-4 w-4 text-saffron animate-twinkle" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm uppercase tracking-[0.4em] text-gold/80",
						children: "Vedic · AI · Cosmos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl font-bold leading-tight text-gold-gradient",
						children: "AstroAI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-base text-muted-foreground",
						children: "Welcome to AstroAI — your personal AI Master Astrologer. Unlock the secrets written in your stars."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleLogin,
					disabled: loading,
					className: "flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-foreground text-base font-semibold text-[#1a1206] shadow-lg transition active:scale-[0.98] disabled:opacity-80",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-5 animate-spin rounded-full border-2 border-[#1a1206]/30 border-t-[#1a1206]" }), "Connecting…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), "Continue with Google"] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-muted-foreground/70",
					children: "By continuing you agree to our cosmic terms & privacy ritual."
				})]
			})
		]
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "h-5 w-5",
		viewBox: "0 0 48 48",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FFC107",
				d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FF3D00",
				d: "M6.3 14.7l6.6 4.8C14.7 15.1 19 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4CAF50",
				d: "M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39 16.2 43.5 24 43.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#1976D2",
				d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41 35.6 43.5 30.3 43.5 24c0-1.2-.1-2.3-.4-3.5z"
			})
		]
	});
}
var MAX = 600;
/** Downscale to <=600px JPEG (keeps localStorage under quota) and measure real pixel statistics. */
function analyzeImageFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("read-failed"));
		reader.onload = () => {
			const img = new Image();
			img.onerror = () => reject(/* @__PURE__ */ new Error("decode-failed"));
			img.onload = () => {
				const scale = Math.min(1, MAX / Math.max(img.width, img.height));
				const w = Math.max(1, Math.round(img.width * scale));
				const h = Math.max(1, Math.round(img.height * scale));
				const canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				const ctx = canvas.getContext("2d");
				if (!ctx) return reject(/* @__PURE__ */ new Error("no-canvas"));
				ctx.drawImage(img, 0, 0, w, h);
				const dataUrl = canvas.toDataURL("image/jpeg", .72);
				const { data } = ctx.getImageData(0, 0, w, h);
				const lum = new Float32Array(w * h);
				let sum = 0;
				let rSum = 0;
				let bSum = 0;
				for (let i = 0, p = 0; i < data.length; i += 4, p++) {
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];
					const l = .299 * r + .587 * g + .114 * b;
					lum[p] = l;
					sum += l;
					rSum += r;
					bSum += b;
				}
				const mean = sum / lum.length;
				let varSum = 0;
				for (let p = 0; p < lum.length; p++) varSum += (lum[p] - mean) ** 2;
				const std = Math.sqrt(varSum / lum.length);
				let diff = 0;
				let count = 0;
				const half = Math.floor(w / 2);
				for (let y = 0; y < h; y += 2) for (let x = 0; x < half; x += 2) {
					diff += Math.abs(lum[y * w + x] - lum[y * w + (w - 1 - x)]);
					count++;
				}
				const symmetry = count ? Math.max(0, 100 - diff / count / 255 * 260) : 50;
				let edges = 0;
				let edgeCount = 0;
				for (let y = 1; y < h - 1; y += 2) for (let x = 1; x < w - 1; x += 2) {
					const gx = Math.abs(lum[y * w + x + 1] - lum[y * w + x - 1]);
					const gy = Math.abs(lum[(y + 1) * w + x] - lum[(y - 1) * w + x]);
					edges += gx + gy;
					edgeCount++;
				}
				resolve({
					dataUrl,
					metrics: {
						width: img.width,
						height: img.height,
						brightness: clamp(mean / 255 * 100),
						warmth: clamp(50 + (rSum - bSum) / lum.length / 255 * 200),
						contrast: clamp(std / 80 * 100),
						symmetry: clamp(symmetry),
						detail: edgeCount ? clamp(edges / edgeCount / 40 * 100) : 0
					}
				});
			};
			img.src = reader.result;
		};
		reader.readAsDataURL(file);
	});
}
var clamp = (n) => Math.round(Math.max(0, Math.min(100, n)));
var band = (v, low, mid, high) => v < 38 ? low : v < 68 ? mid : high;
function faceReading(m) {
	const glow = band(m.brightness, "a subdued, inward Chandra glow", "a balanced Surya-Chandra glow", "a bright Surya-dominant glow");
	const temper = band(m.warmth, "cool Shukra tones — calm and diplomatic", "even elemental tones — steady temperament", "warm Mangal tones — high drive and courage");
	const sym = band(m.symmetry, "notable asymmetry — a restless, creative mind", "gentle asymmetry — practical adaptability", "strong facial symmetry — disciplined and fortunate");
	const def = band(m.contrast, "soft feature definition — a gentle nature", "moderate feature definition — measured decisions", "sharp feature definition — decisive leadership");
	return [
		`Facial symmetry measured at ${m.symmetry}% — ${sym}.`,
		`Complexion radiance ${m.brightness}%: ${glow}.`,
		`Tone analysis shows ${temper}.`,
		`Structure: ${def}.`
	].join(" ");
}
function palmReading(m) {
	const lines = band(m.detail, "few, deep lines — a focused single-path life", "a clear, moderate line network — balanced destiny", "a dense line network — many opportunities and travel");
	const heart = band(m.warmth, "a cool Heart line — loyal but reserved in love", "a balanced Heart line — warmth with discernment", "a strong Heart line — passionate attachments");
	const head = band(m.contrast, "a smooth Head line — intuitive thinking", "a defined Head line — analytical balance", "a deeply etched Head line — sharp intellect");
	const life = band(m.brightness, "a shaded Life line — conserve energy, rest well", "a steady Life line — consistent vitality", "a luminous Life line — robust vitality and longevity");
	return [
		`Line density scored ${m.detail}% — ${lines}.`,
		`Heart line: ${heart}.`,
		`Head line: ${head}.`,
		`Life line: ${life}.`
	].join(" ");
}
var TOTAL = 6;
function Onboarding({ initial, onCancel, submitLabel } = {}) {
	const { saveProfile } = useAstro();
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [dob, setDob] = (0, import_react.useState)(initial?.dob ?? "");
	const [tob, setTob] = (0, import_react.useState)(initial?.tob ?? "");
	const [pob, setPob] = (0, import_react.useState)(initial?.pob ?? "");
	const [facePhoto, setFacePhoto] = (0, import_react.useState)(initial?.facePhoto ?? null);
	const [palmPhoto, setPalmPhoto] = (0, import_react.useState)(initial?.palmPhoto ?? null);
	const [faceText, setFaceText] = (0, import_react.useState)(initial?.faceReading ?? null);
	const [palmText, setPalmText] = (0, import_react.useState)(initial?.palmReading ?? null);
	const canNext = () => {
		if (step === 0) return name.trim().length > 1;
		if (step === 1) return !!dob;
		if (step === 2) return !!tob;
		if (step === 3) return pob.trim().length > 1;
		return true;
	};
	const next = () => setStep((s) => Math.min(s + 1, TOTAL - 1));
	const back = () => setStep((s) => Math.max(s - 1, 0));
	const submit = () => {
		saveProfile({
			name: name.trim(),
			dob,
			tob,
			pob: pob.trim(),
			facePhoto,
			palmPhoto,
			faceReading: faceText,
			palmReading: palmText,
			createdAt: initial?.createdAt ?? Date.now()
		});
		onCancel?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col overflow-hidden px-6 pb-10 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CosmicBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-lg font-bold text-gold-gradient",
						children: "Edit Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCancel,
						"aria-label": "Cancel editing",
						className: "flex h-9 w-9 items-center justify-center rounded-full glass text-foreground active:scale-95",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-3",
					children: [
						step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: back,
							className: "flex h-9 w-9 items-center justify-center rounded-full glass text-foreground active:scale-95",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-9" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 w-full overflow-hidden rounded-full bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-to-r from-saffron to-gold transition-all duration-500",
									style: { width: `${(step + 1) / TOTAL * 100}%` }
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-12 text-right text-xs font-semibold text-gold",
							children: [
								step + 1,
								"/",
								TOTAL
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-1 flex-col justify-center animate-[fade-in_0.4s_ease-out]",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepShell, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}),
						title: "What's your name?",
						subtitle: "So Guru Ji knows who he's guiding.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingInput, {
							label: "Full Name",
							value: name,
							onChange: setName,
							autoFocus: true
						})
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepShell, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {}),
						title: "Date of Birth",
						subtitle: "Your cosmic blueprint begins here.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeField, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-gold" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: dob,
								max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
								onChange: (e) => setDob(e.target.value),
								className: "w-full bg-transparent py-4 text-lg text-foreground outline-none [color-scheme:dark]"
							})
						})
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepShell, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
						title: "Time of Birth",
						subtitle: "Exact time refines your planetary houses.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeField, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-gold" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								value: tob,
								onChange: (e) => setTob(e.target.value),
								className: "w-full bg-transparent py-4 text-lg text-foreground outline-none [color-scheme:dark]"
							})
						})
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepShell, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
						title: "Place of Birth",
						subtitle: "City, State, Country",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingInput, {
							label: "e.g. Varanasi, UP, India",
							value: pob,
							onChange: setPob,
							autoFocus: true
						})
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepShell, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}),
						title: "Face Reading",
						subtitle: "Upload Face Photo for Face Reading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadArea, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-8 w-8" }),
							label: "Upload Face Photo",
							analyzingText: "Analyzing facial symmetry and planetary influences…",
							captureMode: "user",
							photo: facePhoto,
							reading: faceText,
							onResult: (url, m) => {
								setFacePhoto(url);
								setFaceText(faceReading(m));
							}
						})
					}),
					step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepShell, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, {}),
						title: "Palmistry",
						subtitle: "Upload Palm Photo for Hast Rekha Analysis",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadArea, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "h-8 w-8" }),
							label: "Upload Palm Photo",
							analyzingText: "Scanning lines (Heart, Life, Head lines)…",
							captureMode: "environment",
							photo: palmPhoto,
							reading: palmText,
							onResult: (url, m) => {
								setPalmPhoto(url);
								setPalmText(palmReading(m));
							}
						})
					})
				]
			}, step),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 pt-4",
				children: [step < TOTAL - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: next,
					disabled: !canNext(),
					className: "h-14 w-full rounded-2xl bg-gradient-to-r from-saffron to-gold text-base font-bold text-[#1a1206] shadow-lg transition active:scale-[0.98] disabled:opacity-40",
					children: "Continue"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: submit,
					className: "flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-gold text-base font-bold text-[#1a1206] shadow-lg transition active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }), submitLabel ?? (onCancel ? "Save & Recompute Charts" : "Submit & Generate Charts")]
				}), step >= 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-xs text-muted-foreground/70",
					children: "Photo upload is optional — you can skip."
				})]
			})
		]
	});
}
function StepShell({ icon, title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/15 text-gold [&>svg]:h-7 [&>svg]:w-7",
			children: icon
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-bold text-foreground",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-8 mt-2 text-sm text-muted-foreground",
			children: subtitle
		}),
		children
	] });
}
function FloatingInput({ label, value, onChange, autoFocus }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	const active = focused || value.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			autoFocus,
			value,
			onChange: (e) => onChange(e.target.value),
			onFocus: () => setFocused(true),
			onBlur: () => setFocused(false),
			className: "peer h-16 w-full rounded-2xl border border-input bg-surface px-4 pt-5 text-lg text-foreground outline-none transition focus:border-gold"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: `pointer-events-none absolute left-4 transition-all ${active ? "top-2.5 text-xs text-gold" : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"}`,
			children: label
		})]
	});
}
function NativeField({ icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-2xl border border-input bg-surface px-4 focus-within:border-gold",
		children: [icon, children]
	});
}
function UploadArea({ icon, label, analyzingText, captureMode, photo, reading, onResult }) {
	const cameraRef = (0, import_react.useRef)(null);
	const galleryRef = (0, import_react.useRef)(null);
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleFile = async (file) => {
		setError(null);
		setAnalyzing(true);
		try {
			const { dataUrl, metrics } = await analyzeImageFile(file);
			onResult(dataUrl, metrics);
		} catch {
			setError("Could not read that image. Please try another photo.");
		} finally {
			setAnalyzing(false);
		}
	};
	const pick = (e) => {
		const f = e.target.files?.[0];
		e.target.value = "";
		if (f) handleFile(f);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: cameraRef,
			type: "file",
			accept: "image/*",
			capture: captureMode,
			className: "hidden",
			onChange: pick
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: galleryRef,
			type: "file",
			accept: "image/*",
			className: "hidden",
			onChange: pick
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-52 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border-2 border-dashed border-gold/40 bg-surface text-gold",
			children: [analyzing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 px-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-12 w-12 animate-spin rounded-full border-4 border-gold/20 border-t-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: analyzingText
				})]
			}) : photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: label,
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron/15",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base font-semibold text-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Take a photo or choose from your gallery"
				})
			] }), !analyzing && photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Analyzed"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => cameraRef.current?.click(),
				disabled: analyzing,
				className: "flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-gold text-sm font-bold text-[#1a1206] active:scale-95 disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-4.5 w-4.5" }), " Take Photo"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => galleryRef.current?.click(),
				disabled: analyzing,
				className: "flex h-12 items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-saffron/10 text-sm font-bold text-gold active:scale-95 disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "h-4.5 w-4.5" }), " Gallery"]
			})]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-center text-xs text-destructive",
			children: error
		}),
		!analyzing && reading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 rounded-2xl border border-gold/25 bg-surface-2 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-xs font-semibold uppercase tracking-wide text-gold",
				children: "Analysis Result"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-foreground",
				children: reading
			})]
		})
	] });
}
var SIGNS = [
	{
		name: "Capricorn",
		from: [12, 22],
		to: [1, 19],
		element: "Earth",
		ruler: "Saturn"
	},
	{
		name: "Aquarius",
		from: [1, 20],
		to: [2, 18],
		element: "Air",
		ruler: "Saturn"
	},
	{
		name: "Pisces",
		from: [2, 19],
		to: [3, 20],
		element: "Water",
		ruler: "Jupiter"
	},
	{
		name: "Aries",
		from: [3, 21],
		to: [4, 19],
		element: "Fire",
		ruler: "Mars"
	},
	{
		name: "Taurus",
		from: [4, 20],
		to: [5, 20],
		element: "Earth",
		ruler: "Venus"
	},
	{
		name: "Gemini",
		from: [5, 21],
		to: [6, 20],
		element: "Air",
		ruler: "Mercury"
	},
	{
		name: "Cancer",
		from: [6, 21],
		to: [7, 22],
		element: "Water",
		ruler: "Moon"
	},
	{
		name: "Leo",
		from: [7, 23],
		to: [8, 22],
		element: "Fire",
		ruler: "Sun"
	},
	{
		name: "Virgo",
		from: [8, 23],
		to: [9, 22],
		element: "Earth",
		ruler: "Mercury"
	},
	{
		name: "Libra",
		from: [9, 23],
		to: [10, 22],
		element: "Air",
		ruler: "Venus"
	},
	{
		name: "Scorpio",
		from: [10, 23],
		to: [11, 21],
		element: "Water",
		ruler: "Mars"
	},
	{
		name: "Sagittarius",
		from: [11, 22],
		to: [12, 21],
		element: "Fire",
		ruler: "Jupiter"
	}
];
function getSign(dob) {
	if (!dob) return SIGNS[3];
	const d = new Date(dob);
	const m = d.getMonth() + 1;
	const day = d.getDate();
	for (const s of SIGNS) {
		const [fm, fd] = s.from;
		const [tm, td] = s.to;
		if (fm === tm) {
			if (m === fm && day >= fd && day <= td) return s;
		} else if (m === fm && day >= fd || m === tm && day <= td) return s;
	}
	return SIGNS[0];
}
function birthYear(dob) {
	if (!dob) return (/* @__PURE__ */ new Date()).getFullYear();
	return new Date(dob).getFullYear();
}
function firstName(name) {
	return name?.trim().split(" ")[0] || "Seeker";
}
function nakshatra(profile) {
	const list = [
		"Ashwini",
		"Bharani",
		"Krittika",
		"Rohini",
		"Mrigashira",
		"Ardra",
		"Punarvasu",
		"Pushya",
		"Ashlesha",
		"Magha",
		"Purva Phalguni",
		"Hasta"
	];
	return list[(profile ? new Date(profile.dob).getDate() : 1) % list.length];
}
var PLANETS = [
	{
		key: "Su",
		name: "Sun"
	},
	{
		key: "Mo",
		name: "Moon"
	},
	{
		key: "Ma",
		name: "Mars"
	},
	{
		key: "Me",
		name: "Mercury"
	},
	{
		key: "Ju",
		name: "Jupiter"
	},
	{
		key: "Ve",
		name: "Venus"
	},
	{
		key: "Sa",
		name: "Saturn"
	},
	{
		key: "Ra",
		name: "Rahu"
	},
	{
		key: "Ke",
		name: "Ketu"
	}
];
var ZODIAC = [
	"Aries",
	"Taurus",
	"Gemini",
	"Cancer",
	"Leo",
	"Virgo",
	"Libra",
	"Scorpio",
	"Sagittarius",
	"Capricorn",
	"Aquarius",
	"Pisces"
];
function seedFrom(profile) {
	if (!profile) return 7;
	const d = new Date(profile.dob);
	const t = (profile.tob || "00:00").split(":").map(Number);
	let s = d.getDate() + (d.getMonth() + 1) * 31 + d.getFullYear();
	s += (t[0] || 0) * 60 + (t[1] || 0);
	for (const ch of profile.pob || "") s += ch.charCodeAt(0);
	return s;
}
function birthChart(profile) {
	const seed = seedFrom(profile);
	const ascIndex = seed % 12;
	const houses = Array.from({ length: 12 }, () => ({ planets: [] }));
	PLANETS.forEach((p, i) => {
		houses[(seed * (i + 3) + i * 7) % 12].planets.push(p);
	});
	return {
		ascendant: ZODIAC[ascIndex],
		ascIndex,
		houses
	};
}
function signForHouse(ascIndex, houseNum) {
	return ZODIAC[(ascIndex + houseNum - 1) % 12];
}
var en = {
	chips: [
		"Career & Wealth",
		"Marriage & Love Life",
		"Health Analysis",
		"Sade Sati Status"
	],
	greeting: (fn, sign, nak, pob) => `🙏 Namaste ${fn} ji. I am Guru Ji, your AI Master Astrologer. I see you were born under the ${sign} sign, in the ${nak} Nakshatra${pob ? `, at ${pob}` : ""}. Your chart holds remarkable promise. Ask me anything — career, love, health, or your Sade Sati.`,
	career: (fn, ruler) => `${fn} ji, with ${ruler} influencing your 10th house, the next 8 months favour bold career moves. Jupiter strengthens earnings — invest after the waxing moon. Avoid signing big contracts on Saturdays. 🪐`,
	love: (fn, sign) => `Your Venus is well-placed for ${sign}, ${fn} ji. A meaningful connection is indicated through a friend or family introduction. Offer white flowers on Fridays to strengthen the 7th house. ❤️`,
	health: (fn, nak, ruler) => `${fn} ji, your ${nak} Nakshatra suggests watching digestion and stress. ${ruler} asks for routine — sunrise walks and warm turmeric water balance your doshas. 🌿`,
	saturn: (sign) => `Regarding Sade Sati: Saturn is in a transitional phase for ${sign}. It tests patience, it does not punish. Recite Hanuman Chalisa on Saturdays and donate black sesame. 🙏`,
	fallback: (fn, sign, ruler) => `${fn} ji, the stars hear your question. Under ${sign} with ${ruler} as your guide, focus your intention and the path reveals itself. Ask about career, love, health, or Sade Sati. ✨`,
	placeholder: "Ask Guru Ji…",
	chartTitle: "Your Birth Chart",
	languageLabel: "Language"
};
var hi = {
	chips: [
		"करियर और धन",
		"विवाह और प्रेम",
		"स्वास्थ्य विश्लेषण",
		"साढ़े साती स्थिति"
	],
	greeting: (fn, sign, nak, pob) => `🙏 नमस्ते ${fn} जी। मैं गुरु जी हूँ, आपका AI ज्योतिषाचार्य। आपका जन्म ${sign} राशि, ${nak} नक्षत्र${pob ? ` में ${pob} पर` : ""} हुआ है। आपकी कुंडली अत्यंत शुभ है। करियर, प्रेम, स्वास्थ्य या साढ़े साती — कुछ भी पूछिए।`,
	career: (fn, ruler) => `${fn} जी, ${ruler} आपके दशम भाव को प्रभावित कर रहे हैं — अगले 8 महीने साहसिक करियर निर्णयों के लिए शुभ हैं। गुरु आय को बल देंगे। शनिवार को बड़े अनुबंध न करें। 🪐`,
	love: (fn, sign) => `${fn} जी, ${sign} राशि के लिए शुक्र अनुकूल हैं। किसी मित्र या परिवार के माध्यम से शुभ संबंध बनेगा। शुक्रवार को सफेद पुष्प अर्पित करें। ❤️`,
	health: (fn, nak, ruler) => `${fn} जी, ${nak} नक्षत्र पाचन और तनाव पर ध्यान देने को कहता है। ${ruler} नियम चाहते हैं — प्रातः भ्रमण और हल्दी वाला गर्म जल दोष संतुलित करेगा। 🌿`,
	saturn: (sign) => `साढ़े साती: ${sign} राशि के लिए शनि संक्रमण चरण में हैं। यह धैर्य की परीक्षा है, दंड नहीं। शनिवार को हनुमान चालीसा पढ़ें और काले तिल दान करें। 🙏`,
	fallback: (fn, sign, ruler) => `${fn} जी, तारे आपका प्रश्न सुन रहे हैं। ${sign} राशि और ${ruler} के मार्गदर्शन में संकल्प दृढ़ रखें। करियर, प्रेम, स्वास्थ्य या साढ़े साती पर पूछें। ✨`,
	placeholder: "गुरु जी से पूछें…",
	chartTitle: "आपकी जन्म कुंडली",
	languageLabel: "भाषा"
};
var bn = {
	chips: [
		"কর্মজীবন ও সম্পদ",
		"বিবাহ ও প্রেম",
		"স্বাস্থ্য বিশ্লেষণ",
		"সাড়ে সাতি অবস্থা"
	],
	greeting: (fn, sign, nak, pob) => `🙏 নমস্কার ${fn} জি। আমি গুরু জি, আপনার AI জ্যোতিষী। আপনার জন্ম ${sign} রাশিতে, ${nak} নক্ষত্রে${pob ? `, ${pob}-এ` : ""}। আপনার কুণ্ডলী অত্যন্ত শুভ। কর্ম, প্রেম, স্বাস্থ্য বা সাড়ে সাতি — যা খুশি জিজ্ঞাসা করুন।`,
	career: (fn, ruler) => `${fn} জি, ${ruler} আপনার দশম ভাবকে প্রভাবিত করছে — আগামী ৮ মাস সাহসী কর্মসিদ্ধান্তের পক্ষে শুভ। শনিবারে বড় চুক্তি এড়িয়ে চলুন। 🪐`,
	love: (fn, sign) => `${fn} জি, ${sign} রাশির জন্য শুক্র অনুকূল। বন্ধু বা পরিবারের মাধ্যমে সুন্দর সম্পর্ক আসবে। শুক্রবারে সাদা ফুল নিবেদন করুন। ❤️`,
	health: (fn, nak, ruler) => `${fn} জি, ${nak} নক্ষত্র হজম ও মানসিক চাপের দিকে নজর দিতে বলে। ${ruler} নিয়ম চায় — সকালে হাঁটা ও হলুদ-জল দোষ সামঞ্জস্য করবে। 🌿`,
	saturn: (sign) => `সাড়ে সাতি: ${sign} রাশির জন্য শনি সংক্রমণ পর্যায়ে। এটি ধৈর্যের পরীক্ষা, শাস্তি নয়। শনিবারে হনুমান চালিসা পড়ুন। 🙏`,
	fallback: (fn, sign, ruler) => `${fn} জি, তারারা আপনার প্রশ্ন শুনছে। ${sign} ও ${ruler}-এর নির্দেশনায় পথ খুলে যাবে। কর্ম, প্রেম, স্বাস্থ্য বা সাড়ে সাতি নিয়ে জিজ্ঞাসা করুন। ✨`,
	placeholder: "গুরু জিকে জিজ্ঞাসা করুন…",
	chartTitle: "আপনার জন্মকুণ্ডলী",
	languageLabel: "ভাষা"
};
var ta = {
	chips: [
		"தொழில் & செல்வம்",
		"திருமணம் & காதல்",
		"உடல்நலம்",
		"சடே சதி நிலை"
	],
	greeting: (fn, sign, nak, pob) => `🙏 வணக்கம் ${fn} ஜி. நான் குரு ஜி, உங்கள் AI ஜோதிடர். நீங்கள் ${sign} ராசியில், ${nak} நட்சத்திரத்தில்${pob ? `, ${pob}-இல்` : ""} பிறந்தீர்கள். உங்கள் ஜாதகம் மிகச் சிறப்பானது. தொழில், காதல், உடல்நலம் அல்லது சடே சதி — எதையும் கேளுங்கள்.`,
	career: (fn, ruler) => `${fn} ஜி, ${ruler} உங்கள் 10-ஆம் வீட்டைத் தொடுகிறார் — அடுத்த 8 மாதங்கள் தைரியமான தொழில் முடிவுகளுக்கு உகந்தவை. சனிக்கிழமைகளில் பெரிய ஒப்பந்தங்களைத் தவிர்க்கவும். 🪐`,
	love: (fn, sign) => `${fn} ஜி, ${sign} ராசிக்கு சுக்கிரன் சாதகமாக உள்ளார். நண்பர் அல்லது குடும்பம் வழியாக நல்ல உறவு அமையும். வெள்ளிக்கிழமை வெள்ளை மலர் அர்ப்பணிக்கவும். ❤️`,
	health: (fn, nak, ruler) => `${fn} ஜி, ${nak} நட்சத்திரம் செரிமானம் மற்றும் மன அழுத்தத்தில் கவனம் கேட்கிறது. ${ruler} ஒழுங்கை விரும்புகிறார் — காலை நடை, மஞ்சள் நீர் நல்லது. 🌿`,
	saturn: (sign) => `சடே சதி: ${sign} ராசிக்கு சனி இடைநிலைக் கட்டத்தில். இது பொறுமையின் சோதனை, தண்டனை அல்ல. சனிக்கிழமை ஹனுமான் சாலிசா ஓதுங்கள். 🙏`,
	fallback: (fn, sign, ruler) => `${fn} ஜி, நட்சத்திரங்கள் உங்கள் கேள்வியைக் கேட்கின்றன. ${sign} மற்றும் ${ruler} வழிகாட்ட, பாதை தெளிவாகும். தொழில், காதல், உடல்நலம் பற்றி கேளுங்கள். ✨`,
	placeholder: "குரு ஜியிடம் கேளுங்கள்…",
	chartTitle: "உங்கள் ஜாதகம்",
	languageLabel: "மொழி"
};
var te = {
	chips: [
		"వృత్తి & సంపద",
		"వివాహం & ప్రేమ",
		"ఆరోగ్య విశ్లేషణ",
		"సాడే సతి స్థితి"
	],
	greeting: (fn, sign, nak, pob) => `🙏 నమస్తే ${fn} జీ. నేను గురు జీ, మీ AI జ్యోతిష్కుడు. మీరు ${sign} రాశిలో, ${nak} నక్షత్రంలో${pob ? `, ${pob}లో` : ""} జన్మించారు. మీ జాతకం చాలా శుభప్రదం. వృత్తి, ప్రేమ, ఆరోగ్యం లేదా సాడే సతి — ఏదైనా అడగండి.`,
	career: (fn, ruler) => `${fn} జీ, ${ruler} మీ దశమ స్థానాన్ని ప్రభావితం చేస్తున్నారు — రాబోయే 8 నెలలు ధైర్యమైన వృత్తి నిర్ణయాలకు అనుకూలం. శనివారాల్లో పెద్ద ఒప్పందాలు వద్దు. 🪐`,
	love: (fn, sign) => `${fn} జీ, ${sign} రాశికి శుక్రుడు అనుకూలం. స్నేహితుడు లేదా కుటుంబం ద్వారా మంచి బంధం కలుగుతుంది. శుక్రవారం తెల్ల పూలు సమర్పించండి. ❤️`,
	health: (fn, nak, ruler) => `${fn} జీ, ${nak} నక్షత్రం జీర్ణక్రియ, ఒత్తిడిపై శ్రద్ధ కోరుతుంది. ${ruler} క్రమశిక్షణ కోరుతున్నారు — ఉదయపు నడక, పసుపు నీరు మేలు. 🌿`,
	saturn: (sign) => `సాడే సతి: ${sign} రాశికి శని పరివర్తన దశలో ఉన్నారు. ఇది సహనానికి పరీక్ష, శిక్ష కాదు. శనివారం హనుమాన్ చాలీసా పఠించండి. 🙏`,
	fallback: (fn, sign, ruler) => `${fn} జీ, నక్షత్రాలు మీ ప్రశ్న వింటున్నాయి. ${sign}, ${ruler} మార్గదర్శకత్వంలో దారి తెరుచుకుంటుంది. వృత్తి, ప్రేమ, ఆరోగ్యం గురించి అడగండి. ✨`,
	placeholder: "గురు జీని అడగండి…",
	chartTitle: "మీ జన్మ కుండలి",
	languageLabel: "భాష"
};
var mr = {
	chips: [
		"करिअर व संपत्ती",
		"विवाह व प्रेम",
		"आरोग्य विश्लेषण",
		"साडेसाती स्थिती"
	],
	greeting: (fn, sign, nak, pob) => `🙏 नमस्कार ${fn} जी. मी गुरु जी, तुमचा AI ज्योतिषी. तुमचा जन्म ${sign} राशीत, ${nak} नक्षत्रात${pob ? `, ${pob} येथे` : ""} झाला आहे. तुमची कुंडली अतिशय शुभ आहे. करिअर, प्रेम, आरोग्य किंवा साडेसाती — काहीही विचारा.`,
	career: (fn, ruler) => `${fn} जी, ${ruler} तुमच्या दशम स्थानावर प्रभाव टाकत आहेत — पुढील ८ महिने धाडसी करिअर निर्णयांसाठी शुभ. शनिवारी मोठे करार टाळा. 🪐`,
	love: (fn, sign) => `${fn} जी, ${sign} राशीसाठी शुक्र अनुकूल आहे. मित्र किंवा कुटुंबामार्फत चांगले नाते जुळेल. शुक्रवारी पांढरी फुले अर्पण करा. ❤️`,
	health: (fn, nak, ruler) => `${fn} जी, ${nak} नक्षत्र पचन व ताणाकडे लक्ष देण्यास सांगते. ${ruler} शिस्त मागतात — सकाळचा फेरफटका व हळदीचे कोमट पाणी उपयुक्त. 🌿`,
	saturn: (sign) => `साडेसाती: ${sign} राशीसाठी शनी संक्रमण टप्प्यात आहे. ही संयमाची परीक्षा आहे, शिक्षा नाही. शनिवारी हनुमान चालीसा वाचा. 🙏`,
	fallback: (fn, sign, ruler) => `${fn} जी, तारे तुमचा प्रश्न ऐकत आहेत. ${sign} व ${ruler} यांच्या मार्गदर्शनात मार्ग उलगडेल. करिअर, प्रेम, आरोग्याबद्दल विचारा. ✨`,
	placeholder: "गुरु जींना विचारा…",
	chartTitle: "तुमची जन्मकुंडली",
	languageLabel: "भाषा"
};
var gu = {
	chips: [
		"કારકિર્દી અને ધન",
		"લગ્ન અને પ્રેમ",
		"આરોગ્ય વિશ્લેષણ",
		"સાડાસાતી સ્થિતિ"
	],
	greeting: (fn, sign, nak, pob) => `🙏 નમસ્તે ${fn} જી. હું ગુરુ જી, તમારો AI જ્યોતિષી. તમારો જન્મ ${sign} રાશિમાં, ${nak} નક્ષત્રમાં${pob ? `, ${pob} ખાતે` : ""} થયો છે. તમારી કુંડળી ખૂબ શુભ છે. કારકિર્દી, પ્રેમ, આરોગ્ય કે સાડાસાતી — કંઈ પણ પૂછો.`,
	career: (fn, ruler) => `${fn} જી, ${ruler} તમારા દશમ ભાવને પ્રભાવિત કરે છે — આગામી ૮ મહિના હિંમતભર્યા કારકિર્દી નિર્ણય માટે શુભ. શનિવારે મોટા કરાર ટાળો. 🪐`,
	love: (fn, sign) => `${fn} જી, ${sign} રાશિ માટે શુક્ર અનુકૂળ છે. મિત્ર કે પરિવાર દ્વારા સારો સંબંધ બંધાશે. શુક્રવારે સફેદ ફૂલ અર્પણ કરો. ❤️`,
	health: (fn, nak, ruler) => `${fn} જી, ${nak} નક્ષત્ર પાચન અને તણાવ પર ધ્યાન માંગે છે. ${ruler} નિયમિતતા ઈચ્છે છે — સવારની ચાલ અને હળદરવાળું ગરમ પાણી લાભદાયી. 🌿`,
	saturn: (sign) => `સાડાસાતી: ${sign} રાશિ માટે શનિ સંક્રમણ તબક્કામાં છે. આ ધીરજની કસોટી છે, સજા નહીં. શનિવારે હનુમાન ચાલીસા વાંચો. 🙏`,
	fallback: (fn, sign, ruler) => `${fn} જી, તારાઓ તમારો પ્રશ્ન સાંભળે છે. ${sign} અને ${ruler}ના માર્ગદર્શનમાં માર્ગ ખૂલશે. કારકિર્દી, પ્રેમ, આરોગ્ય વિશે પૂછો. ✨`,
	placeholder: "ગુરુ જીને પૂછો…",
	chartTitle: "તમારી જન્મકુંડળી",
	languageLabel: "ભાષા"
};
var kn = {
	chips: [
		"ವೃತ್ತಿ ಮತ್ತು ಸಂಪತ್ತು",
		"ವಿವಾಹ ಮತ್ತು ಪ್ರೇಮ",
		"ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ",
		"ಸಾಡೇ ಸತಿ ಸ್ಥಿತಿ"
	],
	greeting: (fn, sign, nak, pob) => `🙏 ನಮಸ್ತೆ ${fn} ಜೀ. ನಾನು ಗುರು ಜೀ, ನಿಮ್ಮ AI ಜ್ಯೋತಿಷಿ. ನೀವು ${sign} ರಾಶಿಯಲ್ಲಿ, ${nak} ನಕ್ಷತ್ರದಲ್ಲಿ${pob ? `, ${pob}ನಲ್ಲಿ` : ""} ಜನಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ಜಾತಕ ಬಹಳ ಶುಭ. ವೃತ್ತಿ, ಪ್ರೇಮ, ಆರೋಗ್ಯ ಅಥವಾ ಸಾಡೇ ಸತಿ — ಏನಾದರೂ ಕೇಳಿ.`,
	career: (fn, ruler) => `${fn} ಜೀ, ${ruler} ನಿಮ್ಮ ದಶಮ ಭಾವವನ್ನು ಪ್ರಭಾವಿಸುತ್ತಿದ್ದಾರೆ — ಮುಂದಿನ 8 ತಿಂಗಳು ಧೈರ್ಯದ ವೃತ್ತಿ ನಿರ್ಧಾರಗಳಿಗೆ ಶುಭ. ಶನಿವಾರ ದೊಡ್ಡ ಒಪ್ಪಂದ ಬೇಡ. 🪐`,
	love: (fn, sign) => `${fn} ಜೀ, ${sign} ರಾಶಿಗೆ ಶುಕ್ರ ಅನುಕೂಲ. ಸ್ನೇಹಿತ ಅಥವಾ ಕುಟುಂಬದ ಮೂಲಕ ಒಳ್ಳೆಯ ಸಂಬಂಧ. ಶುಕ್ರವಾರ ಬಿಳಿ ಹೂ ಅರ್ಪಿಸಿ. ❤️`,
	health: (fn, nak, ruler) => `${fn} ಜೀ, ${nak} ನಕ್ಷತ್ರ ಜೀರ್ಣ ಮತ್ತು ಒತ್ತಡದ ಬಗ್ಗೆ ಎಚ್ಚರ ಹೇಳುತ್ತದೆ. ${ruler} ಶಿಸ್ತು ಕೇಳುತ್ತಾರೆ — ಬೆಳಗಿನ ನಡಿಗೆ, ಅರಿಶಿನ ನೀರು ಒಳ್ಳೆಯದು. 🌿`,
	saturn: (sign) => `ಸಾಡೇ ಸತಿ: ${sign} ರಾಶಿಗೆ ಶನಿ ಪರಿವರ್ತನಾ ಹಂತದಲ್ಲಿ. ಇದು ತಾಳ್ಮೆಯ ಪರೀಕ್ಷೆ, ಶಿಕ್ಷೆ ಅಲ್ಲ. ಶನಿವಾರ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸಿ. 🙏`,
	fallback: (fn, sign, ruler) => `${fn} ಜೀ, ನಕ್ಷತ್ರಗಳು ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಕೇಳುತ್ತಿವೆ. ${sign} ಮತ್ತು ${ruler} ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ದಾರಿ ತೆರೆಯುತ್ತದೆ. ವೃತ್ತಿ, ಪ್ರೇಮ, ಆರೋಗ್ಯದ ಬಗ್ಗೆ ಕೇಳಿ. ✨`,
	placeholder: "ಗುರು ಜೀಯನ್ನು ಕೇಳಿ…",
	chartTitle: "ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿ",
	languageLabel: "ಭಾಷೆ"
};
var ml = {
	chips: [
		"കരിയർ & സമ്പത്ത്",
		"വിവാഹം & പ്രണയം",
		"ആരോഗ്യ വിശകലനം",
		"സാഡേ സതി"
	],
	greeting: (fn, sign, nak, pob) => `🙏 നമസ്തേ ${fn} ജി. ഞാൻ ഗുരു ജി, നിങ്ങളുടെ AI ജ്യോതിഷി. നിങ്ങൾ ${sign} രാശിയിൽ, ${nak} നക്ഷത്രത്തിൽ${pob ? `, ${pob}-ൽ` : ""} ജനിച്ചു. നിങ്ങളുടെ ജാതകം ഏറെ ശുഭകരമാണ്. കരിയർ, പ്രണയം, ആരോഗ്യം അല്ലെങ്കിൽ സാഡേ സതി — എന്തും ചോദിക്കൂ.`,
	career: (fn, ruler) => `${fn} ജി, ${ruler} നിങ്ങളുടെ പത്താം ഭാവത്തെ സ്വാധീനിക്കുന്നു — അടുത്ത 8 മാസം ധീരമായ കരിയർ തീരുമാനങ്ങൾക്ക് അനുകൂലം. ശനിയാഴ്ച വലിയ കരാറുകൾ ഒഴിവാക്കുക. 🪐`,
	love: (fn, sign) => `${fn} ജി, ${sign} രാശിക്ക് ശുക്രൻ അനുകൂലമാണ്. സുഹൃത്തിലൂടെയോ കുടുംബത്തിലൂടെയോ നല്ല ബന്ധം. വെള്ളിയാഴ്ച വെളുത്ത പൂക്കൾ അർപ്പിക്കുക. ❤️`,
	health: (fn, nak, ruler) => `${fn} ജി, ${nak} നക്ഷത്രം ദഹനത്തിലും സമ്മർദ്ദത്തിലും ശ്രദ്ധ ആവശ്യപ്പെടുന്നു. ${ruler} ചിട്ട ആഗ്രഹിക്കുന്നു — പ്രഭാത നടത്തവും മഞ്ഞൾ വെള്ളവും നല്ലത്. 🌿`,
	saturn: (sign) => `സാഡേ സതി: ${sign} രാശിക്ക് ശനി പരിവർത്തന ഘട്ടത്തിലാണ്. ഇത് ക്ഷമയുടെ പരീക്ഷണമാണ്, ശിക്ഷയല്ല. ശനിയാഴ്ച ഹനുമാൻ ചാലിസ ജപിക്കുക. 🙏`,
	fallback: (fn, sign, ruler) => `${fn} ജി, നക്ഷത്രങ്ങൾ നിങ്ങളുടെ ചോദ്യം കേൾക്കുന്നു. ${sign}-ഉം ${ruler}-ഉം വഴികാട്ടുമ്പോൾ വഴി തെളിയും. കരിയർ, പ്രണയം, ആരോഗ്യം ചോദിക്കൂ. ✨`,
	placeholder: "ഗുരു ജിയോട് ചോദിക്കൂ…",
	chartTitle: "നിങ്ങളുടെ ജാതകം",
	languageLabel: "ഭാഷ"
};
var pa = {
	chips: [
		"ਕਰੀਅਰ ਤੇ ਧਨ",
		"ਵਿਆਹ ਤੇ ਪਿਆਰ",
		"ਸਿਹਤ ਵਿਸ਼ਲੇਸ਼ਣ",
		"ਸਾਢੇ ਸਾਤੀ ਸਥਿਤੀ"
	],
	greeting: (fn, sign, nak, pob) => `🙏 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${fn} ਜੀ। ਮੈਂ ਗੁਰੂ ਜੀ ਹਾਂ, ਤੁਹਾਡਾ AI ਜੋਤਸ਼ੀ। ਤੁਹਾਡਾ ਜਨਮ ${sign} ਰਾਸ਼ੀ, ${nak} ਨਛੱਤਰ${pob ? ` ਵਿੱਚ ${pob} ਵਿਖੇ` : ""} ਹੋਇਆ। ਤੁਹਾਡੀ ਕੁੰਡਲੀ ਬਹੁਤ ਸ਼ੁਭ ਹੈ। ਕਰੀਅਰ, ਪਿਆਰ, ਸਿਹਤ ਜਾਂ ਸਾਢੇ ਸਾਤੀ — ਕੁਝ ਵੀ ਪੁੱਛੋ।`,
	career: (fn, ruler) => `${fn} ਜੀ, ${ruler} ਤੁਹਾਡੇ ਦਸਵੇਂ ਘਰ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਰਹੇ ਹਨ — ਅਗਲੇ 8 ਮਹੀਨੇ ਦਲੇਰ ਕਰੀਅਰ ਫੈਸਲਿਆਂ ਲਈ ਸ਼ੁਭ ਹਨ। ਸ਼ਨੀਵਾਰ ਵੱਡੇ ਸਮਝੌਤੇ ਨਾ ਕਰੋ। 🪐`,
	love: (fn, sign) => `${fn} ਜੀ, ${sign} ਰਾਸ਼ੀ ਲਈ ਸ਼ੁੱਕਰ ਅਨੁਕੂਲ ਹੈ। ਦੋਸਤ ਜਾਂ ਪਰਿਵਾਰ ਰਾਹੀਂ ਚੰਗਾ ਰਿਸ਼ਤਾ ਬਣੇਗਾ। ਸ਼ੁੱਕਰਵਾਰ ਚਿੱਟੇ ਫੁੱਲ ਭੇਟ ਕਰੋ। ❤️`,
	health: (fn, nak, ruler) => `${fn} ਜੀ, ${nak} ਨਛੱਤਰ ਪਾਚਨ ਤੇ ਤਣਾਅ ਵੱਲ ਧਿਆਨ ਮੰਗਦਾ ਹੈ। ${ruler} ਨਿਯਮ ਚਾਹੁੰਦੇ ਹਨ — ਸਵੇਰ ਦੀ ਸੈਰ ਤੇ ਹਲਦੀ ਵਾਲਾ ਪਾਣੀ ਲਾਭਦਾਇਕ। 🌿`,
	saturn: (sign) => `ਸਾਢੇ ਸਾਤੀ: ${sign} ਰਾਸ਼ੀ ਲਈ ਸ਼ਨੀ ਬਦਲਾਅ ਦੇ ਪੜਾਅ ਵਿੱਚ ਹੈ। ਇਹ ਸਬਰ ਦੀ ਪਰਖ ਹੈ, ਸਜ਼ਾ ਨਹੀਂ। ਸ਼ਨੀਵਾਰ ਹਨੂਮਾਨ ਚਾਲੀਸਾ ਪੜ੍ਹੋ। 🙏`,
	fallback: (fn, sign, ruler) => `${fn} ਜੀ, ਤਾਰੇ ਤੁਹਾਡਾ ਸਵਾਲ ਸੁਣ ਰਹੇ ਹਨ। ${sign} ਤੇ ${ruler} ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਰਾਹ ਖੁੱਲ੍ਹੇਗਾ। ਕਰੀਅਰ, ਪਿਆਰ, ਸਿਹਤ ਬਾਰੇ ਪੁੱਛੋ। ✨`,
	placeholder: "ਗੁਰੂ ਜੀ ਨੂੰ ਪੁੱਛੋ…",
	chartTitle: "ਤੁਹਾਡੀ ਜਨਮ ਕੁੰਡਲੀ",
	languageLabel: "ਭਾਸ਼ਾ"
};
var ur = {
	chips: [
		"کیریئر و دولت",
		"شادی و محبت",
		"صحت کا تجزیہ",
		"ساڑھے ساتی"
	],
	greeting: (fn, sign, nak, pob) => `🙏 آداب ${fn} جی۔ میں گرو جی ہوں، آپ کا AI ماہرِ نجوم۔ آپ کی پیدائش ${sign} برج، ${nak} نچھتر${pob ? ` میں ${pob} پر` : ""} ہوئی۔ آپ کا زائچہ نہایت مبارک ہے۔ کیریئر، محبت، صحت یا ساڑھے ساتی — کچھ بھی پوچھیں۔`,
	career: (fn, ruler) => `${fn} جی، ${ruler} آپ کے دسویں گھر پر اثر ڈال رہے ہیں — اگلے 8 ماہ جرات مندانہ فیصلوں کے لیے موزوں ہیں۔ ہفتہ کو بڑے معاہدے نہ کریں۔ 🪐`,
	love: (fn, sign) => `${fn} جی، ${sign} برج کے لیے زہرہ موافق ہے۔ دوست یا خاندان کے ذریعے اچھا رشتہ بنے گا۔ جمعہ کو سفید پھول پیش کریں۔ ❤️`,
	health: (fn, nak, ruler) => `${fn} جی، ${nak} نچھتر ہاضمے اور ذہنی دباؤ پر توجہ چاہتا ہے۔ ${ruler} نظم چاہتے ہیں — صبح کی سیر اور ہلدی والا نیم گرم پانی مفید ہے۔ 🌿`,
	saturn: (sign) => `ساڑھے ساتی: ${sign} کے لیے زحل تبدیلی کے مرحلے میں ہے۔ یہ صبر کا امتحان ہے، سزا نہیں۔ ہفتہ کو ہنومان چالیسا پڑھیں۔ 🙏`,
	fallback: (fn, sign, ruler) => `${fn} جی، ستارے آپ کا سوال سن رہے ہیں۔ ${sign} اور ${ruler} کی رہنمائی میں راستہ کھلے گا۔ کیریئر، محبت، صحت کے بارے میں پوچھیں۔ ✨`,
	placeholder: "گرو جی سے پوچھیں…",
	chartTitle: "آپ کا زائچہ",
	languageLabel: "زبان"
};
var DICTS = {
	en,
	hi,
	bn,
	ta,
	te,
	mr,
	gu,
	kn,
	ml,
	pa,
	ur,
	or: {
		chips: [
			"କ୍ୟାରିଅର ଓ ଧନ",
			"ବିବାହ ଓ ପ୍ରେମ",
			"ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣ",
			"ସାଢେ ସାତି"
		],
		greeting: (fn, sign, nak, pob) => `🙏 ନମସ୍କାର ${fn} ଜୀ। ମୁଁ ଗୁରୁ ଜୀ, ଆପଣଙ୍କ AI ଜ୍ୟୋତିଷୀ। ଆପଣଙ୍କ ଜନ୍ମ ${sign} ରାଶିରେ, ${nak} ନକ୍ଷତ୍ରରେ${pob ? `, ${pob}ରେ` : ""} ହୋଇଛି। ଆପଣଙ୍କ କୁଣ୍ଡଳୀ ଅତି ଶୁଭ। କ୍ୟାରିଅର, ପ୍ରେମ, ସ୍ୱାସ୍ଥ୍ୟ କିମ୍ବା ସାଢେ ସାତି — ଯାହା ବି ପଚାରନ୍ତୁ।`,
		career: (fn, ruler) => `${fn} ଜୀ, ${ruler} ଆପଣଙ୍କ ଦଶମ ଭାବକୁ ପ୍ରଭାବିତ କରୁଛନ୍ତି — ଆଗାମୀ ୮ ମାସ ସାହସିକ ନିଷ୍ପତ୍ତି ପାଇଁ ଶୁଭ। ଶନିବାରରେ ବଡ଼ ଚୁକ୍ତି ଏଡ଼ାନ୍ତୁ। 🪐`,
		love: (fn, sign) => `${fn} ଜୀ, ${sign} ରାଶି ପାଇଁ ଶୁକ୍ର ଅନୁକୂଳ। ବନ୍ଧୁ କିମ୍ବା ପରିବାର ମାଧ୍ୟମରେ ଭଲ ସମ୍ପର୍କ। ଶୁକ୍ରବାରରେ ଧଳା ଫୁଲ ଅର୍ପଣ କରନ୍ତୁ। ❤️`,
		health: (fn, nak, ruler) => `${fn} ଜୀ, ${nak} ନକ୍ଷତ୍ର ହଜମ ଓ ଚାପ ପ୍ରତି ଧ୍ୟାନ ଦେବାକୁ କହୁଛି। ${ruler} ନିୟମ ଚାହାନ୍ତି — ସକାଳ ଭ୍ରମଣ ଓ ହଳଦୀ ପାଣି ଉପକାରୀ। 🌿`,
		saturn: (sign) => `ସାଢେ ସାତି: ${sign} ରାଶି ପାଇଁ ଶନି ପରିବର୍ତ୍ତନ ପର୍ଯ୍ୟାୟରେ। ଏହା ଧୈର୍ଯ୍ୟର ପରୀକ୍ଷା, ଦଣ୍ଡ ନୁହେଁ। ଶନିବାରରେ ହନୁମାନ ଚାଳିଶା ପାଠ କରନ୍ତୁ। 🙏`,
		fallback: (fn, sign, ruler) => `${fn} ଜୀ, ତାରାମାନେ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଶୁଣୁଛନ୍ତି। ${sign} ଓ ${ruler}ଙ୍କ ମାର୍ଗଦର୍ଶନରେ ପଥ ଖୋଲିବ। କ୍ୟାରିଅର, ପ୍ରେମ, ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ ପଚାରନ୍ତୁ। ✨`,
		placeholder: "ଗୁରୁ ଜୀଙ୍କୁ ପଚାରନ୍ତୁ…",
		chartTitle: "ଆପଣଙ୍କ ଜନ୍ମକୁଣ୍ଡଳୀ",
		languageLabel: "ଭାଷା"
	},
	sa: hi,
	mai: hi,
	ne: hi,
	kok: mr,
	brx: hi,
	doi: hi,
	ks: ur,
	sd: ur,
	as: bn,
	mni: bn,
	sat: hi
};
function dict(code) {
	return DICTS[code] ?? en;
}
function isRtl(code) {
	return code === "ur" || code === "ks" || code === "sd";
}
var S = 320;
var POS = [
	[S / 2, S / 4],
	[S / 4, S / 8],
	[S / 8, S / 4],
	[S / 4, S / 2],
	[S / 8, 3 * S / 4],
	[S / 4, 7 * S / 8],
	[S / 2, 3 * S / 4],
	[3 * S / 4, 7 * S / 8],
	[7 * S / 8, 3 * S / 4],
	[3 * S / 4, S / 2],
	[7 * S / 8, S / 4],
	[3 * S / 4, S / 8]
];
function BirthChart() {
	const { profile } = useAstro();
	const svgRef = (0, import_react.useRef)(null);
	const chart = (0, import_react.useMemo)(() => birthChart(profile), [profile]);
	const download = () => {
		const svg = svgRef.current;
		if (!svg) return;
		const xml = new XMLSerializer().serializeToString(svg);
		const svg64 = btoa(unescape(encodeURIComponent(xml)));
		const img = new Image();
		img.onload = () => {
			const scale = 3;
			const canvas = document.createElement("canvas");
			canvas.width = S * scale;
			canvas.height = S * scale;
			const ctx = canvas.getContext("2d");
			ctx.fillStyle = "#0B0C10";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			const a = document.createElement("a");
			a.download = `${firstName(profile?.name ?? "birth")}-birth-chart.png`;
			a.href = canvas.toDataURL("image/png");
			a.click();
		};
		img.src = "data:image/svg+xml;base64," + svg64;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-gold/30 bg-gradient-to-br from-surface to-surface-2 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-bold text-gold-gradient",
					children: "Your Birth Chart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Lagna: ",
						chart.ascendant,
						" Ascendant"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: download,
					className: "flex items-center gap-1.5 rounded-full border border-gold/40 bg-saffron/15 px-3 py-2 text-xs font-semibold text-gold active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Save"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full max-w-[320px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					ref: svgRef,
					viewBox: `0 0 ${S} ${S}`,
					className: "h-auto w-full",
					xmlns: "http://www.w3.org/2000/svg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "0",
							y: "0",
							width: S,
							height: S,
							fill: "#0B0C10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							stroke: "#D4AF37",
							strokeWidth: "1.4",
							fill: "none",
							opacity: "0.85",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "2",
									y: "2",
									width: S - 4,
									height: S - 4
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "2",
									y1: "2",
									x2: S - 2,
									y2: S - 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: S - 2,
									y1: "2",
									x2: "2",
									y2: S - 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: `${S / 2},2 ${S - 2},${S / 2} ${S / 2},${S - 2} 2,${S / 2}` })
							]
						}),
						chart.houses.map((h, i) => {
							const [x, y] = POS[i];
							const sign = signForHouse(chart.ascIndex, i + 1);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								textAnchor: "middle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x,
									y: y - 6,
									fill: "#FF9933",
									fontSize: "9",
									fontWeight: "700",
									children: sign.slice(0, 3)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x,
									y: y + 9,
									fill: "#F5EFE0",
									fontSize: "11",
									fontWeight: "600",
									children: h.planets.map((p) => p.key).join(" ") || "—"
								})]
							}, i);
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-[11px] text-muted-foreground",
				children: "North-Indian style · Su Sun · Mo Moon · Ma Mars · Me Mercury · Ju Jupiter · Ve Venus · Sa Saturn · Ra/Ke Nodes"
			})
		]
	});
}
function GuruChat() {
	const { profile, chatHistory, saveChatHistory, language } = useAstro();
	const sign = (0, import_react.useMemo)(() => getSign(profile?.dob ?? ""), [profile]);
	const fn = firstName(profile?.name ?? "");
	const nak = nakshatra(profile);
	const t = dict(language);
	const rtl = isRtl(language);
	const greeting = t.greeting(fn, sign.name, nak, profile?.pob ?? "");
	const [messages, setMessages] = (0, import_react.useState)(chatHistory.length ? chatHistory : [{
		id: 1,
		role: "guru",
		text: greeting
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [typing, setTyping] = (0, import_react.useState)(false);
	const [showChart, setShowChart] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const idRef = (0, import_react.useRef)(chatHistory.length ? Math.max(...chatHistory.map((m) => m.id)) + 1 : 2);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, typing]);
	(0, import_react.useEffect)(() => {
		if (!typing) saveChatHistory(messages);
	}, [messages, typing]);
	const langRef = (0, import_react.useRef)(language);
	(0, import_react.useEffect)(() => {
		if (langRef.current === language) return;
		langRef.current = language;
		setMessages((m) => m.length <= 1 ? [{
			id: 1,
			role: "guru",
			text: greeting
		}] : [...m, {
			id: idRef.current++,
			role: "guru",
			text: greeting
		}]);
	}, [language]);
	const clearChat = () => {
		const fresh = [{
			id: 1,
			role: "guru",
			text: greeting
		}];
		idRef.current = 2;
		setMessages(fresh);
		saveChatHistory(fresh);
	};
	const reply = (q) => {
		const r = generateReply(q, {
			fn,
			sign,
			nak,
			language
		});
		setTyping(true);
		setTimeout(() => {
			setTyping(false);
			setMessages((m) => [...m, {
				id: idRef.current++,
				role: "guru",
				text: r
			}]);
		}, 1300);
	};
	const sendText = (text) => {
		const tx = text.trim();
		if (!tx) return;
		setMessages((m) => [...m, {
			id: idRef.current++,
			role: "user",
			text: tx
		}]);
		setInput("");
		reply(tx);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		dir: rtl ? "rtl" : "ltr",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-[#1a1206]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-emerald-400" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-lg font-bold text-foreground",
							children: "Guru Ji"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-xs text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" }), " Online · AI Master Astrologer"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: clearChat,
						"aria-label": "Clear chat",
						className: "flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground active:scale-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4.5 w-4.5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-surface/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowChart((s) => !s),
					className: "flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-4 w-4" }),
						" ",
						t.chartTitle,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `ms-auto h-4 w-4 transition ${showChart ? "rotate-180" : ""}` })
					]
				}), showChart && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BirthChart, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4",
				children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, { msg: m }, m.id)), typing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-saffron/15 px-4 py-3",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2 w-2 animate-bounce rounded-full bg-gold",
						style: { animationDelay: `${i * .15}s` }
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2 pt-1",
				children: t.chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => sendText(c),
					className: "shrink-0 rounded-full border border-gold/40 bg-surface px-4 py-2 text-sm font-medium text-gold active:scale-95",
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-t border-border bg-surface px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && sendText(input),
					placeholder: t.placeholder,
					className: "h-12 flex-1 rounded-full border border-input bg-surface-2 px-4 text-base text-foreground outline-none focus:border-gold"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => sendText(input),
					className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold text-[#1a1206] active:scale-95",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" })
				})]
			})
		]
	});
}
function Bubble({ msg }) {
	const isGuru = msg.role === "guru";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex ${isGuru ? "justify-start" : "justify-end"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${isGuru ? "rounded-bl-md bg-saffron/15 text-foreground" : "rounded-br-md bg-surface-2 text-foreground"}`,
			children: msg.text
		})
	});
}
var KEYWORDS = {
	career: [
		"career",
		"wealth",
		"money",
		"job",
		"करियर",
		"धन",
		"नौकरी",
		"कर्म",
		"কর্ম",
		"সম্পদ",
		"தொழில்",
		"செல்வம்",
		"వృత్తి",
		"సంపద",
		"करिअर",
		"કારકિર્દી",
		"ವೃತ್ತಿ",
		"കരിയർ",
		"ਕਰੀਅਰ",
		"کیریئر",
		"دولت",
		"କ୍ୟାରିଅର"
	],
	love: [
		"marriage",
		"love",
		"relationship",
		"partner",
		"विवाह",
		"प्रेम",
		"प्यार",
		"বিবাহ",
		"প্রেম",
		"திருமணம்",
		"காதல்",
		"వివాహం",
		"ప్రేమ",
		"લગ્ન",
		"ವಿವಾಹ",
		"ಪ್ರೇಮ",
		"വിവാഹം",
		"പ്രണയം",
		"ਵਿਆਹ",
		"ਪਿਆਰ",
		"شادی",
		"محبت",
		"ବିବାହ"
	],
	health: [
		"health",
		"body",
		"wellness",
		"स्वास्थ्य",
		"आरोग्य",
		"সুস্থ",
		"স্বাস্থ্য",
		"உடல்நலம்",
		"ఆరోగ్య",
		"આરોગ્ય",
		"ಆರೋಗ್ಯ",
		"ആരോഗ്യ",
		"ਸਿਹਤ",
		"صحت",
		"ସ୍ୱାସ୍ଥ୍ୟ"
	],
	saturn: [
		"sade sati",
		"saturn",
		"shani",
		"साढ़े साती",
		"साडेसाती",
		"शनि",
		"সাড়ে সাতি",
		"শনি",
		"சடே சதி",
		"சனி",
		"సాడే సతి",
		"శని",
		"સાડાસાતી",
		"ಸಾಡೇ ಸತಿ",
		"സാഡേ സതി",
		"ਸਾਢੇ ਸਾਤੀ",
		"ساڑھے ساتی",
		"ساڑھے",
		"ସାଢେ ସାତି"
	]
};
function match(q, list) {
	return list.some((k) => q.includes(k));
}
function generateReply(q, ctx) {
	const ql = q.toLowerCase();
	const { fn, sign, nak, language } = ctx;
	const t = dict(language);
	if (match(ql, KEYWORDS.career)) return t.career(fn, sign.ruler);
	if (match(ql, KEYWORDS.love)) return t.love(fn, sign.name);
	if (match(ql, KEYWORDS.health)) return t.health(fn, nak, sign.ruler);
	if (match(ql, KEYWORDS.saturn)) return t.saturn(sign.name);
	return t.fallback(fn, sign.name, sign.ruler);
}
var CARDS = [
	{
		id: "nadi",
		title: "Nadi Astrology",
		hindi: "नाड़ी ज्योतिष",
		desc: "Thumbprint Destiny Finder",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, {})
	},
	{
		id: "lal",
		title: "Lal Kitab",
		hindi: "लाल किताब",
		desc: "Planetary Dosha & Remedies",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, {})
	},
	{
		id: "mundane",
		title: "Mundane Astrology",
		hindi: "मेदिनी ज्योतिष",
		desc: "Global & National Predictions",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {})
	},
	{
		id: "horary",
		title: "Horary Astrology",
		hindi: "प्रश्न कुंडली",
		desc: "Instant Question Analysis",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {})
	},
	{
		id: "medical",
		title: "Medical Astrology",
		hindi: "मेडिकल एस्ट्रोलॉजी",
		desc: "Astro-Wellness & Body Mapping",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {})
	}
];
function SpecializedAstrology() {
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-y-auto no-scrollbar px-4 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold text-gold-gradient",
				children: "Specialized Methods"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 mt-1 text-sm text-muted-foreground",
				children: "Ancient sciences, decoded by AI for you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: CARDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpen(c.id),
					className: "flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left active:scale-[0.99]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-gold [&>svg]:h-6 [&>svg]:w-6",
							children: c.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate font-display text-base font-bold text-foreground",
									children: c.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs text-gold/80",
									children: c.hindi
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: c.desc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 shrink-0 text-muted-foreground" })
					]
				}, c.id))
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				title: CARDS.find((c) => c.id === open).title,
				onClose: () => setOpen(null),
				children: [
					open === "nadi" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NadiView, {}),
					open === "lal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LalKitabView, {}),
					open === "mundane" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MundaneView, {}),
					open === "horary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoraryView, {}),
					open === "medical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicalView, {})
				]
			})
		]
	});
}
function Modal({ title, children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-background animate-[fade-in_0.25s_ease-out]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between border-b border-border bg-surface px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold text-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-foreground active:scale-95",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto no-scrollbar px-4 py-5",
			children
		})]
	});
}
function NadiView() {
	const { profile } = useAstro();
	const yr = birthYear(profile?.dob ?? "");
	const fn = firstName(profile?.name ?? "");
	const [state, setState] = (0, import_react.useState)("idle");
	const scan = () => {
		setState("scanning");
		setTimeout(() => setState("done"), 2600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-5 text-sm text-muted-foreground",
		children: "Your thumb impression unlocks the ancient leaf manuscript said to be written by the sage Agastya."
	}), state !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: scan,
		disabled: state === "scanning",
		className: "relative mx-auto flex h-56 w-full max-w-xs flex-col items-center justify-center gap-4 rounded-3xl border-2 border-gold/40 bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex h-24 w-24 items-center justify-center rounded-full bg-saffron/10 ${state === "scanning" ? "animate-pulse-glow" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: `h-14 w-14 ${state === "scanning" ? "text-saffron" : "text-gold"}` })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-semibold text-foreground",
				children: state === "scanning" ? "Reading thumb impression…" : "Scan Thumbprint"
			}),
			state === "scanning" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-6 top-1/2 h-0.5 animate-bounce bg-gold/70" })
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-gold/30 bg-gradient-to-b from-surface to-surface-2 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2 text-gold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-sm font-bold uppercase tracking-widest",
					children: ["Leaf Manuscript ", yr]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-[15px] leading-relaxed text-foreground",
				children: [
					"\"He who is born in the year ",
					yr,
					", named ",
					fn,
					", carries the mark of Jupiter upon the second thumb ridge. In youth he wanders; in maturity he commands respect through knowledge.\""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"📜 ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-foreground",
							children: "Past Kanda:"
						}),
						" Karmic debt of speech, now cleared."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"🪔 ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-foreground",
							children: "Present Kanda:"
						}),
						" A door of opportunity opens within 90 days."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"✨ ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-foreground",
							children: "Remedy:"
						}),
						" Light a ghee lamp on Thursdays and feed Brahmins."
					] })
				]
			})
		]
	})] });
}
function LalKitabView() {
	const { profile } = useAstro();
	const ruler = getSign(profile?.dob ?? "").ruler;
	const rows = [
		{
			planet: "Saturn (शनि)",
			remedy: "Feed birds & donate black sesame on Saturdays"
		},
		{
			planet: "Mars (मंगल)",
			remedy: "Donate copper / sweet jaggery to a temple"
		},
		{
			planet: "Mercury (बुध)",
			remedy: "Wear green; gift books to children"
		},
		{
			planet: "Sun (सूर्य)",
			remedy: "Offer water to the rising Sun daily"
		},
		{
			planet: ruler.includes("Moon") ? "Moon (चन्द्र)" : "Venus (शुक्र)",
			remedy: "Wear white; keep silver; respect women"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-4 text-sm text-muted-foreground",
		children: [
			"Practical, low-cost remedies (सरल उपाय) tuned to the doshas detected in your chart (ruling planet: ",
			ruler,
			")."
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-2xl border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 bg-saffron/15 text-sm font-bold text-gold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3",
				children: "Afflicted Planet (ग्रह)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-l border-border px-4 py-3",
				children: "Simple Remedy (सरल उपाय)"
			})]
		}), rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `grid grid-cols-2 text-sm ${i % 2 ? "bg-surface" : "bg-surface-2"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3 font-medium text-foreground",
				children: r.planet
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-l border-border px-4 py-3 text-muted-foreground",
				children: r.remedy
			})]
		}, i))]
	})] });
}
function MundaneView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Predictions for the world, drawn from current planetary transits."
		}), [
			{
				tag: "Global",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "h-4 w-4" }),
				title: "Jupiter–Saturn square stirs markets",
				body: "Volatility expected in tech and commodities through the next transit. Long-term assets favoured over speculation."
			},
			{
				tag: "Economy",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }),
				title: "Rising powers see currency strength",
				body: "Nations under Capricorn influence consolidate trade alliances; inflation cools by the next lunar quarter."
			},
			{
				tag: "Leadership",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }),
				title: "Mars transit favours decisive leaders",
				body: "A period of bold political reform across South Asia; diplomacy outperforms confrontation."
			},
			{
				tag: "Climate",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-4 w-4" }),
				title: "Watery signs warn of monsoon shifts",
				body: "Coastal regions should prepare for irregular rainfall as the Moon waxes in Cancer."
			}
		].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex w-fit items-center gap-1.5 rounded-full bg-saffron/15 px-2.5 py-1 text-xs font-semibold text-gold",
					children: [
						f.icon,
						" ",
						f.tag
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-bold text-foreground",
					children: f.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted-foreground",
					children: f.body
				})
			]
		}, i))]
	});
}
function HoraryView() {
	const [q, setQ] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const ask = () => {
		if (!q.trim()) return;
		setLoading(true);
		setTimeout(() => {
			const now = /* @__PURE__ */ new Date();
			const signs = [
				"Aries",
				"Taurus",
				"Gemini",
				"Cancer",
				"Leo",
				"Virgo",
				"Libra",
				"Scorpio",
				"Sagittarius",
				"Capricorn",
				"Aquarius",
				"Pisces"
			];
			const asc = signs[now.getMinutes() % 12];
			const moon = signs[now.getSeconds() % 12];
			setResult({
				ts: now.toLocaleString(),
				asc,
				moon,
				verdict: now.getSeconds() % 2 === 0 ? "The signs are favourable — proceed with confidence, but act before the next full moon." : "Patience is advised. The current planetary alignment suggests waiting 11 days for clarity."
			});
			setLoading(false);
		}, 1800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 rounded-2xl border border-gold/30 bg-saffron/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-foreground",
				children: "Don't know your birth time? Ask your question now."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "A Prashna chart is cast for the exact moment you ask."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: q,
			onChange: (e) => setQ(e.target.value),
			rows: 3,
			placeholder: "e.g. Will I get the new job offer?",
			className: "w-full rounded-2xl border border-input bg-surface p-4 text-base text-foreground outline-none focus:border-gold"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: ask,
			disabled: loading,
			className: "mt-3 h-12 w-full rounded-2xl bg-gradient-to-r from-saffron to-gold font-bold text-[#1a1206] active:scale-[0.99] disabled:opacity-60",
			children: loading ? "Casting Prashna chart…" : "Cast Chart & Answer"
		}),
		result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-2xl border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: ["Chart cast for: ", result.ts]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 grid aspect-square w-48 grid-cols-3 grid-rows-3 gap-px overflow-hidden rounded-lg border border-gold/40 bg-gold/30",
					children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center bg-surface text-[10px] text-muted-foreground",
						children: i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-gold",
							children: "Asc"
						}) : i === 4 ? "♄" : i === 2 ? "☉" : i === 6 ? "☽" : "·"
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: ["Ascendant: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-foreground",
								children: result.asc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: ["Moon sign: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-foreground",
								children: result.moon
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 rounded-xl bg-saffron/10 p-3 text-[15px] leading-relaxed text-foreground",
							children: result.verdict
						})
					]
				})
			]
		})
	] });
}
function MedicalView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm text-muted-foreground",
		children: "Each planet governs a region of the body. Here is your personalized Astro-Wellness map."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: [
			{
				part: "Head & Mind",
				planet: "Moon (चन्द्र)",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-5 w-5" }),
				tip: "Meditate at dawn; reduce screen time before sleep."
			},
			{
				part: "Heart & Spine",
				planet: "Sun (सूर्य)",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" }),
				tip: "Sun salutations and cardio strengthen vitality."
			},
			{
				part: "Blood & Energy",
				planet: "Mars (मंगल)",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-5 w-5" }),
				tip: "Stay hydrated; favour iron-rich greens."
			},
			{
				part: "Digestion",
				planet: "Mercury (बुध)",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }),
				tip: "Warm water with turmeric balances digestion."
			},
			{
				part: "Joints & Bones",
				planet: "Saturn (शनि)",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5" }),
				tip: "Sesame oil massage (Abhyanga) eases stiffness."
			}
		].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 rounded-2xl border border-border bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-gold",
				children: m.icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold text-foreground",
						children: m.part
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-gold/80",
						children: ["· ", m.planet]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: ["🌿 ", m.tip]
				})]
			})]
		}, i))
	})] });
}
var clean = (t) => t.replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F]/gu, "").trim();
function savePdf(doc, filename) {
	try {
		const blob = doc.output("blob");
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 4e3);
	} catch {
		doc.save(filename);
	}
}
function ProfileView() {
	const { profile, chatHistory, reset } = useAstro();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [exportingChat, setExportingChat] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	if (!profile) return null;
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {
		initial: profile,
		onCancel: () => setEditing(false)
	});
	const sign = getSign(profile.dob);
	const nak = nakshatra(profile);
	const fmtDate = profile.dob ? new Date(profile.dob).toLocaleDateString(void 0, {
		day: "numeric",
		month: "long",
		year: "numeric"
	}) : "—";
	const exportPdf = () => {
		setExporting(true);
		setTimeout(() => {
			try {
				const doc = new E({
					unit: "pt",
					format: "a4"
				});
				const W = doc.internal.pageSize.getWidth();
				const M = 48;
				let y = 64;
				const navy = [
					11,
					12,
					16
				];
				const saffron = [
					255,
					153,
					51
				];
				const gold = [
					212,
					175,
					55
				];
				doc.setFillColor(...navy);
				doc.rect(0, 0, W, 96, "F");
				doc.setTextColor(...gold);
				doc.setFont("helvetica", "bold");
				doc.setFontSize(24);
				doc.text("AstroAI", M, 50);
				doc.setTextColor(...saffron);
				doc.setFontSize(13);
				doc.text("Personalized Vedic Astrology Report", M, 72);
				const heading = (t) => {
					if (y > 760) {
						doc.addPage();
						y = 64;
					}
					doc.setTextColor(...saffron);
					doc.setFont("helvetica", "bold");
					doc.setFontSize(14);
					doc.text(t, M, y);
					doc.setDrawColor(...gold);
					doc.line(M, y + 6, W - M, y + 6);
					y += 26;
				};
				const line = (label, value) => {
					if (y > 780) {
						doc.addPage();
						y = 64;
					}
					doc.setTextColor(60, 60, 60);
					doc.setFont("helvetica", "bold");
					doc.setFontSize(11);
					doc.text(label, M, y);
					doc.setFont("helvetica", "normal");
					doc.setTextColor(20, 20, 20);
					doc.text(value, 178, y);
					y += 20;
				};
				const para = (t) => {
					doc.setFont("helvetica", "normal");
					doc.setFontSize(11);
					doc.setTextColor(40, 40, 40);
					const wrapped = doc.splitTextToSize(t, W - M * 2);
					for (const ln of wrapped) {
						if (y > 790) {
							doc.addPage();
							y = 64;
						}
						doc.text(ln, M, y);
						y += 16;
					}
					y += 6;
				};
				y = 128;
				heading("Onboarding Summary");
				line("Full Name", profile.name || "—");
				line("Date of Birth", fmtDate);
				line("Time of Birth", profile.tob || "—");
				line("Place of Birth", profile.pob || "—");
				line("Sun Sign", `${sign.name} (${sign.element}, ${sign.ruler})`);
				line("Nakshatra", nak);
				line("Face Reading", profile.facePhoto ? "Captured & analysed" : "Not provided");
				line("Palmistry", profile.palmPhoto ? "Captured & analysed" : "Not provided");
				y += 8;
				heading("Birth Chart Placements");
				const chart = birthChart(profile);
				para(`Lagna (Ascendant): ${chart.ascendant}`);
				chart.houses.forEach((h, i) => {
					const planets = h.planets.map((p) => p.name).join(", ") || "No major planet";
					line(`House ${i + 1} · ${signForHouse(chart.ascIndex, i + 1)}`, planets);
				});
				y += 8;
				heading("Key Guru Ji Insights");
				const guruMsgs = chatHistory.filter((m) => m.role === "guru");
				if (guruMsgs.length <= 1) para("No conversation recorded yet. Chat with Guru Ji to populate personalized insights here.");
				else guruMsgs.slice(-6).forEach((m, i) => {
					para(`${i + 1}. ${m.text.replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF]/gu, "").trim()}`);
				});
				doc.setTextColor(150, 150, 150);
				doc.setFontSize(9);
				doc.text(`Generated ${(/* @__PURE__ */ new Date()).toLocaleString()} · AstroAI`, M, doc.internal.pageSize.getHeight() - 28);
				savePdf(doc, `${firstName(profile.name)}-astrology-report.pdf`);
			} finally {
				setExporting(false);
			}
		}, 400);
	};
	const exportTranscript = () => {
		if (chatHistory.length === 0) return;
		setExportingChat(true);
		setTimeout(() => {
			try {
				const doc = new E({
					unit: "pt",
					format: "a4"
				});
				const W = doc.internal.pageSize.getWidth();
				const H = doc.internal.pageSize.getHeight();
				const M = 48;
				let y = 128;
				doc.setFillColor(11, 12, 16);
				doc.rect(0, 0, W, 96, "F");
				doc.setTextColor(212, 175, 55);
				doc.setFont("helvetica", "bold");
				doc.setFontSize(24);
				doc.text("AstroAI", M, 50);
				doc.setTextColor(255, 153, 51);
				doc.setFontSize(13);
				doc.text("Guru Ji Chat Transcript", M, 72);
				doc.setFont("helvetica", "normal");
				doc.setFontSize(10);
				doc.setTextColor(90, 90, 90);
				doc.text(`${profile.name || "Seeker"} · ${sign.name} · ${nak} Nakshatra · Exported ${(/* @__PURE__ */ new Date()).toLocaleString()}`, M, y);
				y += 26;
				chatHistory.forEach((m) => {
					const isGuru = m.role === "guru";
					const label = isGuru ? "Guru Ji" : "You";
					if (y > H - 80) {
						doc.addPage();
						y = 64;
					}
					doc.setFont("helvetica", "bold");
					doc.setFontSize(11);
					if (isGuru) doc.setTextColor(200, 110, 20);
					else doc.setTextColor(70, 70, 70);
					doc.text(label, M, y);
					y += 15;
					doc.setFont("helvetica", "normal");
					doc.setFontSize(11);
					doc.setTextColor(25, 25, 25);
					const wrapped = doc.splitTextToSize(clean(m.text) || "—", W - M * 2 - 12);
					for (const ln of wrapped) {
						if (y > H - 60) {
							doc.addPage();
							y = 64;
						}
						doc.text(ln, 60, y);
						y += 15;
					}
					y += 10;
				});
				savePdf(doc, `${firstName(profile.name)}-guru-ji-transcript.pdf`);
			} finally {
				setExportingChat(false);
			}
		}, 400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-y-auto no-scrollbar px-4 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold text-gold-gradient",
				children: "Your Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 mt-1 text-sm text-muted-foreground",
				children: "Saved birth details & cosmic charts."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-5 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-surface to-surface-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "absolute -right-3 -top-3 h-20 w-20 text-gold/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-gold text-2xl font-bold text-[#1a1206] font-display",
							children: firstName(profile.name).charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate font-display text-xl font-bold text-foreground",
								children: profile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-gold",
								children: [
									sign.name,
									" · ",
									nak,
									" Nakshatra"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sign.element }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Ruler: ", sign.ruler] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setEditing(true),
								className: "ml-auto flex items-center gap-1.5 rounded-full border border-gold/40 bg-saffron/15 px-3 py-1.5 text-xs font-semibold text-gold active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" }),
						label: "Full Name",
						value: profile.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5" }),
						label: "Date of Birth",
						value: fmtDate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" }),
						label: "Time of Birth",
						value: profile.tob || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
						label: "Place of Birth",
						value: profile.pob || "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 font-display text-base font-bold text-foreground",
				children: "Uploaded Readings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoCard, {
					label: "Face Reading",
					photo: profile.facePhoto
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoCard, {
					label: "Palm (Hast Rekha)",
					photo: profile.palmPhoto
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: exportPdf,
				disabled: exporting,
				className: "mb-3 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-gold py-3.5 font-semibold text-[#1a1206] active:scale-[0.99] disabled:opacity-70",
				children: exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5 animate-spin" }), " Generating Report…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-5 w-5" }), " Export PDF Astrology Report"] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: exportTranscript,
				disabled: exportingChat || chatHistory.length === 0,
				className: "mb-1 flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-saffron/10 py-3.5 font-semibold text-gold active:scale-[0.99] disabled:opacity-50",
				children: exportingChat ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5 animate-spin" }), " Preparing Transcript…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "h-5 w-5" }), " Download Chat Transcript"] })
			}),
			chatHistory.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center text-xs text-muted-foreground",
				children: "Chat with Guru Ji first to enable transcript download."
			}),
			chatHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-3" }),
			!confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setConfirm(true),
				className: "flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 py-3.5 font-semibold text-destructive active:scale-[0.99]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5" }), " Reset App / Clear Data"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-destructive/40 bg-destructive/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-foreground",
					children: "This clears your profile and logs you out. Continue?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setConfirm(false),
						className: "h-11 flex-1 rounded-xl bg-surface-2 font-semibold text-foreground",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: reset,
						className: "h-11 flex-1 rounded-xl bg-destructive font-semibold text-destructive-foreground",
						children: "Clear & Restart"
					})]
				})]
			})
		]
	});
}
function Badge({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-saffron/15 px-3 py-1 text-xs font-semibold text-gold",
		children
	});
}
function DetailRow({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-gold",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate font-medium text-foreground",
				children: value
			})]
		})]
	});
}
function PhotoCard({ label, photo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex aspect-square items-center justify-center bg-surface-2",
			children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: label,
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-muted-foreground/40" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 py-2 text-center text-xs font-medium text-muted-foreground",
			children: label
		})]
	});
}
var TABS = [
	{
		id: "guru",
		label: "Guru Ji",
		icon: MessageCircle
	},
	{
		id: "methods",
		label: "Astrology",
		icon: Sparkles
	},
	{
		id: "profile",
		label: "Profile",
		icon: User
	}
];
function MainApp() {
	const [tab, setTab] = (0, import_react.useState)("guru");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "min-h-0 flex-1",
			children: [
				tab === "guru" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuruChat, {}),
				tab === "methods" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecializedAstrology, {}),
				tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileView, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex shrink-0 items-stretch border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur",
			children: TABS.map((t) => {
				const active = tab === t.id;
				const Icon = t.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t.id),
					className: "flex flex-1 flex-col items-center gap-1 py-2.5 transition active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `flex h-9 w-14 items-center justify-center rounded-full transition ${active ? "bg-saffron/15 text-gold" : "text-muted-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-5 w-5",
							strokeWidth: active ? 2.4 : 1.8
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[11px] font-medium ${active ? "text-gold" : "text-muted-foreground"}`,
						children: t.label
					})]
				}, t.id);
			})
		})]
	});
}
function Gate() {
	const { isAuthed, profile } = useAstro();
	if (!isAuthed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashScreen, {});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainApp, {});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AstroProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {}) });
//#endregion
export { SplitComponent as component };
