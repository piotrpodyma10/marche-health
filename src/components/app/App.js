import React from 'react'
import Header from '../header/Header'
import Filter from '../filter/Filter'
import Map from '../map/Map'
import './globalStyles/StyleVariables.css'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='map-container'>
        <Filter />
        <Map />
      </div>
    </div>
  )
}

export default App
