import React from 'react'

const ClientSelected = ({client}) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-700 shadow-md rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{client.full_name}</h2>
      </div>
      <div className="text-gray-700 dark:text-gray-200">
        <p className="flex items-center mb-2">
          <span className="font-medium mr-2">ID Number:</span>
          {client.identification_number}
        </p>
        <p className="flex items-center mb-2">
          <span className="font-medium mr-2">Phone:</span>
          {client.phone}
        </p>
        <p className="flex items-center mb-2">
          <span className="font-medium mr-2">Email:</span>
          {client.email}
        </p>
        <p className="flex items-center mb-2">
          <span className="font-medium mr-2">City:</span>
          {client.city}
        </p>
      </div>
    </div>
  )
}

export default ClientSelected
