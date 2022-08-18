import poststyles from './Post.module.css';

const Post = (props) => {

    return (
        <div className={poststyles.item}>
            <img
                src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                alt=""/>
            {props.message}
            <div className={poststyles.buttonLine}>
                <button className={poststyles.likeButton}><i className="glyphicon glyphicon-heart"></i> Like {props.likesCount}</button>
            </div>

        </div>
    )
}

export default Post;
