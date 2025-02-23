# 📚 Restaurant Backend Project

## 📖 Description
This backend project is designed for a restaurant management system, utilizing a RESTful API and a MySQL database. The backend is handled by the **Golden Boys** team, while the frontend will be managed by an external company. This modular approach ensures smooth scaling and easy maintenance.

**Features:**
- User authentication using **JWT** for secure access control.
- **Order management** with real-time updates for kitchen and customer interaction.
- **Menu management** with CRUD operations for dishes, daily menus, and specials.
- **Payment processing integration** (can be expanded in the future).
- Built with **Sequelize ORM** for interaction with the MySQL database.

## 🚧 Project Status
**Current Status**: In development. New features are being added regularly. Keep an eye on the repository for updates.

## 🛠️ Technologies
- **VS Code**: IDE for development.
- **JavaScript**: Core programming language.
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Framework for building RESTful APIs.
- **Sequelize**: ORM for MySQL database interaction.
- **MySQL**: Relational database for storing restaurant data.
- **Postman/Thunder Client**: Tools for testing and debugging APIs.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt**: For password hashing.

## 📜 License
This project is licensed under the **MIT License**.

## 🤝 Contributing
Contributions are welcome! If you’d like to contribute, please feel free to fork the repository and submit a pull request.

## 🛠️ Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/restaurant-backend.git
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:
 ```bash
    1.For Development:
    ```bash
    PORT=8080
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=restaurant_db
    DATABASE_DIALECT=mysql
    ```
    2.For Test:
    ```bash
    PORT=8080
    DATABASE_USER_TEST=root
    DATABASE_PASSWORD_TEST=null
    DATABASE_NAME_TEST=database_test
    DATABASE_HOST_TEST=127.0.0.1
    DATABASE_DIALECT_TEST=mysql
    ```
    3.For Production:
    ```bash
    PORT=8080
    DATABASE_USER_PROD=root
    DATABASE_PASSWORD_PROD=null
    DATABASE_NAME_PROD=database_production
    DATABASE_HOST_PROD=127.0.0.1
    DATABASE_DIALECT_PROD=mysql
    ```
```
5. Run migrations to set up the database:

    ```bash
    npx sequelize-cli db:migrate
    ```
6. Run seeders to populate the database with test data:

    ```bash
    npx sequelize-cli db:seed:all
    ```

7. Start the server:

    ```bash
    npm run start
    ```

    The backend will be available at [http://localhost:8080](http://localhost:8080).

## 📂 Project Structure

```bash
Restaurant-Backend/  
├── node_modules/          # Node.js modules (auto-generated)
├── config/                # Configuration files
├── controllers/           # Controller files for handling business logic
├── migrations/            # Database migration files
├── models/                # Sequelize models
├── routes/                # API route definitions
├── middlewares/           # Middleware for validation and authentication
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata and dependencies
└── server.js              # Main file to initialize the server
```

## ✨ Conclusion

I hope this project helps you learn how to build a robust backend system for restaurant management. If you find any issues or have suggestions for improvements, feel free to submit a pull request. 
