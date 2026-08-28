import { useEffect, useState } from 'react';

const skills = [
  ['01', 'Cybersecurity', ['Nmap', 'Nuclei', 'OpenVAS / Greenbone', 'Wireshark', 'Maltego', 'Netcat']],
  ['02', 'Programming', ['Python',  'JavaScript', 'SQL']],
  ['03', 'Networking', ['TCP/IP', 'DNS & Routing', 'Firewalls', 'Network Monitoring']],
  ['04', 'Systems', ['Linux', 'Git', 'Windows Server Basics']],
];

const projects = [
  ['cybersecurity automation', 'Cybersecurity · Automation', 'Automated Vulnerability Assessment Platform', 'Chains Nmap and Nuclei, deduplicates findings, and outputs prioritized severity-ranked reports.', ['Python', 'Nmap', 'Nuclei', 'SQL']],
  ['networking cybersecurity', 'Networking · Monitoring', 'Network Security Monitoring System', 'Flags anomalous connections and unauthorized port activity from captured traffic.', ['Python', 'Wireshark', 'Linux']],
  ['cybersecurity development', 'Cybersecurity · Development', 'Security Log Analyzer', 'Surfaces brute-force attempts and unusual login patterns from server and auth logs.', ['Python', 'SQL', 'JavaScript']],
  ['automation cybersecurity', 'Automation · Cybersecurity', 'Nmap / Nuclei Automation Framework', 'Runs recurring scans against defined asset lists and diffs results over time.', ['Python', 'Bash', 'Git']],
  ['cybersecurity development', 'Cybersecurity · Detection', 'Phishing Detection System', 'Flags suspicious URLs and email headers before they reach an inbox.', ['Python', 'JavaScript', 'SQL']],
  ['cybersecurity networking', 'Cybersecurity · Intelligence', 'Threat Intelligence Dashboard', 'Aggregates open threat feeds into a single view ranked by asset relevance.', ['Python', 'JavaScript', 'Linux']],
];

const timeline = [
  ['2023 — Present', 'BSc Information Technology', 'Coursework spanning networking, systems and databases alongside self-directed security labs.', ['Networking', 'Databases', 'Systems Design']],
  ['2024', 'Independent Security Labs', 'Built an isolated home lab for vulnerability scanning, segmentation and log analysis.', ['Nmap', 'OpenVAS', 'Linux']],
  ['2025', 'Security Tooling Projects', 'Shipped a vulnerability assessment platform and log analyzer, moving manual scans to automation.', ['Python', 'Automation', 'Git']],
  ['2026', 'Applying for Analyst Roles', 'Expanding into threat intelligence and detection tooling for entry-level analyst roles.', ['Threat Intel', 'Detection']],
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  useReveal();
  const visibleProjects = projects.filter(([categories]) => filter === 'all' || categories.split(' ').includes(filter));

  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <header className="nav">
      <div className="nav-pill">
        <a href="#home" className="logo">RD<span className="logo-dot">.</span></a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks" aria-label="Primary">
          {['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'].map((item) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item[0].toUpperCase() + item.slice(1)}</a>)}
        </nav>
        <div className="nav-end"><a href="#contact" className="nav-cta">Hire me</a><button className={`nav-toggle ${menuOpen ? 'open' : ''}`} id="navToggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="navLinks"><span /><span /><span /></button></div>
      </div>
    </header>

    <main id="main">
      <section className="hero" id="home"><div className="hero-inner">
        <div className="hero-copy" data-reveal>
          <p className="status-chip">SECURITY ANALYSIS&nbsp;&nbsp; · &nbsp;&nbsp;VULNERABILITY ASSESSMENT&nbsp;&nbsp; · &nbsp;&nbsp;AUTOMATION&nbsp;&nbsp; · &nbsp;&nbsp;NETWORKING</p>
          <p className="eyebrow">I am</p><h1 className="hero-title">Rishab<br /><span className="glitch">Desai</span></h1>
          <p className="hero-role">CYBERSECURITY ANALYST</p><p className="hero-desc">Building practical, secure systems through vulnerability assessment, security tooling, automation and networking.</p>
          <div className="hero-cta"><a href="#projects" className="btn btn-primary">View selected work</a></div>
        </div>
        <div className="hero-visual" data-reveal><div className="hero-photo-wrap"><img src="/assets/rishab.png" alt="Rishab Desai" className="hero-photo" width="340" height="400" /></div></div>
      </div></section>

      <section className="about" id="about"><div className="section-inner about-grid"><div className="about-visual" data-reveal><div className="terminal"><div className="terminal-bar"><span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" /><span className="terminal-title">scan_report.sh</span></div><div className="terminal-body"><p><span className="prompt">rishab@sec:~$</span> nmap -sV target.local</p><p>Starting scan... target resolved</p><p>22/tcp open ssh</p><p>443/tcp open https</p><p>[+] 0 critical [!] 2 medium found</p></div></div></div><div className="about-copy" data-reveal><p className="section-eyebrow">01 — About</p><h2 className="section-title">Who I am</h2><p className="about-lead">I&apos;m a BSc IT student and aspiring cybersecurity professional focused on vulnerability assessment, security tools, Linux environments and practical security solutions.</p><p className="about-sub">My approach blends structured methodology with curiosity: study the advisory, test it in a lab, then turn the lesson into something useful.</p></div></div></section>

      <section className="skills" id="skills"><div className="section-inner"><p className="section-eyebrow center">02 — Technical Arsenal</p><h2 className="section-title center">Skills &amp; Tools</h2><div className="skills-grid">{skills.map(([index, title, items]) => <article className="skill-cat grid-item" data-reveal key={title}><div className="skill-cat-head"><span className="skill-cat-index">{index}</span><h3>{title}</h3></div><ul className="skill-list">{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>

      <section className="projects" id="projects"><div className="section-inner"><p className="section-eyebrow center">03 — Selected Work</p><h2 className="section-title center">My Projects</h2><div className="filter-bar" role="toolbar" aria-label="Filter projects">{['all', 'cybersecurity', 'networking', 'automation', 'development'].map((item) => <button className={`filter-btn ${filter === item ? 'active' : ''}`} data-filter={item} key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item[0].toUpperCase() + item.slice(1)}</button>)}</div><div className="project-grid">{visibleProjects.map(([categories, tag, title, description, stack]) => <article className="project-card grid-item" data-reveal tabIndex="0" key={title}><div className="project-thumb" /><div className="project-body"><span className="project-tag">{tag}</span><h3>{title}</h3><p>{description}</p><div className="project-stack">{stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</div></div></section>

      <section className="experience" id="experience"><div className="section-inner"><p className="section-eyebrow center">04 — Timeline</p><h2 className="section-title center">Experience &amp; Education</h2><div className="timeline">{timeline.map(([date, title, description, tags]) => <div className="timeline-item" data-reveal key={title}><div className="timeline-marker" /><div className="timeline-content"><span className="timeline-date">{date}</span><h3>{title}</h3><p>{description}</p><div className="timeline-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>)}</div></div></section>

      <section className="contact" id="contact"><div className="section-inner contact-inner"><p className="section-eyebrow center">05 — Get In Touch</p><h2 className="contact-title">Let&apos;s Build Something Secure.</h2><p className="contact-sub">I&apos;m actively looking for cybersecurity analyst, security engineer and software developer opportunities.</p><div className="contact-cta"><a href="mailto:rishabdesai.sphs@gmail.com" className="btn btn-primary">Email me</a><a href="https://github.com/" className="btn btn-ghost">GitHub</a><a href="https://linkedin.com/" className="btn btn-ghost">LinkedIn</a></div></div></section>
    </main>
    <footer className="footer"><div className="section-inner footer-inner"><span>© 2026 Rishab Desai. Built with intent.</span><a href="#home" className="footer-top">Back to top</a></div></footer>
  </>;
}

export default App;
