# NoteWave App

NoteWave is a web application for creating, editing, and managing notes.

## Prerequisites

Before running the app, ensure you have the following tools and runtimes installed:

- [Node.js](https://nodejs.org/en/) (Version ^18.13.0 or >=20.9.0)
- [npm](https://www.npmjs.com/) (Version ^6.11.0 or ^7.5.6 or >=8.0.0)
- [Yarn](https://yarnpkg.com/) (Version >= 1.13.0)
- [Docker](https://www.docker.com/) (for running Docker Compose)

Additionally, you'll need a database visualizer tool like:

- [MySQL Workbench](https://www.mysql.com/products/workbench/) 
- [DBeaver](https://dbeaver.io/)

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/awesome-app.git
```

2. Navigate into the cloned directory:

```bash
cd notewave-app
```
3. Install dependencies using npm or yarn:
```bash
npm install
```
```bash
yarn install
```
Execute the .sh script to build and run the app:
```bash
chmod +x run.sh
./run.sh
```
This script will handle building the Docker images and starting the containers for you. It will also automatically stop and remove the containers when terminated.


Alternatively, if you prefer to run Docker Compose directly:

```bash
docker-compose up --build
```
```bash
docker-compose up -d
```
Once the app is up and running, you can access it at [http://localhost:8080/](http://localhost:8080/)


## Additional Notes

- **Please do not modify the `.env` file** as it contains sensitive configuration information required for the app to connect to the database and function properly.

## Video Demo
