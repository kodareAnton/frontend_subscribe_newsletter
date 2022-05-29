import { useState } from "react";

export function LoggedIn() {

  const [checked, setChecked] = useState(false)
  console.log(checked);
  

  return (
    <>
      <h1>HEJ!</h1>
      <input type="checkbox" 
      defaultChecked={checked}
      onChange={() => setChecked(!checked)}/>
    </>
  );
}

export default LoggedIn;