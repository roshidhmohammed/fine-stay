import React, { useEffect } from 'react'
import PropertyRegister from "../components/Partner/PropertyRegister"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PropertyAddPage = () => {
  const navigate = useNavigate()
  const {isPartner , partner, isLoading} = useSelector((state) => state.partner)

  useEffect(() =>{
    if(isPartner === true){
      navigate(`/dashboard`);
    }
  },[navigate, isPartner] )
  return (
    <div>
      <PropertyRegister/>
    </div>
  )
}

export default PropertyAddPage
