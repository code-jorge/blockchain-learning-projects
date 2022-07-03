const SecondaryButton = ({ children, ...rest })=> {

  const className = [
    "inline-flex",
    "items-center",
    "px-3",
    "py-2",
    "border",
    "border-transparent",
    "text-sm",
    "leading-4",
    "font-medium",
    "rounded-md",
    "text-indigo-700",
    "bg-indigo-100",
    "hover:bg-indigo-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-indigo-500",
    "disabled:opacity-80",
    "disabled:pointer-events-none",
  ].join(' ')

  return (
    <button
      {...rest}
      className={className}
    >
      {children}
    </button>
  )
}

export default SecondaryButton