import axios from "axios";
import { useEffect, useState } from "react";

export function LoggedIn() {

  interface IUser {
  _id: '',
  username: '',
  password: '',
  subscribe: false
  }
 
  const [checked, setChecked] = useState(false)
  const [Data, setData] = useState<IUser>()
  console.log(checked);

  const LocalStorageKey = localStorage.getItem('_id')

  // Hämtar användare med hjälp av nyckel
  useEffect(() => {
  axios.post<IUser>('http://localhost:3000/users/user', {
    _id: LocalStorageKey
  }).then(response => {
    let GetPostData = response.data
    setData(GetPostData)
  }).catch(error => {
    console.log('err', error);
  })
}, [])

// Ändrar användarens innehåll med hjälp av nyckel
function savePost(){
  axios
      .put("http://localhost:3000/users/"+LocalStorageKey, {
        username: Data?.username,
        subscribe: checked 
      }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then((res) => {
        console.log('result',res);
      })
      .catch((err) => {
        console.log(err, "Inte skickat");
      });
  }

  return (
    <>
      <h1>Hej {Data?.username}!</h1>
      <p>klicka i kryssboxen för att prenumerera eller att avprenumerera!!</p>
      <input type="checkbox" 
      defaultChecked={checked}
      onChange={() => setChecked(!checked)}/>

      <p>Din Prenumerationsstatus för tillfället: <strong>{String(Data?.subscribe)}</strong></p>
      <br />
      <button onClick={savePost}>Skicka in</button>
    </>
  );
}

export default LoggedIn;