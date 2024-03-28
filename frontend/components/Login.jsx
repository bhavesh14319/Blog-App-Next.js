import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/Login/login.module.css"
import Link from "next/link";
import { loginUser } from "@/Actions/User";
import { userContext } from "@/UserContext";
import { useRouter } from "next/router";
import { TypeAnimation } from 'react-type-animation';
import logo from "@/public/logo-no-background.svg"
import Image from "next/image";
import Cookies from "js-cookie"; 

function Login() {

    const router = useRouter();
    const { loading, setUser, setLoading, setToken } = useContext(userContext);

    const [email, setEmail] = useState("bhavesh@gmail.com");
    const [password, setPassword] = useState("123456");

    const [errorMessages, setErrorMessages] = useState({});


    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        const res = await loginUser(email, password);


        if (res) {
            console.log(res)
            setUser(res.user);
            setToken(res.token);
            setLoading(false);
            Cookies.set('mytoken',res.token,{expires: 7})
            router.push("/home");
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={styles.error}>{errorMessages.message}</div>
        );

    // JSX code for login form


    const ExampleComponent = () => {
        return (
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Welcome to Bloggle!! 👋',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Where Ideas Come Alive...💡',
                    1000,
                    'Ignite Your Imagination...🔥',
                    1000,
                    'Unlock Your Creativity...🧠',
                    1000,
                    'Elevate Your Voice...📈',
                    1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
            />
        );
    };


    return (

        <div className={styles.app}>
            <div className={styles.logoWrapper}>
            <Image className={styles.logo} alt="logo" src={logo} width={200} height={200}/>
            </div>
            <div className={styles.headerTitles}>
                <ExampleComponent/>
            </div>
            <div className={styles.form}>
                <div className={styles.title}>Sign In</div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputcontainer}>
                        <label>Email </label>
                        <input className={styles.input} placeholder="enter your email" type="text" name="uname" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {renderErrorMessage("uname")}
                    </div>
                    <div className={styles.inputcontainer}>
                        <label>Password </label>
                        <input className={styles.input} placeholder="enter your password" type="password" name="pass" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {renderErrorMessage("pass")}
                    </div>
                    <div className={styles.buttoncontainer}>
                        <input className={styles.submitbtn} type="submit" value={loading ? "Loggin In.." : "Login"} />
                    </div>
                </form>

                <Link href={"/register"}>
                    <div className={styles.registerBox}>
                        <p>Don&apos;t have account? Sign up</p>
                    </div>
                </Link>
            </div>
        </div>

    );
}

export default Login;

