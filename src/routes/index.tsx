import { AnimatePresence } from "framer-motion";
import { Routes,Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ZoneForm from '../pages/zoneForm/ZoneForm';
import RegisterForm from '../pages/RegisterForm';
import Login from "../pages/Login";
import DashboardLayout from "../components/DashboardLayout";
import ZoneDashboard from "../pages/ZoneDashboard";
import UserProfile from "../pages/UserProfile";
import UserSubscription from "../pages/UserSubscription";
import ConfirmEmail from '../pages/ConfirmEmail';

const AppRoutes = () => {
    return(
        <AnimatePresence initial={true} exitBeforeEnter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/confirm/email/:user/:token" element={<ConfirmEmail/>}/>
                <Route element={ <DashboardLayout/> }>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/dashboard/:token" element={<Dashboard/>}/>
                    <Route path="/zones/new/:part" element={<ZoneForm/>}/>
                    <Route path="/zones/new/:part/:zone" element={<ZoneForm/>}/>

                    <Route path="/zones/edit/:part/:zone" element={<ZoneForm/>}/>
                    <Route path="/zones/:zone" element={<ZoneDashboard/>}/>

                    <Route path="/profile" element={<UserProfile/>}/>
                    <Route path="/subscription" element={<UserSubscription/>}/>
                </Route>

            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;