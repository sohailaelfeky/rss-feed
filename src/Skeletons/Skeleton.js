import React from "react";
import "../Styles/Skeleton.scss";

const SkeletonElement = (props) => {
  const list = Array.from(Array(props.size).keys());
  return (
    <section className="skeleton">
      {list.map((skeleton) => (
        <section
          className="skeleton__card"
          key={Math.random().toString(36).substr(2, 9)}
        >
          <p className="skeleton__card--name"></p>
          <div className="skeleton__card--wrapper"></div> {/* img */}
          <p className="skeleton__card--creator"></p>
          <p className="skeleton__card--date"></p>
          <p className="skeleton__card--title"></p>
          <p className="skeleton__card--desc"></p>
          <p className="skeleton__card--link"></p>
          {/* was an anchor tag */}
        </section>
      ))}
    </section>
  );
};

export default SkeletonElement;
