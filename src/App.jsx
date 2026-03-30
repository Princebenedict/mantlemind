import { useState } from "react";
import { useWallet } from "./hooks/useWallet";
import { getMantleAdvice } from "./services/advisor";
import "./App.css";

const RISK_COLOR = {
  Low: "#5cf2b5",
  Medium: "#ffbf5f",
  High: "#ff7d7d",
};

const TOKEN_ICONS = {
  MNT: "https://cryptologos.cc/logos/mantle-mnt-logo.png?v=040",
  mETH: "https://assets.coingecko.com/coins/images/33388/large/meth.png",
  cmETH: "https://assets.coingecko.com/coins/images/33389/large/cmeth.png",
  FBTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040",
};

function TokenIcon({ token }) {
  const [failed, setFailed] = useState(false);

  if (failed || !TOKEN_ICONS[token]) {
    return <div className="token-fallback">{token.slice(0, 2)}</div>;
  }

  return (
    <img
      src={TOKEN_ICONS[token]}
      alt={token}
      className="token-icon"
      onError={() => setFailed(true)}
    />
  );
}

export default function App() {
  const { address, balances, loading, error, connect, disconnect } = useWallet();
  const [advice, setAdvice] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiError, setAiError] = useState(null);

  async function runAnalysis() {
    if (!address) return;

    setAnalyzing(true);
    setAiError(null);
    setAdvice(null);

    try {
      const result = await getMantleAdvice(address, balances);
      setAdvice(result);
    } catch (analysisError) {
      console.error("Strategy Engine Error:", analysisError);
      setAiError(analysisError.message || "Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  const totalAssets = Object.keys(balances || {}).length;
  const shortenedAddress = address ? `${address.slice(0, 8)}...${address.slice(-6)}` : "";

  return (
    <div className="app">
      <div className="page-orb orb-one" />
      <div className="page-orb orb-two" />

      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-badge brand-badge-text">M</div>

          <div>
            <div className="logo">MantleMind</div>
            <p className="tagline">AI Wealth Co-Pilot for Mantle</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="network-pill">Mantle Mainnet</div>
          {address ? (
            <button onClick={disconnect} className="btn-secondary">
              Disconnect
            </button>
          ) : (
            <button onClick={connect} disabled={loading} className="btn-secondary">
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        <section className="hero-banner">
          <div className="hero-copy">
            <span className="hero-kicker">Mantle-native intelligence for serious DeFi users</span>
            <h1>Smarter yield strategy and cleaner portfolio insight for Mantle.</h1>
            <p>
              MantleMind helps users understand wallet positioning, risk posture, and yield
              opportunities through a more organized, professional interface built for the Mantle
              ecosystem.
            </p>

            <div className="hero-actions">
              <button onClick={connect} disabled={loading || Boolean(address)} className="btn-primary">
                {address ? "Wallet Connected" : loading ? "Connecting..." : "Connect Mantle Wallet"}
              </button>
              <button
                onClick={runAnalysis}
                disabled={!address || analyzing}
                className="btn-secondary hero-secondary"
              >
                {analyzing ? "Analyzing..." : "Preview Strategy"}
              </button>
            </div>

            <div className="hero-metrics">
              <div className="metric-chip">
                <strong>{address ? totalAssets : "Multi-asset"}</strong>
                <span>{address ? "tokens detected" : "portfolio monitoring"}</span>
              </div>
              <div className="metric-chip">
                <strong>Multi-view</strong>
                <span>yield opinions</span>
              </div>
              <div className="metric-chip">
                <strong>Mantle-native</strong>
                <span>strategy intelligence</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-card">
              <div className="panel-card-head">
                <span className="panel-label">Strategy overview</span>
                <span className="panel-status">Live</span>
              </div>

              <div className="strategy-score">
                <div>
                  <p className="mini-label">Current posture</p>
                  <h2>{advice?.riskScore || "Balanced"}</h2>
                </div>
                <p className="strategy-copy">
                  {address
                    ? "Wallet connected and ready for portfolio-aware Mantle analysis."
                    : "Connect a wallet to unlock analysis, risk guidance, and yield opportunities."}
                </p>
              </div>

              <div className="strategy-grid">
                <div>
                  <span>Wallet</span>
                  <strong>{address ? "Connected" : "Pending"}</strong>
                </div>
                <div>
                  <span>Assets tracked</span>
                  <strong>{address ? totalAssets : "--"}</strong>
                </div>
                <div>
                  <span>Risk summary</span>
                  <strong>{advice?.riskScore || "Waiting"}</strong>
                </div>
                <div>
                  <span>Yield gap</span>
                  <strong>{advice?.yieldGap || "--"}</strong>
                </div>
              </div>

              {address && (
                <div className="wallet-identity">
                  <span>Connected address</span>
                  <strong>{shortenedAddress}</strong>
                </div>
              )}
            </div>
          </aside>
        </section>

        <section className="trust-row">
          <div className="trust-item">
            <span className="trust-title">Cleaner portfolio visibility</span>
            <p>See Mantle balances and token positions in a layout that feels product-ready.</p>
          </div>
          <div className="trust-item">
            <span className="trust-title">Different strategy opinions</span>
            <p>Get conservative, balanced, and higher-yield views instead of one repeated answer.</p>
          </div>
          <div className="trust-item">
            <span className="trust-title">Mantle ecosystem context</span>
            <p>Recommendations are framed around yield paths across the Mantle ecosystem.</p>
          </div>
        </section>

        <section className="main-content">
          {!address ? (
            <div className="card connect-card">
              <div className="section-header">
                <div>
                  <span className="section-kicker">Get started</span>
                  <h2>Connect your Mantle wallet</h2>
                </div>
              </div>

              <p className="section-description">
                Unlock portfolio-aware guidance, yield comparison, and multiple Mantle strategy
                opinions based on your current wallet positions.
              </p>

              <div className="connect-benefits">
                <div className="benefit-box">
                  <strong>Portfolio scan</strong>
                  <span>Review supported balances and tracked positions quickly.</span>
                </div>
                <div className="benefit-box">
                  <strong>Risk awareness</strong>
                  <span>Understand concentration, exposure, and yield tradeoffs.</span>
                </div>
                <div className="benefit-box">
                  <strong>Multiple strategies</strong>
                  <span>See different Mantle yield paths instead of one fixed opinion.</span>
                </div>
              </div>

              <button onClick={connect} disabled={loading} className="btn-primary large-button">
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>

              {error && <p className="error">{error}</p>}
            </div>
          ) : (
            <div className="dashboard-grid">
              <section className="card portfolio-card">
                <div className="section-header">
                  <div>
                    <span className="section-kicker">Portfolio</span>
                    <h2>Your Mantle positions</h2>
                  </div>
                  <p className="address">{shortenedAddress}</p>
                </div>

                <div className="balances">
                  {Object.entries(balances).map(([token, amount]) => (
                    <div className="balance-row" key={token}>
                      <div className="token-info">
                        <TokenIcon token={token} />
                        <div>
                          <span className="token-label">{token}</span>
                          <span className="token-subtitle">Mantle ecosystem asset</span>
                        </div>
                      </div>
                      <span className="token-amount">{Number(amount).toFixed(4)}</span>
                    </div>
                  ))}
                </div>

                <button onClick={runAnalysis} disabled={analyzing} className="btn-primary large-button">
                  {analyzing ? (
                    <span className="loading-text">
                      Analyzing Strategies<span className="dots"></span>
                    </span>
                  ) : (
                    "Generate Strategy Report"
                  )}
                </button>

                {aiError && <p className="error">{aiError}</p>}
              </section>

              <section className="card insights-card">
                <div className="section-header">
                  <div>
                    <span className="section-kicker">Insights</span>
                    <h2>Portfolio signal</h2>
                  </div>
                </div>

                <div className="insight-stat">
                  <span>Detected assets</span>
                  <strong>{totalAssets}</strong>
                </div>

                <div className="insight-stat">
                  <span>Analysis status</span>
                  <strong>{analyzing ? "Running" : advice ? "Ready" : "Not started"}</strong>
                </div>

                <div className="insight-stat">
                  <span>Recommended stance</span>
                  <strong style={{ color: RISK_COLOR[advice?.riskScore] || "#d8efe5" }}>
                    {advice?.riskScore || "Awaiting analysis"}
                  </strong>
                </div>

                <p className="section-description compact">
                  This side panel keeps the most important strategy signals visible while the main
                  report expands below.
                </p>
              </section>

              {advice && (
                <section className="card advice-card full-width">
                  <div className="section-header">
                    <div>
                      <span className="section-kicker">Strategy report</span>
                      <h2>Your personalized Mantle strategy</h2>
                    </div>
                  </div>

                  <div className="summary-box">
                    <p>{advice.summary}</p>
                  </div>

                  <div className="two-col">
                    <div className="metric-box">
                      <span className="metric-label">Risk score</span>
                      <span
                        className="metric-value"
                        style={{ color: RISK_COLOR[advice.riskScore] || "#d8efe5" }}
                      >
                        {advice.riskScore}
                      </span>
                      <span className="metric-sub">{advice.riskReason}</span>
                    </div>

                    <div className="metric-box">
                      <span className="metric-label">Yield gap</span>
                      <span className="metric-value yield">{advice.yieldGap}</span>
                      <span className="metric-sub">
                        Potential improvement based on current positioning
                      </span>
                    </div>
                  </div>

                  <div className="strategy-opinions">
                    <div className="section-header compact-header">
                      <div>
                        <span className="section-kicker">Multiple views</span>
                        <h2>Yield opinions across Mantle</h2>
                      </div>
                    </div>

                    <div className="strategy-cards">
                      {advice.strategies?.map((strategy) => (
                        <article className="strategy-option-card" key={strategy.title}>
                          <div className="strategy-option-top">
                            <div>
                              <h3>{strategy.title}</h3>
                              <span className="strategy-style">{strategy.style}</span>
                            </div>
                            <span className="strategy-yield">{strategy.expectedYield}</span>
                          </div>

                          <p className="strategy-thesis">{strategy.thesis}</p>

                          <ul className="strategy-actions">
                            {strategy.actions.map((action) => (
                              <li key={action}>{action}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="recommendation-block">
                    <h3>Primary actionable recommendations</h3>
                    <ol className="recs">
                      {advice.recommendations?.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ol>
                  </div>
                </section>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>
          Powered by <span className="mantle-text">Mantle</span> • Strategy intelligence for the
          Mantle ecosystem
        </p>
      </footer>
    </div>
  );
}


