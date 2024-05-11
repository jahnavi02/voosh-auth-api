# voosh-auth-api

Authentication API for Voosh-assignment

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables.
4. Start the server using `npm run dev`.

### Setting up Environment Variables

1. Create a `.env` file in the root directory of the project.
```
PORT=3000
MONGODB_URI=your_mongo_uri_here
JWT_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID = your_google_client_id_here
GOOGLE_CLIENT_SECRET = your_google_client_secret_here
```
2. Add the following environment variables to the `.env` file:

3. Replace `your_mongo_uri_here` with your actual MongoDB URI. This URI should include the necessary credentials for connecting to your MongoDB database.

4. Replace `your_google_client_id_here` and `your_google_client_secret_here` with actual Google client ID and client secret that is obtained from the project on Google Cloud Platform Console

4. Save the `.env` file.

5. Now, when you run the project locally, it will automatically read these environment variables from the `.env` file.



## Usage

### Endpoints

- POST `/api/auth/register`: Register a new user.
- POST `/api/auth/login`: Login user.
- POST `/api/auth/signout`: Logout user.
- GET `/api/profile/`: Get user profile.
- PUT `/api/profile/update-details`: Update user profile.
- POST `/api/profile/upload-photo`: Upload photos. //this requires storage account, so created template for it
- PUT `/api/profile/set-visibility`: Change visibility of profile
- GET `/api/profile/details-for-admin`: View all user profiles(public and private) - admin user
- GET `/api/profile/public-profiles`: View only public profiles - normal user

### Authentication

To authenticate, obtain a JWT token by sending a POST request to `/api/auth/login` with valid credentials. Include the token in the Authorization header for protected endpoints.

### Testing

You can test the API using Swagger UI or Postman.

#### Swagger UI

Swagger UI provides an interactive documentation for testing the API endpoints. Follow these steps to run Swagger UI:

1. Start the server using `npm run dev`.
2. Navigate to the Swagger UI endpoint (e.g., `http://localhost:3000/api-docs`).
3. Input your authorization token and explore the available endpoints.

## Error Handling

Errors are handled gracefully, and appropriate status codes and error messages are returned to the client.

## Security

The API uses JWT tokens for authentication and authorization. 

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch.
3. Make your changes and push them to your fork.
4. Submit a pull request.

## Credits

- Swagger for API documentation.
- Express for the web framework.


## License

This project is licensed under the MIT License.

