import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logForm, setLogForm] = useState(true);
  const [user_id, setUserId] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [todos, setTodos] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the show/hide password state
};

const fetchData = async (userId) => {
  try {
    // Dynamically interpolate user_id into the URL
    const response = await fetch(`https://back-end-todo-production.up.railway.app/todos/${userId}`, {
      method: 'GET',  // Use GET method to fetch data
      mode: 'cors',           // Enable CORS
      headers: {
        'Content-Type': 'application/json',  // This tells the server the expected response type, but no body is included in GET
      }
    });
  
    // Check if the request was successful (status code 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || 'Something went wrong!');
    } else {
      // Handle the response data (if successful)
      const data = await response.json();
      setTodos(data);
      console.log(data);
      console.log(userId);

      // Do something with the response data, for example, storing it in state
    }
  
  } catch (error) {
    setError('Something went wrong! Please try again.');
  }
}


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the payload (data) to send in the POST request
    const payload = {
      email,
      password,
    };

    try {
      // Make the POST request using fetch
      const response = await fetch(`https://back-end-todo-production.up.railway.app/signin`, {
        method: 'POST',
        mode: 'cors',           // Enable CORS
        headers: {
          'Content-Type': 'application/json', // Tells the server to expect JSON data
        },
        body: JSON.stringify(payload), // Send the payload as a JSON string
      });

      // Check if the response is OK (status 200)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setIsLoggedIn(true);// Store the token in the state
        setError('');

        setEmail(data.email);
        setUserId(data.user_id);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        console.log(firstname);
        localStorage.setItem('user', JSON.stringify(email));
        alert('Login successful!');

        fetchData(data.user_id);

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong! Please try again.');
    }

  };

  return (
    <div>
      
      <div className="dotted-border">
        <nav>
          <ul>
            <div className="inline" style={{ fontSize:"20px", fontWeight:"bold", marginLeft:"0px"}}>
              <li className="inline" ><a>Todo List</a></li>
            </div>
            <div className="inline" style={{float:"right"}}>
              { localStorage.getItem('user') ? (
                    <div>
                        <li className="inline" style={{marginRight:"10px"}}><a>Hi,  {firstname} {lastname}</a></li>
                        <button className="btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
                    </div>
              ) : null}
            </div>
          </ul>
        </nav>
      </div>
      
      
      <div className='body'>
          {localStorage.getItem('user') ? (
                    <div style={{padding: "70px 0px 0 100px", color:"white"}}>
                      <div className='inline'>
                        <p style={{fontSize:"25px"}}>Quick Todo</p><br></br>
                        <form >
                          <div className='form-item2'>
                              <p>Title</p>
                              <input
                                  type="email"
                                  style={{height:"30px", width:"300px"}}
                              />
                          </div>
                          <div className='form-item2'>
                              <p>Date</p>
                              <input
                                  type="date"
                                  style={{height:"30px", width:"300px"}}
                                  required
                              />
                          </div>
                          <div className='form-item2'>
                              <p>Description</p>
                          
                              <textarea
                                 // Bind the value of textarea to state
                                // Update state when text changes
                                style={{height:"100px", width:"300px"}}
                                placeholder="Type here..."
                                rows="5" // Sets the height of the textarea
                                cols="50" // Sets the width of the textarea
                                required
                              />
                          </div>
                          
                          <button type='submit' className="btn">Add todo</button>
                        </form>
                      </div>
                      <div className='inline' style={{paddingLeft:"300px"}}>
                          <p style={{fontSize:"25px"}}>User informations</p><br></br>
                          <p>ID : {user_id}</p><br></br>
                          <p>Firstname : {firstname}</p><br></br>
                          <p>Lastname : {lastname}</p><br></br>
                          <p>Email : {email}</p><br></br><br></br>
                          <p style={{fontSize:"25px"}}>Tasks</p><br></br>
                          <table>
                            <thead>
                              <th>To Do</th>
                              <th>Done</th>
                              <th>Total</th>
                            </thead>
                            <tbody>
                              <td>1</td>
                              <td>0</td>
                              <td>{todos.length}</td>
                            </tbody>
                          </table><br></br><br></br>
                      </div>
                    </div>
              ) : 
            (
            <>
                <div className='login-form'>
                  <div>
                  <a onClick={() => setLogForm(true)}>
                    <div className="span" style={{backgroundColor:logForm ? "red" : "white", }}>
                      <span>Login</span>
                    </div>
                  </a>
                  <a onClick={() => setLogForm(false)}>
                    <div className="span" style={{backgroundColor: logForm ? "white": "red"}}>
                      <span>Sign up</span>
                    </div>
                  </a>
                  </div>
                  {logForm ? (
                      <div className='container-login'>
                        <form onSubmit={handleSubmit}>
                          {error && <p style={{ color: 'red', paddingBottom:10 }}>{error}</p>}
                          <div className='form-item'>
                              <input
                                  className='input'
                                  type="email"
                                  placeholder='Email'
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                          </div>
                          <div className='form-item'>
                              <input
                                  className='input'
                                  type={showPassword ? 'text' : 'password'} 
                                  placeholder='Password'
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
                  ) : (
                    <div className='container-signup'>
                        <form onSubmit={handleSubmit}>
                          {error && <p style={{ color: 'red', paddingBottom:10 }}>{error}</p>}
                          <div className='form-item'>
                              <input
                                  className='input'
                                  type="text"
                                  placeholder='Firstname'
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                          </div>
                          <div className='form-item'>
                              <input
                                  className='input'
                                  type="text"
                                  placeholder='Lastname'
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                          </div>
                          <div className='form-item'>
                              <input
                                  className='input'
                                  type="email"
                                  placeholder='Email'
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                          </div>
                          <div className='form-item'>
                              <input
                                  className='input'
                                  type={showPassword ? 'text' : 'password'} 
                                  placeholder='Enter Password'
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                              />
                          </div>

                          <div className='form-item'>
                              <input
                                  className='input'
                                  type={showPassword ? 'text' : 'password'} 
                                  placeholder='Enter Password again'
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
                          <button type='submit' className="btn">Sign up</button>
                        </form>
                      </div>
                  )
                  
                  }
                </div>
            </>
            )  
            }
      </div>


      {localStorage.getItem('user') ? (
        <div>
        <center><br></br><br></br><br></br>
          <p style={{fontWeight:"bold"}}>TODOS</p><br></br><br></br><br></br>

          <ul>
            {todos.map((todo) => (
              <div key={todo.id} style={{border: "2px solid black", width:"15%", borderRadius:"5%"}}>
                <br></br>
                <p style={{fontWeight:"bold"}}>{todo.title} </p>
                <p><i>{todo.date}</i></p><br></br>
                <hr style={{width:"80%"}}></hr><br></br>
                <p>{todo.description}</p><br></br><br></br><br></br>
              </div>
            ))}
          </ul><br></br>
        </center>
      </div>
      ) : null}
      
    </div>
  );
}

export default App;
