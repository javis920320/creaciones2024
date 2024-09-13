import React from 'react'

const RadioButton = ({ className = '', ...props }) => {
  return (
    <input
    {...props}
    type="radio"
    className={
        'rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 ' +
        className
    }
/>
  )
}

export default RadioButton