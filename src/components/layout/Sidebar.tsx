import React from 'react';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Plus } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

interface FileItemProps {
  file: any;
  level: number;
}

function FileItem({ file, level }: FileItemProps) {
  const { activeFile, setActiveFile } = useAppState();
  const [expanded, setExpanded] = React.useState(true);
  const isActive = activeFile === file.id;

  const handleClick = () => {
    if (file.type === 'file') {
      setActiveFile(file.id);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
        }`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        {file.type === 'folder' && (
          <>
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            {expanded ? <FolderOpen size={16} /> : <Folder size={16} />}
          </>
        )}
        {file.type === 'file' && <File size={14} />}
        <span className="text-sm font-medium">{file.name}</span>
      </div>
      
      {file.type === 'folder' && expanded && file.children && (
        <div>
          {file.children.map((child: any) => (
            <FileItem key={child.id} file={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { files, sidebarCollapsed } = useAppState();

  return (
    <div className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-10 ${
      sidebarCollapsed ? '-translate-x-full' : 'w-64'
    }`}>
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Explorer</h2>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
            <Plus size={14} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto">
        {files.map(file => (
          <FileItem key={file.id} file={file} level={0} />
        ))}
      </div>
    </div>
  );
}