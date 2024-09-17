/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import "../stylesheets/filter.css";
import { useNavigate } from "react-router-dom";
import HowItWorks from "./HowWorks";

const AllPage = () => {
  const objects = useSelector((state) => state.object);
  const navigate = useNavigate();
  useEffect(() => {
    if (objects.length === 0) {
      navigate("/");
    }
  }, [objects, navigate]);

  // State for filters
  const [vendorFilter, setVendorFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [vehicleNameFilter, setVehicleNameFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // New state for filtering by type

  // Get unique vendors, locations, and types from objects array
  const uniqueVendors = [
    "all",
    ...new Set(objects.map((obj) => obj.fromVendor)),
  ];
  const uniqueLocations = [
    "all",
    ...new Set(objects.map((obj) => obj.location)),
  ];
  const uniqueTypes = ["all", ...new Set(objects.map((obj) => obj.type))]; // Get unique types

  // Filter objects based on selected filters
  const filteredObjects = objects.filter((element) => {
    const vendorMatch =
      vendorFilter === "all" || element.fromVendor === vendorFilter;
    const locationMatch =
      locationFilter === "all" || element.location === locationFilter;
    const vehicleNameMatch =
      vehicleNameFilter === "" ||
      (element.vehicleName &&
        element.vehicleName
          .toLowerCase()
          .includes(vehicleNameFilter.toLowerCase()));
    const priceMatch =
      (minPriceFilter === "" || element.price >= minPriceFilter) &&
      (maxPriceFilter === "" || element.price <= maxPriceFilter);
    const yearMatch =
      yearFilter === "" ||
      (element.Date && String(element.Date).includes(yearFilter));
    const typeMatch = typeFilter === "all" || element.type === typeFilter; // Filter by type

    return (
      vendorMatch &&
      locationMatch &&
      vehicleNameMatch &&
      priceMatch &&
      yearMatch &&
      typeMatch // Include type filter in the final condition
    );
  });

  return (
    <>
      <HowItWorks />
      <div className="filter-section">
        <div>
          <label htmlFor="vendorFilter">Filter by Vendor: </label>
          <select
            id="vendorFilter"
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
          >
            {uniqueVendors.map((vendor, index) => (
              <option key={index} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="locationFilter">Filter by Location: </label>
          <select
            id="locationFilter"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vehicleNameFilter">Search by Vehicle Name: </label>
          <input
            id="vehicleNameFilter"
            type="text"
            value={vehicleNameFilter}
            onChange={(e) => setVehicleNameFilter(e.target.value)}
            placeholder="Enter vehicle name"
          />
        </div>

        <div>
          <label htmlFor="minPriceFilter">Min Price: </label>
          <input
            id="minPriceFilter"
            type="number"
            value={minPriceFilter}
            onChange={(e) => setMinPriceFilter(e.target.value)}
            placeholder="Enter min price"
          />
        </div>

        <div>
          <label htmlFor="maxPriceFilter">Max Price: </label>
          <input
            id="maxPriceFilter"
            type="number"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
            placeholder="Enter max price"
          />
        </div>

        <div>
          <label htmlFor="yearFilter">Filter by Year: </label>
          <input
            id="yearFilter"
            type="text"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            placeholder="Enter year"
          />
        </div>

        {/* New Filter for Type */}
        <div>
          <label htmlFor="typeFilter">Filter by Type: </label>
          <select
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="vehicle-container">
        {filteredObjects.length === 0 ? (
          <h1>No Data</h1>
        ) : (
          filteredObjects.map((element) => (
            <Card
              key={element._id}
              fromVendor={element.fromVendor}
              url={element.image}
              url2={element.image2}
              url3={element.image3}
              name={element.vehicleName}
              year={element.Date}
              price={element.price}
              milegde={element.milegde}
              location={element.location}
              type={element.type}
            />
          ))
        )}
      </div>
    </>
  );
};

export default AllPage;
