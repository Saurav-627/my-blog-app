import { toast } from 'react-toastify';

// Toast helper to prevent duplicates
const ShowToast = (message, type = 'success') => {
  const toastId = `${type}-${message}`;

  if(toast.isActive(toastId)) {
    toast.update(toastId);
  }else{
    toast[type](message, { toastId });

  }
};

export default ShowToast;