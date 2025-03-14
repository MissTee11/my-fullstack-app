import './Pages.css';

function LoginPage(){
    return(
        <div className="LogIn">
            <h2>Welcome!</h2>
            <form className="LoginForm">
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder="Enter username"/>

                <label htmlFor='username'>Password</label>
                <input type='text' placeholder="Enter password"/>

                <button>Log In</button>
            </form>

        </div>
    )
}
export default LoginPage;