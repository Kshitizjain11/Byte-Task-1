import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HomeInput = () => {
  const [repoLink, setRepoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://byte-task-1-backend.vercel.app/getdata", { repoLink: repoLink });
      navigate("/preview", { state: { markdown: res.data.markdown } });
    } catch (err) {
      // console.log(err);
      alert("Invalid Repo !!! ")
    } finally {
      setLoading(false);
    }
  } 
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#050505] font-mono">
      <form
      onSubmit={handleSubmit}
        // action="http://localhost:3000/getdata"
        // method="post"
        className="bg-[#0d0d0d] w-full max-w-sm border border-cyan-400/20 shadow-[0_0_20px_rgba(0,242,234,0.1),inset_0_0_10px_rgba(0,0,0,0.5)] m-4 overflow-hidden"
      >
        <div className="flex justify-between items-center bg-black/30 border-b border-cyan-400/20 px-4 py-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z" />
            </svg>
            <span>SECURE_DATA</span>
          </div>
          <div className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#333]"></span>
            <span className="w-2 h-2 rounded-full bg-[#333]"></span>
            <span className="w-2 h-2 rounded-full bg-[#333]"></span>
          </div>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <input 
              onChange={(e)=> setRepoLink(e.target.value)}
              type="text"
              id="repolink"
              name="repolink"
              required
              placeholder=" "
              className="w-full bg-transparent border-0 border-b-2 border-cyan-400/30 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 peer"
            />
            <label
              htmlFor="repolink"
              className="absolute left-0 top-3 text-cyan-400 uppercase text-sm tracking-widest opacity-60 transition-all duration-300 
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-60 
                peer-focus:top-[-1.2rem] peer-focus:text-sm peer-focus:opacity-100"
            >
              Repo Link
            </label>
          </div>

          <button
            type="submit"
            className="relative w-full py-3 mt-4 border-2 border-cyan-400 text-cyan-400 font-bold text-sm uppercase tracking-widest 
              transition-all duration-300 hover:bg-cyan-400 hover:text-[#0d0d0d] hover:shadow-[0_0_25px_#00f2ea] active:scale-95 
              overflow-hidden group flex items-center justify-center"
            data-text="INITIATE_CONNECTION"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-cyan-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              <>
                <span className="relative z-10 transition-opacity duration-200 group-hover:opacity-0">
                  Generate ReadMe
                </span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-cyan-400 text-purple-400 animate-glitch z-0">
                  Generate ReadMe
                </span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-cyan-400 text-[#0d0d0d] animate-glitch-reverse z-0">
                  Generate ReadMe
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default HomeInput