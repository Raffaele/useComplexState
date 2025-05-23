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
  const [state, partialSetter] = useComplexState({
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

For example, if using `useReducer` to get the same result as the code written before with `useComplexState` we need more boilerplate:

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

// After this instruction the new state.firstName will be "FOO" (upper case)
partialSetter("firstName", (oldFirstName) => {
  // The oldFirstName is "Foo"
  console.log(oldFirstname);
  return oldFirstName.toUpperCase();
});
```

## Typescript full support

If using typescript the setter recognizes the keys and the values of the type we are using as visible in the following example.

```ts
/* The type of the state is:
   {fName: string, lName: string, age: number}
*/
const [state, setter] = useComplexState({
  fName: "Foo",
  lName: "Bar",
  age: 23,
});

// TS error: nickName is not a valid key of the state
setter("nickName", "new name");

// TS error: fName's type is string, not number
setter("fName", 23);

// TS error: the callback return type does not match with "fName"
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

// This works: nickName is now a valid key for the state
typedSetter("nickName", "new name");
```

## Hard reset

The setter can be used to update the full value of the state if the developer does not send the key as first param

```ts
const [state, setter] = useComplexState({
  fName: "Foo",
  lName: "Bar",
  age: 23,
});

// In TS the type of the new state must match the one passed in the state initialization
setter({
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
setter((oldState) => {
  return {
    ...oldState,
    age: oldState.age + 1,
  };
});
```
