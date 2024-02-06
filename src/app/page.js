'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const notify = () => toast("last baar puch raha hu, will you be mine valentine?");
  const yesNote = () => toast("pata tha you love me 🥰");

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-rose-300 to-pink-200 flex flex-col items-center justify-center">
      <ToastContainer />
      <h1>Hii, How you doing?</h1>
      <h2>Will you be mine valentine??</h2>
      <div>
      <button onClick={yesNote} class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">
        Yes
      </button>
      </div>
      <div>
        <button onClick={notify} className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">No</button>
      </div>
    </div>
  );
}