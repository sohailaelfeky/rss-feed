import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/Card.scss";

export default function Card() {
  const [news, setNews] = useState([]);
  const [pageNumber, setPageNumber] = useState(6);
  const [loading, setLoading] = useState(false);
  const [arrLength, setArrLength] = useState(0);

  const baseURL = "http://localhost:8080/";

  let num = 1;

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const fetchData = async () => {
    axios.get(`${baseURL}`).then((res) => {
      const persons = res.data;
      setNews((news) => [...news, ...persons]);
    });
    setLoading(true);
  };

  const pageEnd = useRef();

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadData();
          }
          if (num >= 8) {
            observer.unobserve(pageEnd.current);
          }
        },
        {
          threshold: 1,
        }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  function loadData() {
    setPageNumber((pageNumber) => pageNumber + 1);
  }

  const fetchLength = async () => {
    axios.get(`/length`).then((res) => console.log(res));
  };

  useEffect(() => {
    fetchLength();
  }, []);

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
    <section className="news">
      {news.map((card) => createNewsList(card))}
      <div ref={pageEnd}></div>
    </section>
  );
}
