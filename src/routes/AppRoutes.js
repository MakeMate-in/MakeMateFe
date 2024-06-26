import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import { OPEN_ROUTES } from '../utils/constants';
import HomePage from '../components/HomePage/App'
import SignIn from '../components/Authentication/SignIn/signIn';
import SignUp from '../components/Authentication/Signup/signUp';
import ForgotPassword from '../components/Authentication/SignIn/forgotPassword';
import CustomerSignUP from '../components/Authentication/customerSignUp/customerSignUp';
import Dashboard from '../components/Vendor/Dashboard/Dashboard';
import DigitalFactory from '../components/Vendor/DigitalFactory/DigitalFactory';
import DashboardPage from '../components/Vendor/Dashboard/DashboardPage';
import CustomerSignIn from '../components/Authentication/SignIn/CustomerSignIn';
import CustomerDashboard from '../components/Customer/Dashboard';

const AppRoutes=()=>{
return(
    <Router>
    <Routes>
        {/* <Route path={OPEN_ROUTES.PARENT_ROUTE} element={<HomePage/>}/>    */}
        <Route path={OPEN_ROUTES.PARENT_ROUTE} element={<CustomerDashboard/>}/>   
        <Route path={OPEN_ROUTES.SIGNUP} element={<SignUp/>}/>
        <Route path={OPEN_ROUTES.LOGIN} element={<SignIn />}/>
        {/* <Route path={OPEN_ROUTES.CUSTOMER_LOGIN} element={<CustomerSignIn />}/> */}
        <Route path={OPEN_ROUTES.FORGOTPASSWORD} element={<ForgotPassword />}/>
        {/* <Route path={OPEN_ROUTES.CUSTOMER_SIGNUP} element={<CustomerSignUP/>}/> */}


        <Route path={OPEN_ROUTES.CUSTOMER_DASHBOARD} element={<CustomerDashboard/>}/>


        <Route element={<Dashboard/>}>
        <Route path={OPEN_ROUTES.VENDOR_DASHBOARD} element={<DashboardPage />}/>
        <Route path={OPEN_ROUTES.DIGITAL_FACTORY} element={<DigitalFactory/>} />
        </Route>
    </Routes>
    </Router>

)
}

export default AppRoutes
