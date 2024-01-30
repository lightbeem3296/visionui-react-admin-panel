export const LbInput = ({ label, className, ...rest }) => {
  return (
    <div className="form-field py-1">
      <label className="form-label text-xs">{label}</label>
      <input className="input py-0 h-8 text-sm bg-gray-900 border" {...rest} />
    </div>
  );
}
