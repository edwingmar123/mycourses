import React, { useEffect, useRef, useState } from "react";
import { data } from "../assets/data.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Carousel() {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode?.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const scrollToImage = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((curr) => curr + 1);
    } else {
      navigate("/register");
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className="container-images">
          <ul ref={listRef}>
            {data.map((item) => (
              <li key={item.id}>
                {item.type === "image" ? (
                  <img
                    src={item.imgUrl}
                    width={500}
                    height={280}
                    alt={"Image ${item.id}"}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <button className="rightArrow" onClick={scrollToImage}>
          {currentIndex < data.length - 1 ? "Next" : "Registro"}
        </button>
      </div>

      <div className="dots-container">
        {data.map((_, idx) => (
          <div
            key={idx}
            className={`dot-container-item ${
              idx === currentIndex ? "active" : ""
            }`}
            onClick={() => goToSlide(idx)}
          >
            &#9866;
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
