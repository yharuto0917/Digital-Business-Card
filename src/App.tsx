/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink } from 'lucide-react';
import { Card } from './components/Card';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <Card />
      
      {/* Footer Link */}
      <div className="fixed bottom-6 left-0 flex justify-center w-full pointer-events-none">
        <a
          href="https://yharuto.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200"
        >
          yharuto.dev
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
