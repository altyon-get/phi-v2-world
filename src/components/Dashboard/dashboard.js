import React, { useState, useEffect } from 'react'
import Particle from '../Particle';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
import Tilt from "react-parallax-tilt";
import myImg from "../../Assets/avatar.svg";
import Card from "react-bootstrap/Card";
import { toast } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

export default function Board() {
    
    const [index, setIndex] = useState(0);
    const [uid, setUid] = useState(-1);
    const { isAdmin, loggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();
    const next = async () => {
        if (index + 4 < users.length) setIndex(index + 4);
        else setIndex(0);
        // console.log('nxt clicked', index);
    };
    const selectUid = async (id) => {
        // console.log(id, ' -xxx');
        setUid(id);
    }
    if (!isAdmin) navigate('/');

    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const url = "https://phi-v2-server.onrender.com/api/v1/users/getUsers";
        try {
            const response = await axios.get(url);
            setUsers(response.data.users);
        } catch (err) {
            toast.error("Server Error");
        }
    }

    useEffect(() => {
        getUsers();
    }, []);


    return (

        <section>
            <Particle />
            {
                uid == -1 ?
                    <Container fluid className='about-section'>
                        {List(users, index, next, selectUid)}
                    </Container>
                    :
                    <Container fluid className='about-section'>
                        {Profile(users, uid, selectUid)}
                        {/* hi */}
                    </Container>
            }
        </section>
    )
}
function List(users, index, next, selectUid) {
    return (
        <div className='project-section dashboard my-5'>
            <div className="board-board">
                <h1 className='board-leaderboard'>
                    <strong className="main-name">
                        Admin Dashboard
                    </strong>
                </h1>
                <div class="board-profile">
                    <div className="board-flex">
                        <Col xs={4}>
                            <div className="board-item">
                                <div className="board-info">
                                    <h2 className='board-name board-text-dark'>Users</h2>
                                </div>
                            </div>
                        </Col>
                        <Col>

                            <div className="board-item"><h3> L1</h3></div>
                        </Col>
                        <Col>

                            <div className="board-item"><h3> L2</h3></div>
                        </Col>
                        <Col>

                            <div className="board-item"><h3> L3</h3></div>
                        </Col>
                    </div>
                    {Item(users, index, selectUid)}
                </div>
                <Button variant="primary" onClick={next}>Next</Button>
            </div>
        </div>
    )
}
function Item(data, index, selectUid) {
    // console.log('hi ji imhere',index);
    data.sort((a, b) => {
        var keyA = a.score, keyB = b.score;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    // let list = data;


    let list = data.slice(index, index + 4);
    // console.log(data, ' -data');
    return (
        <>
            {
                list.map((value, i) => (
                    <>
                        {
                            <div className="board-flex">
                                <Col xs={4}>
                                    <div className="board-item">
                                        <div className="">
                                            <Link className='dashboard-profile-link' onClick={function () { selectUid(i + index); }}>
                                                <h4 className='board-name board-text-dark dashboard-profile'>
                                                    {(i + index + 1)}. {value.name}</h4>
                                            </Link>
                                            <span>
                                                [{value.score || 0}]
                                            </span>
                                        </div>
                                    </div>
                                </Col>

                                <Col>
                                    <br />
                                    <div className="board-item">
                                        {value.level1.locked ?
                                            <span>{<BiLock style={{ marginBottom: "2px" }} size={20} />}</span>
                                            : <span>{value.level1.score}</span>
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <br />
                                    <div className="board-item">
                                        {value.level2.locked ?
                                            <span>{<BiLock style={{ marginBottom: "2px" }} size={20} />}</span>
                                            : <span>{value.level2.score}</span>
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <br />
                                    <div className="board-item">
                                        {value.level3.locked ?
                                            <span>{<BiLock style={{ marginBottom: "2px" }} size={20} />}</span>
                                            : <span>{value.level3.score}</span>
                                        }
                                    </div>
                                </Col>
                            </div>
                        }
                    </>
                )
                )
            }
        </>


    )
}
function Profile(users, uid, selectUid) {
    // console.log(users[uid].level1.score,' -l1');
    const data = [
        { name: '𝘔𝘢𝘵𝘩s', x: users[uid].level1.score, y: 200 },
        { name: '𝘚𝘰𝘧𝘵', x: users[uid].level2.score, y: 200 },
        { name: '𝘟𝘠𝘡', x: users[uid].level3.score, y: 200 },
    ];
    return (
        <Container fluid className="about-section">
            {/* <Preloader load={load} /> */}
            <Particle />
            <Card className="project-card-view about-card">
                <Button variant="primary" onClick={function () { selectUid(-1) }}> Goto Dashboard </Button>
                <br />
                <div >
                    {/* <h1>this is about page</h1> */}
                    <Col  >
                        <Tilt>
                            <img src={myImg} className="img-fluid about-img w-25 h-25" alt="avatar" />
                        </Tilt>
                    </Col>
                    <br />
                    <h4><i>
                        <b >
                            {users[uid].name}
                        </b>
                    </i> </h4>
                </div>
                <Card.Body>
                    <Card.Title>
                        <i>
                            <b >
                                [Rank - {uid + 1}]
                            </b>
                        </i>
                    </Card.Title>

                    <br />
                    <Card.Title>
                        <Card.Text style={{ textAlign: "justify" }}>
                            <ResponsiveContainer width="70%" height={data.length * 70} className='mx-auto'>
                                <BarChart data={data} >
                                    <CartesianGrid />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="x" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="y" stackId="a" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Text>
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
    )
}
