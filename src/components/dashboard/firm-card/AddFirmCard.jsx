function AddFirmCard({ onClick }) {
  return (
    <button type="button" className="firm-card add" onClick={onClick}>
      <div className="plus">+</div>

      <p>New Business Firm</p>
      <h2>ADD NEW FIRM</h2>
      <span>Click to register another firm</span>

      <h4>WHAT YOU CAN DO</h4>

      <ul>
        <li>
          <span>1</span> Track profits across Amazon and Flipkart
        </li>
        <li>
          <span>2</span> Upload monthly sales and payment files
        </li>
        <li>
          <span>3</span> View ROI, returns, claims and ad spend
        </li>
      </ul>
    </button>
  );
}

export default AddFirmCard;
