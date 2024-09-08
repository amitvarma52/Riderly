import React, { useEffect, useState } from 'react'
import VendorLogin from '../components/vendor-components/VendorLogin';
import VendorInformation from '../components/vendor-components/VendorInformation';

const VendorPage = () => {
  const [loged, setLoged] = useState(false);
  const [vendorToken, setAdminToken] = useState();
  const handleSetToken = (value) => {
    setAdminToken(value);
  };
  const changeLoged = (value) => {
    setLoged(value);
  };
  useEffect(() => {
    if (vendorToken) {
      changeLoged(true);
    }
  });
  return (
    <>
      {loged ? (
        <VendorInformation
          changeLoged={changeLoged}
          vendorToken={vendorToken}
          handleSetToken={handleSetToken}
        />
      ) : (
        <VendorLogin
          changeLoged={changeLoged}
          vendorToken={vendorToken}
          handleSetToken={handleSetToken}
        />
      )}
    </>
  );
}

export default VendorPage