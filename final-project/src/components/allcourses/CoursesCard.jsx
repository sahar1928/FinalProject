import React, { useState, useContext } from "react";
import "./courses.css";
import { URL } from "../../assets/url";
import { UserContext } from "../../assets/UserContext";
import { coursesCard } from "../../assets/dummydata";

const CoursesCard = ({ course }) => {
  const cImage = `../images/courses/c${course.CourseId}.png`;
  const tImage = `../images/team/t${course.CourseId}.webp`;

  const { user,setUser } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  async function handleConfirmCheckout() {
    const courseId = course.CourseId;
    const userId = user.UserId;
    const data = { userId: userId, courseId: courseId };
    
    try {
      const response = await fetch(URL + `users/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        const updatedUserBalance = {
          UserId: user.UserId,
          Balance: user.UserBalance.Balance - course.Price
        };
    
        const updatedUser = {
          ...user,
          UserBalance: updatedUserBalance
        };
    
        setUser(updatedUser);
    
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  }

  const handleCancelCheckout = () => {
    setShowConfirmation(false);
  };

  return (
    <>

          <div className="items">
            <div className="content flex">
              <div className="left">
                <div className="img">
                  <img src={cImage} alt="" />
                </div>
              </div>
              <div className="text">
                <h1>{course.CourseName}</h1>
                <div className="details">

                  <div className="box">
                    <div className="dimg">
                      <img src={tImage} alt="" />
                    </div>
                    <span>{course.TotalTimeInHours} total hours</span>                 
                  </div>
                  <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <label htmlFor="">(5.0)</label>
                </div>
                  <div className="price">
                <h4>{course.Price.toFixed(2)-0.01}$</h4>
              </div>
              <button className="outline-btn" onClick={handleCheckout}>
                ENROLL NOW !
              </button>
                </div>
              </div>
            </div>
          </div>

      {showConfirmation && (
        <div className="add-to-cart-confirmation">
          <p>
            Are you sure you want to buy {course.CourseName} course for{" "}
            {course.Price}$ ?
          </p>
          <div className="add-to-cart-confirmation-buttons">
            <button onClick={handleConfirmCheckout}>Yes</button>
            <button onClick={handleCancelCheckout}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesCard;
