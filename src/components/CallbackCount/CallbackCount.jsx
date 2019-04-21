import "./style.scss";

import React, { useCallback, useMemo, useState } from "react";

import ChildComponent from "./ChildComponent";

const CallbackCount = () => {
  const [callbackCount, setCallbackCount] = useState(0);
  const [memoCount, setMemoCount] = useState(0);
  const memoFunction = () => {
    console.log(memoCount, "memo called");
    // Do something with memoCount....
  };

  // Here if we give an empty array of dependencies, the callback function will return the old value of callbackCount
  // because useCallback will return its memoized version
  const callbackFunction = useCallback(() => {
    console.log(callbackCount, "callback called");
    // Do something with callbackCount ...
    return callbackCount;
  }, [callbackCount]);

  // We create the memo hook, when memoCount changes, the function will be executed again
  useMemo(memoFunction, [memoCount]);
  return (
    <div className="callback-count-container">
      <span>
        <a
          href="https://blog.hackages.io/react-hooks-usecallback-and-usememo-8d5bb2b67231"
          target="_blank"
          rel="noopener noreferrer"
        >
          Refer this post
        </a>
      </span>
      {/* This component will receive a function that will change when the dependency value changes */}
      <ChildComponent action={callbackFunction} />
      <p>Memoized value: {memoCount}</p>

      {/* Change the callback hook dependency to trigger a change in the child */}
      <button
        className="button"
        onClick={() => setCallbackCount(callbackCount + 1)}
      >
        Change callback count
      </button>

      {/* After creating useMemo, each change of memoCount will trigger the function passed to the hook,
    otherwise the memoized value will be returned */}
      <button className="button" onClick={() => setMemoCount(memoCount + 1)}>
        Change memo count
      </button>
    </div>
  );
};

export default CallbackCount;
