import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/UserContext";
import Head from "./Head";
import "./header.css";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, user } =
    useContext(UserContext);
    const navigate = useNavigate();
  const [click, setClick] = useState(null);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUser(null);
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
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
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/faq">Faq</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </>
            )}
          </ul>
          <div className="start">
            <div className="button">
              {isLoggedIn && (
                <>
                  <ul>
                    <li>Hi, {user.FirstName}!</li>
                    <li>Balance: </li>
                    <li>{user.UserBalance.Balance}$</li>
                    <li>
                      <Button className="btn" onClick={handleLogout}>
                        Logout
                      </Button>
                    </li>
                  </ul>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <ul>
                    <li>
                      <Link to="/signin">Sign In</Link>
                    </li>
                  </ul>
                </>
              )}

              <button className="toggle" onClick={() => setClick(!click)}>
                {click ? (
                  <i className="fa fa-times"> </i>
                ) : (
                  <i className="fa fa-bars"></i>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
