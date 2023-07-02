import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import axios from 'axios';
import Particle from "../Particle";
// import Github from "./Github";
// import Techstack from "./Techstack";
// import Aboutcard from "./AboutCard";
// import laptopImg from "../../Assets/about.png";
// import Toolstack from "./Toolstack";
import Tilt from "react-parallax-tilt";
import myImg from "../../Assets/avatar.svg";
import Card from "react-bootstrap/Card";
import Preloader from '../Pre'
// import Button from "react-bootstrap/Button";
// import { CgWebsite } from "react-icons/cg";
// import { BsFillPlayFill } from "react-icons/bs";
// import Cookies from "js-cookie";
// import { useDispatch, useSelector } from 'react-redux';
// import { setGlobalBoolean } from '../../globalSlice';
import {  useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

function About() {
    const [load, upadateLoad] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            upadateLoad(false);
        }, 1300);
        return () => clearTimeout(timer);
    }, []);
    // const [userData, setUserData] = useState({});
    const [ setUserData] = useState({});
    // const [userScore, setUserScore] = useState(0);
    const [setUserScore] = useState(0);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const globalBoolean = useSelector(state => state.global.globalBoolean);
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    // console.log(token, "ye last");
    const initializeUser = async () => {
        try {
            const res = await axios.get(
                'https://phi-server4.onrender.com/api/v1/users/getUserData',
                { headers: { Authorization: `Bearer ${token}` } },
            );

            console.log(res.data, ' --data');
            // console.log(res.data.user.level1.score, ' --score');
            const x = res.data;
            const y = x.user;
            // const z = y.level1;
            const a = y.level1, b = y.level2, c = y.level3;
            //  d = y.level4;
            // const y=x.data;
            setUserScore(a.score + b.score + c.score );
            setUserData(y);

        } catch (err) {
            console.log(err);
            navigate('/signin');
        }

    }


    useEffect(() => {
        initializeUser();
    }, []);

    return (
        <Container fluid className="about-section">
            <Preloader load={load} />
            <Particle />
            <Card className="project-card-view about-card">
                <div >
                    {/* <h1>this is about page</h1> */}
                    <Col  >
                        <Tilt>
                            <img src={myImg} className="img-fluid about-img" alt="avatar" />
                        </Tilt>
                    </Col>
                    <br />
                    <h3><i>
                        <b >
                            [User Name -UPD]
                        </b>
                    </i> </h3>
                </div>
                <Card.Body>
                    <Card.Title>
                        <i>
                            <b >
                                [User Score -UPD]
                            </b>
                        </i>
                    </Card.Title>
                    <Card.Text style={{ textAlign: "justify" }}>
                        <br />
                        <i>
                            <b className="purple">
                                [user skills -UPD]
                            </b>
                        </i>
                        <i>
                            <b className="purple">
                                [user skills -UPD]
                            </b>
                        </i>
                    </Card.Text>
                    <Card.Text style={{ textAlign: "justify" }}>
                        <i>
                            <b className="purple">
                                [user skills -UPD]
                            </b>
                        </i>
                        <i>
                            <b className="purple">
                                [user skills -UPD]
                            </b>
                        </i>
                    </Card.Text>

                    {/* <Button variant="primary" onClick={Signout}>
                        <BsFillPlayFill /> &nbsp;Sign out
                    </Button> */}
                    <br />
                    <br />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default About;
