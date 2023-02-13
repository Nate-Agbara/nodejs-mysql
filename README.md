# Table of Contents

- [Table of Contents](#table-of-contents)
- [Motivation](#motivation)
- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)

# Motivation

The idea is to have a production-grade playground where I implement learnings/features that a production application should have in node.js. Other developers can also reference this for usage.

# About The Project

The project is a simple CRUD api written in node.js, using knex query builder on MySQL database. The project has a dockerfile for each of the service with the services defined in the docker-compose file. The project also has openapi swagger integration. A couple of shell scripts tied to the docker runs which are pretty straightforward to understand. It also make use of [winston logger](https://www.npmjs.com/package/winston) to make log agreggation easy for production scenarios. The project will provide a good foundational guide to developers looking to write production-grade applications in node.js. For now, the project is just a basic CRUD but the implementions may change as time goes.

# Getting Started

- clone the project
- If you are not already farmiliar with node.js, I'd suggest you follow this [step-by-step guide on setting up a node project](https://nathanagbara.hashnode.dev/nodejs-application-setup-procedure)

## Prerequisites

To run the application, you need to have the following applications on your machine:

- A code editor of choice, e.g VSCode.
- Docker
- Any MySQL client, e.g MySQL workbench, heidiSQL, etc.

## Installation

- Clone the project and open it in your code editor
- Open a terminal in the directory of the project
- Verify you have docker running, run the command `docker ps` to see if docker is running and the containers it has running
- Run `docker-compose up --build -d`. This command will build the services listed in the compose file
- Run `docker ps` to see the newly build services/container running. This should be mysql and wallet-app
- connect to the mysql with the MySQL client to see the database created and the migrations executed
- To watch the node.js app logs, open another terminal and run `docker logs -f <container-name>`
- Open http://localhost:3000/api-docs/#/ in your browser to access the api documentation

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
