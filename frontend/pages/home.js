import { getAllBlogs } from '@/Actions/Blog'
import Home from '@/components/Home'
import Head from 'next/head'
import React from 'react'

const home = ({ blogsData }) => {
  return (
    <div>
      <Head>
        <title>
          Bloggle | Home
        </title>
      </Head>
      <Home blogs={blogsData} />
    </div>
  )
}

export default home


export async function getServerSideProps(context) {
  let blogsData = null;

  try {
    const { req, res, query } = context;
    const { id } = query
    console.log(req.cookies)
    if (req.cookies.mytoken) {
      const response = await getAllBlogs(req.cookies.mytoken);

      if (response) {
        blogsData = response.blogs
        // console.log("home ka data --------", blogsData)
      }
    }else{
      return {
        redirect : {
          destination:"/login",
          permanent:false
        }
      }
    }
    console.log(token)


  } catch (e) {
    console.log(e.message);
  }


  return {
    props: { blogsData }
  }
}
