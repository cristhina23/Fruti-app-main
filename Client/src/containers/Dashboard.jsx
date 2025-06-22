import React from 'react'
import Header from '../components/Header'
import DBLeftSection from '../components/DBLeftSection'
import DBRightSection from '../components/DBRightSection'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex itemes-center bg-primary'>
      <DBLeftSection />
      <DBRightSection />
    </div>
  )
}

export default Dashboard