import { Routes, Route } from 'react-router-dom';
import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import ApplyLeave from '../leave/ApplyLeave';
import AllLeaves from '../leave/AllLeaves';
import UserDashboard from '../userDashboard/UserDashboard';
import EmployeeList from '../employee/EmployeeList';
import ProjectList from '../projects/ProjectList';

const MainRouter = () => {

    const token = localStorage.getItem('token')
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={ token === null ? <Login /> : <Dashboard />} />
            <Route path="/userDashboard" element={token === null ? <Login /> : <UserDashboard />} />
            <Route path="/leave" element={token === null ? <Login /> : <Dashboard />} />
            <Route path="/apply-leave" element={token === null ? <Login /> : <ApplyLeave/>} />
            <Route path="/all-leaves" element={token === null ? <Login /> : <AllLeaves/>} />
            <Route path="/employees" element={token === null ? <Login /> : <EmployeeList/>} />
            <Route path="/projects" element={token === null ? <Login /> : <ProjectList/>} />
        </Routes>
    )
}

export default MainRouter;