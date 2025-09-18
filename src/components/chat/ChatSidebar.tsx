import React, { useState } from 'react';
import { Send, MoreHorizontal } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export function ChatSidebar() {
  const [inputValue, setInputValue] = useState('');
  const { addChatMessage, isGenerating, setIsGenerating } = useAppState();

  const handleSend = () => {
    if (inputValue.trim() && !isGenerating) {
      addChatMessage({
        type: 'user',
        content: inputValue
      });
      setInputValue('');
      setIsGenerating(true);
      
      // Simulate AI response
      setTimeout(() => {
        addChatMessage({
          type: 'assistant',
          content: "I'll help you implement that feature. Let me generate the necessary code and update your project files."
        });
        setIsGenerating(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Project Info */}
      <div className="p-6 theme-border border-b">
        <div className="theme-bg-tertiary rounded-xl p-6">
          <h3 className="theme-text-primary font-medium mb-2">Design Elements:</h3>
          <ul className="theme-text-secondary text-sm space-y-1.5">
            <li>• Modern gradient backgrounds with glass morphism effects</li>
            <li>• Comprehensive color system with primary purple (#8B5CF6), secondary blue (#3B82F6), accent green (#10B981)</li>
            <li>• Smooth spring animations using CSS transforms and transitions</li>
            <li>• Clean typography with Inter font family and proper hierarchy</li>
            <li>• Intuitive navigation with bottom tab bar and smooth page transitions</li>
            <li>• Subtle shadows, rounded corners, and hover states throughout</li>
            <li>• Consistent 8px spacing system with proper visual balance</li>
          </ul>
        </div>
        
        <div className="mt-6 p-5 theme-bg-tertiary rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="theme-text-primary font-medium">Zenflow - Lovable Productivity App with Animations and Theme Switching</span>
            <button className="theme-text-tertiary hover:theme-text-primary">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Create initial files
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Install dependencies
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Create src/contexts/AppContext.tsx
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-6 mt-auto">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="How can Bolt help you today? (or /command)"
            className="w-full theme-bg-tertiary theme-border theme-text-primary border rounded-xl px-4 py-3 pr-14 placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 transition-all duration-300"
            rows={3}
            disabled={isGenerating}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isGenerating}
            className="absolute bottom-3 right-3 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-all duration-200"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}