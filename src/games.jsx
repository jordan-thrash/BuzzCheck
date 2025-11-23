import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Beer, MessageSquare, Brain, Calculator, Bell, Zap, RotateCcw, 
  PartyPopper, Skull, Car, Pizza, Hash, Search, Type, Palette, 
  MoveHorizontal, Clock, ShieldCheck, AlertTriangle, Wine, Ghost,
  Lock, Unlock, Droplet, Smartphone, ArrowLeft, ArrowRight, 
  AlertOctagon, Eye, ArrowDown, XCircle, Send
} from 'lucide-react';
import { getRandomInt, shuffleArray } from './utils/helpers';

// --- GAMES ---

export const HoldMyBeer = ({ onFinish }) => {
  const [position, setPosition] = useState(50);
  const positionRef = useRef(50);
  const [target, setTarget] = useState(50);
  const targetRef = useRef(50);
  const velocityRef = useRef(0.5);
  const [score, setScore] = useState(100);
  const scoreRef = useRef(100);
  const [timeLeft, setTimeLeft] = useState(5); 
  const [status, setStatus] = useState('WAITING'); // WAITING, PLAYING
  const requestRef = useRef();

  const handleSlide = (e) => {
    const val = Number(e.target.value);
    setPosition(val);
    positionRef.current = val;
    if (status === 'WAITING') setStatus('PLAYING');
  };

  useEffect(() => {
    if (status !== 'PLAYING') return;

    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const remaining = Math.max(0, 5 - elapsed); 
      
      setTimeLeft(remaining.toFixed(1));

      if (remaining <= 0) {
        onFinish(Math.ceil(scoreRef.current / 10));
        return;
      }

      // Move Target
      let newPos = targetRef.current + velocityRef.current;
      if (newPos >= 90 || newPos <= 10) velocityRef.current *= -1;
      
      // Random Direction Change (0.5% chance)
      if (Math.random() < 0.005) velocityRef.current *= -1;

      targetRef.current = Math.max(10, Math.min(90, newPos));
      setTarget(targetRef.current);

      // Check overlap (Tolerance 10) - Grace period of 1s
      if (elapsed > 1.0 && Math.abs(positionRef.current - targetRef.current) > 10) {
        scoreRef.current = Math.max(0, scoreRef.current - 0.8); 
        setScore(scoreRef.current);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [onFinish, status]);

  return (
    <div className="flex flex-col items-center w-full max-w-md p-4">
      <h3 className="text-2xl font-bold text-neon-pink mb-4">HOLD MY BEER</h3>
      <div className="w-full flex justify-between items-center mb-2 px-2">
          <div className="text-xl font-mono text-white">{timeLeft}s</div>
          <div className="w-2/3 bg-gray-700 h-2 rounded-full"><div className="h-full bg-green-500 transition-all" style={{ width: `${score}%`, backgroundColor: score < 50 ? 'red' : 'lime' }}></div></div>
      </div>
      <div className="relative w-full h-16 bg-gray-800 rounded-full mb-8 border-2 border-gray-600 overflow-hidden">
        <div className="absolute top-0 h-full w-20 bg-yellow-500/30 border-x-2 border-yellow-500 flex items-center justify-center transition-none" style={{ left: `calc(${target}% - 40px)` }}><Beer className="text-yellow-400" /></div>
        <div className="absolute top-0 h-full w-2 bg-neon-pink transition-none" style={{ left: `${position}%` }} />
        {status === 'WAITING' && <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold animate-pulse">MOVE SLIDER TO START</div>}
      </div>
      <input type="range" min="0" max="100" value={position} onChange={handleSlide} className="w-full h-12 accent-neon-pink cursor-pointer mb-4 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full" />
    </div>
  );
};

export const DrunkText = ({ onFinish }) => {
  const phrases = [
    "i literally love you so much rn", 
    "yo can we pls go get mcdonalds", 
    "wait where are you guys", 
    "we should start a podcast",
    "did i leave my card at the bar",
    "im not even that drunk tbh",
    "come to the bathroom with me",
    "i think i just saw my ex",
    "send me the address again",
    "stop yelling at me im sensitive",
    "can you call me an uber",
    "i promise im on my way",
    "who is that guy over there",
    "lets go to the after party",
    "i need pizza immediately"
  ];
  const [phrase] = useState(phrases[getRandomInt(0, phrases.length - 1)]);
  const [input, setInput] = useState("");
  const initialTime = Math.max(5, Math.ceil(phrase.length * 0.35));
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [submitted, setSubmitted] = useState(false);
  const [typos, setTypos] = useState(0);
  const [clarity, setClarity] = useState(false);
  const [wobble, setWobble] = useState(0);

  // Clarity Interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setClarity(true);
        setTimeout(() => setClarity(false), getRandomInt(300, 800)); // Brief moment of clarity
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Wobble Animation
  useEffect(() => {
    let frame;
    const animate = () => {
      const time = Date.now();
      // Create a slow, irregular wobble
      const angle = Math.sin(time / 500) * 3 + Math.sin(time / 200) * 1.5;
      setWobble(angle);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) { const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(t); }
    else if (timeLeft === 0 && !submitted) handleSubmit();
  }, [timeLeft, submitted]);

  const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
          setTypos(t => t + 1);
      }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let errors = 0;
    const limit = Math.max(phrase.length, input.length);
    for (let i = 0; i < limit; i++) if (input[i] !== phrase[i]) errors++;
    
    // Score Calculation
    // Base: 10
    // Errors: -1.5 each
    // Typos (Backspaces): -0.5 each
    // Time Penalty: If > 10s used (timeLeft < 10), -1 per 2s
    
    let score = 10;
    score -= (errors * 1.5);
    score -= (typos * 0.5);
    
    // Stricter Time Penalty:
    // If you use more than 70% of the time, score drops rapidly.
    // At 70% time used: 0 penalty.
    // At 100% time used: -10 penalty.
    const timeUsedPct = (initialTime - timeLeft) / initialTime;
    if (timeUsedPct > 0.7) {
        score -= Math.ceil((timeUsedPct - 0.7) * 20);
    }

    onFinish(Math.max(0, Math.ceil(score)));
  };

  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-neon-blue mb-2">DRUNK TEXT</h3>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mb-4 overflow-hidden">
          <p className="font-mono text-lg text-white" style={{ 
            filter: clarity ? 'none' : 'blur(1.5px)', 
            transform: clarity ? 'none' : `skewX(${wobble}deg) rotate(${wobble * 0.5}deg) scale(1.05)`,
            textShadow: clarity ? 'none' : '2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,255,255,0.5)',
            transition: 'filter 0.2s, text-shadow 0.2s' // Removed transform transition for smooth animation
          }}>{phrase}</p>
      </div>
      <textarea 
        className="w-full bg-gray-900 text-white p-3 rounded border border-neon-blue font-mono mb-4" 
        rows="4" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleKeyDown}
        autoCorrect="off" 
      />
      <button onClick={handleSubmit} className="w-full bg-neon-blue text-black font-bold py-2 rounded">SEND IT ({timeLeft}s)</button>
    </div>
  );
};

export const WheresMyKeys = ({ onFinish }) => {
  const [sequence, setSequence] = useState([]);
  const userSequence = useRef([]);
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(1);
  const [flashIndex, setFlashIndex] = useState(null);
  const [userFlashIndex, setUserFlashIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  useEffect(() => { startRound(1, []); }, []);

  // Timer for user input
  useEffect(() => {
      if (!playing && sequence.length > 0) {
          timerRef.current = setInterval(() => {
              setTimeLeft(prev => {
                  if (prev <= 0) {
                      clearInterval(timerRef.current);
                      onFinish(0);
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);
      } else {
          clearInterval(timerRef.current);
          setTimeLeft(10); // Reset timer for next round
      }
      return () => clearInterval(timerRef.current);
  }, [playing, sequence, onFinish]);

  const startRound = (currentRound, currentSeq) => {
    const newStep = getRandomInt(0, 15);
    const nextSeq = [...currentSeq, newStep];
    setSequence(nextSeq);
    setRound(currentRound);
    playSequence(nextSeq, currentRound);
  };

  const playSequence = (seq, currentRound) => {
    setPlaying(true);
    userSequence.current = [];
    let i = 0;
    
    // Progressively faster
    const speed = Math.max(150, 400 - (currentRound * 50));
    const flashDuration = Math.max(100, 250 - (currentRound * 30));

    const interval = setInterval(() => {
      if (i >= seq.length) { clearInterval(interval); setFlashIndex(null); setPlaying(false); return; }
      setFlashIndex(seq[i]); setTimeout(() => setFlashIndex(null), flashDuration); i++;
    }, speed);
  };

  const handleTap = (index) => {
    if (playing) return;
    setUserFlashIndex(index); setTimeout(() => setUserFlashIndex(null), 150);
    
    userSequence.current = [...userSequence.current, index];
    const newUserSeq = userSequence.current;
    
    const currentIndex = newUserSeq.length - 1;
    if (newUserSeq[currentIndex] !== sequence[currentIndex]) { onFinish(Math.min(10, (round - 1) * 2)); return; }
    if (newUserSeq.length === sequence.length) { 
      if (round === 5) { onFinish(10); } 
      else { 
        setPlaying(true); 
        setTimeout(() => startRound(round + 1, sequence), 800); 
      } 
    }
  };

  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-neon-purple">WHERE'S MY KEYS?</h3>
        <span className="text-red-500 font-mono font-bold">{!playing ? `${timeLeft}s` : 'WATCH'}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mx-auto max-w-[320px]">
        {[...Array(16)].map((_, i) => (
          <button 
            key={i} 
            onPointerDown={(e) => { e.preventDefault(); handleTap(i); }}
            className={`aspect-square rounded-lg border-2 transition-all duration-100 ${(flashIndex === i || userFlashIndex === i) ? 'bg-neon-purple border-white shadow-[0_0_15px_#d946ef] scale-95' : 'bg-gray-800 border-gray-600'}`}
            style={{ touchAction: 'none' }}
          >
            {(flashIndex === i || userFlashIndex === i) && <Car className="mx-auto text-white w-5 h-5" />}
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-400">{playing ? `Round ${round}/5` : "Repeat Pattern"}</p>
    </div>
  );
};

export const TacoRun = ({ onFinish }) => {
  const [state, setState] = useState('WAITING');
  const [startTime, setStartTime] = useState(0);
  useEffect(() => { const delay = getRandomInt(2000, 5000); const t = setTimeout(() => { setState('READY'); setStartTime(Date.now()); }, delay); return () => clearTimeout(t); }, []);
  const handleClick = () => {
    if (state === 'WAITING') onFinish(0);
    else if (state === 'READY') { const time = Date.now() - startTime; onFinish(time < 300 ? 10 : time < 400 ? 8 : time < 550 ? 5 : 2); }
  };
  return (
    <div className={`w-full h-64 rounded-xl flex items-center justify-center cursor-pointer ${state === 'WAITING' ? 'bg-gray-800' : 'bg-neon-green'}`} onPointerDown={(e) => { e.preventDefault(); handleClick(); }} style={{ touchAction: 'none' }}>
      {state === 'WAITING' ? <p className="text-xl font-bold">WAIT FOR GREEN...</p> : <Bell className="w-20 h-20 text-black animate-bounce" />}
    </div>
  );
};

export const TipCalculator = ({ onFinish }) => {
  const [q, setQ] = useState(null);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => { 
    const difficultyRoll = Math.random();
    let billVal, difficultyBonus, label;
    if (difficultyRoll > 0.7) {
        billVal = (getRandomInt(2000, 9000) / 100).toFixed(2); difficultyBonus = 4; label = "HARD";
    } else if (difficultyRoll > 0.4) {
        billVal = getRandomInt(20, 90).toFixed(2); difficultyBonus = 2; label = "MEDIUM";
    } else {
        billVal = (getRandomInt(2, 9) * 10).toFixed(2); difficultyBonus = 0; label = "EASY";
    }
    setQ({ bill: billVal, answer: (parseFloat(billVal) * 0.2).toFixed(2), bonus: difficultyBonus, label });
  }, []);

  useEffect(() => { if (timeLeft > 0) { const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(timer); } else { onFinish(0); } }, [timeLeft]);

  const check = () => { 
    if (!q) return;
    const diff = Math.abs(parseFloat(input) - parseFloat(q.answer)); 
    if (diff < 0.15) {
        let speedScore = 6;
        if (timeLeft > 11) speedScore = 10; else if (timeLeft > 8) speedScore = 9; else if (timeLeft > 5) speedScore = 8; else if (timeLeft > 2) speedScore = 7;
        onFinish(Math.min(10, speedScore + q.bonus));
    } else if (q.label === 'HARD' && diff < 1.0) { onFinish(5); } else if (q.label === 'MEDIUM' && diff < 0.6) { onFinish(4); } else { onFinish(0); }
  };

  const handleKeypad = (val) => {
    if (val === 'DEL') {
      setInput(prev => prev.slice(0, -1));
    } else if (val === 'ENTER') {
      check();
    } else {
      if (input.length < 6) setInput(prev => prev + val);
    }
  };

  if (!q) return null;
  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-bold text-yellow-400">TIP CALC</h3><span className={`text-xs font-bold px-2 py-1 rounded ${q.label === 'HARD' ? 'bg-red-500 text-black' : q.label === 'MEDIUM' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}>{q.label}</span></div>
      
      <div className="bg-gray-800 p-4 rounded-xl mb-4 border-2 border-yellow-500">
        <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400 uppercase text-xs tracking-widest">BILL</p>
            <p className="text-red-500 font-bold">{timeLeft}s</p>
        </div>
        <p className="text-4xl font-mono text-white mb-2">${q.bill}</p>
        <p className="text-yellow-400 font-bold text-sm mb-2">What is 20%?</p>
        <div className="bg-black/50 p-2 rounded border border-gray-600 h-12 flex items-center justify-center">
            <span className="text-2xl font-mono text-neon-green">{input || '?.??'}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'DEL'].map((k) => (
            <button 
                key={k} 
                onClick={() => handleKeypad(k)}
                className={`h-12 rounded-lg font-bold text-xl active:scale-95 transition-transform ${k === 'DEL' ? 'bg-red-900/50 text-red-400' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            >
                {k === 'DEL' ? '⌫' : k}
            </button>
        ))}
        <button onClick={() => handleKeypad('ENTER')} className="col-span-3 bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 active:scale-95 transition-transform mt-1">
            ENTER TIP
        </button>
      </div>
    </div>
  );
};

export const VibeCheck = ({ onFinish }) => {
  const colors = [{ name: "RED", hex: "text-red-500", val: "red" }, { name: "BLUE", hex: "text-blue-500", val: "blue" }, { name: "GREEN", hex: "text-green-500", val: "green" }, { name: "YELLOW", hex: "text-yellow-400", val: "yellow" }];
  const [round, setRound] = useState(1);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10.0); // Back to 10s
  const timerRef = useRef(null);

  const generateRound = useCallback(() => {
    const word = colors[getRandomInt(0, 3)]; 
    let ink = colors[getRandomInt(0, 3)]; 
    while (ink.val === word.val) ink = colors[getRandomInt(0, 3)];
    setCurrent({ word: word.name, ink: ink.hex, correctVal: ink.val }); 
    setOptions(shuffleArray([...colors]));
  }, []);

  useEffect(() => {
    generateRound();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          onFinish(0);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [onFinish, generateRound]);

  const handleChoice = (val) => {
    let newScore = score;
    if (val === current.correctVal) newScore += 1;
    setScore(newScore);

    if (round >= 5) {
      clearInterval(timerRef.current);
      // Scoring: Base score (max 10). 
      // Penalty: If took too long (timeLeft < 6s), deduct points.
      let finalScore = newScore * 2;
      if (timeLeft < 6.0) {
          // Deduct 1 point for every second below 6
          finalScore -= Math.ceil(6.0 - timeLeft);
      }
      onFinish(Math.max(0, finalScore));
    } else {
      setRound(r => r + 1);
      generateRound();
    }
  };

  if (!current) return null;

  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white">VIBE CHECK</h3>
        <span className="text-red-500 font-mono text-xl">{timeLeft.toFixed(1)}s</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">Click the COLOR, not the word!</p>
      <div className="bg-gray-900 p-8 rounded-xl mb-8 border border-gray-700">
        <h2 className={`text-6xl font-black ${current.ink}`}>{current.word}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((c) => (
          <button key={c.name} onClick={() => handleChoice(c.val)} className="bg-gray-800 hover:bg-gray-700 py-4 rounded-lg font-bold border border-gray-600">
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export const PizzaKing = ({ onFinish }) => {
  const ingredients = ['Pepperoni', 'Mushrooms', 'Olives', 'Onions', 'Bacon', 'Pineapple'];
  const [order, setOrder] = useState([]);
  const [phase, setPhase] = useState('MEMORIZE');
  const [selection, setSelection] = useState([]);
  useEffect(() => { setOrder(shuffleArray(ingredients).slice(0, 4)); setTimeout(() => setPhase('SELECT'), 2000); }, []);
  const toggleIng = (ing) => { if (selection.includes(ing)) setSelection(selection.filter(i => i !== ing)); else if (selection.length < 4) setSelection([...selection, ing]); };
  const submit = () => { const correct = selection.filter(i => order.includes(i)).length; const wrong = selection.filter(i => !order.includes(i)).length; let pts = (correct * 2.5) - (wrong * 2); onFinish(Math.max(0, Math.round(pts))); };
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-orange-500 mb-4">PIZZA KING</h3>
      {phase === 'MEMORIZE' ? <div className="animate-pulse"><p className="text-white mb-4">MEMORIZE!</p><div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl border-2 border-orange-500">{order.map(i => <span key={i} className="text-2xl font-bold">{i}</span>)}</div></div> : <div><p className="text-gray-400 mb-4">Recreate:</p><div className="grid grid-cols-2 gap-3 mb-6">{ingredients.map(ing => <button key={ing} onClick={() => toggleIng(ing)} className={`p-3 rounded-lg font-bold ${selection.includes(ing) ? 'bg-orange-500 text-black' : 'bg-gray-800'}`}>{ing}</button>)}</div><button onClick={submit} className="w-full bg-white text-black font-bold py-3 rounded-lg">SERVE IT</button></div>}
    </div>
  );
};

export const ShotPong = ({ onFinish }) => {
  const [barPos, setBarPos] = useState(0);
  const [running, setRunning] = useState(true);
  const [dir, setDir] = useState(1);
  useEffect(() => { let int; if (running) int = setInterval(() => { setBarPos(p => { if (p >= 100) { setDir(-1); return 99; } if (p <= 0) { setDir(1); return 1; } return p + (3 * dir); }); }, 16); return () => clearInterval(int); }, [running, dir]);
  const handleStop = () => { 
      setRunning(false); 
      const dist = Math.abs(barPos - 50); 
      // Widened win zone: < 8 is perfect (was 4), < 20 is good (was 15)
      onFinish(dist < 8 ? 10 : dist < 20 ? 8 : dist < 30 ? 5 : 0); 
  };
  return (
    <div className="w-full max-w-md p-4 text-center" onMouseDown={handleStop} onTouchStart={handleStop}>
      <h3 className="text-2xl font-bold text-green-400 mb-8">SHOT PONG</h3>
      <div className="relative w-16 h-80 bg-gray-800 mx-auto rounded-full border-4 border-gray-600 overflow-hidden">
        <div className="absolute top-[40%] bottom-[40%] w-full bg-green-500/50 border-y-2 border-green-500"></div>
        <div className="absolute left-1 right-1 h-12 w-12 bg-white rounded-full shadow-[0_0_15px_white]" style={{ top: `${barPos}%`, transform: 'translateY(-50%)' }}></div>
      </div>
      <p className="mt-8 text-xl font-bold animate-pulse">{running ? "TAP NOW!" : "STOPPED"}</p>
    </div>
  );
};

export const ToiletRush = ({ onFinish }) => {
  const [grid, setGrid] = useState([]);
  const [timeLeft, setTimeLeft] = useState(4.0);
  const [hidden, setHidden] = useState(false);
  const [targetIndex, setTargetIndex] = useState(-1);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState('INTRO'); // INTRO, PLAYING
  const [countdown, setCountdown] = useState(3);

  // Intro Countdown
  useEffect(() => {
    if (phase === 'INTRO') {
        const t = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    clearInterval(t);
                    setPhase('PLAYING');
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }
  }, [phase]);

  // Init Round
  useEffect(() => {
      if (isTransitioning || phase === 'INTRO') return;
      
      const size = 29; 
      const t = getRandomInt(0, size); 
      setTargetIndex(t);
      setGrid(Array(size + 1).fill('PERSON').map((_, i) => i === t ? 'TOILET' : 'PERSON')); 
      setHidden(false);
      setTimeLeft(4.0);
      
      const hideTimer = setTimeout(() => setHidden(true), 800);
      return () => clearTimeout(hideTimer);
  }, [round, isTransitioning, phase]);

  // Timer
  useEffect(() => { 
      if (isTransitioning || phase === 'INTRO') return;
      
      if (timeLeft > 0) { 
          const t = setTimeout(() => setTimeLeft(p => Math.max(0, p - 0.1)), 100); 
          return () => clearTimeout(t); 
      } else {
          // Time ran out for this round
          handleRoundComplete(0);
      }
  }, [timeLeft, isTransitioning, phase]);

  const handleRoundComplete = (roundScore) => {
      const newScore = score + roundScore;
      setScore(newScore);
      setIsTransitioning(true);

      if (round < 3) {
          setTimeout(() => {
              setRound(r => r + 1);
              setIsTransitioning(false);
          }, 1000);
      } else {
          // Final Score Calculation
          // Max possible: 30.
          // Normalize to 10.
          const final = Math.max(0, Math.ceil(newScore / 3));
          setTimeout(() => onFinish(final), 500);
      }
  };

  const handleClick = (i) => {
      if (isTransitioning || phase === 'INTRO') return;
      
      if (i === targetIndex) {
          // Correct
          // Score based on speed (Max 10)
          let s = 2;
          if (timeLeft > 3.0) s = 10;
          else if (timeLeft > 2.0) s = 8;
          else if (timeLeft > 1.0) s = 5;
          handleRoundComplete(s);
      } else {
          // Wrong: Penalty
          setScore(prev => prev - 3);
      }
  };

  return (
    <div className="w-full max-w-md p-4 text-center relative">
      {phase === 'INTRO' && (
        <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">TOILET RUSH</h3>
            <p className="text-white text-lg mb-2">Memorize the location!</p>
            <p className="text-gray-400 text-sm mb-8">Find the toilet before it vanishes.</p>
            <div className="text-6xl font-mono text-white font-bold">{countdown}</div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-blue-300">TOILET RUSH</h3>
        <div className="flex flex-col items-end">
            <span className="text-gray-400 text-xs">Round {round}/3</span>
            <span className="text-red-500 font-mono text-xl">{timeLeft.toFixed(1)}s</span>
        </div>
      </div>
      <p className="text-gray-400 text-xs mb-2">{hidden ? "WHERE WAS IT?" : "MEMORIZE!"}</p>
      <div className="grid grid-cols-6 gap-2 mt-4">
        {grid.map((item, i) => (
            <button 
                key={i} 
                onClick={() => handleClick(i)} 
                className="p-2 bg-gray-800 rounded flex items-center justify-center aspect-square active:bg-gray-700 transition-colors"
            >
                {!hidden && item === 'TOILET' ? <div className="text-white font-bold text-xs">WC</div> : <div className="w-4 h-4 rounded-full bg-gray-500"></div>}
            </button>
        ))}
      </div>
    </div>
  );
};

export const UberCode = ({ onFinish }) => {
  const [code] = useState(() => Array(4).fill(0).map(() => getRandomInt(0, 9)).join(''));
  const [input, setInput] = useState("");
  const [keys, setKeys] = useState([0,1,2,3,4,5,6,7,8,9]);
  const [timeLeft, setTimeLeft] = useState(8);

  useEffect(() => setKeys(shuffleArray(keys)), [input]);
  
  useEffect(() => {
      const t = setInterval(() => {
          setTimeLeft(prev => {
              if (prev <= 0) {
                  clearInterval(t);
                  onFinish(0);
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);
      return () => clearInterval(t);
  }, [onFinish]);

  const handlePress = (n) => { 
      const next = input + n; 
      setInput(next); 
      if (next.length === 4) {
          // Calculate Score based on correctness + time
          let correctDigits = 0;
          for (let i = 0; i < 4; i++) {
              if (next[i] === code[i]) correctDigits++;
          }

          // Base score: 2 points per correct digit (max 8)
          let score = correctDigits * 2;

          // Time bonus/penalty
          if (correctDigits === 4) {
              if (timeLeft > 5) {
                  score += 2; // Bonus for speed (Total 10)
              } else if (timeLeft < 4) {
                  // Penalty for slowness
                  // e.g. 3.9s -> penalty 1
                  // 0.1s -> penalty 4
                  const penalty = Math.ceil(4 - timeLeft);
                  score = Math.max(0, score - penalty);
              }
          }

          onFinish(score);
      }
  };
  
  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-purple-400">UBER CODE</h3>
        <span className="text-red-500 font-mono font-bold">{timeLeft}s</span>
      </div>
      <p className="text-gray-400 mb-4">Enter: <span className="text-3xl font-mono text-white font-bold">{code}</span></p>
      <div className="bg-gray-800 p-4 rounded mb-4 h-16 flex items-center justify-center"><span className="text-3xl font-mono text-neon-blue tracking-[1em]">{input.padEnd(4, '_')}</span></div>
      <div className="grid grid-cols-3 gap-3">{keys.map(k => <button key={k} onClick={() => handlePress(k)} className="bg-gray-700 h-16 rounded-lg text-2xl font-bold active:bg-purple-500">{k}</button>)}</div>
    </div>
  );
};

export const AlphabetSoup = ({ onFinish }) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(8); // Reduced from 12 to 8
  const reqRef = useRef();

  // Init Sequence
  useEffect(() => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      const seq = shuffleArray(alphabet).slice(0, 6); // 6 random letters
      setSequence(seq);
      
      const newItems = [];
      seq.forEach(char => {
        let valid = false;
        let x, y;
        let attempts = 0;
        while (!valid && attempts < 100) {
          x = getRandomInt(10, 80);
          y = getRandomInt(10, 80);
          valid = true;
          for (let item of newItems) {
            const dist = Math.sqrt(Math.pow(x - item.x, 2) + Math.pow(y - item.y, 2));
            if (dist < 15) valid = false;
          }
          attempts++;
        }
        const angle = Math.random() * Math.PI * 2;
        newItems.push({ char, x, y, vx: Math.cos(angle) * 0.2, vy: Math.sin(angle) * 0.2 });
      });
      setItems(newItems);
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time ran out: Score based on progress (0-5)
          onFinish(targetIndex);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetIndex, onFinish]);

  useEffect(() => {
    const animate = () => {
      setItems(prev => {
        // Update positions
        const nextItems = prev.map(item => {
            let { x, y, vx, vy, t = Math.random() * 100 } = item;
            
            // Erratic movement: Change velocity slightly based on time
            vx += Math.sin(t * 0.05) * 0.02;
            vy += Math.cos(t * 0.05) * 0.02;
            
            // Dampen/Limit velocity
            const speed = Math.sqrt(vx*vx + vy*vy);
            if (speed > 0.4) {
                vx = (vx / speed) * 0.4;
                vy = (vy / speed) * 0.4;
            }

            x += vx;
            y += vy;
            if (x <= 5 || x >= 85) vx *= -1;
            if (y <= 5 || y >= 85) vy *= -1;
            return { ...item, x, y, vx, vy, t: t + 1 };
        });

        // Simple Collision Resolution (Push apart)
        for (let i = 0; i < nextItems.length; i++) {
            for (let j = i + 1; j < nextItems.length; j++) {
                const a = nextItems[i];
                const b = nextItems[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const minDist = 12; 

                if (dist < minDist && dist > 0) {
                    // Push apart
                    const overlap = minDist - dist;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    
                    a.x += nx * overlap * 0.5;
                    a.y += ny * overlap * 0.5;
                    b.x -= nx * overlap * 0.5;
                    b.y -= ny * overlap * 0.5;

                    // Bounce velocities
                    const tempVx = a.vx;
                    const tempVy = a.vy;
                    a.vx = b.vx;
                    a.vy = b.vy;
                    b.vx = tempVx;
                    b.vy = tempVy;
                }
            }
        }
        return nextItems;
      });
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const handleTap = (char) => {
    if (char === sequence[targetIndex]) {
      const nextIdx = targetIndex + 1;
      if (nextIdx >= sequence.length) {
        // Win condition: 5 points base + time bonus (0-5)
        const bonus = Math.ceil(timeLeft / 1.6); // Adjusted bonus calc for 8s
        onFinish(Math.min(10, 5 + bonus));
      }
      else setTargetIndex(nextIdx);
    } else {
      onFinish(0); // Miss
    }
  };

  if (sequence.length === 0) return null;

  return (
    <div className="w-full h-80 relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
      <div className="absolute top-2 left-2 right-2 flex justify-between text-gray-400 z-20 pointer-events-none">
        <span>Find: <span className="text-neon-green font-bold text-xl">{sequence[targetIndex]}</span></span>
        <span className="text-red-500 font-mono">{timeLeft}s</span>
      </div>
      {items.map((l) => !sequence.slice(0, targetIndex).includes(l.char) && (
        <button
          key={l.char}
          onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleTap(l.char); }}
          className="absolute w-12 h-12 bg-gray-800 border border-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg active:scale-90 transition-transform"
          style={{ left: `${l.x}%`, top: `${l.y}%`, touchAction: 'none' }}
        >
          {l.char}
        </button>
      ))}
    </div>
  );
};

export const BigVsSmall = ({ onFinish }) => {
  const [round, setRound] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [current, setCurrent] = useState(null);

  // Generator
  const generateRound = () => {
    const n1 = getRandomInt(1, 99);
    let n2 = getRandomInt(1, 99);
    while(n1 === n2) n2 = getRandomInt(1, 99);

    // 50% chance left is visually big
    const leftIsBigFont = Math.random() > 0.5;
    
    return {
      left: { val: n1, size: leftIsBigFont ? 'text-8xl' : 'text-xs' },
      right: { val: n2, size: leftIsBigFont ? 'text-xs' : 'text-8xl' }
    };
  };

  useEffect(() => {
    setCurrent(generateRound());
    const t = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 0) {
                clearInterval(t);
                onFinish(0);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(t);
  }, [onFinish]);

  const handleChoice = (side) => {
    if (!current) return;

    const isLeftWinner = current.left.val > current.right.val;
    const pickedWinner = (side === 'left' && isLeftWinner) || (side === 'right' && !isLeftWinner);
    
    const newCorrect = pickedWinner ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (round < 10) {
      setRound(r => r + 1);
      setCurrent(generateRound());
    } else {
      // Calculate Score
      // Base logic: Must have high accuracy (at least 8/10)
      if (newCorrect < 8) {
        onFinish(Math.max(0, newCorrect - 3)); 
      } else {
        // Success state: Score based on remaining time
        // Stricter: > 10s = 10, > 7s = 9, > 5s = 8, else 5
        let finalScore = 5;
        if (timeLeft > 10) finalScore = 10;
        else if (timeLeft > 7) finalScore = 9;
        else if (timeLeft > 5) finalScore = 8;

        // Deduct 1 point per mistake if any (e.g. 9/10 correct)
        finalScore -= (10 - newCorrect);
        onFinish(Math.max(0, finalScore));
      }
    }
  };

  if (!current) return null;

  return (
    <div className="w-full max-w-md p-4 text-center select-none">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold">BIGGER <span className="text-neon-green">NUMBER</span>?</h3>
        <div className="flex flex-col items-end">
            <span className="text-gray-500 font-mono text-xs">{round}/10</span>
            <span className="text-red-500 font-mono font-bold">{timeLeft}s</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center h-48">
        <button 
            onClick={() => handleChoice('left')} 
            className={`w-1/2 ${current.left.size} font-black hover:bg-gray-800 rounded-xl p-4 transition-colors border border-transparent hover:border-gray-600 flex items-center justify-center h-full`}
        >
          {current.left.val}
        </button>
        
        <div className="w-px h-32 bg-gray-700 mx-2"></div>
        
        <button 
            onClick={() => handleChoice('right')} 
            className={`w-1/2 ${current.right.size} font-black hover:bg-gray-800 rounded-xl p-4 transition-colors border border-transparent hover:border-gray-600 flex items-center justify-center h-full`}
        >
          {current.right.val}
        </button>
      </div>
      <p className="mt-8 text-gray-500 italic text-sm">(Value, not size! Speed counts!)</p>
    </div>
  );
};

export const TheBouncer = ({ onFinish }) => {
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [current, setCurrent] = useState(null);
  const timerRef = useRef(null);
  const rules = [{ text: "NO HATS", check: p => !p.hasHat }, { text: "MUST HAVE GLASSES", check: p => p.hasGlasses }, { text: "NO BEARDS", check: p => !p.hasBeard }];
  useEffect(() => { setCurrent(gen()); timerRef.current = setInterval(() => setTimeLeft(p => { if (p <= 1) { clearInterval(timerRef.current); onFinish(streak); return 0; } return p - 1; }), 1000); return () => clearInterval(timerRef.current); }, []);
  const gen = () => ({ rule: rules[getRandomInt(0, 2)], person: { hasHat: Math.random() > 0.5, hasGlasses: Math.random() > 0.5, hasBeard: Math.random() > 0.5 } });
  const handleAction = (allow) => { if (allow === current.rule.check(current.person)) { const s = streak + 1; setStreak(s); if (s >= 10) { clearInterval(timerRef.current); onFinish(10); } else setCurrent(gen()); } else { clearInterval(timerRef.current); onFinish(streak); } };
  if (!current) return null;
  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between mb-4"><span className="text-gray-400">Streak: {streak}/10</span><span className="text-red-500">{timeLeft}s</span></div>
      <div className="bg-red-900/50 border border-red-500 p-2 mb-6 rounded text-red-200 font-bold uppercase">RULE: {current.rule.text}</div>
      <div className="w-32 h-32 bg-gray-700 mx-auto rounded-full mb-8 flex items-center justify-center border-4 border-gray-500">
        <div className="relative w-20 h-20 bg-orange-300 rounded-full">
            {current.person.hasHat && <div className="absolute -top-6 left-0 w-full h-8 bg-black rounded-t-lg"></div>}
            {current.person.hasGlasses && <div className="absolute top-6 w-full flex justify-center gap-2"><div className="w-7 h-3 bg-blue-600 rounded-full ring-2 ring-blue-400"></div><div className="w-7 h-3 bg-blue-600 rounded-full ring-2 ring-blue-400"></div></div>}
            {current.person.hasBeard && <div className="absolute bottom-0 left-0 w-full h-8 bg-black rounded-b-full"></div>}
        </div>
      </div>
      <div className="flex gap-4"><button onClick={() => handleAction(false)} className="flex-1 bg-red-600 py-4 rounded font-bold">DENY</button><button onClick={() => handleAction(true)} className="flex-1 bg-green-600 py-4 rounded font-bold">ALLOW</button></div>
    </div>
  );
};

export const GhostToast = ({ onFinish }) => {
  const [gap, setGap] = useState(150); 
  const [status, setStatus] = useState('PLAYING');
  const gapRef = useRef(150); const statusRef = useRef('PLAYING');
  useEffect(() => {
    const int = setInterval(() => {
      if (statusRef.current !== 'PLAYING') { clearInterval(int); return; }
      gapRef.current -= 0.7; setGap(gapRef.current);
      if (gapRef.current <= -5) { clearInterval(int); statusRef.current = 'LOST'; setStatus('LOST'); setTimeout(() => onFinish(0), 1000); }
    }, 10);
    return () => clearInterval(int);
  }, [onFinish]);
  const handleCheers = () => {
    if (statusRef.current !== 'PLAYING') return;
    if (gapRef.current <= 25 && gapRef.current >= -5) { statusRef.current = 'WON'; setStatus('WON'); setTimeout(() => onFinish(10), 1000); }
    else { statusRef.current = 'LOST'; setStatus('LOST'); setTimeout(() => onFinish(0), 1000); }
  };
  return (
    <div className="w-full max-w-md p-4 text-center select-none" onMouseDown={handleCheers} onTouchStart={handleCheers}>
      <h3 className="text-2xl font-bold text-pink-500 mb-12">GHOST TOAST</h3>
      <div className="flex justify-center h-32 relative">
        <Wine className={`w-16 h-16 absolute transition-transform ${status === 'LOST' ? 'text-red-600 rotate-45' : status === 'WON' ? 'text-green-400 -rotate-12' : 'text-purple-400'} transition-colors duration-100`} style={{ left: `calc(50% - ${gap}px - 32px)` }} />
        <Wine className={`w-16 h-16 absolute transition-transform scale-x-[-1] ${status === 'LOST' ? 'text-red-600 -rotate-45' : status === 'WON' ? 'text-green-400 rotate-12' : 'text-purple-400'} transition-colors duration-100`} style={{ left: `calc(50% + ${gap}px - 32px)` }} />
        {status === 'WON' && <div className="absolute top-0 text-green-400 font-bold text-2xl animate-bounce">CLINK!</div>}
      </div>
      <button className={`px-8 py-4 rounded-full font-bold text-xl mt-8 ${status === 'PLAYING' ? 'bg-pink-600 text-white animate-pulse' : 'opacity-50'}`}>CHEERS!</button>
    </div>
  );
};

export const InternalClock = ({ onFinish }) => {
  const [time, setTime] = useState(0); const [visible, setVisible] = useState(true); const [running, setRunning] = useState(true);
  useEffect(() => { const int = setInterval(() => { if(running) setTime(t => t + 0.1); }, 100); return () => clearInterval(int); }, [running]);
  useEffect(() => { if(time > 3.0) setVisible(false); }, [time]);
  const handleStop = () => { setRunning(false); const diff = Math.abs(time - 7.0); onFinish(diff < 0.5 ? 10 : diff < 1.0 ? 7 : diff < 2.0 ? 3 : 0); };
  return (
    <div className="w-full max-w-md p-4 text-center" onMouseDown={handleStop} onTouchStart={handleStop}>
      <h3 className="text-2xl font-bold text-gray-200 mb-4">INTERNAL CLOCK</h3>
      <p className="text-gray-400 mb-8">Stop at <span className="text-white font-bold">7.0s</span></p>
      <div className="text-8xl font-black font-mono mb-12 text-neon-green">{visible ? time.toFixed(1) : '?.?'}</div>
      <button className="w-full bg-gray-700 py-6 rounded-xl font-bold text-2xl">STOP</button>
    </div>
  );
};

export const TextYourEx = ({ onFinish }) => {
  const [pos, setPos] = useState({ top: 50, left: 50 });
  const [timeLeft, setTimeLeft] = useState(5);
  const [phase, setPhase] = useState('READY'); // READY, PLAYING
  const [introText, setIntroText] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (phase === 'READY') {
        const phrases = ["SHE'S NOT WORTH IT", "CONTROL YOURSELF", "STAY STRONG", "DON'T DO IT"];
        setIntroText(phrases[getRandomInt(0, phrases.length-1)]);
        
        const t = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    clearInterval(t);
                    setPhase('PLAYING');
                    return 0;
                }
                return c - 1;
            });
        }, 800);
        return () => clearInterval(t);
    }

    const int = setInterval(() => {
      if (timeLeft > 0) { 
          setPos({ top: getRandomInt(10, 80), left: getRandomInt(10, 80) }); 
          setTimeLeft(t => t - 1); 
      } else { 
          clearInterval(int); 
          onFinish(0); 
      }
    }, 450);
    return () => clearInterval(int);
  }, [timeLeft, onFinish, phase]);

  return (
    <div className="w-full max-w-md h-96 bg-gray-900 rounded-xl relative overflow-hidden p-4 border border-gray-700" onClick={() => { if(phase === 'PLAYING') onFinish(0); }}>
      <div className="text-center mb-8"><h3 className="text-2xl font-bold text-red-500 mb-2">RISKY TEXT</h3><p className="text-gray-400">Don't send it! Hit delete!</p></div>
      <div className="bg-gray-800 p-4 rounded-lg mb-4"><p className="text-white italic">"i miss u so much..."</p></div>
      <div className="absolute inset-0 flex items-center justify-center -z-0 opacity-20"><Send size={200} /></div>
      
      {phase === 'READY' ? (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 p-4 text-center">
              <h2 className="text-3xl font-black text-red-500 mb-4 animate-pulse">{introText}</h2>
              <div className="text-6xl font-mono text-white">{countdown}</div>
          </div>
      ) : (
          <button 
            onMouseDown={(e) => { e.stopPropagation(); onFinish(10); }} 
            onTouchStart={(e) => { e.stopPropagation(); onFinish(10); }} 
            className="absolute bg-green-500 text-black font-bold py-2 px-4 rounded-full shadow-lg z-10 transition-all duration-300" 
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          >
            DELETE ({timeLeft})
          </button>
      )}
    </div>
  );
};

export const TheLine = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('WAIT'); 
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(10);
  const [health, setHealth] = useState(100);
  const healthRef = useRef(100); // Use ref for frequent updates
  
  // Timer
  useEffect(() => {
    if (status === 'PLAY') {
      const t = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(t);
            // If time runs out before finishing, calculate score based on health
            setStatus('FAIL');
            onFinish(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [status, onFinish]);

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    cvs.width = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;
    
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Start Zone (Green)
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, cvs.height - 60, cvs.width, 60);
    
    // Finish Zone (Blue)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(0, 0, cvs.width, 60);

    // The Path
    ctx.strokeStyle = '#00ffff'; 
    ctx.lineWidth = 25; 
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cvs.width / 2, cvs.height - 30);
    
    // Make it squigglier with multiple curves
    const startX = cvs.width / 2;
    const startY = cvs.height - 30;
    const endX = cvs.width / 2;
    const endY = 30;
    
    // More complex path
    const cp1x = getRandomInt(20, cvs.width - 20);
    const cp1y = startY - (startY - endY) * 0.25;
    const cp2x = getRandomInt(20, cvs.width - 20);
    const cp2y = startY - (startY - endY) * 0.5;
    const cp3x = getRandomInt(20, cvs.width - 20);
    const cp3y = startY - (startY - endY) * 0.75;
    
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cvs.width/2, cvs.height/2);
    ctx.bezierCurveTo(cp3x, cp3y, endX, endY + 50, endX, endY);
    ctx.stroke();
  }, []);

  const checkCollision = (e) => {
    if (status === 'FAIL' || status === 'WIN') return;

    const cvs = canvasRef.current;
    const rect = cvs.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    setPlayerPos({ x, y });

    // 1. Check if inside Finish Zone (Top 60px)
    if (y < 60) {
        if (status === 'PLAY') {
            setStatus('WIN');
            // Score based on remaining health (max 10)
            onFinish(Math.ceil(healthRef.current / 10));
        }
        return;
    }

    // 2. Check if inside Start Zone (Bottom 60px)
    if (y > cvs.height - 60) {
        if (status === 'WAIT') setStatus('PLAY');
        return;
    }

    // 3. Check if inside Path (Color detection)
    if (status === 'PLAY') {
        const ctx = cvs.getContext('2d');
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        
        // If Green/Blue channel high (Cyan/Blue/Green), safe
        if (pixel[1] > 100 || pixel[2] > 100) {
            return; // Safe
        }
        
        // Else drain health
        healthRef.current -= 4; // Drain speed
        setHealth(healthRef.current);
        
        if (healthRef.current <= 0) {
            setStatus('FAIL');
            onFinish(0);
        }
    }
  };

  return (
    <div className="w-full max-w-md p-4 text-center select-none">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-neon-blue">THE LINE</h3>
        <div className="flex flex-col items-end">
            <span className="text-red-500 font-mono font-bold">{timeLeft}s</span>
            <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${Math.max(0, health)}%`, backgroundColor: health < 30 ? 'red' : 'lime' }}></div>
            </div>
        </div>
      </div>
      
      <div className={`relative w-full h-96 rounded-xl overflow-hidden border-2 border-gray-700 touch-none transition-colors duration-100 ${status === 'PLAY' && health < 90 ? 'border-red-500' : ''}`}>
        <canvas ref={canvasRef} className="w-full h-full block" onMouseMove={checkCollision} onTouchMove={checkCollision} onTouchStart={checkCollision} />
        <div 
            className={`absolute w-6 h-6 rounded-full border-2 border-white pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]`} 
            style={{ top: playerPos.y, left: playerPos.x, opacity: status === 'WAIT' ? 0 : 1, backgroundColor: health < 99 ? 'red' : 'white' }}
        ></div>
      </div>
    </div>
  );
};

export const ReversePsych = ({ onFinish }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5.0);
  const [instruction, setInstruction] = useState(Math.random() > 0.5 ? 'LEFT' : 'RIGHT');
  const [mode, setMode] = useState(Math.random() > 0.5 ? 'NORMAL' : 'OPPOSITE');

  // Round Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          // Time ran out for this round
          handleTurn(false); 
          return 5.0; 
        }
        return prev - 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [round, score]); // Dependency on round to reset/continue correctly

  const handleTurn = (isCorrect) => {
    // Score Logic: 1pt for correct answer + bonus for speed
    let points = 0;
    if (isCorrect) {
        points = 1; 
        if (timeLeft > 2.5) points += 1; // Speed bonus
    }
    
    const newScore = score + points;
    setScore(newScore);
    
    if (round < 5) {
      setRound(r => r + 1);
      setInstruction(Math.random() > 0.5 ? 'LEFT' : 'RIGHT');
      setMode(Math.random() > 0.5 ? 'NORMAL' : 'OPPOSITE');
      setTimeLeft(5.0);
    } else {
      onFinish(newScore);
    }
  };

  const handleClick = (dir) => {
    let correctDir;
    if (mode === 'NORMAL') {
        correctDir = instruction;
    } else {
        correctDir = instruction === 'LEFT' ? 'RIGHT' : 'LEFT';
    }
    handleTurn(dir === correctDir);
  };

  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-purple-400 mb-2">OPPOSITE DAY</h3>
      <div className="flex justify-between px-4 mb-4">
        <span className="text-gray-400 font-mono">Round {round}/5</span>
        <span className="text-red-500 font-mono">{timeLeft.toFixed(1)}s</span>
      </div>
      
      <div className="text-6xl font-black mb-8 flex flex-col items-center">
        <span className={`text-2xl font-bold mb-2 ${mode === 'NORMAL' ? 'text-green-500' : 'text-red-500'}`}>{mode}</span>
        <span className="text-white">TAP</span>
        <span className="text-neon-pink">{instruction}</span>
      </div>
      
      <div className="flex gap-4">
        <button onClick={() => handleClick('LEFT')} className="flex-1 bg-gray-800 p-8 rounded-xl hover:bg-gray-700 active:bg-purple-500 transition-colors">
            <ArrowLeft size={48} className="mx-auto"/>
        </button>
        <button onClick={() => handleClick('RIGHT')} className="flex-1 bg-gray-800 p-8 rounded-xl hover:bg-gray-700 active:bg-purple-500 transition-colors">
            <ArrowRight size={48} className="mx-auto"/>
        </button>
      </div>
    </div>
  );
};

export const SpinCycle = ({ onFinish }) => {
  const [angle, setAngle] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => { let int; if (running) int = setInterval(() => setAngle(a => (a + 8) % 360), 20); return () => clearInterval(int); }, [running]);
  
  const stop = () => { 
      setRunning(false); 
      const diff = Math.min(angle, 360 - angle); 
      
      // Gradient Scoring
      // Perfect: diff < 10 (Score 10)
      // Range: diff < 45 (Score scales from 9 down to 1)
      // Miss: diff >= 45 (Score 0)
      
      if (diff < 10) {
          onFinish(10);
      } else if (diff < 45) {
          // Linear score: 45 diff = 0 pts, 10 diff = 9 pts roughly
          // Formula: 9 * (1 - (diff - 10) / 35)
          const score = Math.ceil(9 * (1 - (diff - 10) / 35));
          onFinish(Math.max(1, score));
      } else {
          onFinish(0);
      }
  };

  return (
    <div className="w-full max-w-md p-4 text-center h-96 flex flex-col justify-center overflow-hidden">
      <h3 className="text-2xl font-bold text-white mb-8 z-10">STOP UPRIGHT</h3>
      {/* Removed transition-transform to prevent rewinding at 360->0 */}
      <div className="w-48 h-48 bg-gray-800 border-4 border-neon-green mx-auto rounded-xl flex items-center justify-center mb-8" style={{ transform: `rotate(${angle}deg)` }}><div className="text-4xl font-black text-white">TOP</div></div>
      <button onClick={stop} className="w-full bg-neon-green text-black font-bold py-4 rounded-xl z-10">STOP</button>
    </div>
  );
};

export const SurvivalMode = ({ onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const opts = [
        { label: "Check Ex's Insta", icon: <Search />, correct: false },
        { label: "CALL UBER", icon: <Car />, correct: true },
        { label: "Order Pizza", icon: <Pizza />, correct: false },
        { label: "Take Selfie", icon: <Smartphone />, correct: false }
    ];
    setOptions(shuffleArray(opts));

    const t = setInterval(() => setTimeLeft(p => { 
        if (p <= 1) { 
            clearInterval(t); 
            onFinish(0); 
            return 0; 
        } 
        return p - 1; 
    }), 1000); 
    return () => clearInterval(t); 
  }, [onFinish]);

  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center text-red-500 mb-4 font-mono font-bold border-b border-red-900 pb-2"><span>BATTERY: 1%</span><span>{timeLeft}s</span></div>
      <h3 className="text-xl text-white mb-8 font-bold">PHONE IS DYING. ACTION?</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => (
            <button 
                key={i} 
                onClick={() => onFinish(opt.correct ? 10 : 0)} 
                className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl flex flex-col items-center gap-2 transition-colors border border-gray-600"
            >
                {opt.icon} <span className="font-bold">{opt.label}</span>
            </button>
        ))}
      </div>
    </div>
  );
};

export const RedLight = ({ onFinish }) => {
  const [color, setColor] = useState('GREEN'); 
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10.0);
  const gameOverRef = useRef(false);
  const colorRef = useRef('GREEN'); // Sync ref for immediate checks

  useEffect(() => {
    gameOverRef.current = false; // Reset on mount
    
    // Global Timer
    const timer = setInterval(() => {
        if (gameOverRef.current) return;
        setTimeLeft(prev => {
            if (prev <= 0) {
                clearInterval(timer);
                gameOverRef.current = true;
                onFinish(0); // Time ran out
                return 0;
            }
            return prev - 0.1;
        });
    }, 100);

    const runCycle = () => {
        if (gameOverRef.current) return;
        
        // Green Phase
        setColor('GREEN');
        colorRef.current = 'GREEN';
        
        // Wait 0.8-1.5s (Faster)
        setTimeout(() => {
            if (gameOverRef.current) return;
            setColor('YELLOW'); 
            colorRef.current = 'YELLOW';
            
            // Wait 0.3-0.6s then STOP (Faster reaction needed)
            setTimeout(() => {
                if (gameOverRef.current) return;
                setColor('RED'); 
                colorRef.current = 'RED';
                
                // Wait 1-2s then Restart Loop
                setTimeout(() => {
                    if (gameOverRef.current) return;
                    runCycle(); 
                }, getRandomInt(1000, 2000));
                
            }, getRandomInt(300, 600));
            
        }, getRandomInt(800, 1500));
    };
    
    runCycle();
    return () => { 
        gameOverRef.current = true; 
        clearInterval(timer);
    };
  }, []);

  const handleTap = () => {
    if (gameOverRef.current) return;
    
    // Check ref for immediate state
    if (colorRef.current === 'RED') {
        gameOverRef.current = true;
        onFinish(0);
    } else {
        const newClicks = clicks + 1;
        setClicks(newClicks);
        if (newClicks >= 15) {
            gameOverRef.current = true;
            onFinish(10);
        }
    }
  };

  return (
    <div 
        className={`w-full h-80 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 relative ${color === 'GREEN' ? 'bg-green-500' : color === 'YELLOW' ? 'bg-yellow-400' : 'bg-red-600'}`} 
        onPointerDown={(e) => { e.preventDefault(); handleTap(); }} 
        style={{ touchAction: 'none' }}
    >
        <div className="absolute top-4 w-full flex flex-col items-center pointer-events-none">
            <span className="text-black/50 font-bold text-sm tracking-widest mb-1">RED LIGHT</span>
            <span className="text-white font-mono font-bold text-2xl bg-black/20 px-3 py-1 rounded">{timeLeft.toFixed(1)}s</span>
        </div>
        <div className="text-white font-black text-4xl mb-4 drop-shadow-md mt-8">{color === 'GREEN' ? 'TAP!!!' : color === 'YELLOW' ? 'STEADY...' : 'STOP!'}</div>
        <div className="text-2xl font-mono font-bold text-black bg-white/50 px-4 py-1 rounded">{clicks}/15</div>
    </div>
  );
};

export const BeerGoggles = ({ onFinish }) => {
  const [val, setVal] = useState(10);
  const [target, setTarget] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10.0);
  
  // Refs for animation loop
  const targetRef = useRef(10);
  const velocityRef = useRef(0.15);
  const stateRef = useRef('MOVING'); // 'MOVING' or 'HOLDING'
  const holdTimerRef = useRef(0);
  const reqRef = useRef();
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          onFinish(0); // Time ran out
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [onFinish]);

  useEffect(() => {
    // Initialize random start
    targetRef.current = getRandomInt(2, 18);
    setTarget(targetRef.current);

    const animate = () => {
      if (stateRef.current === 'HOLDING') {
        holdTimerRef.current--;
        if (holdTimerRef.current <= 0) {
          stateRef.current = 'MOVING';
          // Pick a new random velocity/direction (speed 0.02 to 0.08) - Even Slower
          velocityRef.current = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.06 + 0.02);
        }
      } else {
        // Moving
        let newTarget = targetRef.current + velocityRef.current;
        
        // Bounce off edges (keep within 2-18)
        if (newTarget <= 2 || newTarget >= 18) {
            velocityRef.current *= -1;
            newTarget = Math.max(2, Math.min(18, newTarget));
        }
        
        targetRef.current = newTarget;
        setTarget(newTarget);

        // Randomly decide to hold (2% chance per frame)
        if (Math.random() < 0.02) { 
            stateRef.current = 'HOLDING';
            holdTimerRef.current = getRandomInt(30, 90); // Hold for ~0.5-1.5s
        }
      }
      
      reqRef.current = requestAnimationFrame(animate);
    };
    
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);
  
  const handleSubmit = () => { 
      clearInterval(timerRef.current);
      const diff = Math.abs(val - target);
      
      let score = 0;
      // Base score on accuracy
      if (diff < 2.0) score = 10; 
      else if (diff < 4.0) score = 5; 
      
      // Time penalty: Deduct points if slower than 6s remaining (took > 4s)
      if (timeLeft < 6.0) {
          const penalty = Math.ceil(6.0 - timeLeft);
          score -= penalty;
      }

      onFinish(Math.max(0, score)); 
  };

  // Blur amount depends on distance from target
  const blurAmount = Math.abs(val - target);

  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-neon-blue">FIX YOUR VISION</h3>
        <span className="text-red-500 font-mono text-xl">{timeLeft.toFixed(1)}s</span>
      </div>
      <div className="bg-white text-black p-6 rounded-xl mb-8 h-32 flex items-center justify-center">
          <p className="font-serif text-2xl font-bold transition-all duration-75" style={{ filter: `blur(${blurAmount}px)` }}>
            Can you read this clearly?
          </p>
      </div>
      <input 
        type="range" min="0" max="20" step="0.1" 
        value={val} 
        onChange={(e) => setVal(Number(e.target.value))} 
        className="w-full h-12 accent-neon-blue cursor-pointer mb-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full" 
      />
      <button onClick={handleSubmit} className="bg-neon-blue text-black font-bold py-3 px-8 rounded-full text-xl">I CAN SEE!</button>
    </div>
  );
};

export const PerfectPour = ({ onFinish }) => {
  const [fill, setFill] = useState(0); 
  const [pouring, setPouring] = useState(false); 
  const [done, setDone] = useState(false);
  const [target, setTarget] = useState(80);

  // Randomize Target
  useEffect(() => {
    setTarget(getRandomInt(40, 85)); 
  }, []);

  useEffect(() => { 
    let int; 
    if (pouring && !done) {
        int = setInterval(() => { 
            setFill(f => { 
                if (f >= 100) { 
                    setDone(true); 
                    onFinish(0); // Overflow
                    return 100; 
                } 
                return f + 1.5; // Faster step
            }); 
        }, 20); // Slower interval (20ms) for smoother render
    }
    return () => clearInterval(int); 
  }, [pouring, done]);

  const handleStart = (e) => {
    if (e.cancelable) e.preventDefault(); // Prevent scrolling/selection
    if (done) return;
    setPouring(true);
  };

  const handleStop = (e) => {
    if (e.cancelable) e.preventDefault();
    if (!pouring || done) return;
    setPouring(false);
    setDone(true);
    
    const diff = Math.abs(fill - target);
    
    // Gradient Scoring
    if (diff <= 1) {
        onFinish(10);
    } else if (diff <= 15) {
        const score = Math.ceil(9 * (1 - (diff / 15)));
        onFinish(Math.max(1, score));
    } else {
        onFinish(0);
    }
  };

  return (
    <div className="w-full max-w-md p-4 text-center select-none">
      <h3 className="text-2xl font-bold text-yellow-500 mb-4">PERFECT POUR</h3>
      <div className="flex justify-center mb-8">
        <div className="w-24 h-64 border-4 border-white border-t-0 rounded-b-xl relative overflow-hidden bg-gray-800">
            {/* Target Line */}
            <div 
                className="absolute w-full border-t-4 border-dashed border-green-500 z-10" 
                style={{ bottom: `${target}%` }}
            ></div>
            
            {/* Liquid - Removed transition for instant updates */}
            <div 
                className="absolute bottom-0 w-full bg-yellow-500" 
                style={{ height: `${fill}%` }}
            ></div>
        </div>
      </div>
      <button 
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseUp={handleStop}
        onMouseLeave={handleStop}
        onTouchEnd={handleStop}
        onContextMenu={(e) => e.preventDefault()}
        disabled={done} 
        className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl active:scale-95 disabled:opacity-50 touch-none select-none"
        style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {done ? (fill >= 100 ? "SPILLED!" : "DONE") : "HOLD TO POUR"}
      </button>
    </div>
  );
};

export const Hydrate = ({ onFinish }) => {
  const [grid, setGrid] = useState([]); 
  const [timeLeft, setTimeLeft] = useState(4.0);
  
  useEffect(() => { 
      const size = 36; 
      const items = Array(size).fill('ALCOHOL'); 
      items[getRandomInt(0, size - 1)] = 'WATER'; 
      setGrid(items); 
  }, []);

  useEffect(() => { 
      if (timeLeft > 0) { 
          const t = setTimeout(() => setTimeLeft(p => Math.max(0, p - 0.1)), 100); 
          return () => clearTimeout(t); 
      } else onFinish(0); 
  }, [timeLeft, onFinish]);

  const handleClick = (isWater) => {
      if (isWater) {
          // Score based on remaining time. Max 10.
          // 4s total. If > 3s left -> 10. If > 2s -> 8. If > 1s -> 6. Else 4.
          let score = 4;
          if (timeLeft > 3.0) score = 10;
          else if (timeLeft > 2.0) score = 8;
          else if (timeLeft > 1.0) score = 6;
          onFinish(score);
      } else {
          // Penalty: Reduce time by 1s
          setTimeLeft(prev => Math.max(0, prev - 1.0));
      }
  };

  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-blue-400 mb-2">FIND WATER</h3>
      <span className="text-red-500 font-mono text-xl mb-4 block">{timeLeft.toFixed(1)}s</span>
      <div className="grid grid-cols-6 gap-2">
        {grid.map((item, i) => (
            <button key={i} onClick={() => handleClick(item === 'WATER')} className="text-2xl p-2 bg-gray-800 rounded hover:bg-gray-700 flex items-center justify-center aspect-square">
                {item === 'WATER' ? <Droplet className="text-white w-6 h-6" /> : (Math.random() > 0.5 ? <Beer className="text-white w-6 h-6" /> : <Wine className="text-white w-6 h-6" />)}
            </button>
        ))}
      </div>
    </div>
  );
};

export const CatchUber = ({ onFinish }) => {
  const [playerX, setPlayerX] = useState(50);
  const [items, setItems] = useState([]);
  const [running, setRunning] = useState(true);
  const playerRef = useRef(50);

  useEffect(() => { playerRef.current = playerX; }, [playerX]);

  useEffect(() => {
      let int;
      if (running) {
          int = setInterval(() => {
              // Spawn new items randomly (Increased chance: 5% per frame)
              if (Math.random() < 0.05) {
                  setItems(prev => [...prev, { 
                      id: Date.now(), 
                      x: getRandomInt(10, 90), 
                      y: -10, 
                      type: Math.random() > 0.3 ? 'FAKE' : 'UBER' // 30% chance for Uber
                  }]);
              }

              setItems(prev => {
                  const nextItems = [];
                  let finished = false;
                  
                  prev.forEach(item => {
                      const nextY = item.y + 2.5; // Increased Speed (was 1.5)
                      
                      // Check collision
                      if (nextY >= 85 && nextY <= 95 && Math.abs(item.x - playerRef.current) < 10) {
                          if (item.type === 'UBER') {
                              setRunning(false);
                              onFinish(10);
                              finished = true;
                          } else {
                              // Hit fake car -> Game Over
                              setRunning(false);
                              onFinish(0);
                              finished = true;
                          }
                      } else if (nextY < 100) {
                          nextItems.push({ ...item, y: nextY });
                      }
                  });
                  
                  if (finished) return [];
                  return nextItems;
              });
          }, 20);
      }
      return () => clearInterval(int);
  }, [running, onFinish]);

  return (
    <div className="w-full max-w-md p-4 text-center h-full flex flex-col justify-between">
      <h3 className="text-2xl font-bold text-white mb-4">CATCH THE <span className="text-yellow-400">TAXI</span></h3>
      
      <div className="w-full h-80 relative bg-gray-800 rounded-xl border border-gray-600 overflow-hidden mb-4">
         {items.map(item => (
             <div key={item.id} className="absolute text-4xl" style={{ top: `${item.y}%`, left: `${item.x}%`, transform: 'translate(-50%, 0)' }}>
                {item.type === 'UBER' ? '🚖' : '🚔'}
             </div>
         ))}
         
         <div className="absolute bottom-0 text-4xl" style={{ left: `${playerX}%`, transform: 'translate(-50%, 0)' }}>
            🧍
         </div>
      </div>
      
      <input 
        type="range" min="0" max="100" value={playerX} 
        onChange={(e) => setPlayerX(Number(e.target.value))} 
        className="w-full h-16 accent-neon-green cursor-pointer [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
      />
    </div>
  );
};

export const TheStumble = ({ onFinish }) => {
  const [steps, setSteps] = useState(0);
  const [targetFoot, setTargetFoot] = useState(Math.random() > 0.5 ? 'LEFT' : 'RIGHT');
  const [status, setStatus] = useState('PLAYING'); // PLAYING, TRIPPED, WON
  const [timeLeft, setTimeLeft] = useState(100); // Decay bar
  const [shake, setShake] = useState(false);
  const [failReason, setFailReason] = useState('TRIPPED'); // TRIPPED or PASSED OUT
  const decayRef = useRef(null);

  const TARGET_STEPS = 20;

  // Decay Timer
  useEffect(() => {
    decayRef.current = setInterval(() => {
      if (status !== 'PLAYING') return;
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(decayRef.current);
          setStatus('TRIPPED');
          setFailReason('PASSED OUT'); // New fail reason
          setTimeout(() => onFinish(0), 1500); // Delay finish to show message
          return 0;
        }
        return prev - 1.6; // Increased decay rate (was 1.2)
      });
    }, 50);
    return () => clearInterval(decayRef.current);
  }, [status, onFinish]);

  const handleStep = (foot) => {
    if (status !== 'PLAYING') return;

    if (foot !== targetFoot) {
      // Tripped (Wrong foot)
      setStatus('TRIPPED');
      setTimeout(() => {
          onFinish(Math.min(4, Math.floor((steps / TARGET_STEPS) * 10))); 
      }, 1500);
    } else {
      // Successful step
      const newSteps = steps + 1;
      setSteps(newSteps);
      
      // Visual Feedback
      setShake(true);
      setTimeout(() => setShake(false), 100);

      // High Entropy: Randomize next step
      setTargetFoot(Math.random() > 0.5 ? 'LEFT' : 'RIGHT');
      
      setTimeLeft(Math.min(100, timeLeft + 10)); // Refill balance slightly less

      if (newSteps >= TARGET_STEPS) {
        setStatus('WON');
        onFinish(10);
      }
    }
  };

  return (
    <div className={`w-full max-w-md p-4 text-center select-none ${shake ? 'translate-x-1 translate-y-1' : ''}`}>
      <h3 className="text-2xl font-bold text-neon-pink mb-2">THE STUMBLE</h3>
      
      {/* Balance Bar */}
      <div className="w-full bg-gray-800 h-4 rounded-full mb-4 overflow-hidden border border-gray-600">
        <div 
            className={`h-full transition-all duration-100 ${timeLeft < 30 ? 'bg-red-500' : 'bg-green-500'}`} 
            style={{ width: `${timeLeft}%` }}
        ></div>
      </div>

      {/* Progress Visual */}
      <div className="w-full flex justify-between items-end h-12 mb-4 px-4 border-b border-gray-700 pb-2">
          <div className="text-2xl">🏠</div>
          <div className="flex-1 mx-4 relative h-2 bg-gray-800 rounded-full self-center">
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-neon-pink rounded-full transition-all duration-300"
                style={{ left: `${(steps / TARGET_STEPS) * 100}%` }}
              ></div>
          </div>
          <div className="text-2xl">🏁</div>
      </div>
      
      <div className="h-40 flex flex-col items-center justify-center mb-4">
        {status === 'TRIPPED' ? (
            <div className="flex flex-col items-center">
                <div className="text-6xl animate-bounce mb-2">💥😵💫</div>
                <div className="text-red-500 font-bold text-xl">{failReason === 'PASSED OUT' ? 'PASSED OUT!' : 'YOU TRIPPED!'}</div>
            </div>
        ) : status === 'WON' ? (
            <div className="text-6xl animate-bounce">🏃💨🏁</div>
        ) : (
            <>
                <div className="text-gray-500 text-sm mb-2 uppercase tracking-widest">STEP WITH:</div>
                <div className={`text-8xl font-black transition-all duration-100 ${targetFoot === 'LEFT' ? 'text-neon-blue -translate-x-8' : 'text-neon-pink translate-x-8'}`}>
                    {targetFoot === 'LEFT' ? 'L' : 'R'}
                </div>
                <div className="text-4xl mt-2">
                    {targetFoot === 'LEFT' ? '🦶' : ' '}
                    {targetFoot === 'RIGHT' ? '🦶' : ' '}
                </div>
            </>
        )}
      </div>

      <div className="flex gap-4">
        <button 
            onPointerDown={(e) => { e.preventDefault(); handleStep('LEFT'); }}
            className="flex-1 bg-gray-800 active:bg-neon-blue h-32 rounded-xl text-4xl font-black border-b-4 border-gray-600 active:border-b-0 active:translate-y-1 transition-all"
            style={{ touchAction: 'none' }}
        >
            L
        </button>
        <button 
            onPointerDown={(e) => { e.preventDefault(); handleStep('RIGHT'); }}
            className="flex-1 bg-gray-800 active:bg-neon-pink h-32 rounded-xl text-4xl font-black border-b-4 border-gray-600 active:border-b-0 active:translate-y-1 transition-all"
            style={{ touchAction: 'none' }}
        >
            R
        </button>
      </div>
    </div>
  );
};

export const ChargeIt = ({ onFinish }) => {
  const [portX, setPortX] = useState(50);
  const [plugX, setPlugX] = useState(50);
  const [plugY, setPlugY] = useState(10); // 10% from top
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState('INSTRUCTION'); // INSTRUCTION, AIMING, MOVING, HIT, MISS
  const [countdown, setCountdown] = useState(3);
  
  const portRef = useRef(50);
  const dirRef = useRef(1);
  const reqRef = useRef(null);

  // Instruction Phase
  useEffect(() => {
      if (status === 'INSTRUCTION') {
          const t = setInterval(() => {
              setCountdown(c => {
                  if (c <= 1) {
                      clearInterval(t);
                      setStatus('AIMING');
                      return 0;
                  }
                  return c - 1;
              });
          }, 1000);
          return () => clearInterval(t);
      }
  }, [status]);

  // Port Jitter Animation
  useEffect(() => {
    const animate = () => {
      if (status === 'AIMING') {
        // Smooth wandering movement (Inertia-based)
        // Randomly adjust velocity (acceleration)
        dirRef.current += (Math.random() - 0.5) * 0.2;
        
        // Cap max speed to keep it trackable but tricky
        const maxSpeed = 1.8;
        dirRef.current = Math.max(-maxSpeed, Math.min(maxSpeed, dirRef.current));
        
        let next = portRef.current + dirRef.current;
        
        // Soft boundaries (push back gently near edges)
        if (next > 85) dirRef.current -= 0.1;
        if (next < 15) dirRef.current += 0.1;
        
        // Hard bounce off walls
        if (next > 90) {
            next = 90;
            dirRef.current *= -0.6; // Bounce with energy loss
        } else if (next < 10) {
            next = 10;
            dirRef.current *= -0.6;
        }
        
        portRef.current = next;
        setPortX(next);
      }
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [status]);

  const handleRelease = () => {
    if (status !== 'AIMING') return;
    setStatus('MOVING');
    
    // Animate plug dropping
    let y = 10;
    const dropInterval = setInterval(() => {
        y += 5;
        setPlugY(y);
        if (y >= 80) { // Hit bottom area
            clearInterval(dropInterval);
            checkHit();
        }
    }, 16);
  };

  const checkHit = () => {
    const diff = Math.abs(plugX - portRef.current);
    if (diff < 5) { // Hit!
        setStatus('HIT');
        // Score based on attempts
        const score = attempts === 0 ? 10 : attempts === 1 ? 7 : 4;
        setTimeout(() => onFinish(score), 1000);
    } else { // Miss
        setStatus('MISS');
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
            setTimeout(() => onFinish(0), 1000);
        } else {
            // Reset for next attempt
            setTimeout(() => {
                setPlugY(10);
                setStatus('AIMING');
            }, 1000);
        }
    }
  };

  return (
    <div className="w-full max-w-md p-4 text-center flex flex-col justify-between select-none relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-green-400">CHARGE IT!</h3>
        <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-3 h-8 rounded ${i < (3 - attempts) ? 'bg-green-500' : 'bg-gray-700'}`}></div>
            ))}
        </div>
      </div>

      <div className="relative h-80 w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-4">
        {/* Instruction Overlay */}
        {status === 'INSTRUCTION' && (
            <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
                <p className="text-white text-xl mb-4 font-bold">PLUG IT IN!</p>
                <p className="text-gray-400 text-sm mb-8">Drag slider to aim. Release to drop.</p>
                <div className="text-6xl font-mono text-green-500 font-bold">{countdown}</div>
            </div>
        )}

        {/* Plug */}
        <div 
            className="absolute w-8 h-16 bg-white rounded-b-lg left-0 transition-none z-20"
            style={{ left: `calc(${plugX}% - 16px)`, top: `${plugY}%` }}
        >
            <div className="w-full h-4 bg-gray-400 border-b border-gray-500"></div>
            <div className="mx-auto w-4 h-full bg-black/20"></div>
        </div>

        {/* Sparks on Miss */}
        {status === 'MISS' && (
            <div className="absolute bottom-10 left-0 w-full text-center text-4xl animate-ping" style={{ left: `calc(${plugX}% - 20px)` }}>💥</div>
        )}
        
        {/* Success */}
        {status === 'HIT' && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 z-30">
                <Zap size={64} className="text-green-400 animate-bounce" />
            </div>
        )}

        {/* Phone Port */}
        <div 
            className="absolute bottom-0 w-24 h-12 bg-gray-800 rounded-t-xl border-t-2 border-x-2 border-gray-600 flex justify-center items-start pt-2 transition-none"
            style={{ left: `calc(${portX}% - 48px)` }}
        >
            <div className="w-10 h-3 bg-black rounded-full border border-gray-700"></div>
        </div>
      </div>

      {status === 'AIMING' && (
          <input 
            type="range" min="0" max="100" value={plugX} 
            onChange={(e) => setPlugX(Number(e.target.value))} 
            onTouchEnd={handleRelease}
            onMouseUp={handleRelease}
            className="w-full h-16 accent-white cursor-pointer [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />
      )}
      {status !== 'AIMING' && <div className="h-16 flex items-center justify-center text-gray-500 font-mono">...</div>}
    </div>
  );
};

export const PatternLock = ({ onFinish }) => {
  const [pattern, setPattern] = useState([]);
  const [targetPattern, setTargetPattern] = useState([]);
  const [status, setStatus] = useState('MEMORIZE'); // MEMORIZE, RECALL, SUCCESS, FAIL
  const [timeLeft, setTimeLeft] = useState(3); // Reduced from 5
  const [recallTime, setRecallTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentPath, setCurrentPath] = useState(null); 
  
  // Generate random pattern
  useEffect(() => {
    const generatePattern = () => {
      const points = [];
      let current = Math.floor(Math.random() * 16); // 4x4 grid
      points.push(current);
      
      for(let i=0; i<7; i++) { // Length 8 (Longer path)
        const cx = current % 4;
        const cy = Math.floor(current / 4);
        
        // Find valid neighbors (strict adjacency, no jumps)
        const possible = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = cx + dx;
                const ny = cy + dy;
                if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
                    const next = ny * 4 + nx;
                    if (!points.includes(next)) {
                        possible.push(next);
                    }
                }
            }
        }
        
        if (possible.length === 0) break;
        current = possible[Math.floor(Math.random() * possible.length)];
        points.push(current);
      }
      setTargetPattern(points);
    };
    generatePattern();
  }, []);

  // Timer for Memorize phase
  useEffect(() => {
    if (status === 'MEMORIZE') {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            setStatus('RECALL');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  // Timer for Recall phase (for scoring)
  useEffect(() => {
      if (status === 'RECALL') {
          const t = setInterval(() => setRecallTime(prev => prev + 0.1), 100);
          return () => clearInterval(t);
      }
  }, [status]);

  const handleTouchStart = (index) => {
    if (status !== 'RECALL') return;
    setPattern([index]);
    setCurrentPath({ start: index, end: index }); 
  };

  const handleTouchMove = (e) => {
    if (status !== 'RECALL' || pattern.length === 0) return;
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.dataset.index) {
        const index = parseInt(element.dataset.index);
        if (!pattern.includes(index)) {
            const last = pattern[pattern.length - 1];
            
            // Strict adjacency check
            const lx = last % 4;
            const ly = Math.floor(last / 4);
            const cx = index % 4;
            const cy = Math.floor(index / 4);
            
            if (Math.abs(lx - cx) <= 1 && Math.abs(ly - cy) <= 1) {
                 setPattern([...pattern, index]);
            }
        }
    }
  };

  const handleTouchEnd = () => {
    if (status !== 'RECALL') return;
    
    if (pattern.length > 0) {
        const isCorrect = pattern.length === targetPattern.length && pattern.every((val, index) => val === targetPattern[index]);
        if (isCorrect) {
            setStatus('SUCCESS');
            // Score: Base 10. Minus 2 per attempt. Minus 1 per 2 seconds.
            let score = 10 - (attempts * 2) - Math.floor(recallTime / 2);
            setTimeout(() => onFinish(Math.max(1, score)), 1000);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 3) {
                setStatus('FAIL');
                setTimeout(() => onFinish(0), 1000);
            } else {
                setPattern([]);
            }
        }
    }
  };

  // Mouse fallback
  const handleMouseDown = (index) => handleTouchStart(index);
  const handleMouseEnter = (index) => {
      if (status === 'RECALL' && pattern.length > 0 && !pattern.includes(index)) {
           // Add adjacency check here too for mouse
            const last = pattern[pattern.length - 1];
            const lx = last % 4;
            const ly = Math.floor(last / 4);
            const cx = index % 4;
            const cy = Math.floor(index / 4);
            
            if (Math.abs(lx - cx) <= 1 && Math.abs(ly - cy) <= 1) {
                 setPattern(prev => [...prev, index]);
            }
      }
  };
  const handleMouseUp = handleTouchEnd;

  const renderConnection = (p1, p2, isTarget) => {
    const x1 = (p1 % 4) * 25 + 12.5;
    const y1 = Math.floor(p1 / 4) * 25 + 12.5;
    const x2 = (p2 % 4) * 25 + 12.5;
    const y2 = Math.floor(p2 / 4) * 25 + 12.5;
    
    return (
      <line 
        key={`${p1}-${p2}`}
        x1={`${x1}%`} y1={`${y1}%`} 
        x2={`${x2}%`} y2={`${y2}%`} 
        stroke={isTarget ? "rgba(52, 211, 153, 0.5)" : "white"} 
        strokeWidth="4"
      />
    );
  };

  return (
    <div className="w-full max-w-md p-4 text-center select-none"
         onTouchMove={handleTouchMove}
         onMouseUp={handleMouseUp}
         onTouchEnd={handleTouchEnd}
         style={{ touchAction: 'none' }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-purple-400">
            {status === 'MEMORIZE' ? 'MEMORIZE!' : status === 'RECALL' ? 'DRAW IT!' : status}
        </h3>
        <div className="flex flex-col items-end">
            {status === 'RECALL' && <span className="text-red-500 font-mono text-sm">Attempts: {attempts}/3</span>}
            {status === 'MEMORIZE' && <span className="text-white font-bold text-xl">{timeLeft}s</span>}
        </div>
      </div>

      <div className="relative w-64 h-64 mx-auto bg-gray-900 rounded-xl p-4">
        <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none z-10">
          {status === 'MEMORIZE' && targetPattern.map((p, i) => {
            if (i === 0) return null;
            return renderConnection(targetPattern[i-1], p, true);
          })}
          {pattern.map((p, i) => {
            if (i === 0) return null;
            return renderConnection(pattern[i-1], p, false);
          })}
        </svg>

        <div className="grid grid-cols-4 h-full">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i}
              data-index={i}
              onMouseDown={() => handleMouseDown(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onTouchStart={() => handleTouchStart(i)}
              className={`
                relative z-20 rounded-full w-3 h-3 m-auto transition-all duration-200
                ${status === 'MEMORIZE' && targetPattern.includes(i) ? (targetPattern[0] === i ? 'bg-white scale-150 ring-4 ring-green-400 z-30' : 'bg-green-400 scale-150 shadow-[0_0_10px_rgba(52,211,153,0.8)]') : ''}
                ${pattern.includes(i) ? 'bg-white scale-125' : 'bg-gray-600'}
                ${status === 'FAIL' && pattern.includes(i) ? 'bg-red-500' : ''}
                ${status === 'SUCCESS' && pattern.includes(i) ? 'bg-green-500' : ''}
              `}
            >
                <div className="absolute inset-[-10px] z-10" data-index={i}></div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="mt-4 text-gray-400 text-sm">
        {status === 'MEMORIZE' ? 'Watch the pattern...' : 'Connect the dots!'}
      </p>
    </div>
  );
};

export const TowerOfPizza = ({ onFinish }) => {
  const [stack, setStack] = useState([]); // Array of x offsets
  const [boxX, setBoxX] = useState(50);
  const [status, setStatus] = useState('PLAYING'); // PLAYING, DROPPING, FALLEN, WON
  const [fallingBox, setFallingBox] = useState(null); // { x, y }
  
  const speedRef = useRef(0.8); // Increased initial speed (was 0.5)
  const directionRef = useRef(1); 
  const reqRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (status === 'PLAYING') {
        setBoxX(prev => {
            let next = prev + (speedRef.current * directionRef.current);
            if (next >= 90 || next <= 10) {
                directionRef.current *= -1; 
                next = Math.max(10, Math.min(90, next));
            }
            return next;
        });
      }
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [status]); 

  const dropBox = () => {
    if (status !== 'PLAYING') return;
    
    setStatus('DROPPING');
    const startX = boxX;
    
    let topY = 0;
    const targetTopY = 320 - ((stack.length + 1) * 16); 

    const animateDrop = () => {
        if (topY < targetTopY) {
            topY += 20; // Faster drop speed (was 15)
            setFallingBox({ x: startX, y: topY });
            dropRef.current = requestAnimationFrame(animateDrop);
        } else {
            setFallingBox(null);
            const newStack = [...stack, startX];
            setStack(newStack);
            
            if (newStack.length > 1) {
                const prev = newStack[newStack.length - 2];
                const diff = Math.abs(startX - prev);
                
                // Stricter tolerance: 12 (was 20)
                if (diff > 12) { 
                    setStatus('FALLEN');
                    setTimeout(() => onFinish(Math.min(4, newStack.length - 1)), 1000);
                    return;
                }
                
                // Alignment Penalty: If not perfectly aligned (> 5px off), reduce score potential
                // We can track this via a ref or just deduct at the end.
                // For now, let's just be stricter on the "WON" condition or add a visual "WOBBLE"
                if (diff > 5) {
                    // Maybe add a wobble effect or sound?
                    // For now, we'll just accept it but it's "wobbly"
                }
            }

            // Reduced target stack: 5 (was 10)
            if (newStack.length >= 5) {
                // Calculate final score based on alignment
                let totalError = 0;
                for(let i=1; i<newStack.length; i++) {
                    totalError += Math.abs(newStack[i] - newStack[i-1]);
                }
                // Perfect score 10. Deduct 1 point for every 5 units of total error.
                const penalty = Math.floor(totalError / 5);
                const finalScore = Math.max(1, 10 - penalty); 
                
                setStatus('WON');
                setTimeout(() => onFinish(finalScore), 1000);
            } else {
                speedRef.current += 0.15; // Faster acceleration
                setStatus('PLAYING');
            }
        }
    };
    dropRef.current = requestAnimationFrame(animateDrop);
  };

  useEffect(() => {
      return () => cancelAnimationFrame(dropRef.current);
  }, []);

  return (
    <div className="w-full max-w-md p-4 text-center flex flex-col justify-between select-none" onPointerDown={dropBox}>
      <h3 className="text-2xl font-bold text-orange-500 mb-2">TOWER OF PIZZA</h3>
      <p className="text-gray-400 mb-4">{stack.length}/5 Stacked</p>
      
      <div className="relative h-80 w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
        
        {status !== 'DROPPING' && (
            <div 
                className="absolute top-0 w-12 h-4 bg-orange-600 border border-orange-800 rounded-sm shadow-md"
                style={{ left: `calc(${boxX}% - 24px)` }}
            >
                <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-gray-500 -translate-x-1/2"></div>
            </div>
        )}

        {fallingBox && (
            <div 
                className="absolute w-12 h-4 bg-orange-600 border border-orange-800 rounded-sm shadow-sm"
                style={{ 
                    left: `calc(${fallingBox.x}% - 24px)`, 
                    top: `${fallingBox.y}px`
                }}
            ></div>
        )}

        <div className="absolute bottom-0 w-full h-full pointer-events-none">
            {stack.map((x, i) => (
                <div 
                    key={i} 
                    className="absolute w-12 h-4 bg-orange-600 border border-orange-800 rounded-sm shadow-sm transition-all"
                    style={{ 
                        left: `calc(${x}% - 24px)`, 
                        bottom: `${i * 16}px`,
                        transform: status === 'FALLEN' ? `rotate(${Math.random() * 60 - 30}deg)` : 'none',
                        opacity: status === 'FALLEN' ? 0.8 : 1
                    }}
                ></div>
            ))}
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-500"></div>
      </div>
      
      <p className="text-gray-500 text-sm animate-pulse">TAP TO DROP</p>
    </div>
  );
};

export const YoureSlurring = ({ onFinish }) => {
  const WORDS = [
      { word: "BURRITO", hint: "Late Night Food" },
      { word: "TEQUILA", hint: "One Shot..." },
      { word: "KEBAB", hint: "Street Meat" },
      { word: "UBER", hint: "Get Home Safe" },
      { word: "WATER", hint: "Hydrate!" },
      { word: "PIZZA", hint: "Cheesy Slice" },
      { word: "TOILET", hint: "Emergency!" }
  ];
  const [target, setTarget] = useState({ word: "", hint: "" });
  const [letters, setLetters] = useState([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const reqRef = useRef(null);

  useEffect(() => {
    const w = WORDS[getRandomInt(0, WORDS.length - 1)];
    setTarget(w);
    
    // Init floating letters
    const chars = w.word.split('').map((c, i) => ({
        id: i,
        char: c,
        x: getRandomInt(10, 90),
        y: getRandomInt(10, 90),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        visible: true
    }));
    setLetters(chars);

    // Timer
    const t = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 0) {
                clearInterval(t);
                onFinish(0);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Animation Loop
  useEffect(() => {
    const animate = () => {
      setLetters(prev => {
          const nextItems = prev.map(l => {
              let { x, y, vx, vy } = l;
              x += vx; y += vy;
              if (x <= 5 || x >= 95) vx *= -1;
              if (y <= 5 || y >= 95) vy *= -1;
              return { ...l, x, y, vx, vy };
          });

          // Collision Logic (Anti-overlap)
          for (let i = 0; i < nextItems.length; i++) {
            for (let j = i + 1; j < nextItems.length; j++) {
                const a = nextItems[i];
                const b = nextItems[j];
                if (!a.visible || !b.visible) continue;

                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const minDist = 12; 

                if (dist < minDist && dist > 0) {
                    const overlap = minDist - dist;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    
                    a.x += nx * overlap * 0.5;
                    a.y += ny * overlap * 0.5;
                    b.x -= nx * overlap * 0.5;
                    b.y -= ny * overlap * 0.5;

                    const tempVx = a.vx;
                    const tempVy = a.vy;
                    a.vx = b.vx;
                    a.vy = b.vy;
                    b.vx = tempVx;
                    b.vy = tempVy;
                }
            }
          }
          return nextItems;
      });
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const handleTap = (l) => {
    if (!l.visible) return;
    
    const expectedChar = target.word[input.length];
    if (l.char === expectedChar) {
        // Correct
        const newInput = input + l.char;
        setInput(newInput);
        setLetters(prev => prev.map(item => item.id === l.id ? { ...item, visible: false } : item));
        
        if (newInput === target.word) {
            // Win
            // Score: (TimeLeft / 15) * 10 - (Mistakes * 2)
            const timeScore = (timeLeft / 15) * 10;
            const penalty = mistakes * 2;
            onFinish(Math.max(0, Math.ceil(timeScore - penalty)));
        }
    } else {
        // Wrong
        setMistakes(m => m + 1);
        // Shake effect?
    }
  };

  const handleHint = () => {
      if (!showHint) {
          setShowHint(true);
          setTimeLeft(t => Math.max(0, t - 3)); // Penalty
      }
  };

  return (
    <div className="w-full max-w-md p-4 text-center flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-purple-300">UNSCRAMBLE</h3>
        <span className="text-red-500 font-mono font-bold">{timeLeft}s</span>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 italic flex items-center justify-center">
          Hint: {target.hint}
          {!showHint && <button onClick={handleHint} className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded text-white hover:bg-gray-600">Show 1st Letter (-3s)</button>}
          {showHint && <span className="ml-2 text-neon-pink font-bold">Starts with {target.word[0]}</span>}
      </p>
      
      <div className="bg-gray-800 p-4 rounded-xl mb-4 min-h-[60px] flex items-center justify-center border border-gray-600">
        <span className="text-3xl font-mono tracking-widest text-white">{input}</span>
        <span className="text-3xl font-mono tracking-widest text-gray-600">{target.word.slice(input.length).replace(/./g, '_')}</span>
      </div>

      <div className="relative h-64 w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        {letters.map(l => l.visible && (
            <button
                key={l.id}
                onPointerDown={(e) => { e.preventDefault(); handleTap(l); }}
                className="absolute w-12 h-12 bg-gray-700 border border-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg active:scale-90 transition-transform"
                style={{ left: `${l.x}%`, top: `${l.y}%`, transform: 'translate(-50%, -50%)', touchAction: 'none' }}
            >
                {l.char}
            </button>
        ))}
      </div>
    </div>
  );
};