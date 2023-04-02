import React, { useRef, useState } from "react";
import { faq } from "../../assets/dummydata";
import Back from "../../common/back/Back";
import Heading from "../../common/heading/Heading";
import "./faq.css";

const Faq = () => {
  const [click, setClick] = useState(false);

  const toggle = (index) => {
    if (click === index) {
      return setClick(null);
    }
    setClick(index);
  };

  return (
    <>
      <div className="margin" />
      <Back title="Frequesntly Ask Question" />
      <Heading subtitle="FAQS" title="Frequesntly Ask Question" />
      <section className="faq">
        <div className="container">
          {faq.map((val, index) => (
            <div className="box" key={index}>
              <button className="accordion" onClick={() => toggle(index)}>
                <h2>{val.title}</h2>
                <span>
                  {click === index ? (
                    <i className="fa fa-chevron-down"></i>
                  ) : (
                    <i className="fa fa-chevron-right"></i>
                  )}
                </span>
              </button>
              {click === index ? (
                <div className="text">
                  <p>{val.desc}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Faq;
