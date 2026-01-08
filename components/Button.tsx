import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "relative px-6 py-2 font-bold text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#1e2328] text-[#c8aa6e] border border-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-[#1e2328] shadow-[0_0_10px_rgba(200,170,110,0.2)]",
    secondary: "bg-[#091428] text-[#0ac8b9] border border-[#0ac8b9] hover:bg-[#0ac8b9] hover:text-[#091428] shadow-[0_0_10px_rgba(10,200,185,0.2)]",
    danger: "bg-[#1e2328] text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;