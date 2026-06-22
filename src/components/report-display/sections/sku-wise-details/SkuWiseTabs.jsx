function SkuWiseTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="sku-wise-tabs-wrap">
      <div className="sku-wise-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => onChange(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default SkuWiseTabs;
