import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props => {
    const [ user, setUser ] = useState({ username : "", password : "", role : "user" });
    const [ message, setMessage ] = useState(null);
    let timerID = useRef(null);
    
    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = event => {
        setUser({ ...user, [event.target.name] : event.target.value })
    }
    
    const resetForm = () => {
        setUser( { username: "", password: "", role: "" });
    }

    const onSubmitClick = event => {
        event.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(() => {
                    props.history.push('/login');
                },2000)
            }
        })
    }

    return (
        <div>
            <form onSubmit={onSubmitClick}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" name="username" onChange={onChange} className="form-control" placeholder="Enter Username" value={user.username}/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" name="password" onChange={onChange} className="form-control" placeholder="Enter Password" value={user.password}/>
                <button className="btn btn-large btn-primary btn-block" type="submit">Register</button>
            </form>
            { message ? <Message message={ message } /> : null }
        </div>
    )
};

export default Register;