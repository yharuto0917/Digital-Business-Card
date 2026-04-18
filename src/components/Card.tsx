import { Canvas } from '@react-three/fiber';
import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import { AtSign, Code, Github, Globe, Instagram, Mail, QrCode, Twitter, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ShaderPlane } from './ShaderPlane';
import profileImg from '@/lib/profile.svg';

export const Card: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const tiltRef = useRef({ x: 0, y: 0 });

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const flipY = useSpring(0, { stiffness: 60, damping: 15 });

  useEffect(() => {
    flipY.set(isFlipped ? 180 : 0);
  }, [isFlipped, flipY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    tiltRef.current = { x: xPct, y: yPct };
    
    rotateX.set(yPct * -25); // tilt up/down
    rotateY.set(xPct * 25);  // tilt left/right
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltRef.current = { x: 0, y: 0 };
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;
    
    const xPct = touchX / width - 0.5;
    const yPct = touchY / height - 0.5;
    
    tiltRef.current = { x: xPct, y: yPct };
    
    rotateX.set(yPct * -25); // tilt up/down
    rotateY.set(xPct * 25);  // tilt left/right
  };

  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(calc(${rotateY}deg + ${flipY}deg))`;

  return (
    <div className="relative w-[66vw] max-w-[500px] min-w-[280px] aspect-[1.586/1] group cursor-pointer z-10">
      {/* Elegant Ambient Glow Shadow - Isolated fully to fix Safari plane intersection */}
      <div 
        className="absolute -inset-1.5 sm:-inset-4 bg-gradient-to-br from-pink-200/70 via-fuchsia-100/50 to-purple-200/70 rounded-[2rem] blur-xl sm:blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        style={{ transform: 'translateZ(0)' }} 
      />
      
      {/* 3D Perspective Context */}
      <div className="absolute inset-0 perspective-[1500px]">
        <motion.div
          className="w-full h-full relative preserve-3d touch-none rounded-2xl"
          style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ WebkitBackfaceVisibility: 'hidden', WebkitTransform: 'translateZ(1px)', transform: 'translateZ(1px)' }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-slate-900/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.4)] bg-white/50">
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ShaderPlane tiltRef={tiltRef} color1="#ffffff" color2="#fce7f3" />
              </Canvas>
            </div>
            
            {/* Front Content */}
            <div className="absolute inset-0 z-10 p-4 sm:p-6 flex flex-col justify-between text-slate-800">
              <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <User className="w-5 h-5 sm:w-8 sm:h-8 text-pink-500" />
                <span className="font-semibold tracking-wider text-sm sm:text-lg">PROFILE</span>
              </div>
              <Code className="w-5 h-5 sm:w-8 sm:h-8 opacity-70" />
            </div>
            
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src={profileImg} 
                  alt="Y.Haruto" 
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-sm ring-2 ring-white/60 object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="font-sans text-lg sm:text-2xl tracking-widest text-slate-800 drop-shadow-sm font-bold truncate">
                    Y.Haruto
                  </div>
                  <div className="text-[10px] sm:text-sm font-medium text-pink-600 tracking-widest uppercase mt-0.5 sm:mt-1 truncate">
                    AI Engineer / Deep Learning
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 sm:gap-2 font-sans font-bold text-[8px] sm:text-xs text-slate-600 mt-2 sm:mt-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">contact@yharuto.dev</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                  <a 
                    href="https://yharuto.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="truncate hover:text-pink-600 transition-colors cursor-pointer relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    yharuto.dev
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Face */}
      <div 
        className="absolute inset-0 backface-hidden"
        style={{ WebkitBackfaceVisibility: 'hidden', WebkitTransform: 'rotateY(180deg) translateZ(1px)', transform: 'rotateY(180deg) translateZ(1px)' }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-slate-900/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.4)] bg-white/50">
          <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ShaderPlane tiltRef={tiltRef} color1="#fce7f3" color2="#fbcfe8" />
              </Canvas>
            </div>
            
            {/* Back Content */}
            <div className="absolute inset-0 z-10 p-4 sm:p-6 flex flex-col text-slate-800">
              <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-6">
              <div>
                <h3 className="text-[8px] sm:text-xs text-slate-500 uppercase tracking-widest mb-1 sm:mb-2 border-b border-slate-300/50 pb-1">About Me</h3>
                <p className="text-[9px] sm:text-sm leading-snug sm:leading-relaxed text-slate-700 line-clamp-3 sm:line-clamp-none">
                  Deep Learning Engineer majoring in LLMs. Aiming to make AI helpful for everyone through on-device SLMs and AI Agents.
                </p>
              </div>
              
              <div>
                <h3 className="text-[8px] sm:text-xs text-slate-500 uppercase tracking-widest mb-1 sm:mb-2 border-b border-slate-300/50 pb-1">Skills</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['Python', 'TypeScript', 'PyTorch', 'Pydantic AI', 'Next.js'].map(skill => (
                    <span key={skill} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/40 rounded text-[8px] sm:text-xs font-medium border border-pink-200/50 text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 sm:pt-4 border-t border-slate-300/50 mt-auto">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1 sm:gap-1.5 opacity-50 text-slate-500">
                  <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  <AtSign className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="text-[8px] sm:text-xs font-semibold tracking-widest text-slate-400">
                  @yharuto0917
                </div>
              </div>
              <QrCode className="w-4 h-4 sm:w-6 sm:h-6 opacity-40" />
            </div>
          </div>
        </div>
      </div>
        </motion.div>
      </div>
    </div>
  );
};
