/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink } from 'lucide-react';
import { Card } from './components/Card';

function GitHubMarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-4 h-4 fill-current"
    >
      <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.863 10.914c.575.106.787-.25.787-.556 0-.275-.01-1.004-.016-1.97-3.199.695-3.875-1.542-3.875-1.542-.523-1.328-1.278-1.682-1.278-1.682-1.045-.714.079-.7.079-.7 1.156.081 1.764 1.188 1.764 1.188 1.027 1.76 2.694 1.251 3.35.957.104-.744.402-1.252.731-1.54-2.553-.29-5.238-1.276-5.238-5.682 0-1.255.449-2.282 1.185-3.087-.119-.29-.513-1.46.112-3.044 0 0 .967-.31 3.17 1.179a10.99 10.99 0 0 1 5.77 0c2.2-1.49 3.165-1.179 3.165-1.179.628 1.584.234 2.754.115 3.044.739.805 1.183 1.832 1.183 3.087 0 4.417-2.69 5.389-5.252 5.673.413.355.781 1.058.781 2.133 0 1.54-.014 2.782-.014 3.161 0 .309.207.668.793.555A11.5 11.5 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <Card />
      
      {/* Footer Links */}
      <div className="fixed bottom-6 left-0 flex justify-center w-full pointer-events-none px-4">
        <div className="pointer-events-auto flex flex-col items-center justify-center gap-2 sm:gap-3">
        <a
          href="https://yharuto.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200"
        >
          yharuto.dev
          <ExternalLink className="w-4 h-4" />
        </a>
        <a
          href="https://github.com/yharuto0917/Digital-Business-Card"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200"
        >
          <GitHubMarkIcon />
          GitHub Repository
          <ExternalLink className="w-4 h-4" />
        </a>
        </div>
      </div>
    </div>
  );
}
