import React, { useState } from 'react';
import { X, Settings, Database, Shield, User, Cloud, Brain, Archive, Zap, Globe, Lock, Eye, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState('general');
  const [projectName, setProjectName] = useState('AI-Powered Development Platform Prototype (duplicated)');
  const [visibility, setVisibility] = useState<'private' | 'secret' | 'public'>('private');

  if (!isOpen) return null;

  const projectSections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'domains', label: 'Domains & Hosting', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: Brain },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'auth', label: 'Authentication', icon: Shield },
    { id: 'users', label: 'User Management', icon: User },
    { id: 'storage', label: 'File Storage', icon: Archive },
    { id: 'knowledge', label: 'Knowledge', icon: Brain },
    { id: 'backups', label: 'Backups', icon: Archive }
  ];

  const personalSections = [
    { id: 'personal-general', label: 'General', icon: Settings },
    { id: 'subscription', label: 'Subscription & Tokens', icon: Zap },
    { id: 'applications', label: 'Applications', icon: Settings },
    { id: 'cloud', label: 'Cloud', icon: Cloud },
    { id: 'personal-knowledge', label: 'Knowledge', icon: Brain },
    { id: 'experimental', label: 'Experimental features', icon: Zap }
  ];

  const handleDeleteChatHistory = () => {
    if (window.confirm('Are you sure you want to delete all chat history? This action cannot be undone.')) {
      // Implementation would go here
      console.log('Chat history deleted');
    }
  };

  const renderProjectSettings = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project General Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-md transition-colors">
                      Save
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Project Visibility
                  </label>
                  <div className="space-y-3">
                    <div 
                      onClick={() => setVisibility('private')}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        visibility === 'private' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Lock size={20} className="text-blue-400" />
                        <div>
                          <div className="text-gray-900 dark:text-white font-medium">Private</div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">Only owner can access</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setVisibility('secret')}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        visibility === 'secret' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Eye size={20} className="text-yellow-400" />
                        <div>
                          <div className="text-gray-900 dark:text-white font-medium">Secret</div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">Accessible via shared URL</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setVisibility('public')}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        visibility === 'public' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={20} className="text-green-400" />
                        <div>
                          <div className="text-gray-900 dark:text-white font-medium">Public</div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">Everyone can view</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h4 className="text-red-400 font-medium mb-2">Danger zone</h4>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-gray-900 dark:text-white font-medium">Delete chat history</h5>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Deleting your messaging history will erase all messages from the chat and the historical context it holds along with past versions.
                        </p>
                      </div>
                      <button
                        onClick={handleDeleteChatHistory}
                        className="ml-4 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors flex-shrink-0"
                      >
                        Delete chat history
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'domains':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Domains & Hosting</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Configure custom domains and hosting settings for your project.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Add Custom Domain
              </button>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Track your project's performance and user engagement.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Enable Analytics
              </button>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Database</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Configure database connections and manage your data.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Connect Database
              </button>
            </div>
          </div>
        );

      case 'auth':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authentication</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Set up user authentication and security settings.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Configure Auth
              </button>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Manage user roles, permissions, and access controls.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Manage Users
              </button>
            </div>
          </div>
        );

      case 'storage':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">File Storage</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Configure file upload and storage settings.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Setup Storage
              </button>
            </div>
          </div>
        );

      case 'knowledge':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Manage your project's knowledge base and documentation.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Add Knowledge
              </button>
            </div>
          </div>
        );

      case 'backups':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Backups</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Configure automatic backups and restore points.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Setup Backups
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPersonalSettings = () => {
    switch (activeSection) {
      case 'personal-general':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue="rachitag360@gmail.com"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="rachitag360@gmail.com"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription & Tokens</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium">Personal Plan</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Current subscription</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  Upgrade
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">API Tokens Used</span>
                  <span className="text-gray-900 dark:text-white">1,247 / 10,000</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12.47%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Applications</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Manage connected applications and integrations.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Add Application
              </button>
            </div>
          </div>
        );

      case 'cloud':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cloud Settings</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Configure cloud storage and deployment settings.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Setup Cloud
              </button>
            </div>
          </div>
        );

      case 'personal-knowledge':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Knowledge</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Manage your personal knowledge base and learning resources.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Add Knowledge
              </button>
            </div>
          </div>
        );

      case 'experimental':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experimental Features</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">Beta Features</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Enable experimental functionality</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">Advanced AI Models</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Access to latest AI capabilities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-black rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] sm:h-[80vh] flex flex-col sm:flex-row overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Sidebar */}
        <div className="w-full sm:w-80 bg-gray-50 dark:bg-gray-900 border-b sm:border-r sm:border-b-0 border-gray-200 dark:border-gray-800 flex flex-col max-h-48 sm:max-h-none">
          <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg">Project Settings</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-auto sm:overflow-x-visible">
            <div className="flex sm:block p-2 gap-2 sm:gap-0">
              {projectSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`whitespace-nowrap sm:w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-md text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-xs sm:text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:block p-4 theme-border border-t">
              <h3 className="text-gray-900 dark:text-white font-medium mb-2 text-sm">Personal Settings</h3>
            </div>

            <div className="hidden sm:block p-2">
              {personalSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-xs sm:text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-12 sm:h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 sm:px-6">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Settings</h1>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <X size={18} className="sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            {projectSections.some(s => s.id === activeSection) ? renderProjectSettings() : renderPersonalSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}