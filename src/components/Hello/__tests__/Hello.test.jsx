import { cleanup, fireEvent, getByTestId, render } from "react-testing-library";

import Hello from "..";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe("Test Hello component with `react-test-renderer`", () => {
  test("should render without error", () => {
    const hello = renderer.create(<Hello />);
    let tree = hello.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Hello component with `enzyme`", () => {
  test('should render "Hello, Guest!" when having no name inputed', () => {
    const hello = shallow(<Hello />);
    const expected_greet = "Hello, Guest!";
    const greet = hello.find(".greet");
    expect(greet.text()).toEqual(expected_greet);
  });

  // Can't use Enzyme to test React Hooks (useRef, ....)
  // Use "react-testing-library" instead
  /*
  test('should render "Hello, Phat!" when having inputed name', () => {
    const hello = shallow(<Hello />);
    const expected_greet = "Hello, Phat!";
    const greet = hello.find(".greet");

    // Set value = 'Phat' to input
    hello.simulate('change', {target: {value: 'phat'}})
    expect(greet.text()).toEqual(expected_greet);
  });
  */
});

describe("Test Hello component with `react-testing-library`", () => {
  beforeEach(cleanup);
  test('should render "Hello, Phat!" when having inputed name', () => {
    const { container } = render(<Hello />);
    const greetElement = getByTestId(container, "greet");
    const inputName = getByTestId(container, "name");
    const submitButton = getByTestId(container, "submit");

    fireEvent.change(inputName, { target: { value: "phat" } });
    fireEvent.click(submitButton);

    const expectedGreet = "Hello, Phat!";
    expect(greetElement.textContent).toEqual(expectedGreet);
  });
});
