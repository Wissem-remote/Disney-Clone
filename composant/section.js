
import Card from "./Card"
import {motion,useAnimation} from "framer-motion"
import { useEffect, useRef, useState } from "react"


const Section =({children,videos})=>{
    const[withs,setWiths]=useState(0)
    const[right,setRight]=useState(350)
    const[left,setLeft]=useState(0)
    const carou = useRef()
    const animation =useAnimation()
    const ClickLeft=()=>{
        setLeft(left > 0 ?left-300 :0)
        setRight(left+300)
        console.log(left)
        animation.start({
          x: left > -100 && -left,
        })
    }
    const ClickRight=()=>{
        setRight(withs+200 > right ?right+300 :withs+200)
        setLeft(right-100)
        console.log(right)
    animation.start({
      x: withs+200 > right && -right,
    })
    }

    useEffect(()=>{
        setWiths(carou.current.scrollWidth - carou.current.offsetWidth)
    },[])

    return <>
    <motion.div
    whileTap={{cursor:"grabbing"}}
    ref={carou} 
    className="section " 
    id={children}>

    <h3 className="title-section text-xl  ">{children}</h3>
    {videos.length > 4&&<>
    <button onClick={ClickLeft} className="h  text-xl rounded-full  "> &#8656; </button>
    <button onClick={ClickRight} className="p  text-xl rounded-full"> &#8658; </button>
    </>
}
    <motion.div animate={animation} drag="x" dragConstraints={{right:0,left: -withs}} className="video">
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