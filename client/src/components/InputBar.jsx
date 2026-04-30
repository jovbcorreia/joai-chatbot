import { useState, useRef, useEffect } from 'react';

function InputBar({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    /* Darker footer — creates clear visual separation from chat area */
    <div className="flex-shrink-0 bg-[#e2e2e8] border-t border-gray-300/60 px-4 pt-5 pb-6">
      <div className="max-w-3xl mx-auto">

        {/* Input container — prominent card */}
        <div
          className="flex items-end gap-3 bg-white rounded-2xl px-5 py-4
            shadow-lg border border-gray-200/60
            transition-all duration-200
            focus-within:shadow-xl focus-within:ring-2 focus-within:ring-indigo-400/30 focus-within:border-indigo-300/70"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message JoAI..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-[15px] text-[#1d1d1f] placeholder-gray-400 resize-none focus:outline-none leading-relaxed max-h-36 overflow-y-auto disabled:opacity-40"
          />

          {/* Send button — larger and more prominent */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="flex-shrink-0 w-10 h-10 rounded-xl
              bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
              disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed
              text-white transition-all duration-150
              hover:scale-105 active:scale-95
              flex items-center justify-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>

        <p className="text-center text-gray-400/80 text-[11px] mt-2.5">
          Enter to send &middot; Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

export default InputBar;
