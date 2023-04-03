import React, { useState, useContext } from "react";
import Back from "../../common/back/Back";
import { URL } from "../../assets/url";
import { UserContext } from "../../assets/UserContext";
import "./contact.css";

const Contact = () => {
  const map =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.148245475428!2d34.91025991521631!3d32.343362557094316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d556b9a3b8f33%3A0x77f068c99f2361ab!2sRuppin%20Academic%20Center!5e0!3m2!1sen!2sil!4v1652535615693!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ';

  const { user } = useContext(UserContext);
  const [name, setName] = useState(user ? user.FirstName : "");
  const [email, setEmail] = useState(user ? user.Email : "");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      Name: user ? user.FirstName : name,
      Email: user ? user.Email : email,
      Message: message,
    };
    console.log(formData);
    try {
      const res = await fetch(URL + "emails/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
      event.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="margin" />
      <Back title="Contact us" />
      <section className="contacts padding">
        <div className="container shadow flexSB">
          <div className="left row">
            <iframe src={map} title="map"></iframe>
          </div>
          <div className="right row">
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className="items grid2">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>Emek Hefer Israel 4025000</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p> info@play.com</p>
              </div>
              <div className="box">
                <h4>PHONE:</h4>
                <p> (+972) 52111111</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {!user && (
                <div className="flexSB">
                  <label>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>
              )}
              {user && (
                <div className="flexSB">
                  <label>Name: {user.FirstName}</label>
                  <br />
                  <label>Email: {user.Email}</label>
                </div>
              )}
              <br />
              <label>
                Message:
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  cols={30}
                  rows={10}
                />
              </label>
              <br />
              <input type="submit" value="Send" className="primary-btn" />
              <p>{response}</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
