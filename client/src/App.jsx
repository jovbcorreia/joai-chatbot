import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import Sidebar from './components/Sidebar';

const STORAGE_KEY = 'joai-conversations';

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {
  const [conversations, setConversations] = useState(loadStored);
  const [currentId, setCurrentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const hasStarted = messages.some((m) => m.role === 'user');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const startNewChat = () => {
    setCurrentId(null);
    setMessages([]);
    setError(null);
    setSidebarOpen(false);
  };

  const loadConversation = (conv) => {
    setCurrentId(conv.id);
    setMessages(conv.messages);
    setError(null);
    setSidebarOpen(false);
  };

  const deleteConversation = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentId === id) startNewChat();
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = { role: 'user', content: userInput.trim() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('/api/chat', { messages: nextMessages });
      const aiMessage = { role: 'assistant', content: data.message };
      const finalMessages = [...nextMessages, aiMessage];

      setMessages(finalMessages);

      const title = userInput.length > 45 ? userInput.slice(0, 45) + '…' : userInput;

      setConversations((prev) => {
        const exists = prev.find((c) => c.id === currentId);
        if (exists) {
          return prev.map((c) =>
            c.id === currentId ? { ...c, messages: finalMessages } : c
          );
        }
        const newConv = {
          id: Date.now().toString(),
          title,
          messages: finalMessages,
          createdAt: new Date().toISOString(),
        };
        setCurrentId(newConv.id);
        return [newConv, ...prev];
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f7] text-[#1d1d1f] overflow-hidden">
      {/* Full-width header */}
      <Header
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onNewChat={startNewChat}
      />

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR — always visible on desktop, overlay on mobile */}
        <Sidebar
          isOpen={sidebarOpen}
          conversations={conversations}
          currentId={currentId}
          onLoad={loadConversation}
          onDelete={deleteConversation}
          onNewChat={startNewChat}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile backdrop — sits below header, above content */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/25 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN AREA */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {hasStarted ? (
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              error={error}
              messagesEndRef={messagesEndRef}
            />
          ) : (
            <WelcomeScreen />
          )}
          <InputBar onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
