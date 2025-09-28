import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
  {
    value: 70,
    suffix: '%',
    label: 'AI-Powered Guidance',
    description: 'VestoraGPT turns natural-language prompts into actionable blockchain code, queries, and transactions - cutting setup time by up to 70%.',
  },
  {
    value: 6,
    suffix: 'X Faster',
    label: 'Faster Execution',
    description: 'From scaffolding to testing, AI automation shortens development cycles - enabling projects to ship features 6x faster than manual workflows.',
  },
  {
    value: 50,
    suffix: '%',
    label: 'Continuous Learning',
    description: 'Vestora\'s models stay tuned to blockchain\'s latest upgrades, ensuring users always work with the most efficient flows - improving overall productivity by over 50%.',
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 50), value);
          }
          return value;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* 3D Cube Background */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-20">
        <motion.div
          className="relative w-40 h-40"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transform rotate-12"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg transform -rotate-12"></div>
        </motion.div>
        
        {/* Rays Effect */}
        <div className="absolute inset-0 -z-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 bg-gradient-to-r from-blue-400 to-transparent"
              style={{
                height: '300px',
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 30}deg)`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleY: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="text-center group"
            >
              <div className="mb-6">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                {stat.label}
              </h3>
              
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm mx-auto">
                {stat.description}
              </p>

              {/* Decorative Line */}
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
