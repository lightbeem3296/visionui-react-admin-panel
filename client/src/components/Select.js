import React from "react";

export const LbSelect = ({ label, options, ...rest }) => {
  return (
    <div className="py-1 form-field">
      <label className="text-xs form-label" >{label}</label>
      <select className="py-0 text-sm bg-gray-900 border select select-sm" {...rest}>
        <option value="none" selected disabled hidden>Select an Option</option>
        {options.map((value, index) => (
          <option key={value} value={index}>{value}</option>
        ))}
      </select>
    </div>
  );
}
