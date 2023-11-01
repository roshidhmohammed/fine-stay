import React, { useState } from "react";
import styles from "../../styles/styles";
import PartnerInfo from "../../components/Partner/PartnerInfo";
import PartnerPropertiesInfo from "../../components/Partner/PartnerPropertiesInfo";

const PartnerHomePage = () => {
  const [editPartnerDetails, setEditPartnerDetails] = useState(false);
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex  justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10 ">
          <PartnerInfo
            isOwner={true}
            setEditPartnerDetails={setEditPartnerDetails}
          />
        </div>

        <div className="w-[72%] rounded-[4px] ">
          <PartnerPropertiesInfo
            isOwner={true}
            setEditPartnerDetails={setEditPartnerDetails}
            editPartnerDetails={editPartnerDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerHomePage;
