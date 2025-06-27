import React from 'react'
import Header from '../components/Header'
import  Home  from '../components/Home'
import  HomeSlider  from '../components/HomeSlider'
import  FilterSection  from '../components/FilterSection'

const MainContainer = () => {
  return (
    <main className='w-screen min-h-screen flex items-start justify-center flex-col bg-primary'>
      <Header />
      <div className='w-full flex flex-col items-start justify-center sm:mt-10 md:mt-24 px-6 md:px-24 2xl:px-96 pb-24'>
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>
    </main>
  )
}

export default MainContainer