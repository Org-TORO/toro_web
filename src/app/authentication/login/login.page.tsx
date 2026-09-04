import { useLogin } from "./login.hook";


function LoginPage() {

    const {
        handleSubmit,
        submitLoginForm,
        register
    } = useLogin();

    return (
        <div>
            <h2>Login Page</h2>

            <form onSubmit={handleSubmit(submitLoginForm)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        {...register("email")} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        {...register("password")} />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}


export default LoginPage;