import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';
import { ChatMessage } from './ChatMessage';

export function ChatInterface() {
  const { chatMessages, addChatMessage, isGenerating, setIsGenerating } = useAppState();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async () => {
    if (inputValue.trim() && !isGenerating) {
      const userMessage = inputValue;
      setInputValue('');
      
      addChatMessage({
        type: 'user',
        content: userMessage
      });

      setIsGenerating(true);

      // Simulate AI response
      setTimeout(() => {
        addChatMessage({
          type: 'assistant',
          content: `I'll help you with that! Let me ${userMessage.toLowerCase().includes('create') ? 'create' : 'update'} the code for you. I'm generating the necessary files and implementing the functionality you requested.`
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Describe what you want to build
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
        {chatMessages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isGenerating && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Loader2 size={16} className="text-white animate-spin" />
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Loader2 size={14} className="animate-spin" />
                Generating code...
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your project or ask for changes..."
            className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            disabled={isGenerating}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isGenerating}
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl transition-colors flex items-center justify-center self-end"
          >
            {isGenerating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}