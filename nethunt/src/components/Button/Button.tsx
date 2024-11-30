// components/Button.tsx
import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  round?: "full" | "half"
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", round="half", children, onClick }) => {
  // Define size classes based on the `size` prop
  const sizeClass = {
    sm: "text-sm py-1 px-3 font-medium",
    md: "text-base py-2 px-4 font-semibold",
    lg: "text-lg py-3 px-5 font-bold",
  };
  const roundClass = {

    full: "rounded-full",
    half: "rounded-2xl",
  };

  return (
    <button
      className={`
        ${styles.button}
        ${variant === "secondary" ? styles.secondary : styles.primary}
        ${sizeClass[size]} 
        ${roundClass[round]}
        hover:bg-opacity-80 hover:text-white cursor-pointer
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
