import React, { useEffect } from "react";
import PartnerLogin from "../components/Partner/partnerLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PropertyLogin = () => {
  const navigate = useNavigate();
  const { isPartner } = useSelector((state) => state.partner);

  useEffect(() => {
    if (isPartner === true) {
      navigate(`/dashboard`);
    }
  }, [isPartner, navigate]);

  return (
    <div>
      <PartnerLogin />
    </div>
  );
};

export default PropertyLogin;
