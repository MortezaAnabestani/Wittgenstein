
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Settings, Pause, Medal, BookOpen } from 'lucide-react';
import { Tile } from './components/Tile';
import { Confetti } from './components/Confetti';
import { ProgressBar } from './components/ProgressBar';
import { Modal } from './components/Modal';
import { Toast, ToastType } from './components/Toast';
import { Timer } from './components/Timer';
import { ShareSheet } from './components/ShareSheet';
import { LevelMap } from './components/LevelMap';
import { SettingsModal } from './components/SettingsModal';
import { DebugPanel } from './components/DebugPanel';
import { VisualSolvedRow } from './components/VisualSolvedRow';
import { HintButton } from './components/HintButton';
import { ComboMeter } from './components/ComboMeter';
import { LevelIntro } from './components/LevelIntro';
import { MergeOverlay } from './components/MergeOverlay';
import { FloatingParticles } from './components/FloatingParticles';
import { IconMapping } from './components/IconMapping';
import { StudioIntro } from './components/StudioIntro';
import { CurrencyDisplay } from './components/CurrencyDisplay';
import { ShopModal } from './components/ShopModal';
import { PauseMenu } from './components/PauseMenu';
import { FeedbackText } from './components/FeedbackText';
import { PlayerStats } from './components/PlayerStats';
import { AchievementsModal } from './components/AchievementsModal';
import { TutorialOverlay } from './components/TutorialOverlay';
import { CollectionBook } from './components/CollectionBook';
import { DailyReward } from './components/DailyReward';
import { NetworkStatus } from './components/NetworkStatus';
import { LEVELS } from './data/levels';
import { WordItem, Category, ViewState, ShopItem, FeedbackEvent, Achievement, PlayerStats as IPlayerStats, CollectionItem } from './types';
import { storage } from './services/storage';
import { audio } from './services/audio';

// Default Achievements
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', title: 'اولین گام', description: 'اولین مرحله را کامل کنید', icon: 'Star', unlocked: false },
  { id: 'combo_master', title: 'استاد کمبو', description: 'به کمبو ۵ برسید', icon: 'Flame', unlocked: false },
  { id: 'rich', title: 'ثروتمند', description: 'جمع آوری ۵۰۰ جم', icon: 'Diamond', unlocked: false },
];

export const App: React.FC = () => {
  // Intro State
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);

  // Navigation State
  const [view, setView] = useState<ViewState>('map');
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currency, setCurrency] = useState(0); 
  const [playerStats, setPlayerStats] = useState<IPlayerStats>({ level: 1, xp: 0, totalWins: 0 });
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS);
  const [collection, setCollection] = useState<CollectionItem[]>([]);

  // Game State
  const [gridWords, setGridWords] = useState<WordItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]); 
  const [moves, setMoves] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Mechanics
  const [combo, setCombo] = useState(0);
  const [lastSolveTime, setLastSolveTime] = useState(0);
  const [hints, setHints] = useState(3);
  const [hintingIds, setHintingIds] = useState<string[]>([]);
  const [showIntro, setShowIntro] = useState(false);
  const [mergeEvent, setMergeEvent] = useState<{ icon: string, idsToRemove: string[] } | null>(null);

  // UI State
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [toast, setToast] = useState<{ msg: string, type: ToastType, visible: boolean }>({ msg: '', type: 'info', visible: false });
  const [isCopied, setIsCopied] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackEvent[]>([]);

  // Dragging
  const [dragInfo, setDragInfo] = useState<{
    id: string;
    startIndex: number;
    currentX: number;
    currentY: number;
    width: number;
    height: number;
  } | null>(null);

  // Load progress
  useEffect(() => {
    const saved = storage.getItem('persian_connections_progress');
    const savedCurrency = storage.getItem('persian_connections_currency');
    const savedStats = storage.getItem('persian_connections_stats');
    const savedCollection = storage.getItem('persian_connections_collection');
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCompletedLevels(parsed);
      } catch (e) {}
    }
    if (savedCurrency) {
      try {
        setCurrency(parseInt(savedCurrency, 10) || 0);
      } catch(e) {}
    }
    if (savedStats) {
       try { setPlayerStats(JSON.parse(savedStats)); } catch(e) {}
    }
    if (savedCollection) {
       try { setCollection(JSON.parse(savedCollection)); } catch(e) {}
    }
  }, []);

  useEffect(() => {
    let intervalId: number;
    if (view === 'game' && !isWon && !isPaused && !showInstructions && !showSettings && !showIntro && !mergeEvent && !showPause && !showShop && !showAchievements && !showCollection) {
      intervalId = window.setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [view, isWon, isPaused, showInstructions, showSettings, showIntro, mergeEvent, showPause, showShop, showAchievements, showCollection]);

  useEffect(() => {
    if (combo > 0) {
      const timer = setTimeout(() => setCombo(0), 4000); 
      return () => clearTimeout(timer);
    }
  }, [combo]);

  useEffect(() => {
    if (hasPlayedIntro) audio.resume();
  }, [hasPlayedIntro]);

  const unlockAchievement = (id: string) => {
     setAchievements(prev => {
        const idx = prev.findIndex(a => a.id === id);
        if (idx !== -1 && !prev[idx].unlocked) {
           const next = [...prev];
           next[idx] = { ...next[idx], unlocked: true };
           showToast(`دستاورد باز شد: ${next[idx].title}`, 'success');
           return next;
        }
        return prev;
     });
  };

  const updateStats = (xpGained: number, win: boolean) => {
     setPlayerStats(prev => {
        const newXp = prev.xp + xpGained;
        const newLevel = Math.floor(newXp / 1000) + 1;
        const newStats = {
           level: newLevel,
           xp: newXp,
           totalWins: win ? prev.totalWins + 1 : prev.totalWins
        };
        storage.setItem('persian_connections_stats', JSON.stringify(newStats));
        if (newLevel > prev.level) showToast(`سطح ارتقا یافت: ${newLevel}!`, 'success');
        return newStats;
     });
  };

  const addToCollection = (tokenName: string, icon: string) => {
     setCollection(prev => {
        if (prev.some(i => i.name === tokenName)) return prev;
        const newItem: CollectionItem = {
           id: Date.now().toString(),
           name: tokenName,
           icon: icon,
           unlockedAt: Date.now(),
           levelId: currentLevelId
        };
        const next = [...prev, newItem];
        storage.setItem('persian_connections_collection', JSON.stringify(next));
        return next;
     });
  };

  const saveProgress = (levelId: number) => {
    const newCompleted = Array.from(new Set([...completedLevels, levelId]));
    setCompletedLevels(newCompleted);
    storage.setItem('persian_connections_progress', JSON.stringify(newCompleted));
    addCurrency(50);
    updateStats(200, true);
    unlockAchievement('first_win');
    if (currency > 500) unlockAchievement('rich');
  };

  const addCurrency = (amount: number, x?: number, y?: number) => {
    const newVal = currency + amount;
    setCurrency(newVal);
    storage.setItem('persian_connections_currency', newVal.toString());
    
    if (amount > 0 && x !== undefined && y !== undefined) {
      addFeedback(`+${amount} 💎`, x, y, '#22d3ee');
    }
  };

  const addFeedback = (text: string, x: number, y: number, color?: string) => {
    const id = Date.now() + Math.random();
    setFeedbacks(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFeedbacks(prev => prev.filter(f => f.id !== id));
    }, 1500);
  };

  const resetProgress = () => {
    setCompletedLevels([]);
    setCurrency(0);
    setPlayerStats({ level: 1, xp: 0, totalWins: 0 });
    setCollection([]);
    storage.removeItem('persian_connections_progress');
    storage.removeItem('persian_connections_currency');
    storage.removeItem('persian_connections_stats');
    storage.removeItem('persian_connections_collection');
    storage.removeItem('persian_connections_daily');
    setView('map');
    setShowSettings(false);
  };

  const showToast = (msg: string, type: ToastType = 'info') => {
    setToast({ msg, type, visible: true });
    if (type === 'error') audio.playError();
    if (type === 'success') audio.playSuccess();
  };

  const startLevel = (levelId: number) => {
    const levelData = LEVELS.find(l => l.id === levelId);
    if (!levelData) return;

    setCurrentLevelId(levelId);
    setCategories(levelData.categories);
    
    const allWords: WordItem[] = [];
    levelData.categories.forEach(cat => {
      cat.words.forEach(word => {
        allWords.push({
          id: `${cat.id}-${word}`,
          text: word,
          categoryId: cat.id,
          isSolved: false
        });
      });
    });

    setGridWords(allWords.sort(() => Math.random() - 0.5));
    setSolvedCategories([]);
    setMoves(0);
    setGameTime(0);
    setIsWon(false);
    setHints(3);
    setCombo(0);
    setShowIntro(true);
    setView('game');
  };

  const handleHint = () => {
    if (hints <= 0) {
      setShowShop(true);
      return;
    }
    if (hintingIds.length > 0) {
       audio.playError();
       return;
    }
    const unsolvedCat = categories.find(c => !solvedCategories.find(sc => sc.id === c.id) && !c.words.every(w => !gridWords.find(gw => gw.text === w)));
    if (!unsolvedCat) return;

    // Show ALL remaining words for the category
    const targetWords = gridWords.filter(w => w.categoryId === unsolvedCat.id && !w.isSolved);
    const idsToShake = targetWords.map(w => w.id);
    
    setHintingIds(idsToShake);
    setHints(h => h - 1);
    
    audio.playPop(); 
    setTimeout(() => setHintingIds([]), 1500); 
  };

  const buyItem = (item: ShopItem) => {
    if (currency >= item.cost) {
      setCurrency(c => c - item.cost);
      storage.setItem('persian_connections_currency', (currency - item.cost).toString());
      
      if (item.action === 'hint') {
         setHints(h => h + (item.id === 'hint_pack' ? 3 : 1));
         showToast('راهنما اضافه شد', 'success');
      } else if (item.action === 'time') {
         setGameTime(t => Math.max(0, t - 30)); 
         showToast('زمان اصلاح شد', 'success');
      }
      
      audio.playSuccess();
    }
  };

  const handleMerge = (cat: Category, wordIds: string[]) => {
     if (!cat.transformsTo) return;
     audio.playMerge(); 
     setMergeEvent({ icon: cat.transformsTo, idsToRemove: wordIds });
  };

  const checkGridForSolutions = useCallback((currentGrid: WordItem[], currentSolvedCats: Category[]) => {
    const activeWords = currentGrid.filter(w => !w.isSolved);
    
    let changed = false;
    let merged = false;
    
    let nextFullGrid = [...currentGrid];
    const newSolvedCats = [...currentSolvedCats];
    const rowSize = 6;
    
    for (let i = 0; i < activeWords.length; i += rowSize) {
       const chunk = activeWords.slice(i, i + rowSize);
       if (chunk.length < rowSize) break;
       
       const firstCatId = chunk[0].categoryId;
       
       // Check if all items in this visual row belong to the same category
       if (chunk.every(w => w.categoryId === firstCatId)) {
          const cat = categories.find(c => c.id === firstCatId);
          if (!cat) continue;

          if (cat.isSubCategory) {
             handleMerge(cat, chunk.map(w => w.id));
             merged = true;
             break; 
          }

          const chunkIds = chunk.map(w => w.id);
          nextFullGrid = nextFullGrid.map(w => 
            chunkIds.includes(w.id) ? { ...w, isSolved: true } : w
          );
          
          if (!newSolvedCats.some(c => c.id === cat.id)) {
            newSolvedCats.push(cat);
            const now = Date.now();
            const rect = document.body.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (now - lastSolveTime < 5000) {
               setCombo(c => c + 1);
               addCurrency(5 * (combo + 1), centerX, centerY); 
               showToast(`کمبو! ${combo + 2}x`, 'success');
               if (combo >= 4) unlockAchievement('combo_master');
            } else {
               setCombo(1);
               addCurrency(10, centerX, centerY); 
               audio.playSuccess();
               showToast(`گروه "${cat.title}" پیدا شد!`, 'success');
            }
            setLastSolveTime(now);
          }
          changed = true;
       }
    }

    if (merged) return;

    if (changed) {
      setGridWords(nextFullGrid);
      setSolvedCategories(newSolvedCats);
      
      const totalCats = categories.filter(c => !c.isSubCategory).length;
      if (newSolvedCats.length === totalCats) {
        setIsWon(true);
        saveProgress(currentLevelId);
      }
    }
  }, [categories, currentLevelId, combo, lastSolveTime]);

  const completeMerge = () => {
    if (!mergeEvent) return;
    const cat = categories.find(c => c.transformsTo === mergeEvent.icon);
    if (!cat) return;
    
    // Logic: Remove the merged words, insert the new Token
    const newGridWithoutMerged = gridWords.filter(w => !mergeEvent.idsToRemove.includes(w.id));
    
    const token: WordItem = {
      id: `token-${cat.id}`,
      text: cat.transformsTo || 'Token',
      // CRITICAL: The token belongs to the Master Category!
      categoryId: cat.targetCategoryId || 'unknown', 
      isSolved: false,
      isToken: true,
      iconName: cat.transformsTo
    };

    addToCollection(cat.title, cat.transformsTo || '');
    
    // Add token to the start or mix it? Adding to start is visually clearer.
    const finalGrid = [token, ...newGridWithoutMerged];
    setGridWords(finalGrid);
    setMergeEvent(null);
    showToast(`${cat.title} تبدیل شد!`, 'success');
    
    // Small currency reward for merge
    const rect = document.body.getBoundingClientRect();
    addCurrency(10, rect.width / 2, rect.height / 2); 
    
    // Re-check grid immediately? 
    // Usually user needs to move the token, so no check needed yet.
  };

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    const index = gridWords.findIndex(w => w.id === id);
    if (index === -1) return;
    const target = e.currentTarget as HTMLElement;
    try { target.releasePointerCapture(e.pointerId); } catch (err) {}
    const rect = target.getBoundingClientRect();
    setDragInfo({ id, startIndex: index, currentX: e.clientX, currentY: e.clientY, width: rect.width, height: rect.height });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo) return;
    e.preventDefault();
    setDragInfo(prev => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragInfo) return;
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const tileElement = elements.find(el => el.hasAttribute('data-tile-id'));
    
    if (tileElement) {
      const targetId = tileElement.getAttribute('data-tile-id');
      const targetIndex = gridWords.findIndex(w => w.id === targetId);
      const sourceIndex = dragInfo.startIndex;

      if (targetIndex !== -1 && targetIndex !== sourceIndex) {
        const targetWord = gridWords[targetIndex];
        const sourceWord = gridWords[sourceIndex];
        if (targetWord && sourceWord && !targetWord.isSolved && !sourceWord.isSolved) {
          audio.playDrop();
          const newGrid = [...gridWords];
          [newGrid[sourceIndex], newGrid[targetIndex]] = [newGrid[targetIndex], newGrid[sourceIndex]];
          setGridWords(newGrid);
          setMoves(m => m + 1);
          checkGridForSolutions(newGrid, solvedCategories);
        }
      }
    }
    setDragInfo(null);
  };

  const handleShare = async () => {
    const text = `ویتگنشتاین: در شهر ${LEVELS.find(l=>l.id===currentLevelId)?.title.split(':')[0]} هستم!\n⏱ ${gameTime} ثانیه | 🔄 ${moves} حرکت`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        showToast('کپی شد', 'success');
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (e) { showToast('خطا در کپی', 'error'); }
  };

  const getLevelColor = () => {
    if (view === 'map') return 'from-slate-900 to-black';
    // City-based themes
    switch(currentLevelId) {
      case 1: return 'from-slate-800 to-indigo-900'; // Tehran
      case 2: return 'from-emerald-900 to-teal-900'; // Gilan (Green)
      case 3: return 'from-cyan-900 to-blue-900'; // Isfahan (Turquoise)
      case 4: return 'from-amber-900 to-orange-950'; // Yazd (Desert)
      case 5: return 'from-rose-900 to-pink-950'; // Shiraz (Flowers)
      default: return 'from-theme-bg to-theme-dark';
    }
  };

  const activeWords = gridWords.filter(w => !w.isSolved);
  const solvedRows = solvedCategories.map(cat => ({ cat }));

  if (!hasPlayedIntro) {
    return <StudioIntro onComplete={() => setHasPlayedIntro(true)} />;
  }

  return (
    <div 
      className={`min-h-screen flex flex-col items-center font-sans touch-none bg-gradient-to-br ${getLevelColor()} transition-colors duration-1000 selection:bg-transparent overflow-hidden relative`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <FloatingParticles />
      <FeedbackText items={feedbacks} />
      <NetworkStatus />
      <DailyReward onClaim={(amt) => { addCurrency(amt); showToast(`+${amt} جم دریافت شد`, 'success'); audio.playSuccess(); }} />
      
      <DebugPanel onWinLevel={() => setIsWon(true)} onUnlockAll={() => {}} onResetData={resetProgress} />
      <Toast message={toast.msg} type={toast.type} isVisible={toast.visible} onClose={() => setToast(p => ({...p, visible: false}))} />
      {isWon && <Confetti />}
      
      {showIntro && (
         <LevelIntro 
           levelTitle={LEVELS.find(l => l.id === currentLevelId)?.title || ''} 
           description={LEVELS.find(l => l.id === currentLevelId)?.description}
           onComplete={() => setShowIntro(false)} 
         />
      )}

      {currentLevelId === 1 && view === 'game' && !isWon && !showIntro && !showInstructions && (
         <TutorialOverlay />
      )}

      {mergeEvent && (
         <MergeOverlay iconName={mergeEvent.icon} onComplete={completeMerge} />
      )}

      {view === 'map' && (
        <div className="w-full h-screen flex flex-col relative z-20">
          <div className="w-full p-4 md:p-6 flex justify-between z-30 items-center bg-gradient-to-b from-black/80 to-transparent">
            <div onClick={() => setShowShop(true)}><CurrencyDisplay amount={currency} /></div>
            <div className="flex gap-2">
              <button onClick={() => setShowCollection(true)} className="p-3 bg-white/10 rounded-full text-white shadow-lg hover:scale-105 transition-all backdrop-blur-sm border border-white/20">
                 <BookOpen size={24} />
              </button>
              <button onClick={() => setShowAchievements(true)} className="p-3 bg-white/10 rounded-full text-white shadow-lg hover:scale-105 transition-all backdrop-blur-sm border border-white/20">
                 <Medal size={24} />
              </button>
              <button onClick={() => setShowSettings(true)} className="p-3 bg-white/10 rounded-full text-white shadow-lg hover:scale-105 transition-all backdrop-blur-sm border border-white/20">
                 <Settings size={24} />
              </button>
            </div>
          </div>
          <div className="px-4">
             <PlayerStats stats={playerStats} />
          </div>
          <div className="flex-1 overflow-hidden p-4">
             <LevelMap currentLevelId={currentLevelId} completedLevels={completedLevels} onSelectLevel={startLevel} />
          </div>
        </div>
      )}

      {view === 'game' && (
        <>
          <ComboMeter combo={combo} />

          <header className="w-full max-w-2xl flex items-center justify-between p-3 md:p-4 z-20 relative animate-slide-up bg-gradient-to-b from-black/40 to-transparent">
             <button onClick={() => setShowPause(true)} className="p-2.5 text-white bg-black/30 backdrop-blur rounded-xl hover:bg-black/40 transition-all border border-white/10">
                <Pause size={24} />
             </button>
             
             <div className="flex flex-col items-center gap-1">
               <Timer seconds={gameTime} />
             </div>

             <div className="flex items-center gap-3">
               <div onClick={() => setShowShop(true)}><CurrencyDisplay amount={currency} /></div>
               <button onClick={() => setShowInstructions(true)} className="p-2.5 text-white bg-black/30 backdrop-blur rounded-xl hover:bg-black/40 transition-all border border-white/10">
                 <Menu size={24} />
               </button>
             </div>
          </header>

          <main className="flex-1 w-full max-w-2xl p-2 md:p-4 flex flex-col justify-start relative z-10 overflow-y-auto custom-scrollbar">
             {isWon && (
                <ShareSheet 
                  levelId={currentLevelId}
                  solvedCategories={solvedCategories}
                  moves={moves}
                  timeSeconds={gameTime}
                  onHome={() => setView('map')}
                  onNextLevel={currentLevelId < LEVELS.length ? () => startLevel(currentLevelId + 1) : undefined}
                  onShare={handleShare}
                  isCopied={isCopied}
                  hasNextLevel={currentLevelId < LEVELS.length}
                />
             )}

             <div className="w-full bg-board-bg/50 backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] p-3 shadow-glass transition-all border border-white/20 flex flex-col gap-2 min-h-[50vh] relative overflow-hidden">
                <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-br from-white/10 to-transparent rotate-45 pointer-events-none" />

                <div className="flex justify-between px-2 mb-1">
                  <ProgressBar total={8} solvedCount={solvedCategories.length} />
                  <span className="text-white/80 font-bold text-xs">{activeWords.length} آیتم</span>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  {solvedRows.map((item, idx) => (
                    <div key={item.cat.id} className="w-full h-16 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                       <VisualSolvedRow category={item.cat} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-6 gap-1.5 md:gap-2 p-1.5 md:p-2 justify-items-center bg-black/10 rounded-xl inner-shadow min-h-[300px]">
                   {activeWords.map((word) => (
                      <div 
                        key={word.id} 
                        className="relative w-full aspect-square md:h-20 md:aspect-auto" 
                      >
                         <Tile 
                            id={word.id}
                            text={word.text}
                            isSolved={false}
                            isDragging={dragInfo?.id === word.id}
                            isHinting={hintingIds.includes(word.id)}
                            onPointerDown={handlePointerDown}
                            isToken={word.isToken}
                            iconName={word.iconName}
                         />
                      </div>
                   ))}
                </div>
             </div>

             {!isWon && (
               <div className="mt-4 flex justify-between items-center px-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-black/30 px-4 py-2 rounded-xl text-white font-bold text-sm backdrop-blur-md border border-white/10">
                    حرکت: {moves}
                  </div>
                  <div className="flex items-center gap-2">
                     <HintButton onClick={handleHint} disabled={false} remainingHints={hints} />
                  </div>
               </div>
             )}
          </main>

          {dragInfo && gridWords[dragInfo.startIndex] && (
            <div 
              className="fixed pointer-events-none z-[100] flex items-center justify-center bg-amber-100 text-amber-900 shadow-card-dragging rounded-xl border-2 border-white font-black text-sm animate-pulse-glow glass-panel"
              style={{
                width: dragInfo.width * 1.1,
                height: dragInfo.height * 1.1,
                left: dragInfo.currentX,
                top: dragInfo.currentY,
                transform: 'translate(-50%, -50%) rotate(-5deg) scale(1.1)',
              }}
            >
              {gridWords[dragInfo.startIndex].iconName && (
                 <div className="mb-1 mr-1"><IconMapping name={gridWords[dragInfo.startIndex].iconName} size={20} /></div>
              )}
              {gridWords[dragInfo.startIndex].text}
            </div>
          )}
        </>
      )}

      <Modal isOpen={showInstructions} onClose={() => setShowInstructions(false)} title="راهنمای سفر">
         <div className="text-right space-y-4 text-slate-700" dir="rtl">
           <p>1. <b>کاوش:</b> در هر شهر (مرحله)، کلماتی که به هم مرتبط هستند را پیدا کنید.</p>
           <p>2. <b>سوغات:</b> برخی دسته‌ها وقتی کامل شوند، به یک <b>سوغات</b> (آیکون) تبدیل می‌شوند.</p>
           <p>3. <b>ترکیب:</b> از این سوغات برای حل معماهای بزرگتر استفاده کنید.</p>
         </div>
      </Modal>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} onResetProgress={resetProgress} />
      
      <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} achievements={achievements} />

      <CollectionBook isOpen={showCollection} onClose={() => setShowCollection(false)} items={collection} totalSlots={LEVELS.length * 2} />

      <ShopModal 
        isOpen={showShop} 
        onClose={() => setShowShop(false)} 
        currency={currency} 
        onBuy={buyItem} 
      />

      <PauseMenu 
         isOpen={showPause} 
         onResume={() => setShowPause(false)} 
         onRestart={() => { setShowPause(false); startLevel(currentLevelId); }} 
         onExit={() => { setShowPause(false); setView('map'); }}
         onSettings={() => { setShowSettings(true); }}
      />
    </div>
  );
};
