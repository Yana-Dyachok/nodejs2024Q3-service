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
5.  Running application
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

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
