/**
 * Everything the site says lives in this file.
 * Update your details here and every section (including the terminal and the
 * Ctrl+K command palette) picks the change up automatically.
 */

import iitWorkshop1 from '../assets/achievements/iit-workshop-1.webp'
import iitWorkshop2 from '../assets/achievements/iit-workshop-2.webp'
import iitWorkshop3 from '../assets/achievements/iit-workshop-3.webp'
import maiyyamDataAnalytics from '../assets/achievements/maiyyam-data-analytics.webp'
import maiyyamFullstack from '../assets/achievements/maiyyam-fullstack-mern.webp'
import portrait1 from '../assets/portraits/portrait-1.webp'
import portrait2 from '../assets/portraits/portrait-2.webp'
import portrait3 from '../assets/portraits/portrait-3.webp'
import portrait4 from '../assets/portraits/portrait-4.webp'
import moviesflix1 from '../assets/projects/moviesflix-1.webp'
import moviesflix2 from '../assets/projects/moviesflix-2.webp'
import moviesflix3 from '../assets/projects/moviesflix-3.webp'
import moviesflix4 from '../assets/projects/moviesflix-4.webp'
import moviesflix5 from '../assets/projects/moviesflix-5.webp'
import moviesflixScreen1 from '../assets/projects/moviesflix-screen-1.webp'
import moviesflixScreen2 from '../assets/projects/moviesflix-screen-2.webp'
import moviesflixScreen3 from '../assets/projects/moviesflix-screen-3.webp'
import robot1 from '../assets/projects/robot-1.webp'
import robot2 from '../assets/projects/robot-2.webp'
import robot3 from '../assets/projects/robot-3.webp'

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type GalleryImage = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export type LinkItem = { label: string; href: string }

export type ExperienceItem = {
  id: string
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  summary?: string
  highlights: string[]
  quote?: { text: string; source: string }
  tags: string[]
  link?: LinkItem
}

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  highlights: string[]
  links: LinkItem[]
  gallery?: GalleryImage[]
}

export type SkillLevel = { name: string; level: string; score: 1 | 2 | 3 }

export type RepoSummary = {
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  pushedAt: string
}

/** Files in /public, resolved against the deploy base path. */
const publicFile = (name: string) => `${import.meta.env.BASE_URL}${name}`

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Sachin S. S',
  firstName: 'Sachin',
  role: 'Aspiring Software Engineer',
  location: 'Bengaluru, India',
  timeZone: 'Asia/Kolkata',
  email: 'sachinsornalatha13@gmail.com',
  phone: { display: '+91 87546 67430', href: 'tel:+918754667430' },
  links: {
    github: 'https://github.com/sachhinxz-github',
    linkedin: 'https://www.linkedin.com/in/sachin-ss-b0b101290/',
    portfolio: 'https://sachin-techfolio.netlify.app/',
  },
  resume: publicFile('Sachin_SS_Resume.pdf'),
  /** Formspree endpoint that receives the contact form. */
  contactForm: 'https://formspree.io/f/xyzpgwag',

  /** Rotating line under the name in the hero. */
  roles: [
    'Aspiring Software Engineer',
    'Full-stack web developer · MERN',
    'R&D + Operations Intern @ Dendo',
    'IoT & robotics tinkerer',
    'Problem solver · 550+ LeetCode',
  ],
  intro:
    'I build full-stack web apps, tinker with IoT hardware, and apply machine learning to real-world problems — currently interning in R&D and operations at Dendo, Bengaluru.',
  summary: [
    "I'm an aspiring software engineer with hands-on experience in front-end and back-end web development, IoT solutions, and data analytics.",
    "I'm skilled in building and deploying full-stack projects, competitive programming, and applying machine learning to real-world problems — and I bring strong communication, self-driven learning, teamwork, and consistent performance under pressure.",
    "Right now I'm an R&D and Operations Intern at Dendo, a startup in Bengaluru, while completing my B.E. in Computer Science and Engineering (IoT) at Sri Krishna College of Technology, Coimbatore.",
  ],
  motto: {
    quote: 'The best way to predict the future is to create it.',
    line: 'I am creating mine, one problem at a time.',
  },
}

/** What I'm doing right now — shown in the hero status pill and the terminal. */
export const now = {
  role: 'R&D and Operations Intern',
  company: 'Dendo',
  location: 'Bengaluru',
}

export const portraits: GalleryImage[] = [
  { src: portrait2, alt: 'Sachin in a beige linen shirt, standing in front of palm leaves at night', caption: 'Sachin S. S', width: 960, height: 1280 },
  { src: portrait3, alt: 'Sachin in a lilac shirt, leaning against a car on a tree-lined street', caption: 'Sachin S. S', width: 960, height: 1280 },
  { src: portrait1, alt: 'Sachin sitting on a red sports motorcycle at night', caption: 'Sachin S. S', width: 960, height: 1280 },
  { src: portrait4, alt: 'Sachin standing in the surf on a beach at dusk', caption: 'Sachin S. S', width: 960, height: 1280 },
]

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

/* ------------------------------------------------------------------ */
/* Headline numbers                                                    */
/* ------------------------------------------------------------------ */

export const stats: { value: number; decimals?: number; suffix?: string; label: string; hint: string }[] = [
  { value: 550, suffix: '+', label: 'LeetCode problems', hint: 'solved and counting' },
  { value: 50, suffix: '+', label: 'SQL challenges', hint: 'solved' },
  { value: 2, label: 'Internships', hint: 'Dendo · Weox Technologies' },
  { value: 7.78, decimals: 2, label: 'CGPA', hint: 'B.E. CSE (IoT)' },
]

export const focusAreas: { id: 'web' | 'iot' | 'ml' | 'dsa'; title: string; text: string }[] = [
  {
    id: 'web',
    title: 'Full-stack web',
    text: 'Front-end and back-end development with the MERN stack, API implementation and UI/UX design.',
  },
  {
    id: 'iot',
    title: 'IoT & robotics',
    text: 'Hands-on with Raspberry Pi, Node-RED and Arduino — from live sensor dashboards to a line-following robot.',
  },
  {
    id: 'ml',
    title: 'Data & machine learning',
    text: 'Data analysis with Power BI, and ML applied to real problems such as real-time phishing detection.',
  },
  {
    id: 'dsa',
    title: 'Problem solving',
    text: '550+ LeetCode problems and 50+ SQL challenges solved through consistent competitive programming.',
  },
]

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience: ExperienceItem[] = [
  {
    id: 'dendo',
    role: 'R&D and Operations Intern',
    company: 'Dendo',
    location: 'Bengaluru, India',
    period: 'Present',
    current: true,
    summary:
      'Currently interning at Dendo, a Bengaluru-based startup, working across research & development and operations.',
    // Add two or three bullets about what you work on at Dendo and they will show up here.
    highlights: [],
    tags: ['R&D', 'Operations', 'Startup'],
  },
  {
    id: 'weox',
    role: 'Web Designing and Development Intern',
    company: 'Weox Technologies',
    location: 'Coimbatore, India',
    period: 'May 2025 – Jun 2025',
    highlights: [
      'Worked on real-world web design and development projects, gaining practical experience with front-end and back-end tools and best practices.',
      'Demonstrated excellent communication and self-driven learning.',
    ],
    quote: {
      text: 'His performance exceeded expectations, and he completed the task on time.',
      source: 'Internship certificate, Weox Technologies',
    },
    tags: ['Web design', 'Front-end', 'Back-end'],
    link: { label: 'Internship certificate', href: publicFile('interncertificate.pdf') },
  },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const featuredProject: Project = {
  id: 'shield-ai',
  title: 'Shield-AI',
  subtitle: 'Real-Time Phishing Detection',
  description:
    'A Chrome extension backed by a Python service that scores the URL you are visiting with a machine-learning model and warns you before a phishing page can do damage.',
  stack: ['Python', 'FastAPI', 'Machine Learning', 'Chrome Extension API', 'Figma'],
  highlights: [
    'Designed a high-fidelity Chrome Extension and backend ecosystem using Python and FastAPI, driving the security application from ML concept to execution.',
    'Led the ML development workflow, training a Random Forest model on 30+ unique URL features and architecting the real-time safety alert interface.',
    'Strengthened problem-solving methodologies by isolating edge-case false positives, building a custom whitelist subsystem, and structuring the repo for open-source collaboration.',
  ],
  links: [{ label: 'Source on GitHub', href: 'https://github.com/sachhinxz-github/SHEILD-AI' }],
}

export const projects: (Project & { cover: 'screens' | 'photo'; coverImages: GalleryImage[] })[] = [
  {
    id: 'moviesflix',
    title: 'MoviesFlix App Prototype',
    subtitle: 'Netflix-inspired streaming app · Figma',
    description:
      'Designed a Netflix-inspired app prototype with team Solo Arisers; led UI/UX design across multiple pages, strengthening design thinking and prototyping skills.',
    stack: ['Figma', 'UI/UX Design', 'Prototyping'],
    highlights: [],
    links: [],
    cover: 'screens',
    coverImages: [
      { src: moviesflixScreen2, alt: 'MoviesFlix title details screen', caption: 'Title details', width: 562, height: 1140 },
      { src: moviesflixScreen1, alt: 'MoviesFlix sign-in screen', caption: 'Sign in', width: 510, height: 1040 },
      { src: moviesflixScreen3, alt: 'MoviesFlix player screen', caption: 'Player', width: 470, height: 1055 },
    ],
    gallery: [
      { src: moviesflix4, alt: 'Figma canvas showing six MoviesFlix screens connected by prototype flows', caption: 'The full prototype flow in Figma', width: 1080, height: 764 },
      { src: moviesflix1, alt: 'MoviesFlix sign-in screen in Figma', caption: 'Sign-in screen', width: 785, height: 1400 },
      { src: moviesflix2, alt: 'MoviesFlix title details screen for Interstellar', caption: 'Title details screen', width: 1047, height: 1400 },
      { src: moviesflix3, alt: 'MoviesFlix video player screen', caption: 'Player screen', width: 1023, height: 1371 },
      { src: moviesflix5, alt: 'Sachin working on the prototype on a laptop in a hall full of participants', caption: 'Building the prototype', width: 1079, height: 808 },
    ],
  },
  {
    id: 'line-follower',
    title: 'Line-Following Robot',
    subtitle: '“Wheels on Bot” course · Arduino',
    description:
      'Built a line-following robot using Arduino, coded in the Arduino IDE — learning hardware control, sensor integration, and embedded programming principles for robotics.',
    stack: ['Arduino', 'Arduino IDE', 'Sensor integration', 'Embedded programming'],
    highlights: [],
    links: [],
    cover: 'photo',
    coverImages: [
      { src: robot3, alt: 'Two-wheeled line-following robot with a breadboard and jumper wires', caption: 'The assembled robot', width: 1080, height: 801 },
    ],
    gallery: [
      { src: robot3, alt: 'Two-wheeled line-following robot with a breadboard and jumper wires', caption: 'The assembled line-following robot', width: 1080, height: 801 },
      { src: robot1, alt: 'Arduino Uno wired to two infrared sensor modules on a breadboard', caption: 'Arduino Uno wired to the IR sensor modules', width: 1078, height: 811 },
      { src: robot2, alt: 'Breadboard circuit with glowing LEDs next to a laptop running the Arduino IDE', caption: 'Testing the circuit from the Arduino IDE', width: 1080, height: 809 },
    ],
  },
]

/**
 * "Latest on GitHub" — fetched live from the GitHub API in the browser.
 * `fallback` is shown if the API is unreachable or rate-limited.
 */
export const github = {
  user: 'sachhinxz-github',
  /** Repositories that should never be listed. */
  exclude: ['portfolio', 'netlify', 'sampleadp', 'APP-DEVELOPMENT'],
  limit: 5,
  fallback: [
    { name: 'SHEILD-AI', url: 'https://github.com/sachhinxz-github/SHEILD-AI', description: null, language: 'JavaScript', stars: 0, pushedAt: '2026-05-13T10:25:19Z' },
    { name: 'Smart-Irrigation-AI-IoT', url: 'https://github.com/sachhinxz-github/Smart-Irrigation-AI-IoT', description: null, language: 'Jupyter Notebook', stars: 0, pushedAt: '2026-03-10T17:05:14Z' },
    { name: 'Customer-Support-Ticket-Analysis', url: 'https://github.com/sachhinxz-github/Customer-Support-Ticket-Analysis', description: null, language: null, stars: 0, pushedAt: '2026-02-09T03:54:16Z' },
    { name: 'Automated-Email-Classification-Using-GenAI-Enhanced-MODELS', url: 'https://github.com/sachhinxz-github/Automated-Email-Classification-Using-GenAI-Enhanced-MODELS', description: null, language: 'Jupyter Notebook', stars: 0, pushedAt: '2026-02-09T03:48:27Z' },
    { name: 'TEXT_CLASSIFICATION_USING_SVM', url: 'https://github.com/sachhinxz-github/TEXT_CLASSIFICATION_USING_SVM', description: null, language: 'HTML', stars: 0, pushedAt: '2026-01-23T06:28:29Z' },
  ] satisfies RepoSummary[],
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const programmingLanguages: SkillLevel[] = [
  { name: 'Java', level: 'Advanced', score: 3 },
  { name: 'C++', level: 'Intermediate', score: 2 },
  { name: 'Python', level: 'Elementary', score: 1 },
]

export const skillGroups: { id: 'web' | 'data' | 'other'; title: string; items: string[] }[] = [
  {
    id: 'web',
    title: 'Web Development',
    items: ['Front-end Development', 'Back-end Development', 'API Implementation', 'UI/UX Design'],
  },
  {
    id: 'data',
    title: 'Data & Tools',
    items: ['Data Analysis (Microsoft Power BI)', 'MERN Stack', 'Git / GitHub'],
  },
  {
    id: 'other',
    title: 'Other',
    items: ['Digital Video Editing', 'Problem-Solving', 'Teamwork & Collaboration', 'Multitasking'],
  },
]

/** Technologies used across the projects, workshops and certifications on this page. */
export const toolbox = [
  'Java',
  'C++',
  'Python',
  'MongoDB',
  'Express',
  'React',
  'Node.js',
  'FastAPI',
  'Machine Learning',
  'Chrome Extension API',
  'SQL',
  'Power BI',
  'Figma',
  'Git',
  'GitHub',
  'Raspberry Pi',
  'Node-RED',
  'Arduino',
]

/* ------------------------------------------------------------------ */
/* Education & languages                                               */
/* ------------------------------------------------------------------ */

export const education: { id: string; degree: string; school: string; location?: string; period: string; facts: { label: string; value: string }[] }[] = [
  {
    id: 'be',
    degree: 'B.E. in Computer Science and Engineering (IoT)',
    school: 'Sri Krishna College of Technology',
    location: 'Coimbatore, India',
    period: 'Expected graduation · 2027',
    facts: [{ label: 'CGPA', value: '7.78' }],
  },
  {
    id: 'hsc',
    degree: 'Higher Secondary School',
    school: 'Global Pathways MHSS',
    period: '2023',
    facts: [],
  },
]

/** CEFR scale, lowest to highest. */
export const cefrScale = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

export const languages: { name: string; level: (typeof cefrScale)[number]; label: string }[] = [
  { name: 'English', level: 'C2', label: 'Proficient' },
  { name: 'Tamil', level: 'C2', label: 'Proficient' },
  { name: 'Hindi', level: 'B2', label: 'Upper Intermediate' },
]

/* ------------------------------------------------------------------ */
/* Certifications & achievements                                       */
/* ------------------------------------------------------------------ */

export const achievements = {
  problemSolving: {
    title: 'Competitive programming',
    text: 'Solved 550+ LeetCode problems and 50+ SQL challenges.',
    numbers: [
      { value: 550, suffix: '+', label: 'LeetCode problems' },
      { value: 50, suffix: '+', label: 'SQL challenges' },
    ],
  },
  maiyyam: {
    title: 'MERN Traineeship & Data Analytics with MERN Certification',
    issuer: 'Maiyyam',
    text: 'Two traineeships covering full-stack MERN development and data analysis, with a focus on data visualisation in Power BI.',
    credentials: [
      { name: 'Full-Stack (MERN) App/Web Development Traineeship', issued: '20 Nov 2024', id: 'MYMFSM1435' },
      { name: 'Data Analytics Traineeship', issued: '24 Sep 2024', id: 'MYMDA1550' },
    ],
    gallery: [
      { src: maiyyamFullstack, alt: 'Maiyyam traineeship certificate for Full-Stack (MERN) App/Web Development awarded to Sachin S S', caption: 'Full-Stack (MERN) App/Web Development Traineeship · Maiyyam · 20 Nov 2024', width: 1038, height: 725 },
      { src: maiyyamDataAnalytics, alt: 'Maiyyam traineeship certificate for Data Analytics awarded to Sachin S S', caption: 'Data Analytics Traineeship · Maiyyam · 24 Sep 2024', width: 1031, height: 729 },
    ] satisfies GalleryImage[],
  },
  iitWorkshop: {
    title: 'Raspberry Pi & Node-RED IoT Workshop',
    issuer: 'IIT Madras, Chennai',
    date: '28 Sep 2024',
    text: 'Hands-on “IoT Automation using Raspberry Pi and Node-RED” workshop at IIT Madras Research Park, organised by Top Engineers – India with Mechanica 2024. Built Node-RED flows and a live dashboard for sensor data.',
    gallery: [
      { src: iitWorkshop2, alt: 'Laptop showing a Node-RED dashboard with temperature and humidity gauges and control switches', caption: 'Live IoT dashboard built in Node-RED', width: 970, height: 723 },
      { src: iitWorkshop3, alt: 'Laptop showing a Node-RED flow editor with connected nodes', caption: 'The Node-RED flow behind the dashboard', width: 546, height: 730 },
      { src: iitWorkshop1, alt: 'Certificate of participation for the IoT Automation using Raspberry Pi and Node-RED workshop', caption: 'Certificate of participation · Mechanica 2024, IIT Madras', width: 548, height: 724 },
    ] satisfies GalleryImage[],
  },
  probe: {
    title: 'PROROVER Workshop & Robotics and IoT Workshop',
    issuer: "PROBE'24, NIT Trichy",
    text: "Attended the PROROVER workshop and the Robotics and IoT workshop at PROBE'24, NIT Trichy.",
  },
  wheelsOnBot: {
    title: '“Wheels on Bot”',
    issuer: 'Value-added course',
    text: 'Value-added course on building an Arduino line-following robot.',
  },
}
