import Chat from './chat';
import ChatBox from './message-lists';
import './index.scss';


function ChatRoom() {
    return (
        <div className="ChatRoom">
            <div className="container">
                <div className="chatroom-content">
                    <Chat></Chat>
                    <ChatBox></ChatBox>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;