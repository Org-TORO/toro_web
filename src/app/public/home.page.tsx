import { Link } from "react-router-dom";
import { useAuthStore } from "../../infra/security/auth.store";


function HomePage() {

    const { isAuthenticated } = useAuthStore();

    console.log(isAuthenticated);
    

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