import { useAddress, useContract, useContractWrite, ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { useState } from "react";

const CONTRACT_ADDRESS = "SEU_CONTRATO_ADDRESS_AQUI";
const CLIENT_ID = "SEU_CLIENT_ID_AQUI";

function MintSection() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: mintTo } = useContractWrite(contract, "mintTo");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!address) return alert("Connect your wallet first.");
    setLoading(true);
    try {
      const tx = await mintTo({ args: [address] });
      alert("NFT minted!");
    } catch (e) {
      console.error(e);
      alert("Minting failed.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleMint}
        disabled={loading}
        style={{ padding: "12px 24px", fontSize: "16px", background: "#fcd34d", borderRadius: "8px" }}
      >
        {loading ? "Minting..." : "Mint Sun Peso – Argentina"}
      </button>
    </div>
  );
}

function App() {
  return (
    <ThirdwebProvider clientId={CLIENT_ID} activeChain="polygon">
      <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
        <h1>🌍 WorldMint</h1>
        <p>Collect global digital coins as NFTs.</p>
        <ConnectWallet />
        <MintSection />
      </div>
    </ThirdwebProvider>
  );
}

export default App;