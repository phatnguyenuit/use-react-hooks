import { act, fireEvent, render, waitForElement } from "react-testing-library";

// import MockAdapter from "axios-mock-adapter";
import NewsList from "../NewsList";
import React from "react";
import axiosMock from "axios";
import renderer from "react-test-renderer";

jest.mock("axios");
const hits = [
  {
    title: "React 16",
    url: "https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html",
    objectID: "1"
  }
];

describe("Test News component with `react-test-renderer`", () => {
  test("News should render without error", () => {
    const newsListWrapper = renderer.create(<NewsList />);
    let tree = newsListWrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe("Test News component with `react-testing-library`", () => {
  test("News should render with the right props", async () => {
    //https://www.leighhalliday.com/async-axios-react-testing-library
    let { getByTestId, rerender } = render(<NewsList />);
    axiosMock.get.mockResolvedValue({ data: { hits } });
    act(() => {
      ({ getByTestId } = rerender(<NewsList />));
    });
    expect(getByTestId("loading").textContent).toContain("Loading....");
    const resolvedElement = await waitForElement(() => getByTestId("result"));
    expect(resolvedElement).toBeTruthy();
  });
});
