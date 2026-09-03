import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunil Bishnoi — Cybersecurity" },
      {
        name: "description",
        content:
          "Sunil Bishnoi is a cybersecurity student and intern working across SIEM, VAPT, and endpoint security.",
      },
    ],
  }),
  component: ResumePage,
});

const contacts = [
  ["Email", "sunilkbishno83@gmail.com", "mailto:sunilkbishno83@gmail.com"],
  ["Phone", "+91 96870 55205", "tel:+919687055205"],
  ["LinkedIn", "linkedin.com/in/sunilkbishnoi", "https://www.linkedin.com/in/sunilkbishnoi"],
  ["TryHackMe", "tryhackme.com/p/sunilbishnoi", "https://tryhackme.com/p/sunilbishnoi"],
] as const;

const projects = [
  {
    year: "2025",
    name: "Home SOC lab",
    description:
      "A small monitoring environment built with Wazuh, Sysmon, Ubuntu, and Windows 10. I use it to practise alert review and incident notes.",
  },
  {
    year: "2025",
    name: "Network recon toolkit",
    description:
      "Python scripts around Nmap and Scapy that turn reconnaissance output into short, readable reports.",
  },
  {
    year: "2024",
    name: "Web VAPT walkthroughs",
    description:
      "Hands-on testing with DVWA, Burp Suite, and OWASP ZAP, followed by remediation notes rather than just screenshots.",
  },
];

const skills = [
  "SIEM monitoring",
  "Vulnerability assessment",
  "Endpoint security",
  "Incident triage",
  "Network analysis",
  "Python and Bash",
  "Technical writing",
  "Linux administration",
];
const tools = [
  "Wazuh",
  "Splunk",
  "Wireshark",
  "Nmap",
  "Burp Suite",
  "Metasploit",
  "Nessus",
  "OWASP ZAP",
  "Kali Linux",
  "Docker",
];

function ResumePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (exporting || !resumeRef.current) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      document.body.classList.add("pdf-capturing");
      const canvas = await html2canvas(resumeRef.current, {
        backgroundColor: "#f7f5ef",
        scale: 2,
        windowWidth: 900,
      });
      document.body.classList.remove("pdf-capturing");
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      let remaining = height;
      let position = 0;
      const image = canvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(image, "JPEG", 0, position, width, height, undefined, "FAST");
      remaining -= pdf.internal.pageSize.getHeight();
      while (remaining > 0) {
        position = remaining - height;
        pdf.addPage();
        pdf.addImage(image, "JPEG", 0, position, width, height, undefined, "FAST");
        remaining -= pdf.internal.pageSize.getHeight();
      }
      pdf.save("Sunil-Bishnoi-Resume.pdf");
    } catch {
      window.print();
    } finally {
      document.body.classList.remove("pdf-capturing");
      setExporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="site-nav no-print">
        <a href="#top" className="wordmark">
          SB<span>.</span>
        </a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Work
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <button className="download-button" onClick={handleExport} disabled={exporting}>
            {exporting ? "Preparing" : "Download CV"} <Download size={15} />
          </button>
        </div>
        <button
          className="menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <div ref={resumeRef} id="top">
        <header className="hero page-wrap">
          <div className="hero-note">Portfolio / 2025—26</div>
          <div className="hero-copy">
            <p className="eyebrow">Cybersecurity student · Vadodara, India</p>
            <h1>
              Learning to
              <br />
              <em>defend</em> what matters.
            </h1>
            <p className="intro">
              I&apos;m Sunil Bishnoi, a computer science student and cybersecurity intern. I like
              useful tools, clear notes, and understanding how a system behaves before it breaks.
            </p>
            <a className="text-link no-print" href="#work">
              See selected work <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-aside">
            <span>01</span>
            <p>
              Currently interning at
              <br />
              <strong>iSecurify</strong> under Allianz Cloud.
            </p>
          </div>
        </header>

        <section className="rule-section page-wrap" id="about">
          <div className="section-label">A little context</div>
          <div className="about-grid">
            <h2>
              Practical security,
              <br />
              <em>one lab at a time.</em>
            </h2>
            <div>
              <p>
                I&apos;m pursuing a B.Tech in Computer Science and Engineering at ITM (SLS) Baroda
                University, where I currently hold an 8.23 CGPA.
              </p>
              <p>
                My internship has given me a closer look at monitoring, vulnerability assessment,
                endpoint hygiene, and the less glamorous but essential work of documenting a finding
                well.
              </p>
            </div>
          </div>
        </section>

        <section className="work-section page-wrap" id="work">
          <div className="section-heading">
            <div className="section-label">Selected work</div>
            <span>Things I built to learn by doing</span>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project" key={project.name}>
                <span className="project-number">0{index + 1}</span>
                <span className="project-year">{project.year}</span>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <ArrowUpRight className="project-arrow" size={20} />
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section page-wrap">
          <div className="section-label">What I&apos;m working with</div>
          <div className="skills-grid">
            <div>
              <h2>
                Tools are only
                <br />
                <em>part of the job.</em>
              </h2>
              <p className="muted">
                The rest is asking good questions, staying curious, and leaving the next person a
                useful trail.
              </p>
            </div>
            <div className="skill-content">
              <div className="skill-list">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <div className="tool-list">
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section page-wrap" id="contact">
          <div className="section-label">Get in touch</div>
          <div className="contact-grid">
            <h2>
              Let&apos;s compare
              <br />
              <em>notes.</em>
            </h2>
            <div>
              {contacts.map(([label, value, href]) => (
                <a className="contact-row" href={href} key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <footer className="page-wrap footer">
          <span>Sunil Bishnoi</span>
          <span>Built with care, not automation.</span>
          <span>© 2025</span>
        </footer>
      </div>
    </main>
  );
}
