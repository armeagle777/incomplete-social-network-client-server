const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const NEW_MESSAGE_TEXT = 'NEW-MESSAGE-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';

let store = {
    _state: {
        dialogs: {
            allDialogs: [
                {id: 1, name: 'Dimich'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Karina'},
                {id: 4, name: 'Marine'},
                {id: 5, name: 'Kara'},
                {id: 6, name: 'Nare'},
                {id: 7, name: 'Tanya'},
                {id: 8, name: 'Sona'},
            ],
            allMessages: [
                {id: 1, message: 'HI', sent: true},
                {id: 2, message: 'How is Your it-camasutra?', sent: false},
                {id: 3, message: 'yooo', sent: true},
                {id: 4, message: 'Hello my dear friend', sent: false},
            ],
            newMessageText: ''
        },
        profile: {
            allPosts: [
                {id: 1, post: 'Hello world', likesCount: 12},
                {id: 2, post: 'How are You hi hi', likesCount: 5},
                {id: 3, post: 'I miss You', likesCount: 7}
            ],
            newPostText: '',
        }

    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },

    _rerenderEntireTree() {
        console.log('State has been changed');
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost = {
                id: 5,
                post: this._state.profile.newPostText,
                likesCount: 0
            };
            this._state.profile.allPosts.push(newPost);
            this._state.profile.newPostText = '';
            this._rerenderEntireTree(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profile.newPostText = action.text;
            this._rerenderEntireTree(this._state);
        } else if (action.type === NEW_MESSAGE_TEXT) {
            console.log(this._state.dialogs.newMessageText);
            this._state.dialogs.newMessageText = action.message;
            this._rerenderEntireTree(this._state);
        } else if (action.type === ADD_MESSAGE) {
            const newMessage = {
                id: this._state.dialogs.allMessages.length + 1,
                message: this._state.dialogs.newMessageText,
                sent: true
            };
            this._state.dialogs.allMessages.push(newMessage);
            console.log(this._state.dialogs.allMessages);
            this._state.dialogs.newMessageText = '';
            this._rerenderEntireTree(this._state);
        }
    }
}


export const addPostActionCreater = () => ({type: ADD_POST})
export const updateNewPostTextActionCreater = (newText) => ({type: UPDATE_NEW_POST_TEXT, text: newText})
export const addMessageActionCreater = () => ({type: ADD_MESSAGE})
export const updateMessageTextCreater = (newMessage) => ({type: NEW_MESSAGE_TEXT, message: newMessage})


export default store;


window.store = store;
