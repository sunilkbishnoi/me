import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunil Bishnoi — Aspiring Cybersecurity Student" },
      {
        name: "description",
        content:
          "Interactive resume of Sunil Bishnoi — Cybersecurity Intern at iSecurify (Allianz Cloud), B.Tech CSE at ITM (SLS) Baroda University.",
      },
      { property: "og:title", content: "Sunil Bishnoi — Cybersecurity" },
      {
        property: "og:description",
        content: "Aspiring cybersecurity student & intern. SIEM, VAPT, endpoint security.",
      },
    ],
  }),
  component: ResumePage,
});

/* ---------- DATA ---------- */

const CONTACT: Array<[string, string, string?]> = [
  ["PHONE", "+91 96870 55205", "tel:+919687055205"],
  ["EMAIL", "sunilkbishno83@gmail.com", "mailto:sunilkbishno83@gmail.com"],
  ["WORK", "contact@sunilbishnoi.in", "mailto:contact@sunilbishnoi.in"],
  ["SITE", "sunilbishnoi.in", "https://sunilbishnoi.in"],
  ["LINKEDIN", "in/sunilkbishnoi", "https://www.linkedin.com/in/sunilkbishnoi"],
  ["TRYHACKME", "p/sunilbishnoi", "https://tryhackme.com/p/sunilbishnoi"],
];

const EDUCATION = [
  {
    years: "2023 — 2027",
    title: "B.TECH · COMPUTER SCIENCE & ENGINEERING (CSN)",
    place: "ITM (SLS) Baroda University",
    detail: "CGPA 8.23",
  },
  {
    years: "2020 — 2022",
    title: "HIGHER SECONDARY · CLASS 11–12 · SCIENCE · GSEB",
    place: "SSV School 2",
    detail: "12th Result 68%",
  },
  {
    years: "—— 2020",
    title: "SECONDARY · CLASS 6–10 · GSEB",
    place: "Shree Narayana International School",
    detail: "10th Result 82%",
  },
];

const SKILLS = [
  ["SIEM", "Monitoring · log correlation · alerting"],
  ["VAPT", "Vulnerability assessment & pen-test workflows"],
  ["ENDPOINT", "Endpoint hardening & detection"],
  ["INCIDENT", "Triage · containment · reporting"],
  ["NETWORK", "Traffic analysis · firewalling"],
  ["SCRIPTING", "Python · Bash automation"],
  ["DOCS", "Security process documentation"],
  ["RESEARCH", "Cybersecurity R&D support"],
];

const TOOLS = [
  "Wireshark", "Nmap", "Burp Suite", "Metasploit", "Nessus", "OpenVAS",
  "Splunk", "Wazuh", "OWASP ZAP", "Kali Linux", "TryHackMe", "Linux CLI",
  "Snort", "pfSense", "Hydra", "John the Ripper", "Aircrack-ng", "Maltego",
  "Autopsy", "Volatility", "Git", "Docker",
];

const LANGS = [
  ["EN", "English", "Professional"],
  ["HI", "Hindi", "Native"],
  ["GU", "Gujarati", "Fluent"],
];

const STATS: Array<[string, string, string]> = [
  ["08.23", "CGPA", "B.TECH · CSE"],
  ["22+", "TOOLS", "OFFENSIVE + DEFENSIVE"],
  ["100%", "FOCUS", "CYBERSECURITY TRACK"],
  ["24/7", "MODE", "ALWAYS LEARNING"],
];

const FOCUS = [
  {
    code: "01",
    title: "DEFEND",
    body: "SIEM monitoring, log correlation, threat hunting and incident response across cloud + endpoint surfaces.",
    tags: ["Splunk", "Wazuh", "EDR"],
  },
  {
    code: "02",
    title: "ATTACK",
    body: "VAPT engagements, web + network pen-testing, OWASP-driven assessments and clean reporting.",
    tags: ["Burp", "Nmap", "Metasploit"],
  },
  {
    code: "03",
    title: "AUTOMATE",
    body: "Python & Bash tooling to remove the boring parts of security ops — parsing, triage, reporting.",
    tags: ["Python", "Bash", "Linux"],
  },
  {
    code: "04",
    title: "RESEARCH",
    body: "Cybersecurity R&D support — testing controls, documenting findings, and learning out loud.",
    tags: ["R&D", "Docs", "Labs"],
  },
];

const PROJECTS = [
  {
    name: "HOME SOC LAB",
    stack: "Wazuh · Sysmon · Ubuntu · Win10",
    body: "Built a personal SOC lab: endpoint agents, log shipping, alert rules and IR playbooks for hands-on detection engineering.",
  },
  {
    name: "WEB VAPT WALKTHROUGHS",
    stack: "Burp Suite · OWASP ZAP · DVWA",
    body: "Practiced OWASP Top 10 attack chains on intentionally vulnerable apps and documented end-to-end remediation notes.",
  },
  {
    name: "NETWORK RECON TOOLKIT",
    stack: "Python · Nmap · Scapy",
    body: "Scripted recon helpers that wrap Nmap, parse outputs, and produce quick triage-ready reports.",
  },
  {
    name: "sunilbishnoi.in",
    stack: "Portfolio · Writeups · CTF Notes",
    body: "Personal site for write-ups, TryHackMe progress and learning logs — security in public.",
  },
];

const CERTS = [
  ["GOOGLE CYBERSECURITY", "Coursera · In Progress"],
  ["TRYHACKME PATHS", "Pre Security · SOC Level 1"],
  ["LINUX FUNDAMENTALS", "Self-paced labs"],
  ["NETWORK SECURITY", "University coursework"],
];

const ACHIEVEMENTS = [
  "Selected for on-site cybersecurity internship at iSecurify (Allianz Cloud) during B.Tech.",
  "Consistent 8.23 CGPA while running parallel security labs & TryHackMe rooms.",
  "Maintains active TryHackMe profile and personal portfolio shipping security write-ups.",
  "Comfortable across both blue-team (SIEM, IR) and red-team (VAPT) workflows.",
];

/* ---------- HOOKS ---------- */

function useTyping(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = w.slice(0, text.length + 1);
        setText(next);
        if (next === w) setTimeout(() => setDel(true), pause);
      } else {
        const next = w.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => p + 1);
        }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

/* ---------- WIREFRAME HERO BG ---------- */

function WireframeBG({ mx, my }: { mx: number; my: number }) {
  // animated SVG wireframe terrain
  const ref = useRef<SVGSVGElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cols = 28;
  const rows = 18;
  const w = 1200;
  const h = 600;
  const cellW = w / cols;
  const cellH = h / rows;

  const pts: { x: number; y: number }[][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: { x: number; y: number }[] = [];
    for (let c = 0; c <= cols; c++) {
      const baseX = c * cellW;
      const baseY = r * cellH;
      // perspective: rows closer to bottom are larger
      const persp = 0.25 + (r / rows) * 0.9;
      const cx = w / 2 + (baseX - w / 2) * persp;
      const cy = h * 0.35 + (baseY - h * 0.5) * persp;
      // wave displacement
      const wave =
        Math.sin(c * 0.45 + t * 0.9) * 10 * persp +
        Math.cos(r * 0.35 + t * 0.7 + c * 0.1) * 14 * persp;
      // mouse parallax
      const px = (mx - 0.5) * 30 * persp;
      const py = (my - 0.5) * 20 * persp;
      row.push({ x: cx + px, y: cy + wave + py });
    }
    pts.push(row);
  }

  const lines: string[] = [];
  for (let r = 0; r <= rows; r++) {
    let d = "";
    for (let c = 0; c <= cols; c++) {
      const p = pts[r][c];
      d += (c === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1) + " ";
    }
    lines.push(d);
  }
  for (let c = 0; c <= cols; c++) {
    let d = "";
    for (let r = 0; r <= rows; r++) {
      const p = pts[r][c];
      d += (r === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1) + " ";
    }
    lines.push(d);
  }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="fade" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <mask id="m">
          <rect width={w} height={h} fill="url(#fade)" />
        </mask>
      </defs>
      <g mask="url(#m)" fill="none" stroke="#9aa6b2" strokeWidth="0.6">
        {lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- COMPONENT ---------- */

function ResumePage() {
  const typed = useTyping([
    "ASPIRING CYBERSECURITY STUDENT.",
    "SOC ANALYST IN TRAINING.",
    "VAPT // SIEM // ENDPOINT.",
    "BUILDING A SECURE FUTURE.",
  ]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [exporting, setExporting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const node = receiptRef.current;
      if (!node) return;
      document.body.classList.add("pdf-capturing");
      await new Promise((r) => setTimeout(r, 50));
      const canvas = await html2canvas(node, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        windowWidth: 900,
      });
      document.body.classList.remove("pdf-capturing");
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgW, imgH, undefined, "FAST");
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgW, imgH, undefined, "FAST");
        heightLeft -= pageH;
      }
      pdf.save("Sunil-Bishnoi-Resume.pdf");
    } catch (e) {
      console.error("PDF export failed", e);
      window.print();
    } finally {
      setExporting(false);
    }
  };

  const scrollToReceipt = () => {
    document.getElementById("receipt")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen bg-black text-white antialiased"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setMouse({
          x: (e.clientX - r.left) / r.width,
          y: (e.clientY - r.top) / r.height,
        });
      }}
    >
      {/* TOP NAV */}
      <nav className="no-print fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between">
          <div
            className="text-[11px] tracking-[0.25em] text-white/70"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            SB / RESUME_V1
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black pl-4 pr-3 py-2 text-[12px] sm:text-[13px] font-medium hover:bg-white/90 transition disabled:opacity-60 disabled:cursor-wait"
          >
            <span style={{ fontFamily: "JetBrains Mono, monospace" }}>
              {exporting ? "GENERATING…" : "EXPORT PDF"}
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
              <Download className={`w-3 h-3 ${exporting ? "animate-bounce" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <WireframeBG mx={mouse.x} my={mouse.y} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.06), transparent 60%)`,
            }}
          />
        </div>

        {/* corner labels */}
        <div
          className="no-print absolute top-24 right-5 sm:right-10 text-[10px] tracking-[0.3em] text-white/60"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          01. WHOAMI ————
        </div>
        <div
          className="no-print absolute bottom-10 left-5 sm:left-10 text-[10px] tracking-[0.3em] text-white/50"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          ◢ SCROLL FOR RESUME
        </div>

        <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 pt-32 pb-24 text-center">
          <div
            className="text-[10px] sm:text-[11px] tracking-[0.4em] text-white/60 mb-6"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            — SUNIL BISHNOI · VADODARA, IN —
          </div>

          <h1 className="leading-[0.9] text-white">
            <span
              className="block italic font-normal text-[13vw] sm:text-[9vw] md:text-[7.5vw]"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Sunil
            </span>
            <span className="block text-[11vw] sm:text-[7.5vw] md:text-[6.5vw] font-extrabold tracking-tight">
              Bishnoi{" "}
              <span className="text-white/40 font-light italic" style={{ fontFamily: "Instrument Serif, serif" }}>
                — Resume
              </span>
            </span>
          </h1>

          <div
            className="mt-8 h-6 text-[11px] sm:text-xs tracking-[0.3em] text-white/70"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <span className="text-white/40">{">"}</span> {typed}
            <span className="ml-1 inline-block w-2 h-3.5 align-middle bg-white animate-pulse" />
          </div>

          <p className="mt-8 max-w-2xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed">
            Cybersecurity Intern at <span className="text-white">iSecurify</span> (Allianz Cloud Pvt. Ltd.) —
            building hands‑on experience across SIEM, VAPT, endpoint security and incident response while pursuing
            B.Tech CSE at ITM (SLS) Baroda University.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToReceipt}
              className="group inline-flex items-center gap-3 rounded-full bg-white text-black pl-5 pr-2 py-2 text-sm font-medium hover:bg-white/90 transition"
            >
              <span>Open The Resume</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:translate-x-0.5 transition">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/30"
            >
              {exporting ? "Generating…" : "Download as PDF →"}
            </button>
          </div>

          {/* HERO STATS STRIP */}
          <div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {STATS.map(([n, k, sub]) => (
              <div key={k} className="bg-black/60 p-5 sm:p-6 text-left">
                <div className="text-[10px] tracking-[0.3em] text-white/40">{k}</div>
                <div
                  className="mt-2 text-3xl sm:text-4xl font-extrabold text-white"
                  style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}
                >
                  {n}
                </div>
                <div className="mt-1 text-[10px] tracking-[0.25em] text-white/50">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <section className="no-print relative border-y border-white/10 bg-black overflow-hidden">
        <div
          className="flex gap-10 py-5 whitespace-nowrap animate-[marquee_40s_linear_infinite] text-[12px] tracking-[0.35em] text-white/50"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {[...TOOLS, ...TOOLS, ...TOOLS].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              {t.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      {/* FOCUS / WHAT I DO */}
      <section className="no-print relative bg-black px-5 sm:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div
                className="text-[10px] tracking-[0.4em] text-white/50"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                — 02. FOCUS AREAS
              </div>
              <h2
                className="mt-3 text-4xl sm:text-6xl leading-[0.95] text-white"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                <span className="italic text-white/60">how i </span>
                <span className="font-medium">spend my hours.</span>
              </h2>
            </div>
            <div
              className="text-[11px] tracking-[0.3em] text-white/40 max-w-xs"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              FOUR DOMAINS · ONE GOAL —<br />SHIP SECURE SYSTEMS.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {FOCUS.map((f) => (
              <div
                key={f.code}
                className="group bg-black p-6 sm:p-7 hover:bg-white hover:text-black transition-colors duration-300"
              >
                <div
                  className="flex items-center justify-between text-[10px] tracking-[0.35em] text-white/40 group-hover:text-black/50"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  <span>{f.code}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div
                  className="mt-6 text-2xl font-extrabold tracking-tight"
                  style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 500 }}
                >
                  {f.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/65 group-hover:text-black/75 transition">
                  {f.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-[0.2em] border border-white/20 group-hover:border-black/30 px-2 py-1"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOW / STATUS */}
      <section className="no-print relative bg-black px-5 sm:px-8 pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 p-8 sm:p-10 bg-gradient-to-br from-white/[0.04] to-transparent">
            <div
              className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-white/50"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              CURRENTLY · LIVE STATUS
            </div>
            <h3
              className="mt-5 text-3xl sm:text-5xl leading-[1.05] text-white"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Interning at <span className="italic text-white/70">iSecurify</span> —
              learning the craft of <span className="italic">defending real systems.</span>
            </h3>
            <p className="mt-5 text-white/60 leading-relaxed max-w-2xl">
              On-site at Allianz Cloud Pvt. Ltd., Vadodara. Splitting time between SIEM dashboards,
              VAPT engagements, endpoint hygiene and writing things down so the next analyst doesn't have to guess.
            </p>
          </div>
          <div
            className="rounded-2xl border border-white/10 p-8 bg-black"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <div className="text-[10px] tracking-[0.35em] text-white/40">WHAT'S NEXT</div>
            <ul className="mt-5 space-y-3 text-[12px] tracking-wider text-white/75">
              {["GOOGLE CYBERSECURITY CERT", "OSCP PREP PATH", "CTF · CAPTURE THE FLAG", "SOC L1 → L2 ROADMAP"].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="text-emerald-400">▸</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* RECEIPT SECTION */}
      <section
        id="receipt"
        className="relative bg-black py-20 sm:py-28 px-4 sm:px-8"
      >
        {/* faint backdrop pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            ref={receiptRef}
            className="receipt relative bg-white text-black"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {/* perforated top edge */}
            <PerforatedEdge position="top" />

            <div className="px-7 sm:px-12 pt-12 pb-10">
              {/* header */}
              <div className="text-center">
                <div className="text-[10px] tracking-[0.35em] text-black/60">
                  RESUME # SB_V1 · {today}
                </div>
                <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight">
                  SUNIL BISHNOI
                </h2>
                <div className="mt-3 text-[11px] tracking-[0.35em] text-black/70">
                  ASPIRING CYBERSECURITY STUDENT
                </div>
                <div className="mt-2 text-[10px] tracking-[0.3em] text-black/50">
                  ISSUED: {today} · LOCATION: VADODARA, IN
                </div>
              </div>

              {/* divider */}
              <Divider label="// CONTACT" />

              <DocBox>
                {CONTACT.map(([k, v, href]) => (
                  <Row key={k} k={`[${k}]`}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="hover:underline inline-flex items-center gap-1 break-all"
                      >
                        {v}
                        {href.startsWith("http") && <ArrowUpRight className="w-3 h-3 shrink-0" />}
                      </a>
                    ) : (
                      v
                    )}
                  </Row>
                ))}
              </DocBox>

              <Divider label="// EXPERIENCE" />

              <DocBox title="CURRENT_ROLE">
                <Row k="[ROLE]">Cybersecurity Intern</Row>
                <Row k="[ORG]">
                  iSecurify · under{" "}
                  <a
                    href="https://allianzcloud.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted inline-flex items-center gap-1"
                  >
                    Allianz Cloud Pvt. Ltd. <ArrowUpRight className="w-3 h-3" />
                  </a>
                </Row>
                <Row k="[SITE]">Vadodara · On-Site</Row>
                <Row k="[MODE]">Active · Learning + Delivery</Row>
                <div className="mt-4 pl-1 space-y-1.5 text-[12px] leading-relaxed text-black/80">
                  {[
                    "Security monitoring & incident handling",
                    "Vulnerability assessment & reporting",
                    "Documentation of IT / security processes",
                    "Cybersecurity research & R&D support",
                    "Hands-on with SIEM platforms",
                    "VAPT tools & endpoint security",
                  ].map((it) => (
                    <div key={it} className="flex gap-2">
                      <span className="text-black/50">›</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </DocBox>

              <Divider label="// EDUCATION" />

              <div className="space-y-3">
                {EDUCATION.map((e) => (
                  <div
                    key={e.title}
                    className="border border-black rounded-md p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-[10px] tracking-[0.3em] text-black/60">
                        {e.years}
                      </div>
                      <div className="text-[11px] font-bold tracking-wider">
                        {e.detail}
                      </div>
                    </div>
                    <div className="mt-2 text-[13px] font-bold tracking-wide">
                      {e.title}
                    </div>
                    <div className="text-[12px] text-black/70 mt-0.5">
                      {e.place}
                    </div>
                  </div>
                ))}
              </div>

              <Divider label="// SKILLS" />

              <DocBox title="CORE_COMPETENCIES">
                {SKILLS.map(([k, v]) => (
                  <Row key={k} k={`[${k}]`}>{v}</Row>
                ))}
              </DocBox>

              <Divider label="// TOOLS & PRACTICES" />

              <div className="flex flex-wrap gap-1.5">
                {TOOLS.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 border border-black text-[11px] tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Divider label="// LANGUAGES" />

              <DocBox>
                {LANGS.map(([code, name, lvl]) => (
                  <Row key={code} k={`[${code}]`}>
                    <span className="font-bold">{name}</span>
                    <span className="text-black/60"> — {lvl}</span>
                  </Row>
                ))}
              </DocBox>

              <Divider label="// PROJECTS & LABS" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECTS.map((p) => (
                  <div key={p.name} className="border border-black rounded-md p-4">
                    <div className="text-[12px] font-bold tracking-wider">{p.name}</div>
                    <div className="mt-1 text-[10px] tracking-[0.25em] text-black/60">
                      {p.stack}
                    </div>
                    <div className="mt-3 text-[12px] leading-relaxed text-black/80">
                      {p.body}
                    </div>
                  </div>
                ))}
              </div>

              <Divider label="// CERTIFICATIONS & LEARNING" />

              <DocBox>
                {CERTS.map(([k, v]) => (
                  <Row key={k} k={`[${k.slice(0, 12)}]`}>
                    <span className="font-bold">{k}</span>
                    <span className="text-black/60"> — {v}</span>
                  </Row>
                ))}
              </DocBox>

              <Divider label="// HIGHLIGHTS" />

              <div className="space-y-2">
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} className="flex gap-3 text-[12px] leading-relaxed text-black/85">
                    <span className="text-black/50 shrink-0">[0{i + 1}]</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>

              <Divider label="// MISSION" />

              <div className="border border-black rounded-md p-5 bg-black text-white">
                <div className="text-[10px] tracking-[0.35em] text-white/50">// STATEMENT</div>
                <p className="mt-3 text-[13px] leading-relaxed">
                  To grow into a sharp, dependable cybersecurity engineer — one who can defend, attack
                  and document with equal confidence. Less noise, more signal. Build safer systems and
                  help others do the same.
                </p>
              </div>


              {/* barcode */}
              <div className="mt-12 flex justify-center">
                <Barcode />
              </div>
              <div className="mt-4 text-center text-[10px] tracking-[0.3em] text-black/50">
                * THIS IS A LIVING DOCUMENT. ALWAYS LEARNING. ALWAYS SHIPPING.
              </div>
              <div className="mt-2 text-center text-[9px] tracking-[0.35em] text-black/40">
                © {new Date().getFullYear()} SUNIL BISHNOI · ALL RIGHTS RESERVED
              </div>
            </div>

            <PerforatedEdge position="bottom" />
          </div>

          {/* receipt shadow */}
          <div className="absolute -inset-4 -z-10 bg-white/5 blur-2xl rounded-3xl" />
        </div>

        <footer
          className="no-print mt-16 text-center text-[10px] tracking-[0.35em] text-white/40"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          // END_OF_FILE — BUILT WITH SECURE INTENT
        </footer>
      </section>

      <style>{`
        .receipt {
          box-shadow:
            0 30px 80px -20px rgba(255,255,255,0.08),
            0 10px 30px -10px rgba(0,0,0,0.6);
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }


        /* PDF capture: hide overlay UI */
        body.pdf-capturing .no-print { display: none !important; }
        body.pdf-capturing * { animation: none !important; transition: none !important; }

        @media print {
          @page { size: A4; margin: 0; }
          html, body { background: #ffffff !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
          .receipt { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ---------- RECEIPT PRIMITIVES ---------- */

function PerforatedEdge({ position }: { position: "top" | "bottom" }) {
  // zig-zag edge using SVG
  const flip = position === "bottom";
  return (
    <svg
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      className="block w-full h-3 text-white"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden
    >
      <polygon
        points="0,6 2,0 4,6 6,0 8,6 10,0 12,6 14,0 16,6 18,0 20,6 22,0 24,6 26,0 28,6 30,0 32,6 34,0 36,6 38,0 40,6 42,0 44,6 46,0 48,6 50,0 52,6 54,0 56,6 58,0 60,6 62,0 64,6 66,0 68,6 70,0 72,6 74,0 76,6 78,0 80,6 82,0 84,6 86,0 88,6 90,0 92,6 94,0 96,6 98,0 100,6"
        fill="white"
      />
    </svg>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="my-7 flex items-center gap-3">
      <span className="text-[10px] tracking-[0.35em] text-black/60 whitespace-nowrap">
        {label}
      </span>
      <span
        className="flex-1 h-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #000 0 4px, transparent 4px 8px)",
        }}
      />
    </div>
  );
}

function DocBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="relative border border-black rounded-md p-4 sm:p-5">
      {title && (
        <span className="absolute -top-2 left-3 bg-white px-2 text-[9px] tracking-[0.35em] text-black/70">
          {title}
        </span>
      )}
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-[12px] leading-relaxed">
      <span className="shrink-0 text-black/60 w-[100px]">{k}</span>
      <span className="flex-1 break-words">{children}</span>
    </div>
  );
}

function Barcode() {
  // pseudo barcode
  const bars = Array.from({ length: 50 }, (_, i) => {
    const w = (i * 9301 + 49297) % 233280;
    return ((w / 233280) * 4 + 1) | 0;
  });
  return (
    <div className="text-center">
      <div className="flex items-end gap-[2px] h-12 justify-center">
        {bars.map((w, i) => (
          <span
            key={i}
            className="bg-black"
            style={{ width: `${w}px`, height: "100%" }}
          />
        ))}
      </div>
      <div className="mt-2 text-[10px] tracking-[0.4em] text-black/70">
        SB · 9687055205 · CSN
      </div>
    </div>
  );
}
