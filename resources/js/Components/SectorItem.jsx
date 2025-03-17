import React from 'react'

const SectorItem = ({sector}) => {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
      {sector}
    </span>
  )
}

export default SectorItem