const Login = (loginProps) => {
    const {username, password, setPassword, setUsername, inputHandle, user, handleLogout} = loginProps

    const logged = () => (
        <>
        <h1>{user.username} logged-in</h1>
        <button onClick={handleLogout}>
            logout
        </button>
        </>
    )

    const loginForm = () => (
        <>
        <h1>Login</h1>
        <form onSubmit={inputHandle}>
            <div>username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
        </>
    )
    return (
        <>
            {user === null ? loginForm() : logged()}
        </>
    )
}

export default Login