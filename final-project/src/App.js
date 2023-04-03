import { useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar, Home,SignIn,SignUp, Faq, Footer, Contact, Profile, Team, About, CourseHome, ScrollToTop, CategoryCourses} from "./components/index";
import { UserContext } from "./assets/UserContext";

function App() {

  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const remember = JSON.parse(localStorage.getItem('rememberMe'));

    if (storedUser && !(isLoggedIn) && (remember)) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setRememberMe(true);
    }
    else {
      localStorage.clear();
    }
  }, []);


  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, isLoggedIn, setIsLoggedIn, balance , setBalance, rememberMe, setRememberMe}}
      >
        <Router>
        <ScrollToTop/>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About /> } />
            <Route exact path="/courses" element={<CourseHome />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/faq" element={<Faq />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/category/:categoryId" element={<CategoryCourses/>} />
          </Routes>
          <Footer />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
