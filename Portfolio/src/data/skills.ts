export type Proficiency = 'expert' | 'proficient' | 'familiar'

export interface Skill {
  name: string
  level: Proficiency
}

export const skills: Record<string, Skill[]> = {
  'Languages': [
    { name: 'Python',      level: 'expert' },
    { name: 'JavaScript',  level: 'proficient' },
    { name: 'TypeScript',  level: 'proficient' },
    { name: 'HTML5',       level: 'expert' },
    { name: 'CSS3',        level: 'proficient' },
  ],
  'AI / ML': [
    { name: 'TensorFlow',  level: 'expert' },
    { name: 'scikit-learn',level: 'expert' },
    { name: 'MediaPipe',   level: 'proficient' },
    { name: 'OpenCV',      level: 'expert' },
    { name: 'NumPy',       level: 'expert' },
    { name: 'pandas',      level: 'expert' },
  ],
  'Web': [
    { name: 'Flask',       level: 'proficient' },
    { name: 'React',       level: 'proficient' },
    { name: 'Vite',        level: 'proficient' },
    { name: 'Tailwind CSS',level: 'proficient' },
    { name: 'REST APIs',   level: 'expert' },
  ],
  'Tools & Platforms': [
    { name: 'Git',         level: 'expert' },
    { name: 'GitHub',      level: 'expert' },
    { name: 'Streamlit',   level: 'proficient' },
    { name: 'Render',      level: 'familiar' },
    { name: 'VS Code',     level: 'expert' },
    { name: 'Jupyter',     level: 'expert' },
  ],
}

export const proficiencyLabel: Record<Proficiency, string> = {
  expert:     'Expert',
  proficient: 'Proficient',
  familiar:   'Familiar',
}
