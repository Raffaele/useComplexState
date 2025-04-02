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

  describe('partial setter', () => {
    it("should update state correctly when user passes a value", () => {
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

    it("should update state correctly when user passes a callback", () => {
      const NEW_DYNAMIC_STATE = { dynamicValue: 'new value' };
      const result = setup();

      const [, setState] = result.current;

      act(() => {
        setState('dynamic', () => NEW_DYNAMIC_STATE);
      });

      expect(result.current[0]).toEqual({
        static: INITIAL_STATE.static,
        dynamic: NEW_DYNAMIC_STATE
      });
    });

    it('should pass the old state to the callback', (completed) => {
      const NEW_DYNAMIC_STATE = { dynamicValue: 'new value' };
      const result = setup();

      const [, setState] = result.current;

      act(() => {
        setState('dynamic', (oldState) => {
          expect(oldState).toEqual(INITIAL_STATE.dynamic);
          completed();
          return NEW_DYNAMIC_STATE;
        });
      });
    });
  });

  describe('full setter', () => {
    const UPDATED_STATE = {
      static: { staticValue: 'new static value' },
      dynamic: { dynamicValue: 'new dynamic value' }
    };
    it('should change completely the state when user passes a value', () => {
      const result = setup();
      const [, , forceState] = result.current;

      act(() => {
        forceState(UPDATED_STATE);
      });

      expect(result.current[0]).toEqual(UPDATED_STATE);
    });

    it('should change completely the state when user passes a callback', () => {
      const result = setup();
      const [, , forceState] = result.current;

      act(() => {
        forceState(() => UPDATED_STATE);
      });

      expect(result.current[0]).toEqual(UPDATED_STATE);
    });

    it('should pass the old state to the callback', (completed) => {
      const result = setup();
      const [, , forceState] = result.current;

      act(() => {
        forceState((oldState) => {
          expect(oldState).toBe(INITIAL_STATE);
          completed();
          return UPDATED_STATE;
        });
      });
    });
  });
});
