import {
  Button,
  Image
} from 'antd'
// import getGoogleOAuthURL2 from '../Authentication/Google OAuth/googleSignupFunction';
import './homepage.css'
// import google from './../../images/google.png'
// import image3 from './../../images/image 3.png'
import { OPEN_ROUTES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

 
  return (
    <div className="div-style">
   
   
  
        <Button className="button create-account-button"
          onClick={() => {
            navigate(OPEN_ROUTES.SIGNUP)
          }}
        >
          <h3 style={{ color: 'white' }}>Create account</h3>
        </Button>
       
        <div className="already-account-div">
          <Button className="button home-sign-in-button"
            onClick={() => { navigate(OPEN_ROUTES.LOGIN) }}>
            <h3 style={{ color: 'rgb(29, 155, 240)' }} >Sign In</h3>
          </Button>
        </div>
      </div>


  )
}

export default Home
