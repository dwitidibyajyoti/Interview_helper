// app/page.tsx

import ModalWrapper from "./components/modal-wrapper";

interface HomePageProps {
  searchParams: Promise<{ modal?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { modal } = await searchParams;
  const showModal = modal === "true";

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* NAV */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-[#00ff9d] to-[#a78bfa] bg-clip-text text-transparent">
          HiddenHelper
        </h1>

        <form action="/" method="get">
          <input type="hidden" name="modal" value="true" />
          <button
            type="submit"
            className="px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            Register Interest
          </button>
        </form>
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

        <form action="/" method="get">
          <input type="hidden" name="modal" value="true" />
          <button
            type="submit"
            className="hover:cursor-pointer mt-8 px-8 py-4 bg-[#00ff9d] text-black font-semibold text-lg rounded-xl hover:opacity-90 transition shadow-[0_0_20px_#00ff9d50] "
          >
            Join Early Access
          </button>
        </form>

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
          It's built for real-world developer workflows, where you might need AI
          assistance but don't want others to see prompts, completions, or tool
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
            description="HiddenHelper's window cannot be captured by Zoom, Google Meet, Teams, Discord, OBS, or OS-level share APIs."
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
        <form action="/" method="get">
          <input type="hidden" name="modal" value="true" />
          <button
            type="submit"
            className="hover:cursor-pointer px-8 py-4 bg-[#00ff9d] text-black text-lg font-semibold rounded-xl hover:opacity-90 transition shadow-[0_0_25px_#00ff9d70]"
          >
            Register Interest for Global Launch
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} HiddenHelper — Global Early Access
      </footer>

      {/* MODAL WRAPPER */}
      {showModal && <ModalWrapper />}
    </div>
  );
}

/* --- COMPONENTS --- */

function FeatureCard({ title, description, accent }: { title: string; description: string; accent: string }) {
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

function UseCase({ title }: { title: string }) {
  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-center">
      {title}
    </div>
  );
}