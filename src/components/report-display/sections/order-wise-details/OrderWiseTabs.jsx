function OrderWiseTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="order-wise-tabs-wrap">
      <div className="order-wise-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OrderWiseTabs;
