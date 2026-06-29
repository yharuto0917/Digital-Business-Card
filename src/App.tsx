/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Twitter, Instagram, Github, AtSign } from 'lucide-react';
import { Card } from './components/Card';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
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
