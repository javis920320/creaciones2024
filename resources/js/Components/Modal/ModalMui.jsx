import { Modal } from '@mui/material'
import React from 'react'

const ModalMui = ({openModal,handleClose,children }) => {
  return (
   <Modal open={openModal} onClose={handleClose} keepMounted   sx={{
    display: 'flex',
    p: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  }}>
    <div>
      {children}
    </div>

   </Modal> 
  )
}

export default ModalMui