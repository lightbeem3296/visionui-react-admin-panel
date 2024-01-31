export const LbButton = ({ className, children, ...rest }) => {
  return (
    <button className={"btn btn-sm lb-btn-color border border-gray-800/50 " + className} {...rest}>
      {children}
    </button>
  );
}
