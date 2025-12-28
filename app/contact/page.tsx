"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  AlertCircle,
  Loader2,
  Send,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setFormState("submitting");
    setErrorMessage("");

    const formData = new FormData(form.current);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
        if (form.current) form.current.reset();
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        setFormState("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
      setFormState("error");
    }
  };

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/share/1D173GCgyh/" },
    { icon: Instagram, url: "#" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <Navbar />
      {/* Header */}
      <div 
        className="text-white pt-32 pb-24 rounded-b-[3rem] shadow-xl"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <Reveal width="100%">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              {`We're `}here to help. Reach out to us for support, inquiries, or feedback.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <Reveal width="100%">
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-purple-600 flex items-start gap-6 hover:-translate-y-1 transition-transform group">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                  <MapPin className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Location
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Makati Science Technological Institute
                    <br />
                    4410 ERL. Building Old Sta. Mesa, Manila
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.1}>
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-pink-600 flex items-start gap-6 hover:-translate-y-1 transition-transform group">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-pink-600 transition-colors duration-300">
                  <Phone className="w-7 h-7 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Phone Support
                  </h3>
                  <p className="text-gray-600">
                    <strong>Hotline:</strong> 0917 123 4567
                    <br />
                    <strong>Office:</strong> (02) 8888 9999
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-red-600 flex items-start gap-6 hover:-translate-y-1 transition-transform group">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors duration-300">
                  <Mail className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600">
                    info@accessibleconnections.ph
                    <br />
                    support@accessibleconnections.ph
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.3}>
              <div className="p-10 bg-gray-900 text-white rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Connect Socially</h3>
                <div className="flex gap-4 relative z-10">
                  {socialLinks.map(({ icon: Icon, url }) => (
                    <a
                      key={url}
                      href={url}
                      target={url !== "#" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-all duration-300 text-xl hover:-translate-y-1"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal width="100%" direction="left">
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-bl-full"></div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Message</h2>
              <p className="text-gray-500 mb-10">We usually respond within 24 hours.</p>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* Web3Forms required fields */}
                <input
                  type="hidden"
                  name="access_key"
                  value="3a535789-c361-48c3-a78c-c1330c51eea1"
                />
                
                {/* Honeypot Spam Protection */}
                <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      placeholder="juan@example.ph"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <AnimatePresence>
                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3 border border-red-100"
                    >
                      <AlertCircle className="w-5 h-5" />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message 
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {formState === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your message has been received successfully. We appreciate you reaching out and will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Contact;