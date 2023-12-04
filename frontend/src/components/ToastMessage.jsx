import React, { useEffect } from 'react'
import {toast} from 'react-hot-toast'

const ToastMessage = ({message, type}) => {
    useEffect(()=>{
        toast[type](message);
    },[message, type])
  return null;
}

export default ToastMessage