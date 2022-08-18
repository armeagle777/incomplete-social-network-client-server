import React, {Component} from 'react';
import mypoststyles from './myPosts.module.css';
import Post from "./post/Post";
import {addPostActionCreater, updateNewPostTextActionCreater} from "../../../redux/state";

class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.newPostElement = React.createRef();
    }

    addPostHandler = () => {
        this.props.dispatch(addPostActionCreater());
    }
    postChangeHandler = () => {
        let newText = this.newPostElement.current.value;
        this.props.dispatch(updateNewPostTextActionCreater(newText));
    }

    render() {
        const postTags = this.props.allPosts.allPosts.reverse()
            .map((singlePost, index) => < Post key={index}
                                                       message={singlePost.post}
                                                       likesCount={singlePost.likesCount}
                                                    />
            );

        return (
            <div className={mypoststyles.myPosts}>
                <div className={mypoststyles.postsContainer}>
                    <textarea ref={this.newPostElement} rows="1" placeholder="What's on Your mind ?..."
                              value={this.props.allPosts.newPostText} onChange={this.postChangeHandler}/>
                    <div>
                        <button
                            onClick={this.addPostHandler}
                            className={mypoststyles.postAddButton}>Add Post
                        </button>
                    </div>
                </div>
                <div className={mypoststyles.allPostContainer}>
                    <h3>My Posts</h3>
                    {postTags}
                </div>
            </div>
        )
    }
}

export default MyPosts;
