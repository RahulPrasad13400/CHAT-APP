import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";

export default function Messages() {
  const { messages, loading } = useGetMessages()
  const lastMessageRef = useRef()

  useEffect(function(){
    setTimeout(()=>{
      lastMessageRef.current.scrollIntoView({behaviour : 'smooth'})
    },100)
  },[messages])
  
  return ( 
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a Conversation</p>
      )}
      {!loading && messages.length > 0 && messages.map((message)=>{
        return <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      })}
    </div>
  )
}
