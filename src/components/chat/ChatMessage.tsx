import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className="flex items-start gap-4">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
        isUser 
          ? 'theme-bg-tertiary' 
          : 'bg-gradient-to-br from-blue-500 to-purple-600'
      }`}>
        {isUser ? (
          <User size={16} className="theme-text-secondary" />
        ) : (
          <Sparkles size={16} className="text-white" />
        )}
      </div>
      
      <div className="flex-1">
        <div className={`rounded-xl p-4 ${
          isUser 
            ? 'bg-blue-50 dark:bg-blue-900/30 theme-text-primary' 
            : 'theme-bg-tertiary theme-text-primary'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs theme-text-tertiary mt-2">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}