type SetterArgument<Value> = Value | ((value: Value) => Value);
type SetFullState<State> = (state: SetterArgument<State>) => void;

type SetComplexState<State> = {
  (state: SetterArgument<State>): void;
  <Key extends keyof State>(key: Key, value: SetterArgument<State[Key]>): void;
}

type UseComplexStateReturn<State> = [
  State,
  SetComplexState<State>
];

declare function useComplexState<State>(initialState: State): UseComplexStateReturn<State>;
export default useComplexState;
