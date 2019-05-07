import { render, waitForElement } from "react-testing-library";

import NewsList from "../NewsList";
import React from "react";
import axiosMock from "axios";
import renderer from "react-test-renderer";

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
    // https://testing-library.com/docs/react-testing-library/example-intro
    axiosMock.get.mockResolvedValue({
      data: {
        hits
      }
    });
    const { getByTestId } = render(<NewsList />);
    const loading = getByTestId("loading");
    expect(loading).toBeTruthy();
    const result = await waitForElement(() => getByTestId("result"));
    expect(result).toBeTruthy();

    const newsList = result.querySelectorAll("li");
    expect(newsList).toHaveLength(1);

    const newsLink = newsList[0].querySelector("a");
    expect(newsLink).toBeTruthy();
    expect(newsLink.getAttribute("href")).toEqual(hits[0].url);
    expect(newsLink.textContent).toEqual(hits[0].title);
  });
});
