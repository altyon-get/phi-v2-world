import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import myImg from "../../Assets/avatar.svg";
// import Tilt from "react-parallax-tilt";
// import {
  // AiFillGithub,
  // AiOutlineTwitter,
  // AiFillInstagram,
// } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              WHAT IS <span className="purple"> PHI WORLD ?</span>
            </h1>
            <p className="home-about-body">
              Introducing a new platform that challenges users across multiple disciplines, including mathematics, analytics, computer science, and networking.
              <br />
              <br />
              Each level presents unique challenges that require users to use a combination of their
              <i>
                <b className="purple"> knowledge and problem-solving skills &nbsp;</b>
              </i>
              to overcome them.
              <br />
              <br />
              As players progress through the levels and solve increasingly challenging problmes, they will improve their knowledge and skills.
              If you're looking for a &nbsp;
              <i>
                <b className="purple">fun and stimulating </b> way to test your abilities across multiple disciplines, {" "}
                <b className="purple">
                  this platform is the perfect choice.
                  &nbsp;
                </b>
              </i>

            </p>
          </Col>
          {/* <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col> */}
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            {/* <h1>START GAME</h1> */}
            <Button variant="primary" as={Link} to={'/playground'} >Take a tour</Button>
            {/* <p>
              Feel free to <span className="purple">connect </span>with me
            </p> */}
            {/* <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/Soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/soumyajit4419/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul> */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
