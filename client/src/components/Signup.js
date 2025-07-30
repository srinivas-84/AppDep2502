
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
let [profilePic, setProfilePic] = useState("https://pulse.brninfotech.com/media/auth/images/no-pic3.png");

  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();

  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();


  let onSignupUsingFD = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value)
    dataToSend.append("lastName",lastNameInputRef.current.value)
    dataToSend.append("age",ageInputRef.current.value)
    dataToSend.append("email",emailInputRef.current.value)
    dataToSend.append("password",passwordInputRef.current.value)
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);
    

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
     dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
    }
    
    let reqOptions = {
      method:"POST",
      body:dataToSend
    };

    let JSONData = await fetch ("/signup",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
  }
  return (
    <div className="App">
      <form>
        <div>
          <label>First Name</label>
          <input type='text' ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input type='number' ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input type='email' ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input type='number' ref={mobileNoInputRef}></input>
        </div>
        <div>
          <img className='profilePic'  alt='' src={profilePic}></img>
        </div>
        <div>
          <label>Profile Pic</label>
          <input type='file'  ref={profilePicInputRef} onChange={(eo)=>{
            let selectedPath = URL.createObjectURL(eo.target.files[0]);
            setProfilePic(selectedPath);
          }}></input>
        </div>
        <div>
          <button type='button' onClick={()=>{onSignupUsingFD()}}>Signup</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <span>Alrady have an account<Link to="/">Login</Link></span>
    </div>
  );
}

export default Signup;
