import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { useCookies } from 'react-cookie';
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";
// import { Input, background } from "@chakra-ui/react";
import chatify from "../../../Assets/Projects/chatify.png";

import StarMatch from './LevelOne/StarMatch';
import axios from "axios";
// import GameLevelTwo from './Components/LevelTwo/StarMatchLevelTwo';
// import GameLevelThree from './Components/LevelThree/StarMatchLevelThree';
// import GameLevelFour from './Components/LevelFour/StarMatchLevelFour';
//////////GAME NEED////////////////

import utils from "./utils";
import PlayAgain from "./LevelOne/PlayAgain";
import StarsDisplay from './LevelOne/StarsDisplay';
import PlayNumber from './LevelOne/PlayNumber';
import { useSelector } from "react-redux";




const Game2 = () => {
    const [hints, setHints] = useState("");
    const showHint = async () => {
        // window.alert('Your score deducted by 10');
        // setScore(score - 100);
        setHints(<p className="alert alert-success mx-auto">8aa19c70-6b7c-44a5-8348-9d6161bfbf25</p>);
    }
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [userData, setUserData] = useState({});
    const [lock, setLock] = useState(true);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [cookies, setCookie] = useCookies();
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    const unlockKey = document.cookie.split('; ').find((row) => row.startsWith('key='))?.split('=')[1];
    const props = {
        imgPath: chatify,
        isBlog: false,
        score: 100,
        title: "Level-2",
        subtitle: "Do You Know basic maths?",
        description: "PICK 1 OR MORE NUMBERS THAT SUM TO THE NUMBERS OF STARS",
        lLink: "/level-1",
        key3: "8aa19c70-6b7c-44a5-8348-9d6161bfbf25",
        key2: "e2d30b35-eb33-4e34-8d13-4413ccf7f0eb",

    }
    // const [isLocked, setIsLocked] = useState(lock);
    const [isSolved, setIsSolved] = useState((score != 0));
    const [inputKey, setInputKey] = useState('');

    const initializeUser = async () => {
        try {
            const res = await axios.get(
                'https://phi-v2-server.onrender.com/api/v1/users/getUserData',
                { headers: { Authorization: `Bearer ${token}` } },
            );
            console.log(res.data.user, 'game2 authorized ZZZ');
            const x = res.data;
            const y = x.user;
            const z = y.level2;
            setScore(z.score);
            setLock(z.locked);
        } catch (err) {
            console.log(err);
            navigate('/signin');
        }
    }

    const updateUser = async (x, y) => {
        let url = `https://phi-v2-server.onrender.com/api/v1/users/updateUser/2/`;
        try {
            console.log(x, ' -score bheja hun');
            console.log(y, ' -lock bheja hun');
            const res = await axios.post(url, {
                score: x,
                locked: y
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
            console.log(err, 'game 1 update krne me err');
            // navigate('/signin');  
        }
    }


    ///////////////////////////GAME REQUIRED////////////////////////
    const key = 1;
    const [gameId, setGameId] = useState(1);
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(50);
    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active'
    const numberStatus = number => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };
    if (availableNums.length === 0) {
        // initializeUser();
        // console.log('game completedxxxxxxx');
        // console.log('game completedyyyyyyyyy');
        // setAttempts(secondsLeft*2+1);
        updateUser(2 * secondsLeft + 1, false);
        initializeUser();
    }
    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {

            return;
        }

        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };
    ///////////////////////////GAME REQUIRED////////////////////////


    const unlock = async (e) => {
        console.log(e.target.value, "");
        if (props.key2 == inputKey) {
            console.log('match hogyaxxx')
            // fun1(false);
            setLock(false);
            await updateUser(0, false);
            initializeUser();
            setSecondsLeft(50);
        }
        else {
            window.alert('Wrong key');
            // console.log('match nhi hua h bkkokfs')
        }
    }

    useEffect(() => {
        initializeUser();
    }, []);

    return (
        <Container fluid className="project-section">
            <Container className="project-card">
                <Card className="project-card-view my-5" >
                    {/*chao to isko backgournd img me set kr stke ho */}
                    {/* <Card.Img variant="top" src={props.imgPath} alt="card-img" /> */}

                    <Card.Body>
                        {/* headers STARTS */}
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Title>{props.subtitle}</Card.Title>
                        {/* headers ENDS */}

                        {/* Body STARTS */}
                        {console.log(score, ' -x')}
                        {  lock ?
                           //  LOCKSCREEN
                           <div className='game-ground-locked'>
                             <br />
                             <br />
                             <h2>
                               Currently Level is locked
                             </h2>
                             <br />
                             <br />
                             <br />
                             <Button variant="primary" onClick={unlock} >
                               Go Back
                             </Button>
                           </div>
                            :
                            //GAME BOX 
                            <div>
                                {
                                    score ?
                                        // RESULT SECTION 
                                        <div>

                                            <br />
                                            <h3>
                                                Solved
                                                <br />
                                                [Score:{score}]
                                            </h3>
                                            <br />
                                            <Button variant="primary" as={Link} to={'/level-3'} >
                                                Next
                                            </Button>
                                           
                                        </div>
                                        :
                                        // GAME SECTION 
                                        <div>
                                            <br />
                                            <Card.Text style={{ textAlign: "justify" }}>
                                                <br />
                                                {props.description}
                                            </Card.Text>
                                            <div className="game" >
                                                🆆🅴🅻🅲🅾🅼🅴
                                                <br />
                                                <br />
                                                {/* <div className="help">

PICK 1 OR MORE NUMBERS THAT SUM TO THE NUMBERS OF STARS
</div> */}
                                                <div className="body">
                                                    <div className="left">
                                                        <br />
                                                        {gameStatus !== 'active' ? (
                                                            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                                                        ) : (
                                                            <StarsDisplay count={stars} />
                                                        )}
                                                    </div>
                                                    <div className="right">
                                                        {utils.range(1, 9).map(number => (
                                                            <PlayNumber
                                                                key={number}
                                                                status={numberStatus(number)}
                                                                number={number}
                                                                onClick={onNumberClick}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <br />
                                                <br />
                                                <div className="timer">Time Remaining: {secondsLeft}</div>
                                            </div>
                                        </div>
                                }
                            </div>

                        }
                        {/* Body End*/}
                        {/* Footer Start*/}
                        {"\n"}
                        {"\n"}
                        <br />
                        <br />

                        {/* Footer End*/}
                    </Card.Body>
                </Card>
            </Container>
        </Container>
    );
};

export default Game2;