export interface LibraryTopic {
  id: number;
  title: string;
  description: string;
  sections: {
    heading: string;
    points: string[];
  }[];
}

export const libraryTopics: LibraryTopic[] = [
  {
    id: 1,
    title: 'Hormones & Attention',
    description: 'Understanding how perimenopause affects ADHD symptoms and executive function.',
    sections: [
      {
        heading: 'The Connection',
        points: [
          'Estrogen plays a key role in dopamine regulation, which affects attention and focus',
          'Fluctuating hormone levels during perimenopause can intensify ADHD symptoms',
          'Many women report worsening executive function challenges during this transition',
          'Brain fog and memory issues are common when both conditions overlap',
        ],
      },
      {
        heading: 'What You Might Notice',
        points: [
          'Increased difficulty with task initiation and completion',
          'More frequent "where did I put that?" moments',
          'Harder time filtering distractions',
          'Greater emotional reactivity and shorter fuse',
          'Medication that used to work may feel less effective',
        ],
      },
      {
        heading: 'Supportive Strategies',
        points: [
          'Work with healthcare providers who understand both ADHD and perimenopause',
          'Consider timing medication adjustments with your cycle if still menstruating',
          'Build in more external structure and reminders than you needed before',
          'Practice self-compassion—this is a real physiological change, not a personal failing',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Managing Overwhelm Loops',
    description: 'Breaking the cycle of overwhelm that can intensify with ADHD and perimenopause.',
    sections: [
      {
        heading: 'Understanding the Loop',
        points: [
          'ADHD makes it hard to prioritize and start tasks',
          'Perimenopause adds fatigue, brain fog, and emotional sensitivity',
          'Together, they create a perfect storm for feeling paralyzed by overwhelm',
          'The more overwhelmed you feel, the harder it is to take action',
        ],
      },
      {
        heading: 'Breaking the Cycle',
        points: [
          'Start with the smallest possible step—even 2 minutes counts',
          'Use body doubling (working alongside someone) to reduce activation energy',
          'Set a timer for short work bursts with built-in breaks',
          'Write down racing thoughts to clear mental space',
          'Give yourself permission to do things "good enough" rather than perfectly',
        ],
      },
      {
        heading: 'Prevention Strategies',
        points: [
          'Reduce decision fatigue with routines and systems',
          'Say no to non-essential commitments during high-symptom phases',
          'Build in recovery time after demanding activities',
          'Keep a "done list" to counter the feeling that nothing gets accomplished',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Sleep & Perimenopause',
    description: 'Addressing sleep disruptions that affect both ADHD management and perimenopausal symptoms.',
    sections: [
      {
        heading: 'Why Sleep Gets Harder',
        points: [
          'Hot flashes and night sweats disrupt sleep architecture',
          'ADHD already makes it hard to wind down and maintain sleep schedules',
          'Anxiety and racing thoughts intensify during perimenopause',
          'Poor sleep worsens both ADHD symptoms and perimenopausal mood changes',
        ],
      },
      {
        heading: 'Sleep Hygiene Essentials',
        points: [
          'Keep bedroom cool (helps with hot flashes and ADHD sleep issues)',
          'Use breathable, moisture-wicking bedding',
          'Establish a consistent wind-down routine (even if bedtime varies)',
          'Limit screens 1-2 hours before bed (harder with ADHD, but worth it)',
          'Consider a white noise machine or fan for consistent background sound',
        ],
      },
      {
        heading: 'When to Seek Help',
        points: [
          'If sleep problems persist despite good sleep hygiene',
          'If you suspect sleep apnea (more common during perimenopause)',
          'If insomnia is affecting daily functioning',
          'If you\'re relying on alcohol or other substances to sleep',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Sensory Sensitivity',
    description: 'Managing heightened sensory experiences common with ADHD and perimenopause.',
    sections: [
      {
        heading: 'The Sensory Double Whammy',
        points: [
          'ADHD often comes with sensory processing differences',
          'Perimenopause can increase sensitivity to temperature, sound, and touch',
          'Irritability from both conditions lowers your tolerance threshold',
          'What used to be manageable may now feel overwhelming',
        ],
      },
      {
        heading: 'Common Triggers',
        points: [
          'Clothing textures and tags (especially when experiencing hot flashes)',
          'Loud or repetitive sounds',
          'Bright or fluorescent lighting',
          'Strong smells',
          'Being touched when you\'re already overstimulated',
        ],
      },
      {
        heading: 'Coping Strategies',
        points: [
          'Identify your specific triggers and plan around them when possible',
          'Create a sensory-friendly space at home for decompression',
          'Use noise-canceling headphones or earplugs in overwhelming environments',
          'Wear comfortable, breathable clothing with minimal seams',
          'Communicate your needs to close friends and family',
          'Build in sensory breaks during demanding days',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Emotional Regulation',
    description: 'Understanding and managing emotional intensity during this transition.',
    sections: [
      {
        heading: 'Why Emotions Feel Bigger',
        points: [
          'ADHD affects emotional regulation even without hormonal changes',
          'Perimenopause brings mood swings and increased irritability',
          'Sleep disruption and fatigue lower emotional resilience',
          'You may feel emotions more intensely and have less time between trigger and reaction',
        ],
      },
      {
        heading: 'In-the-Moment Tools',
        points: [
          'Name the emotion you\'re feeling (this activates the thinking brain)',
          'Take slow, deep breaths to activate the parasympathetic nervous system',
          'Step away from the situation if possible, even for 60 seconds',
          'Use cold water on your face or hold ice to interrupt the intensity',
          'Move your body—walk, stretch, or shake out tension',
        ],
      },
      {
        heading: 'Long-term Support',
        points: [
          'Track emotional patterns alongside your cycle (if still menstruating)',
          'Build a support network who understands what you\'re going through',
          'Consider therapy, especially DBT or CBT approaches',
          'Explore whether medication adjustments might help',
          'Practice self-compassion—you\'re managing a lot',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Brain Fog & Memory',
    description: 'Strategies for managing cognitive changes during perimenopause with ADHD.',
    sections: [
      {
        heading: 'What\'s Happening',
        points: [
          'Estrogen fluctuations affect memory formation and retrieval',
          'ADHD working memory challenges become more pronounced',
          'You may lose your train of thought mid-sentence more often',
          'Difficulty finding words or names increases',
          'This is temporary and related to the transition, not permanent decline',
        ],
      },
      {
        heading: 'Compensatory Strategies',
        points: [
          'Write everything down immediately—don\'t trust you\'ll remember later',
          'Use voice memos to capture thoughts on the go',
          'Set multiple reminders for important tasks',
          'Keep frequently lost items in designated spots',
          'Use visual cues and labels liberally',
          'Reduce cognitive load by simplifying routines and decisions',
        ],
      },
      {
        heading: 'When to Worry',
        points: [
          'Most perimenopause-related cognitive changes are temporary',
          'If memory issues interfere significantly with daily life, talk to your doctor',
          'Rule out other causes like thyroid issues, vitamin deficiencies, or sleep disorders',
          'Keep in mind that anxiety about memory can make the problem feel worse',
        ],
      },
    ],
  },
];
