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
  const [target, setTarget] = useState(50);
  const [score, setScore] = useState(100);
  const [timeLeft, setTimeLeft] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        const move = getRandomInt(-20, 20);
        setTarget(prev => Math.min(90, Math.max(10, prev + move)));
        setTimeLeft(prev => prev - 1);
        if (Math.abs(position - target) > 15) setScore(prev => Math.max(0, prev - 8));
      } else { clearInterval(interval); onFinish(Math.ceil(score / 10)); }
    }, 800);
    return () => clearInterval(interval);
  }, [timeLeft, position, target, onFinish]);
  return (
    <div className="flex flex-col items-center w-full max-w-md p-4">
      <h3 className="text-2xl font-bold text-neon-pink mb-4">HOLD MY BEER</h3>
      <div className="relative w-full h-16 bg-gray-800 rounded-full mb-8 border-2 border-gray-600 overflow-hidden">
        <div className="absolute top-0 h-full w-20 bg-yellow-500/30 border-x-2 border-yellow-500 flex items-center justify-center transition-all duration-700" style={{ left: `calc(${target}% - 40px)` }}><Beer className="text-yellow-400" /></div>
        <div className="absolute top-0 h-full w-2 bg-neon-pink transition-all duration-75 ease-linear" style={{ left: `${position}%` }} />
      </div>
      <input type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} className="w-full h-12 accent-neon-pink cursor-pointer" />
      <div className="mt-4 text-xl font-mono text-white">{timeLeft}s</div>
    </div>
  );
};

export const DrunkText = ({ onFinish }) => {
  const phrases = ["i literally love you so much rn", "yo can we pls go get mcdonalds", "wait where are you guys", "we should start a podcast"];
  const [phrase] = useState(phrases[getRandomInt(0, phrases.length - 1)]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (timeLeft > 0 && !submitted) { const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(t); }
    else if (timeLeft === 0 && !submitted) handleSubmit();
  }, [timeLeft, submitted]);
  const handleSubmit = () => {
    setSubmitted(true);
    let errors = 0;
    const limit = Math.max(phrase.length, input.length);
    for (let i = 0; i < limit; i++) if (input[i] !== phrase[i]) errors++;
    onFinish(Math.max(0, 10 - Math.ceil(errors * 1.5)));
  };
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-neon-blue mb-2">DRUNK TEXT</h3>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mb-4"><p className="font-mono text-lg text-white">{phrase}</p></div>
      <textarea className="w-full bg-gray-900 text-white p-3 rounded border border-neon-blue font-mono mb-4" rows="4" value={input} onChange={(e) => setInput(e.target.value)} autoCorrect="off" />
      <button onClick={handleSubmit} className="w-full bg-neon-blue text-black font-bold py-2 rounded">SEND IT ({timeLeft}s)</button>
    </div>
  );
};

export const WheresMyKeys = ({ onFinish }) => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(1);
  const [flashIndex, setFlashIndex] = useState(null);
  const [userFlashIndex, setUserFlashIndex] = useState(null);

  useEffect(() => { startRound(1, []); }, []);

  const startRound = (currentRound, currentSeq) => {
    const newStep = getRandomInt(0, 8);
    const nextSeq = [...currentSeq, newStep];
    setSequence(nextSeq);
    setRound(currentRound);
    playSequence(nextSeq);
  };

  const playSequence = (seq) => {
    setPlaying(true);
    setUserSequence([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= seq.length) { clearInterval(interval); setFlashIndex(null); setPlaying(false); return; }
      setFlashIndex(seq[i]); setTimeout(() => setFlashIndex(null), 400); i++;
    }, 600);
  };

  const handleTap = (index) => {
    if (playing) return;
    setUserFlashIndex(index); setTimeout(() => setUserFlashIndex(null), 150);
    const newUserSeq = [...userSequence, index]; setUserSequence(newUserSeq);
    const currentIndex = newUserSeq.length - 1;
    if (newUserSeq[currentIndex] !== sequence[currentIndex]) { onFinish(Math.min(10, (round - 1) * 3)); return; }
    if (newUserSeq.length === sequence.length) { 
      if (round === 4) { onFinish(10); } 
      else { 
        setPlaying(true); // Block input during transition
        setTimeout(() => startRound(round + 1, sequence), 800); 
      } 
    }
  };

  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-neon-purple mb-4">WHERE'S MY KEYS?</h3>
      <div className="grid grid-cols-3 gap-3 mx-auto max-w-[300px]">
        {[...Array(9)].map((_, i) => (
          <button key={i} onMouseDown={() => handleTap(i)} onTouchStart={() => handleTap(i)} className={`aspect-square rounded-xl border-2 transition-all duration-100 ${(flashIndex === i || userFlashIndex === i) ? 'bg-neon-purple border-white shadow-[0_0_15px_#d946ef] scale-95' : 'bg-gray-800 border-gray-600'}`}>
            {(flashIndex === i || userFlashIndex === i) && <Car className="mx-auto text-white" />}
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-400">{playing ? "Watch..." : "Your turn"}</p>
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
    <div className={`w-full h-64 rounded-xl flex items-center justify-center cursor-pointer ${state === 'WAITING' ? 'bg-gray-800' : 'bg-neon-green'}`} onMouseDown={handleClick} onTouchStart={handleClick}>
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

  if (!q) return null;
  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-bold text-yellow-400">TIP CALC</h3><span className={`text-xs font-bold px-2 py-1 rounded ${q.label === 'HARD' ? 'bg-red-500 text-black' : q.label === 'MEDIUM' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}>{q.label}</span></div>
      <div className="bg-gray-800 p-6 rounded-xl mb-4 border-2 border-yellow-500"><p className="text-gray-400 uppercase text-sm tracking-widest mb-1">TIME LEFT: <span className="text-red-500 font-bold">{timeLeft}s</span></p><p className="text-5xl font-mono text-white">${q.bill}</p><p className="text-yellow-400 font-bold mt-2">What is 20%?</p></div>
      <input type="number" className="w-32 bg-gray-900 text-white text-3xl p-2 text-center rounded border border-gray-600 mb-4" value={input} onChange={e => setInput(e.target.value)} placeholder="?.??" />
      <button onClick={check} className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400">SUBMIT</button>
    </div>
  );
};

export const VibeCheck = ({ onFinish }) => {
  const colors = [{ name: "RED", hex: "text-red-500", val: "red" }, { name: "BLUE", hex: "text-blue-500", val: "blue" }, { name: "GREEN", hex: "text-green-500", val: "green" }, { name: "YELLOW", hex: "text-yellow-400", val: "yellow" }];
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const nextRound = useCallback(() => {
    if (round >= 5) { onFinish(score * 2); return; }
    const word = colors[getRandomInt(0, 3)]; let ink = colors[getRandomInt(0, 3)]; while (ink.val === word.val) ink = colors[getRandomInt(0, 3)];
    setCurrent({ word: word.name, ink: ink.hex, correctVal: ink.val }); setOptions(shuffleArray(colors)); setRound(r => r + 1);
  }, [round, score, onFinish]);
  useEffect(() => { nextRound(); }, []);
  const handleChoice = (val) => { if (val === current.correctVal) setScore(s => s + 1); nextRound(); };
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-white mb-2">VIBE CHECK</h3>
      <p className="text-gray-400 text-sm mb-6">Click the COLOR, not the word!</p>
      <div className="bg-gray-900 p-8 rounded-xl mb-8 border border-gray-700"><h2 className={`text-6xl font-black ${current.ink}`}>{current.word}</h2></div>
      <div className="grid grid-cols-2 gap-4">{options.map((c) => <button key={c.name} onClick={() => handleChoice(c.val)} className="bg-gray-800 hover:bg-gray-700 py-4 rounded-lg font-bold border border-gray-600">{c.name}</button>)}</div>
    </div>
  );
};

export const PizzaKing = ({ onFinish }) => {
  const ingredients = ['Pepperoni', 'Mushrooms', 'Olives', 'Onions', 'Bacon', 'Pineapple'];
  const [order, setOrder] = useState([]);
  const [phase, setPhase] = useState('MEMORIZE');
  const [selection, setSelection] = useState([]);
  useEffect(() => { setOrder(shuffleArray(ingredients).slice(0, 3)); setTimeout(() => setPhase('SELECT'), 3000); }, []);
  const toggleIng = (ing) => { if (selection.includes(ing)) setSelection(selection.filter(i => i !== ing)); else if (selection.length < 3) setSelection([...selection, ing]); };
  const submit = () => { const correct = selection.filter(i => order.includes(i)).length; const wrong = selection.filter(i => !order.includes(i)).length; let pts = (correct * 3.33) - (wrong * 2); onFinish(Math.max(0, Math.round(pts))); };
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
  const handleStop = () => { setRunning(false); const dist = Math.abs(barPos - 50); onFinish(dist < 5 ? 10 : dist < 15 ? 8 : dist < 25 ? 5 : 0); };
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
  const [timeLeft, setTimeLeft] = useState(8.0);
  useEffect(() => { const size = 35; const t = getRandomInt(0, size); setGrid(Array(size + 1).fill('PERSON').map((_, i) => i === t ? 'TOILET' : 'PERSON')); }, []);
  useEffect(() => { if (timeLeft > 0) { const t = setTimeout(() => setTimeLeft(p => Math.max(0, p - 0.1)), 100); return () => clearTimeout(t); } else onFinish(0); }, [timeLeft, onFinish]);
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-blue-300 mb-2">TOILET RUSH</h3>
      <span className="text-red-500 font-mono text-xl">{timeLeft.toFixed(1)}s</span>
      <div className="grid grid-cols-6 gap-2 mt-4">{grid.map((item, i) => <button key={i} onClick={() => onFinish(item === 'TOILET' ? Math.ceil(timeLeft + 2) : 0)} className="p-2 bg-gray-800 rounded flex items-center justify-center aspect-square">{item === 'TOILET' ? <div className="text-white font-bold text-xs">WC</div> : <div className="w-4 h-4 rounded-full bg-gray-500"></div>}</button>)}</div>
    </div>
  );
};

export const UberCode = ({ onFinish }) => {
  const [code] = useState(() => Array(4).fill(0).map(() => getRandomInt(0, 9)).join(''));
  const [input, setInput] = useState("");
  const [keys, setKeys] = useState([0,1,2,3,4,5,6,7,8,9]);
  useEffect(() => setKeys(shuffleArray(keys)), [input]);
  const handlePress = (n) => { const next = input + n; setInput(next); if (next.length === 4) onFinish(next === code ? 10 : 0); };
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-xl font-bold text-purple-400 mb-2">UBER CODE</h3>
      <p className="text-gray-400 mb-4">Enter: <span className="text-3xl font-mono text-white font-bold">{code}</span></p>
      <div className="bg-gray-800 p-4 rounded mb-4 h-16 flex items-center justify-center"><span className="text-3xl font-mono text-neon-blue tracking-[1em]">{input.padEnd(4, '_')}</span></div>
      <div className="grid grid-cols-3 gap-3">{keys.map(k => <button key={k} onClick={() => handlePress(k)} className="bg-gray-700 h-16 rounded-lg text-2xl font-bold active:bg-purple-500">{k}</button>)}</div>
    </div>
  );
};

export const AlphabetSoup = ({ onFinish }) => {
  const [target, setTarget] = useState('A');
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const reqRef = useRef();

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time ran out: Score based on progress (0-4)
          const progress = target.charCodeAt(0) - 'A'.charCodeAt(0);
          onFinish(progress);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [target, onFinish]);

  useEffect(() => {
    const newItems = [];
    const chars = ['A', 'B', 'C', 'D', 'E'];
    chars.forEach(char => {
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

  useEffect(() => {
    const animate = () => {
      setItems(prev => prev.map(item => {
        let { x, y, vx, vy } = item;
        x += vx;
        y += vy;
        if (x <= 5 || x >= 85) vx *= -1;
        if (y <= 5 || y >= 85) vy *= -1;
        return { ...item, x, y, vx, vy };
      }));
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const handleTap = (char) => {
    if (char === target) {
      const next = String.fromCharCode(target.charCodeAt(0) + 1);
      if (next === 'F') {
        // Win condition: 5 points base + time bonus (0-5)
        const bonus = Math.ceil(timeLeft / 4);
        onFinish(5 + bonus);
      }
      else setTarget(next);
    } else {
      onFinish(0); // Miss
    }
  };

  return (
    <div className="w-full h-80 relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
      <div className="absolute top-2 left-2 right-2 flex justify-between text-gray-400 z-20 pointer-events-none">
        <span>Find: <span className="text-neon-green font-bold text-xl">{target}</span></span>
        <span className="text-red-500 font-mono">{timeLeft}s</span>
      </div>
      {items.map((l) => l.char >= target && (
        <button
          key={l.char}
          onMouseDown={(e) => { e.stopPropagation(); handleTap(l.char); }}
          onTouchStart={(e) => { e.stopPropagation(); handleTap(l.char); }}
          className="absolute w-12 h-12 bg-gray-800 border border-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg active:scale-90 transition-transform"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
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
  const [startTime] = useState(Date.now());
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
  }, []);

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
      const totalTime = Date.now() - startTime;
      let finalScore = 0;

      // Base logic: Must have high accuracy (at least 8/10)
      if (newCorrect < 8) {
        // Fail state: Score is low based on accuracy
        finalScore = Math.max(0, newCorrect - 3); 
      } else {
        // Success state: Score based on speed
        // < 6s = 10, < 8s = 9, < 10s = 8, else 7
        if (totalTime < 6000) finalScore = 10;
        else if (totalTime < 8000) finalScore = 9;
        else if (totalTime < 10000) finalScore = 8;
        else finalScore = 7;

        // Deduct 1 point per mistake if any (e.g. 9/10 correct)
        finalScore -= (10 - newCorrect);
      }
      onFinish(finalScore);
    }
  };

  if (!current) return null;

  return (
    <div className="w-full max-w-md p-4 text-center select-none">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold">BIGGER <span className="text-neon-green">NUMBER</span>?</h3>
        <span className="text-gray-500 font-mono">{round}/10</span>
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
  useEffect(() => {
    const int = setInterval(() => {
      if (timeLeft > 0) { setPos({ top: getRandomInt(10, 80), left: getRandomInt(10, 80) }); setTimeLeft(t => t - 1); }
      else { clearInterval(int); onFinish(0); }
    }, 800);
    return () => clearInterval(int);
  }, [timeLeft, onFinish]);
  return (
    <div className="w-full max-w-md h-96 bg-gray-900 rounded-xl relative overflow-hidden p-4 border border-gray-700" onClick={() => onFinish(0)}>
      <div className="text-center mb-8"><h3 className="text-2xl font-bold text-red-500 mb-2">RISKY TEXT</h3><p className="text-gray-400">Don't send it! Hit delete!</p></div>
      <div className="bg-gray-800 p-4 rounded-lg mb-4"><p className="text-white italic">"i miss u so much..."</p></div>
      <div className="absolute inset-0 flex items-center justify-center -z-0 opacity-20"><Send size={200} /></div>
      <button onMouseDown={(e) => { e.stopPropagation(); onFinish(10); }} onTouchStart={(e) => { e.stopPropagation(); onFinish(10); }} className="absolute bg-green-500 text-black font-bold py-3 px-6 rounded-full shadow-lg z-10 transition-all duration-300" style={{ top: `${pos.top}%`, left: `${pos.left}%` }}>DELETE ({timeLeft})</button>
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
    ctx.lineWidth = 45; 
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cvs.width / 2, cvs.height - 30);
    
    const cp1x = getRandomInt(0, cvs.width);
    const cp1y = cvs.height * 0.75;
    const cp2x = getRandomInt(0, cvs.width);
    const cp2y = cvs.height * 0.25;
    
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cvs.width / 2, 30);
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
        healthRef.current -= 2; // Drain speed
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
  const [timeLeft, setTimeLeft] = useState(3.0);
  const [instruction, setInstruction] = useState(Math.random() > 0.5 ? 'LEFT' : 'RIGHT');

  // Round Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          // Time ran out for this round
          handleTurn(false); 
          return 3.0; 
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
        if (timeLeft > 1.5) points += 1; // Speed bonus
    }
    
    const newScore = score + points;
    setScore(newScore);
    
    if (round < 5) {
      setRound(r => r + 1);
      setInstruction(Math.random() > 0.5 ? 'LEFT' : 'RIGHT');
      setTimeLeft(3.0);
    } else {
      onFinish(newScore);
    }
  };

  const handleClick = (dir) => {
    // Instruction: LEFT -> Must click RIGHT (Reverse Psych)
    const correctDir = instruction === 'LEFT' ? 'RIGHT' : 'LEFT';
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
  useEffect(() => { let int; if (running) int = setInterval(() => setAngle(a => (a + 5) % 360), 20); return () => clearInterval(int); }, [running]);
  const stop = () => { setRunning(false); const diff = Math.min(angle, 360 - angle); onFinish(diff < 15 ? 10 : diff < 30 ? 5 : 0); };
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
  const [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => { const t = setInterval(() => setTimeLeft(p => { if (p <= 1) { clearInterval(t); onFinish(0); return 0; } return p - 1; }), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="w-full max-w-md p-4 text-center">
      <div className="flex justify-between items-center text-red-500 mb-4 font-mono font-bold border-b border-red-900 pb-2"><span>BATTERY: 1%</span><span>{timeLeft}s</span></div>
      <h3 className="text-xl text-white mb-8 font-bold">PHONE IS DYING. ACTION?</h3>
      <div className="grid grid-cols-2 gap-4"><button onClick={() => onFinish(0)} className="bg-gray-800 p-6 rounded-xl flex flex-col items-center gap-2"><Search /> Check Ex's Insta</button><button onClick={() => onFinish(10)} className="bg-white text-black p-6 rounded-xl flex flex-col items-center gap-2"><Car /> CALL UBER</button><button onClick={() => onFinish(0)} className="bg-gray-800 p-6 rounded-xl flex flex-col items-center gap-2"><Pizza /> Order Pizza</button><button onClick={() => onFinish(0)} className="bg-gray-800 p-6 rounded-xl flex flex-col items-center gap-2"><Smartphone /> Take Selfie</button></div>
    </div>
  );
};

export const RedLight = ({ onFinish }) => {
  const [color, setColor] = useState('GREEN'); 
  const [clicks, setClicks] = useState(0);
  const gameOverRef = useRef(false);

  useEffect(() => {
    const runCycle = () => {
        if (gameOverRef.current) return;
        
        // Green Phase
        setColor('GREEN');
        
        // Wait 1.5-2.5s then Warning
        setTimeout(() => {
            if (gameOverRef.current) return;
            setColor('YELLOW'); // Warning
            
            // Wait 0.5-1s then STOP
            setTimeout(() => {
                if (gameOverRef.current) return;
                setColor('RED'); // Stop
                
                // Wait 1-2s then Restart Loop
                setTimeout(() => {
                    if (gameOverRef.current) return;
                    runCycle(); // Loop back
                }, getRandomInt(1000, 2000));
                
            }, getRandomInt(500, 1000));
            
        }, getRandomInt(1500, 2500));
    };
    
    runCycle();
    return () => { gameOverRef.current = true; };
  }, []);

  const handleTap = () => {
    if (gameOverRef.current) return;
    if (color === 'RED') {
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
    <div className={`w-full h-80 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${color === 'GREEN' ? 'bg-green-500' : color === 'YELLOW' ? 'bg-yellow-400' : 'bg-red-600'}`} onMouseDown={handleTap} onTouchStart={handleTap}>
        <div className="text-white font-black text-4xl mb-4 drop-shadow-md">{color === 'GREEN' ? 'TAP!!!' : color === 'YELLOW' ? 'STEADY...' : 'STOP!'}</div>
        <div className="text-2xl font-mono font-bold text-black bg-white/50 px-4 py-1 rounded">{clicks}/15</div>
    </div>
  );
};

export const BeerGoggles = ({ onFinish }) => {
  const [blur, setBlur] = useState(15);
  const handleSubmit = () => { if (blur === 0) onFinish(10); else if (blur < 3) onFinish(5); else onFinish(0); };
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-neon-blue mb-4">FIX YOUR VISION</h3>
      <div className="bg-white text-black p-6 rounded-xl mb-8"><p className="font-serif text-2xl font-bold" style={{ filter: `blur(${blur}px)` }}>Am I drunk or is this text blurry?</p></div>
      <input type="range" min="0" max="20" step="0.5" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full h-12 accent-neon-blue cursor-pointer mb-8" />
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
                return f + 0.8; // Slower fill
            }); 
        }, 10); 
    }
    return () => clearInterval(int); 
  }, [pouring, done]);

  const start = () => setPouring(true); 
  
  const stop = () => { 
      setPouring(false); 
      setDone(true); 
      
      const diff = Math.abs(fill - target);
      
      // Gradient Scoring
      // Perfect: diff <= 1 (Score 10)
      // Range: diff <= 15 (Score scales from 9 down to 1)
      // Miss: diff > 15 (Score 0)
      
      if (diff <= 1) {
          onFinish(10);
      } else if (diff <= 15) {
          // Linear score: 15 diff = 0 pts, 1 diff = 9 pts roughly
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
            
            {/* Liquid */}
            <div 
                className="absolute bottom-0 w-full bg-yellow-500 transition-all duration-75" 
                style={{ height: `${fill}%` }}
            ></div>
        </div>
      </div>
      <button 
        onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
        onTouchStart={start} onTouchEnd={stop} 
        disabled={done} 
        className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl active:scale-95 disabled:opacity-50"
      >
        {done ? (fill >= 100 ? "SPILLED!" : "DONE") : "HOLD TO POUR"}
      </button>
    </div>
  );
};

export const Hydrate = ({ onFinish }) => {
  const [grid, setGrid] = useState([]); const [timeLeft, setTimeLeft] = useState(5.0);
  useEffect(() => { const items = Array(24).fill('ALCOHOL'); items[getRandomInt(0, 23)] = 'WATER'; setGrid(items); }, []);
  useEffect(() => { if (timeLeft > 0) { const t = setTimeout(() => setTimeLeft(p => Math.max(0, p - 0.1)), 100); return () => clearTimeout(t); } else onFinish(0); }, [timeLeft, onFinish]);
  return (
    <div className="w-full max-w-md p-4 text-center">
      <h3 className="text-2xl font-bold text-blue-400 mb-2">FIND WATER</h3>
      <span className="text-red-500 font-mono text-xl mb-4 block">{timeLeft.toFixed(1)}s</span>
      <div className="grid grid-cols-5 gap-3">{grid.map((item, i) => <button key={i} onClick={() => onFinish(item === 'WATER' ? 10 : 0)} className="text-2xl p-2 bg-gray-800 rounded hover:bg-gray-700">{item === 'WATER' ? <Droplet className="text-blue-400 mx-auto" /> : (Math.random() > 0.5 ? <Beer className="text-yellow-500 mx-auto" /> : <Wine className="text-purple-500 mx-auto" />)}</button>)}</div>
    </div>
  );
};

export const CatchUber = ({ onFinish }) => {
  const [playerX, setPlayerX] = useState(50);
  const [uber, setUber] = useState({ x: getRandomInt(10, 90), y: 0 });
  const [running, setRunning] = useState(true);
  const playerRef = useRef(50);

  useEffect(() => { playerRef.current = playerX; }, [playerX]);

  useEffect(() => {
      let int;
      if (running) {
          int = setInterval(() => {
              setUber(u => {
                  // Speed adjusted
                  const nextY = u.y + 1.2; 
                  if (nextY >= 90) {
                      if (Math.abs(u.x - playerRef.current) < 15) {
                          setRunning(false);
                          onFinish(10);
                          return u;
                      } else {
                          setRunning(false);
                          onFinish(0);
                          return u;
                      }
                  }
                  return { ...u, y: nextY };
              });
          }, 20);
      }
      return () => clearInterval(int);
  }, [running]);

  return (
    <div className="w-full max-w-md p-4 text-center h-full flex flex-col justify-between">
      <h3 className="text-2xl font-bold text-white mb-4">CATCH THE RIDE</h3>
      
      {/* Game Area - Fixed Height ensuring visibility */}
      <div className="w-full h-80 relative bg-gray-800 rounded-xl border border-gray-600 overflow-hidden mb-4">
         {/* Uber - EMOJI for visibility */}
         <div className="absolute text-4xl" style={{ top: `${uber.y}%`, left: `${uber.x}%`, transform: 'translate(-50%, 0)' }}>
            🚖
         </div>
         
         {/* Player - EMOJI for visibility */}
         <div className="absolute bottom-0 text-4xl" style={{ left: `${playerX}%`, transform: 'translate(-50%, 0)' }}>
            🧍
         </div>
      </div>
      
      <input 
        type="range" min="0" max="100" value={playerX} 
        onChange={(e) => setPlayerX(Number(e.target.value))} 
        className="w-full h-16 accent-neon-green cursor-pointer"
      />
    </div>
  );
};