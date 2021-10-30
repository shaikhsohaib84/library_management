import { toast } from "react-toastify";

export const successAlert = (message) => {
  return (
    <div class="alert alert-success" role="alert">
      {message}
    </div>
  );
}

export const failedAlert = (message) => {
  return (
    <div class="alert alert-danger" role="alert">
      {message}
    </div>
  );
};


export const success = (message) => {
  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER,
  });

};

export const error = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 7000,
    closeOnClick: true,
    pauseOnHover: true
  });
};

export const info = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 7000,
    closeOnClick: true,
    pauseOnHover: true
  });
};

export  const warn = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 7000,
    closeOnClick: true,
    pauseOnHover: true
  });
};