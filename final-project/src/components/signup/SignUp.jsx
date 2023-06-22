import React, { useState } from "react";
import { Badge } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Employee, Employer } from "../../assets/user";
import Back from "../../common/back/Back";
import { URL } from "../../assets/url";
import { locations, skills } from "../../assets/dummydata";
import "../../App.css";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [currentEmployer, setCurrentEmployer] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isEmployee, setIsEmployee] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState(skills);
  const [companyName, setCompanyName] = useState("");
  const [gender, setGender] = useState([]);
  const [cvFile, setCVFile] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleLocationChange = (e) => {
    setUserLocation(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSkillAdd = (selectedSkill) => {
    if (!selectedSkills.some((skill) => skill.id === selectedSkill.id)) {
      setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill]);
      setAvailableSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== selectedSkill.id)
      );
    }
  };

  const handleSkillRemove = (removedSkill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== removedSkill.id)
    );
    setAvailableSkills((prevSkills) => [...prevSkills, removedSkill]);
  };

  const handleGenderChange = (e) => {
    setGender(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const handleCurrentlyWorkingChange = (e) => {
    setIsCurrentlyWorking(e.target.checked);
  };

  const handleCurrentEmployerChange = (e) => {
    setCurrentEmployer(e.target.value);
  };

  const handleCurrentPositionChange = (e) => {
    setCurrentPosition(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleCVFileChange = (e) => {
    const file = e.target.files[0];
    setCVFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let user;

      if (isEmployee) {
        user = new Employee(
          null,
          name,
          jobTitle,
          userLocation,
          isCurrentlyWorking,
          currentEmployer,
          currentPosition,
          startDate,
          locations,
          selectedSkills,
          cvFile
        );
      } else {
        user = new Employer(
          null,
          name,
          companyName,
          jobTitle,
          userLocation,
          locations
        );
      }

      console.log(user);

      const response = await fetch(URL + "users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("User created:", user);
        navigate("/signin");
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUserType = () => {
    setIsEmployee(!isEmployee);
  };

  return (
    <>
      <div className="margin" />
      <Back title="Sign-Up" />
      <Container className="my-5">
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div className="text-center">
              <h1 className="mb-4">Sign up</h1>
            </div>
            <Button color="primary" onClick={toggleUserType}>
              {isEmployee ? "Switch to Employer" : "Switch to Employee"}
            </Button>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="jobTitle">Job Title</Label>
                <Input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  placeholder="Enter your job title"
                  value={jobTitle}
                  onChange={handleJobTitleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input
                  type="select"
                  name="location"
                  id="location"
                  value={userLocation}
                  onChange={handleLocationChange}
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              {isEmployee && (
                <FormGroup>
                  <Label for="isCurrentlyWorking">Currently Working</Label>
                  <Input
                    type="checkbox"
                    name="isCurrentlyWorking"
                    id="isCurrentlyWorking"
                    checked={isCurrentlyWorking}
                    onChange={handleCurrentlyWorkingChange}
                  />
                </FormGroup>
              )}
              {isCurrentlyWorking && isEmployee && (
                <>
                  <FormGroup>
                    <Label for="currentEmployer">Current Employer</Label>
                    <Input
                      type="text"
                      name="currentEmployer"
                      id="currentEmployer"
                      placeholder="Enter your current employer"
                      value={currentEmployer}
                      onChange={handleCurrentEmployerChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="currentPosition">Current Position</Label>
                    <Input
                      type="text"
                      name="currentPosition"
                      id="currentPosition"
                      placeholder="Enter your current position"
                      value={currentPosition}
                      onChange={handleCurrentPositionChange}
                    />
                  </FormGroup>
                </>
              )}
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </FormGroup>
              {isEmployee && (
                <FormGroup>
                  <Label for="cvFile">CV File</Label>
                  <Input
                    type="file"
                    name="cvFile"
                    id="cvFile"
                    accept=".pdf"
                    onChange={handleCVFileChange}
                  />
                </FormGroup>
              )}
              {isEmployee && (
                <FormGroup>
                  <Label for="skills">Skills</Label>
                  <Input
                    type="select"
                    name="skills"
                    id="skills"
                    multiple={isEmployee}
                    value={selectedSkills.map((skill) => skill.id)}
                    onChange={(e) => {
                      const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      const selectedSkills = availableSkills.filter((skill) =>
                        selectedOptions.includes(skill.id)
                      );
                      setSelectedSkills(selectedSkills);
                    }}
                  >
                    {availableSkills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </Input>
                  <div>
                    {selectedSkills.map((skill) => (
                      <Badge
                        key={skill.id}
                        color="primary"
                        pill
                        className="mr-2"
                      >
                        {skill.name}
                        <span
                          className="ml-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSkillRemove(skill)}
                        >
                          &times;
                        </span>
                      </Badge>
                    ))}
                  </div>
                </FormGroup>
              )}
              {!isEmployee && (
                <FormGroup>
                  <Label for="companyName">Company Name</Label>
                  <Input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={handleCompanyNameChange}
                  />
                </FormGroup>
              )}
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input
                  type="select"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Input>
              </FormGroup>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
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
