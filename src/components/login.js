import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Login() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [todos, setTodos] = useState([]);
    const [isLogginForm, setIsLogginForm] = useState(true);
  
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
        window.location.href = '/dashboard';  // Navigates to the dashboard with full page reload
        // Do something with the response data, for example, storing it in state
      }
    
    } catch (error) {
      setError('Something went wrong! Please try again.');
    }
  }
  
  
    const login = async (e) => {
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

          console.log(data);
          localStorage.setItem('user', JSON.stringify(data));
          alert('Login successful!');

          window.location.href = '/dashboard';  // Navigates to the dashboard with full page reload

        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Login failed');
        }
      } catch (error) {
        setError('Something went wrong! Please try again.');
      }
  
    };


    const signup = async (e) => {
      e.preventDefault();
  
      // Create the payload (data) to send in the POST request
      const payload = {
        firstname,
        lastname,
        email,
        password,
      };

      if(password != cpassword){
        setError("The password don't match each other, please correct them.");
      }else{
        try {
          // Make the POST request using fetch
          const response = await fetch(`https://back-end-todo-production.up.railway.app/signup`, {
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
            setError('');
  
            console.log(data);
            alert('Account created successfully, connect to your account !');
  
            setIsLogginForm(true);
  
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Fails to create an account');
          }
        } catch (error) {
          setError('Something went wrong! Please try again.');
        }
      }
  
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          <center><a href='/'><img
                alt="Task"
                src="/images/task.png"
                className="h-8 w-auto"
              /></a>
          </center>
        </h2>
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {!isLogginForm ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form className="mt-6 space-y-4" onSubmit={isLogginForm ? login : signup}>
            {error && <p style={{ color: 'red', paddingBottom:10 }}>{error}</p>}
          {/* Firstname Input */}
          {!isLogginForm ? (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="firstname">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          ) : null}
          {/* Lastname Input */}
          {!isLogginForm ? (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="lastname">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your lastname"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          ) : null}
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Password confirm Input */}
          {!isLogginForm ? (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="cpassword">
                Confirm password
              </label>
              <input
                id="cpassword"
                name="cpassword"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'} 
                value={cpassword} 
                onChange={(e) => setCpassword(e.target.value)} 
                required
              />
            </div>
          ) : null}
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {!isLogginForm ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {!isLogginForm ? (
              <span>
                Already have an account?{" "}
                <button  
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {setIsLogginForm(true)}}
                >
                  Login here
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <button 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {setIsLogginForm(false)}}
                >
                  Sign up here
                </button>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
