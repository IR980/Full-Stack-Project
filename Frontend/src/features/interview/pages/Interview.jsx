
import React, { useState } from "react";

const Interview = ({ report: reportProp }) => {
  // Read the report passed by the parent or fall back to demo data.
  const report = reportProp || {
    title: "Full Stack Developer Interview",
    matchScore: 85,
    technicalQuestion: [
      {
        question: "What is the difference between React and React DOM?",
        intention: "To evaluate your understanding of React fundamentals.",
        answer:
          "React is the library for building component-based user interfaces. React DOM provides the browser-specific methods used to render React components into the DOM.",
      },
      {
        question: "How does the Node.js event loop work?",
        intention: "To assess your knowledge of asynchronous JavaScript.",
        answer:
          "The event loop coordinates execution of synchronous code and asynchronous callbacks. Node.js uses the event loop and underlying APIs to handle I/O efficiently without blocking the main JavaScript thread.",
      },
      {
        question: "What is the difference between SQL and MongoDB?",
        intention: "To assess database knowledge and data modeling.",
        answer:
          "SQL databases generally organize data into relational tables with predefined schemas. MongoDB stores documents in BSON format and supports flexible document structures.",
      },
    ],
    behavioralQuestion: [
      {
        question: "Tell me about yourself.",
        intention: "To understand your background and communication skills.",
        answer:
          "Introduce your education, relevant technical skills, key projects, and career goals. Keep your answer concise and connect your experience to the role.",
      },
      {
        question: "Describe a challenging project you worked on.",
        intention: "To evaluate problem-solving and ownership.",
        answer:
          "Explain the situation, your responsibility, the actions you took, and the measurable outcome. Use the STAR method: Situation, Task, Action, Result.",
      },
    ],
    skillGap: [
      { skill: "System Design", severity: "medium" },
      { skill: "Advanced Database Optimization", severity: "high" },
      { skill: "Automated Testing", severity: "low" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "JavaScript and React Fundamentals",
        tasks: [
          "Revise closures, promises, and async/await.",
          "Practice React hooks and component lifecycle concepts.",
          "Build a small reusable React component.",
        ],
      },
      {
        day: 2,
        focus: "Node.js and Backend Development",
        tasks: [
          "Revise REST APIs and middleware.",
          "Practice authentication and error handling.",
          "Build and test an API endpoint.",
        ],
      },
      {
        day: 3,
        focus: "Databases and System Design",
        tasks: [
          "Revise MongoDB indexes and aggregation.",
          "Practice SQL joins and query optimization.",
          "Design a simple full-stack application.",
        ],
      },
      {
        day: 4,
        focus: "Behavioral Interview Practice",
        tasks: [
          "Prepare your self-introduction.",
          "Write STAR answers for two project challenges.",
          "Practice explaining your technical decisions.",
        ],
      },
      {
        day: 5,
        focus: "Mock Interview and Revision",
        tasks: [
          "Answer technical questions aloud.",
          "Review your projects and resume.",
          "Identify weak areas and revise them.",
        ],
      },
    ],
  };

  const [activeSection, setActiveSection] = useState("overview");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

  const score = Math.min(100, Math.max(0, Number(report.matchScore) || 0));

  const sections = [
    { id: "overview", label: "Overview", icon: "◫" },
    { id: "technical", label: "Technical Questions", icon: "⌘" },
    { id: "behavioral", label: "Behavioral Questions", icon: "◎" },
    { id: "roadmap", label: "Preparation Roadmap", icon: "☷" },
  ];

  const toggleQuestion = (key) => {
    setExpandedQuestions((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const toggleTask = (key) => {
    setCompletedTasks((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-50 text-red-700 ring-red-200";
      case "medium":
        return "bg-amber-50 text-amber-700 ring-amber-200";
      default:
        return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    }
  };

  const technicalQuestions = report.technicalQuestion || [];
  const behavioralQuestions = report.behavioralQuestion || [];
  const skillGaps = report.skillGap || [];
  const roadmap = report.preparationPlan || [];

  const totalTasks = roadmap.reduce(
    (total, day) => total + (day.tasks?.length || 0),
    0
  );

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  const scrollToSection = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const QuestionCard = ({ item, index, type }) => {
    const key = `${type}-${index}`;
    const expanded = !!expandedQuestions[key];

    return (
      <article className="rounded-2xl border border-slate-200 bg-white transition hover:border-indigo-200 hover:shadow-md">
        <button
          type="button"
          onClick={() => toggleQuestion(key)}
          aria-expanded={expanded}
          className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-semibold leading-6 text-slate-900">
              {item.question}
            </span>
            <span className="mt-2 block text-sm text-slate-500">
              {expanded ? "Hide answer and interviewer intention" : "View answer and interviewer intention"}
            </span>
          </span>

          <span className="text-xl text-slate-400">
            {expanded ? "−" : "+"}
          </span>
        </button>

        {expanded && (
          <div className="space-y-4 border-t border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                Interviewer's intention
              </p>
              <p className="text-sm leading-6 text-slate-600">
                {item.intention}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                Suggested answer
              </p>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                {item.answer}
              </p>
            </div>
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-black text-white">
              AI
            </div>
            <div>
              <p className="font-extrabold tracking-tight">InterviewAI</p>
              <p className="text-xs text-slate-500">Preparation Studio</p>
            </div>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Your report
          </p>

          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === section.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm font-semibold">Stay consistent</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Small daily improvements make interview preparation more effective.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
          {/* Header */}
          <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Your personalized report
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Interview Preparation
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Review your results and prepare with confidence.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Report generated
            </span>
          </header>

          {/* Report title */}
          <section
            id="overview"
            className="mb-6 scroll-mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white sm:p-8"
          >
            <p className="text-sm font-medium text-indigo-100">
              TARGET ROLE
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {report.title || "Interview Preparation Report"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100">
              Your interview preparation guide, tailored to your resume,
              skills, and target job description.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/15 px-3 py-2 text-sm">
                {technicalQuestions.length} Technical Questions
              </span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-sm">
                {behavioralQuestions.length} Behavioral Questions
              </span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-sm">
                {roadmap.length} Preparation Days
              </span>
            </div>
          </section>

          {/* Summary cards */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Job Match Score
              </p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-extrabold">{score}%</span>
                <span className="mb-1 text-xs text-slate-500">match</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Technical Questions
              </p>
              <p className="mt-3 text-3xl font-extrabold">
                {technicalQuestions.length}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Concepts and technical skills
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Behavioral Questions
              </p>
              <p className="mt-3 text-3xl font-extrabold">
                {behavioralQuestions.length}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Communication and experience
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Roadmap Progress
              </p>
              <p className="mt-3 text-3xl font-extrabold">
                {totalTasks === 0
                  ? 0
                  : Math.round((completedCount / totalTasks) * 100)}
                %
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {completedCount} of {totalTasks} tasks completed
              </p>
            </div>
          </section>

          {/* Match score and skill gaps */}
          <section className="mb-10 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold">Your Match Score</h2>
              <p className="mt-1 text-sm text-slate-500">
                How well your profile aligns with this role.
              </p>

              <div className="mt-7 flex flex-col items-center gap-5 sm:flex-row">
                <div
                  className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#4f46e5 ${score * 3.6}deg, #e2e8f0 0deg)`,
                  }}
                  role="img"
                  aria-label={`Job match score: ${score}%`}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {score}%
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
                      Match score
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {score >= 80
                      ? "Strong profile alignment"
                      : score >= 60
                        ? "Good foundation to build on"
                        : "Focus on the key requirements"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Use the questions and roadmap below to prepare for the
                    skills required by your target role.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold">Skill Gap Analysis</h2>
              <p className="mt-1 text-sm text-slate-500">
                Skills to prioritize during your preparation.
              </p>

              <div className="mt-5 space-y-3">
                {skillGaps.length > 0 ? (
                  skillGaps.map((gap, index) => (
                    <div
                      key={`${gap.skill}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {gap.skill}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getSeverityStyle(
                          gap.severity
                        )}`}
                      >
                        {gap.severity}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                    No specific skill gaps were identified.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Technical questions */}
          <section id="technical" className="mb-10 scroll-mt-6">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  SECTION 01
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">
                  Technical Questions
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Test your technical knowledge and review suggested answers.
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                {technicalQuestions.length} questions
              </span>
            </div>

            <div className="space-y-4">
              {technicalQuestions.length > 0 ? (
                technicalQuestions.map((item, index) => (
                  <QuestionCard
                    key={`technical-${index}`}
                    item={item}
                    index={index}
                    type="technical"
                  />
                ))
              ) : (
                <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                  No technical questions are available in this report.
                </p>
              )}
            </div>
          </section>

          {/* Behavioral questions */}
          <section id="behavioral" className="mb-10 scroll-mt-6">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-violet-600">
                  SECTION 02
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">
                  Behavioral Questions
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Practice communicating your experiences and decisions.
                </p>
              </div>
              <span className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
                {behavioralQuestions.length} questions
              </span>
            </div>

            <div className="space-y-4">
              {behavioralQuestions.length > 0 ? (
                behavioralQuestions.map((item, index) => (
                  <QuestionCard
                    key={`behavioral-${index}`}
                    item={item}
                    index={index}
                    type="behavioral"
                  />
                ))
              ) : (
                <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                  No behavioral questions are available in this report.
                </p>
              )}
            </div>
          </section>

          {/* Preparation roadmap */}
          <section id="roadmap" className="mb-10 scroll-mt-6">
            <div className="mb-5">
              <p className="text-sm font-semibold text-emerald-600">
                SECTION 03
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">
                Preparation Roadmap
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Complete each task and track your preparation progress.
              </p>
            </div>

            {roadmap.length > 0 ? (
              <div className="space-y-5">
                {roadmap.map((day, dayIndex) => {
                  const dayTasks = day.tasks || [];
                  const dayCompleted = dayTasks.filter(
                    (_, taskIndex) =>
                      completedTasks[`${day.day}-${taskIndex}`]
                  ).length;

                  return (
                    <article
                      key={`${day.day}-${dayIndex}`}
                      className="relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Day
                          </span>
                          <span className="text-xl font-extrabold">
                            {day.day}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-slate-900">
                                {day.focus}
                              </h3>
                              <p className="mt-1 text-xs text-slate-500">
                                {dayCompleted} of {dayTasks.length} tasks completed
                              </p>
                            </div>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              {dayTasks.length === 0
                                ? 0
                                : Math.round(
                                    (dayCompleted / dayTasks.length) * 100
                                  )}
                              %
                            </span>
                          </div>

                          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-emerald-500 transition-all"
                              style={{
                                width: `${
                                  dayTasks.length === 0
                                    ? 0
                                    : (dayCompleted / dayTasks.length) * 100
                                }%`,
                              }}
                            />
                          </div>

                          <div className="mt-5 space-y-3">
                            {dayTasks.map((task, taskIndex) => {
                              const taskKey = `${day.day}-${taskIndex}`;
                              const checked = !!completedTasks[taskKey];

                              return (
                                <label
                                  key={taskKey}
                                  className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition hover:bg-slate-50"
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleTask(taskKey)}
                                    className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                                  />
                                  <span
                                    className={`text-sm leading-6 ${
                                      checked
                                        ? "text-slate-400 line-through"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {task}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                No preparation roadmap is available.
              </p>
            )}
          </section>

          <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            Keep practicing, track your progress, and prepare with confidence.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Interview;
