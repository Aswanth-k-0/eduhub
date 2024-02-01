import React from 'react';
import Header from './Header';
import Footer from './Footer';
import myimg from "./img/new.png";
import myimg1 from "./assets/img/team/aswanth.png";
import myimg2 from "./assets/img/team/sarath.png";
import myimg3 from "./assets/img/team/images1.png";
import myimg4 from "./assets/img/team/jithin.png";


import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/remixicon/remixicon.css';
import './assets/vendor/swiper/swiper-bundle.min.css';

const TeamMember = ({ name, role, image, socialLinks }) => (
  <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
    <div className="member d-flex align-items-start">
      <div className="pic"><img src={image} className="img-fluid" alt={name} /></div>
      <div className="member-info">
        <h4>{name}</h4>
        <span>{role}</span>
        <p></p>
        <div className="social">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url}><i className={`ri-${link.icon}`}></i></a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <li data-aos="fade-up" data-aos-delay="100">
    <i className="bx bx-help-circle icon-help"></i> 
    <a data-bs-toggle="collapse" className="collapsed" data-bs-target="#faq-list-1">{question}
      <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i>
    </a>
    <div id="faq-list-1" className="collapse" data-bs-parent=".faq-list">
      <p>{answer}</p>
    </div>
  </li>
);



const MainPage = () => {
  return (
   
    <div>
         <Header/>
      
         <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1>Empowering Dreams, One Notification at a Time</h1>
              <h2>Unlock the Gateway to Educational Excellence</h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="/LoginPage" className="btn-get-started scrollto">Get Started</a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src={myimg} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        {/* About Us Section */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>About Us</h2>
            </div>
            <div className="row content">
              <div className="col">
                <p>
                Welcome to Edu-Hub, a pioneering platform dedicated to revolutionizing the way we approach higher education. Our story begins with a simple yet powerful mission: to empower students, faculties, and educational stakeholders with comprehensive, data-driven insights that facilitate informed decision-making.
At Edu-Hub, we believe that education is a transformative journey, and everyone deserves access to the right information to make the best decisions along the way. Our mission is to streamline this journey by providing a one-stop solution for all educational information needs, making the decision-making process simpler and more effective.
                </p>
                <a href="#" className="btn-learn-more">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Services</h2>
              <p></p>
            </div>
            <div className="row">
              {/* Services items go here */}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="team section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Team</h2>
          <p>.</p>
        </div>
        <div className="row">
          <TeamMember
            name="Aswanth k"
            role="Leader"
            image={myimg1}
            socialLinks={[
              { icon: "twitter-fill", url: "#" },
              { icon: "facebook-fill", url: "#" },
              { icon: "instagram-fill", url: "#" },
              { icon: "linkedin-box-fill", url: "#" },
            ]}
          />
          <TeamMember
            name="Sarath Krishna P S"
            role=""
            image={myimg2}
            socialLinks={[
              { icon: "twitter-fill", url: "#" },
              { icon: "facebook-fill", url: "#" },
              { icon: "instagram-fill", url: "#" },
              { icon: "linkedin-box-fill", url: "#" },
            ]}
          />
          <TeamMember
            name="Niby Vijayan"
            role=""
            image={myimg3}
            socialLinks={[
              { icon: "twitter-fill", url: "#" },
              { icon: "facebook-fill", url: "#" },
              { icon: "instagram-fill", url: "#" },
              { icon: "linkedin-box-fill", url: "#" },
            ]}
          />
          <TeamMember
            name="Jithin Shaji"
            role=""
            image={myimg4}
            socialLinks={[
              { icon: "twitter-fill", url: "#" },
              { icon: "facebook-fill", url: "#" },
              { icon: "instagram-fill", url: "#" },
              { icon: "linkedin-box-fill", url: "#" },
            ]}
          />
        </div>
      </div>
    </section>

        {/* Frequently Asked Questions Section */}
        <section id="faq" className="faq section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Frequently Asked Questions</h2>
              <p></p>
            </div>
            <div className="faq-list">
              <ul>
              <FAQItem
            question=""
            answer=""
          />
          <FAQItem
            question=""
            answer=""
          />
          <FAQItem
            question=""
            answer=""
          />
          <FAQItem
            question=""
            answer=""
            />
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
        </div>

        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>Government Engineering College Idukki, Idukki, Painavu, Kerala 685603</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Website:</h4>
                <p>www.gecidukki.ac.in</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>studocs.geci@gmail.com</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>0486 2233250</p>
              </div>
            </div>
          </div>

          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form action="register-college" method="post" role="form" className="php-email-form">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" name="name" className="form-control" id="name" required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" className="form-control" name="email" id="email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" className="form-control" name="subject" id="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" name="message" rows="10" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>
      </main>

      <Footer/>
      
    </div>
    
  );
};

export default MainPage;
