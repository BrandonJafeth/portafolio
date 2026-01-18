"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";
import { useState } from "react";
import siteConfig from "@/config/site.config";
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";

export default function Contact() {
  const { t } = useTranslations();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 max-w-6xl mx-auto px-6 relative" id="contact">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <span className="text-secondary-foreground/60 font-medium tracking-wider text-sm uppercase mb-2 block">
            {t("projects.title") === "Proyectos Destacados" ? "Hablemos" : "Get In Touch"}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground pb-2">
            {t("contact.title")}
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        
        {/* Contact Info Column */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
        >
            <div className="prose prose-neutral dark:prose-invert">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("contact.collaborationMessage")}
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors">
                        <AiOutlineMail className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground font-medium">{t("contact.email")}</span>
                        <a href={`mailto:${siteConfig.contactEmail}`} className="text-foreground hover:text-primary transition-colors">
                            {siteConfig.contactEmail}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors">
                        <MdOutlineLocationOn className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground font-medium">{t("contact.location")}</span>
                        <span className="text-foreground">Costa Rica</span>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border/50">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t("contact.socials")}</h4>
                <div className="flex gap-4">
                    <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" 
                       className="p-3 rounded-full bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all">
                        <AiOutlineGithub className="w-5 h-5" />
                    </a>
                    <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                       className="p-3 rounded-full bg-secondary/50 hover:bg-secondary border border-transparent hover:border-[#0077b5]/30 text-foreground hover:text-[#0077b5] transition-all">
                        <AiOutlineLinkedin className="w-5 h-5" />
                    </a>
                     <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                       className="p-3 rounded-full bg-secondary/50 hover:bg-secondary border border-transparent hover:border-[#25D366]/30 text-foreground hover:text-[#25D366] transition-all">
                        <AiOutlineWhatsApp className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </motion.div>

        {/* Form Column */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 bg-secondary/20 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">{t("contact.name")}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all focus:bg-background"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">{t("contact.email")}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all focus:bg-background"
                            required
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground ml-1">{t("contact.subject")}</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Project Proposal"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all focus:bg-background"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">{t("contact.message")}</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all focus:bg-background resize-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'sending' ? (
                        <>
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            {t("contact.sending")}
                        </>
                    ) : (
                        t("contact.send")
                    )}
                </button>

                {status === 'success' && (
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-500 text-center text-sm font-medium bg-green-500/10 py-2 rounded-lg"
                    >
                        {t("contact.successMessage")}
                    </motion.p>
                )}
                
                {status === 'error' && (
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-center text-sm font-medium bg-red-500/10 py-2 rounded-lg"
                    >
                        {t("contact.errorMessage")}
                    </motion.p>
                )}
            </form>
        </motion.div>
      </div>
    </section>
  );
}
