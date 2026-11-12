import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, ArrowRight, ArrowUpRight, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunil Bishnoi — Cybersecurity & Infrastructure" },
      {
        name: "description",
        content:
          "Interactive resume of Sunil Bishnoi — Networking, data center and IAM professional at IndianOil Gujarat Refinery, learning cloud security.",
      },
      { property: "og:title", content: "Sunil Bishnoi — Cybersecurity" },
      {
        property: "og:description",
        content:
          "Networking, data center and IAM professional at IndianOil Gujarat Refinery, learning cloud security.",
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
    title: "B.Tech · Computer Science & Engineering",
    place: "ITM (SLS) Baroda University",
    detail: "CGPA 8.23",
  },
  {
    years: "2020 — 2022",
    title: "Higher Secondary · Science · GSEB",
    place: "SSV School 2",
    detail: "12th Result 68%",
  },
  {
    years: "2020",
    title: "Secondary Education · GSEB",
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
  "Wireshark",
  "Nmap",
  "Burp Suite",
  "Metasploit",
  "Nessus",
  "OpenVAS",
  "Splunk",
  "Wazuh",
  "OWASP ZAP",
  "Kali Linux",
  "TryHackMe",
  "Linux CLI",
  "Snort",
  "pfSense",
  "Hydra",
  "John the Ripper",
  "Aircrack-ng",
  "Maltego",
  "Autopsy",
  "Volatility",
  "Git",
  "Docker",
];

const LANGS = [
  ["EN", "English", "Professional"],
  ["HI", "Hindi", "Native"],
  ["GU", "Gujarati", "Fluent"],
];

const STATS: Array<[string, string, string]> = [
  ["NOW", "ROLE", "INDIANOIL · GUJARAT REFINERY"],
  ["03", "DOMAINS", "NETWORK · DATA CENTER · IAM"],
  ["08.23", "CGPA", "B.TECH · CSE"],
  ["22+", "TOOLS", "OFFENSIVE + DEFENSIVE"],
];

const FOCUS = [
  {
    code: "01",
    title: "DEFEND",
    body: "Building skills in alert review, log analysis, and incident response across endpoint and cloud environments.",
    tags: ["Splunk", "Wazuh", "EDR"],
  },
  {
    code: "02",
    title: "ATTACK",
    body: "Learning web and network testing in authorized labs, following OWASP guidance, and writing clear remediation notes.",
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
    name: "Home SOC lab",
    category: "Detection",
    stack: "Wazuh · Sysmon · Ubuntu · Windows 10",
    body: "A personal security operations lab with endpoint agents, log shipping, alert rules, and incident-response playbooks for hands-on detection engineering.",
  },
  {
    name: "Web security walkthroughs",
    category: "App security",
    stack: "Burp Suite · OWASP ZAP · DVWA",
    body: "Practice assessments on intentionally vulnerable apps, with end-to-end notes that explain the issue and how to remediate it.",
  },
  {
    name: "Network recon toolkit",
    category: "Automation",
    stack: "Python · Nmap · Scapy",
    body: "Small Python helpers that organize reconnaissance output into concise, triage-ready reports.",
  },
  {
    name: "Security learning journal",
    category: "Writing",
    stack: "sunilbishnoi.in · Write-ups · CTF notes",
    body: "A home for practical write-ups, TryHackMe progress, and notes from learning security in public.",
  },
];

const PROJECT_FILTERS = ["All work", "Detection", "App security", "Automation", "Writing"];

const CERTS = [
  ["GOOGLE CYBERSECURITY", "Coursera · In Progress"],
  ["TRYHACKME PATHS", "Pre Security · SOC Level 1"],
  ["LINUX FUNDAMENTALS", "Self-paced labs"],
  ["NETWORK SECURITY", "University coursework"],
];

const ACHIEVEMENTS = [
  "Currently working at IndianOil Corporation Limited, Gujarat Refinery, across networking, data center operations and IAM.",
  "Completed a cybersecurity internship at iSecurify (Allianz Cloud) during B.Tech.",
  "Consistent 8.23 CGPA while running parallel security labs & TryHackMe rooms.",
  "Maintains active TryHackMe profile and personal portfolio shipping security write-ups.",
  "Comfortable across both blue-team (SIEM, IR) and red-team (VAPT) workflows.",
];

/* ---------- HOOKS ---------- */

const TYPING_WORDS = [
  "Cybersecurity & infrastructure",
  "Networking, data center & IAM",
  "Learning cloud security",
  "Building a secure future",
];

function useTyping(words: string[], speed = 75, pause = 1500) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }

    const word = words[i % words.length];
    const complete = text === word;
    const empty = text.length === 0;
    const timer = window.setTimeout(
      () => {
        if (complete && !deleting) {
          setDeleting(true);
        } else if (deleting && empty) {
          setDeleting(false);
          setI((current) => current + 1);
        } else {
          setText(word.slice(0, text.length + (deleting ? -1 : 1)));
        }
      },
      complete && !deleting ? pause : deleting ? speed / 2 : speed,
    );

    return () => window.clearTimeout(timer);
  }, [deleting, i, pause, speed, text, words]);

  return text;
}

/* ---------- WIREFRAME HERO BACKGROUND ---------- */

function createWireframePaths() {
  const columns = 28;
  const rows = 18;
  const width = 1200;
  const height = 600;
  const points: { x: number; y: number }[][] = [];

  for (let row = 0; row <= rows; row++) {
    const line = [];
    for (let column = 0; column <= columns; column++) {
      const perspective = 0.25 + (row / rows) * 0.9;
      const x = width / 2 + (column * (width / columns) - width / 2) * perspective;
      const baseY = height * 0.35 + (row * (height / rows) - height * 0.5) * perspective;
      const wave =
        Math.sin(column * 0.45) * 8 * perspective +
        Math.cos(row * 0.35 + column * 0.1) * 10 * perspective;
      line.push({ x, y: baseY + wave });
    }
    points.push(line);
  }

  const paths = [];
  for (let row = 0; row <= rows; row++) {
    paths.push(
      points[row]
        .map(
          (point, column) =>
            `${column === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
        )
        .join(" "),
    );
  }
  for (let column = 0; column <= columns; column++) {
    paths.push(
      points
        .map(
          (row, index) =>
            `${index === 0 ? "M" : "L"}${row[column].x.toFixed(1)} ${row[column].y.toFixed(1)}`,
        )
        .join(" "),
    );
  }
  return paths;
}

const WIREFRAME_PATHS = createWireframePaths();

function WireframeBG() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wireframe-fade" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <mask id="wireframe-mask">
          <rect width="1200" height="600" fill="url(#wireframe-fade)" />
        </mask>
      </defs>
      <g mask="url(#wireframe-mask)" fill="none" stroke="#9aa6b2" strokeWidth="0.6">
        {WIREFRAME_PATHS.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- COMPONENT ---------- */

function TypingLine() {
  const typed = useTyping(TYPING_WORDS);
  return (
    <div
      className="mt-8 h-6 text-[11px] tracking-[0.3em] text-white/70 sm:text-xs"
      style={{ fontFamily: "JetBrains Mono, monospace" }}
    >
      <span className="text-white/40" aria-hidden="true">
        {">"}
      </span>{" "}
      <span>{typed}</span>
      <span
        className="ml-1 inline-block h-3.5 w-2 animate-pulse align-middle bg-white"
        aria-hidden="true"
      />
    </div>
  );
}

function ResumePage() {
  const [projectFilter, setProjectFilter] = useState("All work");
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const visibleProjects =
    projectFilter === "All work"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === projectFilter);

  const scrollToResume = () => {
    document.getElementById("resume")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen bg-black text-white antialiased"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      {/* TOP NAV */}
      <nav
        aria-label="Main navigation"
        className="no-print fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="text-[11px] tracking-[0.2em] text-white/80 hover:text-white"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            SUNIL BISHNOI
          </a>
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="#projects"
              className="hidden sm:inline text-sm text-white/65 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#resume"
              className="hidden sm:inline text-sm text-white/65 hover:text-white transition-colors"
            >
              Resume
            </a>
            <a
              href="mailto:contact@sunilbishnoi.in"
              className="hidden sm:inline text-sm text-white/65 hover:text-white transition-colors"
            >
              Contact
            </a>
            <button
              onClick={() => window.print()}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-black pl-4 pr-2 py-1.5 text-[12px] font-medium hover:bg-white/90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Print / Save PDF</span>
              <span className="inline-flex items-center justify-center size-7 rounded-full bg-black text-white">
                <Download className="size-3" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <header id="top" className="relative overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0">
            <WireframeBG />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
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
                <span
                  className="text-white/40 font-light italic"
                  style={{ fontFamily: "Instrument Serif, serif" }}
                >
                  — Resume
                </span>
              </span>
            </h1>

            <TypingLine />

            <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed">
              I work at the intersection of networks, data centers, and identity. At{" "}
              <span className="text-white"> IndianOil&apos;s Gujarat Refinery</span>, I help keep
              infrastructure running while growing my cybersecurity skills through hands-on labs and
              a B.Tech in Computer Science at ITM (SLS) Baroda University.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToResume}
                className="group inline-flex items-center gap-3 rounded-full bg-white text-black pl-5 pr-2 py-2 text-sm font-medium hover:bg-white/90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Explore my experience</span>
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-black text-white group-hover:translate-x-0.5 transition">
                  <ArrowRight className="size-4" />
                </span>
              </button>
              <a
                href="mailto:contact@sunilbishnoi.in"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/30"
              >
                <Mail className="size-4" /> Say hello
              </a>
            </div>

            {/* HERO STATS STRIP */}
            <div
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {STATS.map(([n, k, sub]) => (
                <div
                  key={k}
                  className="bg-black/60 p-5 sm:p-6 text-left hover:bg-white/[0.06] transition-colors"
                >
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
        <section
          aria-hidden="true"
          className="no-print relative border-y border-white/10 bg-black overflow-hidden"
        >
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
        <section id="focus" className="no-print relative bg-black px-5 sm:px-8 py-24 scroll-mt-20">
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
                  <span className="italic text-white/60">How I </span>
                  <span className="font-medium">like to work.</span>
                </h2>
              </div>
              <div
                className="text-[11px] tracking-[0.3em] text-white/40 max-w-xs"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                FOUR DOMAINS · ONE GOAL —<br />
                SHIP SECURE SYSTEMS.
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
                    style={{
                      fontFamily: "Instrument Serif, serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
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

        {/* SELECTED PROJECTS */}
        <section
          id="projects"
          className="no-print relative bg-black px-5 sm:px-8 pb-24 scroll-mt-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className="text-[10px] tracking-[0.35em] text-white/45"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  A FEW THINGS I&apos;VE BEEN WORKING ON
                </p>
                <h2
                  className="mt-3 text-4xl sm:text-5xl text-white"
                  style={{ fontFamily: "Instrument Serif, serif" }}
                >
                  Learning by <span className="italic text-white/60">making.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
                {PROJECT_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={projectFilter === filter}
                    onClick={() => setProjectFilter(filter)}
                    className={`rounded-full border px-3 py-2 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${projectFilter === filter ? "border-white bg-white text-black" : "border-white/20 text-white/65 hover:border-white/50 hover:text-white"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div aria-live="polite" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleProjects.map((project) => (
                <article
                  key={project.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.045]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-medium text-white">{project.name}</h3>
                    <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/55">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/65">
                    {project.body}
                  </p>
                  <p className="mt-5 text-xs text-white/45">{project.stack}</p>
                </article>
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
                Working at <span className="italic text-white/70">IndianOil</span>, supporting
                infrastructure across{" "}
                <span className="italic">networks, data centers and IAM.</span>
              </h3>
              <p className="mt-5 text-white/60 leading-relaxed max-w-2xl">
                My day-to-day work spans networking, data center operations, and identity and access
                management. Outside work, I&apos;m building cloud security skills through labs and
                study.
              </p>
            </div>
            <div
              className="rounded-2xl border border-white/10 p-8 bg-black"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              <div className="text-[10px] tracking-[0.35em] text-white/40">ON MY LEARNING LIST</div>
              <ul className="mt-5 space-y-3 text-[12px] tracking-wider text-white/75">
                {[
                  "Google Cybersecurity Certificate",
                  "OSCP preparation",
                  "Capture-the-flag practice",
                  "SOC L1 to L2 learning path",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="text-emerald-400">▸</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* RESUME */}
        <section id="resume" className="relative bg-black py-20 sm:py-28 px-4 sm:px-8 scroll-mt-16">
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
            <article
              id="resume-document"
              className="resume-paper relative bg-white text-slate-900"
              style={{ fontFamily: "Inter, Arial, sans-serif" }}
            >
              <div className="px-7 py-10 sm:px-12 sm:py-12">
                <header className="resume-header border-b border-slate-200 pb-7 text-center">
                  <p className="text-[10px] font-medium tracking-[0.25em] text-slate-500">
                    SUNIL BISHNOI · VADODARA, GUJARAT
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Sunil Bishnoi
                  </h2>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    Cybersecurity · Networking · Data Center · IAM
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Resume updated {today}</p>
                </header>

                <section className="resume-section py-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    A little about me
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    I&apos;m a computer science student and infrastructure professional with
                    experience across networking, data center operations, and identity and access
                    management. I enjoy understanding how systems fit together, documenting what I
                    learn, and building practical security skills through hands-on labs.
                  </p>
                </section>

                <Divider label="CONTACT" />

                <DocBox>
                  {CONTACT.map(([k, v, href]) => (
                    <Row key={k} k={k.toLowerCase()}>
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

                <Divider label="EXPERIENCE" />

                <DocBox title="CURRENT_ROLE">
                  <Row k="[ROLE]">Network · Data Center · IAM</Row>
                  <Row k="[ORG]">IndianOil Corporation Limited</Row>
                  <Row k="[SITE]">Gujarat Refinery · India</Row>
                  <Row k="[MODE]">Current · Infrastructure + Security</Row>
                  <Row k="[TRACK]">Cloud security · Learning in progress</Row>
                  <div className="mt-4 pl-1 space-y-1.5 text-[12px] leading-relaxed text-black/80">
                    {[
                      "Network operations and infrastructure support",
                      "Data center operations and availability",
                      "Identity and access management (IAM)",
                      "Learning cloud security practices",
                    ].map((it) => (
                      <div key={it} className="flex gap-2">
                        <span className="text-black/50">›</span>
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </DocBox>

                <DocBox title="PREVIOUS_ROLE">
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
                  <Row k="[MODE]">Completed · Internship</Row>
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

                <Divider label="EDUCATION" />

                <div className="space-y-3">
                  {EDUCATION.map((e) => (
                    <div key={e.title} className="border border-black rounded-md p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-[10px] tracking-[0.3em] text-black/60">{e.years}</div>
                        <div className="text-[11px] font-bold tracking-wider">{e.detail}</div>
                      </div>
                      <div className="mt-2 text-[13px] font-bold tracking-wide">{e.title}</div>
                      <div className="text-[12px] text-black/70 mt-0.5">{e.place}</div>
                    </div>
                  ))}
                </div>

                <Divider label="SKILLS" />

                <DocBox title="CORE_COMPETENCIES">
                  {SKILLS.map(([k, v]) => (
                    <Row key={k} k={`[${k}]`}>
                      {v}
                    </Row>
                  ))}
                </DocBox>

                <Divider label="TOOLS & PRACTICES" />

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

                <Divider label="LANGUAGES" />

                <DocBox>
                  {LANGS.map(([code, name, lvl]) => (
                    <Row key={code} k={`[${code}]`}>
                      <span className="font-bold">{name}</span>
                      <span className="text-black/60"> — {lvl}</span>
                    </Row>
                  ))}
                </DocBox>

                <Divider label="SELECTED PROJECTS" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECTS.map((p) => (
                    <div key={p.name} className="border border-black rounded-md p-4">
                      <div className="text-[12px] font-bold tracking-wider">{p.name}</div>
                      <div className="mt-1 text-[10px] tracking-[0.25em] text-black/60">
                        {p.stack}
                      </div>
                      <div className="mt-3 text-[12px] leading-relaxed text-black/80">{p.body}</div>
                    </div>
                  ))}
                </div>

                <Divider label="CERTIFICATIONS & LEARNING" />

                <DocBox>
                  {CERTS.map(([k, v]) => (
                    <Row key={k} k={`[${k.slice(0, 12)}]`}>
                      <span className="font-bold">{k}</span>
                      <span className="text-black/60"> — {v}</span>
                    </Row>
                  ))}
                </DocBox>

                <Divider label="HIGHLIGHTS" />

                <div className="space-y-2">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className="flex gap-3 text-[12px] leading-relaxed text-black/85">
                      <span className="text-black/50 shrink-0">[0{i + 1}]</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>

                <Divider label="A NOTE ON WHAT I VALUE" />

                <div className="border border-black rounded-md p-5 bg-black text-white">
                  <div className="text-[10px] tracking-[0.35em] text-white/50">// STATEMENT</div>
                  <p className="mt-3 text-[13px] leading-relaxed">
                    To grow into a sharp, dependable cybersecurity engineer — one who can defend,
                    attack and document with equal confidence. Less noise, more signal. Build safer
                    systems and help others do the same.
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
                  Interested in cybersecurity, infrastructure, and learning by doing. For
                  opportunities or collaboration, reach me at contact@sunilbishnoi.in.
                </div>
              </div>
            </article>

            {/* receipt shadow */}
            <div className="absolute -inset-4 -z-10 bg-white/5 blur-2xl rounded-3xl" />
          </div>

          <footer
            className="no-print mt-16 text-center text-[10px] tracking-[0.35em] text-white/40"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // THANKS FOR READING — BUILT WITH SECURE INTENT
          </footer>
        </section>
      </main>
    </div>
  );
}
/* ---------- RESUME PRIMITIVES ---------- */

function Divider({ label }: { label: string }) {
  return (
    <h3
      className={`resume-section-heading my-6 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 ${label === "SKILLS" ? "resume-page-break" : ""}`}
    >
      {label}
    </h3>
  );
}

function DocBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="resume-section py-3">
      {title && (
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          {title.replaceAll("_", " ")}
        </h3>
      )}
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm leading-relaxed text-slate-700">
      <span className="w-24 shrink-0 capitalize text-slate-500">
        {k.replaceAll("[", "").replaceAll("]", "")}
      </span>
      <span className="min-w-0 flex-1 break-words">{children}</span>
    </div>
  );
}
