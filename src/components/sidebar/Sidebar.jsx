import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import HeaderLogo from '../../assets/HeaderLogo.png';
import '../../styles/dashboard.css';

const Sidebar = () => {
    const [showManage, setShowManage] = useState(true);
    const navigate = useNavigate();

    const handleManage = () => {
        setShowManage(!showManage)    
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logging out');
        navigate('/');
    }

    return (
        <div className="sidebar">
            <img src={HeaderLogo} alt="HeaderLogo" className='img-width' />
            <NavLink className="fs-6 fw-bold" to="/dashboard"
            >Dashboard</NavLink>
            <NavLink className='fs-6 fw-bold' to="/leave"
                onClick={handleManage}>Leaves</NavLink>
            {showManage ? (
                <>
                    <NavLink to="/apply-leave" className='fs-6'
                    >Apply Leave</NavLink>
                    <NavLink to="/all-leaves" className='fs-6'
                    >All Leaves</NavLink>
                </>
            ) : null}
            <div className='d-flex'>
            <p className='fs-6 fw-bold' style={{ marginLeft: 15, marginTop: 8,cursor: 'pointer' }} onClick={handleLogout}>Logout</p>
            <GrLogout className="shopping-bag" style={{  marginTop: 10, marginLeft: 5, width: 20, height: 20, cursor: 'pointer' }} onClick={handleLogout} />
            
            </div>
            

        </div>

    )
}

export default Sidebar;

