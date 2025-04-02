import { useState, useCallback } from "react";

const useComplexState = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateState = useCallback(
    (key, value) => {
      const valueToSet =
        typeof value === "function" ? value(state[key]) : value;
      setState((prevState) => {
        return {
          ...prevState,
          [key]: valueToSet,
        };
      });
    },
    [setState]
  );

  return [state, updateState, setState];
};

export default useComplexState;
