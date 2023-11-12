import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../server";

const PartnerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    // if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/partner/activation/${activation_token}`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            setError(true);
          });
      };
      sendRequest();
    }
  , [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is Expired</p>
      ) : (
        <p>Your Account Has Been Created Successfully!</p>
      )}
    </div>
  );
};

export default PartnerActivationPage;
