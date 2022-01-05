import { AnimatePresence } from "framer-motion";
import { Routes,Route } from "react-router-dom";
import App from '../App';
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
    return(
        <AnimatePresence initial={true} exitBeforeEnter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;