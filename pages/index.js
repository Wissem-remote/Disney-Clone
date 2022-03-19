import Head from 'next/head'
import Image from 'next/image'
import { GraphQLClient, gql } from 'graphql-request'
import Section from '../composant/section'
import Navbar from '../composant/NavBar'
import { useEffect, useState } from 'react'
import pixar from "../public/pixar.png"
import star from "../public/star.png"
import natgeo from "../public/natgeo.png"
import marvel from "../public/marvel.png"
import disney from "../public/disney.png"
import spiderman from "../public/spiderman.jpeg"
import { Link } from 'react-scroll'

export default function Home({videos,account}) {
  const [user,setUser]=useState(false)
  const randownVideo =(video)=>{
    return Math.floor(Math.random() * video.length)
  }

  const filterVideo=(video, genre)=>{
    return video.filter(v => v.tags.includes(genre))
  }

  const unSeen=(video)=>{
    return video.filter( v => !v.seen)
  }
  const connect=  (d,i)=>{
    const result= []
    d &&  d.map(v=> v.id === i && result.push(v) )
    return result
}

    useEffect(()=>{
        setUser(localStorage.getItem('id')? localStorage.getItem('id'):false)
    },[])
  return <>
  
      <Head>
        <title>Disney Clone</title>
    
        <link rel="icon" href="/disney.png" />
        
        <meta name="title" content="Disney Clone"/>
        <meta name="description" content="Disney Clone App by Next.js/GraphCms/Tailwindcss"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://disney-clone-gold.vercel.app/"/>
        <meta property="og:title" content="Disney Clone"/>
        <meta property="og:description" content="Disney Clone App by Next.js/GraphCms/Tailwindcss"/>
        <meta property="og:image" content="https://disney-clone-gold.vercel.app/disney.png"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://disney-clone-gold.vercel.app/"/>
        <meta property="twitter:title" content="Disney Clone"/>
        <meta property="twitter:description" content="Disney Clone App by Next.js/GraphCms/Tailwindcss"/>
        <meta property="twitter:image" content="https://disney-clone-gold.vercel.app/disney.png"/>
     
      </Head>
      <Navbar data={user?connect(account,user):false}/>
      <div className="app">
          <div className="main-video">
           
           <Image className="img-main" 
           layout='responsive'
            src={spiderman} 
            alt="spiderman"

          />
          </div>
            <div className="videosss">
              <div className="cols" >
                <Link to="Disney" smooth={true} duration={2000}>
                  <Image src={disney}  alt="disney" className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Marvel" smooth={true} duration={2000}>
                  <Image src={marvel} alt="marvel" className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Nationnal Geographic" smooth={true} duration={2000}>
                  <Image src={natgeo} alt="nat" className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Pixar" smooth={true} duration={2000}>
                  <Image src={pixar} className="lien" alt="pixar"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Star Wars" smooth={true} duration={2000}>
                  <Image src={star} className="lien " alt="star"/>
                </Link>
              </div>
            </div>
            <div className="video-feed">
            <Section videos={unSeen(videos)}>Vos Recommandations</Section>
              <Section videos={filterVideo(videos,'Pixar')}>Pixar</Section>
              <Section videos={filterVideo(videos,'Marvel')}>Marvel</Section>
              <Section videos={filterVideo(videos,'Family')} >Family</Section>
              <Section videos={filterVideo(videos,'Classic')}>Classic</Section>
              <Section videos={filterVideo(videos,'Action')}>Action</Section>
              <Section videos={filterVideo(videos,'National-Geographic')}>Nationnal Geographic</Section>
              <Section  videos={filterVideo(videos,'Fantastique')}>Fantastique</Section>
              <Section videos={filterVideo(videos,'Star-Wars')}>Star Wars</Section>
              <Section videos={filterVideo(videos,'Disney')}>Disney</Section>
         
            </div>
          
          </div>

     
    
    
   </>
}


export async function getStaticProps() {
  const url = process.env.URL
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.TOKEN,
    },
  })

  const accountQuery= gql`
  query{
    accounts{
      id,
      password,
      userName,
      
      avatar{
        url,
      }
    }
  }
  `
  const query = gql`
  query{
    videos{
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbail{
        url(
          transformation: {
          image: { resize: { width: 1280, height: 768, fit: clip } },
          })
      },
      mp4{
        url
      }
    }
  }
  `
  const data = await graphQLClient.request(query)
  const videos = data.videos
  const dataAccount = await graphQLClient.request(accountQuery)
  const account = dataAccount.accounts
  return {
    props: {
      videos,
      account,
    }, // will be passed to the page component as props
  }
}