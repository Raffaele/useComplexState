import { renderHook, act } from "@testing-library/react";
import useComplexState from "./useComplexState";

describe("useComplexState Hook", () => {
  const INITIAL_STATE = { static: { staticValue: 'static' }, dynamic: { dynamicValue: 'dynamic' } };
  const setup = () => {
    const { result } = renderHook(() => useComplexState(INITIAL_STATE));
    return result;
  };

  it("should initialize with correct state", () => {
    const { current: [state] } = setup();
    expect(state).toEqual(INITIAL_STATE);
  });

  it("should update state correctly", () => {
    const NEW_DYNAMIC_STATE = { dynamicValue: 'new value' };
    const result = setup();

    const [, setState] = result.current;

    act(() => {
      setState('dynamic', NEW_DYNAMIC_STATE);
    });

    expect(result.current[0]).toEqual({
      static: INITIAL_STATE.static,
      dynamic: NEW_DYNAMIC_STATE
    });
  });

  it('should change completely the state', () => {
    const UPDATED_STATE = {
      static: { staticValue: 'new static value' },
      dynamic: { dynamicValue: 'new dynamic value' }
    };
    const result = setup();

    const [, , forceState] = result.current;

    act(() => {
      forceState(UPDATED_STATE);
    });

    expect(result.current[0]).toEqual(UPDATED_STATE);
  })
});
