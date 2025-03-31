type Setter<Value> = (value: Value) => void;

type SetPartialState<State> = <Key extends keyof State>(key: Key, value: State[Key]) => void;

type UseComplexStateReturn<State> = [
  State,
  SetPartialState<State>,
  Setter<State>
]

declare function useComplexState<State>(initialState: State): UseComplexStateReturn<State>;
export default useComplexState;
