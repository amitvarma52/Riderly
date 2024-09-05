/** @format */

import React, { useState } from "react";
import AdminLogin from "../components/admin-components/AdminLogin";
import AdminPage from "../components/admin-components/adminPage";

const Admin = () => {
  const [loged, setLoged] = useState(false);
  return <>{loged ? <AdminPage  /> : <AdminLogin />}</>;
};

export default Admin;
