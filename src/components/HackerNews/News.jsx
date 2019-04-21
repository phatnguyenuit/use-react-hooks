import React from "react";

const News = ({ url, title }) => {
  return (
    <li>
      <a href={url} target={"_blank"}>
        {title}
      </a>
    </li>
  );
};

export default News;
