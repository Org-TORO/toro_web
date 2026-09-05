import { Link } from "react-router-dom";
import { getAccessToken } from "../../infra/security/jwt.helper";


function HomePage() {

    const isAuthenticated = getAccessToken() !== null ? true : false;

    console.log(getAccessToken());
    

    return (
        <div>
            Home Page

            <br />

            {isAuthenticated ? "You are logged in" : "You are not logged in"}

            <br />

            <Link to="/login">Go to login page</Link>

            <br />
            
            <Link to="/private">Go to private page</Link>

        </div>
    )
}


export default HomePage;