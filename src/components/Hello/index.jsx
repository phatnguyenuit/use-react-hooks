import "./style.scss";

import React, { useRef, useState } from "react";

const defaultName = "guest";
const Hello = () => {
  const nameRef = useRef();
  const [name, setName] = useState(defaultName);
  const hanldeSubmit = () => {
    const inputedName = nameRef.current.value;
    if (!!inputedName) {
      setName(inputedName);
    } else {
      alert("Please input your name, thanks!");
    }
  };

  const formatedName = name
    .toLowerCase()
    .replace(/(\b[a-z]\s?)/g, word => word.toUpperCase());

  return (
    <div className="hello-container">
      {/* Rerence: https://www.fullstackreact.com/articles/an-introduction-to-hooks-in-react/#useref-hook-example */}
      <p className="greet" data-testid="greet">
        Hello, {formatedName}!
      </p>
      <div className="hello-form">
        <input
          ref={nameRef}
          type="text"
          className="field-text"
          placeholder="Please input your name!"
          data-testid="name"
        />
        <button
          className="button"
          type="button"
          onClick={hanldeSubmit}
          data-testid="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Hello;
