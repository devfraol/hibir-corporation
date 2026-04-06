import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Globe, User } from "lucide-react";
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
            <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Get in Touch</span>
            <h2 className="section-title mt-3 mb-10">We'd Love to Hear From You</h2>

            <div className="space-y-6 mb-12">
              {[
                { icon: <MapPin size={20} />, label: "Physical Address", value: "Amhara Regional State, Bahir Dar\nNear Bahir Dar University, Gish Abay Campus" },
                { icon: <Mail size={20} />, label: "Postal Address", value: "P.O. Box 1678, Bahir Dar, Ethiopia" },
                { icon: <Phone size={20} />, label: "Phone", value: "+251 582 20 4493 / 7659 / 3201299" },
                { icon: <Phone size={20} />, label: "Fax", value: "+251 582 20 4501" },
                { icon: <Mail size={20} />, label: "Email", value: "HCCnt2005@gmail.com" },
                { icon: <Globe size={20} />, label: "Website", value: "www.Hibir.et" },
                { icon: <User size={20} />, label: "CEO", value: "Ato Mebit Admas — +251 918 353 821" },
                { icon: <Clock size={20} />, label: "Working Hours", value: "Mon – Sat: 8:00 AM – 5:00 PM" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-foreground">{c.label}</p>
                    <p className="text-muted-foreground text-sm font-body whitespace-pre-line">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124930.47829473694!2d37.34!3d11.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164326f4fa3dc3b7%3A0xe08b4e3e5bae9d89!2sBahir%20Dar!5e0!3m2!1sen!2set!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hibir Construction Location — Bahir Dar"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10">
              <h3 className="font-display font-semibold text-2xl mb-8 text-foreground">Send a Message</h3>
              <div className="space-y-6">
                {[
                  { label: "Full Name", type: "text", key: "name" as const, placeholder: "Your name" },
                  { label: "Email", type: "email", key: "email" as const, placeholder: "your@email.com" },
                  { label: "Subject", type: "text", key: "subject" as const, placeholder: "Project inquiry" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-body font-medium mb-2 text-foreground/80">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_hsla(38,92%,50%,0.1)] transition-all duration-300"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-body font-medium mb-2 text-foreground/80">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_hsla(38,92%,50%,0.1)] transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="btn-accent w-full inline-flex items-center justify-center gap-2 py-4">
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
