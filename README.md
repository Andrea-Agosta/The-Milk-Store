# The Milk Store

Welcome to The Milk Store, a simple app that allows users to view different types of milks and place orders for their desired products. built with React, Tailwind CSS, and TypeScript.

## Features
- View a list of available milk products
- Select a desired milk product
- Search the desired milk product
- filter the list of milk
- Place an order

## Technologies

Frontend: 
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Router Dom](https://reactrouter.com/en/main) for routing
- [Tailwind](https://tailwindui.com/) for styling

Beckend:
  - [Node.js](https://nodejs.org/en/)
  - [express](https://expressjs.com/)
  - [Typescript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Docker](https://www.docker.com/)

## Getting Started

To get started, you will need to clone the repository and install the dependencies.

```bash
$ git clone https://github.com/Andrea-Agosta/The-Milk-Store.git
$ cd The-Milk-Store
$ npm install
```
 Once the dependencies are installed, you can start the development server with the following command:

```bash
$ npm run server
```
This will start the development server at `http://localhost:8080/`.
After, open your docker app or download from [here](https://www.docker.com/).
When the Docker app is running open a new tab on your terminal and type:

```bash
$ npm run docker:init
```
When the build is finished, open another tab on your terminal and run:
```bash
 $ npm run mongo:init
```
This command fill up your mongo database with data. Now run:

```bash
$ cd client
$ npm install
```
 And now you can start the client server with the following command:

```bash
$ npm start
```

This will start the React and open the application in your default browser at `http://localhost:3000/`.
