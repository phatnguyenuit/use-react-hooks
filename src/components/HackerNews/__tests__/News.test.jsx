import News from "../News";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

const testProps = {
  title: "React 16",
  url: "https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html"
};
describe("Test News component with `react-test-renderer`", () => {
  test("News should render without error", () => {
    const newsWrapper = renderer.create(<News {...testProps} />);
    let tree = newsWrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test News component with `enzyme`", () => {
  test("News should render with the right props", () => {
    const newsWrapper = shallow(<News {...testProps} />);
    const linkElement = newsWrapper.find("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement).toHaveLength(1);

    expect(linkElement.prop("href")).toEqual(testProps.url);
    expect(linkElement.text()).toEqual(testProps.title);
  });
});
