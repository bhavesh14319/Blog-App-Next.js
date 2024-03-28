import React, { useEffect } from 'react'
import styles from "@/styles/header/header.module.css"
import Link from 'next/link'
import { logoutUser } from '@/Actions/User'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2'
import logo from "@/public/inverted-logo.png"
import Image from 'next/image'
import Cookies from "js-cookie";


const Header = () => {

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    let res = null;
    Swal.fire({
      title: "Do you want logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        res = await logoutUser();
        if (res) {
          Cookies.remove('mytoken')
          Swal.fire("Logged Out!", "", "success").then(() => {
            router.push("/login");
          });

        }

      }
    });




  }
  return (
    <div className={styles.headerbox}>


      <div className={styles.logoWrapper}><Link href={"/home"}><Image src={logo} alt='logo' width={150} height={150} /> </Link></div>

      {/* <div className={styles.hambCont}> */}
        <input className={styles.sidemenu} type="checkbox" id="side-menu"  />
        <label className={styles.hamb} htmlFor='side-menu' ><span className={styles.hambline}></span></label>
      {/* </div> */}
      <nav className={styles.menucontainer}>
        <ul className={styles.menulist}>
          {/* {console.log(pathname)} */}
          <Link href={pathname == "/home/" ? "/myblogs" : "/home"}><li className={styles.listItem}>{pathname == "/home/" ? "My Blogs" : "All Blogs"}</li></Link>
          <Link href={"/createblog"} ><li className={styles.listItem}>Create Blog</li></Link>
          <li className={styles.listItem} onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

    </div>
  )
}

export default Header
