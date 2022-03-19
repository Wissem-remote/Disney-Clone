import {  useState } from "react"
import Navbar from "../../composant/NavBar"
import { GraphQLClient, gql } from 'graphql-request'
import { useRouter } from "next/router"

 const Sign =({account})=> {
        const[email,setEmail]=useState()
        const [user,setUser]=useState()
        const [pass,setPass]=useState()
        const [error,setEror]=useState(false)
        const router = useRouter()
        const checkEmail = (e)=>{
            let result = []
            account.map((v)=>v.email.includes(e) && result.push(v.id) )
            return result
           
        }
        const submit=  (e) => {
            setEror(null)
                e.preventDefault()
                
                checkEmail(email).length > 0 && setEror(true)
                console.log(email)
                
                checkEmail(email).length === 0 &&  fetch('/api/auth',{
                    method : 'POST',
                    headers :{
                      'Content-Type':'application/json'
                    },
                    body: JSON.stringify({user,pass,email})
                  })
              
                  checkEmail(email).length === 0 && router.push("/login/check")
        }
  
    return (
        <>
        <Navbar/>
        <div className="sm:w-1/3 m-auto  w-3/4 content-center">
           
            
                {error && 
            <div className="text-xl  p-2 border border-red-900 border-solid rounded bg-red-500 text-center text-red-700" role="alert">
           Email exite deja
          </div>}
                   
                        <h1 className="text-3xl   font-blod text-gray-700">
                        Inscrivez-vous
                        </h1>
                        <form onSubmit={submit}>
                            <label className="block mt-2 text-gray-600"> UserName</label>
                            <input required className="text-gray-800 mt-2 p-3 rounded-full w-full border-2 border-gray-500 bg-slate-50" type="text" name="username"
                            onChange={((e)=>{
                            setUser(e.target.value) 
                            })}
                            />
                                   <label className="block mt-2 text-gray-600"> Email</label>
                            <input required className="text-gray-800 mt-2 p-3 rounded-full w-full border-2 border-gray-500 bg-slate-50" type="email" name="email"
                            onChange={((e)=>{
                            setEmail(e.target.value.toLowerCase()) 
                            })}
                            />
                            <label className="block mt-2  text-gray-600"> Password</label>
                            <input required className="text-gray-800 mt-2 p-3 rounded-full w-full border-2 border-gray-500 bg-slate-50" type="password" name="password"
                            onChange={((e)=>{
                                setPass(e.target.value) 
                            })}
                            />
                            <button type="submit" className="rounded-full py-2 px-3 bg-blue-900 mt-3">Login-in</button>
                        </form>
                    
                        
        </div>
        </>
    )
}


export async function getStaticProps() {
    const url = process.env.URL
    const graphQLClient = new GraphQLClient(url, {
      headers: {
        authorization: process.env.TOKEN,
      },
    })
    const query= gql`
    query{
        accounts {
          userName,
          password,
          email,
          id
        
        }
      }
    `
   
    const data = await graphQLClient.request(query)
    const account = data.accounts
    
    return {
      props: {
       
        account,
      }, // will be passed to the page component as props
    }
  }

export default Sign