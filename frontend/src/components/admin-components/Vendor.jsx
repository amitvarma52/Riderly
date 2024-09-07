/** @format */

import React, { useRef, useState } from "react";
import "../../stylesheets/vendor.css";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Vendor = ({
  _id,
  name,
  email,
  location,
  phone,
  fetchData,
  adminToken,
}) => {
  const [edit, setEdit] = useState(false);
  const updateName = useRef();
  const updateEmail = useRef();
  const updateLocation = useRef();
  const updatePhone = useRef();
  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8080/api/v1/car-rental/admin/update",
        {
          name: name,
          updateName: updateName.current.value,
          email: updateEmail.current.value,
          location: updateLocation.current.value,
          phone: updatePhone.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + adminToken,
            "Content-Type": "application/json",
          },
          timeout: 10000, // Optional: timeout in milliseconds
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
        fetchData();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/admin/delete",
        {
          name: name,
        },
        {
          headers: {
            Authorization: "Bearer " + adminToken,
            "Content-Type": "application/json",
          },
          timeout: 10000, // Optional: timeout in milliseconds
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
        fetchData();
        toast.success("vendor delete successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <tr className="vendor">
        <td>{name}</td>
        <td>{email}</td>
        <td>{location}</td>
        <td>{phone}</td>
        <td>
          <FaEdit
            color="blue"
            size={25}
            onClick={() => {
              setEdit(true);
            }}
          />
          <MdDelete color="red" size={25} onClick={handleDelete} />
        </td>
        <td style={{position:"absolute"}}>
          {edit && (
            <form action="" className="edit-form" onSubmit={handleEdit}>
              <h1>EDIT VENDOR</h1>
              <MdCancel onClick={() => setEdit(false)} />
              <input
                ref={updateName}
                name="updateName"
                type="text"
                placeholder="name"
                defaultValue={name}
              />
              <input
                ref={updateEmail}
                name="email"
                type="email"
                placeholder="email"
                defaultValue={email}
              />
              <input
                ref={updateLocation}
                name="location"
                type="text"
                placeholder="location"
                defaultValue={location}
              />
              <input
                ref={updatePhone}
                name="phone"
                type="number"
                placeholder="phone"
                defaultValue={phone}
              />
              <input type="submit" value="submit" />
            </form>
          )}
        </td>
      </tr>
    </>
  );
};

export default Vendor;
