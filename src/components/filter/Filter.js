import React, { useState } from 'react'
import { getStyle } from '../../utils/styleUtils'
import StateData from '../../assets/stateData.json'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function Filter() {
  const [selectedRange, setSelectedRange] = useState('')
  const [filteredStates, setFilteredStates] = useState([])
  const ranges = ['0 - 250', '250 - 500', '500 - 1000', '1000 - 1000+']
  const data = StateData.filter((value, index) => {
    const _value = JSON.stringify(value)
    return (
      index ===
      StateData.findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    )
  })

  const handleChange = (event) => {
    const newSelectedRange = event.target.value
    const minMaxValues = newSelectedRange.split(' - ')
    const filteredStates = data.filter((state) => {
      if (minMaxValues[1] === '1000+') {
        return state.visits > minMaxValues[0]
      }
      return state.visits > minMaxValues[0] && state.visits <= minMaxValues[1]
    })

    handleColorStates(filteredStates)
    setSelectedRange(newSelectedRange)
    setFilteredStates(filteredStates)
  }

  const handleColorStates = (states) => {
    handleResetColorStates()
    states.forEach((state) => {
      const foundSelector = document.querySelector(`.${state.id.toLowerCase()}`)
      if (foundSelector) {
        foundSelector.style.transition = '1s'
        if (state.id === 'KS' || state.id === 'MT' || state.id === 'PA') {
          foundSelector.style.fill = getStyle('--blue')
          return
        }
        if (state.id === 'CA' || state.id === 'DE') {
          foundSelector.style.fill = getStyle('--red')
          return
        }

        foundSelector.style.fill = getStyle('--orange')
      }
    })
  }

  const handleResetColorStates = () => {
    filteredStates.forEach((state) => {
      const foundSelector = document.querySelector(`.${state.id.toLowerCase()}`)
      if (foundSelector) {
        foundSelector.style.fill = getStyle('--light-orange')
      }
    })
  }

  return (
    <div className='map-filter'>
      <FormControl variant='standard'>
        <InputLabel>User visits</InputLabel>
        <Select value={selectedRange} onChange={(e) => handleChange(e)} label='User visits'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {ranges.map((range, index) => {
            return (
              <MenuItem key={index} value={range}>
                {range}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}

export default Filter
