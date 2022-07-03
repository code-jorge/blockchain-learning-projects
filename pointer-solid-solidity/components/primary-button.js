const PrimaryButton = ({ type, children, ...rest })=> {

  const className= [
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
    "text-white",
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-indigo-500",
    "disabled:opacity-80",
    "disabled:pointer-events-none"
  ].join(' ')

  if(type === "link") return <a {...rest} className={className}>{children}</a>
  else return <button {...rest} className={className}>{children}</button>

}

export default PrimaryButton