import React, { useState, useRef, useEffect } from 'react';
import { 
  Beer, Brain, Pizza, Ghost, Car, PartyPopper, Skull, Unlock, RotateCcw 
} from 'lucide-react';
import { getRandomInt } from './utils/helpers';
import * as Games from './games';

const RESULTS = {
  SOBER: [
    "You are sober enough to explain the plot of Inception.",
    "Designated Driver energy. Sorry, I don't make the rules.",
    "Go home and do your taxes. You're too responsible for this.",
    "You have the reaction time of a fighter pilot. Boring.",
    "You are currently 0% fun. Go drink a water.",
    "Your parents would be proud. Your friends are disappointed.",
    "You could legally operate a forklift right now.",
    "Stop playing this and go calculate everyone's split of the bill.",
  ],
  BUZZED: [
    "You think you're whispering, but you're actually yelling.",
    "You're at the 'I love this song' stage of the night.",
    "Slightly cooked. Medium rare.",
    "You're vibing, but stay away from the aux cord.",
    "Confident enough to dance, sober enough to regret it tomorrow.",
    "Main character energy, but the budget is low.",
    "You're fine, but don't try to jump over anything.",
    "Approaching the danger zone. Eat a fry.",
  ],
  DRUNK: [
    "Put the phone down before you text your ex.",
    "You are currently entering Goblin Mode.",
    "Your depth perception is just a suggestion right now.",
    "Don't look at your bank account until Wednesday.",
    "You just tried to unlock your front door with a library card.",
    "Order the pizza. Do it. You need the cheese.",
    "You're walking in cursive.",
    "Access to social media should be revoked immediately.",
  ],
  WASTED: [
    "Sir, you are talking to a lamp.",
    "You have the coordination of a baby giraffe on ice.",
    "404: Brain not found.",
    "You are absolutely cooked. Burnt toast.",
    "Go sleep on the nearest soft surface.",
    "I'm surprised you haven't dropped your phone yet.",
    "You are a hazard to yourself and the furniture.",
    "Game Over. Literally. Go to bed.",
  ]
};

const App = () => {
  const [view, setView] = useState('HOME'); // HOME, GAME, RESULT, ADMIN
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [fromAdmin, setFromAdmin] = useState(false);
  const secretTimerRef = useRef(null);
  const animTimerRef = useRef(null);
  const gameHistoryRef = useRef([]);

  useEffect(() => {
    try {
      // Initialize AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  const GAMES = [
    { id: 'balance', name: 'Hold My Beer', color: 'text-neon-pink', Component: Games.HoldMyBeer },
    { id: 'typing', name: 'Drunk Text', color: 'text-neon-blue', Component: Games.DrunkText },
    { id: 'memory', name: 'Where\'s Keys?', color: 'text-neon-purple', Component: Games.WheresMyKeys },
    { id: 'reflex', name: 'Taco Run', color: 'text-neon-green', Component: Games.TacoRun },
    { id: 'math', name: 'Tip Math', color: 'text-yellow-400', Component: Games.TipCalculator },
    { id: 'stroop', name: 'Vibe Check', color: 'text-red-500', Component: Games.VibeCheck },
    { id: 'pizza', name: 'Pizza King', color: 'text-orange-500', Component: Games.PizzaKing },
    { id: 'pong', name: 'Shot Pong', color: 'text-green-400', Component: Games.ShotPong },
    { id: 'toilet', name: 'Toilet Rush', color: 'text-blue-300', Component: Games.ToiletRush },
    { id: 'uber', name: 'Uber Code', color: 'text-purple-400', Component: Games.UberCode },
    { id: 'alphabet', name: 'Alphabet Soup', color: 'text-yellow-200', Component: Games.AlphabetSoup },
    { id: 'bigsmall', name: 'Big vs Small', color: 'text-white', Component: Games.BigVsSmall },
    { id: 'bouncer', name: 'The Bouncer', color: 'text-blue-500', Component: Games.TheBouncer },
    { id: 'ghost', name: 'Ghost Toast', color: 'text-pink-500', Component: Games.GhostToast },
    { id: 'clock', name: 'Internal Clock', color: 'text-gray-300', Component: Games.InternalClock },
    { id: 'extext', name: 'Text Your Ex', color: 'text-red-600', Component: Games.TextYourEx },
    { id: 'line', name: 'The Line', color: 'text-neon-blue', Component: Games.TheLine },
    { id: 'reverse', name: 'Opposite Day', color: 'text-purple-400', Component: Games.ReversePsych },
    { id: 'spin', name: 'Spin Cycle', color: 'text-green-400', Component: Games.SpinCycle },
    { id: 'survival', name: 'Survival Mode', color: 'text-red-500', Component: Games.SurvivalMode },
    { id: 'redlight', name: 'Red Light', color: 'text-yellow-400', Component: Games.RedLight },
    { id: 'beer', name: 'Beer Goggles', color: 'text-blue-300', Component: Games.BeerGoggles },
    { id: 'pour', name: 'Perfect Pour', color: 'text-yellow-500', Component: Games.PerfectPour },
    { id: 'hydrate', name: 'Hydrate', color: 'text-blue-500', Component: Games.Hydrate },
    { id: 'catch', name: 'Catch Uber', color: 'text-white', Component: Games.CatchUber },
  ];

  const startSecretUnlock = () => { animTimerRef.current = setTimeout(() => setIsUnlocking(true), 1000); secretTimerRef.current = setTimeout(() => { setView('ADMIN'); setIsUnlocking(false); }, 3000); };
  const cancelSecretUnlock = () => { clearTimeout(secretTimerRef.current); clearTimeout(animTimerRef.current); setIsUnlocking(false); };
  const startGame = (g = null) => { 
    setFromAdmin(view === 'ADMIN');
    setLoading(true); 
    setTimeout(() => { 
      let nextGame = g;

      if (!nextGame) {
        // Filter out recently played games to ensure variety
        // NOTE: This number should increase if more games get added
        const HISTORY_SIZE = 5;
        const availableGames = GAMES.filter(game => !gameHistoryRef.current.includes(game.id));
        const pool = availableGames.length > 0 ? availableGames : GAMES;
        
        nextGame = pool[getRandomInt(0, pool.length - 1)];
        
        // Update FIFO queue
        gameHistoryRef.current.push(nextGame.id);
        if (gameHistoryRef.current.length > HISTORY_SIZE) {
          gameHistoryRef.current.shift();
        }
      }

      setCurrentGame(nextGame); 
      setView('GAME'); 
      setLoading(false); 
    }, 1000); 
  };
  const handleGameFinish = (s) => { setFinalScore(s); setView('RESULT'); };
  
  const result = (() => {
    if (finalScore >= 9) return { 
      d: "0 (Designated Driver)", 
      c: RESULTS.SOBER[getRandomInt(0, RESULTS.SOBER.length - 1)], 
      color: "text-green-500", 
      icon: <Car className="w-16 h-16 mx-auto mb-4 text-green-500" /> 
    };
    if (finalScore >= 7) return { 
      d: "1-2 Drinks", 
      c: RESULTS.BUZZED[getRandomInt(0, RESULTS.BUZZED.length - 1)], 
      color: "text-yellow-400", 
      icon: <PartyPopper className="w-16 h-16 mx-auto mb-4 text-yellow-400" /> 
    };
    if (finalScore >= 4) return { 
      d: "3-5 Drinks", 
      c: RESULTS.DRUNK[getRandomInt(0, RESULTS.DRUNK.length - 1)], 
      color: "text-orange-500", 
      icon: <Beer className="w-16 h-16 mx-auto mb-4 text-orange-500" /> 
    };
    return { 
      d: "WASTED", 
      c: RESULTS.WASTED[getRandomInt(0, RESULTS.WASTED.length - 1)], 
      color: "text-red-600", 
      icon: <Skull className="w-16 h-16 mx-auto mb-4 text-red-600 animate-pulse" /> 
    };
  })();

  return (
    <div className="min-h-screen bg-black font-sans text-white flex flex-col items-center justify-center p-4 pb-32 overflow-hidden relative selection:bg-neon-pink selection:text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none"><div className="absolute -top-10 -left-10 w-96 h-96 bg-neon-purple blur-[128px] rounded-full animate-pulse"></div><div className="absolute -bottom-10 -right-10 w-96 h-96 bg-neon-blue blur-[128px] rounded-full animate-pulse delay-1000"></div></div>
      
      {view === 'HOME' && (
        <div className="z-10 text-center max-w-md w-full animate-fade-in">
          <div className={`cursor-pointer select-none transition-transform ${isUnlocking ? 'animate-shake text-red-500' : ''}`} onMouseDown={startSecretUnlock} onTouchStart={startSecretUnlock} onMouseUp={cancelSecretUnlock} onTouchEnd={cancelSecretUnlock} onMouseLeave={cancelSecretUnlock}>
             <h1 className="text-6xl font-black tracking-tighter italic mb-2"><span className={isUnlocking?"text-red-500":"text-neon-pink"}>BUZZ</span><span className={isUnlocking?"text-red-500":"text-neon-green"}>CHECK</span></h1>
             {isUnlocking && <p className="text-red-500 font-mono text-xs animate-pulse tracking-widest">SYSTEM FAILURE...</p>}
          </div>
          <div className="flex justify-center gap-2 mb-12"><span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">v1.0</span></div>
          {loading ? <div className="flex flex-col items-center h-40"><div className="w-16 h-16 border-4 border-t-neon-pink border-r-neon-blue border-b-neon-green border-l-yellow-400 rounded-full animate-spin mb-4"></div><p className="font-mono animate-pulse">Calibrating...</p></div> : 
          <button onClick={() => startGame()} className="w-full bg-white text-black text-2xl font-black py-6 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] border-4 border-transparent hover:border-neon-pink">CHECK MY STATUS</button>}
          <div className="mt-12 grid grid-cols-5 gap-4 opacity-50 text-gray-600"><Beer className="mx-auto"/><Brain className="mx-auto"/><Pizza className="mx-auto"/><Ghost className="mx-auto"/><Car className="mx-auto"/></div>
          <button onClick={() => setShowDisclaimer(true)} className="mt-8 text-xs text-gray-500 hover:text-white underline decoration-dotted transition-colors">⚠️ Legal Disclaimer</button>
        </div>
      )}

      {view === 'ADMIN' && (
        <div className="z-20 w-full max-w-md h-full flex flex-col bg-black/90 backdrop-blur-sm absolute inset-0 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-black py-4 border-b border-gray-800 z-30"><h2 className="text-2xl font-black text-gray-400 flex items-center gap-2"><Unlock size={24} /> ADMIN</h2><button onClick={() => setView('HOME')} className="bg-gray-800 p-2 rounded">Close</button></div>
            <div className="grid grid-cols-1 gap-3 pb-20">{GAMES.map((g, i) => <button key={g.id} onClick={() => startGame(g)} className="flex justify-between p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-neon-green"><span className="text-gray-500 w-8">{i+1}.</span><span className={`font-bold flex-1 text-left ${g.color}`}>{g.name}</span><div className="bg-gray-800 p-2 rounded ml-4 text-xs">PLAY</div></button>)}</div>
        </div>
      )}

      {view === 'GAME' && currentGame && (
        <div className="z-10 w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-md flex justify-between items-center mb-8 p-2 border-b border-gray-800"><span className="font-bold text-gray-500">CHALLENGE</span><span className={`font-black uppercase tracking-wider ${currentGame.color}`}>{currentGame.name}</span></div>
            <currentGame.Component onFinish={handleGameFinish} />
        </div>
      )}

      {view === 'RESULT' && (
        <div className="z-10 text-center max-w-md w-full animate-scale-in px-4">
          <div className="bg-gray-900 p-5 rounded-2xl border border-gray-700 shadow-2xl">
            {/* Compact Header */}
            <div className="flex flex-col items-center">
                <div className="scale-75 origin-bottom -mb-2">{result.icon}</div>
                <h2 className="text-gray-500 uppercase tracking-widest text-xs mb-1">Score</h2>
                <div className="text-7xl font-black flex justify-center items-baseline leading-none mb-4">
                  <span className={result.color}>{finalScore}</span>
                  <span className="text-3xl text-gray-600 ml-1">/10</span>
                </div>
            </div>

            <div className="h-px w-full bg-gray-800 mb-4"></div>

            {/* Result Info */}
            <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Est. Intake</h3>
                <p className={`text-xl font-black ${result.color}`}>{result.d}</p>
            </div>

            {/* Quote */}
            <div className="bg-black/40 p-3 rounded-xl border border-gray-800 mb-5">
              <p className="text-base italic text-white leading-snug">"{result.c}"</p>
            </div>
            
            {/* Big Visible Button */}
            <button 
                onClick={() => setView(fromAdmin ? 'ADMIN' : 'HOME')} 
                className="w-full bg-white text-black font-black py-3.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 mb-4"
            >
                <RotateCcw size={20} /> TEST AGAIN
            </button>

            {/* Minimal Disclaimer */}
            <div className="pt-3 border-t border-gray-800/50">
              <p className="text-[10px] text-gray-600 leading-tight">
                ⚠️ ENTERTAINMENT ONLY. <span className="block text-gray-500 mt-1">Do not use to assess driving ability.</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {showDisclaimer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="bg-gray-900 border border-red-500/30 p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-[0_0_50px_rgba(220,38,38,0.2)]">
            <h2 className="text-2xl font-black text-red-500 mb-4 flex items-center gap-2">
              <Skull size={24} /> CRITICAL DISCLAIMER
            </h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed text-left">
              <p className="font-bold text-white">THIS APP IS FOR ENTERTAINMENT PURPOSES ONLY.</p>
              <p>BuzzCheck is a game designed for amusement. It is NOT a scientific instrument, a breathalyzer, or a valid medical test of sobriety or cognitive ability.</p>
              <p>The scores, comments, and estimations provided by this application are randomly generated or based on simple game mechanics and should never be used to determine:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>Your Blood Alcohol Concentration (BAC).</li>
                <li>Your ability to operate a motor vehicle.</li>
                <li>Your ability to operate heavy machinery.</li>
                <li>Your ability to make legal or medical decisions.</li>
              </ul>
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg my-4">
                <p className="text-red-400 font-bold mb-2">NEVER DRINK AND DRIVE.</p>
                <p className="text-xs text-red-300">If you have consumed alcohol, do not drive. Call a taxi, a ride-share service, or a friend. Reliance on this app to determine fitness to drive is dangerous and strictly prohibited.</p>
              </div>
              <p className="text-xs text-gray-500">By using this application, you acknowledge that the creators accept no liability for any actions taken based on the game's results.</p>
            </div>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors border border-gray-700"
            >
              I UNDERSTAND
            </button>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-28 text-gray-600 text-xs font-mono">BUZZCHECK v1.0 // DON'T DRINK AND DRIVE</div>

      {/* 
        =============================================================================
        ADSENSE CONFIGURATION
        =============================================================================
        1. Create a "Display Ad" unit in your Google AdSense dashboard.
        2. Copy the 'data-ad-client' (Your Publisher ID) and 'data-ad-slot' (Ad Unit ID).
        3. Paste the <ins> tag code inside the div below.
        4. Ensure you also add the AdSense script tag to your index.html <head> section.
           (See index.html for instructions)
      */}
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-gray-900/90 border-t border-gray-800 flex justify-center items-center z-50 backdrop-blur-sm overflow-hidden">
          {/* BuzzCheck Bottom Banner 1 */}
          <ins 
            className="adsbygoogle"
            style={{ 
              display: 'inline-block', 
              width: '100%', 
              height: '90px', 
              maxHeight: '90px'
            }}
            data-ad-client="ca-pub-8187636241583182"
            data-ad-slot="3512892683"
          />
      </div>
    </div>
  );
};

export default App;