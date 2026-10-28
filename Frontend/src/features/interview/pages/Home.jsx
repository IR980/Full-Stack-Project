
import React, { useRef, useState } from "react";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!resume) {
      setError("Please upload your resume in PDF format.");
      return;
    }

    if (!jobDescription.trim() || !selfDescription.trim()) {
      setError("Please complete all fields before continuing.");
      return;
    }

    // Connect your backend API here.
    console.log({
      jobDescription,
      selfDescription,
      resume,
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3z"
              />
              <path
                strokeLinecap="round"
                d="M19 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"
              />
            </svg>
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            AI-Powered Career Preparation
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            AI Interview Report Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Upload your resume, describe yourself, and add your target job
            description to build a personalized interview preparation plan.
          </p>
        </header>

        {/* Main Form Card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
        >
          <div className="border-b border-slate-100 px-6 py-6 sm:px-10">
            <h2 className="text-xl font-bold text-slate-900">
              Create Your Interview Report
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Complete the three sections below to get started.
            </p>
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            {/* Job Description */}
            <section>
              <label
                htmlFor="jobDescription"
                className="mb-3 block text-sm font-semibold text-slate-800"
              >
                Job Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                name="jobDescription"
                id="jobDescription"
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here, including responsibilities, required skills, and qualifications..."
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <p className="mt-2 text-xs text-slate-500">
                Tip: Include the complete job description for a more relevant
                assessment.
              </p>
            </section>

            {/* Resume Upload */}
            <section>
              <label className="mb-3 block text-sm font-semibold text-slate-800">
                Upload Resume
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) {
                    setResume(null);
                    return;
                  }

                  if (
                    file.type !== "application/pdf" &&
                    !file.name.toLowerCase().endsWith(".pdf")
                  ) {
                    setResume(null);
                    setError("Please select a PDF file.");
                    e.target.value = "";
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    setResume(null);
                    setError("Your resume must be smaller than 5 MB.");
                    e.target.value = "";
                    return;
                  }

                  setError("");
                  setResume(file);
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition group-hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16V4m0 0L7 9m5-5l5 5M5 16v3a1 1 0 001 1h12a1 1 0 001-1v-3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  {resume ? "Choose another resume" : "Click to upload your resume"}
                </span>

                <span className="mt-2 text-xs text-slate-500">
                  PDF format only · Maximum file size 5 MB
                </span>
              </button>

              {resume && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 3h7l5 5v12a1 1 0 01-1 1H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3v6h5M8 14h8M8 17h6"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {resume.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {(resume.size / 1024).toFixed(1)} KB · Ready to upload
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setResume(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              )}
            </section>

            {/* Self Description */}
            <section>
              <label
                htmlFor="selfDescription"
                className="mb-3 block text-sm font-semibold text-slate-800"
              >
                Self Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                name="selfDescription"
                id="selfDescription"
                rows={5}
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Describe your skills, experience, projects, strengths, achievements, and career goals..."
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <p className="mt-2 text-xs text-slate-500">
                Highlight your most relevant skills and projects.
              </p>
            </section>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.99]"
            >
              Generate Interview Report
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-7-7l7 7-7 7"
                />
              </svg>
            </button>

            <p className="text-center text-xs leading-5 text-slate-500">
              Your resume and information will be processed to generate your
              personalized report.
            </p>
          </div>
        </form>

        {/* Feature Cards */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Match Score",
              description: "Understand how your profile aligns with the role.",
              icon: "01",
            },
            {
              title: "Interview Questions",
              description: "Prepare technical and behavioral answers.",
              icon: "02",
            },
            {
              title: "Preparation Plan",
              description: "Follow a practical day-wise learning roadmap.",
              icon: "03",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-sm font-extrabold tracking-wider text-indigo-600">
                {item.icon}
              </span>
              <h3 className="mt-3 font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-10 text-center text-sm text-slate-500">
          AI Interview Report Generator · Prepare smarter, interview confidently.
        </footer>
      </div>
    </main>
  );
};

export default Home;
