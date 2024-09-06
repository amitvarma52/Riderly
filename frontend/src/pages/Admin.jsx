/** @format */

import React, { useEffect, useState } from "react";
import AdminLogin from "../components/admin-components/AdminLogin";
import AdminPage from "../components/admin-components/adminPage";

const Admin = () => {
  const [loged, setLoged] = useState(false);
  const [adminToken, setAdminToken] = useState();
  const handleSetToken = (value) => {
    setAdminToken(value);
  };
  const changeLoged = (value) => {
    setLoged(value);
  };
  useEffect(() => {
    if (adminToken) {
      changeLoged(true);
    }
  });
  return (
    <>
      {loged ? (
        <AdminPage
          changeLoged={changeLoged}
          adminToken={adminToken}
          handleSetToken={handleSetToken}
        />
      ) : (
        <AdminLogin changeLoged={changeLoged} handleSetToken={handleSetToken} />
      )}
    </>
  );
};

export default Admin;
