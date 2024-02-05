export const LbText = ({ label, className, ...rest }) => {
  return (
    <div className="py-1 form-field">
      <label className="text-xs form-label">{label}</label>
      <textarea className={"text-sm bg-gray-900 border textarea rounded-md " + className} {...rest} />
    </div>
  );
}
