import { useState } from 'react';

// STEP 1- take in an initial mode, set the mode state with the initial mode provided, return object with mode property
// STEP 2- create a transition function within useVisualMode that will take in new mode and update the mode state with the new value. Use a custom hook.
// Step 3- add back() function that allows us to go back to the previous mode. Keep track of the history of the modes so we can go backwards, we can store this history as stateful array.
// In step 3, we are building a stack data structure  meaning it follows a particular order in which operations are performed.
// Every time an element is added, it goes on the top of the stack and the only element that can be removed is the element that is at the top of the stack, just like a pile of objects.
// This is called a linear data structure

export default function useVisualMode(initial) {
  // STEP 1
  const [mode, setMode] = useState(initial);

  // STEP 3.1
  const [history, setHistory] = useState([initial]); // Initializing our history as an array with the first mode that gets passed to useVisualMode.

  // STEP 2
  function transition(nextMode, replace=false) {
    setMode(nextMode); // first thing

    if (!replace) { // Transition with replace, When replace is true then set the history to reflect that we are replacing the current mode.

      // STEP 3.2
      // second thing - grab current page and push to the history array
      setHistory((prev) => { return [mode, ...prev] })
      // history = ['update', 'delete']
      // mode = 'create' 
      // --> ['create', 'update', 'delete'] 
    }

  }

  // STEP 3.3
  function back() {
    if (history.length > 1) { // setting back limit
      
      // where to go back -> basically, where is the destination?
      const nextMode = history[0];
      
      // remove that from array --> updating history
      setHistory((prev) => {
        const updateHistory = [...prev] // state is immutable (cannot be changed), prevents accidental update of state. Provides stability to the application. 
        updateHistory.shift();
        return updateHistory;
      })
      
      // go back to the first element, which would be whatever that replaced the previous one sitting on index 0. 
      setMode(nextMode);
    }
  }

  return { mode, transition, back };
}
