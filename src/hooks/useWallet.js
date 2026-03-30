import { ethers } from "ethers";
import { useState } from "react";

const MANTLE_CHAIN = {
  chainId: "0x1388",
  chainName: "Mantle",
  nativeCurrency: { name: "MNT", symbol: "MNT", decimals: 18 },
  rpcUrls: ["https://rpc.mantle.xyz"],
  blockExplorerUrls: ["https://explorer.mantle.xyz"],
};

const TOKENS = {
  mETH: "0xcDA86A272531e8640cD7F1a92c01839711B2fDfD",
  cmETH: "0xE6829d9a7eE3040e1276Fa75293Bde931859e8fA",
  FBTC: "0xC96dE26018A54D51c097160568752c4E3BD6C364",
};

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function connect() {
    if (!window.ethereum) {
      setError("No Ethereum wallet detected. Install MetaMask or a compatible wallet.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [MANTLE_CHAIN],
      });

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: MANTLE_CHAIN.chainId }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      setAddress(addr);
      await fetchBalances(addr, provider);
    } catch (err) {
      setError(err.message || "Failed to connect wallet.");
    } finally {
      setLoading(false);
    }
  }

  function disconnect() {
    setAddress(null);
    setBalances({});
    setError(null);
  }

  async function fetchBalances(addr, provider) {
    const mntWei = await provider.getBalance(addr);
    const result = {
      MNT: parseFloat(ethers.formatEther(mntWei)).toFixed(4),
    };

    for (const [symbol, contractAddress] of Object.entries(TOKENS)) {
      try {
        const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
        const [raw, decimals] = await Promise.all([
          contract.balanceOf(addr),
          contract.decimals(),
        ]);

        result[symbol] = parseFloat(ethers.formatUnits(raw, decimals)).toFixed(6);
      } catch {
        result[symbol] = "0.000000";
      }
    }

    setBalances(result);
  }

  return { address, balances, loading, error, connect, disconnect };
}
