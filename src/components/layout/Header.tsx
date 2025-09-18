import React from 'react';
import { History, ChevronDown, Settings, Users } from 'lucide-react';
import { SettingsModal } from '../modals/SettingsModal';
import { IntegrationsModal } from '../modals/IntegrationsModal';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [showSettings, setShowSettings] = React.useState(false);
  const [showIntegrations, setShowIntegrations] = React.useState(false);

  return (
    <>
      <header className="h-12 theme-bg-secondary theme-border border-b flex items-center justify-between px-4 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="theme-text-primary font-bold text-lg">bolt</div>
          </div>
          
          <button className="flex items-center gap-2 theme-text-secondary hover:theme-text-primary text-sm transition-colors">
            <History size={16} />
            View history
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <div className="flex items-center gap-2 theme-bg-tertiary rounded-md px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="theme-text-secondary text-sm">Online</span>
            <ChevronDown size={14} className="theme-text-tertiary" />
          </div>
          
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 theme-text-tertiary hover:theme-text-primary transition-colors rounded-md hover:theme-bg-tertiary"
          >
            <Settings size={16} />
          </button>
          
          <button 
            onClick={() => setShowIntegrations(true)}
            className="flex items-center gap-2 theme-text-secondary hover:theme-text-primary text-sm transition-colors"
          >
            <Users size={16} />
            Integrations
            <ChevronDown size={14} />
          </button>
          
          <button className="btn-primary px-4 py-1.5 text-sm">
            Publish
          </button>
        </div>
      </header>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <IntegrationsModal isOpen={showIntegrations} onClose={() => setShowIntegrations(false)} />
    </>
  );
}