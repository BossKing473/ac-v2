"use client"
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { Rocket, Eye, Facebook, Instagram } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Angelo from "@/public/MARK ANGELO L. DELOS SANTOS.png"
import Image from 'next/image';
import Diane from "@/public/DIANE U. QUITALEG.png"
import Jerome from "@/public/JEROME L. LEAL.png"

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      {/* Header */}
      <div 
        className="text-white pt-32 pb-24 rounded-b-[3rem] shadow-xl relative overflow-hidden"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Building a bridge to a more inclusive Philippines through technology and compassion.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <Reveal>
            <div className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-purple-600 h-full hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To create an inclusive society where persons with disabilities in the Philippines have equal access to opportunities, resources, and support to live independently and participate fully in all aspects of life.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-pink-600 h-full hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                A Philippines where accessibility is a fundamental right, and persons with disabilities are empowered, valued, and fully integrated into society through innovative solutions and community support.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Team Section */}
        <div>
          <Reveal width="100%">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">The passionate individuals behind Accessible Connections.</p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
            {[
              {
                name: 'Diane U. Quitaleg',
                role: 'Lead Researcher',
                image: Jerome,
                facebook: 'https://www.facebook.com/Diane.Q01',
                instagram: 'https://www.instagram.com/dnxii21?igsh=cjAzNGdzb2p0cjFs'
              },
              {
                name: 'Mark Angelo L. Delos Santos',
                role: 'Lead Programmer',
                image: Angelo,
                facebook: 'https://www.facebook.com/share/1C8NSiYPgq/',
                instagram: '#'
              },
              {
                name: 'Jerome G. Leal',
                role: 'Lead Designer',
                image: Angelo,
                facebook: 'https://www.facebook.com/jerome.guarin.leal',
                instagram: 'https://www.instagram.com/lealjerome5385?igsh=OHR5NmFtbXg2cW9o'
              }
            ].map((member, i) => (
              <Reveal key={i} delay={i * 0.2} width="100%">
                <div className="group perspective h-full">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:rotate-1">
                    <div className="absolute inset-0 bg-gray-200">
                      <Image 
                        fill
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={member.image}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      <a 
                        href={member.facebook} 
                        target={member.facebook !== '#' ? "_blank" : "_self"} 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white hover:text-purple-600 transition-all hover:scale-110 transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a 
                        href={member.instagram} 
                        target={member.instagram !== '#' ? "_blank" : "_self"} 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white hover:text-pink-600 transition-all hover:scale-110 transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-white/70 font-medium uppercase tracking-widest text-xs">{member.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;