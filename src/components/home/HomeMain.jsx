import AngleRightIcon from "../ui/icons/AngleRightIcon";
import "./homeMain.css";

function HomeMain() {
  return (
    <>
      <main className="home-page">
        <section className="hero-section">
          <div className="hero-banner">
            <div className="hero-top-row">
              <div className="marketplace-title-box">
                <div className="amazon-logo-card">
                  <span>amazon</span>
                </div>

                <div>
                  <h1>
                    Profit
                    <br />
                    Calculator
                  </h1>
                </div>
              </div>

              <a href="/login" className="live-demo-card">
                <span>
                  Click to try
                  <br />
                  live demo
                </span>

                <AngleRightIcon />
              </a>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <span>✓</span>
                SKU-Level Profit Breakdown
              </div>

              <div className="hero-feature">
                <span>✓</span>
                Per Unit Profit Calculation
              </div>

              <div className="hero-feature">
                <span>✓</span>
                Return Percentage Check
              </div>

              <div className="hero-feature">
                <span>✓</span>
                Delivery Statistics
              </div>

              <div className="hero-feature">
                <span>✓</span>
                Return Analysis
              </div>

              <div className="hero-feature">
                <span>✓</span>
                Claim Analysis
              </div>
            </div>
          </div>

          <a href="/login" className="free-report-btn">
            Generate Report
          </a>

          <div id="tools" className="sample-report-tabs">
            <a href="/sample/amazon" className="amazon-tab">
              Amazon Sample Report
            </a>

            <a href="/sample/flipkart" className="flipkart-tab">
              Flipkart Sample Report
            </a>
          </div>

          <div className="hero-proof-block">
            <h2>Backed by AI. Built for Scale.</h2>

            <div className="hero-stats">
              <div>
                <strong>₹50Cr+</strong>
                <span>Order Value Tracked</span>
              </div>

              <div>
                <strong>1000+</strong>
                <span>Sellers Analysed</span>
              </div>

              <div>
                <strong className="ai-text">AI-Powered</strong>
                <span>Real-time Financial Insights</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="home-info-section">
          <h2>Built for Indian Marketplace Sellers</h2>
          <p>
            TheEcomWay helps sellers understand marketplace profit, returns,
            settlement deductions, COGS, SKU-level performance, and delivery
            losses without complicated spreadsheets.
          </p>
        </section>

        <section id="pricing" className="home-info-section">
          <h2>Simple Pricing</h2>
          <p>
            Start with sample reports and generate detailed profit analysis for
            your Amazon, Flipkart, and Meesho business.
          </p>
        </section>

        <section id="partner" className="home-info-section">
          <h2>Partner With Us</h2>
          <p>
            Work with us to help ecommerce sellers get better financial clarity
            and marketplace insights.
          </p>
        </section>
      </main>
    </>
  );
}

export default HomeMain;
