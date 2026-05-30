function SavingOverlay({ message = "Saving..." }) {
  return (
    <div className="saving-overlay">
      <div className="saving-card">
        <div className="orders-loader" />
        <h3>{message}</h3>
        <p>Please wait while we save your details.</p>
      </div>
    </div>
  );
}

export default SavingOverlay;
