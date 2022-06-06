import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { useState, useEffect } from "react"
import { NFT, NFTmap } from "types/metadata"
import * as anchor from "@project-serum/anchor"
import axios from "axios"
import { PublicKey } from "@solana/web3.js"
import { Metadata } from "@metaplex-foundation/mpl-token-metadata"
import { useWallet } from "@solana/wallet-adapter-react"

const useFetchEggNfts = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const wallet = useWallet()
  const [nftList, setNFTList] = useState<any[]>([])
  const connection = new anchor.web3.Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!)
  const [mintAddrList, setMintAddrList] = useState<string[]>([])

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true)

      if (wallet.connected) {
        try {
          const nftData = await getParsedNftAccountsByOwner({
            publicAddress: wallet.publicKey?.toString(),
            connection: connection
          })
          
          for (let i = 0; i < nftData.length; i++) {
            const element = nftData[i];
            
            if (element.updateAuthority == process.env.NEXT_PUBLIC_EGG_UPDATE_AUTHORITY) {
              const { data } = await axios.get<NFT>(element.data.uri)
              setNFTList((nftList) => [...nftList, { 
                NFT: data, 
                mint: element.mint, 
                updateAuthority: 
                element.updateAuthority 
              }])
            }
          }

          await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/hatching-eggs`, {
            walletAddress: wallet.publicKey?.toString()
          }).then(async function (res) {
            for (let i = 0; i < res.data.hatchingEggs.length; i++) {
              const element = res.data.hatchingEggs[i];
              let mintPubkey = new PublicKey(element.nftAddress);
              let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
              const tokenmeta = await Metadata.load(connection, tokenmetaPubkey)
              const { data } = await axios.get<NFT>(tokenmeta.data.data.uri);

              setNFTList((nftList) => [...nftList, { 
                NFT: data, 
                mint: element.nftAddress, 
                updateAuthority: tokenmeta.data.updateAuthority, 
                cooldown: Math.floor((new Date(element.hatchedAt).valueOf() - new Date(res.data.time).valueOf()) / 1000) 
              }])
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        setNFTList([])
      }

      setLoading(false)
    }

    fetchNFTs()
  }, [wallet.publicKey, wallet.connected])

  return { nftsList: nftList, mintAddrList }
}

export default useFetchEggNfts