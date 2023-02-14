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
            <GrLogout className="shopping-bag" style={{ marginTop: 20, marginLeft: 10, width: 50, height: 40, cursor: 'pointer' }} onClick={handleLogout} />
            <p className='fs-6 fw-bold mt-4' style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</p>
            </div>
            

        </div>

    )
}

export default UserSidebar;

