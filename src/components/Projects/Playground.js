import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import chatify from "../../Assets/Projects/chatify.png";
import { useSelector } from "react-redux";
import axios from "axios";

function Projects() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const { isAdmin } = useSelector((state) => state.user);
  const [level1, setLevel1] = useState([]);
  const [level2, setLevel2] = useState([]);
  const [level3, setLevel3] = useState([]);

  const initializeUser = async () => {
    try {
      const res = await axios.get(
        "https://phi-v2-server.onrender.com/api/v1/users/getUserData",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const x = res.data;
      const y = x.user;
      const z1 = y.level1;
      const z2 = y.level2;
      const z3 = y.level3;
      setLevel1(z1.locked);
      setLevel2(z2.locked);
      setLevel3(z3.locked);
    } catch (err) {
      console.log(err);
      // Redirect to sign-in page or handle the error accordingly
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);



  return (
    <>
      {/* {console.log(level1, "legjdgjlsdkfja ckns")} */}
      {!isAdmin ? (
        <Container fluid className="project-section">
          <Particle />

          <Container>
            <br />
            <br />
            <h1 className="project-heading">
              Play<strong className="purple">Ground </strong>
            </h1>
            <p style={{ color: "white" }}>xyz abkjasf vksladfksdjllkj</p>
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
              <Col md={4} className="game-card">
                <ProjectCard
                  imgPath={bitsOfCode}
                  isLocked={level1}
                  title="Level-1"
                  description="this is description of this level, it will test this skill, will update later.............hahahahahhahihihiihihihahahahiah "
                  ghLink="level-1"
                />
              </Col>

              <Col md={4} className="game-card">
                <ProjectCard
                  imgPath={editor}
                  isLocked={level2}
                  title="Level-2"
                  description="this is description of this level, it will test this skill, will update later.............hahahahahhahihihiihihihahahahiah "
                  ghLink="level-2"
                />
              </Col>

              <Col md={4} className="game-card">
                <ProjectCard
                  imgPath={leaf}
                  isLocked={level3}
                  title="Level-3"
                  description="this is description of this level, it will test this skill, will update later.............hahahahahhahihihiihihihahahahiah "
                  ghLink="level-3"
                />
              </Col>
            </Row>
          </Container>
          <br />
          <br />
        </Container>
      ) : (
        <Container fluid className="project-section">
          <Particle />

          <Container>
            <br />
            <br />
            <h1 className="project-heading">
              Game <strong className="purple"> Dashboard </strong>
            </h1>
            <p style={{ color: "white" }}>
              Each level tests a specific skill set of the user
            </p>
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
              <Col md={4} className="game-card">
                <ProjectCard
                  imgPath={chatify}
                  isBlog={false}
                  title="Level-0"
                  description="this is description of this level, it will test this skill, will update later.............hahahahahhahihihiihihihahahahiah "
                  ghLink="level-1"
                />
              </Col>

              <Col md={4} className="game-card">
                <ProjectCard
                  imgPath={bitsOfCode}
                  isBlog={false}
                  title="Level-1"
                  description="this is description of this level, it will test this skill, will update later.............hahahahahhahihihiihihihahahahiah "
                  ghLink="level-2"
                />
              </Col>

              <Col md={4} className="game-card">
                <ProjectCard
                  imgPath={editor}
                  isBlog={false}
                  title="Level-2"
                  description="this is description of this level, it will test this skill, will update later.............hahahahahhahihihiihihihahahahiah "
                  ghLink="level-3"
                />
              </Col>
              <br/>
              <br/>

              <br/>

            </Row>
          </Container>
        </Container>
      )}
    </>
  );
}

export default Projects;
