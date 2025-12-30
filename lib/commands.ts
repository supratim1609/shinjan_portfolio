import { fileSystem, FileSystemItem } from "./fileSystem";

export interface CommandResponse {
    output: string;
    type: 'success' | 'error' | 'info' | 'text';
    newCwd?: string;
    action?: 'clear' | 'open_link';
    meta?: any;
}

export const resolvePath = (cwd: string, path: string): string => {
    if (path === '~') return '~';
    if (path === '..') {
        if (cwd === '~') return '~';
        const parts = cwd.split('/');
        parts.pop();
        return parts.join('/') || '~';
    }
    if (path.startsWith('~/')) return path;
    if (path.startsWith('/')) return '~' + path;

    return cwd === '~' ? `~/${path}` : `${cwd}/${path}`;
};

export const getFileFromPath = (path: string): FileSystemItem | null => {
    if (path === '~') return fileSystem['~'];

    const cleanPath = path.replace(/^~\/?/, '');
    if (!cleanPath) return fileSystem['~'];

    const parts = cleanPath.split('/');
    let current: FileSystemItem = fileSystem['~'];

    for (const part of parts) {
        if (current.type !== 'directory' || !current.children || !current.children[part]) {
            return null;
        }
        current = current.children[part];
    }
    return current;
};

export const executeCommand = (input: string, cwd: string): CommandResponse => {
    const args = input.trim().split(/\s+/);
    const cmd = args[0].toLowerCase();
    const param = args[1];

    switch (cmd) {
        case 'help':
            return {
                output: `
<div class="space-y-1">
  <div class="grid grid-cols-[120px_1fr] gap-2">
    <div><span class="text-green-400 font-bold">experience</span></div> <div class="text-zinc-400">View work history</div>
    <div><span class="text-green-400 font-bold">education</span></div> <div class="text-zinc-400">View academic details</div>
    <div><span class="text-green-400 font-bold">skills</span></div> <div class="text-zinc-400">View technical skills</div>
    <div><span class="text-green-400 font-bold">projects</span></div> <div class="text-zinc-400">List and view projects</div>
    <div><span class="text-green-400 font-bold">certifications</span></div> <div class="text-zinc-400">View certifications</div>
    <div><span class="text-green-400 font-bold">contact</span></div> <div class="text-zinc-400">View contact information</div>
    <div><span class="text-cyan-400 font-bold">clear</span></div> <div class="text-zinc-400">Clear terminal screen</div>
  </div>
</div>
`,
                type: 'info'
            };

        case 'experience':
            return executeCommand('cat experience.md', '~');

        case 'education':
            return executeCommand('cat education.md', '~');

        case 'contact':
            return executeCommand('cat contact.md', '~');

        case 'resume':
            return executeCommand('cat resume.pdf', '~');

        case 'skills':
            return executeCommand('cat skills.txt', '~');

        case 'certifications':
            return executeCommand('cat certifications.md', '~');

        case 'projects':
            const projectsDir = fileSystem['~'].children?.['projects'];
            if (!projectsDir || !projectsDir.children) return { output: 'No projects found.', type: 'error' };

            const projectList = Object.values(projectsDir.children).map(p => {
                return `
<div class="group flex items-center gap-4 hover:bg-white/5 p-2 rounded cursor-pointer transition-colors" data-cmd="cat projects/${p.name}">
    <div class="min-w-[150px] text-cyan-400 font-bold group-hover:text-cyan-300">./${p.name}</div>
    <div class="text-zinc-500 text-sm italic">${p.description || ''}</div>
    <div class="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs border border-zinc-700 px-1 rounded">EXEC</div>
</div>`;
            }).join('');

            return {
                output: `
<div class="space-y-1">
    <div class="text-zinc-500 mb-2">Select a binary to execute:</div>
    <div class="grid gap-1">
        ${projectList}
    </div>
</div>`,
                type: 'text'
            };

        case 'ls':
            const targetDir = param ? resolvePath(cwd, param) : cwd;
            const file = getFileFromPath(targetDir);

            if (!file) return { output: `ls: ${param}: No such file or directory`, type: 'error' };
            if (file.type !== 'directory' || !file.children) return { output: `ls: ${param}: Not a directory`, type: 'error' };

            const files = Object.values(file.children).map(f => {
                const color = f.type === 'directory' ? 'text-blue-400 font-bold' : 'text-green-400';
                const suffix = f.type === 'directory' ? '/' : '';
                return `<span class="${color} mr-4">${f.name}${suffix}</span>`;
            }).join('');

            return { output: files, type: 'text' };

        case 'cd':
            if (!param || param === '~') return { output: '', type: 'success', newCwd: '~' };

            const newPath = resolvePath(cwd, param);
            const targetNode = getFileFromPath(newPath);

            if (!targetNode || targetNode.type !== 'directory') {
                return { output: `cd: ${param}: No such file or directory`, type: 'error' };
            }
            return { output: '', type: 'success', newCwd: newPath };

        case 'pwd':
            return { output: cwd, type: 'info' };

        case 'cat':
            if (!param) return { output: 'usage: cat [file]', type: 'info' };
            const catPath = resolvePath(cwd, param);
            const targetFile = getFileFromPath(catPath);

            if (!targetFile) return { output: `cat: ${param}: No such file or directory`, type: 'error' };
            if (targetFile.type === 'directory') return { output: `cat: ${param}: Is a directory`, type: 'error' };

            // Basic formatting for markdown content
            let content = targetFile.content || '';

            // Trim indentation from lines
            content = content.split('\n').map(line => line.trim()).join('\n');

            // Escape HTML
            content = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

            // Basic Syntax Highlighting simulation
            content = content.replace(/\n/g, '<br/>');

            // Format Headers (Handling <br/> from previous step)
            content = content.replace(/(?:^|<br\/>)# (.*?)(?:<br\/>|$)/g, '<br/><span class="text-xl font-bold text-accent uppercase tracking-wider">$1</span><br/>');
            content = content.replace(/(?:^|<br\/>)## (.*?)(?:<br\/>|$)/g, '<br/><span class="text-lg font-bold text-blue-400 mt-2 block">$1</span>');

            content = content.replace(/- (.*?)<br\/>/g, '<span class="pl-4 text-zinc-300 block border-l border-zinc-700 ml-1 mb-1">$1</span>');
            content = content.replace(/\[LINK: (.*?)\]/g, '<a href="$1" target="_blank" class="text-blue-500 hover:underline cursor-pointer">[LINK]</a>');
            content = content.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-gray-100">$1</span>');

            return { output: content, type: 'text' };

        case 'whoami':
            return { output: 'root (Shinjan Sarkar)', type: 'info' };

        case 'clear':
            return { output: '', type: 'success', action: 'clear' };

        case 'sudo':
            return { output: 'Permission denied: You do not have root privileges. Try asking nicely.', type: 'error' };

        default:
            return { output: `zsh: command not found: ${cmd}`, type: 'error' };
    }
};
