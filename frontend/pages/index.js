

export default function Home() {


  return (
    <>


    </>
  )
}

export async function getServerSideProps(context) {
  let props = {};

    const { req, res, query } = context;

    if (req.cookies.mytoken) {
      return {
        redirect: {
          destination: "/home",
          permanent: false
        }
      }
    }


  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  }
}

