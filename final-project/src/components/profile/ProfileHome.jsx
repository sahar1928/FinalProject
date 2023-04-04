import React  from "react"
import Back from "../../common/back/Back"
import Profile from "./Profile"
import EnrolledCourses from "../enrolledcourses/EnrolledCourses";
import "./profile.css"


const ProfileHome = () => {

  return (
    <>
    <div className="margin" />
      <Back title='Blog Posts' />
      <section className='blog padding'>
          <Profile/>
        <div className='container grid2'>
          <EnrolledCourses/>
        </div>
      </section>
    </>
  )
}

export default ProfileHome;
