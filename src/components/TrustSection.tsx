import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <User className="w-12 h-12 text-accent" />
          </div>
          
          <blockquote className="font-heading text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
            "This is a direct consultation with me — no sales calls, no juniors, 
            no handoffs. Just focused, senior-level engineering guidance."
          </blockquote>
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-lg opacity-90">DevBridge Consult</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
