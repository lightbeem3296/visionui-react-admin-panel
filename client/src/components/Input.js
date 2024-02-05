export const LbInput = ({ label, className, ...rest }) => {
  return (
    <div className="py-1 form-field">
      <label className="text-xs form-label">{label}</label>
      <input className={"input py-0 h-8 text-sm bg-gray-900 border " + className} {...rest} />
    </div>
  );
}
