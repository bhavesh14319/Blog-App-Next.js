import React, { useContext, useEffect, useState } from 'react'
import Login from '@/components/Login'

import Home from '@/components/Home';
import { useRouter } from 'next/router';
import Head from 'next/head';
const LoginPage = () => {
  const router = useRouter()
  const [token, setToken] = useState(null);


  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      router.push("/home");
    }
  }, [token,router])




  return (
    <>
      <Head>
        <title>Bloggle | Login</title>
      </Head>
      <Login />

    </>
  )
}

export default LoginPage



export async function getServerSideProps(context) {
  let props = {};
  const { req } = context;

  if (req.cookies.mytoken) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    }
  }


  return {
   props
  }
}
