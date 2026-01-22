import React from 'react'
import Hero from '../Components/Hero'
import Latestcollection from '../Components/Latestcollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsLettersBox from '../Components/NewsLettersBox'

function Home() {
  return (
    <div>
      <Hero/>
      <Latestcollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLettersBox/>
    </div>
  )
}

export default Home
