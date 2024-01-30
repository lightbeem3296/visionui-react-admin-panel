import React from "react";

export const LbSelect = ({ label, options, ...rest }) => {
  return (
    <div className="form-field py-1">
      <label className="form-label text-xs" >{label}</label>
      <select className="py-0 text-sm select select-sm bg-gray-900 border" {...rest}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
