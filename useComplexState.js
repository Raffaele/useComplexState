import { useState, useCallback } from "react";

const useComplexState = (initialState) => {
  const [state, setState] = useState(initialState);

  const forceState = useCallback((newState) => setState(newState), [setState]);

  const updateState = useCallback(
    (key, value) => {
      setState((prevState) => {
        return {
          ...prevState,
          [key]: value,
        };
      });
    },
    [setState]
  );

  return [state, updateState, forceState];
};

export default useComplexState;
