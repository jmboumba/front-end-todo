import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [date_creation, setDateCreation] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the show/hide password state
};


  const handleSubmit = (e) => {
    
    if (email && password) {
        setError(''); // Clear any previous error
        setIsLoggedIn(true);
        // Logic for handling sign-in can go here (API call, etc.)
        console.log('Sign-In Successful!', { email, password });
    } else {
        setError('Please enter both email and password');
    }
  };

  return (
    <div>
      
      <div className="dotted-border">
        <nav>
          <ul>
            
            <div className="inline" style={{marginLeft:"100px", fontSize:"20px", fontWeight:"bold"}}>
              <li className="inline" ><a>Todo List</a></li>
            </div>
            <div className="inline" style={{paddingLeft:"60%"}}>
              
              {isLoggedIn ? (
                    <div>
                        <li className="inline" style={{paddingRight:"30px"}}><a>Hi,  Firstname</a></li>
                        <button className="btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
                    </div>
              ) : null}
            </div>
          </ul>
        </nav>
      </div>
      
      
      <div className='body'>
          {isLoggedIn ? (
                    <p>Welcome, {email}</p>
              ) : 
            (
              <div className="login-form">
            <h2>Sign In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='container-login'>
              <form onSubmit={handleSubmit}>
                  <div className='form-item'>
                      <input
                          type="email"
                          style={{height:"30px"}}
                          placeholder='Email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  <div className='form-item'>
                      <input
                          type={showPassword ? 'text' : 'password'} 
                          placeholder='Password'
                          style={{height:"30px"}}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className='form-item'>
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                        />
                        Show Password
                    </label>
                  </div>
                  <button type='submit' className="btn">Sign in</button>
              </form>
            </div>
        </div>
            )  
            }
      </div>
    </div>
  );
}

export default App;
