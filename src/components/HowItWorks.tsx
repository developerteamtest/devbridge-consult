import { motion } from 'framer-motion';
import { CalendarDays, FileText, CheckCircle, Video } from 'lucide-react';

const steps = [
  {
    icon: CalendarDays,
    step: "01",
    title: "Choose Date & Time",
    description: "Pick a slot that works for you"
  },
  {
    icon: FileText,
    step: "02",
    title: "Share Your Details",
    description: "Tell me about your challenge"
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get Confirmation",
    description: "Receive booking confirmation"
  },
  {
    icon: Video,
    step: "04",
    title: "1-Hour Video Call",
    description: "Deep-dive consultation session"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section mb-4">How It Works</h2>
          <p className="text-body max-w-2xl mx-auto">
            Simple, straightforward booking process. No sales calls, no waiting.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/30 to-transparent" />
              )}
              
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card shadow-soft mb-6">
                <step.icon className="w-8 h-8 text-accent" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              
              <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
