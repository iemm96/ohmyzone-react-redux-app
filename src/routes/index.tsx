import { AnimatePresence } from "framer-motion";
import { Routes,Route } from "react-router-dom";
import App from '../App';
import Dashboard from "../pages/Dashboard";
import Uploader from "../pages/Uploader";

const AppRoutes = () => {
    return(
        <AnimatePresence initial={true} exitBeforeEnter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/uploader" element={<Uploader/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;