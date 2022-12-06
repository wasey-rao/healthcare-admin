import "./register.scss"
import { useState, useContext } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { serverTimestamp, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { firestore } from "firebase/firestore"

const Register = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [qualification, setqualification] = useState("");
    const [contact, setContact] = useState("");

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (email && password && username && firstName && lastName && qualification && contact) {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const doctor = {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    qualification: qualification,
                    contact: contact,
                    email: email,
                    img: null,
                    timeStamp: serverTimestamp()
                };
                console.log("user ID: " + user.uid);

               await setDoc(doc(db, "doctors", user.uid), doctor).then(() => {
                    dispatch({ type: "LOGIN", payload: user });
                    navigate("/");
                }).catch((error) => {
                    setError(true);
                    setErrorMessage(error.message);
                });            
            })
            .catch((error) => {
                setError(true);
                setErrorMessage(error.message);
                console.log("Error", error.message)
                // ..
            });
        } else {
            setError(true);
            setErrorMessage("Please fill all the fields");
        }
    }
    return (
        <div className="register">
            <form onSubmit={handleRegister}>
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
                <input
                    type="text"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Qualificaion"
                    onChange={e => setqualification(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Gender"
                    onChange={e => setGender(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    onChange={e => setContact(e.target.value)}
                />
                <button type="submit">Register</button>
                {error && <span>{errorMessage}</span>}
            </form>
        </div>
    )
}

export default Register