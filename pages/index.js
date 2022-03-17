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
  const connect= (d,i)=>{
    const result= []
    d && d.map(v=> v.id === i && result.push(v) )
    return result
}

    useEffect(()=>{
        setUser(user => localStorage.getItem('id')? localStorage.getItem('id'):false)
    },[])
  return <>
  
      <Head>
        <title>Disney Clone</title>
        <meta name="description" content="Disney Clone App by Next.js" />
        <link rel="icon" href="/disney.png" />
       
      </Head>
      <Navbar data={user?connect(account,user):false}/>
      <div className="app">
          <div className="main-video">
           
           <img className="img-main" 
            src={videos[0].thumbail.url} 
            alt={videos[0].title}
          />
          </div>
            <div className="videosss">
              <div className="cols" >
                <Link to="Disney" smooth={true} duration={2000}>
                  <Image src={disney} className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Disney" smooth={true} duration={2000}>
                  <Image src={marvel} className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Disney" smooth={true} duration={2000}>
                  <Image src={natgeo} className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Disney" smooth={true} duration={2000}>
                  <Image src={pixar} className="lien"/>
                </Link>
              </div>
              <div className="cols" >
                <Link to="Disney" smooth={true} duration={2000}>
                  <Image src={star} className="lien"/>
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
              <Section>Nationnal Geographic</Section>
              <Section>Fantastique</Section>
              <Section>Star Wars</Section>
              <Section >Disney</Section>
         
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