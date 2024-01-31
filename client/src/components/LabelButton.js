export const LbLabelButton = ({ className, children, ...rest }) => {
  return (
    <label className={"btn btn-sm lb-btn-color border border-gray-800/50 " + className} {...rest}>
      {children}
    </label>
  );
}
