import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import { useCookies } from 'react-cookie';
import { BsFillPlayFill } from "react-icons/bs";
// import { Input, background } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import chatify from "../../../Assets/Projects/chatify.png";
import axios from "axios";
import { useSelector } from "react-redux";

const getShuffledPuzzle = () => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const rowOne = [],
    rowTwo = [],
    rowThree = [];

  while (values.length) {
    const random = Math.floor(Math.random() * values.length);

    if (rowOne.length < 3) {
      rowOne.push(values.splice(random, 1)[0]);
    } else if (rowTwo.length < 3) {
      rowTwo.push(values.splice(random, 1)[0]);
    } else {
      rowThree.push(values.splice(random, 1)[0]);
    }
  }

  return [rowOne, rowTwo, rowThree];
};

const flattenArray = arr => {
  return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
};

const getInversionsCount = arr => {
  arr = flattenArray(arr).filter(n => n !== 0);

  const inversions = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const currentValue = arr[i];
    const currentInversions = arr.filter(
      (val, j) => i < j && val < currentValue
    );
    inversions.push(currentInversions.length);
  }

  const inversionsCount = inversions.reduce((total, val) => total + val, 0);

  return inversionsCount;
};

const isSolvable = puzzle => {
  return getInversionsCount(puzzle) % 2 === 0;
};

const getPuzzle = () => {
  let puzzle = getShuffledPuzzle();

  while (!isSolvable(puzzle)) {
    puzzle = getShuffledPuzzle();
  }

  return puzzle;
};

export default function Game3() {
  ///////////////SdXXXXX///////////////////////
  const [hints, setHints] = useState("");
  const showHint = async () => {
    // window.alert('Your score deducted by 100');
    // setScore(score - 10);
    setHints(<p className="alert alert-success mx-auto">1f6432a8-61d2-4c95-86e3-0c9cc79d3a5c</p>);
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
  const props = {
    subtitle: "Do You Know how to solve sliding puzzle?",
    title: "Level-3",
    description: "Arrange them in ascending order, starting from row 1 and filling each subsequent row before moving to the next level, in minimum number of moves",
    lLink: "/level-1",
    nextLink: "/level-2",
    key3: "8aa19c70-6b7c-44a5-8348-9d6161bfbf25",
    key4: "1f6432a8-61d2-4c95-86e3-0c9cc79d3a5c",
  }
  // const [isLocked, setIsLocked] = useState(lock);
  // const [isSolved, setIsSolved] = useState((score != 0));
  const [inputKey, setInputKey] = useState('');

  const { isAdmin, loggedIn } = useSelector(state => state.user);
  const initializeUser = async () => {
    try {
      const res = await axios.get(
        'https://phi-v2-server.onrender.com/api/v1/users/getUserData',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(res.data.user, 'game3 authorized ');
      // const x = res.data;
      // const y = x.user;
      // const z = y.level3;
      // setScore(z.score);
      // setLock(z.locked);
    } catch (err) {
      console.log(err);
      navigate('/signin');
    }
  }

  const updateUser = async () => {
    let url = `https://phi-v2-server.onrender.com/api/v1/users/updateUser/3/`;
    try {
      // console.log(attempts,lock, ' -score bheja hun')
      // console.log(lock, ' -lock bheja hun')
      console.log(moves, lock, ' -data bheja hun')
      const res = await axios.post(url, {
        score: moves,
        locked: lock
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.log(err, 'game 3 update krne me errrrr');
      // navigate('/signin');  
    }
  }
  useEffect(() => {
    initializeUser();
  }, []);
  useEffect(() => {
    updateUser();
  }, [lock]);
  //////////////////////////////////////
  //////////////////////////////////////




  //////////////////////////////////////
  const [puzzle, setPuzzle] = React.useState([]);
  const [complete, setComplete] = React.useState(false);
  const [moves, setMoves] = React.useState(0);

  React.useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);
  //////////////////////////////////////
  const unlock = (e) => {
    console.log(e.target.value, "");
    if (props.key3 == inputKey) {
      console.log('match hogya')
      // fun1(false);
      setLock(false);
    }
    else console.log('match nhi hua h bkkokfs')
  }


  //////////////////////////////////////
  const movePiece = (x, y) => {
    if (!complete) {
      if (checkNeighbours(x, y) || checkNeighbours(x, y, 2)) {
        const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

        const newPuzzle = puzzle.map(row => row.slice());

        if (x === emptySlot.x && y < emptySlot.y) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y + 1];
          newPuzzle[x][y + 1] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        } else if (x === emptySlot.x && y > emptySlot.y) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y - 1];
          newPuzzle[x][y - 1] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        }

        if (y === emptySlot.y && x < emptySlot.x) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x + 1][y];
          newPuzzle[x + 1][y] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        } else if (y === emptySlot.y && x > emptySlot.x) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x - 1][y];
          newPuzzle[x - 1][y] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        }

        setPuzzle(newPuzzle);

        setMoves(moves + 1);

        checkCompletion(newPuzzle);
      }
    }
  };

  const checkCompletion = puzzle => {
    if (flattenArray(puzzle).join("") === "123456780") {
      // setScore(199);
      updateUser().then(() => {
        initializeUser();
      });
      setComplete(true);
    }
  };

  const checkNeighbours = (x, y, d = 1) => {
    const neighbours = [];

    if (puzzle[x][y] !== 0) {
      neighbours.push(
        puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y }
      );
      neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
      neighbours.push(
        puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y }
      );
      neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
    }

    const emptySlot = neighbours.find(el => typeof el === "object");

    return emptySlot;
  };

  const resetPuzzle = () => {
    setComplete(false);
    setPuzzle(getPuzzle());
    setMoves(0);
  };


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
              : <div>
                {

                  score ?
                    <div>
                      <br />
                      <br />
                      <h3>
                        Solved
                        <br />
                        [Score:{score}]
                      </h3>
                      <br />
                      <Button variant="primary" as={Link} to={'/level-5'} >
                        Next
                      </Button>
                    </div>
                    :
                    <div>
                      <br />
                      <Card.Text style={{ textAlign: "justify" }}>{props.description} </Card.Text>
                      <div className="game-ground$">
                        {<h3>Moves: {moves}</h3>}
                        <div
                          style={{
                            display: "inline-block",
                            backgroundColor: "darkgray",
                            border: `5px solid ${complete ? "black" : "gray"}`,
                            borderRadius: 5,
                            padding: 5
                          }}
                        >
                          {puzzle.map((row, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex"
                              }}
                            >
                              {row.map((col, j) => {
                                const color = col === 0 ? "transparent" : "lightgray";
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    onClick={() => movePiece(i, j)}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: 77,
                                      height: 77,
                                      margin: 2,
                                      backgroundColor: color,
                                      borderRadius: 5,
                                      cursor: complete ? "not-allowed" : "pointer",
                                      userSelect: "none"
                                    }}
                                  >
                                    <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                      {col !== 0 && col}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
            
                      </div>
                    </div>
                }
              </div>

            }
            {/* Body End*/}
            {/* Footer Start*/}
            <br />
            {/* Footer End*/}
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}
