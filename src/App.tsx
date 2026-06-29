/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Twitter, Instagram, Github, AtSign } from 'lucide-react';
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
    <div className="min-h-dvh bg-[#fafafa] flex items-center justify-center px-3 py-4 sm:p-4">
      <Card />
      
      {/* Floating Navigation Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-50">
        <div className="pointer-events-auto flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-md bg-white/50 border border-white/60 shadow-xl text-slate-500">
          
          {/* Portfolio Link */}
          <a href="https://yharuto.dev" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-1.5 font-semibold text-sm hover:text-pink-600 transition-colors duration-300">
            Portfolio
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Separator */}
          <div className="w-[1px] h-5 bg-slate-300/60" />

          {/* SNS Links */}
          <div className="flex items-center gap-4">
            <a href="https://x.com/yharuto0917" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 hover:text-pink-600 transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/yharuto0917" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 hover:text-pink-600 transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.threads.net/@yharuto0917" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 hover:text-pink-600 transition-all duration-300">
              <AtSign className="w-4 h-4" />
            </a>
            <a href="https://github.com/yharuto0917" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 hover:text-pink-600 transition-all duration-300">
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
