Secure Notes App Backend
This is the backend service for the Secure Notes App, built with NestJS and PostgreSQL. It handles user authentication, note management, search, and categorization. The backend is designed for scalability and efficiency, ensuring seamless note organization and retrieval.

Technologies Used
NestJS – A progressive Node.js framework for building efficient backend services.
TypeORM – An ORM for handling database interactions with PostgreSQL.
PostgreSQL – A powerful, open-source relational database.
JWT (JSON Web Token) – Used for authentication and authorization.
Axios – Used for making API requests.
Railway – A cloud platform for seamless backend deployment.
Project Structure


backend/
│── src/
│   ├── auth/            # Authentication module (login, JWT)
│   ├── notes/           # Note-related routes (CRUD, search, categorization)
│   ├── user/            # User-related routes (signup, profile)
│   ├── main.ts          # Entry point of the application
│── .env                 # Environment variables (DB connection, JWT secret)
│── package.json         # Project dependencies and scripts
│── README.md            # Project documentation


Setup and Installation

1. Clone the repository
git clone https://github.com/your-username/secure-notes-backend.git
cd secure-notes-backend

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the root directory and configure the following:
  env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_jwt_secret

4. Run database migrations
npm run typeorm migration:run

5. Start the application
npm run start


Deployment on Railway

.Push your code to a GitHub repository.
.Go to Railway.app and create a new project.
.Connect your GitHub repository and deploy the service.
.Add environment variables (DATABASE_URL, JWT_SECRET) in Railway’s settings.
.Railway will automatically build and deploy your NestJS app.


API Endpoints

Auth Routes
POST /auth/login – User login

User Routes
POST /user/signup – User registration
GET /user/profile – Retrieve user profile (Requires JWT authentication)

Notes Routes
POST /notes/create – Create a new note
GET /notes – Retrieve all notes
GET /notes/:id – Retrieve a specific note
PUT /notes/:id – Update a note
DELETE /notes/:id – Delete a note
GET /notes/search?q=keyword – Search notes by keyword
GET /notes/category/:category – Filter notes by category

License
Copyright (c) 2025 Gomobile, Morocco, Casablanca All rights reserved.
This software and its source code (the "Software") are the exclusive property of Gomobile, Morocco, Casablanca. No part of this Software, in whole or in part, may be used, reproduced, disclosed, modified, or distributed without the prior written permission of Gomobile.
THE SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT, ARE DISCLAIMED TO THE FULLEST EXTENT PERMITTED BY LAW. IN NO EVENT SHALL GOMOBILE OR ITS AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES.
Unauthorized use of this Software, including but not limited to attempts to disassemble, decompile, or reverse engineer, is strictly prohibited. For any inquiries regarding this license, please contact Gomobile, Morocco, Casablanca.
