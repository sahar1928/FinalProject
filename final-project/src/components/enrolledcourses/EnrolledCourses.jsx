import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../assets/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import { URL } from "../../assets/url";

const EnrolledCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState();
  const { setUser, user } = useContext(UserContext);

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



  const handleClick = async (e) => {
    try {

      const courseId = e.target.value;
      console.log(courseId)
      var course = courses.filter((course) => {
        return course.CourseId == courseId;
      })[0];
      console.log(course);
      course.EnrolledUsers = [...course.EnrolledUsers, user];
      console.log(course);
      const response = await fetch(URL + "courses/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUserBalance = {
          UserId: user.UserId,
          Balance: user.UserBalance.Balance + data
        };
    
        const updatedUser = {
          ...user,
          UserBalance: updatedUserBalance
        };
    
        setUser(updatedUser);
    
        localStorage.setItem('user', JSON.stringify(updatedUser));

        navigate("/");
      } else {
        alert('More than an hour has passed since you bought the course')
        console.error("Error refund request:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <section className="enrolled">
        <div className="container">
          <Heading subtitle="COURSES" title="Enrolled Courses" />
          <div className="content grid3">
            {courses.length > 0 &&
              courses.map((course) => {
                return (
                  <div className="box" key={course.CourseId}>          
                      <div className="img">
                        <img
                          src={`../images/courses/c${course.CourseId}.png`}
                          alt=""
                        />
                        <img
                          src={`../images/courses/enrolled/o${course.CourseId}.png`}
                          alt=""
                          className="show"
                        />
                      </div>
                      <h1>{course.CourseName}</h1>
                      <span>{course.TotalTimeInHours} Hours</span>
                      <span>{course.EnrollmentDate} </span>
                      <button value={course.CourseId} onClick={(e) => handleClick(e)}>Refund request</button>
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
