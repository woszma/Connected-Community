import React, { useState, useEffect } from 'react';
import { Screen, HistoryEvent } from './types';
import { PROMPT_POOL, INITIAL_HISTORY_SEED } from './constants';
import { Landing } from './components/screens/Landing';
import { Returning } from './components/screens/Returning';
import { NewInput } from './components/screens/NewInput';
import { Explanation } from './components/screens/Explanation';
import { HistoryView } from './components/screens/History';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LANDING);
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  
  // Temporary state for the flow
  const [currentNewHolderName, setCurrentNewHolderName] = useState<string>('');
  const [currentExplanationData, setCurrentExplanationData] = useState<{
    giverName: string;
    previousPromptText: string;
    nextPromptText: string;
  } | null>(null);

  // Initialize Data (Simulate Database Fetch)
  useEffect(() => {
    const saved = localStorage.getItem('nfc_keychain_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      setHistory(INITIAL_HISTORY_SEED);
    }
  }, []);

  // Save to local storage whenever history changes (Simulate Database Write)
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('nfc_keychain_history', JSON.stringify(history));
    }
  }, [history]);

  // Derived state
  const lastEvent = history[history.length - 1];
  const lastHolderName = lastEvent ? lastEvent.toName : 'Unknown';

  // --- Handlers ---

  const handleNewHolderSubmit = (name: string) => {
    // 1. Pick a random prompt for the NEXT person (No-repeat logic could be added here)
    const randomIndex = Math.floor(Math.random() * PROMPT_POOL.length);
    const nextPrompt = PROMPT_POOL[randomIndex];

    // 2. Prepare the previous prompt text (The reason THIS person received it)
    // If this is the seed, the 'nextPromptKey' of the previous event is what brought this person here.
    // However, for simplicity based on the schema:
    // Event N stores: from(N-1), to(N), prompt(Reason N-1 gave to N).
    
    // In our seed data: Seed event has `nextPromptText` as 'Most Worried'.
    // So if I am the NEW person, I received it because of `lastEvent.nextPromptText`.
    
    const reasonIReceivedIt = lastEvent.nextPromptText || '命運的安排';

    // 3. Create New Event
    const newEvent: HistoryEvent = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      fromName: lastHolderName,
      toName: name,
      promptKey: lastEvent.nextPromptKey || 'UNKNOWN', // The key that caused this transfer
      promptText: reasonIReceivedIt,
      nextPromptKey: nextPrompt.key, // The key for the FUTURE transfer
      nextPromptText: nextPrompt.text
    };

    // 4. Update State
    setHistory(prev => [...prev, newEvent]);
    setCurrentNewHolderName(name);
    setCurrentExplanationData({
      giverName: lastHolderName,
      previousPromptText: reasonIReceivedIt,
      nextPromptText: nextPrompt.text
    });

    // 5. Navigate
    setCurrentScreen(Screen.EXPLANATION);
  };

  // --- Render Logic ---

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LANDING:
        return (
          <Landing 
            lastHolderName={lastHolderName}
            onYes={() => setCurrentScreen(Screen.RETURNING)}
            onNo={() => setCurrentScreen(Screen.NEW_INPUT)}
          />
        );
      
      case Screen.RETURNING:
        return (
          <Returning 
            onViewHistory={() => setCurrentScreen(Screen.HISTORY)} 
          />
        );
      
      case Screen.NEW_INPUT:
        return (
          <NewInput 
            onSubmit={handleNewHolderSubmit} 
          />
        );

      case Screen.EXPLANATION:
        if (!currentExplanationData) return null;
        return (
          <Explanation
            currentName={currentNewHolderName}
            giverName={currentExplanationData.giverName}
            previousPromptText={currentExplanationData.previousPromptText}
            nextPromptText={currentExplanationData.nextPromptText}
            onViewHistory={() => setCurrentScreen(Screen.HISTORY)}
          />
        );

      case Screen.HISTORY:
        return (
          <HistoryView 
            events={history} 
            onBackHome={() => setCurrentScreen(Screen.LANDING)}
          />
        );

      default:
        return <div>Error: Unknown screen</div>;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-amber-100">
      <div className="max-w-md mx-auto px-6 py-6 min-h-screen flex flex-col">
        {renderScreen()}
      </div>
      
      {/* Footer for Dev Context */}
      <div className="fixed bottom-2 right-2 opacity-30 hover:opacity-100 transition-opacity">
        <span className="text-[10px] bg-stone-200 px-2 py-1 rounded text-stone-500">
           Demo Mode (LocalStorage)
        </span>
      </div>
    </div>
  );
}

export default App;