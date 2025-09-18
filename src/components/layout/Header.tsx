import React from 'react';
import { History, ChevronDown, Settings, Users } from 'lucide-react';
import { SettingsModal } from '../modals/SettingsModal';
import { IntegrationsModal } from '../modals/IntegrationsModal';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [showSettings, setShowSettings] = React.useState(false);
  const [showIntegrations, setShowIntegrations] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="h-12 sm:h-14 theme-bg-secondary theme-border border-b flex items-center justify-between px-3 sm:px-6 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="theme-text-primary font-bold text-base sm:text-lg">bolt</div>
          </div>
          
          <button className="hidden sm:flex items-center gap-2 theme-text-secondary hover:theme-text-primary text-sm transition-colors">
            <History size={16} />
            View history
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block"><ThemeToggle /></div>
          
          <div className="hidden md:flex items-center gap-2 theme-bg-tertiary rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="theme-text-secondary text-sm">Online</span>
            <ChevronDown size={14} className="theme-text-tertiary" />
          </div>
          
          <button
            className="hidden lg:block p-2.5 theme-text-tertiary hover:theme-text-primary transition-colors rounded-lg hover:theme-bg-tertiary"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={16} />
          </button>
          
          <button
            className="hidden lg:flex items-center gap-2 theme-text-secondary hover:theme-text-primary text-sm transition-colors"
            onClick={() => setShowIntegrations(true)}
          >
            <Users size={16} />
            Integrations
            <ChevronDown size={14} />
          </button>
          
          <button className="btn-primary px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm">
            Publish
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 theme-text-tertiary hover:theme-text-primary transition-colors"
          >
            <Settings size={16} />
          </button>
        </div>
        
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full right-0 mt-1 w-48 theme-bg-secondary theme-border border rounded-lg shadow-lg z-50">
            <div className="p-2 space-y-1">
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
              <button
                onClick={() => {
                  setShowSettings(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 theme-text-secondary hover:theme-text-primary hover:theme-bg-tertiary rounded-md transition-colors text-sm"
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                onClick={() => {
                  setShowIntegrations(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 theme-text-secondary hover:theme-text-primary hover:theme-bg-tertiary rounded-md transition-colors text-sm"
              >
                <Users size={16} />
                Integrations
              </button>
            </div>
          </div>
        )}
      </header>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <IntegrationsModal isOpen={showIntegrations} onClose={() => setShowIntegrations(false)} />
    </>
  );
}