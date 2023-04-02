import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../assets/UserContext";
import {Link} from "react-router-dom";
import Heading from "../../common/heading/Heading";
import { URL } from "../../assets/url";

const EnrolledCourses = () => {
  const { setUser, user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await fetch(URL + `users/${user.UserId}/courses`);
        const data = await res.json();
        setCourses(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEnrolledCourses();
  }, [user]);

  const handleClick = async (courseId) => {
    try {
      const res = await fetch(URL + `courses/${courseId}`);
      const data = await res.json();
      console.log(data);
      alert(`Enrollment Date: ${data.EnrollmentDate}, Teacher: ${data.Teacher}, Price: ${data.Price}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <section className="enrolled">
        <div className="container">
          <Heading subtitle="COURSES" title="Enrolled Courses" />
          <div className="content grid3">
          {courses.length > 0 && courses.map((course) => {
            return (
              <div className="box" key={course.CourseId}>
              <Link to={`/courses/${course.CourseId}`}>
                <div className="img">
                  <img src={`../images/courses/c${course.CourseId}.png`} alt="" />
                  <img src={`../images/courses/enrolled/o${course.CourseId}.png`} alt="" className="show" />
                </div>
                <h1>{course.CourseName}</h1>
                <span>{course.TotalTimeInHours} Hours</span>
                <span>{course.EnrollmentDate} </span>
                </Link>
              </div>
            );
          })}
          </div>
        </div>
      </section>
    </>
  );
};

export default EnrolledCourses;
