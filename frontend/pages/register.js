import Register from '@/components/Register'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
const RegisterPage = () => {
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
        <title>Bloggle | Register</title>
      </Head>
      <Register />
    </>
  )
}

export default RegisterPage

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

