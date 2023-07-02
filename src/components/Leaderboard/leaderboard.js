import React, { useState, useEffect } from 'react'
// import Profiles from './profiles';
// import { Leaderboard } from './database';
import { Container } from 'react-bootstrap';
import Particle from '../Particle';
import axios from 'axios';
import Button from "react-bootstrap/Button";
// import { Link, useNavigate } from "react-router-dom";
import profileImg from '../../Assets/avatar.svg'


export default function Board() {
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const initializeUser = async () => {
        try {
            const res = await axios.get('https://phi-v2-server.onrender.com/api/v1/users/getUsers');
            console.log(res.data, 'ye mila');
            setUsers(res.data.users);
        } catch (err) {
            console.log(err, 'err in fecthing data xxxxxx');
            // navigate('/');
        }
    }

    useEffect(() => {
        initializeUser();
    }, []);

    const next = async () => {
        if(index+4<users.length) setIndex(index + 4);
        else setIndex(0);
        console.log('nxt clicked', index);
    };

    return (
        <section>
            <Particle />
            <Container fluid className='about-section'>
                {fun(users, index, next)}
            </Container>
        </section>
    )
}
function fun(users, index, next) {
    return (
        <div className='board-main'>
            <div className="board-board">
                <h1 className='board-leaderboard'>
                    <strong className="main-name">
                        Leaderboard
                    </strong>
                </h1>

                {/* <div className="board-duration">
                        <button onClick={handleClick} data-id='7'>7 Days</button>
                        <button onClick={handleClick} data-id='30'>30 Days</button>
                        <button onClick={handleClick} data-id='0'>All-Time</button>
                    </div> */}
                {/* {console.log(leaderboard);} */}
                {/* <Profiles Leaderboard={users} index={index} ></Profiles> */}
                <div class="board-profile">
                    {Item(users, index)}
                </div>
                <Button variant="primary" onClick={next}>Next</Button>
            </div>
        </div>
    )
}
function Item(data, index) {
    // console.log('hi ji imhere')
    data.sort((a, b) => {
        var keyA = a.score, keyB = b.score;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    // let list = data;
    let list = data.slice(index,index+4);
    // console.log(data, ' -data');
    return (
        <>
            {
                list.map((value,i) => (
                    <>
                        {
                            <div className="board-flex">
                                <div className="board-item">
                                    {(i + index + 1)}.
                                    &nbsp; <img src={profileImg} alt="" />

                                    <div className="board-info">
                                        <h3 className='board-name board-text-dark'>{value.name}</h3>
                                        <span>
                                            <i>
                                                [ {value.city || 'unknown'} ]
                                            </i>
                                        </span>
                                    </div>
                                </div>
                                <div className="board-item">
                                    Score:<span>{value.score || 0}</span>
                                </div>
                            </div>
                        }
                    </>
                )
                )
            }
        </>


    )
}

// function between(data, between) {
//     const today = new Date();
//     const previous = new Date(today);
//     previous.setDate(previous.getDate() - (between + 1));

//     let filter = data.filter(val => {
//         let userDate = new Date(val.dt);
//         if (between == 0) return val;
//         return previous <= userDate && today >= userDate;
//     })

//     // sort with asending order
//     return filter.sort((a, b) => {
//         if (a.score === b.score) {
//             return b.score - a.score;
//         } else {
//             return b.score - a.score;
//         }
//     })

// }
