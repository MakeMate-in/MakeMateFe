import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import { OPEN_ROUTES } from '../utils/constants';
import Home from '../components/Home';
import SignIn from '../components/Authentication/SignIn/signIn';
import SignUp from '../components/Authentication/Signup/signUp';
import ForgotPassword from '../components/Authentication/SignIn/forgotPassword';


const AppRoutes=()=>{
return(
    <Router>
    <Routes>
        <Route path={OPEN_ROUTES.PARENT_ROUTE} element={<Home/>}/>   
        <Route path={OPEN_ROUTES.SIGNUP} element={<SignUp/>}/>
        <Route path={OPEN_ROUTES.LOGIN} element={<SignIn />}/>
        <Route path={OPEN_ROUTES.FORGOTPASSWORD} element={<ForgotPassword />}/>
    </Routes>
    </Router>

)
}

export default AppRoutes
