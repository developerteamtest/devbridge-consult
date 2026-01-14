import { motion } from 'framer-motion';
import { Server, Database, Cloud, LayoutGrid } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: "Backend Architecture",
    description: "Design scalable, maintainable backend systems. API design, microservices, and clean code practices."
  },
  {
    icon: Database,
    title: "Database & Scaling",
    description: "Optimize database performance, indexing strategies, and scaling solutions for growing applications."
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "AWS, GCP, Azure guidance. CI/CD pipelines, infrastructure as code, and deployment strategies."
  },
  {
    icon: LayoutGrid,
    title: "SaaS & System Design",
    description: "End-to-end system design reviews. Architecture decisions for startups and growing products."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section mb-4">What I Can Help With</h2>
          <p className="text-body max-w-2xl mx-auto">
            Focused consultation on the technical challenges that matter most to your project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-service group cursor-default"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
