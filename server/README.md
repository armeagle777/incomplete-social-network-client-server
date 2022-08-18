for running server run commands-
 - cd backend
 - npm run dev

available urls -
    - for registration   - localhost:8000/api/auth/registration
           POST   body       -  {
                                       username: String | required,
                                       password: String | minLength:4, maxLength:10 | required,
                                  }

           response body      -  {
                                          _id,followers, followings, username, token
                                 }
    - for login          -  localhost:8000/api/auth/login
            GET     body       -  {
                                       username, password
                                   }

            response body      -  {
                                      _id,followers, followings, username, token
                                  }
    - for creating post  -  localhost:8000/api/posts
           POST    headers    - {
                                    authorization: "Bearer <token of user>"
                                 }
           POST    body        -  {
                                        owner: String | required,
                                        content_title: String | required,
                                        content_description: String | required,
                                        content_image_url: String | required
                                   }    
    - for updating post  -  localhost:8000/api/posts/:postId
           PATCH    headers    - {
                                    authorization: "Bearer <token of user>"
                                 }
           PATCH    body        -  {
                                        content_title: String | required,
                                        content_description: String | required,
                                        content_image_url: String | required
                                    }    
    - for liking AND unliking post  -  localhost:8000/api/posts/:postId/like
           PATCH    headers    - {
                                    authorization: "Bearer <token of user>"
                                 }

    - for getting user's all posts -  localhost:8000/api/posts?_page=<pagenumber>&_limit=<limitcount>
              GET   headers    - {
                                    authorization: "Bearer <token of user>"
                                 }

    - for getting user's timeline posts-localhost:8000/api/posts/timeline?_page=<pagenumber>&_limit=<limitcount>
              GET   headers    - {
                                    authorization: "Bearer <token of user>"
                                 }

    - for getting single post  -  localhost:8000/api/posts/:postId
              GET   headers    - {
                                    authorization: "Bearer <token of user>"
                                 }

    - for following user  -  localhost:8000/api/user/:id/follow
              PATCH   headers  - {
                                    authorization: "Bearer <token of user>"
                                }
    - for unfollowing user  -  localhost:8000/api/user/:id/unfollow
              PATCH   headers  - {
                                    authorization: "Bearer <token of user>"
                                }
    - for updating  user   -  localhost:8000/api/user/:id
              PUT body - {any data, shuld be updated}
              PUT    headers  - {
                                    authorization: "Bearer <token of user>"
                                }
    - for deleting  user (only admin)   -  localhost:8000/api/user/:id
              DELETE    headers  - {
                                    authorization: "Bearer <token of user>"
                                }
    - for getting a single user -  localhost:8000/api/user/:id
              GET   headers    - {
                                    authorization: "Bearer <token of user>"
                                 }
    - for getting all users(only for role ADMIN)-  localhost:8000/api/user
              GET   headers    - {
                                    authorization: "Bearer <token of user>"
                                 }
    - for getting picture -  localhost:8000/api/files/:imageName
    - for uploading an image -  localhost:8000/api/upload
              POST   headers    - {
                                    authorization: "Bearer <token of user>"
                                 }
              POST   body    - {
                                    inputName:'file',
                                 }
