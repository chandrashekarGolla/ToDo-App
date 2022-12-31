import React from 'react'
import Navbar from './Navbar'

import {Outlet} from 'react-router-dom'
function RootLayout() {
  return (
    <div>
       <Navbar/>
       {/*dynamic content*/}
       <Outlet/>
       
    </div>
  )
}

export default RootLayout