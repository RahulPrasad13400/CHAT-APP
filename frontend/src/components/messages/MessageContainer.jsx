import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti"  

export default function MessageContainer() {
  // const noChatSelected = true
  const { selectedConversation, setSelectedConversation } = useConversation() 
  useEffect(function(){
    // clean up function when component unmounts 
    return () => setSelectedConversation(null)
  },[setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {/* {noChatSelected ? ( */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : ( <>
              <div className="bg-slate-500 px-4 py-2 mb-2">
                <span className="label-text">To : </span>
                <span className="text-gray-900 font-bold">{selectedConversation.username}</span>
              </div>
              <Messages />  
              <MessageInput />   
            </>  
      )}
    </div>
  )
}

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 Rahul ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>  
	);
};
