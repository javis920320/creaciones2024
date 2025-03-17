import { ListItem, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react'
import { FiDollarSign, FiMinusCircle } from 'react-icons/fi';

const ListItems = ({item}) => {
    const {id, name, price, quantity,desc} = item;   

  return (

    <div key={id} className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-start space-x-4">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            
            Cantidad *
          </label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            value={item.quantity}
           /*  onChange={e => updateItem(index, 'cantidad', parseInt(e.target.value))} */
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiDollarSign className="w-4 h-4 text-blue-600" />
            Precio *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            value={item.price}
            /* onChange={e => updateItem(index, 'price', parseFloat(e.target.value))} */
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Talla</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            value={item.tall || ''}
            /* onChange={e => updateItem(index, 'talla', e.target.value)} */
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            value={desc || ''}
            /* onChange={e => updateItem(index, 'descripcion', e.target.value)} */
          />
        </div>
      </div>
      <button
        type="button"
        /* onClick={() => removeItem(index)} */
        className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      >
        <FiMinusCircle className="w-6 h-6" />
      </button>
    </div>
    <div className="mt-4 text-right text-sm text-gray-600">
      Subtotal: ${(price* quantity).toFixed(2)}
    </div>
  </div>
  )
}

export default ListItems;