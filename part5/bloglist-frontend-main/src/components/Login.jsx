import Togglable from "./Togglable";

const LoginForm = (props) => {
  return (
    <>
      <div style={props.showWhenVisible}>
        <h1>Login</h1>
        <form onSubmit={props.inputHandle}>
          <div>
            username
            <input
              type="text"
              value={props.username}
              name="Username"
              onChange={({ target }) => props.setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={props.password}
              name="Password"
              onChange={({ target }) => props.setPassword(target.value)}
            />
          </div>
          <button type="submit" onClick={() => props.setLoginVisible(false)}>
            login
          </button>
        </form>
      </div>
    </>
  );
};

const Login = (props) => {
  const {
    username,
    password,
    setPassword,
    setUsername,
    inputHandle,
    user,
    setLoginVisible,
    handleLogout,
  } = props;

  const logoutButton = () => {
    return (
      <>
        <h2>User logged: {user.username}</h2>
        <button onClick={handleLogout}>Log out</button>
      </>
    );
  };

  const loginButton = () => {
    return(
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername} // corrected prop names
          setPassword={setPassword} // corrected prop names
          inputHandle={inputHandle} // corrected prop names
          setLoginVisible={setLoginVisible} // added setLoginVisible prop
        />
      </Togglable>
    );
  };

  return (
    <>
      {user === null ? loginButton() : logoutButton()}
    </>
  );
};

export default Login;