import React, { FC, useEffect, useState } from 'react'

import Box from '@mui/material/Box';

import { MagicSpinner } from "react-spinners-kit"

import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from "axios"
import {
  useAnchorWallet, useConnection, useWallet,
} from "@solana/wallet-adapter-react";

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = (props) => {
  const { publicKey, signTransaction } = useWallet()

  const [loading, setLoading] = useState(false)

  const headers = {
    "Access-Control-Allow-Origin": "*"
  }

  const { children } = props

  return (
    <>
    {
      loading && <div className="loading-container">
        <MagicSpinner size={170} color="#00ff89" />
      </div>
    }
    <Box>
      {/* <Header/> */}
    </Box>
    <ToastContainer />
    </>
  )
}

export default Layout
