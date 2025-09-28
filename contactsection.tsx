import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
  };

  return (
    <section ref={ref} id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.3)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="text-blue-400">Talk.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Drop us a message and take the first step toward bringing your project to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-medium">
                    Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className="bg-gray-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="bg-gray-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium">
                  Phone
                </Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className="bg-gray-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="Your phone number (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="bg-gray-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>

            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-16 h-16 opacity-10">
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.8)_1px,transparent_1px)] bg-[length:8px_8px]"></div>
            </div>
            <div className="absolute bottom-6 left-6 w-12 h-12 opacity-10">
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.8)_1px,transparent_1px)] bg-[length:6px_6px]"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
