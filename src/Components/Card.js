import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SkeletonElement from "../Skeletons/Skeleton";

import "../Styles/Card.scss";

export default function Card() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrLength, setArrLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [skeletonOn, setSkeleton] = useState(false);

  const baseURL = "http://localhost:8080";

  let num = 1;
  const size = 8;
  const pageEnd = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${baseURL}/${offset}/${size}`)
        .then((res) => {
          const persons = res.data.list;
          setNews((news) => [...news, ...persons]);
        })
        .catch((err) => {
          console.log("error one");
        });
      setLoading(true);
    };

    setTimeout(() => {
      fetchData().then(() => setSkeleton(false));
    }, 5000);
  }, [offset]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            setSkeleton(true);
            loadData();
          }
          if (num >= Math.ceil(arrLength / size)) {
            observer.unobserve(pageEnd.current);
          }
        },
        {
          threshold: 1,
        }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, arrLength]);

  useEffect(() => {
    const fetchLength = async () => {
      await axios
        .get(`${baseURL}/length`)
        .then((res) => {
          const persons = res.data.len;
          setArrLength(persons);
        })
        .catch((err) => {
          console.log("error two");
        });
    };

    fetchLength();
    setSkeleton(true);
  }, []);

  function loadData() {
    setOffset((offset) => offset + size);
  }

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

  let skeleton = <></>;
  if (skeletonOn) {
    skeleton = <SkeletonElement size={size} />;
  }

  return (
    <section className="news">
      {news.map((card) => createNewsList(card))}
      {skeleton}
      <div ref={pageEnd}></div>
    </section>
  );
}
