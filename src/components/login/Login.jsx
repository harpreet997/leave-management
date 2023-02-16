import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLogo from '../../assets/LoginLogo.png';
import { login } from '../../postdata/postdata';
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
    login(logindata)
      .then((response) => {
        if (response.data.data.role === "Admin") {
          localStorage.setItem('token', response.data.token)
          alert(response.data.message);
          navigate('/dashboard');
          window.location.reload(false);
        }
        else{
          localStorage.setItem('token', response.data.token)
          alert(response.data.message);
          navigate('/userDashboard');
          window.location.reload(false);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      })
  }

  
  return (
    <div className="container-fluid" style={{ backgroundColor: 'purple' }}>
      <div className="App" >
        <div className='row' style={{paddingTop: 200}}>
          <div className='col-lg-5'>
            <img src={LoginLogo} className='login-logo' alt="loginLogo" />
          </div>
          <div className='col-lg-1 d-flex vertical-row vertical-line'>
            <div className="vr vertical-line"></div>
          </div>
          <div className='col-lg-6 align-items'>
            <form onSubmit={handleLogin}>
              <p className='text-start fs-3 text-color'>Login</p>
              <div className="mb-3">
                <p className="text-start text-color">Email Address</p>
                <input type="email" className="form-input-width form-control w-50" id="email" name="email" placeholder="Enter your Email" onChange={handleChange}
                  required />
              </div>
              <div className="mb-3">
                <p className="text-start text-color">Password</p>
                <input type="password" className="form-input-width form-control w-50" id="password" name="password" placeholder="Enter your Password" onChange={handleChange}
                  required />
              </div>
              <div className='text-start'>
                <button className='btn btn-primary login-button' type='submit'><p className='fs-4'>Login</p></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
