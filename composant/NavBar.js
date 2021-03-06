import Image from "next/image"
import Link from "next/link"
import { GraphQLClient, gql } from 'graphql-request'
import logo from "../public/disney.png"
import { useRouter } from 'next/router'

import { BiUserPin } from "react-icons/bi";
import { useEffect, useState } from "react";

const Navbar=({check=false,accounts=false})=>{
    const [user,setUser]=useState(false)
    const route= useRouter()

    
     
     useEffect(()=>{
        setUser(localStorage.getItem('id')? localStorage.getItem('id'):false)
    },[])
    
    
    const data=[]
    accounts && accounts.map((v)=> {
        v.id === user && data.push(v)
    } )

    return <>
    <div className="nav-bar">
    <Link href="/">
        <a>
        <Image src={logo} alt="Disney Logo" width={90} height={50}/>
        </a>
    </Link>
    <div className="account">
        {user ?
        <div  className="account">
            <Link  href={`/login/client/${data[0].id}`}>
            <a className="wel">
            <p > Welcome {data[0].userName}</p>
            </a>
            </Link>
           {data[0].avatar?
         <img className="avatar" src={data[0].avatar.url} />   :
         <BiUserPin size="3em" className="mt-3 " color="rgb(2 132 199)" />
        } 
       {check&&
        <button className="mt-2  hover:bg-sky-600  border border-sky-900 border-solid rounded-full p-4 bg-sky-500 font-bold"
        onClick={()=>{
            window.localStorage.clear(),
            route.push("/")
        }}
        > Disc </button>
       
      
       }
        </div>
        :
        <div  className="account">
            <Link href="/login/auth">
            <a className="wel" >
            <p > Connect |</p>
            </a>
            </Link>
            <p>{user&& user}</p>
            <Link href="/login/sign">
            <a className="wel" >
        <p > Sign-up </p>
            </a>
            </Link>
        </div>
       
         }
    </div>
    </div>
    
    </>
}


export default Navbar