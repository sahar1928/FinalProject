import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import {URL} from '../../assets/url';
import { UserContext } from '../../assets/UserContext';
import Back from "../../common/back/Back"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setBalance, rememberMe, setRememberMe } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(rememberMe);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleRememberMeChange = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL + `Users/${username}/${password}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const user = await response.json();
      console.log(user);
      setUser(user);
      setBalance(user.UserBalance.Balance);
      setIsLoggedIn(true);
      setRememberMe(remember);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('rememberMe', JSON.stringify(remember));
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };
  

  return (
    <>
    <Back title='Sign-In' />
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <FontAwesomeIcon icon={faLock} size="3x" />
          <h1 className="mt-3 mb-4">Sign In</h1>
        </div>
        <div className="form-group">
          <label htmlFor="username" className="fw-bold">
            Username 
          </label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="border-0 bg-light form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="fw-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="border-0 bg-light form-control"
          />
        </div>
        <div className="form-group form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="remember-me"
            checked={remember} // Set the value of the checkbox to the state value
            onChange={handleRememberMeChange} // Update the state value on change
          />
          <label className="form-check-label" htmlFor="remember-me">
            <span className="fw-bold">Remember me</span>
          </label>
        </div>
        <Button
          color="primary"
          size="lg"
          className="mt-4 w-100 rounded-pill"
          type="submit"
        >
          Sign In
        </Button>
        <div className="mt-3 text-center">
          <Link to="#" className="me-4 text-decoration-none">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-decoration-none">
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>

    </>
  );
};

export default SignIn;
