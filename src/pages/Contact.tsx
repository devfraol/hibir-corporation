import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-construction.jpg";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main>
      <PageHero title="Contact Us" subtitle="Get in touch with our team for project inquiries and partnerships" image={heroImg} />

      <section className="section-padding">
        <div className="container-custom grid md:grid-cols-2 gap-16">
          <AnimatedSection>
            <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Get in Touch</span>
            <h2 className="section-title mt-2 mb-8">We'd Love to Hear From You</h2>

            <div className="space-y-6 mb-10">
              {[
                { icon: <MapPin size={20} />, label: "Address", value: "Bahir Dar, Amhara Region, Ethiopia" },
                { icon: <Phone size={20} />, label: "Phone", value: "+251 58 220 5678 / +251 58 220 1234" },
                { icon: <Mail size={20} />, label: "Email", value: "info@hibirconstruction.com" },
                { icon: <Clock size={20} />, label: "Working Hours", value: "Mon – Fri: 8:00 AM – 5:00 PM" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-accent shrink-0 mt-1">{c.icon}</div>
                  <div>
                    <p className="font-body font-semibold text-sm">{c.label}</p>
                    <p className="text-muted-foreground text-sm font-body">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124930.47829473694!2d37.34!3d11.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164326f4fa3dc3b7%3A0xe08b4e3e5bae9d89!2sBahir%20Dar!5e0!3m2!1sen!2set!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hibir Construction Location"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border shadow-lg">
              <h3 className="font-display font-semibold text-2xl mb-6">Send a Message</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-body font-medium mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="btn-accent w-full inline-flex items-center justify-center gap-2">
                  <Send size={18} /> Send Message
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Contact;
