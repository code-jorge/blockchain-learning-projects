import { ButtonHTMLAttributes } from "react";

const PrimaryButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
)=> {
  const { children, ...rest } = props;

  const className = [
    "max-w-fit",
    "inline-flex",
    "items-center",
    "px-4",
    "py-2",
    "border",
    "border-transparent",
    "text-sm",
    "font-medium",
    "rounded-md",
    "shadow-sm",
    "text-slate-900",
    "bg-yellow-400",
    "hover:bg-yellow-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-yellow-300",
    "disabled:opacity-80",
    "disabled:pointer-events-none",
  ].join(' ')

  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

export default PrimaryButton