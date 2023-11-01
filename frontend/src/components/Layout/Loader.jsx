import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../Assests/Animations/animation_lkvfp0np.json";

const Loader = () => {
    
  return (
    <div className=' w-full h-screen flex  items-center justify-center'>
        <Lottie animationData={animationData} loop={false} autoPlay={true} height={300} width={300}/>
      
    </div>
  )
}

export default Loader;
