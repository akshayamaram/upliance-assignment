import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem("counter")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("counter", count);
  }, [count]);

  // Animate height of the background color based on count
  const fillHeight = useSpring({
    height: `${Math.min(count * 10, 100)}%`, // Ensure it maxes out at 100%
    config: { tension: 170, friction: 20 }, // Bezier-like smooth transition
  });

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden border border-gray-700 rounded-lg">
      
      <animated.div
        className="absolute bottom-0 left-0 w-full bg-blue-500"
        style={fillHeight}
      />

      <div className="relative z-10 text-white">
        <h1 className="text-2xl font-bold  text-center mb-4">{count}</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setCount(count - 1)}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
