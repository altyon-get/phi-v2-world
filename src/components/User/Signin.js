import { Link, useNavigate } from "react-router-dom";
import {  useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch} from 'react-redux'

function SignIn() {
  const dispatch = useDispatch();
  // const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies();
  // const [ setCookie] = useCookies();
  const [disableBtn, setDisableBtn] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      // console.log('asfs');
      toast.error("ache se bhriye");
      return;
    }
    setDisableBtn(true);
    const url = "https://phi-v2-server.onrender.com/api/v1/users/create-session";
    try {
      const response = await axios.post(
        url, {
        email: email,
        password: password
      }
      );
      // console.log(response.data, ' -PPP');
      // console.log(response.data.data, ' -user');
      // console.log(response.data.data.isAdmin, ' -admin');
      dispatch({ type: 'setAdmin', payload: response.data.data.isAdmin });
      dispatch({ type: 'setLoggedIn', payload: true });
      setCookie('token', response.data.data.token);
      toast.success("Good to see you again!");
      navigate('/');
    } catch (err) {
      console.log(err, '-xxx00');
      console.log(err.response, '-xxx00');
      setDisableBtn(false);
      if (!err?.response) {
        toast.error("Server Error");
      } else {
        toast.error(err.response.data.message);
      }
    }
  }

  return (
    <div className='form-box'>
      <div className="form-form">
        <div className="form-title">Welcome Back</div>
        <div className="form-subtitle"></div>
        <div className="form-input-container form-ic2">
          <input id="email" className="form-input" type="email" placeholder=" " name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-cut form-cut-short"></div>
          <label htmlFor="email" className="form-placeholder">Email</label>
        </div>
        <div className="form-input-container form-ic1">
          <input id="password" className="form-input" type="password" placeholder=" " name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-cut"></div>
          <label htmlFor="firstname" className="form-placeholder">Password</label>
        </div>
        <button type="submit"
          disabled={disableBtn}
          onClick={loginUser}
          className="form-submit">Sign In</button>
        <br />
        <br />
        <p className="form-btm-text"> New User? {' '}
          <Link to="/signup" className="form-btm-a" >Sign Up </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;