import { createContext, ReactNode, useContext, useState } from 'react';

interface WaterContextType {
  glasses: number;
  goal: number;
  addGlass: () => void;
  removeGlass: () => void;
  reset: () => void;
  setGoal: (goal: number) => void;
}

const WaterContext = createContext<WaterContextType | null>(null);

interface WaterProviderProps {
  children: ReactNode;
}

export function WaterProvider({ children }: WaterProviderProps) {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoalState] = useState(12); 

  const addGlass = () => {
    setGlasses(prev => prev + 1);
  };

  const removeGlass = () => {
    setGlasses(prev => (prev > 0 ? prev - 1 : 0));
  };

  const reset = () => {
    setGlasses(0);
  };

  const setGoal = (newGoal: number) => {
    setGoalState(newGoal);
  };

  // Pasamos todo por el value del Provider
  return (
    <WaterContext.Provider
      value={{
        glasses,
        goal,
        addGlass,
        removeGlass,
        reset,
        setGoal,
      }}
    >
      {children}
    </WaterContext.Provider>
  );
}

export function useWater() {
  const context = useContext(WaterContext);

  if (!context) {
    throw new Error('useWater debe usarse dentro de un WaterProvider');
  }

  return context;
}

