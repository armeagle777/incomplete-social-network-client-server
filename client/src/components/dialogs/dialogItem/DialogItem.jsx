import dialogStyles from "./dialogItem.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={dialogStyles.dialog + ' ' + dialogStyles.active}>
            <NavLink to={`/dialogs/${props.id}`}>
                <div className={dialogStyles.dialogPhoto}>
                    <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt=""/>
                </div>
                <div className={dialogStyles.dialogPerson}>
                    {props.name}
                </div>
                <div className={dialogStyles.dialogInfo}>
                    <span>1:55PM</span><br />
                    <span className={dialogStyles.newMessage}>1</span>
                </div>
            </NavLink>
        </div>
    );
}

export default DialogItem;
