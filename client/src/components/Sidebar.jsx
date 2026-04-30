import { useState } from 'react';

function Sidebar({ isOpen, conversations, currentId, onLoad, onDelete, onNewChat, onClose }) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === conversations.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(conversations.map((c) => c.id)));
    }
  };

  const cancelSelect = () => {
    setSelectMode(false);
    setSelectedIds(new Set());
  };

  const deleteSelected = () => {
    selectedIds.forEach((id) => onDelete(id));
    cancelSelect();
  };

  const allSelected =
    conversations.length > 0 && selectedIds.size === conversations.length;

  return (
    <aside
      className={`
        flex-shrink-0 flex flex-col
        bg-[#eaeaee] border-r border-gray-200
        w-64
        transition-transform duration-300 ease-in-out
        fixed top-16 bottom-0 left-0 z-50
        md:relative md:top-auto md:bottom-auto md:z-auto md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-4 h-4 text-indigo-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          <span className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider">
            Conversations
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Select / Cancel toggle — only shown when there are conversations */}
          {conversations.length > 0 && (
            <button
              onClick={selectMode ? cancelSelect : () => setSelectMode(true)}
              className={`text-[11px] font-semibold px-2 py-1 rounded-lg transition-colors duration-150 ${
                selectMode
                  ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/70'
              }`}
            >
              {selectMode ? 'Cancel' : 'Select'}
            </button>
          )}

          {/* Close — mobile only */}
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/70 transition-colors duration-150 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* New Chat — hidden in select mode */}
      {!selectMode && (
        <div className="px-3 pb-3 flex-shrink-0">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold transition-all duration-150 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Chat
          </button>
        </div>
      )}

      {/* Select mode toolbar */}
      {selectMode && (
        <div className="px-3 pb-3 flex-shrink-0 flex gap-2">
          {/* Select all toggle */}
          <button
            onClick={toggleSelectAll}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              {allSelected
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              }
            </svg>
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>

          {/* Delete selected */}
          <button
            onClick={deleteSelected}
            disabled={selectedIds.size === 0}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Delete{selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
          </button>
        </div>
      )}

      <div className="mx-3 border-t border-gray-200/80 mb-2 flex-shrink-0" />

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <p className="text-xs text-gray-400 text-center leading-relaxed px-4">
              No conversations yet.<br />Start chatting to save history.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {conversations.map((conv) => {
              const isSelected = selectedIds.has(conv.id);
              const isActive = currentId === conv.id && !selectMode;

              return (
                <div
                  key={conv.id}
                  onClick={() => selectMode ? toggleSelect(conv.id) : onLoad(conv)}
                  className={`group flex items-start gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-red-50 text-red-700 ring-1 ring-red-200'
                      : isActive
                      ? 'bg-indigo-100 text-indigo-800 shadow-sm'
                      : 'hover:bg-gray-200/70 text-[#1d1d1f]'
                  }`}
                >
                  {/* Checkbox (select mode) or chat icon (normal mode) */}
                  {selectMode ? (
                    <div className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center transition-colors duration-150 ${
                      isSelected
                        ? 'bg-red-500 border-red-500'
                        : 'border-gray-400 bg-white'
                    }`}>
                      {isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-2.5 h-2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                      className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369.229.698.233 1.388.523 2.005L12 21l2.227-4.647c.29-.617.294-1.307.523-2.005a48.34 48.34 0 003.293-.37c1.584-.232 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  )}

                  {/* Title + date */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate leading-snug">{conv.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{formatDate(conv.createdAt)}</p>
                  </div>

                  {/* Hover delete — normal mode only */}
                  {!selectMode && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                      aria-label="Delete"
                      className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200/80">
        <p className="text-[11px] text-gray-400 text-center">
          {selectMode && selectedIds.size > 0
            ? `${selectedIds.size} of ${conversations.length} selected`
            : `${conversations.length} conversation${conversations.length !== 1 ? 's' : ''} · saved locally`
          }
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
