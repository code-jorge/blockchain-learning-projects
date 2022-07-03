import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import type { PackMetadataWithBalance, BundleMetadata } from "@3rdweb/sdk";
import { useEffect, useState } from "react";
import { packAddress, bundleAddress } from "../lib/contractAddresses";
import NFT from "../components/nft";
import OpenButton from "../components/open-button";

export const getStaticProps = ()=> ({
  props: {
    title: "Good Person's Lounge",
  },
})

const Lounge = ()=> {

  const { address, provider } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [packNfts, setPackNfts] = useState<PackMetadataWithBalance[]>([]);
  const [bundleNfts, setBundleNfts] = useState<BundleMetadata[]>([])

  const signer = provider?.getSigner()
  
  const sdk = new ThirdwebSDK("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
  const packModule = sdk.getPackModule(packAddress);
  const bundleModule = sdk.getBundleModule(bundleAddress);

  async function getNfts() {
    const [fetchedPackNfts, fetchedBundleNfts] = await Promise.all([
      packModule.getOwned(address),
      bundleModule.getOwned(address),
    ])
    console.log({ fetchedPackNfts, fetchedBundleNfts });
    setPackNfts(fetchedPackNfts);
    setBundleNfts(fetchedBundleNfts);
  }
  
  async function getNftsWithLoading() {
    setLoading(true);
    try {
      await getNfts()
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (address) getNftsWithLoading()
  }, [address])

  useEffect(() => {
    if (signer) sdk.setProviderOrSigner(signer)
  }, [signer])

  if (!address) {
    return <p className="text-red-800">Please connect your wallet to access the lounge!</p>
  }
  
  if (loading) {
    return (
      <svg className="animate-spin h-10 w-10 text-white" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        <span className="sr-only">Loading</span>
      </svg>
    )
  }
  
  if (packNfts.length === 0 && bundleNfts.length === 0) {
    return (
      <p className="text-white">You need to own some NFTs to access the lounge!</p>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {packNfts.length > 0 && (
        <div>
          <h2 className="text-4xl font-bold text-white">Your Packs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 mt-4 gap-2">
            <div className="border border-white rounded-lg p-4">
              <NFT metadata={packNfts[0].metadata} />
              <p className="text-white">Balance: {packNfts[0].ownedByAddress.toString()}</p>
              <OpenButton packModule={packModule} afterOpen={getNfts} />
            </div>
          </div>
        </div>
      )}

      {bundleNfts.length > 0 && (
        <div>
          <h2 className="text-4xl font-bold text-white">Your Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 mt-4 gap-2">
            {bundleNfts.map((nft) => (
              <div className="border border-white rounded-lg p-4" key={nft.metadata.id}>
                <NFT metadata={nft.metadata} />
                <p className="text-white">Balance: {nft.ownedByAddress.toString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
  
      <div>
        <h2 className="text-4xl font-bold text-white">Welcome to Steampunk Cities!</h2>
        <p className='text-white'>An experiment with NFTs in the Polygon network!</p>
      </div>
    </div>
  )

}

export default Lounge