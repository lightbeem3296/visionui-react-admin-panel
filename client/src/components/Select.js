import React from "react";

export const LbSelect = ({ label, options, ...rest }) => {
  return (
    <div className="py-1 form-field">
      <label className="text-xs form-label" >{label}</label>
      <select className="py-0 text-sm bg-gray-900 border select select-sm" defaultValue="none" {...rest}>
        <option value="none" disabled hidden>Select an Option</option>
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
    </div>
  );
}
