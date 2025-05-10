import { useState } from "react";

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    type,
    placeholder,
    name,
    id,
    onChange,
    checked,
    value,
    rows = 4,
    className = "",
    error = null,
    disabled,
    ...rest
  } = props;

  // Convert boolean values to strings for HTML attributes
  const sanitizeProps = () => {
    const cleanProps = {};

    // Copy all remaining props and ensure boolean values are properly handled
    Object.keys(rest).forEach((key) => {
      const propValue = rest[key];

      // Handle boolean attributes correctly
      if (typeof propValue === "boolean") {
        if (propValue) {
          cleanProps[key] = key; // For true values on boolean attributes
        }
        // Omit the attribute entirely for false values
      } else {
        cleanProps[key] = propValue; // Keep non-boolean values as is
      }
    });

    return cleanProps;
  };

  const sanitizedProps = sanitizeProps();
  const errorClass = error
    ? "border-red-500 focus:ring-red-500"
    : "focus:ring-blue-500";

  // Handle disabled state
  const disabledClass = disabled ? "bg-gray-100 cursor-not-allowed" : "";

  if (type === "textarea") {
    return (
      <textarea
        id={id}
        className={`text-sm  bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full py-2 px-3 text-slate-700 placeholder:opacity-80 focus:outline-none focus:ring-1 resize-y ${errorClass} ${disabledClass} ${className}`}
        placeholder={placeholder}
        name={name}
        rows={rows}
        onChange={onChange}
        value={value}
        disabled={disabled || undefined}
        {...sanitizedProps}
      ></textarea>
    );
  }

  if (type === "checkbox") {
    return (
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className} ${
          disabled ? "opacity-60" : ""
        }`}
        name={name}
        onChange={onChange}
        checked={checked}
        disabled={disabled || undefined}
        {...sanitizedProps}
      />
    );
  }

  if (type === "password") {
    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`text-sm border  w-full py-2 px-3 text-slate-700 bg-white  border-gray-300 rounded-lg focus:ring-blue-500  placeholder:opacity-80 focus:outline-none focus:ring-1 focus:border-transparent pr-10 ${errorClass} ${disabledClass} ${className}`}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          disabled={disabled || undefined}
          {...sanitizedProps}
        />
        <button
          type="button"
          className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={togglePasswordVisibility}
          disabled={disabled || undefined}
        >
          {showPassword ? (
            // Icon mata tertutup (hide password)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          ) : (
            // Icon mata terbuka (show password)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    );
  }

  // For select and other input types
  return (
    <input
      type={type}
      className={`text-sm border bg-white  border-gray-300  focus:ring-blue-500 focus:border-blue-500 rounded-lg w-full py-2 px-3 text-slate-700 placeholder:opacity-80 focus:outline-none focus:ring-1 ${errorClass} ${disabledClass} ${className}`}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      disabled={disabled || undefined}
      {...sanitizedProps}
    />
  );
};

export default Input;
