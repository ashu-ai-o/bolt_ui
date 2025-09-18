import React from 'react';
import { X } from 'lucide-react';
import { ChatSidebar } from '../chat/ChatSidebar';
import { CodeSection } from '../code/CodeSection';
import { Terminal } from '../terminal/Terminal';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex flex-1 h-full overflow-hidden theme-bg-primary relative">
      {/* Left Sidebar - Chat */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 
        w-full sm:w-96 lg:w-[400px] 
        theme-bg-secondary theme-border border-r flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <ChatSidebar />
        
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 theme-text-tertiary hover:theme-text-primary transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <CodeSection sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="h-32 sm:h-40 lg:h-52 theme-border border-t">
          <Terminal />
        </div>
      </div>
    </div>
  );
}