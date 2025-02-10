import React from 'react'
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import Pdf from "./Pdf"
import Home from "./Home"
import Extra from "./Extra"
import Generator from "./Generator"
import Loader from "./Loader"
import Preference from "./Preference"
import Header from "./Header"
import Main from "./Main"
const Routers = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={<><Home /></>} /> */}
          <Route path="/pdf" element={<><Pdf /></>} />
          <Route path="/Genrator" element={<><Generator /></>} />
          {/* <Route path="/Extra" element={<><Extra /></>} /> */}
          <Route path="/" element={<><Main /></>} />
          <Route path="/Header" element={<><Header /></>} />
          <Route path="/Preference" element={<><Preference /></>} />
          {/* <Route path="/Loader" element={<><Loader /></>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
