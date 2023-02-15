import { Routes, Route } from 'react-router-dom';
import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import ApplyLeave from '../leave/ApplyLeave';
import AllLeaves from '../leave/AllLeaves';
import UserDashboard from '../userDashboard/UserDashboard';

const MainRouter = () => {

    const token = localStorage.getItem('token')

    console.log(token)
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={ token === null ? <Login /> : <Dashboard />} />
            <Route path="/userDashboard" element={token === null ? <Login /> : <UserDashboard />} />
            <Route path="/leave" element={token === null ? <Login /> : <Dashboard />} />
            <Route path="/apply-leave" element={token === null ? <Login /> : <ApplyLeave/>} />
            <Route path="/all-leaves" element={token === null ? <Login /> : <AllLeaves/>} />
        </Routes>
    )
}

export default MainRouter;