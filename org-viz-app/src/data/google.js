// Alphabet / Google organizational structure — seed data
export const googleOrg = {
  id: 'google-alphabet',
  name: 'Alphabet / Google',
  subtitle: 'Corporate Structure · 2025',
  colorScheme: {
    'google': { label: 'Google LLC', color: '#4a9eff', bg: '#09141f', border: '#162e55', textDim: '#2e5a9a', textBright: '#7eb8f7' },
    'ai': { label: 'DeepMind / AI', color: '#2de8c0', bg: '#041f18', border: '#0c4535', textDim: '#1a7a60', textBright: '#5ee8c0' },
    'bets': { label: 'Other Bets', color: '#a78bfa', bg: '#100c1e', border: '#2e2260', textDim: '#5048a0', textBright: '#b0a0f4' },
    'leadership': { label: 'Leadership', color: '#f5a623', bg: '#150e04', border: '#5a3a08', textDim: '#906020', textBright: '#f0b850' },
    'holding': { label: 'Holding', color: '#555350', bg: '#161616', border: '#2e2e2e', textDim: '#585654', textBright: '#d4d1cc' },
  },
  root: {
    id: 'alphabet',
    name: 'Alphabet Inc.',
    subtitle: 'Parent holding company · GOOGL',
    type: 'holding',
    children: [
      {
        id: 'google-llc',
        name: 'Google LLC',
        subtitle: 'Core subsidiary',
        meta: 'CEO: Sundar Pichai',
        type: 'google',
        children: [
          { id: 'search', name: 'Search & Ads', subtitle: 'Core revenue', type: 'google', children: [] },
          { id: 'cloud', name: 'Google Cloud', subtitle: 'GCP · Enterprise', type: 'google', children: [] },
          {
            id: 'deepmind',
            name: 'DeepMind',
            subtitle: 'AI research lab',
            meta: 'CEO: Demis Hassabis',
            type: 'ai',
            children: [
              { id: 'gemini', name: 'Gemini', subtitle: 'Foundation models', type: 'ai', children: [] },
              { id: 'alphafold', name: 'AlphaFold', subtitle: 'Protein structure', type: 'ai', children: [] },
            ]
          },
          { id: 'devices', name: 'Devices & Services', subtitle: 'Pixel · Nest · Fitbit', type: 'google', children: [] },
          { id: 'youtube', name: 'YouTube', subtitle: 'Video platform', meta: 'CEO: Neal Mohan', type: 'google', children: [] },
          { id: 'android', name: 'Android & Chrome', subtitle: 'OS platforms', type: 'google', children: [] },
        ]
      },
      {
        id: 'other-bets',
        name: 'Other Bets',
        subtitle: 'Independent subsidiaries',
        type: 'bets',
        children: [
          { id: 'waymo', name: 'Waymo', subtitle: 'Self-driving vehicles', type: 'bets', children: [] },
          { id: 'verily', name: 'Verily', subtitle: 'Life sciences', type: 'bets', children: [] },
          { id: 'gv', name: 'GV', subtitle: 'Venture capital', type: 'bets', children: [] },
          { id: 'capitalg', name: 'CapitalG', subtitle: 'Growth equity', type: 'bets', children: [] },
          { id: 'x', name: 'X', subtitle: 'Moonshot factory', type: 'bets', children: [] },
          { id: 'wing', name: 'Wing', subtitle: 'Drone delivery', type: 'bets', children: [] },
          { id: 'intrinsic', name: 'Intrinsic', subtitle: 'Industrial robotics', type: 'bets', children: [] },
          { id: 'calico', name: 'Calico', subtitle: 'Longevity research', type: 'bets', children: [] },
        ]
      },
      {
        id: 'leadership',
        name: 'Alphabet Leadership',
        subtitle: 'Board & C-Suite',
        type: 'leadership',
        children: [
          { id: 'pichai', name: 'Sundar Pichai', subtitle: 'CEO, Alphabet & Google', type: 'leadership', children: [] },
          { id: 'porat', name: 'Ruth Porat', subtitle: 'President & CIO, Alphabet', type: 'leadership', children: [] },
          { id: 'walker', name: 'Kent Walker', subtitle: 'President, Global Affairs', type: 'leadership', children: [] },
          { id: 'schindler', name: 'Philipp Schindler', subtitle: 'SVP & CBO', type: 'leadership', children: [] },
          { id: 'kurian', name: 'Thomas Kurian', subtitle: 'CEO, Google Cloud', type: 'leadership', children: [] },
        ]
      },
    ]
  }
};

// Blank template for creating new org structures
export const blankOrg = {
  id: '',
  name: 'New Organization',
  subtitle: '',
  colorScheme: {
    'default': { label: 'Default', color: '#4a9eff', bg: '#09141f', border: '#162e55', textDim: '#2e5a9a', textBright: '#7eb8f7' },
    'secondary': { label: 'Secondary', color: '#2de8c0', bg: '#041f18', border: '#0c4535', textDim: '#1a7a60', textBright: '#5ee8c0' },
    'tertiary': { label: 'Tertiary', color: '#a78bfa', bg: '#100c1e', border: '#2e2260', textDim: '#5048a0', textBright: '#b0a0f4' },
    'highlight': { label: 'Highlight', color: '#f5a623', bg: '#150e04', border: '#5a3a08', textDim: '#906020', textBright: '#f0b850' },
  },
  root: {
    id: 'root',
    name: 'Organization',
    subtitle: 'Click to edit',
    type: 'default',
    children: []
  }
};
