import React from 'react'
import DBHeader from './DBHeader'
import { Route, Routes } from 'react-router-dom'
import DBHome from './DBHome'
import DBItems from './DBItems'
import DBNewItem from './DBNewItem'
import DBOrders from './DBOrders'
import DBUsers from './DBUsers'

const DBRightSection = () => {
  return (
    <div className='flex flex-col py-6 px-12 flex-1 h-full'>
      <DBHeader />
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
        <Routes>
          <Route path='/home' element={<DBHome />} />
          
          <Route path='/orders' element={<DBOrders />} />
          
        </Routes>
      </div>
    </div>
  )
}

export default DBRightSection