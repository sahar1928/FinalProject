import React, { useState, useEffect } from "react";
import Back from "../../common/back/Back";
import CoursesCard from "./CoursesCard";
import { URL } from "../../assets/url";
import Heading from "../../common/heading/Heading"
import Categories from "./Categories";

const CourseHome = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${URL}/courses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <>
      <Back title="Explore Courses" />
      <div className="margin" />
      <Heading subtitle='Courses' title='Benefits About Online Learning Expertise' />
      <section className="coursesCard" >
      <div className="content grid2">
      {courses &&
        courses.map((course) => (
          <CoursesCard key={course.CourseId} course={course} />
        ))}
        </div>
        </section>
        <Heading subtitle='Courses' title='Categories' />
      <Categories />
    </>
  );
};

export default CourseHome;
