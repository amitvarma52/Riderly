/** @format */

import React, { useState } from "react";
import "../../stylesheets/vendor.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";

const Vendor = ({ _id, name, email, location, phone }) => {
  const [edit,setEdit]=useState(false)
  return (
    <>
      <tr className="vendor">
        <td>{name}</td>
        <td>{email}</td>
        <td>{location}</td>
        <td>{phone}</td>
        <td>
          <FaEdit color="blue" size={25} onClick={()=>{setEdit(true)}} />
          <MdDelete color="red" size={25} />
        </td>
        <td>
          {edit && (
            <form action="" className="edit-form">
              <h1>EDIT VENDOR</h1>
              <MdCancel onClick={()=>setEdit(false)} />
              <input type="text" placeholder="name" defaultValue={name} />
              <input type="email" placeholder="email" defaultValue={email} />
              <input
                type="text"
                placeholder="location"
                defaultValue={location}
              />
              <input type="number" placeholder="phone" defaultValue={phone} />
              <input type="submit" value="submit" id="" />
            </form>
          )}
        </td>
      </tr>
    </>
  );
};

export default Vendor;
