'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Resource {
  type: string;
  title: string;
  format: string[];
  category: string;
  content: string;
}

const AccessibleLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(18);
  const [activeCategoryModal, setActiveCategoryModal] = useState<string | null>(null);

  // Data for Category Modals
  const categoryData: Record<string, { title: string; content: string }> = {
    "Healthcare": {
      title: "Healthcare Resources",
      content: `
          <ul class="space-y-3">
              <li><a href="https://pdao.taguig.info/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Taguig City Persons with Disability Affairs Office (PDAO)</a></li>
              <li><a href="https://iris.who.int/bitstream/handle/10665/336857/9789290618928-eng.pdf" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Super Health Centers with Disability-Inclusive Features</a></li>
              <li><a href="https://pdao.taguig.info/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Taguig Disability Resource and Development Center</a></li>
              <li><a href="https://newsinfo.inquirer.net/2039720/taguig-opens-yakap-center-for-children-with-disabilities2" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Taguig Yakap Center for Children with Disabilities</a></li>
              <li><a href="https://www.treasury.gov.ph/wp-content/uploads/2021/04/FC2021.pdf" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> National Government Agencies</a></li>
              <li><a href="https://ncda.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> National Council on Disability Affairs (NCDA)</a></li>
              <li><a href="https://doh.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Department of Health (DOH)</a></li>
              <li><a href="https://www.dswd.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Department of Social Welfare and Development (DSWD)</a></li>
              <li><a href="https://mariahealth.ph/facilities/taguig-pateros-hospital/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Taguig-Pateros District Hospital (TPDH)</a></li>
              <li><a href="https://www.stlukes.com.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> St. Luke's Medical Center - Global City</a></li>
              <li><a href="https://ddb.gov.ph/wp-content/uploads/2023/02/DATRC-as-of-Feb9-2022.pdf" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Rehabilitation Centers (within Metro Manila)</a></li>
              <li><a href="https://www.maxihealth.com.ph/services/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Primary Care Clinics (Accessibility)</a></li>
              <li><a href="https://www.pfrd.org.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Philippine Foundation for the Rehabilitation of the Disabled (PFRD)</a></li>
              <li><a href="https://www.ets.org/disabilities/resources/organizations.html" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Various disability-specific organizations</a></li>
          </ul>
      `
    },
    "Education": {
        title: "Education Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://www.angelicum.edu.ph/angelicum-system/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Angelicum College</a></li>
                <li><a href="https://www.benilde.edu.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> De La Salle College of Saint Benilde (DLS-CSB)</a></li>
                <li><a href="https://mc.edu.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Miriam College</a></li>
                <li><a href="https://plm.edu.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Pamantasan ng Lungsod ng Maynila (PLM)</a></li>
                <li><a href="https://www.pnu.edu.ph" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Philippine Normal University (PNU)</a></li>
                <li><a href="https://www.pup.edu.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Polytechnic University of the Philippines (PUP)</a></li>
                <li><a href="https://www.ateneo.edu/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Ateneo de Manila University</a></li>
                <li><a href="https://ncda.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> National Council on Disability Affairs (NCDA)</a></li>
                <li><a href="https://www.dswd.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Department of Social Welfare and Development (DSWD)</a></li>
                <li><a href="https://www.pfrd.org.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Philippine Foundation for the Rehabilitation of the Disabled, Inc. (PFRD)</a></li>
                <li><a href="https://projectinclusion.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Project Inclusion Network</a></li>
                <li><a href="http://www.autismsocietyphilippines.org/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Autism Society of the Philippines</a></li>
                <li><a href="https://www.savethechildren.org.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Save the Children Philippines</a></li>
            </ul>
        `
    },
    "Livelihood & Employment": {
        title: "Employment Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://projectinclusion.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Project Inclusion Network</a></li>
                <li><a href="https://www.pbsp.org.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Philippine Business for Social Progress (PBSP)</a></li>
                <li><a href="https://www.unilever.com.ph/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Unilever Philippines</a></li>
                <li><a href="https://www.accenture.com/ph-en" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Accenture Philippines</a></li>
                <li><a href="https://www.ibm.com/account/ph/en/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> IBM Philippines</a></li>
                <li><a href="https://www.tp.com/en-us/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Teleperformance</a></li>
                <li><a href="https://www.concentrix.com/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Concentrix</a></li>
                <li><a href="https://www.upu.int/en/partner-with-us/who-we-work-with/ngos-and-foundations" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Various NGOs and Foundations</a></li>
                <li><a href="https://www.linkedin.com/company/city-government-of-taguig?original_referer=https%3A%2F%2Fwww.google.com%2F" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> Local Government Unit of Taguig (PDAO)</a></li>
                <li><a href="https://tesdaonlineprogram.com/list-of-tesda-accredited-schools-in-manila/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i> TESDA Training Centers in Metro Manila</a></li>
            </ul>
        `
    },
    "Social Services": {
        title: "Social Services Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://assistance.ph/financial-cash-assistance-programs/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Financial Assistance</a></li>
                <li><a href="https://car.dswd.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Social Pension for Indigent Senior Citizens (SPISC) with Disability</a></li>
                <li><a href="https://aics.dswd.gov.ph/aics-program/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Assistance to Individuals in Crisis Situation (AICS)</a></li>
                <li><a href="https://car.dswd.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Pantawid Pamilyang Pilipino Program (4Ps)</a></li>
                <li><a href="https://www.dswd.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Department of Social Welfare and Development (DSWD)</a></li>
                <li><a href="https://ncda.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>National Council on Disability Affairs (NCDA)</a></li>
                <li><a href="https://www.deped.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Department of Education (DepEd)</a></li>
                <li><a href="https://www.tesda.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Technical Education and Skills Development Authority (TESDA)</a></li>
                <li><a href="https://quezoncity.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Public Employment Service Office (PESO)</a></li>
                <li><a href="https://www.philhealth.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Philippine Health Insurance Corporation (PhilHealth)</a></li>
                <li><a href="https://www.philstar.com/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Local Government Unit of Taguig</a></li>
                <li><a href="https://www.pfrd.org.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Philippine Foundation for the Rehabilitation of the Disabled, Inc. (PFRD)</a></li>
                <li><a href="https://www.betterplace.org/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>National Federation of Co-operatives of Persons with Disability</a></li>
                <li><a href="http://www.autismsocietyphilippines.org/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Autism Society of the Philippines</a></li>
                <li><a href="https://specialolympicspilipinas.org/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Down Syndrome Association of the Philippines</a></li>
                <li><a href="https://illcphilippines.com/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Independent Living Learning Center (ILLC)</a></li>
            </ul>
        `
    },
    "Legal Assistance": {
        title: "Legal Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://pao.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Public Attorney's Office (PAO)</a></li>
                <li><a href="https://chr.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Commission on Human Rights (CHR)</a></li>
                <li><a href="https://ncda.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>National Council on Disability Affairs (NCDA)</a></li>
                <li><a href="https://www.dilg.gov.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Local Government Units (LGUs) - including Taguig City</a></li>
                <li><a href="https://www.justice.gov/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Department of Justice (DOJ)</a></li>
                <li><a href="https://www.pfrd.org.ph/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Philippine Foundation for the Rehabilitation of the Disabled, Inc. (PFRD)</a></li>
                <li><a href="https://education-profiles.org/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Inclusion Philippines</a></li>
                <li><a href="https://seramount.com/articles/12-organizations-for-people-with-disabilities-you-should-know/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Organizations focusing on specific disabilities</a></li>
                <li><a href="https://www.justice.gov/eoir/list-pro-bono-legal-service-providers"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Pro Bono Legal Aid Organizations</a></li>
            </ul>
        `
    },
    "Assistive Technology": {
        title: "Assistive Technology Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://quezoncity.gov.ph/program/provision-of-assistive-devices/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Assistive device lending programs</a></li>
                <li><a href="https://assistance.ph/assistive-technology-for-pwds-in-the-philippines/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Technology training workshops</a></li>
                <li><a href="https://www.dlsu.edu.ph/research/research-centers/ibeht/robotic-rehabilitation-devices/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Software accessibility solutions</a></li>
                <li><a href="http://www.philhealth.gov.ph/news/2016/assistive_tech.html"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Adaptive equipment funding</a></li>
                <li><a href="https://www.remotestaff.ph/blog/assistive-technologies-for-pwds-needed-remote-work/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Smart home technology assistance</a></li>
            </ul>
        `
    },
    "Transportation": {
        title: "Transportation Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://www.change.org/p/ride-without-limits-making-philippine-public-transport-more-accessible-to-pwds"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Accessible transportation services</a></li>
                <li><a href="https://mb.com.ph/2024/12/10/step-free-access-in-ph-public-transportation"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Discounted transit passes</a></li>
                <li><a href="https://www.facebook.com/wheelmobiletransportation/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Paratransit information</a></li>
                <li><a href="https://verafiles.org/articles/accessibility-sensitivity-toward-pwd-commuters"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Volunteer driver programs</a></li>
                <li><a href="https://assistance.ph/transportation-assistance-programs/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Vehicle modification assistance</a></li>
            </ul>
        `
    },
    "Recreational Activities": {
        title: "Recreation Resources",
        content: `
            <ul class="space-y-3">
                <li><a href="https://cavite.gov.ph/home/recreational-activities-and-gift-giving-for-pwds/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Adaptive sports programs</a></li>
                <li><a href="https://ncda.gov.ph/2020/10/11/ncda-lead-the-virtual-training-on-sports-for-persons-with-disabilities/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Inclusive community events</a></li>
                <li><a href="https://orderofmaltaphilippines.org/a-summer-to-remember-the-2nd-asia-pacific-youth-camp-for-persons-with-disabilities/"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Accessible parks and facilities</a></li>
                <li><a href="https://www.pna.gov.ph/articles/1201448"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Art and music therapy</a></li>
                <li><a href="https://www.solidaritesjeunesses.org/chantier/philippine-accessible-disability-services-inc-pads-2332"  target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline flex items-start gap-2"><i class="fas fa-external-link-alt mt-1"></i>Social clubs and groups</a></li>
            </ul>
        `
    },
  };

  const categories = [
    { title: 'Healthcare', icon: 'heartbeat', desc: 'This category includes service related to physical and mental health, well-being, and medical care.', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=3080&auto=format&fit=crop' },
    { title: 'Education', icon: 'book-reader', desc: 'This category encompasses services related to learning, skill development, and academic advancement.', img: 'https://futureeducationmagazine.com/wp-content/uploads/2024/06/1.3-Future-Directions-in-Educational-Policy.jpg' },
    { title: 'Livelihood & Employment', icon: 'briefcase', desc: 'This category includes services that support individuals in finding and maintaining employment and improving their economic well-being', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop' },
    { title: 'Social Services', icon: 'users', desc: 'This category encompasses services that address basic needs, provide support, and promote social welfare.', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop' },
    { title: 'Legal Assistance', icon: 'gavel', desc: 'This category includes services that provide legal advice, representation, and information.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Q2Oy7ARPk_5YOo7QT6a5jClXNBGpobzFTQ&s' },
    { title: 'Assistive Technology', icon: 'laptop', desc: 'This category includes services and resources related to devices, software, and equipment that help individuals with disabilities perform daily activities and increase independence.', img: 'https://www.augsburg.edu/class/wp-content/uploads/sites/78/2014/05/AT-Mind-Map-for-Website.jpg' },
    { title: 'Transportation', icon: 'bus', desc: 'This category includes services that help individuals get from one place to another.', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop' },
    { title: 'Recreational Activities', icon: 'wheelchair', desc: 'This category includes opportunities for leisure, hobbies, sports, and social engagement.', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2940&auto=format&fit=crop' }
  ];

  const resources: Resource[] = [
    { 
      type: 'law', 
      title: 'Republic Act 7277', 
      format: ['PDF', 'Audio', 'Braille'], 
      category: 'Legal',
      content: `REPUBLIC ACT NO. 7277\n\nAN ACT PROVIDING FOR THE REHABILITATION, SELF-DEVELOPMENT AND SELF-RELIANCE OF DISABLED PERSON AND THEIR INTEGRATION INTO THE MAINSTREAM OF SOCIETY AND FOR OTHER PURPOSES.\n\nSECTION 1. Title. — This Act shall be known and cited as the "Magna Carta for Disabled Persons."\n\nSECTION 2. Declaration of Policy. — The grant of the rights and privileges for disabled persons shall be guided by the following principles:\n\n(a) Disabled persons are part of the Philippine society, thus the State shall give full support to the improvement of the total well-being of disabled persons and their integration into the mainstream of society. Toward this end, the State shall adopt policies ensuring the rehabilitation, self-development and self-reliance of disabled persons. It shall develop their skills and potentials to enable them to compete favorably for available opportunities.\n\n(b) Disabled persons have the same rights as other people to take their proper place in society. They should be able to live freely and as independently as possible. This must be the concern of everyone — the family, community and all government and non-government organizations. Disabled person's rights must never be perceived as welfare services by the Government.\n\n(c) The rehabilitation of the disabled persons shall be the concern of the Government in order to foster their capability to attain a more meaningful, productive and satisfying life. To reach out to a greater number of disabled persons, the rehabilitation services and benefits shall be expanded beyond the traditional urban-based centers to community based programs, that will ensure full participation of different sectors as supported by national and local government agencies.`
    },
    { 
      type: 'guide', 
      title: 'Assistive Tech Guide', 
      format: ['EPUB', 'Large Print'], 
      category: 'Tech',
      content: `CHAPTER 1: UNDERSTANDING ASSISTIVE TECHNOLOGY\n\nAssistive technology (AT) is any item, piece of equipment, software program, or product system that is used to increase, maintain, or improve the functional capabilities of persons with disabilities.\n\n1.1 Screen Readers\nScreen readers are software programs that allow blind or visually impaired users to read the text that is displayed on the computer screen with a speech synthesizer or braille display. A screen reader is the interface between the computer's operating system, its applications, and the user.\n\nPopular Screen Readers:\n- NVDA (NonVisual Desktop Access): A free, open-source screen reader for Microsoft Windows.\n- JAWS (Job Access With Speech): A computer screen reader program for Microsoft Windows that allows blind and visually impaired users to read the screen either with a text-to-speech output or by a refreshable Braille display.\n\n1.2 Screen Magnifiers\nScreen magnification software is used by individuals with low vision to enlarge the information displayed on the computer screen.`
    },
    { 
      type: 'edu', 
      title: 'Inclusive Education Handbook', 
      format: ['PDF', 'Audio'], 
      category: 'Education',
      content: `PRINCIPLES OF INCLUSIVE EDUCATION\n\nInclusive education means different and diverse students learning side by side in the same classroom. They enjoy field trips and after-school activities together. They participate in student government together. And they attend the same sports meets and plays.\n\nKey Principles:\n\n1. Diversity is a Strength\nInclusive education values diversity and the unique contributions each student brings to the classroom. In a truly inclusive setting, every child feels safe and has a sense of belonging.\n\n2. Universal Design for Learning (UDL)\nUDL is a framework to improve and optimize teaching and learning for all people based on scientific insights into how humans learn.\n- Multiple Means of Representation: Give learners various ways of acquiring information and knowledge.\n- Multiple Means of Expression: Provide learners alternatives for demonstrating what they know.`
    },
    { 
      type: 'job', 
      title: 'Employment Opportunities', 
      format: ['EPUB', 'Audio'], 
      category: 'Career',
      content: `LATEST CAREER OPPORTUNITIES FOR PWDs (October 2024)\n\n1. Virtual Assistant / Data Entry Specialist\nCompany: Global Tech Solutions\nLocation: Remote (Work from Home)\nType: Full-time\nRequirements:\n- Basic computer proficiency (MS Office, Google Workspace)\n- Reliable internet connection\n- Attention to detail\nAccessibility:\n- Screen reader compatible workflow\n- Flexible hours\n\n2. Customer Support Representative (Non-Voice)\nCompany: Inclusive BPO\nLocation: Pasig City (Wheelchair Accessible Office) or Remote\nType: Full-time / Part-time\nRequirements:\n- Good written English skills\n- Typing speed of at least 35 WPM`
    },
    { 
      type: 'health', 
      title: 'PWD Healthcare Rights', 
      format: ['PDF', 'Sign Language Video'], 
      category: 'Health',
      content: `HEALTHCARE RIGHTS AND PRIVILEGES FOR PWDs\n\nUnder the Philippine Laws, Persons with Disabilities are entitled to specific health benefits to ensure their well-being and access to medical services.\n\n1. 20% Discount and VAT Exemption\nOn the purchase of medicines in all drugstores.\nOn medical and dental services including diagnostic and laboratory fees such as, but not limited to, x-rays, computerized tomography scans, and blood tests, and professional fees of attending doctors in all government facilities.\n\n2. Mandatory PhilHealth Coverage\nAll persons with disabilities (PWDs) are automatically covered by the National Health Insurance Program (NHIP) of the Philippine Health Insurance Corporation (PhilHealth).\n\n3. Priority Lane\nExpress lanes for PWDs in all private, commercial, and government establishments.`
    },
    { 
      type: 'story', 
      title: 'Success Stories 2024', 
      format: ['PDF', 'Audio'], 
      category: 'Inspiration',
      content: `MARIA'S JOURNEY: BREAKING BARRIERS IN TECH\n\nMaria, 28, lost her vision at the age of 12 due to a genetic condition. For years, she struggled with the limited resources available in her rural hometown. However, her passion for technology never waned.\n\n"I remember holding a radio when I was young, wondering how it worked," Maria shares. "When I lost my sight, I thought my dream of working with computers was over."\n\nIn 2020, Maria joined the "Accessible Connections" Digital Literacy Program. She was introduced to screen readers (NVDA) and learned touch typing.\n\n"It was difficult at first," she admits. "But the trainers were patient. They taught me that my disability doesn't define my capability."\n\nToday, Maria works as a Junior Backend Developer for a fintech company in Manila.`
    },
  ];

  const toggleBookmark = (title: string) => {
    if (bookmarked.includes(title)) {
      setBookmarked(prev => prev.filter(t => t !== title));
    } else {
      setBookmarked(prev => [...prev, title]);
    }
  };

  const handleFontSize = (action: 'increase' | 'decrease') => {
    setFontSize(prev => {
      const newSize = action === 'increase' ? prev + 2 : prev - 2;
      return Math.min(Math.max(newSize, 12), 32);
    });
  };

  const filteredResources = activeTab === 'all' 
    ? resources 
    : activeTab === 'saved'
    ? resources.filter(r => bookmarked.includes(r.title))
    : resources.filter(r => r.category.toLowerCase() === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Accessible Library</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
              A curated collection of resources available in multiple accessible formats including Braille, Audio, Large Print, and Sign Language.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        
        {/* Browse by Category Swiper */}
        <div className="mb-20">
            <div className="accessible-headers text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                centeredSlides={false}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    el: '.swiper-pagination'
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Pagination, Navigation]}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                className="w-full px-4 relative group"
            >
                {categories.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="services-card h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
                            <div className="services-info h-full flex flex-col">
                                <div className="services-card-image h-48 bg-gray-100 relative overflow-hidden">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <i className={`fas fa-${item.icon} text-3xl`}></i>
                                    </div>
                                </div>
                                <div className="services-card-content p-6 flex flex-col flex-grow">
                                    <h3 className="services-card-title text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="services-card-text text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{item.desc}</p>
                                    <div className="services-card-footer mt-auto pt-4 border-t border-gray-100 flex justify-end">
                                        <button 
                                            className="services-card-button px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                                            onClick={() => setActiveCategoryModal(item.title)}
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination !bottom-0"></div>
                <div className="swiper-slide-button swiper-button-prev !w-12 !h-12 !bg-white !rounded-full !shadow-md !text-purple-600 after:!text-lg hover:!bg-purple-600 hover:!text-white transition-all opacity-0 group-hover:opacity-100"></div>
                <div className="swiper-slide-button swiper-button-next !w-12 !h-12 !bg-white !rounded-full !shadow-md !text-purple-600 after:!text-lg hover:!bg-purple-600 hover:!text-white transition-all opacity-0 group-hover:opacity-100"></div>
            </Swiper>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'legal', 'tech', 'education', 'health', 'saved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold capitalize transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-purple-600'
              }`}
            >
              {tab === 'saved' ? <><i className="fas fa-bookmark mr-2"></i>Saved</> : tab}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                    ${resource.category === 'Legal' ? 'bg-blue-100 text-blue-600' : 
                      resource.category === 'Tech' ? 'bg-purple-100 text-purple-600' :
                      resource.category === 'Health' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'}`}>
                    {resource.category}
                  </span>
                  <button 
                    onClick={() => toggleBookmark(resource.title)}
                    className={`transition-colors p-1 ${bookmarked.includes(resource.title) ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'}`}
                    title={bookmarked.includes(resource.title) ? "Remove Bookmark" : "Bookmark"}
                  >
                    <i className={`${bookmarked.includes(resource.title) ? 'fas' : 'far'} fa-bookmark text-xl`}></i>
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{resource.title}</h3>
                
                <div className="space-y-3 mb-8 flex-grow">
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Available Formats:</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.format.map(fmt => (
                      <span key={fmt} className="bg-slate-50 px-3 py-1 rounded-lg text-xs font-medium text-gray-600 border border-gray-200">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button 
                    onClick={() => setSelectedResource(resource)}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <i className="fas fa-book-open mr-2"></i> Read
                  </button>
                  <button 
                    onClick={() => toggleBookmark(resource.title)}
                    className={`flex-1 border-2 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center
                    ${bookmarked.includes(resource.title) 
                      ? 'border-pink-600 text-pink-600 hover:bg-pink-50'
                      : 'border-gray-200 text-gray-600 hover:border-pink-600 hover:text-pink-600'}`}
                  >
                    <i className={`${bookmarked.includes(resource.title) ? 'fas' : 'far'} fa-bookmark mr-2`}></i>
                    {bookmarked.includes(resource.title) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                   <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
                   <div className="text-sm text-gray-500 mt-1">{selectedResource.category} • {selectedResource.format.join(', ')}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                        <button onClick={() => handleFontSize('decrease')} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600" title="Decrease font size"><i className="fas fa-minus text-xs"></i></button>
                        <span className="text-sm font-bold w-8 text-center">{fontSize}</span>
                        <button onClick={() => handleFontSize('increase')} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600" title="Increase font size"><i className="fas fa-plus text-xs"></i></button>
                    </div>
                    <button onClick={() => setSelectedResource(null)} className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
              </div>
              
              <div className="p-8 md:p-12 overflow-y-auto bg-white flex-grow">
                 <div className="max-w-3xl mx-auto prose prose-lg prose-slate" style={{ fontSize: `${fontSize}px` }}>
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{selectedResource.content}</p>
                 </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4 justify-end">
                  <button
                    onClick={() => toggleBookmark(selectedResource.title)}
                    className={`px-6 py-3 rounded-xl font-bold transition-colors shadow-lg flex items-center gap-2 ${
                        bookmarked.includes(selectedResource.title) 
                        ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-pink-600/30' 
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/30'
                    }`}
                  >
                      <i className={`${bookmarked.includes(selectedResource.title) ? 'fas' : 'far'} fa-bookmark`}></i>
                      {bookmarked.includes(selectedResource.title) ? 'Saved' : 'Save'}
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal (New) */}
      <AnimatePresence>
        {activeCategoryModal && categoryData[activeCategoryModal] && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 services-modal-overlay"
                id="services-modal"
                onClick={() => setActiveCategoryModal(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl services-modal-container"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 services-modal-header">
                        <h3 className="text-2xl font-bold text-gray-900 services-modal-title">{categoryData[activeCategoryModal].title}</h3>
                        <button 
                            className="services-modal-close w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 transition-colors"
                            onClick={() => setActiveCategoryModal(null)}
                        >
                            &times;
                        </button>
                    </div>
                    <div 
                        className="p-8 overflow-y-auto services-modal-content text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: categoryData[activeCategoryModal].content }}
                    />
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                        <button 
                            className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition-colors"
                            onClick={() => setActiveCategoryModal(null)}
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default AccessibleLibrary;