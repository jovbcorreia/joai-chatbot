function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-end gap-2.5 animate-message-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm mb-0.5">
          J
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-sm shadow-md'
            : 'bg-white text-[#1d1d1f] border border-gray-200/80 rounded-bl-sm shadow-sm'
        }`}
      >
        {message.content}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold mb-0.5">
          U
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
