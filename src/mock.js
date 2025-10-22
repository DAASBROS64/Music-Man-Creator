export const mockGeneratedMusic = [
  {
    id: '1',
    title: 'Sunset Dreams',
    prompt: 'Chill lo-fi beats with piano and soft drums',
    genre: 'Lo-Fi',
    duration: 180,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Epic Adventure',
    prompt: 'Orchestral epic music with powerful strings and brass',
    genre: 'Orchestral',
    duration: 240,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Urban Vibes',
    prompt: 'Hip hop beat with deep bass and synthesizers',
    genre: 'Hip Hop',
    duration: 150,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export const musicGenres = [
  'Lo-Fi',
  'Electronic',
  'Orchestral',
  'Jazz',
  'Hip Hop',
  'Rock',
  'Ambient',
  'Classical',
  'Pop',
  'Cinematic'
];

export const durations = [
  { label: '30 segundos', value: 30 },
  { label: '1 minuto', value: 60 },
  { label: '2 minutos', value: 120 },
  { label: '3 minutos', value: 180 },
  { label: '5 minutos', value: 300 }
];