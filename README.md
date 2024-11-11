# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## How to install

1.  Clone this repository
```
git clone https://github.com/Yana-Dyachok/nodejs2024Q3-service
```
2.  Move to the cloned repository
```
cd nodejs2024Q3-service
```
3.  Switch the branch to `develop`
```
git checkout develop
```
4.  Installing NPM modules
```
npm install --legacy-peer-deps
```
5. Create .env file (based on .env.example): ./.env
6.  Running application
```
npm start
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Run commands for testing

| Command                     | instructions                            |
| --------------------------- | --------------------------------------- |
| `npm run lint`      | Check files                   |
| `npm run format`    | Fix and formats files                |
| `npm run test`         | To run all tests without authorization |
| `npm run test -- <path to suite>`       | To run only one of all test suites         |
| `npm run test:auth` | To run all test with authorization|
| `npm run test:auth -- <path to suite>` | To run only specific test suite with authorization|

## API
Available endpoints:

<details> 
<summary>Users (/user route):
</summary>

- `GET /user` - to get all users
- `GET /user/:id` - get single user by id (uuid)
- `POST /user` - create new user 
- `PUT /user/:id` - update user's password
- `DELETE /user/:id` - delete user

</details>
<details> 
<summary>Artists (/artist route):
</summary>

- `GET /artist` - get all artists
- `GET /artist/:id` - get single artist by id
- `POST /artist` - create new artist
- `PUT /artist/:id` - update artist
- `DELETE /artist/:id` - delete artist
</details>
<details>
<summary>
Albums (/album route):
</summary>

- `GET /album` - get all albums
- `GET /album/:id` - get single album by id
- `POST /album` - create new album
- `PUT /album/:id` - update album
- `DELETE /album/:id` - delete album
</details>
<details>
<summary>Tracks (/track route):
</summary>

- `GET /track` - get all tracks
- `GET /track/:id` - get single track by id
- `POST /track` - create new track:
- `PUT /track/:id` - update track
- `DELETE /track/:id` - delete track

</details>
<details>
<summary>
Favorites  -   /favs:
</summary>

- `GET /favs` - get all favorites
- `POST /favs/artist/:id` - add artist to the favorites
- `DELETE /favs/artist/:id` - delete artist from favorites
- `POST /favs/album/:id` - add album to the favorites
- `DELETE /favs/album/:id` - delete album from favorites
- `POST /favs/track/:id` - add track to the favorite
- `DELETE /favs/track/:id` - delete track from favorites

</details>

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
