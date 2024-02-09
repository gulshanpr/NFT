'use client';
require('dotenv').config();
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
const ethers = require('ethers');

export default function Home() {
  const [opposite, setOpposite] = useState('Yes');
  const [buttonText, setButtonText] = useState('No');
  const [hashCode, setHashCode] = useState('');
  const [alreadySaidYes, setAlreadySaidYes] = useState(false);
  const [minted, setMinted] = useState(false);

  const changeYesToNo = () => {
    if(!alreadySaidYes) {
      if(buttonText === 'Yes') {
        notifyYes();
        setAlreadySaidYes(true);
      } else{
        setButtonText(buttonText === 'Yes' ? 'No' : 'Yes');
        setOpposite("No");
        notifyNo();
      }
    } else{
      notifyAlreadySaidYes();
    }
  };

  const handleOpposite = () => {
    if(!alreadySaidYes) {
      if(opposite === 'No') {
        notifyNo();
        setButtonText("No");
        setOpposite("Yes");
      } else{
        notifyYes();
        setAlreadySaidYes(true);
      }
    } else{
      notifyAlreadySaidYes();
    }

  }


  const notifyAlreadySaidYes = () => {
    toast('😰 But you already said Yes!!!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const notifyNo = () => {
    toast.error('you can not say that, please say Yes 🫣', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyYes = () => 
  toast.promise(
    mintNFT,
    {
      pending: {
        render(){
          return "wait, i want to show you something..."
        },
        icon: "🟢",
      },
      success: {
        render(){
          return "For your Yes!, I have a NFT for you ❤️";
        },
        icon: "🟢",
      },
      error: {
        render({data}){
          return <MyErrorComponent message={data.message} />
        }
      }
    },
    {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // mintNFT start here

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const provider = new ethers.AlchemyProvider('sepolia', API_KEY)


  const contractAddress = '0x30988E5D30d49094d0eC99df5F23812FBE6E60A2'

  const contract = require("../../nftABI.json");
  const abi = contract.abi

  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
  const signer = new ethers.Wallet(privateKey, provider)

  // instasiated the contract
  const myNftContract = new ethers.Contract(contractAddress, abi, signer)
  // above this we have instasiated the contract that is deployed on the blockchain


  const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

  const mintNFT = async () => {
      let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
      await nftTxn.wait()
      setHashCode(nftTxn.hash);
      setMinted(true);
  }

  // mintNFT end here

  return (
    <div className='pt-8 font-bold text-center min-h-screen bg-gradient-to-r from-pink-300 to-red-300 from-rose-300 to-pink-300'>
      <ToastContainer />
      <mintbutton/>
      <h1 className='text-9xl font-custom2'>Hii, How you doing?</h1>
      <h2 className='text-8xl font-custom2'>Will you be mine Valentine??</h2>
      <div className=''>
      <button onClick={handleOpposite} className="text-2xl mt-24 mx-6 bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">{opposite}</button>
      <button onClick={changeYesToNo} className="text-2xl mx-6 bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">{buttonText}</button>
      <div className='pt-16'>
      {minted ? (
        <a href={`https://sepolia.etherscan.io/tx/${hashCode}`} className="text-blue-900 underline text-2xl font-custom4">
          {`https://sepolia.etherscan.io/tx/${hashCode}`}
        </a>
      ) : null}
      </div>
      </div>
    </div>
  );
}