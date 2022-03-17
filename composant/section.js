
import Card from "./Card"
import {motion} from "framer-motion"
import { useEffect, useRef, useState } from "react"


const Section =({children,videos})=>{
    const[withs,setWiths]=useState(0)
    const carou = useRef()
    useEffect(()=>{
        setWiths(carou.current.scrollWidth - carou.current.offsetWidth)
    },[])
    return <>
    <motion.div
    whileTap={{cursor:"grabbing"}}
    ref={carou} 
    className="section" 
    id={children}>
    <h3 className="title-section text-xl ">{children}</h3>
    <motion.div drag="x" dragConstraints={{right:0,left: -withs}} className="video">
    {videos && videos.map((v,i) =>{
            return  <div className="col" key={i}>
                        <a  href={`/video/${v.slug}`}>
                            <Card video={v}  />
                        </a>
                    </div>
        })}
    </motion.div>
      
    </motion.div>
    
    </>
}

export default Section