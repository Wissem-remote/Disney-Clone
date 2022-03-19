import { GraphQLClient, gql } from 'graphql-request'

import {  useEffect, useState } from 'react'
import Navbar from '../../../composant/NavBar'
import { useRouter } from 'next/router'



const Client =({account})=>{
  const [pass,setPass]=useState()
  const [newpass,setNewpass]=useState()
  const [check,setChek]=useState(false)
  const [valid,setValid]=useState(false)
  const id = account.id
  const route = useRouter()
  useEffect(()=>{
    !localStorage.getItem('id')&& route.push('/')
  })
  
  const email = account.email
const submit= async (e)=>{
  setChek(null)
  let p = document.querySelector('#p')
  let n = document.querySelector('#n')
  e.preventDefault()
 
  pass === account.password ? (fetch('/api/pass',{
    method : 'POST',
    headers :{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({newpass,id,email})
  }),setValid(true),p.value="",n.value=""):
  setChek(true)
  

  
}
return<>
<Navbar check={true} accounts={[account]}/>

<div>
  <h1 className="md:text-3xl md:px-5 text-xl md:text-left  font-blod text-gray-500 text-center ">Bienvenue dans votre espace  {account.userName}</h1>
<div className="sm:w-1/4 m-auto  w-3/4 text-center md:mt-4">
{valid && 
            <div className="text-xl  p-2 border border-emerald-900 border-solid rounded bg-emerald-500 text-center text-white" role="alert">
           Password Changed 
          </div>}
{check && 
            <div className="text-xl  p-2 border border-red-900 border-solid rounded bg-red-500 text-center text-red-700" role="alert">
           Wrong Password
          </div>}
        <h3 className="text-xl   font-blod text-gray-500 block m-auto md:text-xl"> Vous pouvez changer votre Password</h3>
          <form onSubmit={submit}>
            <div className="w-64 m-auto">
              <label className="block mt-3">Last Password</label>
              <input id="p" required className="text-gray-800 mt-2 p-3 rounded-full w-full border-2 border-gray-500 bg" type="password"
              onChange={(e)=>{
                setPass(e.target.value)
              }}
              />
            </div>
            <div className="w-64 m-auto">
              <label className="block mt-3" >New Password</label>
              <input id="n" required className="text-gray-800 mt-2 p-3 rounded-full w-full border-2 border-gray-500 bg" type="password" 
              onChange={(e)=>{
                setNewpass(e.target.value)
              }
              }
              />
            </div>
              <button type="submit" className="mt-3 hover:bg-sky-600 text-xl border border-sky-900 border-solid rounded bg-sky-500 py-1 px-3"> Envoyer</button>
          </form>
          </div>
</div>
</>
}
export default Client

export async function getServerSideProps(pageContext){
  const ids = pageContext.query.id
    const url = process.env.URL
    const graphQLClient = new GraphQLClient(url, {
      headers: {
        authorization: process.env.TOKEN,
      },
    })
 
    const accountQuery= gql`
    query($ids: ID!){
      account(where:{
        id: $ids
      }){
        id,
        password,
        userName,
        email,
        avatar{
          url,
        }
      }
    }
    `
  
    const value ={
      ids,
    }
    const dataAccount = await graphQLClient.request(accountQuery,value)
    const account = dataAccount.account
    return {
      props: {
        
        account,
      }, // will be passed to the page component as props
    }
  }