import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './scrollToTop.css'; 

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      // Add event listener to window to check if the user has scrolled enough
      window.addEventListener('scroll', handleScroll);
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    function handleScroll() {
      // Check if the user has scrolled enough to show the button
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    }
  
    function handleClick() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    return (
      <button
        className={`scroll-to-top-button ${isVisible ? 'is-visible' : 'is-hidden'}`}
        onClick={handleClick}
      >
        <FaArrowUp className="arrow-icon" size={30}/>
      </button>
    );
  }
  
export default ScrollToTop;