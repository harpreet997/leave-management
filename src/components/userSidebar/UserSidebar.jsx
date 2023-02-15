import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import HeaderLogo from '../../assets/HeaderLogo.png';
import '../../styles/dashboard.css';

const UserSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logging out');
        navigate('/');
    }

    return (
        <div className="sidebar">
            <img src={HeaderLogo} alt="HeaderLogo" className='img-width' />
            <NavLink className="fs-6 fw-bold" to="/userDashboard"
            >Dashboard</NavLink>
            <div className='d-flex'>
            <p className='fs-6 fw-bold mt-4' style={{ marginLeft: 15, marginTop: 8, cursor: 'pointer' }} onClick={handleLogout}>Logout</p>
            <GrLogout className="shopping-bag" style={{  marginTop: 25, marginLeft: 5, width: 20, height: 20, cursor: 'pointer' }} onClick={handleLogout} />
            
            </div>
            

        </div>

    )
}

export default UserSidebar;

