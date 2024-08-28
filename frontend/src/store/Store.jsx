/** @format */

import { configureStore, createSlice } from "@reduxjs/toolkit";
const objectSlice = createSlice({
  name: "object",
  initialState: [
    {
      url: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20200114021404_civic-type-r.jpg",
      name: "honda-civic",
      year: 2023,
      price: 200,
      location: "thane",
    },
    {
      url: "https://www.financialexpress.com/wp-content/uploads/2024/04/Maruti-Swift.jpg",
      name: "maruti-swift",
      year: 2020,
      price: 110,
      location: "mumbai",
    },
    {
      url: "https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2019/12/19/107388-alto.jpg?itok=MdIFf0rA&c=c5af8c0f92ccc8e249257bf0f1cb18e8",
      name: "alto",
      year: 2019,
      price: 100,
      location: "navi-mumbai",
    },
  ],
});
export const store=configureStore({
    reducer:{
        object:objectSlice.reducer
    }
})
export const objectActions=objectSlice.actions