import dialogsStyles from "../dialogs.module.css";
import React from "react";

const SentMessage = (props) => {
    return (
        <div className={dialogsStyles.sent}>
            <p>{props.messageText}</p>
        </div>

    );
}
export default SentMessage;
