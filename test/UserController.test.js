require('dotenv').config(); // Load env variables like JWT_SECRET for login tests
const UserController = require('../controllers/UserController');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mocking dependencies to avoid real DB calls and crypto operations
jest.mock('../models'); // Mocking the User model so we don't hit the actual database
jest.mock('bcryptjs'); // Mocking bcrypt to simulate password hashing without real computation
jest.mock('jsonwebtoken'); // Mocking JWT to simulate token generation

describe('UserController', () => {
  // Clear all mocks before each test to ensure isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Tests for createUser - registering a new user
  describe('createUser', () => {
    it('should successfully create a user', async () => {
      // Arrange - Setting up the request as if it's coming from a client
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          DateBirth: '1967-08-11',
          Email: 'joe@rogan.com',
          Phone: '123456789',
          Role: 'Owner',
          HireDate: '2023-01-01',
        },
      };
      const res = { 
        status: jest.fn().mockReturnThis(), // Mock status to allow chaining with json
        json: jest.fn() // Mock json to check what gets sent back
      };
      User.findOne = jest.fn().mockResolvedValue(null); // No existing email or username
      User.create = jest.fn().mockResolvedValue({
        UserId: 1,
        ...req.body,
        Password: 'hashedPassword', // Simulate the hook hashing the password
      });

      // Act - Call the method to see what happens
      await UserController.createUser(req, res);

      // Assert - Check if everything worked as expected
      expect(res.status).toHaveBeenCalledWith(201); // Should return 201 for creation
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: { UserId: 1, ...req.body, Password: 'hashedPassword' },
      });
    });

    it('should return 400 if required fields are missing', async () => {
      // Arrange - Missing fields in the request
      const req = { body: { FirstName: 'Joe' } }; // Only FirstName, others missing
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act - Try to create user with incomplete data
      await UserController.createUser(req, res);

      // Assert - Expect 400 for bad request
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All required fields must be provided' });
    });

    it('should return 400 if email already exists', async () => {
      // Arrange - Email already exists in the database
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          DateBirth: '1967-08-11',
          Email: 'joe@rogan.com',
          Phone: '123456789',
          Role: 'Owner',
          HireDate: '2023-01-01',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest.fn().mockResolvedValue({ UserId: 2 }); // Email exists

      // Act - Try to create user with existing email
      await UserController.createUser(req, res);

      // Assert - Expect 400 for email already in use
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email is already in use' });
    });

    it('should return 400 if username is already taken', async () => {
      // Arrange - Username already exists
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          DateBirth: '1967-08-11',
          Email: 'joe@rogan.com',
          Phone: '123456789',
          Role: 'Owner',
          HireDate: '2023-01-01',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest
        .fn()
        .mockResolvedValueOnce(null) // Email does not exist
        .mockResolvedValueOnce({ UserId: 2 }); // Username exists

      // Act - Try to create user with taken username
      await UserController.createUser(req, res);

      // Assert - Expect 400 for username already taken
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username is already taken' });
    });

    it('should return 500 if a server error occurs', async () => {
      // Arrange - Simulate a server error
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          DateBirth: '1967-08-11',
          Email: 'joe@rogan.com',
          Phone: '123456789',
          Role: 'Owner',
          HireDate: '2023-01-01',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest.fn().mockRejectedValue(new Error('Database error')); // Simulate DB error

      // Act - Try to create user with DB error
      await UserController.createUser(req, res);

      // Assert - Expect 500 for server error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for loginUser - logging in a user
  describe('loginUser', () => {
    it('should successfully log in a user and return a token', async () => {
      // Arrange - Set up for successful login
      process.env.JWT_SECRET = 'secret'; // Mock JWT secret for token generation
      const req = { body: { UserName: 'joe.rogan', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest.fn().mockResolvedValue({
        UserId: 1,
        UserName: 'joe.rogan',
        Password: 'hashedPassword',
        Role: 'Admin',
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true); // Password matches
      jwt.sign = jest.fn().mockReturnValue('mockToken'); // Simulate token creation

      // Act - Call loginUser
      await UserController.loginUser(req, res);

      // Assert - Check for 200 and token
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: 'mockToken' });
    });

    it('should return 400 if username or password is missing', async () => {
      // Arrange - Missing password
      const req = { body: { UserName: 'joe.rogan' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act - Try to login without password
      await UserController.loginUser(req, res);

      // Assert - Expect 400 for missing fields
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
    });

    it('should return 401 if credentials are invalid', async () => {
      // Arrange - Invalid password
      const req = { body: { UserName: 'joe.rogan', Password: 'wrong' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest.fn().mockResolvedValue({
        UserId: 1,
        Password: 'hashedPassword',
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false); // Password doesn't match

      // Act - Try to login with wrong password
      await UserController.loginUser(req, res);

      // Assert - Expect 401 for invalid credentials
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 500 if a server error occurs', async () => {
      // Arrange - Simulate DB error
      const req = { body: { UserName: 'joe.rogan', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act - Try to login with DB error
      await UserController.loginUser(req, res);

      // Assert - Expect 500 for server error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for logoutUser - logging out a user
  describe('logoutUser', () => {
    it('should return a successful logout message', async () => {
      // Arrange - No need for req body since it's client-side
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act - Call logoutUser
      await UserController.logoutUser(req, res);

      // Assert - Check for 200 and message
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User logged out successfully - please remove token on client side',
      });
    });
  });

  // Tests for getAllUsers - fetching all users
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Arrange - Mock DB to return a list of users
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findAll = jest.fn().mockResolvedValue([
        { UserId: 1, FirstName: 'Joe', LastName: 'Rogan', UserName: 'joe.rogan' },
      ]);

      // Act - Call getAllUsers
      await UserController.getAllUsers(req, res);

      // Assert - Check for 200 and list of users
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { UserId: 1, FirstName: 'Joe', LastName: 'Rogan', UserName: 'joe.rogan' },
      ]);
    });

    it('should return 500 if a server error occurs', async () => {
      // Arrange - Simulate DB error
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findAll = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act - Call getAllUsers with DB error
      await UserController.getAllUsers(req, res);

      // Assert - Expect 500 for server error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for getUserById - fetching a user by ID
  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      // Arrange - Mock DB to return a user
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findByPk = jest.fn().mockResolvedValue({
        UserId: 1,
        FirstName: 'Joe',
        LastName: 'Rogan',
      });

      // Act - Call getUserById
      await UserController.getUserById(req, res);

      // Assert - Check for 200 and user data
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        UserId: 1,
        FirstName: 'Joe',
        LastName: 'Rogan',
      });
    });

    it('should return 404 if user is not found', async () => {
      // Arrange - Mock DB to return null (user not found)
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findByPk = jest.fn().mockResolvedValue(null);

      // Act - Call getUserById with non-existing ID
      await UserController.getUserById(req, res);

      // Assert - Expect 404 for not found
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 if a server error occurs', async () => {
      // Arrange - Simulate DB error
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findByPk = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act - Call getUserById with DB error
      await UserController.getUserById(req, res);

      // Assert - Expect 500 for server error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for updateUser - updating a user
  describe('updateUser', () => {
    it('should successfully update a user', async () => {
      // Arrange - Mock DB to update and return updated user
      const req = {
        params: { id: 1 },
        body: { FirstName: 'Joseph' }, // Mala varijacija imena za zabavu
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.update = jest.fn().mockResolvedValue([1]); // 1 row updated
      User.findByPk = jest.fn().mockResolvedValue({
        UserId: 1,
        FirstName: 'Joseph',
        LastName: 'Rogan',
      });

      // Act - Call updateUser
      await UserController.updateUser(req, res);

      // Assert - Check for 200 and updated user
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        UserId: 1,
        FirstName: 'Joseph',
        LastName: 'Rogan',
      });
    });

    it('should return 404 if user is not found', async () => {
      // Arrange - Mock DB to simulate no rows updated
      const req = { params: { id: 1 }, body: { FirstName: 'Joseph' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.update = jest.fn().mockResolvedValue([0]); // No rows updated

      // Act - Call updateUser with non-existing ID
      await UserController.updateUser(req, res);

      // Assert - Expect 404 for not found
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 if a server error occurs', async () => {
      // Arrange - Simulate DB error during update
      const req = { params: { id: 1 }, body: { FirstName: 'Joseph' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.update = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act - Call updateUser with DB error
      await UserController.updateUser(req, res);

      // Assert - Expect 500 for server error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for deleteUser - deleting a user
  describe('deleteUser', () => {
    it('should successfully delete a user', async () => {
      // Arrange - Mock DB to simulate successful deletion
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      User.destroy = jest.fn().mockResolvedValue(1); // 1 row deleted

      // Act - Call deleteUser
      await UserController.deleteUser(req, res);

      // Assert - Check for 204 (no content)
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if user is not found', async () => {
      // Arrange - Mock DB to simulate no rows deleted
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.destroy = jest.fn().mockResolvedValue(0); // No rows deleted

      // Act - Call deleteUser with non-existing ID
      await UserController.deleteUser(req, res);

      // Assert - Expect 404 for not found
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 if a server error occurs', async () => {
      // Arrange - Simulate DB error during deletion
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.destroy = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act - Call deleteUser with DB error
      await UserController.deleteUser(req, res);

      // Assert - Expect 500 for server error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});