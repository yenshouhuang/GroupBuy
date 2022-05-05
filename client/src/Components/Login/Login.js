import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Header from "../../Header";

async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function regUser(credentials) {
    return fetch('http://localhost:3001/post/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [regusername, setregUserName] = useState();
    const [regpassword, setregPassword] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setphoneNumber] = useState();

    // document.getElementsByid('register').style.display = 'hidden';

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        console.log(token)
        if (token.token === 'err') {
            alert('Something wrong with login credentials')
        } else {
            setToken(token);
            window.location.href = "http://localhost:3002"
        }

    }

    const reg = async e => {
        e.preventDefault();
        const token = await regUser({
            regusername,
            regpassword,
            email,
            phoneNumber
        });
        if (token === 45000) {
            alert('This username is already being used, please try another username.')
        }
        else {
            alert('Welcome to Group Buy')
            window.location.reload();
        }
    }

    return (
        <div class="login-wrapper">
            <div class="main">
                <Header />
                <input type="checkbox" id="chk" aria-hidden="true"></input>
                <div class='signup' >
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <form onSubmit={reg}>

                        <input required type="text" placeholder="User name" onChange={e => setregUserName(e.target.value)} />

                        <input required type="password" placeholder="Password" onChange={e => setregPassword(e.target.value)} />

                        <input required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />

                        <input required type="number" placeholder="Phone Number" onChange={e => setphoneNumber(e.target.value)} />

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    {/* <p><a href="./Register.js">Click to Register</a></p> */}
                </div>
                <div class="login">
                    <label for="chk" aria-hidden="true">Login</label>
                    <form onSubmit={handleSubmit}>

                        <input required type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />

                        <input required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
