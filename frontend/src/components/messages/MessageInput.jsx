import { BsSend } from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage"
import { useState } from "react"

export default function MessageInput() {
  const [message, setMessage] = useState("")

  const {sendMessage, loading} = useSendMessage()

  async function handleSubmit(e){
    e.preventDefault()
    if(!message) return
    await sendMessage(message)
    setMessage("")
  }
  
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative"> 
        <input type="text" className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
          placeholder="send a message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)} />
        <button disabled={loading} type='submit' className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
        </button>
      </div>  
    </form>
  )
}



