"use client"
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, Accessibility, Laptop, Clock, Calendar, 
  Video, MapPin, Info, User, BookOpen, CheckCircle, 
  Star, ArrowRight, Briefcase, GraduationCap, 
  Code, Palette, BarChart, Users, Globe, Smartphone, X
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Mock data
const PROGRAMS_DATA = [
  {
    id: 1,
    title: "Digital Literacy for Beginners",
    category: "Digital Skills",
    description: "Learn essential computer skills including email, internet browsing, and using productivity software. Designed for complete beginners with step-by-step guidance.",
    duration: "8 weeks",
    schedule: "Mon & Wed, 2-4 PM",
    mode: "Online",
    disabilityFocus: ["Visual Impairment", "Hearing Impairment", "Mobility Impairment"],
    eligibility: "Open to all persons with disabilities aged 18+ with basic literacy skills.",
    materials: ["Laptop provided during sessions", "Digital workbook", "Assistive software license"],
    accessibility: ["Screen reader compatible", "Sign language interpretation", "Captioning", "Keyboard navigation"],
    icon: "laptop"
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    category: "Tech Training",
    description: "Introduction to HTML, CSS, and JavaScript with accessibility-first approach. Build your first responsive website.",
    duration: "12 weeks",
    schedule: "Tue & Thu, 6-8 PM",
    mode: "In-Person",
    disabilityFocus: ["Visual Impairment", "Cognitive/Learning"],
    eligibility: "Basic computer skills required. No prior coding experience needed.",
    materials: ["Code editor license", "Learning platform access", "Reference materials"],
    accessibility: ["High contrast materials", "Extended time for assignments", "Voice command support"],
    icon: "code"
  },
  {
    id: 3,
    title: "Graphic Design for Accessibility",
    category: "Creative Arts",
    description: "Learn to create accessible designs with proper color contrast, alt text, and inclusive design principles.",
    duration: "10 weeks",
    schedule: "Sat, 10 AM-1 PM",
    mode: "Hybrid",
    disabilityFocus: ["Visual Impairment", "Color Blindness"],
    eligibility: "Interest in design. Access to computer with internet.",
    materials: ["Design software subscription", "Color contrast checker", "Templates"],
    accessibility: ["Color blind friendly palette", "Screen magnifier support", "Descriptive audio"],
    icon: "palette"
  },
  {
    id: 4,
    title: "Data Analysis with Excel",
    category: "Business Skills",
    description: "Master Excel for data organization, analysis, and visualization. Practical applications for workplace.",
    duration: "6 weeks",
    schedule: "Flexible self-paced",
    mode: "Online",
    disabilityFocus: ["Mobility Impairment", "Cognitive/Learning"],
    eligibility: "Basic computer skills. Familiarity with spreadsheets helpful.",
    materials: ["Excel license", "Practice datasets", "Video tutorials"],
    accessibility: ["Keyboard shortcuts guide", "Simplified instructions", "One-on-one support"],
    icon: "bar-chart"
  },
  {
    id: 5,
    title: "Social Media Management",
    category: "Marketing",
    description: "Learn to create and manage social media content with accessibility features for all platforms.",
    duration: "8 weeks",
    schedule: "Wed, 5-7 PM",
    mode: "Online",
    disabilityFocus: ["Hearing Impairment", "Speech Impairment"],
    eligibility: "Social media experience preferred. Creative mindset.",
    materials: ["Content calendar templates", "Accessibility checklists", "Platform guides"],
    accessibility: ["Captioning tools", "Alt text guidelines", "Speech-to-text software"],
    icon: "users"
  },
  {
    id: 6,
    title: "Mobile App Accessibility",
    category: "Tech Training",
    description: "Learn to develop accessible mobile applications following WCAG guidelines for iOS and Android.",
    duration: "14 weeks",
    schedule: "Mon, Wed, Fri 3-5 PM",
    mode: "Hybrid",
    disabilityFocus: ["Visual Impairment", "Motor Disabilities"],
    eligibility: "Basic programming knowledge. Own smartphone for testing.",
    materials: ["Development tools", "Testing devices", "Accessibility SDKs"],
    accessibility: ["VoiceOver testing", "Switch control support", "Large touch targets"],
    icon: "smartphone"
  }
];

const CATEGORIES = ["All Categories", "Digital Skills", "Tech Training", "Creative Arts", "Business Skills", "Marketing"];
const DISABILITIES = ["All Disabilities", "Visual Impairment", "Hearing Impairment", "Mobility Impairment", "Cognitive/Learning", "Speech Impairment", "Color Blindness", "Motor Disabilities"];
const MODES = ["All Modes", "Online", "In-Person", "Hybrid"];

// Icon mapping
const getCategoryIcon = (category: string) => {
  switch(category) {
    case "Digital Skills": return Laptop;
    case "Tech Training": return Code;
    case "Creative Arts": return Palette;
    case "Business Skills": return BarChart;
    case "Marketing": return Users;
    default: return GraduationCap;
  }
};

// Reusable Components Interfaces
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animationDelay?: number;
  children: React.ReactNode;
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  children: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface RevealProps {
  width?: string;
  children: React.ReactNode;
}

interface ScrollAnimationProps {
  delay?: number;
  children: React.ReactNode;
}

interface AnimatedCardProps {
  index?: number;
  className?: string;
  children: React.ReactNode;
}

// Reusable Components
const Card: React.FC<CardProps> = ({ children, className = "", animationDelay = 0, ...props }) => (
  <div 
    className={`bg-white rounded-xl shadow-sm opacity-0 translate-y-8 transition-all duration-700 ${className}`} 
    style={{ animationDelay: `${animationDelay}ms`, transitionDelay: `${animationDelay}ms` }}
    {...props}
  >
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ children, color = "bg-gray-100 text-gray-800", className = "", ...props }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center ${color} ${className}`} {...props}>
    {children}
  </span>
);

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed",
    outline: "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary hover:scale-105 active:scale-95",
    ghost: "text-gray-600 hover:bg-gray-100 hover:scale-105 active:scale-95"
  };
  
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl transition-transform hover:rotate-90 duration-300">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Reveal: React.FC<RevealProps> = ({ children, width = "100%" }) => (
  <div style={{ width }} className="opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
    {children}
  </div>
);

// Scroll animation component
const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// AnimatedCard component with scroll reveal
const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, index = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );
};

// Main Component
const ProgramsPage = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Categories');
  const [filterFocus, setFilterFocus] = useState('All Disabilities');
  const [filterMode, setFilterMode] = useState('All Modes');
  const [selectedProgram, setSelectedProgram] = useState<typeof PROGRAMS_DATA[0] | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [filteredPrograms, setFilteredPrograms] = useState(PROGRAMS_DATA);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Filter programs
  useEffect(() => {
    let results = PROGRAMS_DATA;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(program => 
        program.title.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query) ||
        program.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (filterType !== 'All Categories') {
      results = results.filter(program => program.category === filterType);
    }
    
    // Disability filter
    if (filterFocus !== 'All Disabilities') {
      results = results.filter(program => 
        program.disabilityFocus.includes(filterFocus)
      );
    }
    
    // Mode filter
    if (filterMode !== 'All Modes') {
      results = results.filter(program => program.mode === filterMode);
    }
    
    setFilteredPrograms(results);
  }, [searchQuery, filterType, filterFocus, filterMode]);

  // Handle registration form submit using Web3Forms
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setFormStatus('submitting');
    
    // Collect form data
    const formData = new FormData(formRef.current);
    formData.append("access_key", "3a535789-c361-48c3-a78c-c1330c51eea1");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setRegistrationSuccess(true);
        setFormStatus('idle');
        if (formRef.current) formRef.current.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const resetRegistration = () => {
    setRegistrationSuccess(false); 
    setIsRegistering(false); 
    setSelectedProgram(null);
    setFormStatus('idle');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <div 
        className="text-white pt-32 pb-24 rounded-b-[3rem] shadow-xl relative overflow-hidden"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-[fadeInUp_1s_ease-out_forwards]">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-[float_3s_ease-in-out_infinite]" style={{ animation: 'float 3s ease-in-out infinite' }}>
              Training Programs
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_forwards]" style={{ opacity: 0 }}>
              Free skills development to enhance independence and employment opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-8">
        {/* Results Info */}
        <ScrollAnimation delay={100}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Available Programs</h2>
            <span className="text-gray-500 font-medium">
              {filteredPrograms.length} Result{filteredPrograms.length !== 1 ? 's' : ''}
            </span>
          </div>
        </ScrollAnimation>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPrograms.map((program, index) => {
            const Icon = getCategoryIcon(program.category);
            
            return (
              <AnimatedCard key={program.id} index={index}>
                <div onClick={() => setSelectedProgram(program)} className="cursor-pointer">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-gray-200 group-hover:bg-primary group-hover:text-white transition-all duration-300 hover:rotate-6">
                        <Icon size={24} />
                      </div>
                      <Badge color={program.mode === 'Online' ? 'bg-green-100 text-green-700 border-green-200' : program.mode === 'In-Person' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-purple-100 text-purple-700 border-purple-200'}>
                        {program.mode === 'Online' ? <Video size={12} className="mr-1 inline"/> : <MapPin size={12} className="mr-1 inline"/>}
                        {program.mode}
                      </Badge>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {program.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mt-1 line-clamp-2">
                          {program.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Clock size={16} className="text-gray-400" /> 
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Calendar size={16} className="text-gray-400" /> 
                          <span>{program.schedule}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
                        {program.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {program.disabilityFocus.slice(0, 2).map((focus) => (
                          <span key={focus} className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 hover:scale-110 transition-transform duration-200">
                            {focus}
                          </span>
                        ))}
                        {program.disabilityFocus.length > 2 && (
                          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 hover:scale-110 transition-transform duration-200">
                            +{program.disabilityFocus.length - 2} more
                          </span>
                        )}
                      </div>

                      <Button variant="outline" className="w-full mt-auto group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Training Formats */}
        <ScrollAnimation delay={200}>
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-[float_4s_ease-in-out_infinite]" style={{ animation: 'float 4s ease-in-out infinite' }}>
              Flexible Learning Formats
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-10 rounded-3xl shadow-md text-center border-t-8 border-blue-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl opacity-0 translate-y-8 animate-[slideUp_0.6s_ease-out_0.2s_forwards]">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-8 animate-[bounce_2s_ease-in-out_infinite]">
                  <MapPin size={32} className="text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">In-Person</h3>
                <p className="text-gray-600 leading-relaxed">Interactive sessions at our fully accessible centers with hands-on support and peer networking.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-md text-center border-t-8 border-green-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl opacity-0 translate-y-8 animate-[slideUp_0.6s_ease-out_0.4s_forwards]">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8 animate-[bounce_2s_ease-in-out_infinite_0.5s]">
                  <Video size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Online Live</h3>
                <p className="text-gray-600 leading-relaxed">Virtual classrooms with real-time instruction accessible from the comfort of your home.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-md text-center border-t-8 border-purple-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl opacity-0 translate-y-8 animate-[slideUp_0.6s_ease-out_0.6s_forwards]">
                <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-8 animate-[bounce_2s_ease-in-out_infinite_1s]">
                  <BookOpen size={32} className="text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Self-Paced</h3>
                <p className="text-gray-600 leading-relaxed">Access pre-recorded modules and materials anytime via our accessible learning portal.</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Success Story */}
        <ScrollAnimation delay={300}>
          <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl mb-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 animate-[float_6s_ease-in-out_infinite_2s]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <div className="w-56 h-56 rounded-full bg-gray-200 mx-auto border-8 border-white/10 shadow-2xl flex items-center justify-center text-gray-900 text-7xl overflow-hidden animate-[spinSlow_20s_linear_infinite]">
                  <Users size={80} className="text-gray-400" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <div className="text-yellow-300 text-5xl mb-6 opacity-80">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed text-white/90 animate-[fadeIn_1s_ease-out_forwards]">
                  "The digital literacy training completely transformed my outlook. I gained the skills to work remotely, and now I'm successfully employed as a customer service representative."
                </p>
                <div className="opacity-0 animate-[slideInLeft_0.6s_ease-out_0.5s_forwards]">
                  <h4 className="text-2xl font-bold text-white">Maria Santos</h4>
                  <p className="text-blue-300 font-medium uppercase tracking-wider text-sm mt-1">Program Graduate, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* PROGRAM DETAILS MODAL */}
      <Modal isOpen={!!selectedProgram && !isRegistering} onClose={() => setSelectedProgram(null)} title="Program Details">
        {selectedProgram && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-[fadeIn_0.6s_ease-out_forwards]">
              <Badge color="bg-blue-100 text-blue-700 border-blue-200 mb-3 animate-[bounce_1s_ease-in-out_infinite]">
                {selectedProgram.category}
              </Badge>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 animate-[slideInLeft_0.5s_ease-out_forwards]">
                {selectedProgram.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 animate-[fadeInUp_0.4s_ease-out_forwards]">
                  <Clock size={16} className="text-blue-500"/> {selectedProgram.duration}
                </span>
                <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 animate-[fadeInUp_0.4s_ease-out_0.1s_forwards]">
                  <Calendar size={16} className="text-blue-500"/> {selectedProgram.schedule}
                </span>
                <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 animate-[fadeInUp_0.4s_ease-out_0.2s_forwards]">
                  {selectedProgram.mode === 'Online' ? <Video size={16} className="text-green-500"/> : <MapPin size={16} className="text-blue-500"/>} 
                  {selectedProgram.mode}
                </span>
              </div>
            </div>

            {/* Description & Eligibility */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="opacity-0 animate-[slideInLeft_0.5s_ease-out_0.2s_forwards]">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                    <Info size={20} className="text-gray-400"/> Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedProgram.description}
                  </p>
                </div>
                
                <div className="opacity-0 animate-[slideInLeft_0.5s_ease-out_0.3s_forwards]">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                    <User size={20} className="text-gray-400"/> Eligibility
                  </h3>
                  <p className="text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
                    {selectedProgram.eligibility}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="opacity-0 animate-[slideInRight_0.5s_ease-out_0.2s_forwards]">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                    <BookOpen size={20} className="text-gray-400"/> Materials Provided
                  </h3>
                  <ul className="space-y-2">
                    {selectedProgram.materials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-sm opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 100}ms` }}>
                        <CheckCircle size={16} className="text-green-500 shrink-0" /> {mat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="opacity-0 animate-[slideInRight_0.5s_ease-out_0.3s_forwards]">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                    <Accessibility size={20} className="text-gray-400"/> Accessibility Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProgram.accessibility.map((acc, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-sm opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 100 + 200}ms` }}>
                        <Star size={16} className="text-yellow-500 shrink-0" /> {acc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4 opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]">
              <Button variant="ghost" onClick={() => setSelectedProgram(null)}>Close</Button>
              <Button onClick={() => setIsRegistering(true)} className="px-8 text-lg bg-blue-500 text-white hover:bg-blue-600 animate-[pulse_2s_ease-in-out_infinite]">
                Enroll Now <ArrowRight size={18} className="ml-2"/>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* REGISTRATION MODAL */}
      <Modal isOpen={isRegistering} onClose={() => setIsRegistering(false)} title="Program Enrollment">
        {registrationSuccess ? (
          <div className="text-center py-12 px-4">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-[spin_1s_linear, bounce_0.5s_ease-out_0.6s]">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
              Application Submitted!
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
              Thank you for applying to <strong>{selectedProgram?.title}</strong>. We'll contact you shortly.
            </p>
            <Button 
              onClick={resetRegistration} 
              className="w-full bg-blue-500 text-white hover:bg-blue-600 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]"
            >
              Back to Programs
            </Button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-4 animate-[fadeIn_0.6s_ease-out_forwards]">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-500 border border-blue-200 shrink-0">
                <Briefcase size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{selectedProgram?.title}</h4>
                <p className="text-xs text-gray-500">{selectedProgram?.category} • {selectedProgram?.mode}</p>
              </div>
            </div>

            {/* Hidden fields for context and Web3Forms */}
            <input type="hidden" name="program_title" value={selectedProgram?.title || ''} />
            <input type="hidden" name="program_category" value={selectedProgram?.category || ''} />
            <input type="hidden" name="program_mode" value={selectedProgram?.mode || ''} />
            <input type="hidden" name="subject" value={`New Enrollment: ${selectedProgram?.title}`} />
            {/* access_key is added dynamically in handleRegisterSubmit */}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 opacity-0 animate-[slideInLeft_0.5s_ease-out_forwards]">
                <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                <input required type="text" name="first_name" className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02]" placeholder="Juan" />
              </div>
              <div className="space-y-2 opacity-0 animate-[slideInRight_0.5s_ease-out_forwards]">
                <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                <input required type="text" name="last_name" className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02]" placeholder="Dela Cruz" />
              </div>
            </div>

            <div className="space-y-2 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.1s_forwards]">
              <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
              <input required type="email" name="user_email" className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02]" placeholder="juan@example.com" />
            </div>

            <div className="space-y-2 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.1s_forwards]">
              <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
              <input type="tel" name="phone" className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02]" placeholder="+63 912 345 6789" />
            </div>

            <div className="space-y-2 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.2s_forwards]">
              <label className="text-xs font-bold text-gray-500 uppercase">Disability Type (For Accommodation)</label>
              <select name="disability_type" className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02] cursor-pointer">
                <option value="">Select Disability Type...</option>
                <option value="Visual Impairment">Visual Impairment</option>
                <option value="Hearing Impairment">Hearing Impairment</option>
                <option value="Mobility Impairment">Mobility Impairment</option>
                <option value="Cognitive/Learning">Cognitive/Learning</option>
                <option value="Speech Impairment">Speech Impairment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.3s_forwards]">
              <label className="text-xs font-bold text-gray-500 uppercase">Specific Accommodations / Message</label>
              <textarea name="message" rows={2} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02] resize-none" placeholder="Any questions or accommodation needs..."></textarea>
            </div>

            <div className="pt-4 flex gap-3 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.4s_forwards] flex-col">
              <div className="flex gap-3">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsRegistering(false)} disabled={formStatus === 'submitting'}>Cancel</Button>
                <Button type="submit" disabled={formStatus === 'submitting'} className="flex-[2] text-lg font-bold bg-blue-500 text-white hover:bg-blue-600 animate-[pulse_2s_ease-in-out_infinite]">
                  {formStatus === 'submitting' ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </div>
              {formStatus === 'error' && (
                <p className="text-center text-red-500 text-sm font-medium mt-2">
                  Failed to submit. Please try again.
                </p>
              )}
            </div>
          </form>
        )}
      </Modal>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default ProgramsPage;
