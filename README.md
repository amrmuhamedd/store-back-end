# store REST API Documentation

## Introduction

Welcome to the store REST API documentation. This API allows users to register, log in, list orders and intgrate with kashier apis.

![image](https://github.com/user-attachments/assets/cea0dc8f-0488-47be-b148-051e7ae92357)

## Tech Stack

The Blog REST API is built using the following technologies:

- **Node.js**: The server-side environment for running JavaScript.
- **Express.js**: A fast and minimalist web framework for Node.js.
- **MongoDB**: nosql database.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Swagger**: For API documentation.

### Project Structure

The project is organized into the following components:

- **Controllers**: Responsible for handling HTTP requests and responses.
- **Routes**: Define the API endpoints and connect them to controller functions.
- **Middleware**: Contains custom middleware functions, such as authentication.
- **Environment Variables**: Utilizes a `.env` file for sensitive configuration.
- **Swagger Configuration**: For auto-generating API documentation.

## Getting Started

Follow these instructions to run the project locally using Node js:

1. Clone the project repository to your local machine:

   ```bash
   git clone <repository_url>
   cd <project_directory>

   ```

1. Create a .env file in the project root and configure the following environment variables:

```bash
DATABASE_URL= mongo db server url
SECRET_KEY= put strong secret key
KASHIER_PAYMENTAPIKEY= get api from kashier.io
KASHIER_MID = get MID from kashier.io
KASHIER_SECERT = get secret from kashier.io
```

2. install debndaceis

```bash
yarn install
```

3. Run database migrations:

```bash
yarn migrate
```

4. Start the development server:

```bash
yarn dev
```

Now you can see your API docs at: `http://localhost:5000/api-docs/#/`

## live preview

you can see the live preview [here](https://store-back-end-silk.vercel.app/api-docs) . Please note that the initial launch of the documentation may be a bit slow as it is hosted on a free hosting plan.

## Front end

repo : https://github.com/amrmuhamedd/store-front-end
live preview: https://store-front-end-rouge.vercel.app/

## At the end

Please refer to the Swagger documentation for detailed information on each endpoint and how to use them.

If you have any questions or encounter issues, feel free to reach out for assistance. Happy coding!
