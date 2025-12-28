"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  ArrowRight,
  HandHeart,
  GraduationCap,
  Users,
  Quote,
  User,
  Laptop,
  Network,
  Headset,
  UserCircle,
  Sparkles,
  Target,
  Heart,
  ChevronRight
} from "lucide-react";
import Image from "next/image"
import logo from "@/public/Accessible Connections.png"

const Home: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white fixed top-0 left-0 z-50 shadow-md">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold">
            <Image src={logo} alt="Logo" width={50} height={50} />
          </div>
          <span>Accessible Connections</span>
        </Link>
        <Link
          href="/auth/signup"
          className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          <UserCircle size={20} />
          Sign Up
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden text-white pt-20"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal width="100%">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
              Accessibility for All: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 text-2xl md:text-4xl lg:text-5xl block mt-4 leading-normal font-extrabold tracking-tight">
                Developing a Website for Free Service for Persons with Disabilities in the Philippines
              </span>
            </h1>
          </Reveal>
          
          <Reveal width="100%" delay={0.2}>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
              A Study on Designing an Accessible Digital Platform for Persons with Disabilities in the Philippines
            </p>
          </Reveal>

          <Reveal width="100%" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services" 
                className="px-8 py-4 bg-white text-purple-700 font-bold rounded-full shadow-[0_10px_30px_rgba(40,49,66,0.5)] hover:shadow-[0_20px_40px_rgba(40,49,66,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold rounded-full hover:bg-white hover:text-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Our Mission
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES OVERVIEW */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal width="100%">
            <div className="text-center mb-16">
              <span className="text-pink-600 font-bold tracking-wider uppercase text-sm bg-pink-100 px-4 py-1 rounded-full">What We Do</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Our Core Pillars</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
              <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                We focus on holistic support to ensure every individual has the tools to succeed.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: HandHeart, 
                title: 'Inclusive Services', 
                desc: 'Access healthcare, legal aid, and social support tailored to your needs.', 
                color: 'text-blue-600', 
                bg: 'bg-blue-50', 
                border: 'border-blue-100' 
              },
              { 
                icon: GraduationCap, 
                title: 'Accessible Education', 
                desc: 'Free online courses, scholarship programs, and adaptive learning materials.', 
                color: 'text-pink-600', 
                bg: 'bg-pink-50', 
                border: 'border-pink-100' 
              },
              { 
                icon: Users, 
                title: 'Vibrant Community', 
                desc: 'Connect with peers, mentors, and support groups in a safe environment.', 
                color: 'text-purple-600', 
                bg: 'bg-purple-50', 
                border: 'border-purple-100' 
              },
            ].map((feature, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <div className={`bg-white p-10 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group h-full border ${feature.border}`}>
                  <div className={`w-20 h-20 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <feature.icon className={`text-4xl ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE / TEXT SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute right-0 top-20 w-1/3 h-full bg-slate-50 skew-x-12 opacity-50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500"></div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-10 md:p-14 text-white relative z-10 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
                  <Quote className="w-12 h-12 text-pink-500/50 mb-8" />
                  <p className="text-xl md:text-2xl italic font-light mb-8 leading-relaxed">
                    "Accessibility is not just about ramps and elevators. It's about opening doors to opportunity, dignity, and independence for everyone."
                  </p>
                  <div className="flex items-center gap-5 border-t border-white/10 pt-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Diane U. Quitaleg</h4>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Lead Researcher</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.2}>
              <div>
                <span className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Purpose</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">Read Our Story</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Millions of Filipinos live with disabilities, facing barriers in education, employment, and social participation. Accessible Connections aims to dismantle these barriers through innovative technology solutions.
                </p>
                <ul className="space-y-6 mb-10">
                  {[
                    { text: "Free assistive technology resources", icon: Laptop },
                    { text: "Nationwide network of support centers", icon: Network },
                    { text: "24/7 Digital helpdesk support", icon: Headset }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-700 p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
                {/* <Link 
                  href="/about" 
                  className="inline-block px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-purple-600 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300"
                >
                  Learn More
                </Link> */}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl animate-pulse"></div>
            
            <Reveal width="100%">
              <h2 className="text-3xl md:text-6xl font-bold mb-8">Ready to Get Started?</h2>
              <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Join our community today and gain access to a world of opportunities, resources, and support designed for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/community" 
                  className="px-12 py-5 bg-white text-purple-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-white/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  Join the Community
                </Link>
                <Link 
                  href="/contact" 
                  className="px-12 py-5 border-2 border-white/50 backdrop-blur-sm text-white font-bold text-lg rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;