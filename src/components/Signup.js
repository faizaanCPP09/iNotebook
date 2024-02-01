import React, {useState} from 'react'
//importing of useNavigate 'hook' 
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "" , email: "", password: "" , cpassword: ""}) //states
  let navigate = useNavigate();  //navigate hook

  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();   
    const {name, email, password} = credentials  //destructing of credentials

    //Fetch API headers:
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    console.log(json.authtoken)

    // console.log(response.body)
    // console.log(json);

    //saving and redirecting to home using navigate hook
    if (json.authtoken){
        // Save the auth token and redirect
        localStorage.setItem('token',json.authtoken); 
        navigate("/");
        props.showAlert("Account Created Successfully","success")
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
}

//Onchange arrow function
const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input type="text" className="form-control" id="text" name = "name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name = "email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name = "password" onChange={onChange} placeholder="Password" minLength={5} required />
          </div>
          <div className="form-group my-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name = "cpassword" onChange={onChange} placeholder="Password" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup;
