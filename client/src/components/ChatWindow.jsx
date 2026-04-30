import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';

function ChatWindow({ messages, isLoading, error, messagesEndRef }) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#f5f5f7]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {isLoading && <LoadingIndicator />}

        {error && (
          <div className="flex justify-center animate-fade-in">
            <div className="text-red-600 text-xs bg-red-50 border border-red-200 px-5 py-3 rounded-xl shadow-sm">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </main>
  );
}

export default ChatWindow;
