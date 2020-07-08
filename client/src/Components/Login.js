import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmitClick = event => {
    event.preventDefault();
    AuthService.login(user).then(data => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/todos');
      } else setMessage(message);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitClick}>
        <h3>Please Sign In</h3>
        <label htmlFor="username" className="sr-only">
          Username:{' '}
        </label>
        <input
          type="text"
          name="username"
          onChange={onChange}
          className="form-control"
          placeholder="Enter Username"
        />
        <label htmlFor="password" className="sr-only">
          Password:{' '}
        </label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          className="form-control"
          placeholder="Enter Password"
        />
        <button className="btn btn-large btn-primary btn-block" type="submit">
          Log In
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
