import React, { useState } from 'react';
import { File, Folder, FolderOpen, ChevronDown, ChevronRight, Monitor, Smartphone, Tablet, RotateCcw, ExternalLink, Eye } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

interface FileItemProps {
  file: any;
  level: number;
  onFileSelect: (fileId: string) => void;
}

function FileItem({ file, level, onFileSelect }: FileItemProps) {
  const [expanded, setExpanded] = useState(level < 2);

  const handleClick = () => {
    if (file.type === 'file') {
      onFileSelect(file.id);
    } else {
      setExpanded(!expanded);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return '⚛️';
    if (fileName.endsWith('.ts') || fileName.endsWith('.js')) return '📄';
    if (fileName.endsWith('.css')) return '🎨';
    if (fileName.endsWith('.json')) return '📋';
    if (fileName.endsWith('.html')) return '🌐';
    if (fileName.endsWith('.md')) return '📝';
    return '📄';
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-700 transition-colors text-xs`}
        style={{ paddingLeft: `${8 + level * 12}px` }}
      >
        {file.type === 'folder' && (
          <>
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            {expanded ? <FolderOpen size={14} className="text-blue-400" /> : <Folder size={14} className="text-gray-400" />}
          </>
        )}
        {file.type === 'file' && (
          <span className="text-xs">{getFileIcon(file.name)}</span>
        )}
        <span className="text-gray-300 truncate">{file.name}</span>
      </div>
      
      {file.type === 'folder' && expanded && file.children && (
        <div>
          {file.children.map((child: any) => (
            <FileItem key={child.id} file={child} level={level + 1} onFileSelect={onFileSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CodeSection() {
  const { files, activeFile, setActiveFile, activeTab, setActiveTab } = useAppState();
  const [openFiles, setOpenFiles] = useState<string[]>(['app-context']);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleFileSelect = (fileId: string) => {
    setActiveFile(fileId);
    if (!openFiles.includes(fileId)) {
      setOpenFiles(prev => [...prev, fileId]);
    }
  };

  const closeFile = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFiles(prev => prev.filter(id => id !== fileId));
    if (activeFile === fileId) {
      const remainingFiles = openFiles.filter(id => id !== fileId);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1] : null);
    }
  };

  const getActiveFile = () => {
    const findFile = (fileList: any[]): any => {
      for (const file of fileList) {
        if (file.id === activeFile) return file;
        if (file.children) {
          const found = findFile(file.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findFile(files);
  };

  const getFileById = (fileId: string) => {
    const findFile = (fileList: any[]): any => {
      for (const file of fileList) {
        if (file.id === fileId) return file;
        if (file.children) {
          const found = findFile(file.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findFile(files);
  };

  const currentFile = getActiveFile();

  const getPreviewSize = () => {
    switch (deviceMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      default: return 'w-full';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Tab Bar */}
      <div className="h-10 theme-bg-secondary theme-border border-b flex items-center">
        <button
          onClick={() => setActiveTab('Code')}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === 'Code'
              ? 'theme-text-primary border-blue-500'
              : 'theme-text-tertiary border-transparent hover:theme-text-secondary'
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveTab('Preview')}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === 'Preview'
              ? 'theme-text-primary border-blue-500'
              : 'theme-text-tertiary border-transparent hover:theme-text-secondary'
          }`}
        >
          Preview
        </button>
      </div>

      {activeTab === 'Code' ? (
        <div className="flex-1 flex">
          {/* File Explorer */}
          <div className="w-56 theme-bg-secondary theme-border border-r flex flex-col">
            <div className="p-3 theme-border border-b">
              <div className="flex items-center gap-2">
                <File size={16} className="theme-text-tertiary" />
                <span className="theme-text-primary font-medium text-sm">Files</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {files.map(file => (
                <FileItem key={file.id} file={file} level={0} onFileSelect={handleFileSelect} />
              ))}
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 flex flex-col">
            {/* File Tabs */}
            {openFiles.length > 0 && (
              <div className="h-8 bg-black border-b border-gray-800 flex items-center overflow-x-auto">
                {openFiles.map(fileId => {
                  const file = getFileById(fileId);
                  if (!file) return null;
                  
                  return (
                    <div
                      key={fileId}
                      onClick={() => setActiveFile(fileId)}
                      className={`flex items-center gap-2 px-3 py-1 cursor-pointer border-r border-gray-800 text-xs whitespace-nowrap ${
                        activeFile === fileId 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-black text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      <span>{file.name}</span>
                      <button
                        onClick={(e) => closeFile(fileId, e)}
                        className="hover:bg-gray-600 rounded px-1 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Code Editor */}
            <div className="flex-1 bg-black flex">
              {/* Line Numbers */}
              <div className="w-12 bg-gray-900 border-r border-gray-800 flex flex-col text-xs text-gray-500 font-mono pt-4">
                {currentFile?.content?.split('\n').map((_, index) => (
                  <div key={index} className="px-2 py-0.5 text-right leading-6">
                    {index + 1}
                  </div>
                )) || Array.from({ length: 50 }, (_, index) => (
                  <div key={index} className="px-2 py-0.5 text-right leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Code Content */}
              <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                {currentFile ? (
                  <pre className="text-white leading-6">
                    <code dangerouslySetInnerHTML={{ 
                      __html: highlightSyntax(currentFile.content || '') 
                    }} />
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>Select a file to start editing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Only - Full Screen */
        <div className="flex-1 flex flex-col bg-white dark:bg-black">
          {/* Preview Controls */}
          <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-gray-600 dark:text-white" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Preview</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded transition-colors ${
                  deviceMode === 'desktop' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 rounded transition-colors ${
                  deviceMode === 'tablet' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Tablet size={14} />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded transition-colors ${
                  deviceMode === 'mobile' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Smartphone size={14} />
              </button>
              
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
              
              <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <RotateCcw size={14} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <ExternalLink size={14} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* URL Bar */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>http://localhost:5173</span>
            </div>
          </div>

          {/* Preview Content - Full Screen */}
          <div className="flex-1 p-4 bg-gray-50 dark:bg-black flex items-center justify-center">
            <div className={`${getPreviewSize()} h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
              <iframe
                src="data:text/html,<html><body style='margin:0;padding:40px;font-family:system-ui;background:linear-gradient(135deg,%20rgb(139%2C%2092%2C%20246)%200%25%2C%20rgb(59%2C%20130%2C%20246)%2050%25%2C%20rgb(16%2C%20185%2C%20129)%20100%25);min-height:100vh;display:flex;align-items:center;justify-content:center;color:white'><div style='text-align:center;max-width:400px'><h1 style='font-size:2.5rem;margin-bottom:1rem;font-weight:bold'>Zenflow</h1><p style='font-size:1.2rem;opacity:0.9;margin-bottom:2rem'>Productivity App with Beautiful Animations</p><div style='background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border-radius:12px;padding:2rem;border:1px solid rgba(255,255,255,0.2)'><h3 style='margin-bottom:1rem'>Features:</h3><ul style='text-align:left;line-height:1.8'><li>✨ Task Management</li><li>🎯 Habit Tracking</li><li>🌙 Dark/Light Theme</li><li>📱 Responsive Design</li></ul></div></div></body></html>"
                className="w-full h-full border-0"
                title="App Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function highlightSyntax(code: string): string {
  return code
    .replace(/(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|async|await)/g, 
      '<span style="color: #C792EA; font-weight: 600;">$1</span>')
    .replace(/('.*?'|".*?")/g, 
      '<span style="color: #C3E88D;">$1</span>')
    .replace(/(\/\/.*$)/gm, 
      '<span style="color: #546E7A; font-style: italic;">$1</span>')
    .replace(/(\{|\}|\(|\)|\[|\])/g, 
      '<span style="color: #89DDFF;">$1</span>')
    .replace(/(React|useState|useEffect|useContext|createContext|ReactNode)/g, 
      '<span style="color: #82AAFF; font-weight: 600;">$1</span>')
    .replace(/(\d+)/g, 
      '<span style="color: #F78C6C;">$1</span>');
}