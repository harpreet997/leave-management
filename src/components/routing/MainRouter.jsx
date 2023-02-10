import { Routes, Route } from 'react-router-dom';
import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import ApplyLeave from '../leave/ApplyLeave';
import AllLeaves from '../leave/AllLeaves';

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leave" element={<Dashboard />} />
            <Route path="/apply-leave" element={<ApplyLeave/>} />
            <Route path="/all-leaves" element={<AllLeaves/>} />
        </Routes>
    )
}

export default MainRouter;