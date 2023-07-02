import React from 'react';
import { Button } from 'react-bootstrap';
// import '../../App.css';
import { Link } from "react-router-dom";
import axios from "axios";

const PlayAgain = (props) => {
  const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
  const updateUser = async (x, y) => {
    let url = `https://phi-v2-server.onrender.com/api/v1/users/updateUser/2/`;
    try {
      console.log(x, y, ' -data bheja hun')
      const res = await axios.post(url, {
        score: x,
        locked: y
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.log(err, 'game 2 update krne me err');
      window.alert('some error');
      // navigate('/signin');
    }
  }

  const fun = () => {
    window.location.reload();
  }

  if (props.gameStatus !== 'lost') {
    console.log('game complete lr liya');
    updateUser(99, false);
  }

  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
      >
        {props.gameStatus === 'lost' ?
          <div>
            'Oops! Game Over!
          </div>
          :
          'Nice! Play You Won'
        }

      </div>
      {
        props.gameStatus === 'lost' ?
          <button onClick={fun}>Try Again</button> : <></>
      }
      {/* <button ><a href="/LevelTwo">Next Level</a></button> */}

    </div>
  );
};

export default PlayAgain;