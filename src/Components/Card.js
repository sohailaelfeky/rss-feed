import React, { useState, useEffect, useRef } from "react";

import "../Styles/Card.scss";

export default function Card() {
  const [news, setNews] = useState([]);
  const [pageNumber, setPageNumber] = useState(6);
  const [loading, setLoading] = useState(false);

  const baseURL = "http://localhost:8080/";

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const fetchData = async (pageNumber) => {
    const result = await fetch(`${baseURL}?page=${pageNumber}`);
    const data = await result.json();
    setNews((news) => [...news, ...data.newsList]);
    setLoading(true);
  };

  const loadMore = () => {};

  const pageEnd = useRef();
  let num = 1;
  useEffect(() => {
    if (loading) {
      setLoading(false);
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
          }
          if (num >= 5) {
            observer.unobserve(pageEnd.current);
          }
        },
        {
          threshold: 1,
        }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, num]);

  function loadData() {}

  function createNewsList(news) {
    return (
      <section
        className="news__card"
        key={Math.random().toString(36).substr(2, 9)}
      >
        <h2 className="news__card--name">{news.source}</h2>
        <div className="news__card--wrapper">
          <img className="news__card--img" src={news.image} alt="img" />{" "}
        </div>
        <p className="news__card--creator">{news.creator}</p>
        <p className="news__card--date">{news.dateTimeToRead}</p>
        <p className="news__card--title">{news.Title}</p>
        <p className="news__card--desc">{news.shortDescription}</p>
        <a className="news__card--link" href={news.link}>
          Read More
        </a>
      </section>
    );
  }

  return (
    <section>
      {/* {news.map((tmp) => createNewsList(tmp))} */}
      {loadData()}
      <div ref={pageEnd}></div>
    </section>
  );
}
