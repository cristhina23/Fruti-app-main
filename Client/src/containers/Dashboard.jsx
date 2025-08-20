import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import DBLeftSection from '../components/DBLeftSection'
import DBRightSection from '../components/DBRightSection'
import DBLeftSectionUser from '../components/DBLeftSectionUser'
import DBRightSectionUser from '../components/DBRightSectionUser'

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className='w-screen h-screen flex itemes-center bg-primary'>
      {
        user === 'viszellechacon@gmail.com' ? (
          <>
            <DBLeftSection />
            <DBRightSection />
          </>
        ) : (
          <>
            <DBLeftSectionUser />
            <DBRightSectionUser />
          </>
        )
      }
    </div>
  )
}

export default Dashboard