export interface Certificate {
  title: string
  issuer: string
  category: 'ML & AI' | 'Generative AI' | 'Cloud & Tools' | 'Data & Analytics' | 'Competitions'
  filename: string
  featured?: boolean
}

export const CERT_BASE = 'https://github.com/Sathvik0728/Certificates-/blob/main'

export const certificates: Certificate[] = [
  // ML & AI
  { title: 'Artificial Intelligence', issuer: 'Infosys', category: 'ML & AI', filename: 'Artificial Intelligence.pdf' },
  { title: 'Introduction to Machine Learning', issuer: 'Infosys', category: 'ML & AI', filename: 'Introduction to machine Learning Certificate.pdf' },
  { title: 'Deep Learning for Developers', issuer: 'Infosys', category: 'ML & AI', filename: 'Deep Learning for Developers.pdf' },
  { title: 'Fundamentals of Machine Learning and Artificial Intelligence', issuer: 'Amazon Web Services', category: 'ML & AI', filename: 'Fundamentals of Machine Learning and Artificial Intelligence.pdf', featured: true },
  { title: 'Introduction to AI Concepts', issuer: 'Microsoft', category: 'ML & AI', filename: 'Introduction to AI concepts - Microsoft Learn.pdf' },

  // Generative AI
  { title: 'Fundamentals of Generative AI', issuer: 'Microsoft', category: 'Generative AI', filename: 'Fundamentals of Generative AI - Microsoft Learn.pdf', featured: true },
  { title: 'Generative AI Unleashing', issuer: 'Infosys', category: 'Generative AI', filename: 'Generative AI Unleashing.pdf' },
  { title: 'Generative Models for Developers', issuer: 'Infosys', category: 'Generative AI', filename: 'Generative models for developers.pdf' },
  { title: 'Foundations of Prompt Engineering', issuer: 'Amazon Web Services', category: 'Generative AI', filename: 'Foundations of Prompt Engineering.pdf' },
  { title: 'Prompt Engineering', issuer: 'Infosys', category: 'Generative AI', filename: 'Prompt Engineering.pdf' },
  { title: 'Prompt Design in Vertex AI Skill Badge', issuer: 'Google Cloud', category: 'Generative AI', filename: 'prompt-design-in-vertex-ai-skill-badge.png', featured: true },

  // Cloud & Tools
  { title: 'AWS CloudFormation Getting Started', issuer: 'Amazon Web Services', category: 'Cloud & Tools', filename: 'AWS CloudFormation.pdf' },
  { title: 'Agile Scrum in Practice', issuer: 'Infosys', category: 'Cloud & Tools', filename: 'Agile Scrum in Practice.pdf' },
  { title: 'Cyber Job Simulation', issuer: 'Deloitte', category: 'Cloud & Tools', filename: 'Cyber Job Simulation - Deloitte.pdf', featured: true },

  // Data & Analytics
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte', category: 'Data & Analytics', filename: 'Data Analytics Job Simulation.pdf' },
  { title: 'Data Visualisation', issuer: 'Tata', category: 'Data & Analytics', filename: 'Data Visualisation (TATA).pdf', featured: true },

  // Competitions & Events
  { title: 'SIH Internal Hackathon Certificate', issuer: 'Malla Reddy College of Engineering and Technology', category: 'Competitions', filename: 'SIH Certificate Sathvik.png', featured: true },
  { title: 'Solution Challenge Certificate', issuer: 'Google Developer Groups & Hack2Skill', category: 'Competitions', filename: 'GDG on Campus Solution Challenge India  -- Certification.png' },
  { title: 'Agentic AI Day Certificate', issuer: 'Google Cloud & Hack2Skill', category: 'Competitions', filename: 'Hack2skill-Certificate.png' },
  { title: 'AI Workshop Certificate', issuer: 'IIT Hyderabad & Growth Ninja', category: 'Competitions', filename: 'Growth Ninja  IITH Certificate.pdf', featured: true },
]

export const certCategories = ['ML & AI', 'Generative AI', 'Cloud & Tools', 'Data & Analytics', 'Competitions'] as const
