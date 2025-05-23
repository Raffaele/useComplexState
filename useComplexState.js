import { useState, useCallback } from "react";

const useComplexState = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateState = useCallback(
    function (keyOrValue, value) {
      if (arguments.length === 1) {
        setState(keyOrValue);
        return;
      }
      const valueToSet =
        typeof value === "function" ? value(state[keyOrValue]) : value;
      setState((prevState) => {
        return {
          ...prevState,
          [keyOrValue]: valueToSet,
        };
      });
    },
    [setState]
  );

  return [state, updateState];
};

export default useComplexState;
