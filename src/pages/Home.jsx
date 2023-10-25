import { useCallback, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js'
import axios from 'axios';

function Home() {
  const [audioInput, setAudioInput] = useState(null);
  const useWavesurfer = (containerRef, options) => {
    const [wavesurfer, setWavesurfer] = useState(null)
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!containerRef.current) return
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
      })
      setWavesurfer(ws)
  
      return () => {
        ws.destroy()
      }
    }, [options, containerRef])
  
    return wavesurfer
  }

  const WaveSurferPlayer = (props) => {
    const containerRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const wavesurfer = useWavesurfer(containerRef, props)
  
    // On play button click
    const onPlayClick = useCallback(() => {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
    }, [wavesurfer])
  
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!wavesurfer) return
      setCurrentTime(0)
      setIsPlaying(false)
      const subscriptions = [
        wavesurfer.on('play', () => setIsPlaying(true)),
        wavesurfer.on('pause', () => setIsPlaying(false)),
        wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
      ]
      return () => {
        subscriptions.forEach((unsub) => unsub())
      }
    }, [wavesurfer])
  
    return (
      <>
        <div ref={containerRef} style={{ minHeight: '120px' }} />
        <button onClick={onPlayClick} style={{ marginTop: '1em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <p>Seconds played: {currentTime}</p>
      </>
    )
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(audioInput.name);
    const formData = new FormData();
    formData.append("file", audioInput);
    axios.post(process.env.REACT_APP_URI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })

  }

  return (
    <div className="bg-gray-700 h-screen">
    <div className="flex justify-center pt-10">
      <div className="w-2/5 text-white">
        <h1 className="text-bold text-center text-4xl">Valvular Heart Disease</h1>
        <h2 className="text-medium text-center text-4xl">Detection System</h2>

        <div>
        {
          audioInput !== null &&
          <WaveSurferPlayer
            height={100}
            waveColor="rgb(200, 0, 200)"
            progressColor="rgb(100, 0, 100)"
            url={audioInput}
          />
        }
        </div>

        <form method="post" onSubmit={submitHandler} encType="multipart/form-data" className="mt-28 flex space-x-2 text-black items-center">
          <div className="w-4/6">
            <input type="file" onChange={(e) => setAudioInput(e.target.files[0])} name="file" className="w-full bg-white rounded p-2" />
          </div>
          <div className="w-1/6">
            <select name="" id="" className="w-full bg-white rounded py-3 px-2">
              <option value="CNN">CNN</option>
              <option value="LSTM">LSTM</option>
              <option value="RNN">RNN</option>
            </select>
          </div>
          <div className="w-1/6">
            <button type="submit" className="w-full bg-blue-500 text-white rounded p-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Home;
