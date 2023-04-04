import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {User} from '../../assets/user';
import Back from "../../common/back/Back";
import {URL} from '../../assets/url';
import "../../App.css"
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';


const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];  
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      // Convert the data URL to a base64-encoded string
      const base64String = dataURL.split(',')[1];
      setImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const newUser = new User(
        null, 
        username, 
        email,
        password,
        new Date(), 
        image, 
        firstName,
        lastName,
        { UserId: null, Balance: 0 }, 
        [] 
      );
        console.log(newUser);
        
    const response = await fetch(URL + 'Users/Register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
  
    if (response.ok) {
      const user = await response.json();
      console.log('User created:', user);
      navigate('/signin');
    } else {
      console.error('Error creating user:', response.statusText);
    }
    }catch (error){
      console.log(error);
    }
  };
  


  return (
    <>
    <div className="margin"/>
    <Back title="Sign-Up" />
    <Container className="my-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <div className="text-center">
            <h1 className="mb-4">Sign up</h1>
          </div>
          <Form onSubmit={handleSubmit}>
   <FormGroup>
    <Label for="username">Username</Label>
    <Input
      type="text"
      name="username"
      id="username"
      placeholder="Enter your username"
      value={username}
      onChange={handleUsernameChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="password">Password</Label>
    <Input
      type="password"
      name="password"
      id="password"
      placeholder="Enter your password"
      value={password}
      onChange={handlePasswordChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="firstName">First Name</Label>
    <Input
      type="text"
      name="firstName"
      id="firstName"
      placeholder="Enter your first name"
      value={firstName}
      onChange={handleFirstNameChange}
    />
  </FormGroup> 
  <FormGroup>
    <Label for="lastName">Last Name</Label>
    <Input
      type="text"
      name="lastName"
      id="lastName"
      placeholder="Enter your last name"
      value={lastName}
      onChange={handleLastNameChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="email">Email Address</Label>
    <Input
      type="email"
      name="email"
      id="email"
      placeholder="Enter your email address"
      value={email}
      onChange={handleEmailChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="avatar">Avatar</Label>
    <Input
      type="file"
      name="avatar"
      id="avatar"
      accept="image/*"
      onChange={handleImageChange}
    />
  </FormGroup>
  <FormGroup check>
    <Label check>
      <Input type="checkbox" />
      {' '}
      I want to receive inspiration, marketing promotions and updates via email.
    </Label>
  </FormGroup>
  <Button color="primary" type="submit">Sign Up</Button>
</Form>
          <div className="mt-3 text-center">
            <span>Already have an account? </span>
            <Link to="/signin">Sign in</Link>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default SignUp;
