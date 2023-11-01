import {React,useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {server} from "../server"

const ActivationPage = () => {
  const {activation_token} = useParams()
  const [error,setError] = useState(false)

  useEffect (() =>{
    if(activation_token) {
      const activationEmail = async () =>{
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token
          })
          console.log(res.data.message)
        } catch (error) {
          console.log(error.response.data.message)
          setError(true)
        }
      }
      activationEmail();
    }
  }, [])

  return (
    
    <div style={{
      width:"100%",
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
      
    }}>
      {
        error? (
        <p>Your token is Expired</p>
        )
       : (
        <p>Your Account Has Been Created Successfully!</p>
      )
       }
    </div>
  )
}

export default ActivationPage
