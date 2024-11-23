/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function Profile() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');



    const fetchData = async (userId) => {
        try {
          // Dynamically interpolate user_id into the URL
          const response = await fetch(`https://back-end-todo-production.up.railway.app/users/${userId}`, {
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
            const results = await response.json();
            setData(results["user"][0]);
            console.log(results["user"][0]);
            // Do something with the response data, for example, storing it in state
        }
        
        } catch (error) {
          setError('Something went wrong! Please try again.');
        }
    }

    const updateData = async (e, userId) => {
        e.preventDefault();

        // Assurez-vous que tous les champs nécessaires sont remplis
        if (!firstname || !lastname || !email) {
            setError("Please fill in all fields.");
            return;
        }

        // Créez le payload (données) à envoyer dans la requête POST
        const payload = {
            firstname,
            lastname,
            email,
        };
  
          try {
            // Make the POST request using fetch
            const response = await fetch(`https://back-end-todo-production.up.railway.app/users/update/${userId}`, {
              method: 'POST',
              mode: 'cors',           // Enable CORS
              headers: {
                'Content-Type': 'application/json', // Tells the server to expect JSON data
              },
              body: JSON.stringify(payload), // Send the payload as a JSON string
            });
      
             // Vérifier si la réponse est OK (status 200)
            if (response.ok) {
                const data = await response.json(); // Analyser la réponse JSON
                setError(''); // Réinitialiser l'erreur en cas de succès
        
                console.log(data); // Afficher les données retournées par le serveur
        
                // Vous pouvez aussi afficher un message de succès à l'utilisateur ici
                alert("User data updated successfully!");
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update user data');
            }
            } catch (error) {
                setError('Something went wrong! Please try again.');
                console.error('Error:', error); // Vous pouvez logguer l'erreur pour le débogage
            }
    
    };


    // Utilisation de useEffect
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser).user : null;
        fetchData(user);

    }, []); // Tableau vide pour appeler fetchData au démarrage

  return (
    <form style={{padding:"5% 5% 5% 5%"}} onSubmit={updateData}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input                  
                  style={{fontSize:"15px"}}
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={data ? data.firstname : null}
                  autoComplete="given-name"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  style={{fontSize:"15px"}}
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={data ? data.lastname : null}
                  autoComplete="family-name"
                  onChange={(e) => setLastname(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  style={{fontSize:"15px"}}
                  id="email"
                  name="email"
                  type="email"
                  value={data ? data.email : null}                  
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={() => {window.location.href = '/dashboard'}}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
