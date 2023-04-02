import React from "react";
import { blog } from "../../assets/dummydata";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>Play</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>
          <div className="right row">
           <p>
            Play is an education website that was designed for new programmers and veteran teachers, homeschoolers, elementary students, high school students, special needs students and more.
            </p>
          </div>
          <div className="box link">
            <h3>Quick Links</h3>
            <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/journal">Journal</Link>
            </li>
            <li>
              <Link to="/faq">Faq</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
