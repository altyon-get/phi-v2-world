import { Container } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Particle from "../Particle";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", password: "", cpassword: "", city: ""
    });
    const [disableBtn, setDisableBtn] = useState(false);
    let name, val;
    const handleInputs = (e) => {
        name = e.target.name;
        val = e.target.value;
        // const isRequired = e.target.required;
        // console.log(`Input field ${name} is required: ${isRequired}`);
        setUser({ ...user, [name]: val });
    };
    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword, city } = user;
        // console.log('xxx',name,email);
        if (name==='' || email==='' ) {
            // console.log('asfs');
            toast.error("ache se bhriye");
            return;
        }
        const url = "https://phi-v2-server.onrender.com/api/v1/users/create";
        setDisableBtn(true);
        axios.post(url, {
            name: name,
            email: email,
            password: password,
            cpassword: cpassword,
            city: city,
        }).then(res => {
            toast.success("Congratulations, Account created");
            setDisableBtn(false);
            navigate('/signin');
        }).catch((error) => {
            console.log(error.response);
            if (error.response && error.response.status === 422) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
            } else {
                // Handle other error scenarios
                toast.error("An unexpected error occurred");
            }
            setDisableBtn(false);
            
        });
        
    }
    return (
        <Container fluid className='project-section'>
            <div className='form-box signup-form'>
                <form method="POST" className="form-form" noValidate>
                    <div className="form-title">Welcome</div>
                    <div className="form-subtitle">Let's create your account!</div>
                    <div className="form-input-container form-ic1">
                        <input id="name"
                            className="form-input"
                            type="text"
                            placeholder=" "
                            name='name'
                            value={user.name}
                            onChange={handleInputs}
                            required
                        />
                        <div className="form-cut"></div>
                        <label htmlFor="name" className="form-placeholder">Name</label>
                    </div>
                    <div className="form-input-container form-ic2">
                        <input id="email" className="form-input" type="email" placeholder=" "
                            name='email'
                            value={user.email}
                            onChange={handleInputs}
                            required
                        />
                        <div className="form-cut form-cut-short"></div>
                        <label htmlFor="email" className="form-placeholder">Email</label>
                    </div>
                    <div className="form-input-container form-ic1">
                        <input id="password" className="form-input" type="password" placeholder=" "
                            name='password'
                            value={user.password}
                            onChange={handleInputs}
                            required
                        />
                        <div className="form-cut"></div>
                        <label htmlFor="firstname" className="form-placeholder">Password</label>
                    </div>
                    <div className="form-input-container form-ic1">
                        <input id="cpassword" className="form-input" type="password" placeholder=" "
                            name='cpassword'
                            value={user.cpassword}
                            onChange={handleInputs} required
                        />
                        <div className="form-cut form-cut-extra"></div>
                        <label htmlFor="firstname" className="form-placeholder">Confirm Password</label>
                    </div>
                    <div className="form-input-container form-ic1">
                        <input id="city" className="form-input" type="text" placeholder=" "
                            name='city'
                            value={user.city}
                            onChange={handleInputs}
                            required
                        />
                        <div className="form-cut form-cut-short"></div>
                        <label htmlFor="firstname" className="form-placeholder">City</label>
                    </div>
                    <button type="submit"
                        className="form-submit"
                        required
                        disabled={disableBtn}
                        onClick={PostData}>Submit</button>
                    <br />
                    <br />
                    <p className="form-btm-text"> Already a user? {' '}
                        <Link to="/signin"
                            className="form-btm-a" >Sign In </Link>
                    </p>
                </form>

            </div>
        </Container>
    );
}

export default SignUp; 