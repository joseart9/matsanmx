import React from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbMoodSad } from "react-icons/tb";

export default function alert(
  msg: any,
  type: "error" | "success",
  position:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center",
  customId: string
) {
  toast[type](msg, {
    position: position,
    icon: () => <TbMoodSad className="text-xl text-accent" />,
    toastId: customId,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: {
      backgroundColor: "#FFEDDB", // Primary color
      color: "#54473F", // Accent color
      borderRadius: "8px", // Opcional: Personalización
      padding: "12px",
    },
  });
}
