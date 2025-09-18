import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Plus } from 'lucide-react';

export function Terminal() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([
    'npm install',
    'added 274 packages in 10s',
    '',
    '65 packages are looking for funding',
    '  run `npm fund` for details',
    '',
    '~/project 9s'
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        setHistory(prev => [...prev, `$ ${inputValue}`, '✓ Command executed successfully', '']);
        setInputValue('');
      }
    }
  };

  return (
    <div className="h-full theme-bg-secondary flex flex-col">
      {/* Terminal Header */}
      <div className="h-10 sm:h-12 theme-bg-tertiary theme-border border-b flex items-center justify-between px-3 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} className="theme-text-tertiary" />
            <span className="theme-text-primary font-medium text-xs sm:text-sm">Bolt</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <TerminalIcon size={16} className="theme-text-tertiary" />
            <span className="theme-text-secondary text-sm">Terminal</span>
          </div>
        </div>
        
        <button className="theme-text-tertiary hover:theme-text-primary transition-colors p-1">
          <Plus size={16} />
        </button>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 px-3 sm:px-6 py-2 sm:py-4 overflow-y-auto font-mono text-xs sm:text-sm"
      >
        {history.map((line, index) => (
          <div key={index} className={`leading-5 sm:leading-6 ${
            line.startsWith('$') ? 'text-blue-400' : 
            line.startsWith('✓') ? 'text-green-400' : 
            line.includes('npm') ? 'text-yellow-400' :
            'text-gray-300'
          }`}>
            {line}
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-blue-400 mr-1 sm:mr-2 text-xs sm:text-sm">~/project 9s</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleCommand}
            className="flex-1 bg-transparent theme-text-primary outline-none text-xs sm:text-sm"
            placeholder=""
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}