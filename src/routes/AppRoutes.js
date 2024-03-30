import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import { OPEN_ROUTES } from '../utils/constants';
import Home from '../components/Home';

const AppRoutes=()=>{
return(
    <Router>
    <Routes>
        <Route path={OPEN_ROUTES.PARENT_ROUTE} element={<Home/>}/>   
    </Routes>
    </Router>

)
}

export default AppRoutes
