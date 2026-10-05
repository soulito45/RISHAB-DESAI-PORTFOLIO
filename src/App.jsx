import { useEffect, useState } from 'react';

const skills = [
  ['01', 'Security Tools', ['Nmap', 'Nuclei', 'OpenVAS', 'Dalfox', 'Wireshark', 'Maltego', 'Netcat']],
  ['02', 'Networking & Security', ['Vulnerability Assessment', 'Port Scanning', 'Network Monitoring', 'Web App Security Testing', 'Network Fundamentals']],
  ['03', 'Languages & Platforms', ['Python', 'SQL', 'Linux', 'Windows']],
  ['04', 'Currently Expanding', ['Microsoft Azure', 'Linux Kernel Fundamentals', 'Technical Documentation', 'Incident Reporting', 'GitHub']],
];

const projects = [
  {
    categories: ['cybersecurity', 'automation', 'development'],
    tag: 'Cybersecurity · Attack Surface',
    title: 'RYNEX — External Attack Surface Intelligence & Risk Monitoring Platform',
    description: 'Built a monitoring platform for authorized domains, automating discovery, service enumeration, technology detection, vulnerability identification, and risk scoring.',
    impact: 'Reduced manual review time by 40%.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Nmap', 'HTTPX', 'Nuclei'],
  },
  {
    categories: ['networking', 'cybersecurity'],
    tag: 'Networking · Monitoring',
    title: 'Network Monitoring and Vulnerability Assessment Lab',
    description: 'Set up a Linux-based lab for host discovery, port scanning, packet inspection, and vulnerability testing across internal services.',
    impact: 'Improved visibility into exposed services and risky network paths.',
    stack: ['Linux', 'VirtualBox', 'Nmap', 'Wireshark'],
  },

];

const timeline = [
  ['July 2026 — Present', 'Cybersecurity Analyst · InterSources Inc', 'Assessed 600+ domains in 3 months using Nmap, OpenVAS, security header checks, and Dalfox to identify exposed services, vulnerabilities, and weak HTTP controls. Reported findings with evidence and remediation guidance.', ['Nmap', 'OpenVAS', 'Dalfox', 'Security Headers']],
  ['May — June 2025', 'Cybersecurity Intern · InterSources Inc', 'Gained hands-on exposure to cybersecurity tools, networking fundamentals, and Linux environments through assigned tasks, learning reconnaissance and evaluation workflows.', ['Nmap', 'Linux', 'Documentation']],
  ['Nov — Dec 2024', 'Project-Based Intern · Codex Internship', 'Contributed to practical team-based project work, improving execution discipline and collaboration under real delivery conditions.', ['Teamwork', 'Execution']],
  ['2023 — 2027 (Expected)', 'B.Sc. Information Technology (Honours)', 'Thakur College of Science and Commerce, Mumbai University. CGPA 6.70/10, currently in the final year while balancing study and hands-on security work.', ['Networking', 'Systems', 'Security']],
];

const certifications = [
  ['TryHackMe Learning Paths', 'Cybersecurity fundamentals, network security, and web exploitation.'],
  ['Microsoft Azure', 'Currently expanding into cloud security and secure platform operations.'],
  ['Linux Kernel Fundamentals', 'Building a deeper understanding of Linux internals and system behavior.'],
];

const learningTools = ['Azure', 'Linux internals', 'Threat analysis', 'Web security', 'Automation'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filter]);

  const visibleProjects = filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>

      <header className="nav">
        <div className="nav-pill">
          <a href="#home" className="logo">RD<span className="logo-dot">.</span></a>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks" aria-label="Primary navigation">
            {['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
                {item[0].toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          <div className="nav-end">
            <a href="#contact" className="nav-cta">Hire me</a>
            <button
              className={`nav-toggle ${menuOpen ? 'open' : ''}`}
              id="navToggle"
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="navLinks"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy" data-reveal>
              <p className="status-chip">
                <span className="status-dot" aria-hidden="true" />
                Cybersecurity · Network Security · Vulnerability Assessment
              </p>
              <p className="hero-kicker">Portfolio / Security Operations</p>
              <p className="eyebrow">I am</p>
              <h1 className="hero-title">Rishab <span className="accent">Desai</span></h1>
              <p className="hero-role">Cybersecurity Analyst &amp; B.Sc. IT Student</p>
              <p className="hero-microcopy">Focused on security exposure, web application testing, and clear risk reporting.</p>
              <p className="hero-desc">
                Cybersecurity Analyst at InterSources Inc with hands-on experience assessing authorized domains,
                triaging vulnerabilities, and building practical security tooling.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">View selected work</a>
                <a href="#contact" className="btn btn-secondary">Let&apos;s talk</a>
              </div>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="hero-photo-wrap">
                <picture className="hero-picture">
                  <source srcSet="/assets/rishab.webp" type="image/webp" />
                  <img src="/assets/rishab.webp" alt="Portrait of Rishab Desai, cybersecurity analyst" className="hero-photo" width="1000" height="750" fetchPriority="high" decoding="async" />
                </picture>
              </div>
            </div>
          </div>

          <div className="proof-strip" data-reveal>
            <div className="proof-item"><strong>3+</strong><span>years learning</span></div>
            <div className="proof-item"><strong>600+</strong><span>domains assessed</span></div>
            <div className="proof-item"><strong>10+</strong><span>tools in workflow</span></div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-inner about-grid">
            <div className="about-visual" data-reveal>
              <div className="terminal">
                <div className="terminal-bar">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                  <span className="terminal-title">scan_report.sh</span>
                </div>
                <div className="terminal-body">
                  <p><span className="prompt">rishab@sec:~$</span> nmap -sV target.local</p>
                  <p>Starting scan... target resolved</p>
                  <p>22/tcp open ssh</p>
                  <p>443/tcp open https</p>
                  <p>[+] scan complete</p>
                </div>
              </div>
            </div>

            <div className="about-copy" data-reveal>
              <p className="section-eyebrow">01 — About</p>
              <h2 className="section-title">Who I am</h2>
              <p className="about-lead">
                I&apos;m a Cybersecurity Analyst at InterSources Inc and a final-year B.Sc. IT (Honours) student,
                focused on vulnerability assessment, network security, and web application security testing.
              </p>
              <p className="about-sub">
                I assess authorized domains using tools like Nmap, OpenVAS, security header checks, and Dalfox,
                report findings with evidence, and build practical security automation to reduce manual review time.
              </p>
              <div className="about-links">
                <a href="#projects">Explore selected projects <span aria-hidden="true">↗</span></a>
                <a href="#skills">Browse security skills <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="section-inner">
            <p className="section-eyebrow center">02 — Technical Arsenal</p>
            <h2 className="section-title center">Skills &amp; Tools</h2>
            <div className="skills-grid">
              {skills.map(([index, title, items]) => (
                <article className="skill-cat" data-reveal key={title}>
                  <div className="skill-cat-head">
                    <span className="skill-cat-index">{index}</span>
                    <h3>{title}</h3>
                  </div>
                  <ul className="skill-list">
                    {items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section-inner">
            <p className="section-eyebrow center">03 — Selected Work</p>
            <h2 className="section-title center">My Projects</h2>

            <div className="filter-bar" role="toolbar" aria-label="Filter projects">
              {['all', 'cybersecurity', 'networking', 'automation', 'development'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-btn ${filter === item ? 'active' : ''}`}
                  data-filter={item}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" data-reveal key={project.title}>
                  <div className="project-thumb" aria-hidden="true" />
                  <div className="project-body">
                    <span className="project-tag">{project.tag}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="project-impact">{project.impact}</p>
                    <div className="project-stack">
                      {project.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience" id="experience">
          <div className="section-inner">
            <p className="section-eyebrow center">04 — Timeline</p>
            <h2 className="section-title center">Experience &amp; Education</h2>
            <div className="timeline">
              {timeline.map(([date, title, description, tags]) => (
                <div className="timeline-item" data-reveal key={title}>
                  <span className="timeline-date">{date}</span>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="timeline-tags">
                      {tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="certs" id="certifications">
          <div className="section-inner">
            <p className="section-eyebrow center">05 — Learning Path</p>
            <h2 className="section-title center">Learning &amp; Certifications</h2>
            <div className="certs-grid">
              {certifications.map(([title, description]) => (
                <article className="cert-card" data-reveal key={title}>
                  <div className="cert-icon" aria-hidden="true">◆</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <div className="learning-row" data-reveal>
              <span className="learning-label">Currently learning / tools</span>
              <div className="learning-tags">
                {learningTools.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-inner contact-inner">
            <p className="section-eyebrow center">06 — Get In Touch</p>
            <h2 className="contact-title">Let&apos;s build something secure.</h2>
            <p className="contact-sub">
              I&apos;m open to cybersecurity analyst and security-focused opportunities where I can contribute consistent
              scanning experience, reporting discipline, and practical tool-building.
            </p>
            <div className="contact-cta">
              <a href="mailto:rishabdesai105@gmail.com" className="btn btn-primary">Email me</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-inner footer-inner">
          <span>© 2026 Rishab Desai. Built with intent.</span>
          <div className="footer-links">
            <a href="#home">Back to top</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;