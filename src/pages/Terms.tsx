import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-warning" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Terms & Conditions
              </h1>
            </div>

            <div className="bg-warning/5 border border-warning/20 rounded-2xl p-6 mb-8">
              <h2 className="font-heading text-xl font-semibold text-warning mb-3">
                ⚠️ Important Disclaimer
              </h2>
              <p className="text-foreground leading-relaxed">
                This website is created <strong>solely for educational and demonstration purposes</strong>. 
                It is <strong>NOT a real website</strong> and does <strong>NOT represent a real company or business</strong>.
              </p>
            </div>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  1. Purpose of This Website
                </h3>
                <p className="leading-relaxed">
                  This website exists purely to <strong>showcase web development and design skills</strong>. 
                  All content, including but not limited to services, pricing, testimonials, booking forms, 
                  and company information, are entirely fictional and for demonstration purposes only.
                </p>
              </section>

              <section>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  2. No Real Services Offered
                </h3>
                <p className="leading-relaxed">
                  DevBridge Consult is a <strong>fictional brand name</strong> created for this demo project. 
                  No actual consultation services, IT support, or any other services are being offered, 
                  provided, or available through this website.
                </p>
              </section>

              <section>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  3. Coincidental Similarity
                </h3>
                <p className="leading-relaxed">
                  If there exists any real company, website, business, or individual with the same or 
                  similar name "DevBridge Consult" or any variation thereof, this is <strong>purely coincidental</strong>. 
                  This demo website has no affiliation, association, or connection with any existing entity.
                </p>
              </section>

              <section>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  4. Demo Content
                </h3>
                <p className="leading-relaxed">
                  All content displayed on this website is fabricated for demonstration purposes:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Service descriptions are fictional</li>
                  <li>Booking functionality is simulated (no real bookings are made)</li>
                  <li>Contact forms do not send real messages</li>
                  <li>Admin dashboard contains mock/sample data</li>
                  <li>All images and illustrations are for demo purposes</li>
                </ul>
              </section>

              <section>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  5. Skills Showcase
                </h3>
                <p className="leading-relaxed">
                  The primary intent of this project is to demonstrate proficiency in:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Modern web development (React, TypeScript, Tailwind CSS)</li>
                  <li>UI/UX design principles</li>
                  <li>Responsive web design</li>
                  <li>Frontend architecture and component design</li>
                  <li>Animation and interaction design</li>
                </ul>
              </section>

              <section>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  6. No Liability
                </h3>
                <p className="leading-relaxed">
                  The creator of this demo website assumes no liability for any misunderstanding 
                  regarding the nature of this project. By using or viewing this website, you acknowledge 
                  that you understand this is a demonstration project and not a real business.
                </p>
              </section>

              <section className="pt-4 border-t border-border">
                <p className="text-sm text-center">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
