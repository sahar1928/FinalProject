import React, { useState, useEffect } from "react";
import { online } from "../../assets/dummydata";
import {Link} from "react-router-dom";
import { URL } from "../../assets/url";
import Back from "../../common/back/Back";
import Heading from "../../common/heading/Heading";
import "./courses.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(URL + `categories`);
        const data = await res.json();
        setCategories(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <section className="categories">
        <div className="container">
          <div className="content grid3">
            {categories && categories.map((category) => (
              <div className="box" key={category.CategoryId}>
                <Link to={`/category/${category.CategoryId}`}>
                  <div className="img">
                    <img
                      src={`../images/courses/enrolled/o${category.CategoryId}.png`}
                      alt=""
                    />
                    <img
                      src={`../images/courses/enrolled/o${category.CategoryId}.1.png`}
                      alt=""
                      className="show"
                    />
                  </div>
                  <h1>{category.CategoryName}</h1>
                  <h5>Courses quantity: </h5>
                  <h5>{category.CoursesCount} </h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
