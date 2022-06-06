import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { useState, useEffect } from "react"
import { NFT, NFTmap } from "types/metadata"
import * as anchor from "@project-serum/anchor"
import axios from "axios"
import { PublicKey } from "@solana/web3.js"
import { Metadata } from "@metaplex-foundation/mpl-token-metadata"
import { useWallet } from "@solana/wallet-adapter-react"

const useFetchBabyNfts = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const wallet = useWallet()
  const [babyList, setBabyList] = useState<any[]>([])
  const connection = new anchor.web3.Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!)

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true)

      if (wallet.connected) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/hatched-babies`, {
            walletAddress: wallet.publicKey?.toString()
          }).then(async function (res) {
            for (let i = 0; i < res.data.hatchedBabies.length; i++) {
              const element = res.data.hatchedBabies[i];
              let mintPubkey = new PublicKey(element.nftAddress);
              let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
              const tokenmeta = await Metadata.load(connection, tokenmetaPubkey)
              const { data } = await axios.get<NFT>(tokenmeta.data.data.uri);

              setBabyList((babyList) => [...babyList, { 
                NFT: data, 
                mint: element.nftAddress, 
                updateAuthority: tokenmeta.data.updateAuthority,
              }])
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        setBabyList([])
      }

      setLoading(false)
    }

    fetchNFTs()
  }, [wallet.publicKey, wallet.connected])

  return { babyList: babyList }
}

export default useFetchBabyNfts