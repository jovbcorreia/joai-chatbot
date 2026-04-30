function LoadingIndicator() {
  return (
    <div className="flex items-end gap-2.5 justify-start animate-fade-in">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm mb-0.5">
        J
      </div>
      <div className="bg-white border border-gray-200/80 px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-sm">
        <div className="flex gap-1.5 items-center">
          {[0, 150, 300].map((delay) => (
            <div
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
