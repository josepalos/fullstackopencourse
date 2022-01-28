Bloglist app
============

Parts: 4, 5, 7


- Exercises done:
    - 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 4.13, 4.14, 4.15, 4.16, 4.20, 4.21, 4.22
    - 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15, 5.16, 5.17, 5.18, 5.19, 5.20, 5.21, 5.22
    - 7.9, 7.10, 7.11, 7.12, 7.13, 7.14
- Missing exercises:
    - 4.17: Missing tests
    - 4.18: Missing tests
    - 4.19: Missing tests for posts with no token
    - 7.15, 7.16, 7.17, 7.18, 7.19, 7.20


## Run the app (requires mongodb)
To start the backend use
```
$ cd bloglist/backend
$ npm start
```

To start the frontend use
```
$ cd bloglist/frontend
$ npm start
```

### Environment variables (backend)
- PORT: Port that the backend will listen on (defaults to 3003)
- MONGODB_URI: Uri to connect with the Mongo database (defaults to "mongodb://127.0.0.1/bloglist")
- SECRET: token for JWT