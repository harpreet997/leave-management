import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginLogo from '../../assets/LoginLogo.png';
import '../../styles/login.css';
import '../../App.css';

const Login = () => {
  const [logindata, setLogindata] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLogindata({
      ...logindata,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/dashboard');
    // axios.post('http://localhost:4000/api/v1/login', logindata)
    // .then((response) => {
    //   if(response.data.token)
    //   {
    //     localStorage.setItem("token", response.data.token);
    //     alert(response.data.msg);
    //     navigate('/dashboard');
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  }
  return (
    <div className="App">
      <div className='row'>
        <div className='col-lg-5'>
          <img src={LoginLogo} className='login-logo' alt="loginLogo" />
        </div>
        <div className='col-lg-1 d-flex vertical-row'>
          <div className="vr"></div>
        </div>
        <div className='col-lg-6'>
          <form onSubmit={handleLogin}>
            <p className='text-start fs-3'>Login</p>
            <div className="mb-3">
              <p className="text-start">Email Address</p>
              <input type="email" className="form-control w-50" id="email" name="email" placeholder="Enter your Email" onChange={handleChange}
                required />
            </div>
            <div className="mb-3">
              <p className="text-start">Password</p>
              <input type="password" className="form-control w-50" id="password" name="password" placeholder="Enter your Password" onChange={handleChange}
                required />
            </div>
            <div className='text-start'>
              <button className='btn btn-primary login-button' type='submit'><p className='fs-4'>Login</p></button>
            </div>
          </form>
          <p className='text-start'>Dont't have an account ? <Link to="/register" className='signup-link'>Sign Up</Link></p>

        </div>
      </div>
    </div>
  );
}

export default Login;
