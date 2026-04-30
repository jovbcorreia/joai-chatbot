function Header({ onToggleSidebar, onNewChat }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm z-10 flex-shrink-0">

      {/* Left — hamburger (mobile) + logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger: visible only on mobile */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-150 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Logo / brand — clicking starts a new chat */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-150"
          aria-label="New chat"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
            J
          </div>
          <span className="font-bold text-[17px] text-[#1d1d1f] tracking-tight hidden sm:block">
            JoAI
          </span>
        </button>
      </div>

      {/* Right — prominent action buttons */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* GitHub button — full on ≥sm, icon-only on xs */}
        <a
          href="https://github.com/jovbcorreia"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold text-sm text-white bg-[#1a1a1a] hover:bg-[#333] rounded-xl px-4 py-2.5 transition-all duration-150 hover:scale-105 active:scale-95 shadow-sm"
          aria-label="Developer GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 flex-shrink-0"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">Developer GitHub</span>
        </a>

        {/* Website button — full on ≥sm, icon-only on xs */}
        <a
          href="https://www.jovbcorreia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl px-4 py-2.5 transition-all duration-150 hover:scale-105 active:scale-95 shadow-sm"
          aria-label="My Website"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 flex-shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" />
          </svg>
          <span className="hidden sm:inline">My Website</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
