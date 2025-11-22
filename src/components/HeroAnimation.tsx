import { motion } from 'framer-motion';
import { Heart, Sparkles, DollarSign, Star, TrendingUp } from 'lucide-react';

export const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Gradient blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating icons */}
      <FloatingIcon 
        Icon={Heart} 
        className="text-primary"
        delay={0}
        radius={180}
        duration={15}
      />
      <FloatingIcon 
        Icon={Sparkles} 
        className="text-accent"
        delay={3}
        radius={160}
        duration={12}
      />
      <FloatingIcon 
        Icon={DollarSign} 
        className="text-primary-glow"
        delay={6}
        radius={200}
        duration={18}
      />
      <FloatingIcon 
        Icon={Star} 
        className="text-accent"
        delay={9}
        radius={140}
        duration={14}
      />
      <FloatingIcon 
        Icon={TrendingUp} 
        className="text-primary"
        delay={12}
        radius={170}
        duration={16}
      />

      {/* Phone mockup */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotateY: [-2, 2, -2],
            rotateX: [1, -1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Phone frame */}
          <div className="w-[280px] h-[560px] bg-gradient-to-br from-background via-card to-muted rounded-[3rem] shadow-2xl border-8 border-border/50 overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-3xl z-20" />
            
            {/* Screen content */}
            <div className="relative h-full w-full bg-gradient-to-br from-background to-muted/50 pt-8 pb-6 px-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="text-xs font-semibold text-primary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CloutCash
                </motion.div>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-accent/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>

              {/* Swipe cards stack */}
              <div className="relative h-[380px] flex items-center justify-center">
                {/* Back card */}
                <motion.div
                  className="absolute w-full h-[340px] bg-gradient-to-br from-card to-muted rounded-3xl border border-primary/20 shadow-lg"
                  animate={{
                    scale: [0.95, 0.96, 0.95],
                    opacity: [0.5, 0.6, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ top: '20px' }}
                />
                
                {/* Front card */}
                <motion.div
                  className="absolute w-full h-[360px] bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl border-2 border-primary/30 shadow-2xl p-6"
                  animate={{
                    rotateZ: [-1, 1, -1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ top: '10px' }}
                >
                  {/* Profile image placeholder */}
                  <motion.div 
                    className="w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Match badge */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary-foreground shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    92% Match
                  </motion.div>
                  
                  {/* Content lines */}
                  <div className="space-y-2">
                    <div className="h-3 bg-primary/10 rounded-full w-3/4" />
                    <div className="h-3 bg-accent/10 rounded-full w-1/2" />
                    <div className="h-2 bg-muted/40 rounded-full w-full mt-4" />
                    <div className="h-2 bg-muted/40 rounded-full w-5/6" />
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mt-4">
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-[8px] text-primary">Beauty</div>
                    <div className="px-3 py-1 bg-accent/10 rounded-full text-[8px] text-accent">Lifestyle</div>
                  </div>
                </motion.div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <motion.div 
                  className="w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-5 h-0.5 bg-destructive rounded-full rotate-45" />
                  <div className="w-5 h-0.5 bg-destructive rounded-full -rotate-45 absolute" />
                </motion.div>
                
                <motion.div 
                  className="w-16 h-16 rounded-full bg-primary shadow-[0_0_30px_rgba(230,57,70,0.4)] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Heart className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
                </motion.div>

                <motion.div 
                  className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Star className="w-5 h-5 text-accent" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Floating icon component that orbits around the phone
const FloatingIcon = ({ 
  Icon, 
  className, 
  delay, 
  radius, 
  duration 
}: { 
  Icon: any; 
  className: string; 
  delay: number; 
  radius: number; 
  duration: number;
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        x: [
          Math.cos(0) * radius,
          Math.cos(Math.PI / 2) * radius,
          Math.cos(Math.PI) * radius,
          Math.cos((3 * Math.PI) / 2) * radius,
          Math.cos(2 * Math.PI) * radius,
        ],
        y: [
          Math.sin(0) * radius,
          Math.sin(Math.PI / 2) * radius,
          Math.sin(Math.PI) * radius,
          Math.sin((3 * Math.PI) / 2) * radius,
          Math.sin(2 * Math.PI) * radius,
        ],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      style={{
        filter: 'drop-shadow(0 0 10px currentColor)',
      }}
    >
      <Icon className="w-8 h-8 opacity-60" />
    </motion.div>
  );
};
