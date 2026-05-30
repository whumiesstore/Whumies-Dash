function ValidatingFile({ message = "Validating file..." }) {
  return (
    <div className="validating-orders-box">
      <div className="orders-loader" />
      <h3>{message}</h3>
    </div>
  );
}

export default ValidatingFile;