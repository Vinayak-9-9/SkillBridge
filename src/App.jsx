import { useMemo, useState } from "react";

const journey = [
  { label: "Foundations", state: "done" },
  { label: "Practice Projects", state: "done" },
  { label: "Portfolio Proof (24%)", state: "active" },
  { label: "Interview Ready", state: "locked" },
];

const skills = [
  { label: "React", value: 88, tone: "coral", note: "You are strongest in React. Add one certificate to turn this into full credit." },
  { label: "Portfolio Writing", value: 72, tone: "olive", note: "Your case study is drafted. Add screenshots and final reflection." },
  { label: "GitHub Proof", value: 64, tone: "orange", note: "Connect one clean repository with README, commits, and demo link." },
];

const actions = [
  {
    id: "react-certificate",
    title: "Submit React certificate",
    detail: "Upload proof for 2 credits",
    color: "coral",
  },
  {
    id: "fintech-audit",
    title: "Finish project checkpoint",
    detail: "Due this Friday",
    color: "green",
  },
  {
    id: "portfolio-study",
    title: "Publish portfolio story",
    detail: "3 artifacts waiting",
    color: "blue",
  },
];

const onboardingSteps = [
  { id: "college", label: "College profile", value: "LNCT • 3rd year", done: true },
  { id: "role", label: "Target role", value: "Frontend Developer", done: true },
  { id: "skills", label: "Starting skills", value: "React, Git, UX", done: true },
  { id: "links", label: "Proof links", value: "GitHub + certificate", done: false },
  { id: "goal", label: "Weekly goal", value: "Finish 1 portfolio story", done: false },
];

const creditRows = [
  { label: "React Component Design", state: "reviewed", proof: "Reviewed from your dashboard component work" },
  { label: "UX Research Notes", state: "pending", proof: "Mentor review queued" },
  { label: "Version Control", state: "need proof", proof: "Attach one polished GitHub repository" },
  { label: "Presentation Skills", state: "need proof", proof: "Add a short project walkthrough video" },
];

const portfolioItems = [
  { id: "react-badge", title: "React badge", detail: "Verified component design", visible: true },
  { id: "ux-story", title: "UX audit story", detail: "Draft with mentor notes", visible: true },
  { id: "github-proof", title: "GitHub proof", detail: "Repository pending cleanup", visible: false },
];

const projects = [
  {
    id: "micro-ux-audit",
    title: "Micro UX Audit",
    org: "Northstar Labs",
    duration: "3w",
    match: "96% match",
    icon: "microscope",
    brief: "A beginner-friendly audit project that can become a portfolio case study.",
  },
  {
    id: "react-bug-bash",
    title: "React Bug Bash",
    org: "Kite Analytics",
    duration: "2w",
    match: "89% match",
    icon: "bug",
    brief: "A short code task to prove debugging, commits, and documentation.",
  },
];

const initialFeed = [
  { title: "React badge earned", meta: "2 days ago" },
  { title: "Mentor note added", meta: "Yesterday" },
  { title: "GitHub proof waiting", meta: "Just now" },
];

const institutionRows = [
  { label: "Credit approval", value: "1 pending" },
  { label: "Mentor check-in", value: "Friday" },
  { label: "Placement cell note", value: "Portfolio first" },
];

function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const paths = {
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16.5 9" />
      </>
    ),
    circle: <circle cx="12" cy="12" r="8" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.8 3 8.4 7 10 4-1.6 7-5.2 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    image: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m4 16 4.5-4 3.5 3 2-2 6 5" />
      </>
    ),
    map: (
      <>
        <path d="m9 18-5 2V6l5-2 6 2 5-2v14l-5 2-6-2Z" />
        <path d="M9 4v14" />
        <path d="M15 6v14" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    microscope: (
      <>
        <path d="M7 21h10" />
        <path d="M6 18h12" />
        <path d="M10 14a5 5 0 0 0 7-7l-2-2" />
        <path d="m14 3 4 4" />
        <path d="m9 5 6 6" />
        <path d="M5 12h4" />
      </>
    ),
    bug: (
      <>
        <rect x="8" y="7" width="8" height="12" rx="4" />
        <path d="M9 7 7 4" />
        <path d="m15 7 2-3" />
        <path d="M4 13h4" />
        <path d="M16 13h4" />
        <path d="M5 18l3-2" />
        <path d="m16 16 3 2" />
        <path d="M12 7v12" />
      </>
    ),
  };

  return (
    <svg className="icon" {...common}>
      {paths[name]}
    </svg>
  );
}

function Pin({ color = "red" }) {
  return <span className={`pin ${color}`} aria-hidden="true" />;
}

function App() {
  const [completedActions, setCompletedActions] = useState(new Set());
  const [completedOnboarding, setCompletedOnboarding] = useState(
    new Set(onboardingSteps.filter((step) => step.done).map((step) => step.id)),
  );
  const [isCreditChanging, setIsCreditChanging] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [creditFilter, setCreditFilter] = useState("all");
  const [selectedCredit, setSelectedCredit] = useState(creditRows[0]);
  const [featuredArtifacts, setFeaturedArtifacts] = useState(
    new Set(portfolioItems.filter((item) => item.visible).map((item) => item.id)),
  );
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [appliedProjects, setAppliedProjects] = useState(new Set());
  const [publicArtifacts, setPublicArtifacts] = useState(8);
  const [contactSharing, setContactSharing] = useState(false);
  const [activeDock, setActiveDock] = useState("portfolio");
  const [feedItems, setFeedItems] = useState(initialFeed);
  const [boardNote, setBoardNote] = useState("Your React proof is reviewed. Finish the portfolio story next.");

  const visibleCredits = useMemo(() => {
    if (creditFilter === "verified") {
      return creditRows.filter((row) => row.state === "reviewed");
    }

    if (creditFilter === "pending") {
      return creditRows.filter((row) => row.state !== "reviewed");
    }

    return creditRows;
  }, [creditFilter]);

  const readinessScore = Math.min(9.8, 8.5 + completedActions.size * 0.2).toFixed(1);
  const onboardingProgress = Math.round((completedOnboarding.size / onboardingSteps.length) * 100);
  const pendingCount = creditRows.filter((row) => row.state !== "reviewed").length;
  const privateArtifacts = Math.max(0, 11 - publicArtifacts);

  function addFeed(title, meta = "Just now") {
    setFeedItems((items) => [{ title, meta }, ...items].slice(0, 4));
  }

  function toggleAction(action) {
    setCompletedActions((current) => {
      const next = new Set(current);
      if (next.has(action.id)) {
        next.delete(action.id);
        setBoardNote(`${action.title} reopened.`);
        addFeed("Action reopened");
      } else {
        next.add(action.id);
        setBoardNote(`${action.title} marked complete.`);
        addFeed("Student task done");
      }
      return next;
    });
  }

  function toggleOnboarding(step) {
    setCompletedOnboarding((current) => {
      const next = new Set(current);
      if (next.has(step.id)) {
        next.delete(step.id);
        setBoardNote(`${step.label} marked incomplete.`);
      } else {
        next.add(step.id);
        setBoardNote(`${step.label} completed for your student profile.`);
        addFeed("Profile updated");
      }
      return next;
    });
  }

  function changeCreditFilter(nextFilter) {
    const resolvedFilter = creditFilter === nextFilter ? "all" : nextFilter;
    setIsCreditChanging(true);
    setCreditFilter(resolvedFilter);
    setBoardNote(resolvedFilter === "verified" ? "Showing reviewed learning proof." : resolvedFilter === "pending" ? "Showing proof that still needs attention." : "Showing all learning proof.");
    window.setTimeout(() => setIsCreditChanging(false), 260);
  }

  function toggleArtifact(item) {
    setFeaturedArtifacts((current) => {
      const next = new Set(current);
      if (next.has(item.id)) {
        next.delete(item.id);
        setBoardNote(`${item.title} moved out of your featured portfolio.`);
      } else {
        next.add(item.id);
        setBoardNote(`${item.title} added to your featured portfolio.`);
        addFeed("Portfolio updated");
      }
      return next;
    });
  }

  function chooseSkill(skill) {
    setSelectedSkill(skill);
    setBoardNote(`${skill.label}: ${skill.note}`);
  }

  function chooseCredit(row) {
    setSelectedCredit(row);
    setBoardNote(`${row.label}: ${row.proof}`);
  }

  function chooseProject(project) {
    setSelectedProject(project);
    setBoardNote(`${project.title}: ${project.brief}`);
  }

  function applyToProject(project) {
    setAppliedProjects((current) => {
      const next = new Set(current);
      next.add(project.id);
      return next;
    });
    setBoardNote(`${project.title} saved to your student project plan.`);
    addFeed("Project saved");
  }

  function selectDock(nextDock) {
    setActiveDock(nextDock);
    const labels = {
      portfolio: "Your portfolio artifacts are ready to organize.",
      pathway: "Your next pathway step is Portfolio Proof.",
      messages: "No new mentor messages right now.",
    };
    setBoardNote(labels[nextDock]);
  }

  return (
    <main className="board" aria-label="SkillBridge student dashboard">
      <div className="board-grain" aria-hidden="true" />

      <header className="brand-note">
        <h1>SkillBridge</h1>
        <p>Vinayak's Student Skill Desk</p>
      </header>

      <section className="onboarding-card paper-card" aria-labelledby="onboarding-title">
        <Pin color="white" />
        <div className="card-title-row">
          <h2 id="onboarding-title">My Starter Profile</h2>
          <strong>{onboardingProgress}%</strong>
        </div>
        <div className="mini-progress" aria-label={`${onboardingProgress}% onboarding complete`}>
          <span style={{ width: `${onboardingProgress}%` }} />
        </div>
        <div className="student-profile-list">
          {onboardingSteps.map((step) => (
            <button
              className={completedOnboarding.has(step.id) ? "profile-step done" : "profile-step"}
              key={step.id}
              type="button"
              aria-pressed={completedOnboarding.has(step.id)}
              onClick={() => toggleOnboarding(step)}
            >
              <Icon name={completedOnboarding.has(step.id) ? "check" : "circle"} />
              <span>
                <b>{step.label}</b>
                <em>{step.value}</em>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="journey-card paper-card" aria-labelledby="journey-title">
        <Pin color="red" />
        <h2 id="journey-title">My Frontend Journey</h2>
        <ul>
          {journey.map((item) => (
            <li className={item.state} key={item.label}>
              <button
                type="button"
                onClick={() => setBoardNote(`${item.label}: ${item.state === "locked" ? "Complete Portfolio Proof to unlock interview prep." : "This student milestone is on track."}`)}
              >
                <Icon name={item.state === "locked" ? "lock" : item.state === "done" ? "check" : "circle"} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="stats-card paper-card" aria-labelledby="stats-title">
        <Pin color="blue" />
        <h2 id="stats-title">My Skill Growth</h2>
        <div className="rule" />
        {skills.map((skill) => (
          <button
            className={`stat-line ${selectedSkill.label === skill.label ? "selected" : ""}`}
            key={skill.label}
            type="button"
            onClick={() => chooseSkill(skill)}
          >
            <div>
              <span>{skill.label}</span>
              <b>{skill.value}%</b>
            </div>
            <div className="stat-track">
              <span className={skill.tone} style={{ width: `${skill.value}%` }} />
            </div>
          </button>
        ))}
      </section>

      <section className="score-note" aria-labelledby="score-title">
        <h2 id="score-title">{readinessScore}</h2>
        <p>Student Readiness</p>
        <span>{completedActions.size ? `${completedActions.size} student task${completedActions.size > 1 ? "s" : ""} completed today.` : "Almost there! Finish 2 artifacts to strengthen your portfolio."}</span>
      </section>

      <section className="sticky-row" aria-label="Credit summary">
        <button
          aria-pressed={creditFilter === "verified"}
          className={`sticky-note left ${creditFilter === "verified" ? "selected" : ""}`}
          type="button"
          onClick={() => changeCreditFilter("verified")}
        >
          <strong>18</strong>
          <span>My Credits</span>
        </button>
        <button
          aria-pressed={creditFilter === "pending"}
          className={`sticky-note right ${creditFilter === "pending" ? "selected" : ""}`}
          type="button"
          onClick={() => changeCreditFilter("pending")}
        >
          <strong>{pendingCount}</strong>
          <span>To Review</span>
        </button>
      </section>

      <section className="actions-card paper-card torn" aria-labelledby="actions-title">
        <h2 id="actions-title">My Week Plan</h2>
        <div className="scribble-arrow" aria-hidden="true">This Week</div>
        <ul>
          {actions.map((action) => (
            <li className={`${action.color} ${completedActions.has(action.id) ? "completed" : ""}`} key={action.id}>
              <button type="button" onClick={() => toggleAction(action)}>
                <Icon name={completedActions.has(action.id) ? "check" : "circle"} />
                <strong>{action.title}</strong>
                <span>{completedActions.has(action.id) ? "Done - click to reopen" : action.detail}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={`credits-card paper-card ${isCreditChanging ? "filtering" : ""}`} aria-labelledby="credits-title">
        <Pin color="white" />
        <div className="credits-title">
          <Icon name="shield" />
          <h2 id="credits-title">My Learning Proof</h2>
        </div>
        <div className="credit-list" key={creditFilter}>
          {visibleCredits.map((row) => (
            <button
              className={`credit-row ${row.state.replace(" ", "-")} ${selectedCredit.label === row.label ? "selected" : ""}`}
              key={row.label}
              type="button"
              onClick={() => chooseCredit(row)}
            >
              <span>{row.label}</span>
              <b>{row.state}</b>
            </button>
          ))}
        </div>
      </section>

      <section className="portfolio-card paper-card" aria-labelledby="portfolio-title">
        <Pin color="blue" />
        <div className="credits-title">
          <Icon name="image" />
          <h2 id="portfolio-title">My Portfolio Board</h2>
        </div>
        <div className="portfolio-list">
          {portfolioItems.map((item) => (
            <button
              className={featuredArtifacts.has(item.id) ? "portfolio-item visible" : "portfolio-item"}
              key={item.id}
              type="button"
              aria-pressed={featuredArtifacts.has(item.id)}
              onClick={() => toggleArtifact(item)}
            >
              <span>
                <strong>{item.title}</strong>
                <em>{item.detail}</em>
              </span>
              <b>{featuredArtifacts.has(item.id) ? "featured" : "saved"}</b>
            </button>
          ))}
        </div>
      </section>

      <section className="employer-card" aria-labelledby="employer-title">
        <Pin color="white" />
        <h2 id="employer-title">My Visibility</h2>
        <div className="chalk-line" />
        <p><span>Visible:</span> <strong>{publicArtifacts} Items</strong></p>
        <p><span>Private:</span> <strong>{privateArtifacts} Saved</strong></p>
        <div className="privacy-controls">
          <button type="button" onClick={() => setPublicArtifacts((count) => Math.max(0, count - 1))}>Hide one</button>
          <button type="button" onClick={() => setPublicArtifacts((count) => Math.min(11, count + 1))}>Show one</button>
        </div>
        <button
          aria-pressed={contactSharing}
          className={contactSharing ? "sharing-on" : ""}
          type="button"
          onClick={() => {
            setContactSharing((value) => !value);
            setBoardNote(contactSharing ? "Contact sharing turned off." : "Contact sharing turned on.");
          }}
        >
          Share Contact: {contactSharing ? "On" : "Off"}
        </button>
      </section>

      <section className="feed-card paper-card" aria-labelledby="feed-title">
        <h2 id="feed-title">My Progress Log</h2>
        {feedItems.map((item, index) => (
          <button
            className="feed-item"
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => setBoardNote(`${item.title}: ${item.meta}`)}
          >
            <strong>{item.title}</strong>
            <span>{item.meta}</span>
          </button>
        ))}
      </section>

      <section className="institution-card paper-card" aria-labelledby="institution-title">
        <Pin color="red" />
        <h2 id="institution-title">College Review</h2>
        <div className="institution-list">
          {institutionRows.map((row) => (
            <button
              className="institution-row"
              key={row.label}
              type="button"
              onClick={() => setBoardNote(`${row.label}: ${row.value}`)}
            >
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="project-row" aria-label="Recommended live projects">
        {projects.map((project) => (
          <article className={`project-card paper-card ${selectedProject.id === project.id ? "selected" : ""}`} key={project.id}>
            <button className="project-image" type="button" onClick={() => chooseProject(project)} aria-label={`Open ${project.title}`}>
              <Icon name={project.icon} />
            </button>
            <h2>{project.title}</h2>
            <p>{project.org} - {project.duration}</p>
            <strong>{project.match}</strong>
            <button
              className="project-cta"
              type="button"
              onClick={() => applyToProject(project)}
              disabled={appliedProjects.has(project.id)}
            >
              {appliedProjects.has(project.id) ? "Saved" : "Start Plan"}
            </button>
          </article>
        ))}
      </section>

      <aside className="inspector-note paper-card" aria-live="polite">
        <h2>{activeDock === "portfolio" ? "Portfolio Note" : activeDock === "pathway" ? "Pathway Note" : "Mentor Note"}</h2>
        <p>{boardNote}</p>
        <span>{selectedProject.title} - {selectedProject.match}</span>
      </aside>

      <nav className="dock" aria-label="Quick actions">
        <button aria-pressed={activeDock === "portfolio"} className={activeDock === "portfolio" ? "active" : ""} type="button" aria-label="Open my portfolio" onClick={() => selectDock("portfolio")}><Icon name="image" /></button>
        <button aria-pressed={activeDock === "pathway"} className={activeDock === "pathway" ? "active" : ""} type="button" aria-label="Open my pathway" onClick={() => selectDock("pathway")}><Icon name="map" /></button>
        <button aria-pressed={activeDock === "messages"} className={activeDock === "messages" ? "active" : ""} type="button" aria-label="Open mentor messages" onClick={() => selectDock("messages")}><Icon name="mail" /></button>
      </nav>
    </main>
  );
}

export default App;
