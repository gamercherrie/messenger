import React, { useState} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

//Browser cookies
const cookies = new Cookies();

const initialState = {
    username: '',
    password: '',
}


const Authorize = () => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); //prevent from reloading the page
        //pass the form to the backedn
        const {username, password} = form;

        //url we are making a request to
        const URL = 'http://localhost:4449/auth';

        //use axios to make the request
        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL} login`, {
            //pass the object with all the data
            username, password,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('userId', userId);
        cookies.set('hashedPassword', hashedPassword);

        window.location.reload();
        //we reload the application so our authToken gets filled
    }

  return (
    <div className="authorize__form">
        <p>Sign In</p>
        <form onSubmit={handleSubmit}>
            <div className="form__attribute">
                <label htmlFor="username">Username</label>
                <input 
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form__attribute">
                <label htmlFor="password">Password</label>
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form__submit">
                <button> Sign In </button>
            </div>
        </form>
    </div>
  )
}

export default Authorize;