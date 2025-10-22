import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { toast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';
import { 
  Music, 
  Sparkles, 
  Play, 
  Pause, 
  Download, 
  Clock, 
  Wand2,
  Volume2,
  Disc3,
  Library,
  Zap,
  Radio
} from 'lucide-react';
import { mockGeneratedMusic, musicGenres, durations } from '../mock';

const LandingPage = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [duration, setDuration] = useState(120);
  const [generatedMusic, setGeneratedMusic] = useState(mockGeneratedMusic);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const audioRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('generatedMusic');
    if (saved) {
      setGeneratedMusic(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Por favor describe la música que quieres crear",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      const newMusic = {
        id: Date.now().toString(),
        title: `Generación ${generatedMusic.length + 1}`,
        prompt: prompt,
        genre: selectedGenre || 'Personalizado',
        duration: duration,
        createdAt: new Date().toISOString(),
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
      };

      const updated = [newMusic, ...generatedMusic];
      setGeneratedMusic(updated);
      localStorage.setItem('generatedMusic', JSON.stringify(updated));
      
      setIsGenerating(false);
      setProgress(0);
      setPrompt('');
      
      toast({
        title: "¡Música generada!",
        description: "Tu música ha sido creada exitosamente"
      });
    }, 3000);
  };

  const handlePlay = (music) => {
    if (currentPlaying?.id === music.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = music.audioUrl;
        audioRef.current.play();
        setCurrentPlaying(music);
        setIsPlaying(true);
      }
    }
  };

  const handleDownload = (music) => {
    toast({
      title: "Descargando...",
      description: `Descargando ${music.title}`
    });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) return 'Hace unos minutos';
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="min-h-screen grid-background">
      <Toaster />
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      
      {/* Header */}
      <header className="cyber-header sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_sonic-creator-15/artifacts/gkc8jtok_WhatsApp%20Image%202025-10-20%20at%207.30.49%20PM.jpeg" 
                alt="Music Man Creator Logo" 
                className="w-16 h-16 logo-glow"
              />
              <h1 className="text-3xl font-bold neon-text" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px'}}>
                MUSIC MAN CREATOR
              </h1>
            </div>
            <nav className="flex gap-8" style={{fontFamily: 'Rajdhani, sans-serif'}}>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-lg uppercase">Inicio</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-lg uppercase">Explorar</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-lg uppercase">Biblioteca</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12 fade-in-up">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 cyber-badge px-6 py-3 rounded-full">
              <Zap className="w-5 h-5 text-cyan-400" strokeWidth={2.5} />
              <span className="text-cyan-400 font-bold">Potenciado por IA</span>
            </div>
          </div>
          <h2 className="text-7xl font-bold mb-6 neon-text" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '3px'}}>
            CREA MÚSICA CON
            <br />
            <span className="neon-text-purple">INTELIGENCIA ARTIFICIAL</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto" style={{fontFamily: 'Rajdhani, sans-serif', fontWeight: 500}}>
            Describe tu idea y deja que la IA componga música única y original en segundos
          </p>
        </div>

        {/* Generation Interface */}
        <Card className="max-w-4xl mx-auto neon-border">
          <CardHeader className="border-b-2 border-cyan-900">
            <CardTitle className="flex items-center gap-3 text-3xl neon-text" style={{fontFamily: 'Orbitron, sans-serif'}}>
              <Wand2 className="w-8 h-8" strokeWidth={2.5} />
              GENERADOR DE MÚSICA IA
            </CardTitle>
            <CardDescription className="text-lg text-gray-400" style={{fontFamily: 'Rajdhani, sans-serif'}}>
              Describe tu idea musical y personaliza los parámetros
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Prompt Input */}
            <div className="space-y-3">
              <label className="text-lg font-bold text-cyan-400 flex items-center gap-2" style={{fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase'}}>
                <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                ¿Qué tipo de música quieres crear?
              </label>
              <Textarea
                placeholder="Ejemplo: Una melodía épica de synthwave con bajos profundos y sintetizadores retro-futuristas..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-28 resize-none cyber-input text-lg"
                style={{fontFamily: 'Rajdhani, sans-serif'}}
                disabled={isGenerating}
              />
            </div>

            {/* Genre Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-lg font-bold text-cyan-400 flex items-center gap-2" style={{fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase'}}>
                  <Disc3 className="w-5 h-5" strokeWidth={2.5} />
                  Género Musical
                </label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre} disabled={isGenerating}>
                  <SelectTrigger className="cyber-input text-lg h-12" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-cyan-500" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                    {musicGenres.map((genre) => (
                      <SelectItem key={genre} value={genre} className="text-lg text-gray-200 hover:text-cyan-400">{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-cyan-400 flex items-center gap-2" style={{fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase'}}>
                  <Clock className="w-5 h-5" strokeWidth={2.5} />
                  Duración: {formatDuration(duration)}
                </label>
                <Slider
                  value={[duration]}
                  onValueChange={(val) => setDuration(val[0])}
                  min={30}
                  max={300}
                  step={30}
                  className="pt-4"
                  disabled={isGenerating}
                />
              </div>
            </div>

            {/* Progress */}
            {isGenerating && (
              <div className="space-y-3 p-4 neon-border rounded-lg">
                <div className="flex items-center justify-between text-lg font-bold text-cyan-400" style={{fontFamily: 'Orbitron, sans-serif'}}>
                  <span className="flex items-center gap-2">
                    <Radio className="w-5 h-5 animate-pulse" />
                    GENERANDO TU MÚSICA...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="cyber-progress h-4 rounded-full overflow-hidden">
                  <div 
                    className="cyber-progress-bar h-full transition-all duration-300"
                    style={{width: `${progress}%`}}
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-16 text-xl cyber-button"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400 mr-3" />
                  GENERANDO...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6 mr-3" strokeWidth={2.5} />
                  GENERAR MÚSICA
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Music Library */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-10">
            <Library className="w-10 h-10 text-cyan-400" strokeWidth={2.5} />
            <h3 className="text-5xl font-bold neon-text" style={{fontFamily: 'Orbitron, sans-serif'}}>TU BIBLIOTECA MUSICAL</h3>
          </div>

          {generatedMusic.length === 0 ? (
            <Card className="p-16 text-center neon-border">
              <Music className="w-24 h-24 mx-auto mb-6 text-cyan-400" strokeWidth={2} />
              <p className="text-gray-400 text-2xl" style={{fontFamily: 'Rajdhani, sans-serif', fontWeight: 500}}>Aún no has generado ninguna música</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedMusic.map((music, index) => (
                <Card key={music.id} className="group holo-card" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 text-cyan-400" style={{fontFamily: 'Orbitron, sans-serif'}}>{music.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-400" style={{fontFamily: 'Rajdhani, sans-serif'}}>{formatDate(music.createdAt)}</CardDescription>
                      </div>
                      <div className="cyber-badge px-3 py-1 rounded-full">
                        <span className="text-xs text-cyan-400">{music.genre}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-base text-gray-300 line-clamp-2" style={{fontFamily: 'Rajdhani, sans-serif'}}>{music.prompt}</p>
                    
                    <div className="flex items-center text-sm text-cyan-400" style={{fontFamily: 'Rajdhani, sans-serif', fontWeight: 600}}>
                      <Clock className="w-4 h-4 mr-2" strokeWidth={2.5} />
                      {formatDuration(music.duration)}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handlePlay(music)}
                        className={`flex-1 cyber-button h-12 ${
                          currentPlaying?.id === music.id && isPlaying 
                            ? 'border-purple-500 text-purple-400' 
                            : ''
                        }`}
                        style={{fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem'}}
                      >
                        {currentPlaying?.id === music.id && isPlaying ? (
                          <>
                            <Pause className="w-5 h-5 mr-2" strokeWidth={2.5} />
                            PAUSAR
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-2" strokeWidth={2.5} />
                            REPRODUCIR
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDownload(music)}
                        className="cyber-button w-14 h-12"
                      >
                        <Download className="w-5 h-5" strokeWidth={2.5} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-cyan-900 bg-slate-900/50 mt-24 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-10">
          <div className="text-center">
            <p className="font-bold text-xl text-cyan-400" style={{fontFamily: 'Orbitron, sans-serif'}}>© 2025 MUSIC MAN CREATOR</p>
            <p className="text-gray-400 mt-2" style={{fontFamily: 'Rajdhani, sans-serif'}}>Creado con Inteligencia Artificial</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;