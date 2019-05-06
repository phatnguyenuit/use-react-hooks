import MyFormUseState, {
  FormProvider,
  MyFormReducer,
  MyFormWithContext
} from "..";
import { cleanup, fireEvent, getByTestId, render } from "react-testing-library";

import React from "react";
import renderer from "react-test-renderer";

describe("Test MyForm(s) component with `react-test-renderer`", () => {
  test("MyFormUseState should render without error", () => {
    const myForm = renderer.create(<MyFormUseState />);
    let tree = myForm.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("MyFormReducer should render without error", () => {
    const myForm = renderer.create(<MyFormReducer />);
    let tree = myForm.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("MyFormWithContext should render without error", () => {
    const myForm = renderer.create(
      <FormProvider>
        <MyFormWithContext />
      </FormProvider>
    );
    let tree = myForm.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const testFormBehavior = formContainer => {
  const firstName = getByTestId(formContainer, "firstName");
  const lastName = getByTestId(formContainer, "lastName");
  const formValues = getByTestId(formContainer, "formValues");
  const buttonReset = getByTestId(formContainer, "buttonReset");

  // Check elements if they are available on DOM
  expect(firstName).toBeTruthy();
  expect(lastName).toBeTruthy();
  expect(formValues).toBeTruthy();
  expect(buttonReset).toBeTruthy();

  // check initial form values
  expect(formValues.textContent).toEqual(
    JSON.stringify({
      firstName: "",
      lastName: ""
    })
  );

  // change form values after changed
  fireEvent.change(firstName, { target: { value: "Phat" } });
  fireEvent.change(lastName, { target: { value: "Nguyen" } });

  expect(formValues.textContent).toEqual(
    JSON.stringify({
      firstName: "Phat",
      lastName: "Nguyen"
    })
  );

  // check form values after reseted
  fireEvent.click(buttonReset);
  expect(formValues.textContent).toEqual(
    JSON.stringify({
      firstName: "",
      lastName: ""
    })
  );
};

describe("Test MyForm(s) component with `react-testing-library`", () => {
  afterEach(cleanup);
  test("MyFormUseState should render with the right props", () => {
    const { container } = render(<MyFormUseState />);
    testFormBehavior(container);
  });

  test("MyFormReducer should render with the right props", () => {
    const { container } = render(<MyFormReducer />);
    testFormBehavior(container);
  });

  test("MyFormWithContext should render with the right props", () => {
    const { container } = render(
      <FormProvider>
        <MyFormWithContext />
      </FormProvider>
    );
    testFormBehavior(container);
  });
});
