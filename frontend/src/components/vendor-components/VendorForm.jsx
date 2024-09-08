import axios from 'axios';
import React, { useRef } from 'react'
import { MdCancel } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const VendorForm = ({ changeEdit, vendorToken, fetchData }) => {
  const vehicleName = useRef();
  const image = useRef();
  const date = useRef();
  const price = useRef();
  const location = useRef();
  const handleAddVehicle = (e) => {
    e.preventDefault();
    console.log({
      fromVendor: localStorage.getItem("vendorName"),
      vehicleName: vehicleName.current.value,
      image: image.current.value,
      Date: Number(date.current.value),
      price: Number(price.current.value),
      location: location.current.value,
    },vendorToken);
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/vendor/registerVehicle",
        {
          fromVendor: localStorage.getItem("vendorName"),
          vehicleName: vehicleName.current.value,
          image: image.current.value,
          Date: Number(date.current.value),
          price: Number(price.current.value),
          location: location.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + vendorToken,
            "Content-Type": "application/json",
          },
          timeout: 10000, // Optional: timeout in milliseconds
        }
      )
      .then((response) => {
        changeEdit(false);
        fetchData();
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };
  return (
    <>
      <form action="" className="edit-form" onSubmit={handleAddVehicle}>
        <ToastContainer />
        <h1>Add Vehicle</h1>
        <MdCancel color='white' onClick={() => changeEdit(false)} />
        <input
          ref={vehicleName}
          name="vehicleName"
          type="text"
          placeholder="vehicle name"
          required
        />
        <input
          ref={image}
          name="image"
          type="text"
          placeholder="image url"
          required
        />
        <input ref={date} name="Date" type="number" placeholder="year" required />
        <input
          ref={price}
          name="price"
          type="number"
          placeholder="price"
          required
        />
        <input
          ref={location}
          name="location"
          type="text"
          placeholder="location"
          required
        />
        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default VendorForm