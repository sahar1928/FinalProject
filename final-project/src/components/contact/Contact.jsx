import React from "react"
import Back from "../../common/back/Back"
import "./contact.css"

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.148245475428!2d34.91025991521631!3d32.343362557094316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d556b9a3b8f33%3A0x77f068c99f2361ab!2sRuppin%20Academic%20Center!5e0!3m2!1sen!2sil!4v1652535615693!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  return (
    <>
    <div className="margin" />
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map} title='map'></iframe>
          </div>
          <div className='right row'>
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className='items grid2'>
              <div className='box'>
                <h4>ADDRESS:</h4>
                <p>Emek Hefer  Israel  4025000</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p> info@play.com</p>
              </div>
              <div className='box'>
                <h4>PHONE:</h4>
                <p> (+972) 52111111</p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB'>
                <input type='text' placeholder='Name' />
                <input type='email' placeholder='Email' />
              </div>
              <input type='text' placeholder='Subject' />
              <textarea cols='30' rows='10' >
                Create a message here...
              </textarea>
              <button className='primary-btn'>SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
