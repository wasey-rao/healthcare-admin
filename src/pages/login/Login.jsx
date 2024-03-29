import "./login.scss"
import { useState, useContext } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(false);
        // Signed in 
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload: user});
        navigate("/")
      })
      .catch((error) => {
        setError(true);
      });
  }
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        {error && <span>wrong email or password</span>}
        <button type="submit">Login</button>
        <Link className="link" to="/register">Register</Link>
      </form>
        {/* <button onClick={navigate("/register")}>Register</button> */}
    </div>
  )
}

export default Login