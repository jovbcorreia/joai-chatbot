function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center select-none">
      <div className="animate-fade-in flex flex-col items-center">

        {/* Large logo mark */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white font-bold text-4xl sm:text-5xl shadow-2xl mb-8">
          J
        </div>

        {/* Main heading — large and dominant */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-4 max-w-lg">
          Welcome to JoAI Chatbot
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-slow text-gray-500 text-lg sm:text-xl max-w-sm leading-relaxed">
          Start a conversation with your intelligent AI assistant
        </p>

        {/* Visual hint */}
        <div className="animate-fade-in-slow flex items-center gap-2 mt-10 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
          <span className="text-sm font-medium">Type a message below to get started</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
