import React, {Component} from 'react';
import dialogsStyles from './dialogs.module.css';
import DialogItem from "./dialogItem/DialogItem";
import SentMessage from "./sentMessage/SentMessage";
import {addMessageActionCreater, updateMessageTextCreater} from "../../redux/state";
import ReceivedMessage from "./receivedMessage/ReceivedMessage";

class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.newMessage = React.createRef();
    }

    addMessageHandler = () => {
        this.props.dispatch(addMessageActionCreater());
    }
    messageTextChangeHandler = () => {
        const messageText = this.newMessage.current.value;
        this.props.dispatch(updateMessageTextCreater(messageText));
    }
    render() {
        const messages = this.props.dialogs.allMessages.map((message, index) => {
            return message.sent? <SentMessage key={index}  messageText={message.message}/> : <ReceivedMessage key={index}  messageText={message.message}/> ;
        } );
        const dialogs = this.props.dialogs.allDialogs.map((dialog, index) => <DialogItem key={index} id={dialog.id}
                                                                                         name={dialog.name}/>);
        return (
            <div className={dialogsStyles.dialogs}>
                <div className={dialogsStyles.dialogs_items}>
                    {dialogs}
                </div>
                <div className={dialogsStyles.messages}>
                    <div className={dialogsStyles.oldMessages}>
                        {messages}
                    </div>
                    <div className={dialogsStyles.newMessage}>
                        <input
                            type="text"
                            ref={this.newMessage}
                            placeholder="Enter new Message"
                            value={this.props.dialogs.newMessageText}
                            onChange={this.messageTextChangeHandler}
                        />
                        <button onClick={this.addMessageHandler} className={dialogsStyles.Sendbutton}>Send</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Dialogs;
