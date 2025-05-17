# Task Tracker Application

## A comprehensive task management application built with Node.js, Express, and PostgreSQL, containerized with Docker and automated with GitHub Actions.

## Overview
- Features
- Project Structure
- Technologies Used
- Setup and Installation
- Docker Configuration
- Multiple Environments
- Monitoring
- CI/CD Pipeline
- API Endpoints
- Screenshots
  
## Overview

This project implements a Task Tracker application that allows users to create, manage, and track tasks with different priorities and statuses. The application is containerized using Docker, with separate environments for development, staging, and production, and includes monitoring with Prometheus.

## Features

- Create, read, update, and delete tasks
- Assign priorities (low, medium, high) to tasks
- Track task status (pending, in-progress, completed)
- Responsive UI built with Bootstrap
- RESTful API for task operations
- Containerized with Docker and Docker Compose
- CI/CD pipeline with GitHub Actions
- Monitoring with Prometheus
- Multiple environment configurations (development, staging, production)
  
## Technologies Used

Backend: Node.js, Express
Database: PostgreSQL
Frontend: EJS templates, Bootstrap, jQuery
Containerization: Docker, Docker Compose
CI/CD: GitHub Actions
Monitoring: Prometheus
Version Control: Git, GitHub

## Setup and Installation
### Prerequisites

- Node.js (v14+)
- Docker and Docker Compose
- Git

## Local Setup

### Clone the repository:
bashgit clone https://github.com/OkoyeF/task-trackeer.git
cd task-trackeer

### Install dependencies:
bashnpm install

### Create .env file:
bashPORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=task_tracker
DB_PORT=5432

### Start the development environment with Docker Compose:
bashdocker-compose up -d

### Access the application at http://localhost:3000


## Docker Setup

### Prerequisites
- Docker and Docker Compose installed on your machine

### Building and Running the Application
1. Build and start the containers:
   
## CI/CD Pipeline

The CI/CD pipeline is implemented using GitHub Actions. The workflow is defined in .github/workflows/ci.yml