import waterReducer, { addGlass, removeGlass, reset, setGoal, setGlasses } from '@/store/slices/waterSlice';

describe('waterSlice', () => {
  const initialState = {
    glasses: 0,
    goal: 12,
  };

  it('should return the initial state', () => {
    expect(waterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addGlass', () => {
    const actual = waterReducer(initialState, addGlass());
    expect(actual.glasses).toEqual(1);
  });

  it('should handle multiple addGlass', () => {
    let actual = waterReducer(initialState, addGlass());
    actual = waterReducer(actual, addGlass());
    actual = waterReducer(actual, addGlass());
    expect(actual.glasses).toEqual(3);
  });

  it('should handle removeGlass', () => {
    const stateWithGlasses = { glasses: 5, goal: 12 };
    const actual = waterReducer(stateWithGlasses, removeGlass());
    expect(actual.glasses).toEqual(4);
  });

  it('should not go below 0 when removing glasses', () => {
    const actual = waterReducer(initialState, removeGlass());
    expect(actual.glasses).toEqual(0);
  });

  it('should handle reset', () => {
    const stateWithGlasses = { glasses: 10, goal: 12 };
    const actual = waterReducer(stateWithGlasses, reset());
    expect(actual.glasses).toEqual(0);
    expect(actual.goal).toEqual(12); // Goal should remain unchanged
  });

  it('should handle setGoal', () => {
    const actual = waterReducer(initialState, setGoal(15));
    expect(actual.goal).toEqual(15);
    expect(actual.glasses).toEqual(0); // Glasses should remain unchanged
  });

  it('should handle setGlasses', () => {
    const actual = waterReducer(initialState, setGlasses(8));
    expect(actual.glasses).toEqual(8);
    expect(actual.goal).toEqual(12); // Goal should remain unchanged
  });
});

