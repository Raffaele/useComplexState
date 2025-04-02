# useComplexState REACT HOOK

---

### An alternative to useReducer for complex state management

## Installation

`npm i https://github.com/Raffaele/useComplexState.git`

## Usage

```js
import useComplexState from "use-complex-state";

function MyComponent() {
  // State initialization
  const [state, partialSetter, fullSetter] = useComplexState({
    fName: 'Foo',
    lName: 'Bar',
    age: 23,
  });

  // Value read
  console.log(state);

  // Value update
  partialSetter('lName', 'Baz');
  partialSetter('age', 32);
```

## Why useComplexState instead of useReducer

We can achieve the same result with less code.

For example, if using `useReducer` to get the same result as the code written before with `useComplexState` we need the following:

```js
import { useReducer } from 'react';

// Reducer creation (not needed in useComplexState)
function reducer(state, action) {
  // Generally we store the possible action types in constants (extra code)
  if (action.type === 'UPDATE_F_NAME') {
    return {...state, fName: action.payload}
  }
  if (action.type === 'UPDATE_L_NAME') {
    return {...state, lName: action.payload}
  }
  if (action.type === 'UPDATE_AGE') {
    return {...state, age: action.payload}
  }
  return state;
}

function MyComponent() {
  // State initialization
  const [state, dispatch] = useReducer(reducer, { fName: 'Foo', lName: 'Bar', age: 23 });

  // Value read
  console.log(state);

  // Value update
  dispatch({type: 'UPDATE_L_NAME', payload: 'Baz'});
  dispatch({type: 'UPDATE_AGE', payload: 32});
```

## This hook allow to set values with callbacks

```js
const [state, partialSetter] = useComplexState({
  firstName: "Foo",
  lastName: "Bar",
  age: 23,
});

// After this command the new state.firstName will be "FOO" (upper case)
partialSetter("firstName", (oldFristName) => {
  // The oldFirstName is "Foo"
  console.log(oldFirstname);
  return oldFirstName.toUpperCase();
});
```

## Typescript full support

If using typescript the setter recognizes the keys and the values of the type we are using as visible in the following example.

```ts
// The type of the state is {fName: string, lName: string, age: number}
const [state, setter] = useComplexState({
  fName: "Foo",
  lName: "Bar",
  age: 23,
});

// This will generate a typescript error as nickName is not a valid key of the state
setter("nickName", "new name");

// This will generate a typescript error as the type of fName is a string, not a number
setter("fName", 23);

// This will generate a typescript error as the callback return type does not match with the type of "fName"
setter("fName", () => 34);

// This works
setter("age", 23);

// This works
setter("age", (oldAge) => oldAge + 1);

// We can force the type of the state:

type MyState = {
  fName: string;
  lName: string;
  age: number;
  nickName?: string;
};

const [typedState, typedSetter] = useComplexState<MyState>({
  fName: "Foo",
  lName: "Bar",
  age: 23,
});

// This works as nickName is now a valid key for the state
typedSetter("nickName", "new name");
```

## Hard reset

The hook returns a 3rd param: a method to update the full value of the state

```ts
const [state, setter, hardSetter] = useComplexState({
  fName: "Foo",
  lName: "Bar",
  age: 23,
});

// In typescript the type of the new state must match the one passed in the state initialization
hardSetter({
  fName: "FooAgain",
  lName: "Baz",
  age: 33,
});

/* Now the state is:
{
  fName: "FooAgain",
  lName: "Baz",
  age: 33,
}
*/

// Hard reset works with callbacks as well
hardSetter((oldState) => {
  return {
    ...oldState,
    age: oldState.age + 1,
  };
});
```
