
import { GraphQLClient, gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'

const change = async (slug)=>{
  await fetch('/api/change',{
    method : 'POST',
    headers :{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({slug})
  })
}


export default function Posts ({video}){
  const[play,setPlay]=useState(false)
  const[tail,setTail]=useState(true)
  const[check,setCheck]=useState(true)
  

  useEffect(()=>{
   let wait =window.innerWidth
    wait < 900 && setTail(false) 
    
  },[])

    return <>
    {console.log(tail)}
    { check  &&
    <div  >
      <img id="check" className="video-img" src={video[0].thumbail.url}
      alt={video[0].title}/>
      <div className="info">
        <p>{video[0].tags.join(', ')}</p><br/>
        <p>{video[0].description}</p><br/>
        <a href="/"> Go back</a><br/>
        <Link to="video" smooth={true} duration={2000}>
        <button className="hover:bg-sky-600 text-xl  py-1 px-3 border border-sky-900 border-solid rounded bg-sky-500 text-center text-white-700"
        onClick={()=>{
        //change(video[0].slug),
        setPlay(true),
        !tail && setCheck(false)
      }}
        > Play </button>
        </Link>
        
      </div>
      </div>
}
      {play  &&
      <div >
    
      {check ?
        <video  width="100%" height="auto" controls>
          <source src={video[0].mp4.url} type="video/mp4"  media="screen and (min-width:900px)"/>
        </video>
       :
       <iframe src={video[0].mp4.url} ></iframe>
      }
      </div>
        }
        <Link to="check" smooth={true} duration={2000}><div className="info-video" id="video"></div></Link>
    
      
    </>
}




export async function getServerSideProps(pageContext) {
      const slug = pageContext.query.slug
      const url = process.env.URL
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.TOKEN,
    },
  })

  const videoQuery = gql`
  query($slug: String!){
    videos(where:{
      slug: $slug
    }){
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbail{
        url
      },
      mp4{
        url
      }
    }
  }
  `
  const value ={
    slug,
  }
  const data = await graphQLClient.request(videoQuery,value)
  const video = data.videos 
  
  
  return {
      props: {
        video
      }, // will be passed to the page component as props
    }
  }


  // export async function getStaticPaths() {
  //   const datas =  await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=4`)
  //   .then(res => res.json())
  //   return {
  //     paths: datas.map(v =>({

  //       params:{id: v.id.toString()}
  //     })),
  //     fallback: false,
  //    // will be passed to the page component as props
  //   }
  // }