
"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import type React from "react"
import { useState, useRef } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "@/components/reveal"

import {
  Briefcase,
  GraduationCap,
  Info,
  Scale,
  Heart,
  Monitor,
  HandHeart,
  Star,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Section {
  title: string
  items?: string[]
  content?: string
}

// Update the iconMap
const iconMap = {
  "search": Search,
  "user-tie": Briefcase,
  "graduation-cap": GraduationCap,
  "building": Building2,
  "laptop": Laptop,
  "hands-helping": HelpingHand,
  "info-circle": Info,
  "balance-scale": Scale,
  "heartbeat": Heart,
  "briefcase": Briefcase,
  "laptop-code": Monitor,
  "map-marked-alt": MapPin, // Add this line
} as const

interface FeatureCard {
  title: string
  icon: string
  description: string
  items?: string[]
  type?: string
  action?: string
  actionIcon?: string
  sections?: Section[]
}

interface Stat {
  label: string
  value: string
}

interface Job {
  id: string
  title: string
  company: string
  type: string
  location: string
  description: string
  requirements: string
  posted: string
  category: string
  modalId: string
}

interface Testimonial {
  quote: string
  author: string
  role: string
}

interface ServiceDetail {
  id: string
  title: string
  subtitle: string
  color: string
  bgColor: string
  features: FeatureCard[]
  stats?: Stat[]
  jobListings?: Job[]
  about?: { title: string; paragraphs: string[] }
  testimonials?: Testimonial[]
}

interface SignData {
  id: string
  title: string
  label: string
  type: "image" | "video"
  src: string
}

interface GrantOpportunity {
  id: string
  title: string
  description: string
  provider: string
  amount: string
  deadline: string
  tags: string[]
  category: "government" | "private" | "university" | "international"
  modalContent: {
    provider: string
    amount: string
    deadline: string
    category: string
    description: string
    eligibility: string[]
    applicationProcess: string[]
    contact: string
  }
}

interface GrantResource {
  id: string
  title: string
  description: string
  image: string
  modalContent: {
    title: string
    description?: string
    sections: { title: string; content?: string; items?: string[] }[]
  }
}

interface Provider {
  id: string
  name: string
  specialty: string
  location: string
  category: "general" | "specialists" | "therapists"
  schedule: string
  languages: string[]
  services: string[]
  bio: {
    about: string
    education: string
    experience: string
  }
  icon: string
}

const telemedicineProviders: Provider[] = [
  {
    id: "maria-modal",
    name: "Dr. Maria Santos",
    specialty: "General Practitioner",
    location: "Manila",
    category: "general",
    schedule: "Mon-Fri, 9AM-5PM",
    languages: ["English", "Filipino", "Sign Language"],
    services: ["General Consultation", "Prescription Refills", "Health Assessment"],
    bio: {
      about: "Dr. Santos is a dedicated general practitioner with special training in providing healthcare services to persons with disabilities. She is fluent in sign language and has adapted her practice to be fully accessible.",
      education: "MD, University of the Philippines Manila",
      experience: "15 years of experience in general practice",
    },
    icon: "user-md",
  },
  {
    id: "juan-modal",
    name: "Dr. Juan Dela Cruz",
    specialty: "General Practitioner",
    location: "Cebu",
    category: "general",
    schedule: "Mon-Sat, 8AM-6PM",
    languages: ["English", "Cebuano", "Filipino"],
    services: ["General Consultation", "Medical Certificate", "Health Advice"],
    bio: {
      about: "Dr. Dela Cruz has been serving the Cebu community for over a decade. He has a special interest in providing accessible healthcare to underserved communities and persons with disabilities.",
      education: "MD, Cebu Institute of Medicine",
      experience: "12 years of experience in general practice",
    },
    icon: "user-md",
  },
  {
    id: "ana-modal",
    name: "Dr. Ana Reyes",
    specialty: "General Practitioner",
    location: "Davao",
    category: "general",
    schedule: "Tue-Sun, 10AM-7PM",
    languages: ["English", "Filipino"],
    services: ["General Consultation", "Prescription Refills", "Follow-up Care"],
    bio: {
      about: "Dr. Reyes is known for her compassionate approach to patient care. She has undergone additional training in telemedicine to better serve patients with mobility challenges.",
      education: "MD, Davao Medical School Foundation",
      experience: "10 years of experience in general practice",
    },
    icon: "user-md",
  },
  {
    id: "roberto-modal",
    name: "Dr. Roberto Garcia",
    specialty: "Cardiologist",
    location: "Manila",
    category: "specialists",
    schedule: "Mon-Fri, 10AM-4PM",
    languages: ["English", "Filipino"],
    services: ["Heart Consultation", "ECG Interpretation", "Cardiac Rehabilitation"],
    bio: {
      about: "Dr. Garcia is a renowned cardiologist with expertise in managing heart conditions in patients with disabilities. He has developed specialized protocols for remote cardiac monitoring.",
      education: "MD, Philippine General Hospital; Cardiology Fellowship, St. Luke's Medical Center",
      experience: "20 years of experience in cardiology",
    },
    icon: "heartbeat",
  },
  {
    id: "liza-modal",
    name: "Dr. Liza Fernandez",
    specialty: "Neurologist",
    location: "Quezon City",
    category: "specialists",
    schedule: "Mon, Wed, Fri, 9AM-3PM",
    languages: ["English", "Filipino", "Sign Language"],
    services: ["Neurological Consultation", "EEG Interpretation", "Neurological Assessment"],
    bio: {
      about: "Dr. Fernandez specializes in neurological conditions that affect persons with disabilities. She is fluent in sign language and has adapted her practice to be fully accessible to all patients.",
      education: "MD, University of the Philippines Manila; Neurology Fellowship, Philippine General Hospital",
      experience: "18 years of experience in neurology",
    },
    icon: "brain",
  },
  {
    id: "miguel-modal",
    name: "Dr. Miguel Lopez",
    specialty: "Orthopedic Surgeon",
    location: "Makati",
    category: "specialists",
    schedule: "Tue-Thu, 1PM-6PM",
    languages: ["English", "Filipino"],
    services: ["Orthopedic Consultation", "Post-surgical Follow-up", "Rehabilitation Planning"],
    bio: {
      about: "Dr. Miguel Lopez has extensive experience in treating musculoskeletal conditions in persons with disabilities. He focuses on non-surgical approaches when possible and provides comprehensive rehabilitation planning.",
      education: "MD, University of Santo Tomas; Orthopedic Surgery Residency, Makati Medical Center",
      experience: "15 years of experience in orthopedic surgery",
    },
    icon: "bone",
  },
  {
    id: "cristina-modal",
    name: "Ms. Cristina Pineda",
    specialty: "Physical Therapist",
    location: "Manila",
    category: "therapists",
    schedule: "Mon-Fri, 8AM-5PM",
    languages: ["English", "Filipino"],
    services: ["Physical Therapy", "Rehabilitation Exercises", "Pain Management"],
    bio: {
      about: "Ms. Pineda specializes in physical therapy for persons with disabilities. She has developed innovative remote therapy techniques that patients can perform at home with minimal equipment.",
      education: "BS Physical Therapy, University of the Philippines Manila",
      experience: "12 years of experience in physical therapy",
    },
    icon: "wheelchair",
  },
  {
    id: "antonio-modal",
    name: "Mr. Antonio Morales",
    specialty: "Speech Therapist",
    location: "Pasig",
    category: "therapists",
    schedule: "Mon, Wed, Fri, 9AM-4PM",
    languages: ["English", "Filipino", "Sign Language"],
    services: ["Speech Therapy", "Communication Skills", "Swallowing Therapy"],
    bio: {
      about: "Mr. Morales is a certified speech-language pathologist with expertise in working with persons with communication disabilities. He is fluent in sign language and has adapted her practice to be fully accessible to all patients.",
      education: "BS Speech Pathology, University of the Philippines Manila",
      experience: "10 years of experience in speech therapy",
    },
    icon: "comments",
  },
  {
    id: "rosalinda-modal",
    name: "Ms. Rosalinda Santiago",
    specialty: "Occupational Therapist",
    location: "Mandaluyong",
    category: "therapists",
    schedule: "Tue-Thu, 10AM-6PM",
    languages: ["English", "Filipino"],
    services: ["Occupational Therapy", "Daily Living Skills", "Adaptive Equipment"],
    bio: {
      about: "Ms. Santiago helps persons with disabilities develop the skills needed for daily living and working. She has extensive knowledge of adaptive equipment and home modifications to improve accessibility.",
      education: "BS Occupational Therapy, University of Santo Tomas",
      experience: "14 years of experience in occupational therapy",
    },
    icon: "hands",
  },
]

const grantOpportunities: GrantOpportunity[] = [
  {
    id: "ched-modal",
    title: "CHED Tulong Dunong Program",
    description: "Financial assistance for students in tertiary education, including PWD students.",
    provider: "Commission on Higher Education",
    amount: "Up to ₱60,000",
    deadline: "May 31, 2023",
    tags: ["Tertiary", "Financial Aid", "Nationwide"],
    category: "government",
    modalContent: {
      provider: "Commission on Higher Education",
      amount: "Up to ₱60,000",
      deadline: "May 31, 2023",
      category: "Government",
      description: "Financial assistance for students in tertiary education, including PWD students.",
      eligibility: [
        "Must be a Filipino citizen",
        "Must have a valid PWD ID or certificate of disability",
        "Must meet academic requirements (varies by scholarship)",
        "Must demonstrate financial need (for need-based scholarships)",
      ],
      applicationProcess: [
        "Complete the application form",
        "Submit required documents",
        "Attend interview (if required)",
        "Wait for notification of results",
      ],
      contact: "For more information about this scholarship, please contact the provider directly.",
    },
  },
  {
    id: "dost-modal",
    title: "DOST-SEI Scholarship",
    description: "Science and technology scholarships for qualified students including PWDs.",
    provider: "Department of Science and Technology",
    amount: "Tuition + Stipend",
    deadline: "August 31, 2023",
    tags: ["STEM", "Undergraduate", "Nationwide"],
    category: "government",
    modalContent: {
      provider: "Department of Science and Technology",
      amount: "Tuition + Stipend",
      deadline: "August 31, 2023",
      category: "Government",
      description: "Science and technology scholarships for qualified students including PWDs.",
      eligibility: [
        "Must be a Filipino citizen",
        "Must have a certified PWD ID or certificate of disability",
        "Must meet academic requirements (varies by scholarship)",
        "Must demonstrate financial need (for need-based scholarships)",
      ],
      applicationProcess: [
        "Complete the application form",
        "Submit required documents",
        "Attend interview (if required)",
        "Wait for notification of results",
      ],
      contact: "For more information about this scholarship, please contact the provider directly.",
    },
  },
  {
    id: "gawad-modal",
    title: "Gawad Metronian Educational Foundation",
    description: "Scholarship program for deserving students with disabilities.",
    provider: "Metropolitan Bank & Trust Company",
    amount: "Tuition + Allowance",
    deadline: "June 15, 2023",
    tags: ["Undergraduate", "Financial Aid", "Metro Manila"],
    category: "private",
    modalContent: {
      provider: "Metropolitan Bank & Trust Company",
      amount: "Tuition + Allowance",
      deadline: "June 15, 2023",
      category: "Private",
      description: "Scholarship program for deserving students with disabilities.",
      eligibility: [
        "Must be a Filipino citizen",
        "Must have a certified PWD ID or certificate of disability",
        "Must meet academic requirements (varies by scholarship)",
        "Must demonstrate financial need (for need-based scholarships)",
      ],
      applicationProcess: [
        "Complete the application form",
        "Submit required documents",
        "Attend interview (if required)",
        "Wait for notification of results",
      ],
      contact: "For more information about this scholarship, please contact the provider directly.",
    },
  },
  {
    id: "pwd-modal",
    title: "UP PWD Scholarship Grant",
    description: "Special scholarship for PWD students at the University of the Philippines system.",
    provider: "University of the Philippines",
    amount: "Full Tuition + Stipend",
    deadline: "April 30, 2023",
    tags: ["University", "Full Scholarship", "UP System"],
    category: "university",
    modalContent: {
      provider: "University of the Philippines",
      amount: "Full Tuition + Stipend",
      deadline: "April 30, 2023",
      category: "University",
      description: "Special scholarship for PWD students at the University of the Philippines system.",
      eligibility: [
        "Must be a Filipino citizen",
        "Must have a certified PWD ID or certificate of disability",
        "Must meet academic requirements (varies by scholarship)",
        "Must demonstrate financial need (for need-based scholarships)",
      ],
      applicationProcess: [
        "Complete the application form",
        "Submit required documents",
        "Attend interview (if required)",
        "Wait for notification of results",
      ],
      contact: "For more information about this scholarship, please contact the provider directly.",
    },
  },
  {
    id: "dlsu-modal",
    title: "DLSU PWD Grant",
    description: "Financial assistance for PWD students at De La Salle University.",
    provider: "De La Salle University",
    amount: "Partial to Full Tuition",
    deadline: "May 15, 2023",
    tags: ["University", "Tuition", "Metro Manila"],
    category: "university",
    modalContent: {
      provider: "De La Salle University",
      amount: "Partial to Full Tuition",
      deadline: "May 15, 2023",
      category: "University",
      description: "Financial assistance for PWD students at De La Salle University.",
      eligibility: [
        "Must be a Filipino citizen",
        "Must have a certified PWD ID or certificate of disability",
        "Must meet academic requirements (varies by scholarship)",
        "Must demonstrate financial need (for need-based scholarships)",
      ],
      applicationProcess: [
        "Complete the application form",
        "Submit required documents",
        "Attend interview (if required)",
        "Wait for notification of results",
      ],
      contact: "For more information about this scholarship, please contact the provider directly.",
    },
  },
  {
    id: "ford-modal",
    title: "Ford Foundation International Fellowships",
    description: "Fellowships for social justice leaders, including PWD advocates.",
    provider: "Ford Foundation",
    amount: "Full Funding",
    deadline: "July 31, 2023",
    tags: ["Graduate", "International", "Leadership"],
    category: "international",
    modalContent: {
      provider: "Ford Foundation",
      amount: "Full Funding",
      deadline: "July 31, 2023",
      category: "International",
      description: "Fellowships for social justice leaders, including PWD advocates.",
      eligibility: [
        "Must be a Filipino citizen",
        "Must have a certified PWD ID or certificate of disability",
        "Must meet academic requirements (varies by scholarship)",
        "Must demonstrate financial need (for need-based scholarships)",
      ],
      applicationProcess: [
        "Complete the application form",
        "Submit required documents",
        "Attend interview (if required)",
        "Wait for notification of results",
      ],
      contact: "For more information about this scholarship, please contact the provider directly.",
    },
  },
]

const grantResources: GrantResource[] = [
  {
    id: "application-modal",
    title: "Application Guide",
    description: "Step-by-step guide to preparing and submitting scholarship applications for PWD students.",
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    modalContent: {
      title: "Scholarship Application Guide",
      sections: [
        {
          title: "Step 1: Prepare Your Documents",
          content: "Before applying for any scholarship, make sure you have the following documents ready:",
          items: [
            "Valid ID with photo",
            "PWD ID or certificate of disability",
            "Transcript of records or report cards",
            "Certificate of good moral character",
            "Income tax return of parents/guardian (if applicable)",
            "Birth certificate",
          ],
        },
        {
          title: "Step 2: Research Eligibility Requirements",
          content: "Carefully review the eligibility criteria for each scholarship you're interested in. Pay attention to:",
          items: [
            "Academic requirements (GPA, honors, etc.)",
            "Financial need criteria",
            "Specific disability requirements",
            "Field of study restrictions",
            "Geographic limitations",
          ],
        },
        {
          title: "Step 3: Complete the Application Form",
          content: "Fill out the application form completely and accurately. Double-check for any errors before submission.",
        },
        {
          title: "Step 4: Write a Compelling Personal Statement",
          content: "Your personal statement is your chance to stand out. Be sure to:",
          items: [
            "Highlight your academic achievements",
            "Explain your career goals",
            "Discuss how the scholarship will help you achieve those goals",
            "Share your personal story as a PWD student",
          ],
        },
        {
          title: "Step 5: Submit Before the Deadline",
          content: "Submit your application well before the deadline to avoid any last-minute issues.",
        },
      ],
    },
  },
  {
    id: "legal-modal",
    title: "Legal Rights & Policies",
    description: "Understanding your rights as a PWD student in the Philippines and relevant educational policies.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    modalContent: {
      title: "Legal Rights & Policies for PWD Students",
      sections: [
        {
          title: "Republic Act No. 7277 (Magna Carta for Disabled Persons)",
          content: "This law provides for the rehabilitation, self-development, and self-reliance of disabled persons and their integration into the mainstream of society. Key provisions include:",
          items: [
            "Equal opportunity for employment",
            "Access to quality education",
            "Auxiliary social services",
            "Telecommunications",
            "Political rights",
          ],
        },
        {
          title: "Republic Act No. 9442 (Amendment to the Magna Carta for Disabled Persons)",
          content: "This act amended RA 7277 by adding more privileges and incentives for PWDs, including:",
          items: [
            "20% discount on medical and dental services",
            "20% discount on transportation fares",
            "20% discount on hotels and restaurants",
            "20% discount on admission fees to theaters, cinemas, and similar places",
            "Educational assistance to PWD students",
          ],
        },
        {
          title: "CHED Memorandum Order No. 14 Series of 2013",
          content: "This memorandum order provides for the implementation of the UN Convention on the Rights of Persons with Disabilities in higher education institutions.",
        },
        {
          title: "DepEd Order No. 72 Series of 2009",
          content: "This order institutionalizes inclusive education by establishing the Special Education (SPED) Centers in all schools divisions.",
        },
      ],
    },
  },
  {
    id: "success-modal",
    title: "Success Stories",
    description: "Inspiring stories from PWD students who have successfully secured scholarships and completed their education.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    modalContent: {
      title: "Success Stories",
      sections: [
        {
          title: "Maria's Journey: From Public School to Scholar",
          content: "Maria, a visually impaired student from a low-income family in Cebu, dreamed of becoming a teacher. Despite financial challenges, she excelled academically in high school. With the help of the CHED Tulong Dunong Program, Maria was able to enroll at Cebu Normal University. Today, she's a licensed special education teacher, inspiring other PWD students to pursue their dreams.",
        },
        {
          title: "John's Path to Engineering",
          content: "John, who uses a wheelchair, always had a passion for engineering. He faced accessibility challenges in his community but never let that stop him. Through the DOST-SEI Scholarship, John pursued a degree in Mechanical Engineering at the University of the Philippines Diliman. He graduated with honors and now works as an accessibility consultant, helping design more inclusive spaces.",
        },
        {
          title: "Ana's Advocacy Through Law",
          content: "Born with a hearing impairment, Ana experienced firsthand the challenges PWDs face in accessing justice. Determined to make a difference, she applied for and received the Gawad Metronian Educational Foundation scholarship. Ana graduated from Ateneo de Manila Law School and now specializes in disability rights law, advocating for policy changes that benefit the PWD community.",
        },
        {
          title: "Carlos' Tech Innovation",
          content: "Carlos, a student with autism spectrum disorder, has exceptional skills in computer programming. With support from the DLSU PWD Grant, he pursued a degree in Computer Science. Carlos developed an app that helps non-verbal individuals communicate, which has been adopted by special education centers across the country. He continues to innovate in the assistive technology space.",
        },
      ],
    },
  },
  {
    id: "support-modal",
    title: "Support Services",
    description: "Information on support services available for PWD students in educational institutions across the Philippines.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    modalContent: {
      title: "Support Services for PWD Students",
      sections: [
        {
          title: "Academic Support Services",
          items: [
            "Learning Resource Centers: Many universities have dedicated centers that provide academic support, tutoring, and assistive technology for PWD students.",
            "Note-taking Services: Some institutions provide peer note-takers or access to lecture recordings for students who have difficulty taking notes.",
            "Extended Time for Exams: PWD students may be eligible for additional time during examinations.",
            "Alternative Formats: Educational materials in Braille, large print, audio, or digital formats.",
          ],
        },
        {
          title: "Physical Accessibility",
          items: [
            "Ramps and Elevators: Accessible routes throughout campus buildings.",
            "Accessible Restrooms: Facilities designed for wheelchair users.",
            "Signage: Braille and tactile signage for visually impaired students.",
            "Transportation: Accessible campus transportation services.",
          ],
        },
        {
          title: "Counseling and Mental Health Services",
          items: [
            "Personal Counseling: Support for adjusting to college life and managing stress.",
            "Career Counseling: Guidance on career paths and job search strategies.",
            "Peer Support Groups: Opportunities to connect with other PWD students.",
          ],
        },
        {
          title: "Assistive Technology",
          items: [
            "Screen Readers: Software that converts text to speech for visually impaired students.",
            "Speech Recognition: Software that converts speech to text for students with mobility impairments.",
            "Hearing Assistance Systems: FM systems and captioning services for deaf or hard-of-hearing students.",
            "Adaptive Computer Equipment: Specialized keyboards, mice, and other input devices.",
          ],
        },
      ],
    },
  },
]

const employmentJobs: Job[] = [
  {
    id: "customer",
    title: "Customer Service Representative",
    company: "Global Connect Inc.",
    type: "Full-time",
    location: "Remote",
    description: "Provide excellent customer service through various channels. Accommodations available for persons with hearing or speech impairments.",
    requirements: "Excellent communication skills, customer-oriented, basic computer knowledge.",
    posted: "2 days ago",
    category: "Customer Service",
    modalId: "customer-modal",
  },
  {
    id: "developer",
    title: "Web Developer",
    company: "Tech Innovations PH",
    type: "Full-time",
    location: "Makati City",
    description: "Develop and maintain web applications. Flexible work arrangements and accessibility tools provided.",
    requirements: "Proficiency in HTML, CSS, JavaScript. Experience with responsive design.",
    posted: "1 week ago",
    category: "IT",
    modalId: "developer-modal",
  },
  {
    id: "data",
    title: "Data Entry Specialist",
    company: "Info Solutions Ltd.",
    type: "Part-time",
    location: "Quezon City",
    description: "Accurate data entry and management. Adaptive equipment available as needed.",
    requirements: "Attention to detail, typing speed of 40+ WPM, basic computer skills.",
    posted: "3 days ago",
    category: "Admin",
    modalId: "data-modal",
  },
  {
    id: "graphic",
    title: "Graphic Designer",
    company: "Creative Minds Studio",
    type: "Freelance",
    location: "Remote",
    description: "Create visual concepts using software or by hand. Flexible deadlines and remote work options.",
    requirements: "Proficiency in download link software, creativity, ability to meet deadlines.",
    posted: "5 days ago",
    category: "Design",
    modalId: "graphic-modal",
  },
  {
    id: "content",
    title: "Content Writer",
    company: "Digital Marketing Pro",
    type: "Full-time",
    location: "Remote",
    description: "Create engaging content for various platforms. Flexible schedule and remote work arrangement.",
    requirements: "Excellent writing skills, creativity, research abilities.",
    posted: "1 week ago",
    category: "Marketing",
    modalId: "content-modal",
  },
  {
    id: "accounting",
    title: "Accounting Assistant",
    company: "Financial Services Corp",
    type: "Full-time",
    location: "BGC, Taguig",
    description: "Assist with financial record-keeping and reporting. Workplace accommodations available.",
    requirements: "Basic accounting knowledge, attention to detail, proficiency in spreadsheet software.",
    posted: "4 days ago",
    category: "Finance",
    modalId: "accounting-modal",
  },
]

const fslAlphabet: SignData[] = [
  { id: "a", title: "Letter A", label: "A", type: "image", src: "../vlog/A.jpg" },
  { id: "b", title: "Letter B", label: "B", type: "image", src: "../vlog/B.jpg" },
  { id: "c", title: "Letter C", label: "C", type: "image", src: "../vlog/C.jpg" },
  { id: "d", title: "Letter D", label: "D", type: "image", src: "../vlog/D.jpg" },
  { id: "e", title: "Letter E", label: "E", type: "image", src: "../vlog/E.jpg" },
  { id: "f", title: "Letter F", label: "F", type: "image", src: "../vlog/F.jpg" },
  { id: "g", title: "Letter G", label: "G", type: "image", src: "../vlog/G.jpg" },
  { id: "h", title: "Letter H", label: "H", type: "image", src: "../vlog/H.jpg" },
  { id: "i", title: "Letter I", label: "I", type: "image", src: "../vlog/I.jpg" },
  { id: "j", title: "Letter J", label: "J", type: "video", src: "../vlog/J.mp4" },
  { id: "k", title: "Letter K", label: "K", type: "image", src: "../vlog/K.jpg" },
  { id: "l", title: "Letter L", label: "L", type: "image", src: "../vlog/L.jpg" },
  { id: "m", title: "Letter M", label: "M", type: "image", src: "../vlog/M.jpg" },
  { id: "n", title: "Letter N", label: "N", type: "image", src: "../vlog/N.jpg" },
  { id: "o", title: "Letter O", label: "O", type: "image", src: "../vlog/O.jpg" },
  { id: "p", title: "Letter P", label: "P", type: "image", src: "../vlog/P.jpg" },
  { id: "q", title: "Letter Q", label: "Q", type: "image", src: "../vlog/Q.jpg" },
  { id: "r", title: "Letter R", label: "R", type: "image", src: "../vlog/R.jpg" },
  { id: "s", title: "Letter S", label: "S", type: "image", src: "../vlog/S.jpg" },
  { id: "t", title: "Letter T", label: "T", type: "image", src: "../vlog/T.jpg" },
  { id: "u", title: "Letter U", label: "U", type: "image", src: "../vlog/U.jpg" },
  { id: "v", title: "Letter V", label: "V", type: "image", src: "../vlog/V.jpg" },
  { id: "w", title: "Letter W", label: "W", type: "image", src: "../vlog/W.jpg" },
  { id: "x", title: "Letter X", label: "X", type: "image", src: "../vlog/X.jpg" },
  { id: "y", title: "Letter Y", label: "Y", type: "image", src: "../vlog/Y.jpg" },
  { id: "z", title: "Letter Z", label: "Z", type: "video", src: "../vlog/z.mp4" },
]

const fslNumbers: SignData[] = [
  { id: "1", title: "Number 1", label: "1", type: "image", src: "../vlog/1.jpg" },
  { id: "2", title: "Number 2", label: "2", type: "image", src: "../vlog/2.jpg" },
  { id: "3", title: "Number 3", label: "3", type: "image", src: "../vlog/3.jpg" },
  { id: "4", title: "Number 4", label: "4", type: "image", src: "../vlog/4.jpg" },
  { id: "5", title: "Number 5", label: "5", type: "image", src: "../vlog/5.jpg" },
  { id: "6", title: "Number 6", label: "6", type: "image", src: "../vlog/6.jpg" },
  { id: "7", title: "Number 7", label: "7", type: "image", src: "../vlog/7.jpg" },
  { id: "8", title: "Number 8", label: "8", type: "image", src: "../vlog/8.jpg" },
  { id: "9", title: "Number 9", label: "9", type: "image", src: "../vlog/9.jpg" },
  { id: "10", title: "Number 10", label: "10", type: "video", src: "../vlog/10.mp4" },
  { id: "11", title: "Number 11", label: "11", type: "video", src: "../vlog/11.mp4" },
  { id: "12", title: "Number 12", label: "12", type: "video", src: "../vlog/12.mp4" },
  { id: "13", title: "Number 13", label: "13", type: "video", src: "../vlog/13.mp4" },
  { id: "14", title: "Number 14", label: "14", type: "video", src: "../vlog/14.mp4" },
  { id: "15", title: "Number 15", label: "15", type: "video", src: "../vlog/15.mp4" },
  { id: "16", title: "Number 16", label: "16", type: "video", src: "../vlog/16.mp4" },
  { id: "17", title: "Number 17", label: "17", type: "video", src: "../vlog/17.mp4" },
  { id: "18", title: "Number 18", label: "18", type: "video", src: "../vlog/18.mp4" },
  { id: "19", title: "Number 19", label: "19", type: "video", src: "../vlog/19.mp4" },
  { id: "20", title: "Number 20", label: "20", type: "video", src: "../vlog/20.mp4" },
]

const fslGreetings: SignData[] = [
  { id: "Good morning", title: "Good morning", label: "Good morning", type: "video", src: "../vlog/Good morning.mp4" },
  { id: "Good afternoon", title: "Good afternoon", label: "Good afternoon", type: "video", src: "../vlog/Good afternoon.mp4" },
  { id: "Good evening", title: "Good evening", label: "Good evening", type: "video", src: "../vlog/Good evening.mp4" },
  { id: "Good night", title: "Good night", label: "Good night", type: "video", src: "../vlog/Good night.mp4" },
  { id: "Good noon", title: "Good noon", label: "Good noon", type: "video", src: "../vlog/Good noon.mp4" },
  { id: "Good day", title: "Good day", label: "Good day", type: "video", src: "../vlog/Good day.mp4" },
  { id: "Welcome", title: "Welcome", label: "Welcome", type: "video", src: "../vlog/Welcome.mp4" },
  { id: "Hi", title: "Hi", label: "Hi", type: "video", src: "../vlog/Hi.mp4" },
  { id: "Im fine", title: "Im fine", label: "Im fine", type: "video", src: "../vlog/I_m fine.mp4" },
  { id: "My name is", title: "My name is", label: "My name is", type: "video", src: "../vlog/My name is.mp4" },
  { id: "Whats your name", title: "Whats your name", label: "Whats your name", type: "video", src: "../vlog/What_s your name.mp4" },
  { id: "Nice to meet you", title: "Nice to meet you", label: "Nice to meet you", type: "video", src: "../vlog/Nice to meet you.mp4" },
  { id: "How are you", title: "How are you", label: "How are you", type: "video", src: "../vlog/How are you.mp4" },
  { id: "Its good to see", title: "Its good to see", label: "Its good to see", type: "video", src: "../vlog/It_s good to see.mp4" },
  { id: "Long time no see", title: "Long time no see", label: "Long time no see", type: "video", src: "../vlog/Long time no see.mp4" },
]

const fslFamily: SignData[] = [
  { id: "mother", title: "Mother", label: "Mother", type: "video", src: "../vlog/Mother.mp4" },
  { id: "father", title: "Father", label: "Father", type: "video", src: "../vlog/Father.mp4" },
  { id: "Old Brother", title: "Sister", label: "Sister", type: "video", src: "../vlog/Sister_.mp4" },
  { id: "brother", title: "Brother", label: "Brother", type: "video", src: "../vlog/Bother.mp4" },
  { id: "grandmother", title: "Grandmother", label: "Grandmother", type: "video", src: "../vlog/Grandmother_.mp4" },
  { id: "grandfather", title: "Grandfather", label: "Grandfather", type: "video", src: "../vlog/Grandfather_.mp4" },
  { id: "Mother-in-law", title: "Mother-in-law", label: "Mother-in-law", type: "video", src: "../vlog/Mother-in-law.mp4" },
  { id: "Father-in-law", title: "Father-in-law", label: "Father-in-law", type: "video", src: "../vlog/Father-in-law.mp4" },
  { id: "Sister-in-law", title: "Sister-in-law", label: "Sister-in-law", type: "video", src: "../vlog/Sister-in-law.mp4" },
  { id: "Brother-in-law", title: "Brother-in-law", label: "Brother-in-law", type: "video", src: "../vlog/Bother-in-law.mp4" },
  { id: "Step-mother", title: "Step-mother", label: "Step-mother", type: "video", src: "../vlog/Step mother.mp4" },
  { id: "Step-father", title: "Step-father", label: "Step-father", type: "video", src: "../vlog/Step father.mp4" },
  { id: "Step-sister", title: "Step-sister", label: "Step-sister", type: "video", src: "../vlog/Step sister_.mp4" },
  { id: "Step-brother", title: "Step-brother", label: "Step-brother", type: "video", src: "../vlog/Step brother_.mp4" },
]

const guidesContent: Record<string, { title: string; sections: { title: string; items: string[] }[] }> = {
  physical: {
    title: "Physical Access Guidelines",
    sections: [
      {
        title: "Ramps and Slopes",
        items: [
          "Maximum slope of 1:12 (8.33%) for permanent ramps",
          "Minimum clear width of 36 inches (915 mm)",
          "Level landings at top and bottom of each ramp run",
          "Handrails on both sides for ramps rising more than 6 inches",
        ],
      },
      {
        title: "Doorways and Entrances",
        items: [
          "Minimum clear opening width of 32 inches (815 mm)",
          "Door hardware operable with one hand and without tight grasping",
          "Thresholds no higher than 1/2 inch (13 mm)",
          "Maneuvering clearance on both sides of doors",
        ],
      },
      {
        title: "Elevators",
        items: [
          "Minimum car dimensions of 36 inches by 54 inches (915 mm x 1370 mm)",
          "Visual and audible floor indicators",
          "Controls mounted between 15 and 48 inches (380 mm and 1220 mm) above floor",
          "Emergency communication systems accessible to people with disabilities",
        ],
      },
    ],
  },
  facilities: {
    title: "Accessible Facilities Standards",
    sections: [
      {
        title: "Accessible Restrooms",
        items: [
          "Minimum clear floor space of 30x48 inches (760x1220 mm)",
          "Toilet seat height between 17-19 inches (430-485 mm)",
          "Grab bars on rear and side walls",
          "Accessible sinks with knee clearance and lever handles",
          "Mirror mounted with bottom edge no higher than 40 inches (1020 mm)",
        ],
      },
      {
        title: "Water Fountains",
        items: [
          "Spout height no higher than 36 inches (915 mm)",
          "Clear floor space of 30x48 inches (760x1220 mm)",
          "Operable controls requiring no more than 5 pounds of force",
          "At least 50% of drinking fountains must be accessible",
        ],
      },
      {
        title: "Public Amenities",
        items: [
          "Accessible seating dispersed throughout facilities",
          "Service counters with maximum height of 36 inches (915 mm)",
          "ATMs and payment terminals with accessible features",
          "Signage with high contrast and tactile characters",
        ],
      },
    ],
  },
  communication: {
    title: "Communication Access Guidelines",
    sections: [
      {
        title: "Visual Alarms",
        items: [
          "Visual alarm devices in all public and common areas",
          "Flashing lights synchronized with audible alarms",
          "Placement in sleeping rooms and restrooms",
          "Minimum intensity and coverage requirements",
        ],
      },
      {
        title: "Hearing Assistance Systems",
        items: [
          "Induction loops in assembly areas with fixed seating",
          "FM or infrared systems in theaters and conference rooms",
          "Clear signage indicating availability of assistive listening",
          "Staff trained on operation and maintenance",
        ],
      },
      {
        title: "Visual Communication",
        items: [
          "Visual displays for public announcements",
          "Text telephones (TTYs) in public facilities",
          "Video relay services where available",
          "Qualified interpreters for public events",
        ],
      },
    ],
  },
  public: {
    title: "Public Transit Accessibility",
    sections: [
      {
        title: "Bus Accessibility",
        items: [
          "Low-floor buses or wheelchair lifts",
          "Priority seating areas for seniors and people with disabilities",
          "Audio and visual stop announcements",
          "Secure wheelchair tie-downs",
          "Non-slip flooring and handrails",
        ],
      },
      {
        title: "Rail Systems",
        items: [
          "Level boarding platforms or boarding ramps",
          "Gap between platform and train no more than 3 inches",
          "Accessible cars with designated wheelchair spaces",
          "Visual and audible route information",
          "Emergency communication systems in each car",
        ],
      },
      {
        title: "Stations and Stops",
        items: [
          "Accessible pathways to all platforms",
          "Elevators or ramps for vertical access",
          "Tactile warning strips at platform edges",
          "Clear signage with high contrast",
          "Shelters with accessible seating",
        ],
      },
    ],
  },
  parking: {
    title: "Parking & Drop-off Guidelines",
    sections: [
      {
        title: "Accessible Parking Spaces",
        items: [
          "Minimum width of 96 inches (2440 mm) for van spaces",
          "Minimum width of 60 inches (1525 mm) for car spaces",
          "Access aisle at least 60 inches (1525 mm) wide",
          "Vertical clearance of at least 98 inches (2490 mm)",
          "Signage with International Symbol of Access",
        ],
      },
      {
        title: "Passenger Loading Zones",
        items: [
          "Minimum length of 20 feet (6100 mm)",
          "Adjacent to accessible entrance",
          "Level surface with maximum slope of 1:50",
          "Clear path of travel to building entrance",
          "Appropriate signage indicating accessibility",
        ],
      },
      {
        title: "Requirements and Ratios",
        items: [
          "1 space for 1-25 total parking spaces",
          "2 spaces for 26-50 total parking spaces",
          "3 spaces for 51-75 total parking spaces",
          "4 spaces for 76-100 total parking spaces",
          "1 in every 6 accessible spaces must be van accessible",
        ],
      },
    ],
  },
  pedestrian: {
    title: "Pedestrian Route Accessibility",
    sections: [
      {
        title: "Sidewalks and Pathways",
        items: [
          "Minimum clear width of 36 inches (915 mm)",
          "Maximum cross slope of 1:48 (2%)",
          "Running slope no steeper than 1:20 (5%)",
          "Stable, firm, and slip-resistant surface",
          "Obstacles detected by cane users",
        ],
      },
      {
        title: "Crosswalks",
        items: [
          "Accessible pedestrian signals (APS) at all signalized crossings",
          "Tactile warning strips at curb ramps",
          "Curb ramps with maximum slope of 1:12",
          "Minimum width of 48 inches (1220 mm)",
          "Clear detection zone for pedestrians",
        ],
      },
      {
        title: "Street Furniture and Obstacles",
        items: [
          "Objects protruding more than 4 inches must be cane detectable",
          "Clear headroom of at least 80 inches (2030 mm)",
          "Benches with armrests and back support",
          "Drinking fountains at accessible heights",
          "Trash receptacles placed outside path of travel",
        ],
      },
    ],
  },
  web: {
    title: "Web Development Accessibility",
    sections: [
      {
        title: "WCAG 2.1 Principles",
        items: [
          "Perceivable: Information must be presentable in ways users can perceive",
          "Operable: Interface components must be operable by all users",
          "Understandable: Information and UI operation must be understandable",
          "Robust: Content must be robust enough for various assistive technologies",
        ],
      },
      {
        title: "Semantic HTML",
        items: [
          "Use proper heading structure (h1-h6)",
          "Implement landmarks (header, nav, main, footer)",
          "Use form labels correctly",
          "Provide alternative text for images",
          "Use lists for list content",
        ],
      },
      {
        title: "ARIA Attributes",
        items: [
          "aria-label and aria-labelledby for descriptive labels",
          "aria-describedby for additional context",
          "aria-expanded for collapsible content",
          "aria-hidden to hide decorative content",
          "role attributes for custom components",
        ],
      },
      {
        title: "Keyboard Navigation",
        items: [
          "All functionality available via keyboard",
          "Visible focus indicators",
          "Logical tab order",
          "Skip links for bypassing blocks",
          "No keyboard traps",
        ],
      },
    ],
  },
  mobile: {
    title: "Mobile App Accessibility",
    sections: [
      {
        title: "iOS Accessibility Features",
        items: [
          "VoiceOver screen reader support",
          "Dynamic Type for adjustable text sizes",
          "Switch Control for motor accessibility",
          "Color filters and contrast adjustments",
          "Reduced motion preferences",
        ],
      },
      {
        title: "Android Accessibility Features",
        items: [
          "TalkBack screen reader",
          "Font size and display size adjustments",
          "Switch Access and Voice Access",
          "Color correction and high contrast",
          "Accessibility shortcuts",
        ],
      },
      {
        title: "Best Practices",
        items: [
          "Provide content descriptions for all images",
          "Ensure touch targets are at least 44x44 points",
          "Support both portrait and landscape orientations",
          "Use system fonts and text scaling",
          "Test with actual assistive technologies",
        ],
      },
    ],
  },
  documents: {
    title: "Documents & Media Accessibility",
    sections: [
      {
        title: "Accessible PDFs",
        items: [
          "Use proper heading structure and reading order",
          "Add alternative text for images and graphics",
          "Ensure proper tagging for screen readers",
          "Use sufficient color contrast for text",
        ],
      },
      {
        title: "Video Accessibility",
        items: [
          "Provide accurate captions for all dialogue and sound effects",
          "Include audio descriptions for visual information",
          "Offer transcripts for all video content",
          "Ensure player controls are accessible",
        ],
      },
      {
        title: "Image Guidelines",
        items: [
          "Describe the content and function of each image",
          "Keep descriptions concise but meaningful",
          "Use empty alt text for decorative images",
          "Include text alternatives for complex graphics",
        ],
      },
      {
        title: "Presentations",
        items: [
          "Use built-in slide templates",
          "Provide alt text for all images",
          "Use high contrast colors",
          "Include speaker notes with descriptions",
          "Provide accessible handouts",
        ],
      },
    ],
  },
}

const techContent: Record<
  string,
  { title: string; description: string; sections: { title: string; items: string[] }[]; resources: string[] }
> = {
  "mobility-modal": {
    title: "Mobility Aids",
    description: "Mobility aids are devices designed to help people with mobility impairments move around more freely. In the Philippines, various mobility aids are available to improve the quality of life for persons with disabilities.",
    sections: [
      {
        title: "Common Mobility Aids in the Philippines:",
        items: [
          "Wheelchairs: Manual and electric wheelchairs are available through government programs and private suppliers. Organizations like the Liliane Foundation and Wheelchair Mission provide wheelchairs to those in need.",
          "Walkers and Canes: Available in medical supply stores nationwide, with various designs to suit different needs.",
          "Prosthetics: Organizations like the Philippine Orthopedic Center and Steps Foundation provide affordable prosthetic limbs.",
          "Crutches: Available in hospitals, pharmacies, and medical supply stores.",
        ],
      },
    ],
    resources: [
      "Department of Social Welfare and Development (DSWD) assistance programs",
      "National Council on Disability Affairs (NCDA) referrals",
      "Local government units (LGUs) through their Persons with Affairs Offices (PDAO)",
      "Private medical supply stores in major cities",
      "Non-profit organizations specializing in disability services",
    ],
  },
  "visual-modal": {
    title: "Visual Aids",
    description: "Visual aids are technologies designed to assist individuals with visual impairments, helping them navigate their environment and access information more easily.",
    sections: [
      {
        title: "Common Visual Aids in the Philippines:",
        items: [
          "Screen Readers: Software like NVDA (free), JAWS, and built-in screen readers on smartphones and computers that convert text to speech.",
          "Magnifiers: Handheld magnifiers, electronic magnifiers, and screen magnification software.",
          "Braille Displays: Devices that convert digital text into Braille characters.",
          "White Canes: Essential tools for navigation, available through various organizations.",
          "Talking Watches and Clocks: Devices that announce the time audibly.",
        ],
      },
    ],
    resources: [
      "Resources for the Blind Inc. (RBI) - Provides various assistive devices and training",
      "Philippine Blind Union - Advocacy and support services",
      "Hospital-based low vision clinics in major hospitals",
      "ATI (Assistive Technology Inc.) - Supplier of assistive devices",
      "DSWD and NCDA assistance programs",
    ],
  },
  "hearing-modal": {
    title: "Hearing Aids",
    description: "Hearing aids are devices designed to improve hearing for individuals with hearing impairments. These devices amplify sound, making it easier for people with hearing loss to communicate and engage with their environment.",
    sections: [
      {
        title: "Common Hearing Aids in the Philippines:",
        items: [
          "Behind-the-Ear (BTE) Hearing Aids: Suitable for mild to profound hearing loss.",
          "In-the-Ear (ITE) Hearing Aids: Custom-made to fit inside the outer ear.",
          "Cochlear Implants: Electronic devices that provide a sense of sound to profoundly deaf individuals.",
          "FM Systems: Wireless systems that help people hear better in noisy situations or over distances.",
          "Personal Amplifiers: Small devices that amplify sound in specific situations.",
        ],
      },
    ],
    resources: [
      "Philippine Ear Institute (PEI) - Provides assessment and hearing aids",
      "Major hospitals with ENT departments and audiology services",
      "Private hearing centers like Phonak, Starkey, and Beltone",
      "Deaf Support organizations like the Philippine Federation of the Deaf",
      "Government assistance programs through DSWD and NCDA",
    ],
  },
  "cognitive-modal": {
    title: "Cognitive Aids",
    description: "Cognitive aids are tools designed to assist individuals with cognitive impairments, helping with memory, attention, organization, and other cognitive functions.",
    sections: [
      {
        title: "Common Cognitive Aids in the Philippines:",
        items: [
          "Reminder Systems: Electronic devices and apps that provide reminders for medication, appointments, and daily tasks.",
          "Organizers and Planners: Both physical and digital tools to help with scheduling and task management.</li>",
          "Memory Aids: Devices that record and play back information, such as voice recorders and smart pens.",
          "Attention-Focusing Tools: Apps and devices that help minimize distractions and improve focus.",
          "Cognitive Rehabilitation Software: Programs designed to improve cognitive functions through exercises.",
        ],
      },
    ],
    resources: [
      "Neurological centers in major hospitals like St. Luke's Medical Center and Makati Medical Center",
      "Special education centers that provide cognitive support tools",
      "Psychologists and occupational therapists who can recommend appropriate aids",
      "DSWD programs for persons with cognitive disabilities",
      "Online retailers that ship cognitive assistive devices to the Philippines",
    ],
  },
  "aids-modal": {
    title: "Communication Aids",
    description: "Communication aids are devices and systems that help individuals with speech or language difficulties communicate more effectively with others.",
    sections: [
      {
        title: "Common Communication Aids in the Philippines:",
        items: [
          "Speech-Generating Devices (SGDs): Electronic devices that produce speech for individuals who cannot speak.",
          "Picture Exchange Communication System (PECS): A system that uses pictures to facilitate communication.",
          "Communication Boards: Physical boards with symbols, letters, or words that users can point to.",
          "Eye-Gaze Systems: Advanced technology that allows users to control a computer or device using eye movements.",
          "Mobile Apps: Applications like Proloquo2Go and Avaz that turn tablets and smartphones into communication devices.",
        ],
      },
    ],
    resources: [
      "Philippine Association for Speech Pathologists",
      "SpEd centers in schools that provide communication support",
      "Organizations like Autism Society Philippines and Down Syndrome Association of the Philippines",
      "Hospitals with speech therapy departments",
      "DSWD and NCDA programs that provide communication aids",
    ],
  },
  "living-modal": {
    title: "Daily Living Aids",
    description: "Daily living aids are tools designed to assist individuals with disabilities in performing everyday activities such as eating, dressing, and bathing, promoting greater independence.",
    sections: [
      {
        title: "Common Daily Living Aids in the Philippines:",
        items: [
          "Eating Aids: Adaptive utensils, non-slip plates, and cups designed for easier handling.",
          "Dressing Aids: Button hooks, zipper pulls, and long-handled shoe horns.",
          "Bathing Aids: Shower chairs, bath lifts, and long-handled sponges.",
          "Toileting Aids: Raised toilet seats, grab bars, and commode chairs.",
          "Home Modification Tools: Reachers, adaptive light switches, and door openers.",
        ],
      },
    ],
    resources: [
      "Medical supply stores in major cities like Manila, Cebu, and Davao",
      "Hospitals and rehabilitation centers that sell or recommend daily living aids",
      "Online retailers that ship to the Philippines",
      "Organizations like the Philippine Society for Orphan Disorders Inc.",
      "DSWD and local government units that provide assistance for daily living aids",
    ],
  },
}

const customHeaderStyle = {
  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}

const mentalHealthResources = {
  hotlines: [
    {
      title: "National Crisis Hotlines",
      icon: "phone-alt",
      items: [
        { name: "National Center for Mental Health", value: "0917-899-USAP (8727)" },
        { name: "NCMH Crisis Hotline", value: "(02) 8989-8727" },
        { name: "Philippine Mental Health Association", value: "(02) 8929-5462" },
        { name: "InTouch Community Services", value: "(02) 8939-4601" },
      ],
    },
    {
      title: "Text & Chat Support",
      icon: "comments",
      items: [
        { name: "Nat'l Suicide Prevention Hotline", value: "2919 (Toll-free)" },
        { name: "Hopeline PH", value: "0917-558-4673" },
        { name: "Hopeline PH (Landline)", value: "(02) 804-4673" },
        { name: "Hopeline PH (Globe)", value: "0917-558-4673" },
      ],
    },
    {
      title: "Youth & Student Support",
      icon: "university",
      items: [
        { name: "UP Diliman Psychosocial Services", value: "(02) 8981-8500 loc. 4106" },
        { name: "Ateneo Center for Family Ministries", value: "(02) 8426-5981" },
        { name: "DLSU Center for Counseling Services", value: "(02) 524-4611 loc. 312" },
        { name: "UST Simbahayan Community Development", value: "(02) 8406-1611 loc. 4031" },
      ],
    },
  ],
  online: [
    {
      title: "Telehealth Platforms",
      icon: "laptop",
      content: [
        {
          name: "MedCheck",
          description: "Online mental health consultations with licensed psychiatrists and psychologists.",
        },
        {
          name: "NowServing",
          description: "Telehealth platform connecting patients with mental health professionals.",
        },
        { name: "KonsultaMD", description: "24/7 telehealth service with mental health specialists." },
        { name: "HealthNow", description: "Offers online counseling sessions with certified therapists." },
      ],
    },
    {
      title: "Mental Health Organizations",
      icon: "heartbeat",
      content: [
        { name: "MentalHealthPH", description: "Offers online counseling and support group sessions." },
        { name: "Philippine Mental Health Association", description: "Provides online counseling services." },
        {
          name: "InTouch Community Services",
          description: "Online counseling for individuals, couples, and families.",
        },
        { name: "YOUNG", description: "Youth-focused mental health organization with online counseling." },
      ],
    },
    {
      title: "Private Practitioners",
      icon: "user-md",
      description: "Many licensed psychologists and psychiatrists now offer online consultations. When choosing a private practitioner:",
      list: [
        "Verify their license with the Professional Regulation Commission",
        "Check reviews and recommendations",
        "Ask about their experience with your specific concerns",
        "Inquire about fees and session duration",
      ],
    },
  ],
  groups: [
    {
      title: "Community Support Groups",
      icon: "users",
      content: [
        {
          name: "MentalHealthPH Support Groups",
          description: "Online and in-person support groups for various mental health concerns.",
        },
        {
          name: "Depression and Anxiety Support Philippines",
          description: "Facebook-based community offering peer support.",
        },
        {
          name: "Bipolar Philippines",
          description: "Support group for individuals with bipolar disorder and their families.",
        },
        {
          name: "Emotional Baggage PH",
          description: "Community focused on emotional wellness and mental health support.",
        },
      ],
    },
    {
      title: "University-Based Support",
      icon: "graduation-cap",
      content: [
        { name: "UP Diliman Psychosocial Services", description: "Support groups for students and community members." },
        {
          name: "Ateneo Center for Family Ministries",
          description: "Various support groups for different life challenges.",
        },
        { name: "DLSU Center for Counseling Services", description: "Student-focused support groups and counseling." },
        { name: "UST Guidance and Counseling", description: "Support groups for students and staff members." },
      ],
    },
    {
      title: "Specialized Support",
      icon: "hands-helping",
      content: [
        {
          name: "National Association for Mental Health",
          description: "Support groups for various mental health conditions.",
        },
        {
          name: "Alcoholics Anonymous Philippines",
          description: "Support for individuals struggling with alcohol dependency.",
        },
        {
          name: "Narcotics Anonymous Philippines",
          description: "Support for individuals recovering from drug addiction.",
        },
        { name: "Grief and Loss Support PH", description: "Support for those experiencing grief and bereavement." },
      ],
    },
  ],
}

const Services: React.FC<Record<string, never>> = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)
  const [activeFeatureModal, setActiveFeatureModal] = useState<FeatureCard | null>(null)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [consultationStatus, setConsultationStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const consultationFormRef = useRef<HTMLFormElement>(null)

  const [activeSubPage, setActiveSubPage] = useState<string | null>(null)
  const [raTab, setRaTab] = useState<"overview" | "provisions" | "fulltext">("overview")
  const [activeGuideModal, setActiveGuideModal] = useState<string | null>(null)

  const [fslTab, setFslTab] = useState<"alphabet" | "numbers" | "greetings" | "family">("alphabet")
  const [selectedSign, setSelectedSign] = useState<SignData | null>(null)

  const [grantFilter, setGrantFilter] = useState<string>("all")
  const [activeGrantModal, setActiveGrantModal] = useState<string | null>(null)

  const [activeProviderModal, setActiveProviderModal] = useState<string | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingProviderName, setBookingProviderName] = useState<string>("")
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const bookingFormRef = useRef<HTMLFormElement>(null)

  const [showAllJobs, setShowAllJobs] = useState(false)
  const [jobCategoryFilter, setJobCategoryFilter] = useState("")
  const [employmentSearch, setEmploymentSearch] = useState("")
  const [activeJobAppModal, setActiveJobAppModal] = useState<string | null>(null)
  const [jobAppStatus, setJobAppStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const jobAppFormRef = useRef<HTMLFormElement>(null)

  const [activeTechModal, setActiveTechModal] = useState<string | null>(null)

  const [medicineExpense, setMedicineExpense] = useState<string>("")
  const [transportExpense, setTransportExpense] = useState<string>("")
  const [foodExpense, setFoodExpense] = useState<string>("")
  const [totalSavings, setTotalSavings] = useState<number>(0)

  const calculateSavings = () => {
    const medicine = Number.parseFloat(medicineExpense) || 0
    const transport = Number.parseFloat(transportExpense) || 0
    const food = Number.parseFloat(foodExpense) || 0
    const savings = medicine * 0.2 + transport * 0.2 + food * 0.2
    setTotalSavings(savings)
  }

  const servicesList = [
    {
      icon: "info-circle",
      title: "Information & Awareness",
      desc: "Comprehensive resources on PWD rights, laws, and government programs tailored for easy access.",
      action: "Access Info",
    },
    {
      icon: "graduation-cap",
      title: "Education Support",
      desc: "Scholarship programs, accessible learning materials, and inclusive education guidelines.",
      action: "Start Learning",
    },
    {
      icon: "heartbeat",
      title: "Healthcare Services",
      desc: "Directory of disability-friendly clinics, tele-consultation support, and mental health resources.",
      action: "Find Care",
    },
    {
      icon: "briefcase",
      title: "Employment",
      desc: "Job matching platform, vocational training, and career counseling for sustainable livelihoods.",
      action: "Find Jobs",
    },
    {
      icon: "balance-scale",
      title: "Legal Services",
      desc: "Free legal aid, advocacy support, and representation for disability-related cases.",
      action: "Get Help",
    },
    {
      icon: "laptop-code",
      title: "Assistive Tech",
      desc: "Guidance on modern assistive tools, software, and devices to enhance daily independence.",
      action: "Get Help",
    },
  ]

  const serviceDetails: Record<string, ServiceDetail> = {
    "Information & Awareness": {
      id: "info",
      title: "Information & Awareness Services",
      subtitle: "Access comprehensive resources about PWD rights, laws, and accessibility information",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        {
          title: "Agency Directory",
          icon: "building",
          description: "Comprehensive directory of government agencies, NGOs, and private organizations serving PWDs.",
          items: ["National Council on Disability Affairs", "Department of Social Welfare", "Local PWD Organizations"],
          action: "Browse Directory",
        },
        {
          title: "Legal Rights",
          icon: "balance-scale",
          description: "Information on PWD rights, Republic Act 7277 (Magna Carta for Disabled Persons), and related laws.",
          items: ["RA 7277 Full Text", "International Convention", "Local Ordinances"],
          action: "Learn Your Right",
        },
        {
          title: "Accessibility Guides",
          icon: "map-marked-alt",
          description: "Guides for accessible public spaces, transportation, and digital platforms.",
          items: ["Public Buildings", "Transportation Systems", "Digital Accessibility"],
          action: "View Guides",
        },
      ],
    },
    "Education Support": {
      id: "education",
      title: "Education & Learning Support",
      subtitle: "Accessible learning resources and educational opportunities for PWDs",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      features: [
        {
          type: "Sign Language",
          title: "FSL Dictionary",
          icon: "hand-paper",
          description: "Comprehensive Filipino Sign Language dictionary with video demonstrations",
          action: "View Dictionary",
          items: [],
        },
        {
          type: "Scholarships",
          title: "Education Grants",
          icon: "graduation-cap",
          description: "Information on scholarships and financial aid for PWD students",
          action: "View Opportunities",
          items: [],
        },
      ],
    },
    "Healthcare Services": {
      id: "healthcare",
      title: "Healthcare & Wellness Services",
      subtitle: "Comprehensive healthcare resources and wellness programs for PWDs",
      color: "text-red-600",
      bgColor: "bg-red-50",
      features: [
        {
          title: "Telemedicine Directory",
          icon: "user-md",
          description: "Find healthcare providers offering telemedicine services for PWDs.",
          items: ["General Practitioners", "Specialists", "Therapists"],
          action: "Find Providers",
        },
        {
          title: "Mental Health Support",
          icon: "brain",
          description: "Access mental health resources, hotlines, and counseling services.",
          items: ["24/7 Crisis Hotline", "Online Counseling", "Support Groups"],
          action: "Get Support",
        },
      ],
    },
    Employment: {
      id: "jobs",
      title: "Employment Services",
      subtitle: "Our job placement and career development services help persons with disabilities find meaningful employment opportunities",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [],
    },
    "Legal Services": {
      id: "legal",
      title: "Legal & Social Services",
      subtitle: "Legal assistance and social welfare support for PWDs",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      features: [
        {
          title: "Legal Consultation",
          icon: "gavel",
          description: "Free online legal consultation for disability-related issues.",
          items: ["Discrimination Cases", "Rights Violations", "Legal Advice"],
          action: "Request Consultation",
        },
        {
          title: "PWD ID & Benefits",
          icon: "id-card",
          description: "Assistance in securing PWD IDs and accessing benefits.",
          items: ["ID Application Guide", "Benefits Eligibility", "Renewal Process"],
          action: "Get Assistance",
        },
      ],
    },
    "Assistive Tech": {
      id: "tech",
      title: "Assistive Technologies in the Philippines",
      subtitle: "Discover the various assistive technologies available that help improve the quality of life for persons with disabilities",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      features: [
        {
          title: "Mobility Aids",
          icon: "wheelchair",
          description: "Devices that help individuals move around more freely, including wheelchairs, walkers, and prosthetics.",
          action: "Explore Tech",
          sections: [],
        },
        {
          title: "Visual Aids",
          icon: "eye",
          description: "Technologies designed to assist individuals with visual impairments, such as screen readers and magnifiers.",
          action: "Explore Tech",
          sections: [],
        },
        {
          title: "Hearing Aids",
          icon: "deaf",
          description: "Devices that enhance hearing for individuals with hearing impairments, including hearing aids and cochlear implants.",
          action: "Explore Tech",
          sections: [],
        },
        {
          title: "Cognitive Aids",
          icon: "brain",
          description: "Tools that assist with memory, attention, or other cognitive functions, such as reminder systems and organizers.",
          action: "Explore Tech",
          sections: [],
        },
        {
          title: "Communication Aids",
          icon: "comments",
          description: "Devices that help individuals with speech or language difficulties communicate more effectively.",
          action: "Explore Tech",
          sections: [],
        },
        {
          title: "Daily Living Aids",
          icon: "home",
          description: "Tools that assist with everyday activities such as eating, dressing, and bathing for greater independence.",
          action: "Explore Tech",
          sections: [],
        },
      ],
    },
  }

  const handleOpenService = (title: string) => {
    if (serviceDetails[title]) {
      setSelectedService(serviceDetails[title])
      setActiveFeatureModal(null)
      setActiveSubPage(null)
      window.scrollTo(0, 0)
    }
  }

  const handleBackToServices = () => {
    setSelectedService(null)
    setActiveFeatureModal(null)
    setActiveSubPage(null)
    window.scrollTo(0, 0)
  }

  const handleBookAppointment = (providerName: string) => {
    setBookingProviderName(providerName)
    setIsBookingModalOpen(true)
  }

  const filteredGrants =
    grantFilter === "all" ? grantOpportunities : grantOpportunities.filter((g) => g.category === grantFilter)

  const getFSLData = () => {
    switch (fslTab) {
      case "alphabet":
        return fslAlphabet
      case "numbers":
        return fslNumbers
      case "greetings":
        return fslGreetings
      case "family":
        return fslFamily
      default:
        return fslAlphabet
    }
  }

  const filteredJobs = employmentJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(employmentSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(employmentSearch.toLowerCase())
      const matchesCategory = jobCategoryFilter === "" || job.category === jobCategoryFilter
      return matchesSearch && matchesCategory
    })
    .slice(0, showAllJobs ? employmentJobs.length : 3)

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.currentTarget
    setBookingStatus("submitting")

    const formData = new FormData(formElement)
    formData.set("access_key", "3a535789-c361-48c3-a78c-c1330c51eea1")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setBookingStatus("success")
        formElement.reset()
      } else {
        console.error("Submission failed", data)
        setBookingStatus("error")
        setTimeout(() => setBookingStatus("idle"), 4000)
      }
    } catch (error) {
      console.error("Submission error", error)
      setBookingStatus("error")
      setTimeout(() => setBookingStatus("idle"), 4000)
    }
  }

  const handleJobAppSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.currentTarget
    setJobAppStatus("submitting")

    const formData = new FormData(formElement)
    formData.set("access_key", "3a535789-c361-48c3-a78c-c1330c51eea1")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setJobAppStatus("success")
        formElement.reset()
      } else {
        console.error("Job Application submission failed", data)
        setJobAppStatus("error")
        setTimeout(() => setJobAppStatus("idle"), 4000)
      }
    } catch (error) {
      console.error("Job Application submission error", error)
      setJobAppStatus("error")
      setTimeout(() => setJobAppStatus("idle"), 4000)
    }
  }

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formElement = consultationFormRef.current
    if (!formElement) return

    setConsultationStatus("submitting")

    const formData = new FormData(formElement)
    formData.set("access_key", "3a535789-c361-48c3-a78c-c1330c51eea1")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setConsultationStatus("success")
        formElement.reset()
      } else {
        console.error("Consultation submission failed", data)
        setConsultationStatus("error")
        setTimeout(() => setConsultationStatus("idle"), 4000)
      }
    } catch (error) {
      console.error("Consultation submission error", error)
      setConsultationStatus("error")
      setTimeout(() => setConsultationStatus("idle"), 4000)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        {!selectedService ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              className="text-white pt-32 pb-24 rounded-b-[3rem] shadow-xl"
              style={{
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container mx-auto px-6 text-center">
                <Reveal width="100%">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Empowering you with free, accessible, and comprehensive support systems designed for your needs.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="container mx-auto px-6 py-20">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesList.map((service, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group border border-gray-100">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {(() => {
                          const Icon = iconMap[service.icon as keyof typeof iconMap] || Star
                          return (
                            <Icon
                              className="w-8 h-8 text-primary group-hover:text-white transition-colors"
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          )
                        })()}
                      </div>

                      <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{service.desc}</p>

                      <button
                        type="button"
                        onClick={() => handleOpenService(service.title)}
                        className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        aria-label={`Access ${service.title} service`}
                      >
                        {service.action}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.div>
        ) : selectedService.id === "jobs" ? (
          <motion.div
            key="employment-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            <div
              className="pt-32 pb-24 rounded-b-[3rem] shadow-xl"
              style={{
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,224C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), linear-gradient(135deg, #323946 0%, #2c3e50 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container mx-auto px-6 relative z-10">
                <button
                  type="button"
                  onClick={handleBackToServices}
                  className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                  aria-label="Back to services"
                >
                  <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Services
                </button>

                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                  <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                    <i className="fas fa-star text-5xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Employment Services</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Our job placement and career development services help persons with disabilities find meaningful
                      employment opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-6 py-20 space-y-24">
              <div className="bg-white p-12 rounded-[3rem] shadow-lg border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { label: "Jobs Posted", value: "2500" },
                    { label: "Successful Placements", value: "1800" },
                    { label: "Partner Companies", value: "350" },
                    { label: "Years of Service", value: "15" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4">
                      <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">{stat.value}</div>
                      <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Our Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "search",
                      title: "Job Placement",
                      desc: "We connect persons with disabilities with employers who value diversity and inclusion. Our personalized matching process ensures the right fit for both candidates and companies.",
                    },
                    {
                      icon: "user-tie",
                      title: "Career Counseling",
                      desc: "Our professional counselors provide guidance on career paths, skill development, and workplace accommodation strategies to help individuals achieve their professional goals.",
                    },
                    {
                      icon: "graduation-cap",
                      title: "Skills Training",
                      desc: "We offer specialized training programs designed to enhance employability skills and technical competencies required in today's competitive job market.",
                    },
                    {
                      icon: "building",
                      title: "Employer Support",
                      desc: "We assist companies in creating inclusive workplaces through disability awareness training, accommodation guidance, and inclusive hiring practices.",
                    },
                    {
                      icon: "laptop",
                      title: "Remote Work Opportunities",
                      desc: "We specialize in connecting candidates with remote and flexible work arrangements that accommodate various accessibility needs and preferences.",
                    },
                    {
                      icon: "hands-helping",
                      title: "Post-Placement Support",
                      desc: "Our support continues after placement with follow-up services, workplace mediation, and ongoing career development assistance.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-8 rounded-3xl shadow-sm border border-purple-50 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 text-2xl mb-6">
                        <i className={`fas fa-${item.icon}`} aria-hidden="true"></i>
                      </div>
                      <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Current Job Opportunities</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex-grow relative">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
                    <input
                      type="text"
                      placeholder="Search jobs by title or company..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-purple-200"
                      value={employmentSearch}
                      onChange={(e) => setEmploymentSearch(e.target.value)}
                      aria-label="Search jobs"
                    />
                  </div>
                  <select
                    className="md:w-64 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-200 font-medium text-gray-600"
                    value={jobCategoryFilter}
                    onChange={(e) => setJobCategoryFilter(e.target.value)}
                    aria-label="Filter by job category"
                  >
                    <option value="">All Categories</option>
                    <option value="IT">Information Technology</option>
                    <option value="Admin">Administration</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-dark leading-tight mb-1">{job.title}</h3>
                            <p className="text-purple-600 text-sm font-medium">{job.company}</p>
                          </div>
                          <span className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {job.type}
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                            <i className="fas fa-map-marker-alt text-purple-400 w-4 text-center" aria-hidden="true"></i> {job.location}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{job.description}</p>
                          <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600">
                            <strong className="text-gray-800 block mb-1">Requirements:</strong>
                            {job.requirements}
                          </div>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">Posted {job.posted}</span>
                          <button
                            type="button"
                            onClick={() => setActiveJobAppModal(job.id)}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                            aria-label={`Apply for ${job.title} at ${job.company}`}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      No jobs found matching your criteria.
                    </div>
                  )}
                </div>

                {!showAllJobs && employmentJobs.length > 3 && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllJobs(true)}
                      className="px-8 py-3 border-2 border-purple-200 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      Load More Jobs
                    </button>
                  </div>
                )}
                {showAllJobs && employmentJobs.length > 3 && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllJobs(false)}
                      className="px-8 py-3 border-2 border-purple-200 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      Show Less
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-[3rem] shadow-lg border border-gray-100 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-10 md:p-16 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-dark mb-6">About Employment Services Philippines</h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        For over 15 years, Employment Services Philippines has been dedicated to creating meaningful
                        employment opportunities for persons with disabilities across the country.
                      </p>
                      <p>
                        Our team of experienced professionals works tirelessly to bridge the gap between talented
                        individuals with disabilities and forward-thinking employers who recognize the value of
                        diversity and inclusion.
                      </p>
                      <p>
                        Through our comprehensive services, we have successfully placed thousands of individuals in
                        fulfilling careers, helping them achieve financial independence and personal growth.
                      </p>
                    </div>
                  </div>
                  <div className="h-full min-h-[400px] bg-gray-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop"
                      alt="Inclusive workplace"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/20"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Success Stories</h2>
                  <p className="text-gray-600">
                    Hear from individuals and employers who have benefited from our services
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Maria Santos",
                      role: "Customer Service Representative",
                      quote: "Employment Services Philippines helped me find a remote customer service position that accommodates my mobility needs. I've been with the company for three years now and recently received a promotion!",
                    },
                    {
                      name: "Carlos Mendoza",
                      role: "Web Developer",
                      quote: "The skills training program gave me the confidence and technical abilities to pursue a career in web development. I'm now working as a junior developer at a leading tech company in Manila.",
                    },
                    {
                      name: "Anna Reyes",
                      role: "HR Director, Tech Innovations Inc.",
                      quote: "As an employer, partnering with Employment Services Philippines has been invaluable. They've helped us create a more inclusive workplace and connected us with talented professionals we might have otherwise missed.",
                    },
                  ].map((story, i) => (
                    <div
                      key={i}
                      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative hover:-translate-y-1 transition-transform"
                    >
                      <div className="text-purple-200 text-5xl absolute top-6 right-6 font-serif" aria-hidden="true">"</div>
                      <p className="text-gray-600 italic mb-6 relative z-10 pt-4">{story.quote}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-dark text-sm">{story.name}</h4>
                          <p className="text-xs text-purple-600 font-medium">{story.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {activeJobAppModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
                  onClick={() => {
                    setActiveJobAppModal(null)
                    setJobAppStatus("idle")
                  }}
                  role="dialog"
                  aria-modal="true"
                >
                  <div
                    className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const job = employmentJobs.find((j) => j.id === activeJobAppModal)
                      if (!job) return null

                      if (jobAppStatus === "success") {
                        return (
                          <div className="text-center py-12 px-6">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                              <i className="fas fa-check-circle text-4xl" aria-hidden="true"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-dark mb-2">Application Submitted!</h3>
                            <p className="text-gray-600 mb-8">
                              Your application for <strong>{job.title}</strong> has been sent successfully. The employer
                              will contact you soon.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveJobAppModal(null)
                                setJobAppStatus("idle")
                              }}
                              className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
                            >
                              Close
                            </button>
                          </div>
                        )
                      }

                      return (
                        <>
                          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-xl text-dark">Job Application</h3>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveJobAppModal(null)
                                setJobAppStatus("idle")
                              }}
                              className="text-gray-400 hover:text-dark transition-colors"
                              aria-label="Close modal"
                            >
                              <i className="fas fa-times text-xl" aria-hidden="true"></i>
                            </button>
                          </div>
                          <div className="p-8">
                            <div className="mb-8 pb-6 border-b border-gray-100">
                              <h4 className="text-2xl font-bold text-purple-700 mb-1">{job.title}</h4>
                              <p className="text-gray-600 font-medium">{job.company}</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleJobAppSubmit} ref={jobAppFormRef}>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">Full Name *</label>
                                  <input
                                    type="text"
                                    name="applicant_name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                    aria-required="true"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">Email Address *</label>
                                  <input
                                    type="email"
                                    name="applicant_email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                    aria-required="true"
                                  />
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                  <input
                                    type="tel"
                                    name="applicant_phone"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">Location</label>
                                  <input
                                    type="text"
                                    name="applicant_location"
                                    required
                                    placeholder="City, Province"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Disability Type (Optional)</label>
                                <select
                                  name="disability_type"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer bg-white"
                                >
                                  <option value="" disabled>
                                    Select if applicable
                                  </option>
                                  <option value="physical">Physical Disability</option>
                                  <option value="visual">Visual Impairment</option>
                                  <option value="hearing">Hearing Impairment</option>
                                  <option value="speech">Speech Impairment</option>
                                  <option value="intellectual">Intellectual Disability</option>
                                  <option value="psychosocial">Psychosocial Disability</option>
                                  <option value="other">Other</option>
                                  <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Resume Link / Details</label>
                                <textarea
                                  name="resume_info"
                                  rows={2}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
                                  placeholder="Paste link to your resume or provide key highlights..."
                                ></textarea>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Cover Letter</label>
                                <textarea
                                  name="cover_letter"
                                  rows={4}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
                                  placeholder="Tell us why you're interested..."
                                ></textarea>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">
                                  Required Accommodations (Optional)
                                </label>
                                <textarea
                                  name="accommodations"
                                  rows={3}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
                                  placeholder="Describe any workplace accommodations needed..."
                                ></textarea>
                              </div>

                              <div className="flex items-start gap-3 pt-2">
                                <input type="checkbox" name="terms_accepted" required id="terms" className="mt-1" />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                  I agree to the Terms and Conditions and Privacy Policy. I confirm that the information
                                  provided is accurate.
                                </label>
                              </div>

                              {jobAppStatus === "error" && (
                                <div className="text-red-500 text-sm font-bold text-center">
                                  Something went wrong. Please try again.
                                </div>
                              )}

                              <div className="pt-4 flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveJobAppModal(null)
                                    setJobAppStatus("idle")
                                  }}
                                  className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                  disabled={jobAppStatus === "submitting"}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
                                  disabled={jobAppStatus === "submitting"}
                                >
                                  {jobAppStatus === "submitting" ? (
                                    <>
                                      <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...
                                    </>
                                  ) : (
                                    "Submit Application"
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : activeSubPage ? (
          <motion.div>
            {activeSubPage === "agency-directory" && (
              <motion.div
                key="agency-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Information"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Information
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Agency Directory</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Comprehensive directory of government agencies, NGOs, and private organizations serving PWDs.
                    </p>
                  </div>
                </div>

                <div className="container mx-auto px-6 py-20">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-full">
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10">
                        Featured
                      </div>
                      <div className="p-8 pb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                          Government
                        </span>
                        <h3 className="text-xl font-bold text-dark mb-2 leading-tight">
                          National Council on Disability Affairs
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <i className="fas fa-landmark text-blue-400" aria-hidden="true"></i>
                          <span>Policy & Advocacy</span>
                        </div>
                      </div>
                      <div className="px-8 py-4 flex-grow">
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          The primary government body responsible for coordinating the implementation of policies and
                          programs for persons with disabilities in the country.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-map-marker-alt text-blue-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>New Executive Building, Pasig City</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-phone-alt text-blue-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>(02) 8411 2000</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-envelope text-blue-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>info@ncda.gov.ph</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
                        <a
                          href="https://ncda.gov.ph"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:underline"
                        >
                          Visit Website <i className="fas fa-external-link-alt text-xs" aria-hidden="true"></i>
                        </a>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-xs">
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star-half-alt" aria-hidden="true"></i>
                          </div>
                          <span className="text-xs font-bold text-gray-500">4.7</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-full">
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10">
                        Featured
                      </div>
                      <div className="p-8 pb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                          Government
                        </span>
                        <h3 className="text-xl font-bold text-dark mb-2 leading-tight">Department of Social Welfare</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <i className="fas fa-hands-helping text-blue-400" aria-hidden="true"></i>
                          <span>Social Services</span>
                        </div>
                      </div>
                      <div className="px-8 py-4 flex-grow">
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          Provides social protection programs and services to marginalized sectors including persons
                          with disabilities and their families.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-map-marker-alt text-blue-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>DSWD Central Office, Quezon City</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-phone-alt text-blue-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>(02) 931 8101</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-envelope text-blue-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>action@dswd.gov.ph</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
                        <a
                          href="https://dswd.gov.ph"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:underline"
                        >
                          Visit Website <i className="fas fa-external-link-alt text-xs" aria-hidden="true"></i>
                        </a>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-xs">
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="far fa-star" aria-hidden="true"></i>
                          </div>
                          <span className="text-xs font-bold text-gray-500">4.2</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-full">
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10">
                        Featured
                      </div>
                      <div className="p-8 pb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-green-600 mb-2 block">
                          NGO
                        </span>
                        <h3 className="text-xl font-bold text-dark mb-2 leading-tight">Local PWD Organizations</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <i className="fas fa-users text-green-400" aria-hidden="true"></i>
                          <span>Community Support</span>
                        </div>
                      </div>
                      <div className="px-8 py-4 flex-grow">
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          Coalition of local organizations advocating for the rights and welfare of persons with
                          disabilities at the community level.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-map-marker-alt text-green-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>Various locations nationwide</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-phone-alt text-green-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>(02) 8888 7777</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <i className="fas fa-envelope text-green-400 mt-1 w-4 text-center" aria-hidden="true"></i>
                            <span>info@localpwdorgs.org</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
                        <a
                          href="https://bay.gov.ph/about-the-persons-with-disability-affairs-office/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 font-bold text-sm flex items-center gap-2 hover:underline"
                        >
                          Visit Website <i className="fas fa-external-link-alt text-xs" aria-hidden="true"></i>
                        </a>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-xs">
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                          </div>
                          <span className="text-xs font-bold text-gray-500">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "pwd-benefits" && (
              <motion.div
                key="pwd-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Legal"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Legal
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">PWD ID & Benefits</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Assistance in securing PWD IDs and accessing benefits.
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-6 py-20 space-y-20">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl">
                          <i className="fas fa-check-circle" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark">Eligibility Requirements</h3>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        {["Philippine citizen", "With permanent disability", "With medical certificate", "Barangay certification"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <i className="fas fa-check text-orange-500 mt-1" aria-hidden="true"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl">
                          <i className="fas fa-file-alt" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark">Required Documents</h3>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        {["1x1 ID photo (2 copies)", "Medical certificate", "Barangay clearance", "Birth certificate"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <i className="fas fa-paperclip text-orange-500 mt-1" aria-hidden="true"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl">
                          <i className="fas fa-tasks" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark">Application Process</h3>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        {["1. Gather requirements", "2. Visit DSWD office", "3. Submit documents", "4. Wait for processing"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 font-medium">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-dark mb-10 text-center">Step-by-Step Application</h3>
                    <div className="grid md:grid-cols-4 gap-6 relative">
                      {[
                        {
                          title: "Prepare Documents",
                          desc: "Ensure all required documents are complete and valid. Medical certificates should be issued by government hospitals.",
                        },
                        {
                          title: "Visit the Office",
                          desc: "Go to your local DSWD office or City/Municipal Social Welfare and Development Office.",
                        },
                        {
                          title: "Fill Out Application Form",
                          desc: "Complete the PWD ID application form with accurate information. Assistance is available if needed.",
                        },
                        {
                          title: "Wait for Processing",
                          desc: "Processing typically takes 3-5 working days. You'll be notified when your ID is ready for pickup.",
                        },
                      ].map((step, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 relative shadow-sm">
                          <div className="absolute -top-4 left-6 w-10 h-10 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-white shadow-md">
                            {i + 1}
                          </div>
                          <h4 className="font-bold text-lg text-dark mt-4 mb-2">{step.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100">
                      <div className="flex items-center gap-3 mb-6">
                        <i className="fas fa-landmark text-2xl text-orange-600" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-dark">Government Benefits</h3>
                      </div>
                      <div className="space-y-6">
                        {[
                          {
                            title: "20% Discount",
                            desc: "On medicines, medical services, and medical/dental supplies",
                          },
                          {
                            title: "Tax Exemptions",
                            desc: "Income tax for minimum wage earners and tax deductions for donors",
                          },
                          {
                            title: "Educational Assistance",
                            desc: "Scholarships and educational privileges in public schools",
                          },
                          {
                            title: "Priority Access",
                            desc: "Priority in government programs, services, and facilities",
                          },
                        ].map((benefit, i) => (
                          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm">
                            <h4 className="font-bold text-orange-600 mb-1">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100">
                      <div className="flex items-center gap-3 mb-6">
                        <i className="fas fa-building text-2xl text-blue-600" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-dark">Private Sector Benefits</h3>
                      </div>
                      <div className="space-y-6">
                        {[
                          { title: "20% Discount", desc: "On hotels, restaurants, recreation centers, and theaters" },
                          {
                            title: "Transportation Discounts",
                            desc: "20% discount on air, sea, and land transportation fares",
                          },
                          { title: "Medical Services", desc: "Discounts on private hospitals and medical services" },
                          {
                            title: "Employment Opportunities",
                            desc: "Reserved positions and equal employment opportunities",
                          },
                        ].map((benefit, i) => (
                          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm">
                            <h4 className="font-bold text-blue-600 mb-1">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-dark mb-2">Benefits Calculator</h3>
                      <p className="text-gray-500">Estimate your potential savings with PWD benefits</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Monthly Medicine Expenses (₱)
                        </label>
                        <input
                          type="number"
                          value={medicineExpense}
                          onChange={(e) => setMedicineExpense(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                          aria-label="Monthly medicine expenses"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Transportation (₱)</label>
                        <input
                          type="number"
                          value={transportExpense}
                          onChange={(e) => setTransportExpense(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                          aria-label="Monthly transportation expenses"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Monthly Food/Restaurant (₱)
                        </label>
                        <input
                          type="number"
                          value={foodExpense}
                          onChange={(e) => setFoodExpense(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                          aria-label="Monthly food and restaurant expenses"
                        />
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <button
                        type="button"
                        onClick={calculateSavings}
                        className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
                      >
                        Calculate Monthly Savings
                      </button>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-6 text-center max-w-md mx-auto border border-orange-100">
                      <h4 className="font-bold text-gray-600 mb-1 uppercase tracking-wide text-xs">
                        Your Estimated Monthly Savings
                      </h4>
                      <p className="text-4xl font-bold text-orange-600">
                        ₱
                        {totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-dark text-center">Renewal Process</h3>

                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      {[
                        { icon: "calendar-alt", label: "Validity Period", val: "3 years from issuance" },
                        { icon: "clock", label: "Renewal Window", val: "3 months before expiry" },
                        { icon: "hourglass-half", label: "Processing Time", val: "5-7 working days" },
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                          <i className={`fas fa-${item.icon} text-3xl text-orange-400 mb-3`} aria-hidden="true"></i>
                          <p className="text-gray-500 text-sm font-bold uppercase">{item.label}</p>
                          <p className="text-dark font-bold text-lg">{item.val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-xl text-dark mb-4">Required Documents</h4>
                        <ul className="space-y-3">
                          {["Expired PWD ID", "Updated medical certificate", "1x1 ID photo (2 copies)", "Barangay clearance"].map((req, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600">
                              <i className="fas fa-check-circle text-orange-500" aria-hidden="true"></i>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-xl text-dark mb-4">Renewal Steps</h4>
                        <ol className="space-y-4">
                          {[
                            "Submit requirements to DSWD",
                            "Fill out renewal form",
                            "Pay renewal fee (if applicable)",
                            "Wait for processing and notification",
                          ].map((step, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-gray-600">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "legal-consultation" && (
              <motion.div
                key="consultation-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Legal"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Legal
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Legal Consultation</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Free online legal consultation for disability-related issues.
                    </p>
                  </div>
                </div>

                <div className="container mx-auto px-6 py-20">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-dark mb-4">Our Legal Services</h2>
                    <p className="text-gray-600">Specialized support for disability-related legal issues</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-[2rem] shadow-lg border-t-8 border-orange-500 hover:-translate-y-2 transition-transform">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl">
                          <i className="fas fa-gavel" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark">Discrimination Cases</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Fight against workplace, educational, or public accommodation discrimination. We help you
                        understand your rights and take appropriate legal action.
                      </p>
                      <ul className="space-y-3">
                        {["Employment Discrimination", "Housing Discrimination", "Public Access Issues"].map(
                          (item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                              <i className="fas fa-check text-orange-500" aria-hidden="true"></i> {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] shadow-lg border-t-8 border-orange-500 hover:-translate-y-2 transition-transform">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl">
                          <i className="fas fa-shield-alt" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark">Rights Violations</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Protect your fundamental rights under ADA, IDEA, Section 504, and other disability rights laws.
                        We ensure your rights are respected.
                      </p>
                      <ul className="space-y-3">
                        {["ADA Violations", "Educational Rights", "Healthcare Access"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                            <i className="fas fa-check text-orange-500" aria-hidden="true"></i> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] shadow-lg border-t-8 border-orange-500 hover:-translate-y-2 transition-transform">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl">
                          <i className="fas fa-comments" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark">Legal Advice</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Get clear, practical legal guidance tailored to your specific situation. Our experts provide
                        comprehensive advice on disability law matters.
                      </p>
                      <ul className="space-y-3">
                        {["Legal Rights Education", "Documentation Review", "Strategy Development"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                            <i className="fas fa-check text-orange-500" aria-hidden="true"></i> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-dark mb-2">Request Free Legal Consultation</h2>
                      <p className="text-gray-500">
                        Fill out the form below and our legal experts will contact you within 24 hours
                      </p>
                    </div>

                    {consultationStatus === "success" ? (
                      <div className="text-center py-10">
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-check-circle text-5xl" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-dark mb-2">Request Sent Successfully!</h3>
                        <p className="text-gray-600 mb-8">
                          Your consultation request has been submitted. A legal representative will review your case and
                          contact you shortly.
                        </p>
                        <button
                          type="button"
                          onClick={() => setConsultationStatus("idle")}
                          className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    ) : (
                      <form ref={consultationFormRef} onSubmit={handleConsultationSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                              aria-required="true"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                              aria-required="true"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                            <input
                              type="email"
                              name="user_email"
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                              aria-required="true"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="(555) 123-4567"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Type of Legal Issue *</label>
                          <select
                            name="issueType"
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all cursor-pointer"
                            aria-required="true"
                          >
                            <option value="">Select an issue type</option>
                            <option value="discrimination">Discrimination Case</option>
                            <option value="rights-violation">Rights Violation</option>
                            <option value="accommodation">Reasonable Accommodation</option>
                            <option value="education">Educational Rights</option>
                            <option value="employment">Employment Issues</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Brief Description of Your Issue *
                          </label>
                          <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                            placeholder="Please provide a brief description of your situation..."
                            aria-required="true"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Urgency Level</label>
                          <select
                            name="urgency"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all cursor-pointer"
                          >
                            <option value="low">Low - General Information</option>
                            <option value="medium">Medium - Planning Needed</option>
                            <option value="high">High - Immediate Action Required</option>
                          </select>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            required
                            id="consent"
                            className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                            I consent to receive communications about my legal consultation and understand that this
                            does not create an attorney-client relationship.
                          </label>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={consultationStatus === "submitting"}
                            className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-lg"
                          >
                            {consultationStatus === "submitting" ? (
                              <>
                                <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Submitting...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-paper-plane" aria-hidden="true"></i> Submit Consultation Request
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "legal-rights" && (
              <motion.div
                key="legal-menu"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Information"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Information
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Legal Rights</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Information on PWD rights, Republic Act 7277 (Magna Carta for Disabled Persons), and related laws.
                    </p>
                  </div>
                </div>

                <div className="container mx-auto px-6 py-20">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div
                      onClick={() => {
                        setActiveSubPage("ra")
                        window.scrollTo(0, 0)
                      }}
                      className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveSubPage("ra")
                          window.scrollTo(0, 0)
                        }
                      }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                          <i className="fas fa-file-contract text-2xl" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark group-hover:text-blue-600 transition-colors">
                          RA 7277 Full Text
                        </h3>
                      </div>
                      <div className="flex-grow">
                        <p className="text-gray-600 leading-relaxed text-sm">
                          The Magna Carta for Disabled Persons was enacted in 1992 to provide for the rehabilitation,
                          self-development, and self-reliance of disabled persons and their integration into the
                          mainstream of society
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setActiveSubPage("international")
                        window.scrollTo(0, 0)
                      }}
                      className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveSubPage("international")
                          window.scrollTo(0, 0)
                        }
                      }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                          <i className="fas fa-globe-asia text-2xl" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark group-hover:text-green-600 transition-colors">
                          International Convention
                        </h3>
                      </div>
                      <div className="flex-grow">
                        <p className="text-gray-600 leading-relaxed text-sm">
                          The Philippines is a signatory to the UN Convention on the Rights of Persons with Disabilities
                          (CRPD), which reinforces the rights of PWDs at the international level
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setActiveSubPage("local")
                        window.scrollTo(0, 0)
                      }}
                      className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveSubPage("local")
                          window.scrollTo(0, 0)
                        }
                      }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                          <i className="fas fa-landmark text-2xl" aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark group-hover:text-orange-600 transition-colors">
                          Local Ordinances
                        </h3>
                      </div>
                      <div className="flex-grow">
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Besides national laws, various local government units have enacted ordinances to further
                          protect and promote the rights of persons with disabilities in their jurisdictions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "ra" && (
              <motion.div
                key="ra-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage("legal-rights")
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Legal Rights"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Legal Rights
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                      Republic Act 7277: Magna Carta for Disabled Persons
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      The Magna Carta for Disabled Persons was enacted in 1992 to provide for the rehabilitation,
                      self-development, and self-reliance of disabled persons and their integration into the mainstream
                      of society
                    </p>
                  </div>
                </div>

                <div className="container mx-auto px-6 py-20">
                  <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setRaTab("overview")}
                      className={`px-6 py-2 rounded-full font-bold transition-all ${raTab === "overview" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                      aria-label="Show overview"
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setRaTab("provisions")}
                      className={`px-6 py-2 rounded-full font-bold transition-all ${raTab === "provisions" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                      aria-label="Show key provisions"
                    >
                      Key Provisions
                    </button>
                    <button
                      type="button"
                      onClick={() => setRaTab("fulltext")}
                      className={`px-6 py-2 rounded-full font-bold transition-all ${raTab === "fulltext" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                      aria-label="Show full text"
                    >
                      Full Text
                    </button>
                  </div>

                  {raTab === "overview" && (
                    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
                      <div className="bg-blue-50 p-8 rounded-3xl shadow-sm border border-blue-100">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">What is RA 7277?</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Republic Act No. 7277, also known as the Magna Carta for Disabled Persons, is a comprehensive
                          law that recognizes the rights and privileges of persons with disabilities in the Philippines.
                          It aims to eliminate discrimination against PWDs and provide them with opportunities for full
                          participation in society.
                        </p>
                      </div>

                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-dark mb-4">Purpose of the Law</h3>
                        <p className="text-gray-600 mb-4">The Magna Carta for Disabled Persons was created to:</p>
                        <ul className="space-y-2 mb-8">
                          {[
                            "Provide rehabilitation services to disabled persons",
                            "Ensure equal opportunities for employment",
                            "Eliminate discrimination against PWDs",
                            "Support self-development and self-reliance",
                            "Promote accessibility in public spaces",
                            "Provide educational opportunities",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                              <i className="fas fa-check text-blue-500 mt-1" aria-hidden="true"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-xl font-bold text-dark mb-4">Coverage</h3>
                        <p className="text-gray-600 leading-relaxed">
                          This law applies to all disabled persons in the Philippines, regardless of age, gender, or
                          nature of disability. It covers various aspects including employment, education, health,
                          accessibility, and political rights.
                        </p>
                      </div>
                    </div>
                  )}

                  {raTab === "provisions" && (
                    <div className="max-w-4xl mx-auto animate-fadeIn">
                      <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-dark">Key Provisions of RA 7277</h3>
                      </div>
                      <div className="grid gap-6">
                        {[
                          {
                            title: "Employment Rights",
                            art: "Article 13",
                            cat: "Employment",
                            desc: "Reserved positions for disabled persons in government and private sector. Prohibits discrimination against PWDs in employment.",
                          },
                          {
                            title: "Education Rights",
                            art: "Article 14",
                            cat: "Education",
                            desc: "Guarantees access to quality education for disabled persons. Mandates special education and inclusive education programs.",
                          },
                          {
                            title: "Accessibility",
                            art: "Article 25",
                            cat: "Accessibility",
                            desc: "Requires public buildings, transportation, and facilities to be accessible to disabled persons.",
                          },
                          {
                            title: "Health Services",
                            art: "Article 16",
                            cat: "Health",
                            desc: "Provides for comprehensive health services and rehabilitation programs for disabled persons.",
                          },
                          {
                            title: "Political Rights",
                            art: "Article 29",
                            cat: "Political Rights",
                            desc: "Guarantees the right of disabled persons to participate in political activities and elections.",
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
                            <div className="flex gap-2 mb-4">
                              <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                {item.art}
                              </span>
                              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                {item.cat}
                              </span>
                            </div>
                            <p className="text-gray-600">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {raTab === "fulltext" && (
                    <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100 animate-fadeIn">
                      <div className="prose prose-blue max-w-none text-gray-700">
                        <h3 className="text-2xl font-bold text-dark mb-2">Republic Act No. 7277</h3>
                        <h4 className="text-lg font-bold text-gray-500 mb-6 uppercase">
                          AN ACT PROVIDING FOR THE REHABILITATION, SELF-DEVELOPMENT AND SELF-RELIANCE OF DISABLED PERSON
                          AND THEIR INTEGRATION INTO THE MAINSTREAM OF SOCIETY AND FOR OTHER PURPOSES
                        </h4>

                        <p className="mb-6 italic">
                          <strong>
                            Be it enacted by the Senate and House of Representatives of the Philippines in Congress
                            assembled:
                          </strong>
                        </p>

                        <h4 className="text-xl font-bold text-dark mb-4">SECTION 1. Title.</h4>
                        <p className="mb-6">
                          This Act shall be known and cited as the {"Magna Carta for Disabled Persons."}
                        </p>

                        <h4 className="text-xl font-bold text-dark mb-4">SECTION 2. Declaration of Policy.</h4>
                        <p className="mb-4">
                          The grant of the rights and privileges for disabled persons shall be guided by the following
                          principles:
                        </p>
                        <p className="mb-4 pl-4">
                          (a) Disabled persons are part of the Philippine society; thus the State shall give full
                          support to the improvement of the total well-being of disabled persons and their integration
                          into the mainstream of society. Toward this end, the State shall adopt policies ensuring the
                          rehabilitation, self-development and self-reliance of disabled persons.
                        </p>
                        <p className="mb-4 pl-4">
                          (b) Disabled persons have the same rights as other persons to establish their families and to
                          lead productive lives. These rights include the right to education, employment, health, and
                          accessibility to facilities.
                        </p>
                        <p className="mb-6 pl-4">
                          (c) The State shall promote the welfare and development of disabled persons and encourage
                          their participation in nation-building.
                        </p>

                        <h4 className="text-xl font-bold text-dark mb-4">SECTION 3. Definition of Terms.</h4>
                        <p className="mb-4">For purposes of this Act, these terms shall be defined as follows:</p>
                        <p className="mb-4 pl-4">
                          (a) "Disabled persons" are those suffering from restriction of different abilities, as a
                          result of a mental, physical or sensory impairment, in performing an activity in the manner or
                          within the range considered normal for a human being;
                        </p>
                        <p className="mb-4 pl-4">
                          (b) "Impairment" is any loss, diminution or aberration of psychological, physiological, or
                          anatomical structure or function;
                        </p>
                        <p className="mb-4 pl-4">
                          (c) "Disability" is a physical or mental condition that limits a person's movements,
                          senses, or activities;
                        </p>
                        <p className="mb-4 pl-4">
                          (d) "Handicap" refers to a disadvantage for a given individual, resulting from an
                          impairment or a disability, that limits or prevents the functions or activities that are
                          considered normal given the age and sex of the individual;
                        </p>
                        <p className="mb-4 pl-4">
                          (e) "Rehabilitation" is an integrated process of developing the abilities of disabled
                          persons and the process of promoting their integration into the mainstream of society;
                        </p>
                        <p className="mb-4 pl-4">
                          (f) "National Council for the Welfare of Disabled Persons" refers to the agency mandated
                          to coordinate the activities of all government and non-governmental organizations engaged in
                          the provision of services to disabled persons;
                        </p>
                        <p className="mb-4 pl-4">
                          (g) {"Auxiliary social services"} refers to the provision of social assistance to disabled
                          persons and their families to facilitate their integration into the mainstream of society;
                        </p>
                        <p className="mb-4 pl-4">
                          (h) "Barrier-free" refers to any physical or non-physical obstacle that hinders the full
                          participation of disabled persons in society;
                        </p>
                        <p className="mb-6 pl-4">
                          (i) "Accessibility" refers to the measure or condition of things and facilities that can
                          readily be reached or used by disabled persons.
                        </p>

                        <h4 className="text-xl font-bold text-dark mb-4">
                          SECTION 4. Rights and Privileges of Disabled Persons.
                        </h4>
                        <p className="mb-4">Disabled persons shall have the following rights and privileges:</p>
                        <p className="mb-4 pl-4">
                          (a) Employment - At least twenty percent (20%) of all government positions shall be reserved
                          for disabled persons. Private corporations with more than 100 employees are encouraged to
                          reserve at least one percent (1%) of their positions for disabled persons.
                        </p>
                        <p className="mb-4 pl-4">
                          (b) Education - Disabled persons shall be provided with access to quality education and
                          special education programs. Educational institutions shall provide reasonable accommodations
                          for disabled students.
                        </p>
                        <p className="mb-4 pl-4">
                          (c) Health - Disabled persons shall have access to comprehensive health services and
                          rehabilitation programs.
                        </p>
                        <p className="mb-4 pl-4">
                          (d) Accessibility - Public buildings, transportation, and facilities shall be made accessible
                          to disabled persons.
                        </p>
                        <p className="mb-6 pl-4">
                          (e) Political Rights - Disabled persons shall have the right to participate in political
                          activities and elections.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeSubPage === "international" && (
              <motion.div
                key="international-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage("legal-rights")
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Legal Rights"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Legal Rights
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                      International Convention on the Rights of Persons with Disabilities
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      The Philippines is a signatory to the UN Convention on the Rights of Persons with Disabilities
                      (CRPD), which reinforces the rights of PWDs at the international level
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-6 py-20 max-w-4xl">
                  <div className="bg-green-50 p-8 rounded-3xl shadow-sm border border-green-100 mb-8">
                    <h3 className="text-2xl font-bold text-green-900 mb-4">What is the CRPD?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      The Convention on the Rights of Persons with Disabilities is an international human rights treaty
                      intended to protect the rights and dignity of persons with disabilities. The Philippines ratified
                      this convention on April 15, 2008.
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-dark mb-6">Key Principles of the CRPD</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {[
                        "Respect for inherent dignity and individual autonomy",
                        "Non-discrimination",
                        "Full and effective participation and inclusion in society",
                        "Respect for difference and acceptance of PWDs",
                        "Equality of opportunity",
                        "Accessibility",
                        "Equality between men and women",
                        "Respect for the evolving capacities of children with disabilities",
                      ].map((principle, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                        >
                          <i className="fas fa-check-circle text-green-500 mt-1 flex-shrink-0" aria-hidden="true"></i>
                          <span className="text-gray-700 text-sm">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-dark mb-6">Core Articles of the Convention</h3>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Article 5 - Equality and Non-Discrimination",
                          desc: "States Parties recognize that all persons are equal before and under the law and are entitled without any discrimination to the equal protection and equal benefit of the law.",
                        },
                        {
                          title: "Article 9 - Accessibility",
                          desc: "States Parties shall take appropriate measures to ensure to persons with disabilities access, on an equal basis with others, to the physical environment, to transportation, to information and communications, including information and communications technologies and systems.",
                        },
                        {
                          title: "Article 24 - Education",
                          desc: "States Parties recognize the right of persons with disabilities to education. With a view to realizing this right without discrimination and on the basis of equal opportunity, States Parties shall ensure an inclusive education system at all levels.",
                        },
                        {
                          title: "Article 27 - Work and Employment",
                          desc: "States Parties recognize the right of persons with disabilities to work, on an equal basis with others; this includes the right to the opportunity to gain a living by work freely chosen or accepted in a labor market and work environment that is open, inclusive and accessible.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-8 rounded-3xl shadow-sm border border-blue-100">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Philippines' Compliance with CRPD</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      The Philippines has taken significant steps to align its national laws with the CRPD, including:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Enactment of RA 10366 (Automated Election System for PWDs)",
                        "Enactment of RA 10754 (Expanding Benefits and Privileges of PWDs)",
                        "Establishment of the Philippine Plan of Action for the Decade of Persons with Disabilities",
                        "Creation of the National Council on Disability Affairs",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <i className="fas fa-dot-circle text-blue-500 mt-1.5 text-xs" aria-hidden="true"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "local" && (
              <motion.div
                key="local-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage("legal-rights")
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Legal Rights"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Legal Rights
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Local Ordinances on PWD Rights</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Besides national laws, various local government units have enacted ordinances to further protect
                      and promote the rights of persons with disabilities in their jurisdictions
                    </p>
                  </div>
                </div>

                <div className="container mx-auto px-6 py-20 max-w-4xl">
                  <div className="mb-8 border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-bold text-dark">Notable Local Ordinances</h3>
                  </div>

                  <div className="space-y-6 mb-12">
                    {[
                      {
                        title: "Manila Ordinance No. 8057",
                        place: "City of Manila",
                        year: "2010",
                        desc: "Establishes the Persons with Disability Affairs Office (PDAO) in Manila and provides for the implementation of programs and services for PWDs.",
                      },
                      {
                        title: "Quezon City Ordinance No. SP-2363",
                        place: "Quezon City",
                        year: "2014",
                        desc: "Provides for the creation of the Persons with Disability Affairs Office (PDAO) and mandates the implementation of accessibility standards in all public buildings and facilities.",
                      },
                      {
                        title: "Cebu City Ordinance No. 2456",
                        place: "Cebu City",
                        year: "2015",
                        desc: "Establishes the PDAO in Cebu City and provides for the allocation of funds for programs and services for PWDs.",
                      },
                      {
                        title: "Davao City Ordinance No. 0547-12",
                        place: "Davao City",
                        year: "2012",
                        desc: "Provides for the implementation of the Accessibility Law and mandates the creation of barrier-free environments in public places.",
                      },
                      {
                        title: "Makati City Ordinance No. 2019-092",
                        place: "Makati City",
                        year: "2019",
                        desc: "Provides for additional benefits and privileges for PWDs in Makati City, including educational assistance and livelihood programs.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <h3 className="text-xl font-bold text-dark">{item.title}</h3>
                          <div className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex gap-2">
                            <span>{item.place}</span>
                            <span>•</span>
                            <span>{item.year}</span>
                          </div>
                        </div>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-dark mb-4">Common Features of Local Ordinances</h3>
                      <p className="text-gray-600 mb-4">Most local ordinances on PWD rights include provisions for:</p>
                      <ul className="space-y-3">
                        {[
                          "Establishment of Persons with Disability Affairs Office (PDAO)",
                          "Implementation of accessibility standards",
                          "Allocation of budget for PWD programs and services",
                          "Additional benefits and privileges for PWDs",
                          "Creation of local councils on disability affairs",
                          "Conduct of awareness campaigns on disability issues",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                            <i className="fas fa-check-circle text-orange-500 mt-1" aria-hidden="true"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-dark mb-4">How to Find Local Ordinances in Your Area</h3>
                      <p className="text-gray-600 mb-4">To find local ordinances on PWD rights in your area:</p>
                      <ul className="space-y-3">
                        {[
                          "Visit the official website of your city or municipality",
                          'Check the "Ordinances" or "Legislation" section',
                          "Contact the local Sangguniang Bayan/Panlungsod",
                          "Visit the local Persons with Disability Affairs Office (PDAO)",
                          "Inquire at the local Department of Interior and Local Government (DILG) office",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                            <i className="fas fa-check-circle text-orange-500 mt-1" aria-hidden="true"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "accessibility-guides" && (
              <motion.div
                key="guides-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Information"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Information
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Accessibility Guides</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Guides for accessible public spaces, transportation, and digital platforms.
                    </p>
                  </div>
                </div>

                <div className="container mx-auto px-6 py-20 space-y-20">
                  <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <i className="fas fa-building text-2xl" aria-hidden="true"></i>
                      </div>
                      <h2 className="text-3xl font-bold text-dark">Public Buildings</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          id: "physical",
                          icon: "wheelchair",
                          title: "Physical Access",
                          desc: "Guidelines for ramps, doors, elevators, and accessible pathways in public buildings.",
                        },
                        {
                          id: "facilities",
                          icon: "restroom",
                          title: "Accessible Facilities",
                          desc: "Standards for accessible restrooms, water fountains, and public amenities.",
                        },
                        {
                          id: "communication",
                          icon: "sign-language",
                          title: "Communication Access",
                          desc: "Visual alarms, hearing loops, and communication aids for sensory disabilities.",
                        },
                      ].map((guide) => (
                        <div
                          key={guide.id}
                          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                            <i className={`fas fa-${guide.icon} text-2xl`} aria-hidden="true"></i>
                          </div>
                          <h3 className="text-xl font-bold text-dark mb-3">{guide.title}</h3>
                          <p className="text-gray-600 mb-8 flex-grow">{guide.desc}</p>
                          <button
                            type="button"
                            onClick={() => setActiveGuideModal(guide.id)}
                            className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                            aria-label={`View ${guide.title} guide`}
                          >
                            View Guide <i className="fas fa-arrow-right" aria-hidden="true"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                        <i className="fas fa-bus text-2xl" aria-hidden="true"></i>
                      </div>
                      <h2 className="text-3xl font-bold text-dark">Transportation Systems</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          id: "public",
                          icon: "subway",
                          title: "Public Transit",
                          desc: "Accessibility features for buses, trains, and subway systems.",
                        },
                        {
                          id: "parking",
                          icon: "car",
                          title: "Parking & Drop-offs",
                          desc: "Accessible parking spaces, loading zones, and passenger drop-off areas.",
                        },
                        {
                          id: "pedestrian",
                          icon: "route",
                          title: "Pedestrian Routes",
                          desc: "Sidewalks, crosswalks, and pedestrian pathways accessibility standards.",
                        },
                      ].map((guide) => (
                        <div
                          key={guide.id}
                          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 mb-6">
                            <i className={`fas fa-${guide.icon} text-2xl`} aria-hidden="true"></i>
                          </div>
                          <h3 className="text-xl font-bold text-dark mb-3">{guide.title}</h3>
                          <p className="text-gray-600 mb-8 flex-grow">{guide.desc}</p>
                          <button
                            type="button"
                            onClick={() => setActiveGuideModal(guide.id)}
                            className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                            aria-label={`View ${guide.title} guide`}
                          >
                            View Guide <i className="fas fa-arrow-right" aria-hidden="true"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                        <i className="fas fa-laptop text-2xl" aria-hidden="true"></i>
                      </div>
                      <h2 className="text-3xl font-bold text-dark">Digital Accessibility</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          id: "web",
                          icon: "code",
                          title: "Web Development",
                          desc: "WCAG compliance, ARIA labels, and semantic HTML best practices.",
                        },
                        {
                          id: "mobile",
                          icon: "mobile-alt",
                          title: "Mobile Apps",
                          desc: "iOS and Android accessibility features and development guidelines.",
                        },
                        {
                          id: "documents",
                          icon: "file-alt",
                          title: "Documents & Media",
                          desc: "Accessible PDFs, videos with captions, and image alt text guidelines.",
                        },
                      ].map((guide) => (
                        <div
                          key={guide.id}
                          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 mb-6">
                            <i className={`fas fa-${guide.icon} text-2xl`} aria-hidden="true"></i>
                          </div>
                          <h3 className="text-xl font-bold text-dark mb-3">{guide.title}</h3>
                          <p className="text-gray-600 mb-8 flex-grow">{guide.desc}</p>
                          <button
                            type="button"
                            onClick={() => setActiveGuideModal(guide.id)}
                            className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                            aria-label={`View ${guide.title} guide`}
                          >
                            View Guide <i className="fas fa-arrow-right" aria-hidden="true"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "fsl" && (
              <motion.div
                key="fsl-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Education"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Education
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">FSL Dictionary</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Comprehensive Filipino Sign Language dictionary with video demonstrations
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-6 py-12">
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {[
                      { id: "alphabet", label: "Alphabet (A–Z Signs)" },
                      { id: "numbers", label: "Numbers" },
                      { id: "greetings", label: "Greetings & Common Expressions" },
                      { id: "family", label: "Family & People" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFslTab(tab.id as any)}
                        className={`px-8 py-3 rounded-full font-bold transition-all ${fslTab === tab.id ? "bg-pink-600 text-white shadow-lg scale-105" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                        aria-label={`Show ${tab.label}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {getFSLData().map((sign) => (
                      <div
                        key={sign.id}
                        onClick={() => setSelectedSign(sign)}
                        className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1 text-center"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedSign(sign)
                          }
                        }}
                        aria-label={`View ${sign.title} sign language`}
                      >
                        <div className="aspect-square bg-gray-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                          {sign.type === "image" ? (
                            <img
                              src={sign.src}
                              alt={sign.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="relative w-full h-full">
                              <video src={sign.src} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                <i className="fas fa-play text-white opacity-80" aria-hidden="true"></i>
                              </div>
                            </div>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-800">{sign.label}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "grants" && (
              <motion.div
                key="grants-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubPage(null)
                        window.scrollTo(0, 0)
                      }}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Education"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Education
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Education Grants</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Information on scholarships and financial aid for PWD students.
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-6 py-20 space-y-24">
                  <div className="space-y-12">
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: "search-dollar",
                          title: "Find Scholarships",
                          desc: "Browse through a comprehensive list of scholarships specifically designed for PWD students in various fields and levels of education.",
                        },
                        {
                          icon: "file-alt",
                          title: "Application Guidance",
                          desc: "Get step-by-step guidance on how to prepare and submit your scholarship applications to increase your chances of success.",
                        },
                        {
                          icon: "users",
                          title: "Community Support",
                          desc: "Connect with other PWD students and alumni who have successfully secured scholarships and learn from their experiences.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-pink-500 hover:-translate-y-2 transition-transform text-center"
                        >
                          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 text-2xl">
                            <i className={`fas fa-${item.icon}`} aria-hidden="true"></i>
                          </div>
                          <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Available Opportunities</h2>
                      <p className="text-gray-600">
                        Explore the latest scholarship and financial aid opportunities for PWD students in the
                        Philippines.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                      {["all", "government", "private", "university", "international"].map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setGrantFilter(filter)}
                          className={`px-6 py-2 rounded-full font-bold capitalize transition-all ${grantFilter === filter ? "bg-pink-500 text-white shadow-lg scale-105" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                          aria-label={`Filter by ${filter}`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredGrants.map((grant) => (
                        <div
                          key={grant.id}
                          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col"
                        >
                          <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                            <h3 className="text-xl font-bold text-dark mb-2 line-clamp-2 h-14">{grant.title}</h3>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${grant.category === "government"
                                  ? "bg-blue-100 text-blue-600"
                                  : grant.category === "private"
                                    ? "bg-purple-100 text-purple-600"
                                    : grant.category === "university"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-orange-100 text-orange-600"
                                }`}
                            >
                              {grant.category}
                            </span>
                          </div>
                          <div className="p-8 pt-6 flex-grow flex flex-col">
                            <p className="text-gray-600 mb-6 text-sm">{grant.description}</p>
                            <div className="space-y-3 mb-6 text-sm text-gray-500">
                              <div className="flex items-center gap-3">
                                <Building /> {grant.provider}
                              </div>
                              <div className="flex items-center gap-3">
                                <i className="fas fa-peso-sign text-pink-400 w-5" aria-hidden="true"></i> {grant.amount}
                              </div>
                              <div className="flex items-center gap-3">
                                <i className="fas fa-calendar-alt text-pink-400 w-5" aria-hidden="true"></i> Deadline: {grant.deadline}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                              {grant.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveGrantModal(grant.id)}
                              className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200"
                              aria-label={`View details for ${grant.title}`}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "telemedicine-directory" && (
              <motion.div
                key="telemedicine-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => setActiveSubPage(null)}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Healthcare"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Healthcare
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Telemedicine Directory</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Find healthcare providers offering telemedicine services for PWDs.
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-6 py-20 space-y-16">
                  <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                      <h2 className="text-3xl font-bold text-dark">
                        <i className="fas fa-user-md mr-3 text-red-500" aria-hidden="true"></i> General Practitioners
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {telemedicineProviders
                        .filter((p) => p.category === "general")
                        .map((provider) => (
                          <div
                            key={provider.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl">
                                <i className="fas fa-user-md" aria-hidden="true"></i>
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-dark">{provider.name}</h3>
                                <div className="text-sm text-gray-500">{provider.specialty}</div>
                              </div>
                            </div>
                            <div className="space-y-3 mb-6 text-sm text-gray-600">
                              <div className="flex items-center gap-3">
                                <i className="fas fa-map-marker-alt text-red-400 w-4 text-center" aria-hidden="true"></i>{" "}
                                {provider.location}
                              </div>
                              <div className="flex items-center gap-3">
                                <i className="fas fa-clock text-red-400 w-4 text-center" aria-hidden="true"></i> {provider.schedule}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {provider.languages.map((lang, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-4">
                                <h4 className="font-bold text-gray-700 mb-2 text-xs uppercase tracking-wider">
                                  Services:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {provider.services.map((svc, i) => (
                                    <span
                                      key={i}
                                      className="bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded text-xs"
                                    >
                                      {svc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => setActiveProviderModal(provider.id)}
                                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm"
                                aria-label={`View details for ${provider.name}`}
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBookAppointment(provider.name)}
                                className="flex-1 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors text-sm shadow-md shadow-red-100"
                                aria-label={`Book appointment with ${provider.name}`}
                              >
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                      <h2 className="text-3xl font-bold text-dark">
                        <i className="fas fa-stethoscope mr-3 text-red-500" aria-hidden="true"></i> Specialists
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {telemedicineProviders
                        .filter((p) => p.category === "specialists")
                        .map((provider) => (
                          <div
                            key={provider.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl">
                                <i className={`fas ${provider.icon}`} aria-hidden="true"></i>
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-dark">{provider.name}</h3>
                                <div className="text-sm text-gray-500">{provider.specialty}</div>
                              </div>
                            </div>
                            <div className="space-y-3 mb-6 text-sm text-gray-600">
                              <div className="flex items-center gap-3">
                                <i className="fas fa-map-marker-alt text-red-400 w-4 text-center" aria-hidden="true"></i>{" "}
                                {provider.location}
                              </div>
                              <div className="flex items-center gap-3">
                                <i className="fas fa-clock text-red-400 w-4 text-center" aria-hidden="true"></i> {provider.schedule}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {provider.languages.map((lang, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-4">
                                <h4 className="font-bold text-gray-700 mb-2 text-xs uppercase tracking-wider">
                                  Services:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {provider.services.map((svc, i) => (
                                    <span
                                      key={i}
                                      className="bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded text-xs"
                                    >
                                      {svc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => setActiveProviderModal(provider.id)}
                                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm"
                                aria-label={`View details for ${provider.name}`}
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBookAppointment(provider.name)}
                                className="flex-1 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors text-sm shadow-md shadow-red-100"
                                aria-label={`Book appointment with ${provider.name}`}
                              >
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                      <h2 className="text-3xl font-bold text-dark">
                        <i className="fas fa-hands-helping mr-3 text-red-500" aria-hidden="true"></i> Therapists
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {telemedicineProviders
                        .filter((p) => p.category === "therapists")
                        .map((provider) => (
                          <div
                            key={provider.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl">
                                <i className={`fas ${provider.icon}`} aria-hidden="true"></i>
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-dark">{provider.name}</h3>
                                <div className="text-sm text-gray-500">{provider.specialty}</div>
                              </div>
                            </div>
                            <div className="space-y-3 mb-6 text-sm text-gray-600">
                              <div className="flex items-center gap-3">
                                <i className="fas fa-map-marker-alt text-red-400 w-4 text-center" aria-hidden="true"></i>{" "}
                                {provider.location}
                              </div>
                              <div className="flex items-center gap-3">
                                <i className="fas fa-clock text-red-400 w-4 text-center" aria-hidden="true"></i> {provider.schedule}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {provider.languages.map((lang, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-4">
                                <h4 className="font-bold text-gray-700 mb-2 text-xs uppercase tracking-wider">
                                  Services:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {provider.services.map((svc, i) => (
                                    <span
                                      key={i}
                                      className="bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded text-xs"
                                    >
                                      {svc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => setActiveProviderModal(provider.id)}
                                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm"
                                aria-label={`View details for ${provider.name}`}
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBookAppointment(provider.name)}
                                className="flex-1 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors text-sm shadow-md shadow-red-100"
                                aria-label={`Book appointment with ${provider.name}`}
                              >
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubPage === "mental-health" && (
              <motion.div
                key="mental-health-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <div className="pt-32 pb-24 rounded-b-[3rem] shadow-xl" style={customHeaderStyle}>
                  <div className="container mx-auto px-6 relative z-10">
                    <button
                      type="button"
                      onClick={() => setActiveSubPage(null)}
                      className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                      aria-label="Back to Healthcare"
                    >
                      <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Healthcare
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Mental Health Support</h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                      Access mental health resources, hotlines, and counseling services.
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-6 py-20 space-y-16">
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-2">24/7 Crisis Hotlines</h2>
                      <p className="text-gray-600">
                        Free, confidential support available 24 hours a day, 7 days a week
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {mentalHealthResources.hotlines.map((hotline, i) => (
                        <div
                          key={i}
                          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl">
                              <i className={`fas fa-${hotline.icon}`} aria-hidden="true"></i>
                            </div>
                            <h3 className="font-bold text-lg text-dark">{hotline.title}</h3>
                          </div>
                          <ul className="space-y-4">
                            {hotline.items?.map((item, j) => (
                              <li key={j} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                <div className="font-medium text-gray-800 text-sm mb-1">{item.name}</div>
                                <div className="text-red-500 font-bold text-sm bg-red-50 inline-block px-2 py-1 rounded">
                                  {item.value}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-2">Online Counseling Services</h2>
                      <p className="text-gray-600">
                        Professional mental health support available online from licensed practitioners
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {mentalHealthResources.online.map((service, i) => (
                        <div
                          key={i}
                          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl">
                              <i className={`fas fa-${service.icon}`} aria-hidden="true"></i>
                            </div>
                            <h3 className="font-bold text-lg text-dark">{service.title}</h3>
                          </div>
                          {service.content ? (
                            <div className="space-y-4">
                              {service.content.map((item, j) => (
                                <div key={j}>
                                  <div className="font-bold text-gray-800 text-sm mb-1">{item.name}</div>
                                  <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                              <ul className="space-y-2">
                                {service.list?.map((item, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                                    <i className="fas fa-check text-red-400 mt-0.5" aria-hidden="true"></i>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-2">Support Groups</h2>
                      <p className="text-gray-600">
                        Connect with others who understand what you're going through
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {mentalHealthResources.groups.map((group, i) => (
                        <div
                          key={i}
                          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl">
                              <i className={`fas fa-${group.icon}`} aria-hidden="true"></i>
                            </div>
                            <h3 className="font-bold text-lg text-dark">{group.title}</h3>
                          </div>
                          <div className="space-y-4">
                            {group.content?.map((item, j) => (
                              <div key={j}>
                                <div className="font-bold text-gray-800 text-sm mb-1">{item.name}</div>
                                <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            <div
              className={`pt-32 pb-24 rounded-b-[3rem] shadow-xl ${selectedService.bgColor} transition-colors duration-500 relative`}
              style={
                selectedService.title === "Information & Awareness Services" ||
                  selectedService.title === "Education & Learning Support" ||
                  selectedService.title === "Healthcare & Wellness Services" ||
                  selectedService.title === "Legal & Social Services" ||
                  selectedService.title === "Assistive Technologies in the Philippines"
                  ? customHeaderStyle
                  : {}
              }
            >
              <div className="container mx-auto px-6 relative z-10">
                <button
                  type="button"
                  onClick={handleBackToServices}
                  className="mb-8 px-6 py-2.5 rounded-full bg-white text-dark font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                  aria-label="Back to services"
                >
                  <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" aria-hidden="true"></i> Back to Services
                </button>

                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                  <div
                    className={`w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center ${selectedService.color} flex-shrink-0`}
                  >
                    {(() => {
                      const iconKey = servicesList.find((s) => s.title === selectedService.title)?.icon || "star"
                      const Icon = iconMap[iconKey as keyof typeof iconMap] || Star
                      return <Icon className="w-12 h-12" strokeWidth={2.2} aria-hidden="true" />
                    })()}
                  </div>
                  <div>
                    <h1
                      className={`text-3xl md:text-5xl font-bold mb-4 ${selectedService.title === "Information & Awareness Services" || selectedService.title === "Education & Learning Support" || selectedService.title === "Healthcare & Wellness Services" || selectedService.title === "Legal & Social Services" || selectedService.title === "Assistive Technologies in the Philippines" ? "text-white" : selectedService.color.replace("text-", "text-gray-900 ")}`}
                    >
                      {selectedService.title}
                    </h1>
                    <p
                      className={`text-xl max-w-3xl leading-relaxed ${selectedService.title === "Information & Awareness Services" || selectedService.title === "Education & Learning Support" || selectedService.title === "Healthcare & Wellness Services" || selectedService.title === "Legal & Social Services" || selectedService.title === "Assistive Technologies in the Philippines" ? "text-gray-200" : "text-gray-700"}`}
                    >
                      {selectedService.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-6 py-20">
              <div
                className={`grid gap-8 ${selectedService.features.length <= 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}
              >
                {selectedService.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl ${selectedService.bgColor} flex items-center justify-center flex-shrink-0 mt-1`}
                      >
                        <i className={`fas fa-${feature.icon} text-2xl ${selectedService.color}`} aria-hidden="true"></i>
                      </div>
                      <div>
                        {feature.type && (
                          <span
                            className={`text-xs font-bold uppercase tracking-wider mb-1 block ${selectedService.color.replace("text-", "text-opacity-80 ")}`}
                          >
                            {feature.type}
                          </span>
                        )}
                        <h3 className="font-bold text-xl text-dark leading-tight">{feature.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{feature.description}</p>

                    {feature.items && feature.items.length > 0 && (
                      <ul className="mb-6 space-y-2">
                        {feature.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                            <i className={`fas fa-check mt-1 ${selectedService.color}`} aria-hidden="true"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {feature.action && (
                      <button
                        type="button"
                        onClick={() => {
                          if (feature.title === "Agency Directory" && feature.action === "Browse Directory") {
                            setActiveSubPage("agency-directory")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "Legal Rights" && feature.action === "Learn Your Right") {
                            setActiveSubPage("legal-rights")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (
                            feature.title === "PWD ID & Benefits" &&
                            (feature.action === "Get Help" || feature.action === "Get Assistance")
                          ) {
                            setActiveSubPage("pwd-benefits")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "Accessibility Guides" && feature.action === "View Guides") {
                            setActiveSubPage("accessibility-guides")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "FSL Dictionary" && feature.action === "View Dictionary") {
                            setActiveSubPage("fsl")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "Education Grants" && feature.action === "View Opportunities") {
                            setActiveSubPage("grants")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "Telemedicine Directory" && feature.action === "Find Providers") {
                            setActiveSubPage("telemedicine-directory")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "Mental Health Support" && feature.action === "Get Support") {
                            setActiveSubPage("mental-health")
                            window.scrollTo(0, 0)
                            return
                          }
                          if (feature.title === "Legal Consultation" && feature.action === "Request Consultation") {
                            setActiveSubPage("legal-consultation")
                            window.scrollTo(0, 0)
                            return
                          }

                          const techModalMap: Record<string, string> = {
                            "Mobility Aids": "mobility-modal",
                            "Visual Aids": "visual-modal",
                            "Hearing Aids": "hearing-modal",
                            "Cognitive Aids": "cognitive-modal",
                            "Communication Aids": "aids-modal",
                            "Daily Living Aids": "living-modal",
                          }

                          if (techModalMap[feature.title]) {
                            setActiveTechModal(techModalMap[feature.title])
                            return
                          }

                          if (feature.sections) {
                            setActiveFeatureModal(feature)
                          }
                        }}
                        className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2
                               ${selectedService.color.replace("text-", "bg-").replace("600", "500")} text-white hover:shadow-xl hover:-translate-y-1`}
                        aria-label={`${feature.action} for ${feature.title}`}
                      >
                        {feature.actionIcon && <i className={`fas fa-${feature.actionIcon}`} aria-hidden="true"></i>}
                        {feature.action}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeFeatureModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setActiveFeatureModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveFeatureModal(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-dark"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl" aria-hidden="true"></i>
              </button>
              <div
                className={`w-16 h-16 rounded-2xl ${selectedService?.bgColor || "bg-gray-100"} flex items-center justify-center mb-6`}
              >
                <i
                  className={`fas fa-${activeFeatureModal.icon} text-3xl ${selectedService?.color || "text-gray-600"}`}
                  aria-hidden="true"
                ></i>
              </div>
              <h2 className="text-2xl font-bold mb-4">{activeFeatureModal.title}</h2>
              <p className="text-gray-600 mb-8">{activeFeatureModal.description}</p>

              {activeFeatureModal.sections?.map((section, i) => (
                <div key={i} className="mb-6">
                  <h3 className="font-bold text-lg text-dark mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-600">
                        <i className={`fas fa-check mt-1 ${selectedService?.color || "text-green-500"}`} aria-hidden="true"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.content && <p className="text-gray-600">{section.content}</p>}
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeTechModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setActiveTechModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveTechModal(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-dark"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl" aria-hidden="true"></i>
              </button>

              {(() => {
                const tech = techContent[activeTechModal]
                if (!tech) return null
                return (
                  <>
                    <h2 className="text-2xl font-bold text-teal-800 mb-4">{tech.title}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">{tech.description}</p>

                    <div className="space-y-8">
                      {tech.sections.map((section, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-lg text-gray-900 mb-4 border-l-4 border-teal-500 pl-3">
                            {section.title}
                          </h3>
                          <ul className="space-y-3">
                            {section.items.map((item, k) => {
                              const [title, desc] = item.includes(":") ? item.split(":") : [item, ""]
                              return (
                                <li key={k} className="flex items-start gap-3 text-gray-600 text-sm">
                                  <i className="fas fa-check-circle text-teal-500 mt-1 flex-shrink-0" aria-hidden="true"></i>
                                  <span>
                                    {desc ? (
                                      <>
                                        <strong>{title}:</strong> {desc}
                                      </>
                                    ) : (
                                      title
                                    )}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      ))}

                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-4 border-l-4 border-teal-500 pl-3">
                          Resources & Where to Find
                        </h3>
                        <ul className="space-y-2">
                          {tech.resources.map((resource, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg text-sm text-gray-600"
                            >
                              <i className="fas fa-map-marker-alt text-teal-400" aria-hidden="true"></i>
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )
              })()}

              <button
                type="button"
                onClick={() => setActiveTechModal(null)}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold mt-8 shadow-lg shadow-teal-200 hover:bg-teal-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGrantModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setActiveGrantModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const grant =
                  grantOpportunities.find((g) => g.id === activeGrantModal) ||
                  grantResources.find((r) => r.id === activeGrantModal)
                if (!grant) return null
                const content = grant.modalContent
                if ("provider" in content) {
                  const c = content as GrantOpportunity["modalContent"]
                  return (
                    <>
                      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-xl text-dark">{grant.title}</h3>
                        <button
                          type="button"
                          onClick={() => setActiveGrantModal(null)}
                          className="text-gray-400 hover:text-dark transition-colors"
                          aria-label="Close modal"
                        >
                          <i className="fas fa-times text-xl" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div className="p-8">
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <h4 className="text-sm font-bold text-gray-500 uppercase mb-1">Provider</h4>
                              <p className="font-medium text-dark">{c.provider}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <h4 className="text-sm font-bold text-gray-500 uppercase mb-1">Amount</h4>
                              <p className="font-medium text-dark">{c.amount}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <h4 className="text-sm font-bold text-gray-500 uppercase mb-1">Deadline</h4>
                              <p className="font-medium text-dark">{c.deadline}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <h4 className="text-sm font-bold text-gray-500 uppercase mb-1">Category</h4>
                              <p className="font-medium text-dark">{c.category}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-dark mb-3">Description</h4>
                            <p className="text-gray-600">{c.description}</p>
                          </div>

                          <div>
                            <h4 className="font-bold text-dark mb-3">Eligibility Requirements</h4>
                            <ul className="space-y-2">
                              {c.eligibility.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600">
                                  <i className="fas fa-check-circle text-green-500 mt-1" aria-hidden="true"></i>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-dark mb-3">Application Process</h4>
                            <ol className="space-y-2">
                              {c.applicationProcess.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600">
                                  <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div>
                            <h4 className="font-bold text-dark mb-3">Contact Information</h4>
                            <p className="text-gray-600">{c.contact}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                } else {
                  const c = content as GrantResource["modalContent"]
                  return (
                    <>
                      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-xl text-dark">{c.title}</h3>
                        <button
                          type="button"
                          onClick={() => setActiveGrantModal(null)}
                          className="text-gray-400 hover:text-dark transition-colors"
                          aria-label="Close modal"
                        >
                          <i className="fas fa-times text-xl" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div className="p-8">
                        {c.description && (
                          <div className="mb-8">
                            <h4 className="font-bold text-dark mb-3">Description</h4>
                            <p className="text-gray-600">{c.description}</p>
                          </div>
                        )}

                        <div className="space-y-8">
                          {c.sections.map((section, i) => (
                            <div key={i}>
                              <h4 className="font-bold text-dark mb-4">{section.title}</h4>
                              {section.content && <p className="text-gray-600 mb-4">{section.content}</p>}
                              {section.items && (
                                <ul className="space-y-2">
                                  {section.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3 text-gray-600">
                                      <i className="fas fa-check-circle text-pink-500 mt-1" aria-hidden="true"></i>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )
                }
              })()}
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGuideModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setActiveGuideModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const guide = guidesContent[activeGuideModal]
                if (!guide) return null
                return (
                  <>
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-xl text-dark">{guide.title}</h3>
                      <button
                        type="button"
                        onClick={() => setActiveGuideModal(null)}
                        className="text-gray-400 hover:text-dark transition-colors"
                        aria-label="Close modal"
                      >
                        <i className="fas fa-times text-xl" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="p-8">
                      <div className="space-y-8">
                        {guide.sections.map((section, i) => (
                          <div key={i}>
                            <h4 className="font-bold text-lg text-dark mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                              {section.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-gray-600">
                                  <i className="fas fa-check-circle text-blue-500 mt-1" aria-hidden="true"></i>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSign && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setSelectedSign(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-xl text-dark">{selectedSign.title}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedSign(null)}
                  className="text-gray-400 hover:text-dark transition-colors"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-xl" aria-hidden="true"></i>
                </button>
              </div>
              <div className="p-8">
                <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
                  {selectedSign.type === "image" ? (
                    <img src={selectedSign.src} alt={selectedSign.title} className="w-full h-full object-contain" />
                  ) : (
                    <video
                      src={selectedSign.src}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                      aria-label={`Video demonstration of ${selectedSign.title} sign`}
                    />
                  )}
                </div>
                <div className="mt-6 text-center">
                  <h4 className="text-4xl font-bold text-gray-900 mb-2">{selectedSign.label}</h4>
                  <p className="text-gray-500">Filipino Sign Language</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeProviderModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setActiveProviderModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const provider = telemedicineProviders.find((p) => p.id === activeProviderModal)
                if (!provider) return null
                return (
                  <>
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl">
                          <i className={`fas ${provider.icon}`} aria-hidden="true"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-dark">{provider.name}</h3>
                          <p className="text-gray-500 text-sm">{provider.specialty}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveProviderModal(null)}
                        className="text-gray-400 hover:text-dark transition-colors"
                        aria-label="Close modal"
                      >
                        <i className="fas fa-times text-xl" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="p-8">
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">Location</h4>
                            <div className="flex items-center gap-3 text-gray-600">
                              <i className="fas fa-map-marker-alt text-red-400" aria-hidden="true"></i>
                              <span>{provider.location}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">Schedule</h4>
                            <div className="flex items-center gap-3 text-gray-600">
                              <i className="fas fa-clock text-red-400" aria-hidden="true"></i>
                              <span>{provider.schedule}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-700 mb-2">Languages</h4>
                          <div className="flex flex-wrap gap-2">
                            {provider.languages.map((lang, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-700 mb-2">Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {provider.services.map((svc, i) => (
                              <span
                                key={i}
                                className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-sm"
                              >
                                {svc}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">About</h4>
                            <p className="text-gray-600">{provider.bio.about}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">Education</h4>
                            <p className="text-gray-600">{provider.bio.education}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">Experience</h4>
                            <p className="text-gray-600">{provider.bio.experience}</p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => handleBookAppointment(provider.name)}
                            className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBookingModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setIsBookingModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {bookingStatus === "success" ? (
                <div className="text-center p-12">
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-check-circle text-4xl" aria-hidden="true"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Appointment Booked!</h3>
                  <p className="text-gray-600 mb-8">
                    Your appointment request has been sent successfully. The provider will contact you soon to confirm
                    details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-xl text-dark">Book Appointment</h3>
                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(false)}
                      className="text-gray-400 hover:text-dark transition-colors"
                      aria-label="Close modal"
                    >
                      <i className="fas fa-times text-xl" aria-hidden="true"></i>
                    </button>
                  </div>
                  <form ref={bookingFormRef} onSubmit={handleBookingSubmit} className="p-8 space-y-6">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-user-md text-red-500" aria-hidden="true"></i>
                        <div>
                          <h4 className="font-bold text-red-700">Booking with:</h4>
                          <p className="text-red-600 text-sm">{bookingProviderName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="user_email"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all cursor-pointer"
                        aria-required="true"
                      >
                        <option value="">Select a time</option>
                        <option value="morning">Morning (9AM-12PM)</option>
                        <option value="afternoon">Afternoon (1PM-5PM)</option>
                        <option value="evening">Evening (6PM-9PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Consultation *</label>
                      <textarea
                        name="reason"
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all resize-none"
                        placeholder="Briefly describe the reason for your consultation..."
                        aria-required="true"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Accessibility Needs</label>
                      <textarea
                        name="accessibilityNeeds"
                        rows={2}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all resize-none"
                        placeholder="Any specific accessibility requirements..."
                      ></textarea>
                    </div>

                    {bookingStatus === "error" && (
                      <div className="text-red-500 text-sm font-bold text-center">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsBookingModalOpen(false)}
                        className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                        disabled={bookingStatus === "submitting"}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                        disabled={bookingStatus === "submitting"}
                      >
                        {bookingStatus === "submitting" ? (
                          <>
                            <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...
                          </>
                        ) : (
                          "Book Appointment"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default Services
