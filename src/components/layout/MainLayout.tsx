import React from 'react';
import { ChatSidebar } from '../chat/ChatSidebar';
import { CodeSection } from '../code/CodeSection';
import { Terminal } from '../terminal/Terminal';

export function MainLayout() {
  return (
    <div className="flex flex-1 h-full overflow-hidden theme-bg-primary">
      {/* Left Sidebar - Chat */}
      <div className="w-96 theme-bg-secondary theme-border border-r flex flex-col">
        <ChatSidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <CodeSection />
        <div className="h-48 theme-border border-t">
          <Terminal />
        </div>
      </div>
    </div>
  );
}