import { useState } from "react";

// STEP 1- take in an initial mode, set the mode state with the initial mode provided, return object with mode property
// STEP 2- create a transition function within useVisualMode that will take in new mode and update the mode state with the new value. Use a custom hook.
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  
  // STEP 2
  function transition(mode) {
    setMode(mode);
  }

  return { mode, transition };
};
