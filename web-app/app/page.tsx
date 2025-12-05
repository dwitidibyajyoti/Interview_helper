"use client";

import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMessage("Submitting...");

    const res = await fetch("/api/interest", {
      method: "POST",
      body: JSON.stringify({ email, price, currency }),
    });

    if (res.ok) {
      setMessage("Thank you! You’re now on the early-access list.");
      setEmail("");
      setPrice("");
      setCurrency("USD");
      setTimeout(() => setOpen(false), 1500);
    } else {
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* NAV */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-[#00ff9d] to-[#a78bfa] bg-clip-text text-transparent">
          HiddenHelper
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-lg hover:opacity-90 transition"
        >
          Register Interest
        </button>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Your AI Coding Assistant That Stays{" "}
          <span className="bg-gradient-to-r from-[#00ff9d] to-[#a78bfa] bg-clip-text text-transparent">
            Invisible During Screen Share.
          </span>
        </h2>

        <p className="mt-5 text-gray-400 max-w-3xl mx-auto text-lg">
          HiddenHelper is a desktop AI assistant designed for developers who
          work in interviews, live coding sessions, client demos, pair
          programming, and public streams — moments where being caught using AI
          could be embarrassing, unprofessional, or against the rules.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-8 px-8 py-4 bg-[#00ff9d] text-black font-semibold text-lg rounded-xl hover:opacity-90 transition shadow-[0_0_20px_#00ff9d50]"
        >
          Join Early Access
        </button>

        <p className="mt-3 text-sm text-gray-500">
          Global launch · Works on Windows, macOS & Linux
        </p>
      </section>

      {/* ABOUT THE PRODUCT */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-semibold mb-6">
          What is HiddenHelper?
        </h3>
        <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
          HiddenHelper is a lightweight AI coding assistant that sits beside
          your editor (VS Code, JetBrains, Cursor, Neovim, terminal, etc.) and
          provides intelligent help — without ever appearing on screen share.
          It’s built for real-world developer workflows, where you might need AI
          assistance but don’t want others to see prompts, completions, or tool
          windows.
          <br /><br />
          Whether you're interviewing, presenting, teaching, pair-programming,
          troubleshooting production issues, or streaming live to hundreds of
          viewers, HiddenHelper allows you to work faster and cleaner — privately.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-semibold text-center mb-12">
          Key Features Designed for Developers
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Invisible During Screen Share"
            accent="#00ff9d"
            description="HiddenHelper’s window cannot be captured by Zoom, Google Meet, Teams, Discord, OBS, or OS-level share APIs."
          />

          <FeatureCard
            title="Works Beside Any Editor"
            accent="#a78bfa"
            description="No plugins required. HiddenHelper floats next to your editor while staying out of the shared feed."
          />

          <FeatureCard
            title="Instant Hotkey Toggle"
            accent="#00ff9d"
            description="Hide or reveal the assistant instantly using Ctrl + Shift + H, no matter which app is focused."
          />

          <FeatureCard
            title="Privacy First, Offline Support"
            accent="#a78bfa"
            description="Your prompts stay on your device. Local-model-friendly and offline-first after initial setup."
          />

          <FeatureCard
            title="Zero-Lag AI Experience"
            accent="#00ff9d"
            description="Optimized for interviews and real-time coding scenarios where latency matters."
          />

          <FeatureCard
            title="Global Developer Ready"
            accent="#a78bfa"
            description="Supports multiple languages, frameworks, and workflows. Built for devs everywhere."
          />
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-semibold text-center mb-10">
          Perfect For These Scenarios
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-gray-300 text-sm">
          <UseCase title="Technical Interviews" />
          <UseCase title="Pair Programming" />
          <UseCase title="Live Coding Streams" />
          <UseCase title="Client Demos & Reviews" />
          <UseCase title="Teaching & Workshops" />
          <UseCase title="High-Stakes Debugging Sessions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <button
          onClick={() => setOpen(true)}
          className="px-8 py-4 bg-[#00ff9d] text-black text-lg font-semibold rounded-xl hover:opacity-90 transition shadow-[0_0_25px_#00ff9d70]"
        >
          Register Interest for Global Launch
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} HiddenHelper — Global Early Access
      </footer>

      {/* MODAL FORM */}
      {open && (
        <Modal
          email={email}
          setEmail={setEmail}
          price={price}
          setPrice={setPrice}
          currency={currency}
          setCurrency={setCurrency}
          message={message}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

/* --- COMPONENTS --- */

function FeatureCard({ title, description, accent }: any) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h4
        className="text-lg font-semibold mb-2"
        style={{ color: accent }}
      >
        {title}
      </h4>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}

function UseCase({ title }: any) {
  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-center">
      {title}
    </div>
  );
}

function Modal({
  email,
  setEmail,
  price,
  setPrice,
  currency,
  setCurrency,
  message,
  setOpen,
  handleSubmit,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Join the Early Access List
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              What pricing feels fair to you?
            </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00ff9d] text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-300">{message}</p>
        )}

        <button
          className="mt-4 text-gray-400 text-sm underline w-full text-center"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
