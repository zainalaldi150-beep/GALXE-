import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Zap, Target, Shield } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Copilots for Builders',
    description: 'Vestora Labs redefines how ideas move on-chain with AI copilots that scaffold, explain, and accelerate your workflow. Build faster without the complexity.',
  },
  {
    icon: Zap,
    title: 'Scales With Innovation',
    description: 'Designed natively for modern blockchain speed and throughput. Whether you\'re launching tokens, NFTs, or DAOs, Vestora grows alongside your project.',
  },
  {
    icon: Target,
    title: 'From Idea to Execution',
    description: 'Innovation shouldn\'t be slowed down by setup. Vestora cuts out the manual steps, letting you move from concept to deployable code in minutes.',
  },
  {
    icon: Shield,
    title: 'Smarter, Safer Onboarding',
    description: 'Experiment, test, and refine with risk-free simulations and unified dashboards. Learn, adapt, and launch with confidence.',
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Launch on Innovation in Minutes.{' '}
            <span className="text-blue-400">Not Months.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Halftone Pattern Overlay */}
                <div className="absolute top-4 right-4 w-20 h-20 opacity-20">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.8)_1px,transparent_1px)] bg-[length:8px_8px]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
