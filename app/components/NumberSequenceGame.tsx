'use client';

import { useState, useEffect } from 'react';
import GoogleAdsense from './GoogleAdsense';

export default function NumberSequenceGame() {
  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [previousNumbers, setPreviousNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [score, setScore] = useState(0);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showNFTRewardScreen, setShowNFTRewardScreen] = useState(false);
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [selectedHintPackage, setSelectedHintPackage] = useState<string | null>(null);
  const [wrongClickedNumber, setWrongClickedNumber] = useState<number | null>(null);
  const [showRedBackground, setShowRedBackground] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [showHeartHint, setShowHeartHint] = useState(false);
  const [goldenJewels, setGoldenJewels] = useState<number>(0);
  const [jewelGridTypes, setJewelGridTypes] = useState<string[]>([]);
  const [squareUsed, setSquareUsed] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkingNumber, setBlinkingNumber] = useState<number | null>(null);
  const [hintStartTime, setHintStartTime] = useState<number | null>(null);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [completedTime, setCompletedTime] = useState<number>(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [optionUsed, setOptionUsed] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [highlightedNumbers, setHighlightedNumbers] = useState<number[]>([]);
  const [purchasedHints, setPurchasedHints] = useState(5);
  const [bestScore, setBestScore] = useState(0);
  const [numberIcons, setNumberIcons] = useState<{ [key: number]: string }>({});
  const [showRules, setShowRules] = useState(false);
  const [wrongSelectCount, setWrongSelectCount] = useState(0);

  // Initialize game
  const initializeGame = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i);
    setGridNumbers(numbers);
    setPreviousNumbers([]);
    setSelectedNumbers([]);
    setGameStarted(true);
    setGameWon(false);
    setGameFailed(false);
    setScore(0);
    setAvailableNumbers([...numbers]);
    setTimeLeft(20);
    setTimerActive(false);
    setShowInfoPanel(true);
    setShowRedBackground(false);
    setSquareUsed(false);
    setIsBlinking(false);
    setBlinkingNumber(null);
    setHintStartTime(null);
    setCompletedTime(0);
    setGameStartTime(Date.now());
    setOptionUsed(0);
    setIsHighlighting(false);
    setHighlightedNumbers([]);
    setPurchasedHints(5);
    setHearts(5);
    setGoldenJewels(0);
    
    // Generate exactly 25 different jewel and gem types
    const baseJewelTypes = [
      // Primary Diamonds & Gems
      '💎', '🔷', '💠', '🔶', '🔸', '🔹', '💍', '👑',
      // Colored Gems & Crystals
      '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪',
      // Sparkles & Stars (jewel-like)
      '⭐', '⭐️', '🌟', '✨', '💫', '🌠',
      // Hearts (as gem hearts)
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎',
      '💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟',
      // Crown & Royalty
      '👑', '🔱', '⚜️',
      // Awards (treasure-like)
      '🏆', '🥇', '🥈', '🥉', '🎖️', '🏅',
      // Money & Coins (jewel-like treasures)
      '💰', '💵', '💴', '💶', '💷', '💸', '🪙', '💲',
      // Gifts & Packages (treasure)
      '🎁', '🎀', '🎊', '🎉',
      // Magic & Mystical (jewel-like)
      '🔮', '🪄', '🧿', '📿',
      // Fire & Energy (precious elements)
      '🔥', '⚡',
      // Light (precious)
      '💡', '🔦',
      // Additional unique symbols
      '❣️', '💌', '🩷', '🩵', '🩶',
      // Circular shapes (gem-like)
      '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪',
      // More sparkles
      '✨', '💫', '🌠',
      // Additional crowns and symbols
      '👑', '🔱', '⚜️',
      // More awards
      '🏆', '🎖️',
      // More coins
      '🪙', '💲'
    ];
    // Ensure we have exactly 25 unique types, remove duplicates while preserving order
    const uniqueJewelTypes = Array.from(new Set(baseJewelTypes)).slice(0, 25);
    // Fill remaining slots if needed
    while (uniqueJewelTypes.length < 25) {
      uniqueJewelTypes.push(uniqueJewelTypes[uniqueJewelTypes.length % uniqueJewelTypes.length]);
    }
    // Take exactly 25
    const finalJewelTypes = uniqueJewelTypes.slice(0, 25);
    // Shuffle to ensure random distribution of 25 jewels
    const shuffledJewelTypes = finalJewelTypes.sort(() => Math.random() - 0.5);
    setJewelGridTypes(shuffledJewelTypes);
    
    // Generate icons for numbers 0-24 - 25 unique icons
    const iconSet = [
      '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎵', '🎶',
      '🎸', '🎹', '🥁', '🎺', '🎻', '🎷', '🎼', '🎹', '🎤', '🎧',
      '🏀', '🏈', '⚽', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
      '🏒', '🏑', '🏏', '⛳', '🏌️', '🏄', '🏊', '🚴', '🚵', '🏇',
      '🤸', '🤼', '🤽', '🤾', '🤹', '🧘', '🧗', '🧜', '🧝', '🧞',
      '🎮', '🕹️', '🎰', '🎳', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬'
    ];
    // Remove duplicates and ensure we have 25 unique icons
    const uniqueIcons = Array.from(new Set(iconSet));
    // If we have less than 25, add more diverse icons
    const additionalIcons = [
      '🌍', '🌎', '🌏', '🌐', '🗺️', '🧭', '🏔️', '⛰️', '🌋', '🗻',
      '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱', '🏘️',
      '🏚️', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩',
      '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '🗼', '🗽', '⛪', '🕌',
      '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁', '🌃', '🏙️', '🌄'
    ];
    // Combine and take first 25 unique
    const allIcons = [...uniqueIcons, ...additionalIcons];
    const finalIconSet = Array.from(new Set(allIcons)).slice(0, 25);
    // Shuffle to ensure random distribution
    const shuffledIcons = [...finalIconSet].sort(() => Math.random() - 0.5);
    // Map each number (0-24) to a unique icon
    const iconMap: { [key: number]: string } = {};
    numbers.forEach((num, index) => {
      iconMap[num] = shuffledIcons[index];
    });
    setNumberIcons(iconMap);
    
    // Generate first random number immediately
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const firstNumber = numbers[randomIndex];
    setCurrentNumber(firstNumber);
    setAvailableNumbers(prev => prev.filter(num => num !== firstNumber));
    
    // Start timer after a brief delay
    setTimeout(() => {
      setTimerActive(true);
    }, 100);
  };

  // Play again functionality
  const playAgain = () => {
    // Use initializeGame to start the game properly
    initializeGame();
  };

  // Handle start button click
  const handleStartClick = () => {
    initializeGame();
  };

  // Generate next random number
  const generateNextNumber = () => {
    if (availableNumbers.length === 0) {
      // No more numbers to generate, but don't set gameWon here
      // gameWon will be set when user clicks the final number (score === 103)
      setTimerActive(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    
    setCurrentNumber(newNumber);
    setAvailableNumbers(prev => prev.filter(num => num !== newNumber));
    setTimeLeft(20);
    setTimerActive(true);
    setWrongSelectCount(0);
  };

  // Handle number click
  const handleNumberClick = (clickedNumber: number) => {
    if (gameFailed || gameWon || !gameStarted || showRedBackground) return;

    // Remove highlight effect when user clicks any number
    if (isHighlighting) {
      setIsHighlighting(false);
      setHighlightedNumbers([]);
    }

    if (clickedNumber === currentNumber) {
      // Correct selection
      const newSelectedNumbers = [...selectedNumbers, clickedNumber];
      setSelectedNumbers(newSelectedNumbers);
      setPreviousNumbers(prev => [...prev, currentNumber!]);
      setScore(prev => prev + 1);
      
      // Fill golden jewel on correct selection
      setGoldenJewels(prev => prev + 1);
      
      // Shuffle ALL numbers (both selected and unselected)
      const allNumbers = Array.from({ length: 25 }, (_, i) => i);
      const shuffledAllNumbers = [...allNumbers].sort(() => Math.random() - 0.5);
      setGridNumbers(shuffledAllNumbers);
      
      // Generate next number
      generateNextNumber();
      
      // If hint is active and time hasn't expired, continue blinking the next number
      if (isBlinking && squareUsed && !isHintTimeExpired()) {
        // Set a flag to update blinking number when currentNumber changes
        setBlinkingNumber(null); // Clear current blinking
      }
    } else {
      // Wrong selection - show purple background
      setWrongClickedNumber(clickedNumber);
      setWrongSelectCount(prev => prev + 1);
      
      // Deduct golden jewel on wrong selection (minimum 0)
      setGoldenJewels(prev => Math.max(0, prev - 1));
      
      // Hide purple background after 1 second
      setTimeout(() => {
        setWrongClickedNumber(null);
        }, 1000);
    }
  };

  // Handle square container click
  const handleSquareClick = () => {
    if (squareUsed || !gameStarted || gameWon || gameFailed || !currentNumber) return;
    
    setSquareUsed(true);
    setIsBlinking(true);
    setBlinkingNumber(currentNumber);
    setHintStartTime(Date.now());
    
    // Stop blinking after 10 seconds
    setTimeout(() => {
      setIsBlinking(false);
      setBlinkingNumber(null);
    }, 10000);
  };

  // Check if hint time has expired
  const isHintTimeExpired = () => {
    if (!hintStartTime) return false;
    return Date.now() - hintStartTime >= 10000;
  };

  // Handle option icon click
  const handleOptionClick = () => {
    if (optionUsed >= 4 || !gameStarted || gameWon || gameFailed || previousNumbers.length === 0) return;
    
    setOptionUsed(prev => prev + 1);
    setIsHighlighting(true);
    
    // Get half of the previous selected numbers
    const halfCount = Math.ceil(previousNumbers.length / 2);
    const shuffledPrevious = [...previousNumbers].sort(() => Math.random() - 0.5);
    const selectedHalf = shuffledPrevious.slice(0, halfCount);
    
    setHighlightedNumbers(selectedHalf);
  };

  // Update blinking number when currentNumber changes (for hint progression)
  useEffect(() => {
    if (isBlinking && squareUsed && currentNumber && !isHintTimeExpired()) {
      setBlinkingNumber(currentNumber);
    }
  }, [currentNumber, isBlinking, squareUsed]);

  // Load best score from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBestScore = localStorage.getItem('thinkBoxBestScore');
      if (savedBestScore) {
        setBestScore(parseInt(savedBestScore, 10));
      }
    }
  }, []);

  // Update best score whenever score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      if (typeof window !== 'undefined') {
        localStorage.setItem('thinkBoxBestScore', score.toString());
      }
    }
  }, [score, bestScore]);

  // Check win condition
  useEffect(() => {
    if (score === 25) {
      setGameWon(true);
      setTimerActive(false);
      // Calculate completed time
      if (gameStartTime) {
        const timeElapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        setCompletedTime(timeElapsed);
      }
    }
  }, [score, gameStartTime]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameFailed(true);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);



  // Show hint function
  const showHintAnswer = () => {
    if (currentNumber !== null && !gameFailed && !gameWon) {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
      }, 4000);
    }
  };

  // Show hint popup
  const showHintPopupHandler = () => {
    setShowHintPopup(true);
    setSelectedHintPackage(null);
  };

  // Handle hint package selection
  const handleHintPackageSelection = (hintType: string) => {
    setSelectedHintPackage(hintType);
  };

  // Confirm hint selection
  const confirmHintSelection = () => {
    if (selectedHintPackage) {
      // Process payment for hint packages
      handlePaymentProcess(selectedHintPackage);
    }
  };

  // Cancel hint popup
  const cancelHintPopup = () => {
    setShowHintPopup(false);
    setSelectedHintPackage(null);
  };

  const handlePaymentProcess = async (packageType: string) => {
    setPaymentInProgress(true);
    
    try {
      // Simulate payment processing (replace with actual SOL payment logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update hint count based on package
      if (packageType === '50hints') {
        setPurchasedHints(prev => prev + 50);
      } else if (packageType === '25hints') {
        setPurchasedHints(prev => prev + 25);
      } else if (packageType === '10hints') {
        setPurchasedHints(prev => prev + 10);
      }
      
      setPaymentSuccess(true);
      setShowHintPopup(false);
      setSelectedHintPackage(null);
      
      // Reset payment states after 3 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
        setPaymentInProgress(false);
      }, 3000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentInProgress(false);
    }
  };

  // Show heart hint
  const showHeartHintHandler = () => {
    if (hearts > 0 && currentNumber !== null && !gameFailed && !gameWon) {
      setHearts(hearts - 1);
      setShowHeartHint(true);
      setTimeout(() => {
        setShowHeartHint(false);
      }, 2000);
    }
  };


  return (
    <>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        @keyframes countdownPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes countdownShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        
        @keyframes countdownGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.8); }
        }
        
        @keyframes countdownFlash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes countdownSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes countdownBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-countdownPulse {
          animation: countdownPulse 0.8s ease-in-out infinite;
        }
        
        .animate-countdownShake {
          animation: countdownShake 0.3s ease-in-out infinite;
        }
        
        .animate-countdownGlow {
          animation: countdownGlow 0.6s ease-in-out infinite;
        }
        
        .animate-countdownFlash {
          animation: countdownFlash 0.5s ease-in-out infinite;
        }
        
        .animate-countdownSpin {
          animation: countdownSpin 1s linear infinite;
        }
        
        .animate-countdownBounce {
          animation: countdownBounce 0.6s ease-in-out infinite;
        }
        
          .timer-progress {
            transition: stroke-dasharray 0.3s ease-in-out;
          }
          
          @keyframes goldenRedBlink {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(234, 179, 8, 0.8), 0 0 40px rgba(234, 179, 8, 0.6), 0 0 60px rgba(239, 68, 68, 0.4);
              transform: scale(1);
            }
            25% { 
              box-shadow: 0 0 30px rgba(239, 68, 68, 0.9), 0 0 50px rgba(239, 68, 68, 0.7), 0 0 70px rgba(234, 179, 8, 0.5);
              transform: scale(1.05);
            }
            50% { 
              box-shadow: 0 0 25px rgba(234, 179, 8, 0.9), 0 0 45px rgba(234, 179, 8, 0.7), 0 0 65px rgba(239, 68, 68, 0.5);
              transform: scale(1.1);
            }
            75% { 
              box-shadow: 0 0 35px rgba(239, 68, 68, 0.9), 0 0 55px rgba(239, 68, 68, 0.7), 0 0 75px rgba(234, 179, 8, 0.5);
              transform: scale(1.05);
            }
          }
          
          @keyframes numberBlink {
            0%, 100% { 
              box-shadow: 0 0 15px rgba(234, 179, 8, 0.8), 0 0 30px rgba(234, 179, 8, 0.6), 0 0 45px rgba(239, 68, 68, 0.4);
              transform: scale(1);
            }
            25% { 
              box-shadow: 0 0 20px rgba(239, 68, 68, 0.9), 0 0 35px rgba(239, 68, 68, 0.7), 0 0 50px rgba(234, 179, 8, 0.5);
              transform: scale(1.05);
            }
            50% { 
              box-shadow: 0 0 18px rgba(234, 179, 8, 0.9), 0 0 32px rgba(234, 179, 8, 0.7), 0 0 47px rgba(239, 68, 68, 0.5);
              transform: scale(1.1);
            }
            75% { 
              box-shadow: 0 0 22px rgba(239, 68, 68, 0.9), 0 0 37px rgba(239, 68, 68, 0.7), 0 0 52px rgba(234, 179, 8, 0.5);
              transform: scale(1.05);
            }
          }
          
          .animate-goldenRedBlink {
            animation: goldenRedBlink 0.5s ease-in-out infinite;
          }
          
          .animate-numberBlink {
            animation: numberBlink 0.5s ease-in-out infinite;
          }
          
          @keyframes jewelEffect {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              filter: brightness(1) drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
            }
            25% { 
              transform: scale(1.1) rotate(-3deg);
              filter: brightness(1.2) drop-shadow(0 0 6px rgba(255, 215, 0, 0.8));
            }
            50% { 
              transform: scale(1.2) rotate(0deg);
              filter: brightness(1.4) drop-shadow(0 0 8px rgba(255, 215, 0, 1)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.6));
            }
            75% { 
              transform: scale(1.1) rotate(3deg);
              filter: brightness(1.2) drop-shadow(0 0 6px rgba(255, 215, 0, 0.8));
            }
          }
          
          .animate-jewelGlow {
            animation: jewelEffect 2s ease-in-out infinite;
          }
      `}</style>
    <div className={`min-h-screen flex flex-col relative overflow-x-hidden ${gameStarted ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950'}`}>


      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-0.5 sm:p-1 md:p-2 transition-all duration-300 relative overflow-x-hidden overflow-y-auto min-h-0 w-full">
        {/* Transparent Background Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md pointer-events-none rounded-2xl"></div>
      {/* Restart Game Button */}
      {gameStarted && !gameWon && !gameFailed && (
        <button
          onClick={initializeGame}
          className="fixed top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-50 bg-transparent hover:bg-white/20 text-gray-700 dark:text-gray-300 active:scale-95 hover:scale-110 touch-manipulation border border-gray-300/50 dark:border-gray-600/50"
          title="Restart Game"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}

      {/* Home Button - Below refresh button when game started */}
      {gameStarted && (
        <button
          onClick={() => {
            setGameStarted(false);
            setGameWon(false);
            setGameFailed(false);
            setScore(0);
            setTimeLeft(20);
            setHearts(3);
            setSelectedNumbers([]);
            setPreviousNumbers([]);
            setCurrentNumber(null);
            setWrongClickedNumber(null);
            setShowHint(false);
            setShowRedBackground(false);
            setTimerActive(false);
          }}
          className="fixed top-16 right-3 sm:top-20 sm:right-4 bg-transparent hover:bg-white/20 text-gray-700 dark:text-gray-300 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-50 active:scale-95 hover:scale-110 hover:shadow-gray-500/30 touch-manipulation border border-gray-300/50 dark:border-gray-600/50"
          title="Go Home"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      )}

      {/* Hint Popup */}
      {showHint && currentNumber !== null && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse max-w-[120px] sm:max-w-none">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium">Correct Answer:</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{numberIcons[currentNumber] || '❓'}</div>
          </div>
        </div>
      )}

      {/* Heart Hint Popup */}
      {showHeartHint && currentNumber !== null && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 bg-pink-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse max-w-[120px] sm:max-w-none">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium">💡 Hint:</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{numberIcons[currentNumber] || '❓'}</div>
          </div>
        </div>
      )}

      <div className={`${gameStarted ? 'bg-gray-800/80 backdrop-blur-md border border-gray-700/50' : 'bg-gray-800/40 backdrop-blur-md border border-gray-700/30'} rounded-2xl shadow-2xl p-2 sm:p-4 md:p-6 max-w-7xl w-full mt-1 sm:mt-2 mx-auto`}>
        <div className="text-center mb-1 sm:mb-2 w-full">
     
          
          {!gameStarted && !showNFTRewardScreen ? (
            <div className="w-full max-w-3xl mx-auto px-2 xs:px-3 sm:px-4 relative">
              {/* Animated Background Elements - Dark Grey */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-5 w-32 h-32 xs:w-40 xs:h-40 bg-gray-600/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-5 w-36 h-36 xs:w-48 xs:h-48 bg-gray-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Hero Section - Compact */}
              <div className="relative z-10 text-center mb-3 sm:mb-4 md:mb-6 pt-2 xs:pt-3 sm:pt-4 md:pt-6">
                {/* Main Title */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black mb-1.5 sm:mb-2 tracking-tight px-1">
                    <span className="block bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                      THINK BOX LITE
                    </span>
                    <span className="block text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-gray-400 mt-0.5 sm:mt-1">
                      Memory Challenge Game
                    </span>
                  </h1>
                </div>

                {/* Subtitle - Compact */}
                <p className="text-[11px] xs:text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-3 md:mb-4 px-1 xs:px-2">
                  Test your memory and concentration!{' '}
                  <span className="text-white font-semibold text-xs xs:text-sm sm:text-base md:text-lg">
                    Click on newly generated image and remember previously generated all images in your memory. Don't click previous selected images
                  </span>
                  <span className="block mt-0.5 sm:mt-1 font-medium text-gray-300 text-[10px] xs:text-xs">
                    Complete all 25 grids to win! ⚡
                  </span>
                </p>

                {/* Stats Bar - Compact */}
                <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 shadow-lg border border-gray-700/50">
                    <div className="text-base xs:text-lg sm:text-xl font-bold text-gray-300">25</div>
                    <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">Grids</div>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 shadow-lg border border-gray-700/50">
                    <div className="text-base xs:text-lg sm:text-xl font-bold text-gray-300">20s</div>
                    <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">Per grid</div>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 shadow-lg border border-gray-700/50">
                    <div className="text-base xs:text-lg sm:text-xl font-bold text-gray-300">💎</div>
                    <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">Jewels</div>
                  </div>
                </div>
              </div>

              {/* Features Grid - Compact Dark Grey */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3 mb-3 sm:mb-4 md:mb-6 relative z-10">
                {/* Feature Card 1 */}
                <div className="group relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-2 xs:p-2.5 sm:p-3 md:p-4 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-600/70">
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 xs:mb-2 bg-gray-700/80 rounded-lg shadow-md transform group-hover:scale-110 transition-all duration-300">
                      <span className="text-lg xs:text-xl sm:text-2xl">🧠</span>
                    </div>
                    <h3 className="font-bold text-xs xs:text-sm sm:text-base text-gray-300 mb-1 xs:mb-1.5">Memory Challenge</h3>
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400 leading-relaxed px-0.5">
                    Click on newly generated image and remember previously generated all images in your memory. Don't click previous selected images
                    </p>
                  </div>
                </div>

                {/* Feature Card 2 */}
                <div className="group relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-2 xs:p-2.5 sm:p-3 md:p-4 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-600/70">
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 xs:mb-2 bg-gray-700/80 rounded-lg shadow-md transform group-hover:scale-110 transition-all duration-300">
                      <span className="text-lg xs:text-xl sm:text-2xl">⚡</span>
                    </div>
                    <h3 className="font-bold text-xs xs:text-sm sm:text-base text-gray-300 mb-1 xs:mb-1.5">Quick Thinking</h3>
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                      20 seconds per grid to find the correct one
                    </p>
                  </div>
                </div>

                {/* Feature Card 3 */}
                <div className="group relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-2 xs:p-2.5 sm:p-3 md:p-4 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-600/70 sm:col-span-2 md:col-span-1">
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mb-1.5 xs:mb-2 bg-gray-700/80 rounded-lg shadow-md transform group-hover:scale-110 transition-all duration-300">
                      <span className="text-lg xs:text-xl sm:text-2xl">🎯</span>
                    </div>
                    <h3 className="font-bold text-xs xs:text-sm sm:text-base text-gray-300 mb-1 xs:mb-1.5">Perfect Sequence</h3>
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                      Complete all 25 grids to collect jewels and win
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action Section - Compact */}
              <div className="relative z-10 text-center mb-2 sm:mb-3 md:mb-4">
                <div className="inline-block relative">
                  {/* Glow effect behind button - Dark Grey */}
                  <div className="absolute inset-0 bg-gray-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  
                  {/* Main CTA Button - Dark Grey Theme */}
                  <button
                    onClick={handleStartClick}
                    className="relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white font-bold py-2 xs:py-2.5 sm:py-3 px-4 xs:px-5 sm:px-6 md:px-8 rounded-full text-xs xs:text-sm sm:text-base transition-all duration-300 shadow-xl transform active:scale-95 hover:scale-105 hover:shadow-gray-600/50 border border-gray-500/50 w-full max-w-[280px] xs:max-w-none"
                  >
                    <span className="flex items-center justify-center gap-1.5 xs:gap-2">
                      <span className="text-base xs:text-lg sm:text-xl">🚀</span>
                      <span className="text-[11px] xs:text-sm sm:text-base">START GAME</span>
                      <span className="text-base xs:text-lg sm:text-xl">🎮</span>
                    </span>
                  </button>
                </div>

                {/* Best Score Display - Compact Dark Grey */}
                {bestScore > 0 && (
                  <div className="mt-2 xs:mt-2.5 sm:mt-3 md:mt-4 inline-flex items-center gap-1.5 xs:gap-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 shadow-lg border border-gray-700/50">
                    <span className="text-yellow-400 text-sm xs:text-base">🏆</span>
                    <span className="text-[10px] xs:text-xs sm:text-sm text-gray-300">
                      Best Score: <span className="font-bold text-gray-200">{bestScore}/25</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : !gameStarted ? (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 mb-6">
                {/* Event Countdown Panel - Top */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">🌟 Event Starting Soon! 🌟</h2>
                    <p className="text-purple-100 mb-4">Get ready for the ultimate memory challenge!</p>
                    
                    {/* Countdown Timer */}
                    <div className="flex justify-center space-x-6 mb-4">
                      <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-300">15</div>
                        <div className="text-sm text-purple-100">Days Left</div>
              </div>
                      <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-lg font-bold text-yellow-300">08:42</div>
                        <div className="text-sm text-purple-100">Hours:Minutes</div>
              </div>
              </div>
                    
                    <div className="text-xs text-purple-200">
                      Event starts: <span className="font-semibold">Jan 15, 2024</span>
            </div>
                  </div>
                </div>
              </div>

              {/* Event Features */}
             

              {/* Notify Me Button */}
             
            </div>
          ) : null}

        </div>

        {gameStarted && (
          <>
            {/* Glass Style Topbar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-gray-800 border-b border-gray-700 shadow-sm">
              <div className="w-full mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3">
                <div className="flex items-center justify-between relative w-full">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-1 min-w-0">
                    <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-300 whitespace-nowrap">
                      Score: <span className="font-bold text-blue-400">{score}</span>
                    </div>
                    <div className="h-3 sm:h-4 w-px bg-gray-600 flex-shrink-0"></div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-300 whitespace-nowrap">
                      Jewels: <span className="font-bold text-yellow-400">{goldenJewels}/25</span>
                    </div>
                  </div>
                  {/* Rules Button - Center */}
                  <button
                    onClick={() => {
                      setShowRules(true);
                      setTimerActive(false);
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gray-700 border border-gray-600 rounded-lg text-[10px] xs:text-xs sm:text-sm font-medium text-gray-200 hover:bg-gray-600 active:bg-gray-500 transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation whitespace-nowrap"
                  >
                    📋 Rules
                  </button>
                  <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-400 flex-1 flex justify-end min-w-0">
                    <span className="whitespace-nowrap">{score}/25</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Game Content with Stats on Right */}
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 w-full max-w-[90rem] mx-auto pb-2 sm:pb-3 items-center lg:items-stretch justify-center px-1 sm:px-2 md:px-4 pt-10 sm:pt-12 md:pt-14 min-h-0 overflow-hidden">
              {/* Mobile Timer and Jewels Row - Above grid on mobile */}
              {!gameWon && !gameFailed && (
                <div className="flex md:hidden w-full max-w-sm mx-auto mb-3 order-1 flex-row items-center justify-center gap-3 px-2">
                  {/* Mobile Timer */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="progressGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                          {timeLeft <= 5 ? (
                            <>
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </>
                          ) : timeLeft <= 10 ? (
                            <>
                              <stop offset="0%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ea580c" />
                            </>
                          ) : (
                            <>
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="#16a34a" />
                            </>
                          )}
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="url(#progressGradientMobile)"
                        className="transition-all duration-300"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeLeft / 20)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-base font-bold ${
                        timeLeft <= 5 
                          ? 'text-red-500' 
                          : timeLeft <= 10 
                          ? 'text-orange-500'
                          : 'text-green-500'
                      }`}>
                        {timeLeft}
                      </span>
                    </div>
                  </div>
                  
                  {/* Mobile Jewels Panel */}
                  <div className="bg-gray-700 rounded-lg shadow-lg p-2 border-2 border-gray-600 flex-1 max-w-[200px] overflow-hidden flex flex-col">
                    <div className="text-center mb-1">
                      <h3 className="text-xs font-bold text-gray-200 mb-0.5">💎 Jewels</h3>
                      <div className="text-sm font-bold text-yellow-400">{goldenJewels}/25</div>
                    </div>
                    {/* Jewel Display Grid - Compact for mobile */}
                    <div className="grid grid-cols-5 gap-1">
                      {Array.from({ length: 25 }).map((_, index) => {
                        const jewelType = jewelGridTypes[index] || '💎';
                        const getJewelColor = (type: string): string => {
                          const colorMap: { [key: string]: string } = {
                            '💎': 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                            '🔷': 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                            '💍': 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                            '⭐': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                            '⭐️': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                            '💠': 'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-cyan-400/50',
                            '🔶': 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/50',
                            '💛': 'bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-yellow-500/50',
                            '🟡': 'bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-yellow-300/50',
                            '🔴': 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-400/50',
                            '🟢': 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50',
                            '🔵': 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-400/50',
                            '🟣': 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-400/50',
                            '🟠': 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-400/50',
                          };
                          if (colorMap[type]) return colorMap[type];
                          const colorPalette = [
                            'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                            'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                            'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                            'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                            'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-cyan-400/50',
                            'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/50',
                            'bg-gradient-to-br from-red-400 to-red-600 shadow-red-400/50',
                            'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50',
                          ];
                          const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                          return colorPalette[hash % colorPalette.length];
                        };
                        const jewelColor = getJewelColor(jewelType);
                        
                        return (
                          <div
                            key={index}
                            className={`aspect-square rounded flex items-center justify-center transition-all duration-300 min-w-[12px] min-h-[12px] ${
                              index < goldenJewels
                                ? `${jewelColor} shadow-sm`
                                : 'bg-transparent border border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {index < goldenJewels && (
                              <span className="text-[10px] animate-jewelGlow">{jewelType}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Desktop Left Side Jewel Card */}
              {!gameWon && !gameFailed && (
              <div className="hidden md:flex w-40 lg:w-48 flex-col gap-0.5 order-3 lg:order-0 lg:justify-start">
                <div className="bg-gray-700 rounded-lg shadow-lg p-0.5 sm:p-1 border-2 border-gray-600 h-fit max-h-[200px] sm:max-h-[240px] overflow-y-auto flex flex-col">
                  <div className="text-center mb-0.5 sticky top-0 bg-gray-700 pb-0.5 z-10 flex-shrink-0">
                    <h3 className="text-[9px] font-bold text-gray-200 mb-0">💎 Jewels</h3>
                    <div className="text-[10px] font-bold text-yellow-400">{goldenJewels}/25</div>
                  </div>
                  {/* Jewel Display Grid */}
                  <div className="grid grid-cols-5 gap-0.5 mt-0.5">
                    {Array.from({ length: 25 }).map((_, index) => {
                      const jewelType = jewelGridTypes[index] || '💎';
                      const getJewelColor = (type: string): string => {
                        const colorMap: { [key: string]: string } = {
                          '💎': 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                          '🔷': 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                          '💍': 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                          '⭐': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                          '⭐️': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                          '💠': 'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-cyan-400/50',
                          '🔶': 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/50',
                          '💛': 'bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-yellow-500/50',
                          '🟡': 'bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-yellow-300/50',
                          '🔴': 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-400/50',
                          '🟢': 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50',
                          '🔵': 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-400/50',
                          '🟣': 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-400/50',
                          '🟠': 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-400/50',
                        };
                        if (colorMap[type]) return colorMap[type];
                        const colorPalette = [
                          'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                          'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                          'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                          'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                          'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-cyan-400/50',
                          'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/50',
                          'bg-gradient-to-br from-red-400 to-red-600 shadow-red-400/50',
                          'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50',
                        ];
                        const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        return colorPalette[hash % colorPalette.length];
                      };
                      const jewelColor = getJewelColor(jewelType);
                      
                      return (
                        <div
                          key={index}
                          className={`aspect-square rounded flex items-center justify-center transition-all duration-300 min-w-[8px] min-h-[8px] sm:min-w-[10px] sm:min-h-[10px] ${
                            index < goldenJewels
                              ? `${jewelColor} shadow-sm`
                              : 'bg-transparent border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {index < goldenJewels && (
                            <span className="text-[8px] sm:text-[10px] animate-jewelGlow">{jewelType}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[6px] text-center text-gray-400 mt-0.5 sticky bottom-0 bg-gray-700 pt-0.5 flex-shrink-0">
                    +1/-1
                  </div>
                </div>
              </div>
              )}
              
              {/* Main Game Area */}
              <div className="flex-1 flex flex-col items-center justify-center order-2 lg:order-1 w-full max-w-full pt-2 sm:pt-4 relative mx-auto px-1 sm:px-2">
            {gameWon ? (
              <div className="w-full max-w-md mx-auto px-2 xs:px-3 sm:px-4 flex items-center justify-center">
                <div className="bg-gray-700 rounded-xl shadow-lg border border-gray-600 p-2 xs:p-2.5 sm:p-3 md:p-4 w-full">
                  <div className="text-center py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-1 xs:px-2">
                <div className="text-xl xs:text-2xl sm:text-3xl mb-1 xs:mb-1.5">🎉</div>
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-green-400 mb-1 xs:mb-1.5">
                  Congratulations!
                </h2>
                <p className="text-xs xs:text-sm text-gray-300 mb-2 xs:mb-2.5 sm:mb-3">
                  You completed the sequence! Perfect memory!
                </p>
                <div className="mb-2 xs:mb-2.5 sm:mb-3">
                  <div className="inline-block bg-gray-800 px-2 xs:px-2.5 sm:px-3 md:px-4 py-1.5 xs:py-2 rounded-lg border border-gray-600 shadow-md max-w-full w-full">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-1.5 xs:gap-2 mb-2 xs:mb-2.5 sm:mb-3">
                      <div className="bg-blue-900/50 rounded-lg p-1.5 xs:p-2 border border-blue-700">
                        <div className="text-[9px] xs:text-[10px] text-blue-300 mb-0.5">Score</div>
                        <div className="text-sm xs:text-base font-bold text-blue-400">{score}</div>
                      </div>
                      <div className="bg-red-900/50 rounded-lg p-1.5 xs:p-2 border border-red-700">
                        <div className="text-[9px] xs:text-[10px] text-red-300 mb-0.5">Wrong Selects</div>
                        <div className="text-sm xs:text-base font-bold text-red-400">{wrongSelectCount}</div>
                      </div>
                    </div>
                    <div className="text-lg xs:text-xl mb-0.5 xs:mb-1">💎</div>
                    <div className="text-sm xs:text-base sm:text-lg font-bold text-yellow-400 mb-0.5 xs:mb-1">
                      {goldenJewels} Jewels Collected
                    </div>
                    <div className="text-[9px] xs:text-[10px] text-yellow-300 mb-1.5 xs:mb-2">
                      Out of 25 total
                    </div>
                    {/* Collected Jewels Grid */}
                    {goldenJewels > 0 && (
                      <div className="grid grid-cols-5 gap-1 mt-2 max-w-xs mx-auto px-1">
                        {Array.from({ length: goldenJewels }).map((_, index) => {
                          const jewelType = jewelGridTypes[index] || '💎';
                          const getJewelColor = (type: string): string => {
                            const colorMap: { [key: string]: string } = {
                              '💎': 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                              '🔷': 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                              '💍': 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                              '⭐': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                              '⭐️': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                              '💠': 'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-cyan-400/50',
                              '🔶': 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/50',
                              '🔴': 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-400/50',
                              '🟢': 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50',
                              '🔵': 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-400/50',
                              '🟣': 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-400/50',
                              '🟠': 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-400/50',
                            };
                            if (colorMap[type]) return colorMap[type];
                            const colorPalette = [
                              'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                              'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                              'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                            ];
                            const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            return colorPalette[hash % colorPalette.length];
                          };
                          const jewelColor = getJewelColor(jewelType);
                          return (
                            <div
                              key={index}
                              className={`aspect-square rounded flex items-center justify-center transition-all duration-300 min-w-[12px] min-h-[12px] sm:min-w-[14px] sm:min-h-[14px] ${jewelColor} shadow-sm`}
                            >
                              <span className="text-[10px] sm:text-xs animate-jewelGlow">{jewelType}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-1.5 xs:py-2 sm:py-2.5 px-3 xs:px-4 sm:px-6 rounded-full text-xs xs:text-sm transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95 hover:scale-105 touch-manipulation w-full max-w-[200px] xs:max-w-none"
                >
                  🎮 Play Again
                </button>
                  </div>
                </div>
              </div>
            ) : gameFailed ? (
              <div className="w-full max-w-md mx-auto px-2 xs:px-3 sm:px-4 flex items-center justify-center">
                <div className="bg-gray-700 rounded-xl shadow-lg border border-gray-600 p-2 xs:p-2.5 sm:p-3 md:p-4 w-full">
                  <div className="text-center py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-1 xs:px-2">
                <div className="text-xl xs:text-2xl sm:text-3xl mb-1 xs:mb-1.5">💥</div>
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-red-400 mb-1 xs:mb-1.5">
                  Game Over!
                </h2>
                <p className="text-xs xs:text-sm text-gray-300 mb-2 xs:mb-2.5 sm:mb-3">
                  {timeLeft === 0 ? 'Time ran out!' : 'You selected the wrong number.'}
                </p>
                <div className="mb-2 xs:mb-2.5 sm:mb-3">
                  <div className="inline-block bg-gray-800 px-2 xs:px-2.5 sm:px-3 md:px-4 py-1.5 xs:py-2 rounded-lg border border-gray-600 shadow-md max-w-full w-full">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-1.5 xs:gap-2 mb-2 xs:mb-2.5 sm:mb-3">
                      <div className="bg-blue-900/50 rounded-lg p-1.5 xs:p-2 border border-blue-700">
                        <div className="text-[9px] xs:text-[10px] text-blue-300 mb-0.5">Score</div>
                        <div className="text-sm xs:text-base font-bold text-blue-400">{score}</div>
                      </div>
                      <div className="bg-red-900/50 rounded-lg p-1.5 xs:p-2 border border-red-700">
                        <div className="text-[9px] xs:text-[10px] text-red-300 mb-0.5">Wrong Selects</div>
                        <div className="text-sm xs:text-base font-bold text-red-400">{wrongSelectCount}</div>
                      </div>
                    </div>
                    <div className="text-lg xs:text-xl mb-0.5 xs:mb-1">💎</div>
                    <div className="text-sm xs:text-base sm:text-lg font-bold text-yellow-400 mb-0.5 xs:mb-1">
                      {goldenJewels} Jewels Collected
                    </div>
                    <div className="text-[9px] xs:text-[10px] text-yellow-300 mb-1.5 xs:mb-2">
                      Out of 25 total
                    </div>
                    {/* Collected Jewels Grid */}
                    {goldenJewels > 0 && (
                      <div className="grid grid-cols-5 gap-1 mt-2 max-w-xs mx-auto px-1">
                        {Array.from({ length: goldenJewels }).map((_, index) => {
                          const jewelType = jewelGridTypes[index] || '💎';
                          const getJewelColor = (type: string): string => {
                            const colorMap: { [key: string]: string } = {
                              '💎': 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                              '🔷': 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                              '💍': 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                              '⭐': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                              '⭐️': 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-yellow-300/50',
                              '💠': 'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-cyan-400/50',
                              '🔶': 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/50',
                              '🔴': 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-400/50',
                              '🟢': 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50',
                              '🔵': 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-400/50',
                              '🟣': 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-400/50',
                              '🟠': 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-400/50',
                            };
                            if (colorMap[type]) return colorMap[type];
                            const colorPalette = [
                              'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-400/50',
                              'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-400/50',
                              'bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/50',
                            ];
                            const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            return colorPalette[hash % colorPalette.length];
                          };
                          const jewelColor = getJewelColor(jewelType);
                          return (
                            <div
                              key={index}
                              className={`aspect-square rounded flex items-center justify-center transition-all duration-300 min-w-[12px] min-h-[12px] sm:min-w-[14px] sm:min-h-[14px] ${jewelColor} shadow-sm`}
                            >
                              <span className="text-[10px] sm:text-xs animate-jewelGlow">{jewelType}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-1.5 xs:py-2 sm:py-2.5 px-3 xs:px-4 sm:px-6 rounded-full text-xs xs:text-sm transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95 hover:scale-105 touch-manipulation w-full max-w-[200px] xs:max-w-none"
                >
                  🔄 Try Again
                </button>
                  </div>
                </div>
              </div>
            ) : !gameWon && !gameFailed ? (
              <div className="flex flex-col items-center justify-center w-full space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 py-1 px-1 sm:px-2 md:px-4 mx-auto max-w-full">
                {/* Number Grid */}
                <div className="flex justify-center items-center w-full max-w-full overflow-x-auto pb-2 mx-auto px-2 sm:px-0">
                  <div className={`grid grid-cols-5 gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 w-fit transition-all duration-300 ${
                    showRedBackground ? 'bg-red-500 bg-opacity-20 p-2 sm:p-4 rounded-lg' : ''
                  }`}>
                  {gridNumbers.map((number, index) => {
                    const isSelected = selectedNumbers.includes(number);
                    const isCurrent = number === currentNumber;
                    const isPrevious = previousNumbers.includes(number);
                    const isWrongClicked = wrongClickedNumber === number;
                    const shouldShowNumber = isSelected || isCurrent || isPrevious;
                    const isClickable = shouldShowNumber && !gameFailed && !gameWon;
                    
                    return (
                      <button
                        key={`${number}-${index}`}
                        onClick={() => isClickable ? handleNumberClick(number) : null}
                        disabled={!isClickable}
                        className={`
                          aspect-square flex items-center justify-center text-xs sm:text-sm md:text-base font-bold rounded sm:rounded-md md:rounded-lg transition-all duration-300 transform 
                          min-w-[48px] min-h-[48px] xs:min-w-[50px] xs:min-h-[50px] sm:min-w-[52px] sm:min-h-[52px] md:min-w-[56px] md:min-h-[56px] lg:min-w-[60px] lg:min-h-[60px]
                          w-full max-w-[62px] border-2 border-gray-600 active:scale-95 hover:shadow-lg touch-manipulation mx-auto
                          ${isWrongClicked
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-gray-600'
                            : isSelected
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-110 hover:rotate-3 cursor-pointer shadow-lg border-gray-600'
                            : isCurrent
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-110 cursor-pointer shadow-lg border-gray-600'
                            : isPrevious
                            ? 'bg-gray-700 text-gray-300 hover:scale-105 cursor-pointer border-gray-600'
                            : 'bg-gray-800 border-gray-600 cursor-not-allowed'
                          }
                          ${!isClickable ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
                          ${blinkingNumber === number ? 'animate-numberBlink' : ''}
                          ${highlightedNumbers.includes(number) ? 'ring-4 ring-red-500 bg-red-900/40 animate-pulse border-gray-600' : ''}
                        `}
                      >
                        {shouldShowNumber ? (
                          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{numberIcons[number] || '❓'}</span>
                        ) : (
                          <span className="text-yellow-500 font-bold text-sm sm:text-base md:text-lg lg:text-xl">?</span>
                        )}
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>
            ) : null}
              </div>


              {/* Right Side Circular Progress Indicator - Desktop */}
              {!gameWon && !gameFailed && (
                <div className="hidden md:flex w-20 lg:w-24 flex-col items-center justify-center order-3 lg:order-2">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                    <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                      {/* Gradient definitions */}
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          {timeLeft <= 5 ? (
                            <>
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </>
                          ) : timeLeft <= 10 ? (
                            <>
                              <stop offset="0%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ea580c" />
                            </>
                          ) : (
                            <>
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="#16a34a" />
                            </>
                          )}
                        </linearGradient>
                      </defs>
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      {/* Progress circle with gradient */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="url(#progressGradient)"
                        className="transition-all duration-300"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeLeft / 20)}`}
                      />
                    </svg>
                    {/* Time text in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xs sm:text-sm lg:text-base font-bold ${
                        timeLeft <= 5 
                          ? 'text-red-500' 
                    : timeLeft <= 10 
                          ? 'text-orange-500'
                          : 'text-green-500'
                      }`}>
                        {timeLeft}
                      </span>
                    </div>
                    </div>
                    </div>
              )}

            </div>

          </>
        )}
      </div>
      </div>

      {/* Google Ad Bar - Page Bottom - Only show during active gameplay, hidden on front page and game over */}
      {gameStarted && !gameWon && !gameFailed ? (
        <div className="w-full bg-gray-800 border-t border-gray-700 shadow-lg mt-auto flex-shrink-0 mx-auto">
          <div className="w-full max-w-[90rem] mx-auto px-1 sm:px-2 md:px-4 py-1 sm:py-1.5 md:py-2">
            <div className="text-center w-full">
              <p className="text-[8px] xs:text-[9px] text-gray-400 mb-0.5 sm:mb-1">Advertisement</p>
              <div className="border border-gray-600 rounded-lg p-0.5 sm:p-1 bg-gray-700 w-full overflow-hidden mx-auto">
                <GoogleAdsense
                  adSlot="2147719014"
                  adFormat="horizontal"
                  className="w-full"
                  responsive={true}
                  style={{ width: '100%', minHeight: '70px', maxHeight: '90px', maxWidth: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}


      {/* Hint Popup Modal */}
      {showHintPopup && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold text-center">💡 Get a Hint</h2>
              <p className="text-center text-pink-100 mt-2">Choose your hint package</p>
            </div>

            {/* Hint Options */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 50 Hints - 0.01 SOL */}
                <div className={`border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 ${
                  selectedHintPackage === '50hints' 
                    ? 'border-yellow-600 bg-yellow-50 shadow-lg' 
                    : 'border-yellow-400'
                }`}
                     onClick={() => handleHintPackageSelection('50hints')}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💎</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">50 Hints</h3>
                    <div className="text-2xl font-bold text-yellow-600 mb-2">0.01 SOL</div>
                    <p className="text-sm text-gray-600">Premium hint package</p>
                    <div className="mt-3 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Best Value
                    </div>
                  </div>
                </div>

                {/* 25 Hints - 0.005 SOL */}
                <div className={`border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 ${
                  selectedHintPackage === '25hints' 
                    ? 'border-blue-600 bg-blue-50 shadow-lg' 
                    : 'border-blue-400'
                }`}
                     onClick={() => handleHintPackageSelection('25hints')}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">25 Hints</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">0.005 SOL</div>
                    <p className="text-sm text-gray-600">Standard hint package</p>
                    <div className="mt-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  </div>
                </div>

                {/* 10 Hints - 0.001 SOL */}
                <div className={`border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 ${
                  selectedHintPackage === '10hints' 
                    ? 'border-green-600 bg-green-50 shadow-lg' 
                    : 'border-green-400'
                }`}
                     onClick={() => handleHintPackageSelection('10hints')}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">10 Hints</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">0.001 SOL</div>
                    <p className="text-sm text-gray-600">Basic hint package</p>
                    <div className="mt-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Budget
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t">
              <div className="flex gap-4">
                <button
                  onClick={cancelHintPopup}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmHintSelection}
                  disabled={!selectedHintPackage}
                  className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform ${
                    selectedHintPackage
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Rules Popup */}
      {showRules && (
        <div 
          className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowRules(false);
            if (gameStarted && !gameWon && !gameFailed && timeLeft > 0) {
              setTimerActive(true);
            }
          }}
        >
          <div 
            className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full border border-white/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-white/20 backdrop-blur-sm border-b border-white/30 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-inner">
                    <span className="text-lg">📋</span>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Game Rules</h2>
                    <p className="text-xs text-gray-500">How to play</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowRules(false);
                    if (gameStarted && !gameWon && !gameFailed && timeLeft > 0) {
                      setTimerActive(true);
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Rules Content */}
            <div className="p-3 sm:p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">1</div>
                  <p className="text-xs sm:text-sm text-gray-700 pt-0.5">Click on newly generated image and remember previously generated all images in your memory. Don't click previous selected images.</p>
                </div>
                
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">2</div>
                  <p className="text-xs sm:text-sm text-gray-700 pt-0.5">You have <span className="font-semibold text-gray-900">20 seconds each</span> to complete all 25 Grids.</p>
                </div>
                
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">3</div>
                  <p className="text-xs sm:text-sm text-gray-700 pt-0.5">Correct answer: <span className="font-semibold text-green-600">+1 score</span> and <span className="font-semibold text-yellow-600">+1 jewel</span>.</p>
                </div>
                
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-red-50 to-rose-50 border border-red-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">4</div>
                  <p className="text-xs sm:text-sm text-gray-700 pt-0.5">Wrong answer: <span className="font-semibold text-red-600">-1 score</span> and <span className="font-semibold text-red-600">-1 jewel</span>.</p>
                </div>
                
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">5</div>
                  <p className="text-xs sm:text-sm text-gray-700 pt-0.5"><span className="font-bold text-yellow-600">💎 Collect all 25 golden jewels to win!</span></p>
                </div>
                
               
              </div>
            </div>
            
            {/* Close Button */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <button
                onClick={() => {
                  setShowRules(false);
                  if (gameStarted && !gameWon && !gameFailed && timeLeft > 0) {
                    setTimerActive(true);
                  }
                }}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}