import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    setMode(nextMode);

    if (!replace) {
      setHistory((prev) => {
        return [mode, ...prev];
      });
    }
  }

  function back() {
    if (history.length > 1) {
      const nextMode = history[0];

      setHistory((prev) => {
        const updateHistory = [...prev];
        updateHistory.shift();
        return updateHistory;
      });

      setMode(nextMode);
    }
  }

  return { mode, transition, back };
}
