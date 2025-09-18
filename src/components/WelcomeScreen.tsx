import React from 'react';
import { Sparkles, Code, Zap } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-lg mx-auto px-8">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl">
            <Sparkles size={32} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <Zap size={16} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bolt.new
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-Powered Development Platform
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Build, preview, and deploy web applications through natural language
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <Code size={14} />
            <span>Live Coding</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={14} />
            <span>AI Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} />
            <span>Instant Deploy</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}