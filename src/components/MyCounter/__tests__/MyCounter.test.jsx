import MyCounterUseState, {
  CounterProvider,
  MyCounterReducer,
  MyCounterWithContext
} from "..";
import { cleanup, fireEvent, getByTestId, render } from "react-testing-library";

import React from "react";
import renderer from "react-test-renderer";

describe("Test MyCounter(s) component with `react-test-renderer`", () => {
  test("MyCounterReducer should render without error", () => {
    const myCounter = renderer.create(<MyCounterReducer />);
    let tree = myCounter.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("MyCounterUseState should render without error", () => {
    const myCounter = renderer.create(<MyCounterUseState />);
    let tree = myCounter.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("MyCounterWithContext should render without error", () => {
    const myCounter = renderer.create(
      <CounterProvider>
        <MyCounterWithContext />
      </CounterProvider>
    );
    let tree = myCounter.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const testCounterBehavior = counterContainer => {
  const buttonDecrease = getByTestId(counterContainer, "button-decrease");
  const buttonIncrease = getByTestId(counterContainer, "button-increase");
  const buttonReset = getByTestId(counterContainer, "button-reset");
  const counterValue = getByTestId(counterContainer, "counter-value");

  // initial props
  expect(buttonDecrease).toBeTruthy();
  expect(counterValue).toBeTruthy();
  expect(buttonIncrease).toBeTruthy();
  expect(buttonReset).toBeTruthy();
  expect(counterValue.textContent).toEqual("0");

  // update prop with action `decrease`
  fireEvent.click(buttonDecrease);
  expect(counterValue.textContent).toEqual("-1");

  // update prop with action `reset`
  fireEvent.click(buttonReset);
  expect(counterValue.textContent).toEqual("0");

  // update prop with action `increase`
  fireEvent.click(buttonIncrease);
  expect(counterValue.textContent).toEqual("1");
};

describe("Test MyCounter(s) component with `react-testing-library`", () => {
  afterEach(cleanup);
  test("MyCounterReducer should render without error", () => {
    const { container } = render(<MyCounterReducer />);
    testCounterBehavior(container);
  });

  test("MyCounterUseState should render without error", () => {
    const { container } = render(<MyCounterUseState />);
    testCounterBehavior(container);
  });
  test("MyCounterWithContext should render without error", () => {
    const { container } = render(
      <CounterProvider>
        <MyCounterWithContext />
      </CounterProvider>
    );
    testCounterBehavior(container);
  });
});
