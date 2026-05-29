function AddFirmCard() {
  return (
    <article className="firm-card add">
      <div className="plus">+</div>

      <p>New Business Firm</p>
      <h2>ADD NEW FIRM</h2>
      <span>Click to register a firm</span>

      <h4>WHAT YOU CAN DO</h4>

      <ul>
        <li>
          <span>1</span> Track profits across marketplaces
        </li>
        <li>
          <span>2</span> Upload monthly sales CSVs
        </li>
        <li>
          <span>3</span> View ROI, returns & ad spend
        </li>
      </ul>
    </article>
  );
}

export default AddFirmCard;
