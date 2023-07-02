import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { CgLock, CgShapeZigzag, CgWebsite } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";
// import { background } from "@chakra-ui/react";
import chatify from "../../../Assets/Projects/chatify.png";
import axios from "axios";
import { useSelector } from "react-redux";

// generate random number
let randomNumber = Math.round(Math.random() * 10);

const Game1 = () => {

  const [hints, setHints] = useState("");


  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState({});
  const [results, setResults] = useState("");
  const [lock, setLock] = useState(true);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [cookies, setCookie] = useCookies();
  const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
  const props = {
    imgPath: chatify,
    isBlog: false,
    // score: 100,
    title: "Level-1",
    subtitle: "Do You Know about Binary Search?",
    message: "Do You Know how websites remember your preferences",
    description: "Guess the correct number in minimum  number of steps to score more",
    lLink: "/level-1",
    nextLink: "/level-2",
    key1: "3dc4f297-7e6c-4b88-b9d2-9f44f7c6311d",
    key2: "e2d30b35-eb33-4e34-8d13-4413ccf7f0eb",
  }
  // const [isLocked, setIsLocked] = useState(lock);
  const [isSolved, setIsSolved] = useState((score != 0));
  const [inputKey, setInputKey] = useState('');

  const { isAdmin, loggedIn } = useSelector(state => state.user);
  const initializeUser = async () => {
 
      try {
        const res = await axios.get(
          'https://phi-v2-server.onrender.com/api/v1/users/getUserData',
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(res.data.user, 'game1 authorized ');
        const x = res.data;
        const y = x.user;
        const z = y.level1;
        setScore(z.score);
        setLock(z.locked);
      } catch (err) {
        console.log(err);
        navigate('/signin');
      }
    // }
  }
  useEffect(() => { initializeUser(); }, []);

  const updateUser = async (solved) => {
    let url = `https://phi-v2-server.onrender.com/api/v1/users/updateUser/1/`;
    try {
      // console.log(attempts,lock, ' -score bheja hun')
      // console.log(lock, ' -lock bheja hun')
      console.log(attempts, lock, ' -data bheja hun l1')
      let x=0;
      if(solved) x= (10 - attempts) * 10;

      const res = await axios.post(url, {
        score: x,
        locked: lock
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.log(err, 'game 1 update krne me err');
      // navigate('/signin');  
    }
  }
  useEffect(() => {
    updateUser(false);
  }, [lock]);

  useEffect(() => {
    const userGuess = parseInt(value, setValue);
    if (userGuess == randomNumber) {
      setIsSolved(true);
      // setScore(attempts);
      // console.log(lock,attempts,'');
      updateUser(true).then(() => {
        initializeUser();
      });
      // setScore(attempts);
      // console.log(lock, 'lock');
      // console.log(attempts, 'score');
      setResults(<p className="alert alert-success">Correct Answer</p>);
      setCookie('key2', 'e2d30b35-eb33-4e34-8d13-4413ccf7f0eb');
    }
  }, [attempts]);



  const onClick = () => {
    const userGuess = parseInt(value, setValue); // convert string to integer    
    setAttempts(attempts + 1);
    // If the user clicks 'Guess' without entering a number, ask them to pick a number
    setResults(<p className="alert alert-danger">Pick a number</p>);
    // If user input matches randomNumber, user guess is Correct!

    // If user input is higher than randomNumber, user guess is 'Too high'
    if (userGuess > randomNumber)
      setResults(<p className="alert alert-warning">Too high, guess again</p>);

    // If user input is lower than randomNumber, user guess is 'Too low'
    if (userGuess < randomNumber)
      setResults(<p className="alert alert-warning">Too low, guess again</p>);
  };
  // const fun1 = (data) => {
  //   setLock(data);
  // }
  const unlock = (e) => {
    console.log(e.target.value, "");
    if (props.key1 == inputKey) {
      console.log('match hogya');
      // fun1(false);
      setLock(false);
    }
    else {
      window.alert('Wrong key');
      console.log('match nhi hua h bkkokfsxx')
    }
  }

  const showHint = async () => {
    // window.alert('Your score deducted by 50');
    // setScore(score - 10);
    setHints(<p className="alert alert-success">{props.key2}</p>);
  }

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
            {lock ?
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
                {/* {console.log(score, ' -----xXXX')} */}

                {(score > 0) ?
                  // RESULT SECTION 
                  <div>
                    {/* {console.log(score, ' -x')} */}

                    <br />
                    <br />
                    <h3>
                      Solved
                      <br />
                      [Score:{score}]
                    </h3>
                    <br />
                    <Button variant="primary" as={Link} to={props.nextLink} >
                      Next
                    </Button>
                  
                    
                  </div>
                  :
                  // GAME SECTION 
                  <div>
                    <Card.Text style={{ textAlign: "justify" }}>{props.description} </Card.Text>
                    <div className="game-ground1">
                      {/* <h2> </h2> */}
                      <br />
                      <p className="lead">Number is between 1 and 10</p>
                      <input
                        value={value}
                        type="number"
                        onChange={e => setValue(e.target.value)}
                      />
                      <br />
                      <br />
                      <button type="submit" onClick={onClick}>
                        GUESS
                      </button>
                      <br />
                      <br />
                      attempts: {attempts}
                      <br />
                      {results}
                    </div>
                  </div>
                }
                <br />
                <br />
              </div>

            }
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};


export default Game1;
