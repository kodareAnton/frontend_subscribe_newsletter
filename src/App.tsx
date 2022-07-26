import React, { ChangeEvent } from 'react';
import './App.css';
import { useState } from "react"
import axios from 'axios';
import { request, ServerResponse } from 'http';
import { Http2ServerRequest } from 'http2';
import { useNavigate } from 'react-router-dom';

function App() {

  interface InewUser {
    username: String,
    password: String,
    subscribe: boolean
  }
  
  const [newUser, setNewUser] = useState<InewUser>({username:'', password:'', subscribe:false})
  const [logginUser, setLoggin] = useState<InewUser>({username:'', password:'', subscribe:false})
  
  // pushar till backend -> api
  function sendToApi(){
    axios.post<InewUser[]>('http://localhost:3000/users/add', newUser)
    .then(res =>{
      console.log(res, 'Rätt');
    }).catch(err =>{
      console.log(err, 'Fel');
    });
  }

  // använder oss av inputfällt i create user
function handleChange(e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>){
  let name:string = e.target.name;

  if(name == 'username' || name == 'password'){
    setNewUser({...newUser, [name]: e.target.value});
}
  else{
    console.log('Det blev fel');
}
}

// loggin funktion

interface Iusers {
    _id: string,
    username: String,
    password: String,
    subscribe: boolean
}

  // testning av loggin (fungerar inte än)
  const [error, setError] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLoggin = (e: any) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/users/loggin', {
      username: username,
      password: password
    }).then(response => {
      navigate('/loggedin')
      let GetPostData = response.data
      return localStorage.setItem('_id', GetPostData._id)
    }).catch(error => {
      console.log('err', error);
    })
  }

  return (
    <div className="App">

    <h1>Loggin</h1>
    <form>
      <label htmlFor="username">username</label><br />
      <input type="text" value={username} onChange={e => setUserName(e.target.value)} /><br />
      <label htmlFor="password">password</label><br />
      <input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLoggin}>Loggin</button><br />

      {error && <p className='error'>{error}</p>}
    </form>

<h1>Create User</h1>
    <form>
      <label htmlFor="username">user</label><br />
      <input type="text" name='username' onChange={handleChange}
      />
      <br />
      <label htmlFor="password">password</label><br />
      <input type="text" name='password' onChange={handleChange} 
      />
      <br />
      <button onClick={sendToApi}>skapa</button>
      </form>
    </div>
  );
}

export default App;