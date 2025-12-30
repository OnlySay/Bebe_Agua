import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addGlass, removeGlass, reset, setGlasses, setGoal } from '@/store/slices/waterSlice';

export function useWater() {
  const dispatch = useAppDispatch();

  
  return {  
    setGoal: (goal: number) => {
      dispatch(setGoal(goal));
    },
    setGlasses: (glasses: number) => {
      dispatch(setGlasses(glasses));
    },
    addGlass: () => {
      dispatch(addGlass());
    },
    removeGlass: () => {
      dispatch(removeGlass());
    },
    reset: () => {
      dispatch(reset());
    },
    goal: useAppSelector((state) => state.water.goal),
    glasses: useAppSelector((state) => state.water.glasses),
  }
}
