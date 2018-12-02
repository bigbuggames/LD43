import { useState, useEffect } from 'react';

const timerStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  CLEAR: 3
};

export default function useCounter(state) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (this.state.timerState === timerStates.RUNNING) {
      this.counterId = setTimeout(() => {
        setCount(count + 1);
        this.tick();
      }, this.props.interval);
    }

    if (this.state.timerState === timerStates.PAUSED) {
      clearTimeout(this.counterId);
    }

    if (this.state.timerState === timerStates.CLEAR) {
      clearTimeout(this.counterId);
      setCount(0);
    }

    return () => clearTimeout(this.counterId);
  });

  return count;
}
