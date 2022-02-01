import { AnimatePresence } from "framer-motion";
import { Routes,Route } from "react-router-dom";
import App from '../App';
import Dashboard from "../pages/Dashboard";
import ZoneForm from '../pages/zoneForm/ZoneForm';

const AppRoutes = () => {
    return(
        <AnimatePresence initial={true} exitBeforeEnter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/zones/new/:part" element={<ZoneForm/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;