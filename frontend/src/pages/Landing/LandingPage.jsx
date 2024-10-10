import React from 'react';
import './LandingPage.css'; // Make sure to create this CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
    

      <section className="hero">
        <h2>Unlock Your Coding Potential</h2>
        <p>Learn the latest programming languages and frameworks with our comprehensive tutorials.</p>
        <button className="cta-button">Get Started</button>
      </section>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Interactive Lessons</h3>
            <p>Engage with hands-on coding exercises that boost your skills.</p>
          </div>
          <div className="feature">
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of experience.</p>
          </div>
          <div className="feature">
            <h3>Community Support</h3>
            <p>Join a vibrant community of fellow learners and get help when needed.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>We are dedicated to providing high-quality coding education for aspiring developers. Our tutorials cover a wide range of topics and skill levels.</p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Coder's Ponit. All Rights Reserved.</p>
        <div className="social-links">
          <a href="#!">Facebook</a>
          <a href="#!">Twitter</a>
          <a href="#!">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
