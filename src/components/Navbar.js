import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineHome, AiOutlineOrderedList, AiOutlineUser, } from "react-icons/ai";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { isAdmin, loggedIn } = useSelector(state => state.user);

  const Signout = async (e) => {
    dispatch({ type: 'setAdmin', payload: false });
    dispatch({ type: 'setLoggedIn', payload: false });
    updateExpanded(false);
    Cookies.remove('token');
    toast.success('Sucess out');
    navigate('/signin');
  }
  const Signin = async (e) => {
    // console.log('nav->signin click hua');
    updateExpanded(false);
    navigate('/signin');
  }
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>

            <h3 style={{ fontSize: "1.8em" }}>
              <span className="purple"> Phi</span>
            </h3>

          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/playground"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} />
                Playground
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              {!isAdmin ? <Nav.Link as={Link} to="/board" onClick={() => updateExpanded(false)}> <AiOutlineOrderedList style={{ marginBottom: "2px" }} />{" "} Leaderboard </Nav.Link>
                : <Nav.Link as={Link} to="/dashboard" onClick={() => updateExpanded(false)}> <AiOutlineOrderedList style={{ marginBottom: "2px" }} /> Admin Dashboard </Nav.Link>
              }
            </Nav.Item>

            <Nav.Item>
              {loggedIn ?
                <Nav.Link onClick={Signout}> <BiLogOut style={{ marginBottom: "2px" }} /> SignOut </Nav.Link>
                : <Nav.Link onClick={Signin}> <BiLogIn style={{ marginBottom: "2px" }} /> SignIn </Nav.Link>
              }
            </Nav.Item>

            <Nav.Item>
              {loggedIn ?
                <Nav.Link as={Link} to="/about" onClick={() => updateExpanded(false)}> <FaUserAlt style={{ marginBottom: "2px" }} /> Profile </Nav.Link>
                : <Nav.Link as={Link} to="/signUp" onClick={() => updateExpanded(false)}> <FaUserAlt style={{ marginBottom: "2px" }} /> SignUp </Nav.Link>
              }
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
