import React, { useState, useEffect } from "react";
import CourseCard from "./CoursesCard";
import { URL } from "../../assets/url";
import { useParams, Link } from "react-router-dom";
import Back from "../../common/back/Back";
import Heading from "../../common/heading/Heading";
import "./courses.css";

const CategoryCourses = () => {
  const [courses, setCourses] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(URL + `courses/${categoryId}`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [categoryId]);

  return (
    <>
        <div className="margin"/>
      <section className="coursesCard">
        <div className="container">
        <Back title="Explore Courses" />
          <Heading subtitle="COURSES" title="Explore Courses" />
          <div className="content grid3">
        {courses &&
          courses.map((course) => (
            <CourseCard key={course.CourseId} course={course} />
          ))}
      </div>
      </div>
    </section>
    </>
  );
};

export default CategoryCourses;
