type SetterArgument<Value> = Value | ((value: Value) => Value);
type SetFullState<State> = (state: SetterArgument<State>) => State;
type SetPartialState<State> = <Key extends keyof State>(key: Key, value: SetterArgument<State[Key]>) => void;

type UseComplexStateReturn<State> = [
  State,
  SetPartialState<State>,
  SetFullState<State>
];

declare function useComplexState<State>(initialState: State): UseComplexStateReturn<State>;
export default useComplexState;
