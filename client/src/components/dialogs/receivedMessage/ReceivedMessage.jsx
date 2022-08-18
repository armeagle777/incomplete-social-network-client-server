import React from 'react';
import dialogsStyles from "../dialogs.module.css";

const ReceivedMessage = (props)=> {
    return (
        <div className={dialogsStyles.received}>
            <p>{props.messageText}</p>
        </div>
    );
}

export default ReceivedMessage;
