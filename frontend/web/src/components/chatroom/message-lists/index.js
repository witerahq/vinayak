// src/components/ChatBox.js

import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    IconButton,
    TextField,
    Box, InputAdornment
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import './index.scss';

const ChatBox = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const userName = "John Doe";

    const messages = [
        {
            sender: 'user',
            content: 'Hi, how are you?'
        },
        {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        },
        {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        },
        {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        },
        {
            sender: 'user',
            content: 'I\'m doing well, thanks!'
        },
        {
            sender: 'otherUser',
            content: 'Glad to hear that. Do you have any plans for the weekend?',
            isOwn: true,

        },
        {
            sender: 'user',
            content: 'Hi, how are you?'
        },
        {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        },
        {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        },
        {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        }, {
            sender: 'otherUser',
            content: 'I\'m good. How about you?',
            isOwn: true,
        },
        {
            sender: 'user',
            content: 'I\'m doing well, thanks!'
        },
        {
            sender: 'otherUser',
            content: 'Glad to hear that. Do you have any plans for the weekend?',
            isOwn: true,

        }
    ];

    return (
        <div className="Chatlist">
                <div className="chat-box">
                    <CardHeader
                        className="header-action"
                        title={<div style={{ textAlign: 'left' }}>{userName}</div>}
                    // action={
                    //     <>
                    //         <IconButton>
                    //             <SettingsIcon />
                    //         </IconButton>
                    //         <IconButton>
                    //             <CloseIcon />
                    //         </IconButton>
                    //     </>
                    // }
                    />

                    <Box className="message-area">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.isOwn ? 'own' : 'other'}`}>
                                <div className="bubble">
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </Box>

                    <Box className="input-box">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={inputValue}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <MicIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </div>
        </div>
    );
};

export default ChatBox;
