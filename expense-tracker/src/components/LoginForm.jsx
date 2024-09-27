import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function LoginForm() {
  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const navigate = useNavigate()
  // const handleLogin = async(e) => {
  //   e.preventDefault()

  //   try {
  //     localStorage.setItem('uuid', (await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)).user.uid)
  //     navigate('/')
  //   } catch (err) {
  //     console.log(err)

  //   }
  // }
  // const navigation = useNavigate()
  // useEffect(()=>{
  //   if(localStorage.getItem('uuid')){
  //     navigation('/')
  //   }
  // })

  useEffect(()=>{
    console.log('recording page')
  },[])

  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [message, setMessage] = useState('Screen Recording')

  // Function to start screen recording
  const startRecording = async () => {
    try {
      // Request permission to capture the screen
      // const stream = await navigator.mediaDevices.getDisplayMedia({
      //   video: true,  // Simply requesting screen video capture, no 'mediaSource' needed
      //   audio: false, // Add audio: true if you want to capture audio as well
      // });

      const stream = navigator.mediaDevices.getUserMedia({
        audio: false, // mandatory.
        video: {'mandatory': {'chromeMediaSource':'screen'}}
      })

      // Initialize MediaRecorder with the captured stream
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideoURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting screen recording:", err);
      setMessage(`${err}`)
    }
  };

  // Function to stop screen recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  return (
    // <div className='w-screen my-16 flex items-center justify-evenly'>
    //   <form className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-2 my-6'>
    //     <div className="font-bold text-white text-2xl text-center">Login</div>
    //     <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
    //       <div className="form-control w-full">
    //         <label className="label">
    //           <span className="label-text">Email :</span>
    //         </label>
    //         <input ref={emailRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
    //       </div>
    //       <div className="form-control w-full">
    //         <label className="label">
    //           <span className="label-text">Password :</span>
    //         </label>
    //         <input ref={passwordRef} type="password" placeholder="Type here" className="input input-bordered w-full" />
    //       </div>
    //     </div>
    //     <button onClick={handleLogin} className="btn md:w-1/2 w-full mx-auto  btn-outline btn-accent mt-8">LOGIN</button>
    //     <Link className='text-center underline' to={'/signup'}>Don't have an account? Register Now!</Link>
    //   </form>
    // </div>

    <div>
      <h1>Screen Recorder</h1>
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      {recordedVideoURL && (
        <div>
          <h2 style={{color:'white'}}>Recorded Video:</h2>
          <video
            src={recordedVideoURL}
            controls
            autoPlay
            style={{ width: "100%", marginTop: "20px" }}
          ></video>
        </div>
      )}
    </div>
  )
}

export default LoginForm