import Swal from "sweetalert2";

export const useAlert = () => {
  const showSuccess = (message: string) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      confirmButtonText: "OK",
      text: message,
      customClass: {
        confirmButton: "my-confirm-button",
      },
    });
  };

  const showError = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      showCancelButton: true,
      text: message,
      customClass: {
        cancelButton: "my-cancel-button",
      },
    });
  };
  const showWarning = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      confirmButtonText: "OK",
      text: message,
      customClass: {
        confirmButton: "my-confirm-button",
      },
    });
  };
  const showConfirm = (message: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      cancelButtonColor: "gray",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "white",
      customClass: {
        confirmButton: "my-confirm-button",
        cancelButton: "my-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // perform action
      }
    });
  };
  return {
    showConfirm,
    showSuccess,
    showError,
    showWarning,
  };
};
