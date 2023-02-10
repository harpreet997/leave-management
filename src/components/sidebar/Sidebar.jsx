import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../../assets/HeaderLogo.png';
import '../../styles/dashboard.css';

const Sidebar = () => {
    const [showManage, setShowManage] = useState(true);

    const handleManage = () => {
        setShowManage(!showManage)    
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
            

        </div>

    )
}

export default Sidebar;

