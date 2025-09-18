import React, { useState } from 'react';
import { X, Database, Github, Plus, Check, ExternalLink, Key, Settings, Trash2, AlertCircle } from 'lucide-react';

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Integration {
  id: string;
  name: string;
  type: 'supabase' | 'github';
  status: 'connected' | 'disconnected' | 'error';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  lastSync?: string;
  config?: any;
}

export function IntegrationsModal({ isOpen, onClose }: IntegrationsModalProps) {
  const [activeTab, setActiveTab] = useState<'available' | 'connected'>('available');
  const [showSupabaseSetup, setShowSupabaseSetup] = useState(false);
  const [showGithubSetup, setShowGithubSetup] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState({
    url: '',
    anonKey: '',
    serviceKey: ''
  });
  const [githubConfig, setGithubConfig] = useState({
    token: '',
    repository: '',
    branch: 'main'
  });

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'supabase-1',
      name: 'Supabase Database',
      type: 'supabase',
      status: 'disconnected',
      icon: Database,
      description: 'Connect your Supabase database for real-time data storage and authentication',
      config: null
    },
    {
      id: 'github-1',
      name: 'GitHub Repository',
      type: 'github',
      status: 'disconnected',
      icon: Github,
      description: 'Sync your code with GitHub repository for version control and collaboration',
      config: null
    }
  ]);

  if (!isOpen) return null;

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const availableIntegrations = integrations.filter(i => i.status !== 'connected');

  const handleSupabaseConnect = () => {
    if (supabaseConfig.url && supabaseConfig.anonKey) {
      setIntegrations(prev => prev.map(integration => 
        integration.type === 'supabase' 
          ? { 
              ...integration, 
              status: 'connected' as const, 
              lastSync: new Date().toLocaleString(),
              config: supabaseConfig 
            }
          : integration
      ));
      setShowSupabaseSetup(false);
      setSupabaseConfig({ url: '', anonKey: '', serviceKey: '' });
    }
  };

  const handleGithubConnect = () => {
    if (githubConfig.token && githubConfig.repository) {
      setIntegrations(prev => prev.map(integration => 
        integration.type === 'github' 
          ? { 
              ...integration, 
              status: 'connected' as const, 
              lastSync: new Date().toLocaleString(),
              config: githubConfig 
            }
          : integration
      ));
      setShowGithubSetup(false);
      setGithubConfig({ token: '', repository: '', branch: 'main' });
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'disconnected' as const, config: null, lastSync: undefined }
        : integration
    ));
  };

  const renderSupabaseSetup = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="text-green-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect Supabase</h3>
            </div>
            <button
              onClick={() => setShowSupabaseSetup(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project URL
            </label>
            <input
              type="url"
              value={supabaseConfig.url}
              onChange={(e) => setSupabaseConfig(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://your-project.supabase.co"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Anonymous Key
            </label>
            <input
              type="password"
              value={supabaseConfig.anonKey}
              onChange={(e) => setSupabaseConfig(prev => ({ ...prev, anonKey: e.target.value }))}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Role Key (Optional)
            </label>
            <input
              type="password"
              value={supabaseConfig.serviceKey}
              onChange={(e) => setSupabaseConfig(prev => ({ ...prev, serviceKey: e.target.value }))}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">How to get your keys:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Go to your Supabase project dashboard</li>
                  <li>Navigate to Settings → API</li>
                  <li>Copy the Project URL and anon public key</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={() => setShowSupabaseSetup(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSupabaseConnect}
            disabled={!supabaseConfig.url || !supabaseConfig.anonKey}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <Database size={16} />
            Connect Supabase
          </button>
        </div>
      </div>
    </div>
  );

  const renderGithubSetup = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="text-gray-900 dark:text-white" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect GitHub</h3>
            </div>
            <button
              onClick={() => setShowGithubSetup(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Personal Access Token
            </label>
            <input
              type="password"
              value={githubConfig.token}
              onChange={(e) => setGithubConfig(prev => ({ ...prev, token: e.target.value }))}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Repository
            </label>
            <input
              type="text"
              value={githubConfig.repository}
              onChange={(e) => setGithubConfig(prev => ({ ...prev, repository: e.target.value }))}
              placeholder="username/repository-name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Branch
            </label>
            <input
              type="text"
              value={githubConfig.branch}
              onChange={(e) => setGithubConfig(prev => ({ ...prev, branch: e.target.value }))}
              placeholder="main"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                <p className="font-medium mb-1">Create a Personal Access Token:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Go to GitHub Settings → Developer settings</li>
                  <li>Click Personal access tokens → Tokens (classic)</li>
                  <li>Generate new token with repo permissions</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={() => setShowGithubSetup(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGithubConnect}
            disabled={!githubConfig.token || !githubConfig.repository}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <Github size={16} />
            Connect GitHub
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white dark:bg-black rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] sm:h-[80vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Plus className="text-blue-500" size={24} />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Integrations</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-1 mt-3 sm:mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('available')}
                className={`flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  activeTab === 'available'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Available ({availableIntegrations.length})
              </button>
              <button
                onClick={() => setActiveTab('connected')}
                className={`flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  activeTab === 'connected'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Connected ({connectedIntegrations.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            {activeTab === 'available' ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                  Connect external services to enhance your development workflow
                </p>
                
                {availableIntegrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <div
                      key={integration.id}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 sm:p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                          <div className={`p-3 rounded-lg ${
                            integration.type === 'supabase' 
                              ? 'bg-green-100 dark:bg-green-900/20' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <Icon 
                              size={20} 
                              className={
                                integration.type === 'supabase' 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-gray-700 dark:text-gray-300'
                              } 
                            />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {integration.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">
                              {integration.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs sm:text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                Not connected
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (integration.type === 'supabase') {
                              setShowSupabaseSetup(true);
                            } else if (integration.type === 'github') {
                              setShowGithubSetup(true);
                            }
                          }}
                          className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm rounded-md transition-colors flex items-center gap-2 self-start sm:self-auto"
                        >
                          <Plus size={14} className="sm:w-4 sm:h-4" />
                          Connect
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {connectedIntegrations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No integrations connected
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Connect your first integration to get started
                    </p>
                    <button
                      onClick={() => setActiveTab('available')}
                      className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                    >
                      Browse Available Integrations
                    </button>
                  </div>
                ) : (
                  connectedIntegrations.map((integration) => {
                    const Icon = integration.icon;
                    return (
                      <div
                        key={integration.id}
                        className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 sm:p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                          <div className="flex items-start gap-3 sm:gap-4 flex-1">
                            <div className={`p-3 rounded-lg ${
                              integration.type === 'supabase' 
                                ? 'bg-green-100 dark:bg-green-900/20' 
                                : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              <Icon 
                                size={20} 
                                className={
                                  integration.type === 'supabase' 
                                    ? 'text-green-600 dark:text-green-400' 
                                    : 'text-gray-700 dark:text-gray-300'
                                } 
                              />
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {integration.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">
                                {integration.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs sm:text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Connected
                                </span>
                                {integration.lastSync && (
                                  <span>Last sync: {integration.lastSync}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 self-start sm:self-auto">
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              <Settings size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDisconnect(integration.id)}
                              className="p-2 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showSupabaseSetup && renderSupabaseSetup()}
      {showGithubSetup && renderGithubSetup()}
    </>
  );
}