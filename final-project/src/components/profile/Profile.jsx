import React  from "react"
import Back from "../../common/back/Back"
import ProfileCard from "./ProfileCard"
import ProfileTemp from "./ProfileTemp"
import EnrolledCourses from "../enrolledcourses/EnrolledCourses";
import "./profile.css"


const Profile = () => {

  return (
    <>
    <div className="margin" />
      <Back title='Blog Posts' />
      <section className='blog padding'>
        <div className='container grid2'>
          <ProfileCard />
          <ProfileTemp />
          <EnrolledCourses/>
        </div>
      </section>
    </>
  )
}

export default Profile;
