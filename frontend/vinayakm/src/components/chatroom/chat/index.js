// src/components/Messages.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Divider, Badge } from '@mui/material';
import './index.scss';

const Chat = () => {
    const messages = [
        {
            id: 1,
            avatar: 'https://example.com/image1.jpg',
            name: 'John Doe',
            messageCount: 5,
            lastMessage: 'Hey, are you available tomorrow?'
        },
        {
            id: 2,
            avatar: 'https://example.com/image2.jpg',
            name: 'Jane Smith',
            messageCount: 2,
            lastMessage: 'I received the files, thanks!'
        }
    ];
    return (
        <div className="Chat">
                <Card style={{ width: '100%' }} className='message-list'>
                    <CardContent>
                        <Typography variant="h3" gutterBottom >
                            Messages
                        </Typography>
                        <Divider style={{ marginBottom: '0.5em'}}></Divider>
                        {messages.map((message, index) => (
                            <div key={message.id}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }} className='chat-user'>
                                    {/* Avatar */}
                                    <div style={{ flex: '0 10%', marginRight: '1rem' }}  >
                                        <Avatar src={message.avatar} />
                                    </div>

                                    {/* Message Info */}
                                    <div style={{ flex: '1 90%' }}>
                                        <Typography variant="h6" >{message.name}</Typography>

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">
                                                {message.lastMessage.length > 50 ? message.lastMessage.substr(0, 47) + '...' : message.lastMessage}
                                            </Typography>
                                            <Badge badgeContent={message.messageCount} color="primary" />
                                        </div>
                                    </div>
                                </div>
                                {index !== messages.length - 1 && <Divider style={{ marginBottom: '1em' }} />}
                            </div>
                        ))}
                    </CardContent>
                </Card>
        </div>
    );
}

export default Chat;
