import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/Login/login.module.css"
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/public/default.png"
import { registerUser } from "@/Actions/User";
import { userStateValue } from "@/UserContext";
import { userContext } from "@/UserContext";
import { useRouter } from "next/router";
import logo from "@/public/logo-no-background.svg"
import { TypeAnimation } from 'react-type-animation';
import Cookies from "js-cookie"; 

function Register() {

    const {user,token,loading,setUser,setLoading,setToken} = useContext(userContext);
    const router = useRouter();
   

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessages, setErrorMessages] = useState({});

    const [avatar, setAvatar] = useState(defaultImage);



    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true)        


        const res =  await registerUser(name, email, password, avatar);
        console.log("res ", res);

        if(res){
            console.log(res)
            setUser(res.user);
            setToken(res.token);
            setLoading(false);

            Cookies.set('mytoken',res.token,{expires: 7})

            router.push("/home");
        }   


    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        
        Reader.readAsDataURL(file);
        Reader.onload=(e)=>{
            if(Reader.readyState === 2){
                console.log(Reader.result);
                setAvatar(Reader.result);
            }
        }
    }

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
                    'Your Story Begins Here...😇',
                    1000,
                    'Join the Community...🤝',
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


    useEffect(()=>{
        console.log("Loading .. " , loading);
        console.log("User ", user);
        console.log("token ", token);
    },[loading,user,token]);


    return (

        <div className={styles.app}>
            <div className={styles.logoWrapper}>
            <Image className={styles.logo} alt="logo" src={logo} width={200} height={200}/>
            </div>
            <div className={styles.headerTitles}>
                <ExampleComponent/>
            </div>
            <div className={styles.form}>
                <div className={styles.title} style={{marginBottom:"0px"}}>Register</div>
                <form onSubmit={handleRegister}>

                    <div className={styles.avatarWrapper}>
                          <Image className={styles.avatar} src={avatar} width={100} height={100}  alt="user" />
                    </div>
                    <input className={styles.fileinput} type="file" accept="image/*" name="upload" id="pImg" onChange={handleImageChange} />
                    
                    <div className={styles.inputcontainer}>
                        <label>Name </label>
                        <input className={styles.input} type="text" name="uname" required value={name} onChange={(e)=>setName(e.target.value)}/>
                        {renderErrorMessage("uname")}
                    </div>

                    <div className={styles.inputcontainer}>
                        <label>Email </label>
                        <input className={styles.input} type="email" name="email" required  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        {renderErrorMessage("uname")}
                    </div>

                    <div className={styles.inputcontainer}>
                        <label>Password </label>
                        <input className={styles.input} type="password" name="pass" required value={password} onChange={(e)=>setPassword(e.target.value)} />
                        {renderErrorMessage("pass")}
                    </div>
                    <div className={styles.buttoncontainer}>
                        <input className={styles.submitbtn} type="submit" value={loading? "Processing...." : "Register"} />
                    </div>
                </form>

                <Link href={"/login"}>
                    <div className={styles.registerBox}>
                        <p>Already have an account? Log In</p>
                    </div>
                </Link>
            </div>
        </div>

    );
}

export default Register;