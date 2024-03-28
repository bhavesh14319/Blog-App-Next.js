import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { UserContextProvider } from "@/UserContext";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";



export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {

    // START VALUE - WHEN LOADING WILL START
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    // COMPLETE VALUE - WHEN LOADING IS FINISHED
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

  }, [router.events]);




  return <>

    <UserContextProvider>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
      <Component {...pageProps} />
    </UserContextProvider>


  </>
}
