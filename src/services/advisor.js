const MANTLE_YIELD_DATA = {
  MNT: 8.1,
  mETH: 2.8,
  cmETH: 5.1,
  FBTC: 3.4,
  MI4: 6.2,
  USDY: 4.9,
};

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

function getPortfolioSnapshot(balances) {
  const portfolio = {
    MNT: toNumber(balances.MNT),
    mETH: toNumber(balances.mETH),
    cmETH: toNumber(balances.cmETH),
    FBTC: toNumber(balances.FBTC),
  };

  const total = Object.values(portfolio).reduce((sum, value) => sum + value, 0);
  const activeAssets = Object.entries(portfolio).filter(([, value]) => value > 0);

  return { portfolio, total, activeAssets };
}

function getCurrentEstimatedYield(portfolio, total) {
  if (total <= 0) return 0;

  const weightedYield =
    portfolio.MNT * MANTLE_YIELD_DATA.MNT +
    portfolio.mETH * MANTLE_YIELD_DATA.mETH +
    portfolio.cmETH * MANTLE_YIELD_DATA.cmETH +
    portfolio.FBTC * MANTLE_YIELD_DATA.FBTC;

  return weightedYield / total;
}

function getBestAvailableYield() {
  return Math.max(
    MANTLE_YIELD_DATA.MNT,
    MANTLE_YIELD_DATA.mETH,
    MANTLE_YIELD_DATA.cmETH,
    MANTLE_YIELD_DATA.FBTC,
    MANTLE_YIELD_DATA.MI4,
    MANTLE_YIELD_DATA.USDY
  );
}

function getLargestHolding(portfolio) {
  return Object.entries(portfolio).sort((a, b) => b[1] - a[1])[0];
}

function buildRiskProfile(portfolio, total, activeAssets) {
  if (total === 0) {
    return {
      riskScore: "Low",
      riskReason: "Your wallet currently holds no tracked Mantle assets, so active portfolio risk is limited.",
    };
  }

  if (activeAssets.length === 1) {
    return {
      riskScore: "High",
      riskReason: "Your portfolio is concentrated in a single tracked asset, which increases concentration risk.",
    };
  }

  const [largestAsset, largestAmount] = getLargestHolding(portfolio);
  const concentration = total > 0 ? largestAmount / total : 0;

  if (concentration >= 0.7) {
    return {
      riskScore: "High",
      riskReason: `Most of your tracked portfolio is concentrated in ${largestAsset}, which raises concentration risk.`,
    };
  }

  if (concentration >= 0.4) {
    return {
      riskScore: "Medium",
      riskReason: `Your portfolio has moderate concentration toward ${largestAsset}, but still has some diversification.`,
    };
  }

  return {
    riskScore: "Low",
    riskReason: "Your tracked assets appear relatively diversified across multiple Mantle positions.",
  };
}

function buildSummary(total, activeAssets, riskScore, currentYield, bestYield) {
  if (total === 0) {
    return "Your tracked Mantle portfolio is currently empty, so there is room to deploy into yield opportunities with a more intentional starting allocation.";
  }

  return `Your portfolio holds ${activeAssets.length} tracked asset${activeAssets.length > 1 ? "s" : ""}, carries a ${riskScore.toLowerCase()} risk posture, and appears to earn about ${formatPercent(currentYield)} versus opportunities that may reach around ${formatPercent(bestYield)}.`;
}

function buildStrategies(total, activeAssets, currentYield) {
  if (total === 0) {
    return [
      {
        title: "Conservative Income",
        style: "Low risk",
        expectedYield: "4.9% - 6.2%",
        thesis: "Start with steadier Mantle opportunities focused on smoother yield and lower concentration risk.",
        actions: [
          "Begin with USDY for more stable yield exposure.",
          "Add MI4 for diversified access across the Mantle ecosystem.",
          "Avoid concentrating your first deployment into one high-yield position.",
        ],
      },
      {
        title: "Balanced Mantle Mix",
        style: "Medium risk",
        expectedYield: "5.1% - 8.1%",
        thesis: "Blend staking-style exposure and ecosystem strategies for a stronger balance between stability and upside.",
        actions: [
          "Split capital across cmETH, MI4, and selective MNT exposure.",
          "Keep part of the portfolio flexible for better reallocation opportunities.",
          "Review yields regularly and rebalance based on opportunity shifts.",
        ],
      },
      {
        title: "Aggressive Yield",
        style: "High risk",
        expectedYield: "Up to 8.1%",
        thesis: "Target the highest-yield Mantle opportunities with more volatility and concentration risk.",
        actions: [
          "Increase MNT-linked opportunity exposure for maximum upside.",
          "Use cmETH where higher staking yield fits your risk tolerance.",
          "Monitor concentration closely and avoid overcommitting too early.",
        ],
      },
    ];
  }

  const diversified = activeAssets.length >= 3;
  const conservativeYield = diversified ? "3.4% - 5.1%" : "4.9% - 6.2%";
  const balancedYield = diversified ? "5.1% - 6.8%" : "5.1% - 8.1%";
  const aggressiveYield = currentYield >= 5 ? "Up to 8.1%" : "6.2% - 8.1%";

  return [
    {
      title: "Protect and Stabilize",
      style: "Low risk",
      expectedYield: conservativeYield,
      thesis: "Reduce concentration, preserve flexibility, and favor steadier Mantle yield sources.",
      actions: [
        "Shift part of concentrated exposure into MI4 or USDY-style defensive yield positions.",
        "Keep some capital in lower-volatility assets before chasing higher returns.",
        "Use diversification to improve resilience across tracked Mantle positions.",
      ],
    },
    {
      title: "Balanced Optimization",
      style: "Medium risk",
      expectedYield: balancedYield,
      thesis: "Improve returns while keeping the portfolio reasonably diversified across Mantle opportunities.",
      actions: [
        "Compare mETH and cmETH allocations to improve staking yield efficiency.",
        "Blend diversified Mantle exposure with one or two higher-yield positions.",
        "Rebalance toward underused assets if the portfolio is overly concentrated.",
      ],
    },
    {
      title: "Higher-Yield Rotation",
      style: "High risk",
      expectedYield: aggressiveYield,
      thesis: "Tilt the portfolio toward stronger-yield Mantle opportunities while accepting more concentration and volatility.",
      actions: [
        "Increase exposure to higher-yield ecosystem opportunities like MNT-linked strategies.",
        "Rotate from lower-yield positions if your risk tolerance allows.",
        "Track position sizing carefully so yield chasing does not create excess concentration.",
      ],
    },
  ];
}

export async function getMantleAdvice(address, balances) {
  if (!address || !balances) {
    throw new Error("Missing wallet address or balances");
  }

  const { portfolio, total, activeAssets } = getPortfolioSnapshot(balances);
  const currentYield = getCurrentEstimatedYield(portfolio, total);
  const bestYield = getBestAvailableYield();
  const { riskScore, riskReason } = buildRiskProfile(portfolio, total, activeAssets);
  const summary = buildSummary(total, activeAssets, riskScore, currentYield, bestYield);
  const strategies = buildStrategies(total, activeAssets, currentYield);

  return {
    riskScore,
    riskReason,
    yieldGap: `You are earning about ${formatPercent(currentYield)} but could earn up to ${formatPercent(bestYield)}.`,
    summary,
    recommendations: strategies[1].actions,
    strategies,
  };
}






