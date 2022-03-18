import Image from "next/image"


 const Card=({video})=> {
    return <>
    
    <img className="card" src={video.thumbail.url} alt={video.title}/>
    
     
    </>
}



export default Card