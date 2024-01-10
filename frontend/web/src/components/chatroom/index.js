import Chat from './chat';
import ChatBox from './message-lists';
import './index.scss';
import { useSearchParams } from 'react-router-dom';


function ChatRoom() {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className="ChatRoom">
            <div className="container">
                <div className="chatroom-content">
                    {
                        window.innerWidth>992?
                        <>     
                        <Chat></Chat>
                        <ChatBox></ChatBox>
                        </>:
                        
                            !searchParams.get('user')?.length?
                            <Chat></Chat>:<ChatBox></ChatBox>
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;