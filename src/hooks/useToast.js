import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, variant = "default" }) => {
      let toastFunction;
      switch (variant) {
        case "success":
          toastFunction = sonnerToast.success;
          break;
        case "error":
          toastFunction = sonnerToast.error;
          break;
        case "warning":
          toastFunction = sonnerToast.warning;
          break;
        case "info":
          toastFunction = sonnerToast.info;
          break;
        default:
          toastFunction = sonnerToast;
      }

      toastFunction(title, {
        description,
        className: variant === "success" ? "bg-green-50 text-green-800 border-green-200" : "",
      });
    },
  };
}