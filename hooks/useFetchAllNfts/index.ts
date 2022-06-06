import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { useState, useEffect } from "react"
import { NFT, NFTmap } from "types/metadata"
import * as anchor from "@project-serum/anchor"
import axios from "axios"
import { PublicKey } from "@solana/web3.js"
import { Metadata } from "@metaplex-foundation/mpl-token-metadata"
import { useWallet } from "@solana/wallet-adapter-react"

const useFetchAllNfts = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const wallet = useWallet()
    const [nftList, setNFTList] = useState<{ [key: string]: NFTmap }>({})
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
                    const mintList: string[] = []
                    nftData.forEach(async (element) => {
                        if (element.updateAuthority == process.env.NEXT_PUBLIC_IGUANA_UPDATE_AUTHORITY || 
                            element.updateAuthority == process.env.NEXT_PUBLIC_RADAR_UPDATE_AUTHORITY) {
                            mintList.push(element.mint)

                            const { data } = await axios.get<NFT>(element.data.uri)
                            nftList[element.mint] = { NFT: data, mint: element.mint, updateAuthority: element.updateAuthority }
                            setNFTList(nftList)
                        }
                    })

                    setMintAddrList(mintList)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setNFTList({})
            }

            setLoading(false)
        }

        fetchNFTs()
    }, [wallet.publicKey, wallet.connected])

    return { nftsList: nftList, mintAddrList }
}

export default useFetchAllNfts