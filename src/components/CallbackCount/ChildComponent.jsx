import React, { useEffect, useState } from "react";

const ChildComponent = ({ action }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let val = action();
    setValue(val);
  }, [action]);

  return <div>Child : The callback is called {value} time(s)</div>;
};

export default ChildComponent;
