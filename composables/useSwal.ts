import type { SweetAlertOptions } from "sweetalert2";
import { AxiosError } from "axios";
import swal from "sweetalert2";
export const CallSwal = (options: SweetAlertOptions) => {
  return swal.fire({
    ...options,
    customClass: {
      confirmButton: "custom-confirm-button",
    },
  });
};

export const DefaultSwalError = (err: any) => {
  if (err instanceof AxiosError) {
    const code = err?.response?.data?.code ?? "";
    const desc = err?.response?.data?.desc ?? "";
    return swal.fire({
      icon: "error",
      title: "ຜິດພາດ",
      text: `CODE:${code} - MESSAGE: ${desc}`,
    });
  } else {
    return swal.fire({
      icon: "error",
      title: "ຜິດພາດ",
      text: err?.message ?? "",
    });
  }
};
