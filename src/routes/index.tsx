import { AnimatePresence } from "framer-motion";
import { Routes,Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Welcome from "../pages/Welcome";
import ZoneForm from '../pages/zoneForm/ZoneForm';
import RegisterForm from '../pages/RegisterForm';
import Login from "../pages/Login";

const AppRoutes = () => {
    return(
        <AnimatePresence initial={true} exitBeforeEnter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/welcome" element={<Welcome/>}/>
                <Route path="/zones/new/:part" element={<ZoneForm/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;