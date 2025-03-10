require('dotenv').config(); // Load environment variables (e.g., JWT_SECRET)
const CustomerController = require('../controllers/CustomerController');
const { Customer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock dependencies to isolate tests from real DB or external libs
jest.mock('../models'); // Mock the Customer model
jest.mock('bcryptjs'); // Mock bcrypt for password hashing
jest.mock('jsonwebtoken'); // Mock jsonwebtoken for token generation

describe('CustomerController', () => {
  // Reset mocks before each test to ensure clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Tests for createCustomer - Registering a new customer
  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      // Arrange: Simulate a valid request from a client
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          Phone: '123456789',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Allow chaining with json
        json: jest.fn(), // Capture response data
      };
      Customer.findOne = jest.fn().mockResolvedValue(null); // No duplicate username
      Customer.create = jest.fn().mockResolvedValue({
        CustomerId: 1,
        ...req.body,
        Password: 'hashedPassword', // Simulate hashed password from a hook
      });

      // Act: Call the createCustomer method
      await CustomerController.createCustomer(req, res);

      // Assert: Verify the response is correct
      expect(res.status).toHaveBeenCalledWith(201); // Created status
      expect(res.json).toHaveBeenCalledWith({
        CustomerId: 1,
        ...req.body,
        Password: 'hashedPassword',
      });
    });

    it('should return 400 if required fields are missing', async () => {
      // Arrange: Incomplete request body
      const req = { body: { FirstName: 'Joe' } }; // Missing required fields
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act: Attempt to create customer with missing data
      await CustomerController.createCustomer(req, res);

      // Assert: Check for bad request error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All required fields must be provided' });
    });

    it('should return 400 if username is already taken', async () => {
      // Arrange: Simulate username already in use
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          Phone: '123456789',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findOne = jest.fn().mockResolvedValue({ CustomerId: 2 }); // Username exists

      // Act: Attempt to create customer with taken username
      await CustomerController.createCustomer(req, res);

      // Assert: Verify username conflict error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username is already taken' });
    });

    it('should return 500 if there’s a server error', async () => {
      // Arrange: Simulate a database failure
      const req = {
        body: {
          FirstName: 'Joe',
          LastName: 'Rogan',
          UserName: 'joe.rogan',
          Password: 'password123',
          Phone: '123456789',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act: Attempt creation with a failing DB
      await CustomerController.createCustomer(req, res);

      // Assert: Check for server error response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for loginCustomer - Logging in a customer
  describe('loginCustomer', () => {
    it('should login a customer successfully and return a token', async () => {
      // Arrange: Set up for successful login
      process.env.JWT_SECRET = 'secret'; // Mock JWT secret
      const req = { body: { UserName: 'joe.rogan', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findOne = jest.fn().mockResolvedValue({
        CustomerId: 1,
        UserName: 'joe.rogan',
        Password: 'hashedPassword',
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true); // Password matches
      jwt.sign = jest.fn().mockReturnValue('mockToken'); // Mock token generation

      // Act: Attempt login
      await CustomerController.loginCustomer(req, res);

      // Assert: Verify successful login with token
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return 400 if username or password is missing', async () => {
      // Arrange: Incomplete login request
      const req = { body: { UserName: 'joe.rogan' } }; // Missing password
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act: Attempt login with missing data
      await CustomerController.loginCustomer(req, res);

      // Assert: Check for missing fields error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
    });

    it('should return 401 if credentials are invalid', async () => {
      // Arrange: Simulate wrong password
      const req = { body: { UserName: 'joe.rogan', Password: 'wrong' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findOne = jest.fn().mockResolvedValue({
        CustomerId: 1,
        Password: 'hashedPassword',
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false); // Password doesn’t match

      // Act: Attempt login with invalid credentials
      await CustomerController.loginCustomer(req, res);

      // Assert: Verify unauthorized error
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 500 if JWT secret is missing', async () => {
      // Arrange: No JWT secret available
      delete process.env.JWT_SECRET; // Simulate missing secret
      const req = { body: { UserName: 'joe.rogan', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findOne = jest.fn().mockResolvedValue({
        CustomerId: 1,
        Password: 'hashedPassword',
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      // Act: Attempt login without JWT secret
      await CustomerController.loginCustomer(req, res);

      // Assert: Check for server error due to missing secret
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'JWT secret key is missing' });
    });
  });

  // Tests for logoutCustomer - Logging out a customer
  describe('logoutCustomer', () => {
    it('should return logout message', async () => {
      // Arrange: No request body needed (client-side logout)
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act: Call logout
      await CustomerController.logoutCustomer(req, res);

      // Assert: Verify logout message
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Logout successful, please remove your JWT token from client storage',
      });
    });
  });

  // Tests for getAllCustomers - Fetching all customers
  describe('getAllCustomers', () => {
    it('should return all customers', async () => {
      // Arrange: Mock a list of customers
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findAll = jest.fn().mockResolvedValue([
        { CustomerId: 1, FirstName: 'Joe', LastName: 'Rogan', UserName: 'joe.rogan', Phone: '123456789' },
      ]);

      // Act: Fetch all customers
      await CustomerController.getAllCustomers(req, res);

      // Assert: Verify the list is returned
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { CustomerId: 1, FirstName: 'Joe', LastName: 'Rogan', UserName: 'joe.rogan', Phone: '123456789' },
      ]);
    });

    it('should return 500 if there’s a server error', async () => {
      // Arrange: Simulate a database error
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findAll = jest.fn().mockRejectedValue(new Error('Database error'));

      // Act: Attempt to fetch customers with DB error
      await CustomerController.getAllCustomers(req, res);

      // Assert: Check for server error response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  // Tests for getCustomerById - Fetching a customer by ID
  describe('getCustomerById', () => {
    it('should return a customer by ID', async () => {
      // Arrange: Mock a customer by ID
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findByPk = jest.fn().mockResolvedValue({
        CustomerId: 1,
        FirstName: 'Joe',
        LastName: 'Rogan',
      });

      // Act: Fetch customer by ID
      await CustomerController.getCustomerById(req, res);

      // Assert: Verify customer data is returned
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        CustomerId: 1,
        FirstName: 'Joe',
        LastName: 'Rogan',
      });
    });

    it('should return 404 if customer is not found', async () => {
      // Arrange: Simulate customer not found
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.findByPk = jest.fn().mockResolvedValue(null);

      // Act: Attempt to fetch non-existing customer
      await CustomerController.getCustomerById(req, res);

      // Assert: Check for not found error
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });

  // Tests for updateCustomer - Updating a customer
  describe('updateCustomer', () => {
    it('should update a customer successfully', async () => {
      // Arrange: Mock successful update
      const req = {
        params: { id: 1 },
        body: { FirstName: 'Joseph' }, // Mala varijacija za test
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.update = jest.fn().mockResolvedValue([1]); // 1 row updated
      Customer.findByPk = jest.fn().mockResolvedValue({
        CustomerId: 1,
        FirstName: 'Joseph',
        LastName: 'Rogan',
      });

      // Act: Update the customer
      await CustomerController.updateCustomer(req, res);

      // Assert: Verify updated customer data
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        CustomerId: 1,
        FirstName: 'Joseph',
        LastName: 'Rogan',
      });
    });

    it('should return 404 if customer is not found', async () => {
      // Arrange: Simulate customer not found
      const req = { params: { id: 1 }, body: { FirstName: 'Joseph' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.update = jest.fn().mockResolvedValue([0]); // No rows updated

      // Act: Attempt to update non-existing customer
      await CustomerController.updateCustomer(req, res);

      // Assert: Check for not found error
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });

  // Tests for deleteCustomer - Deleting a customer
  describe('deleteCustomer', () => {
    it('should delete a customer successfully', async () => {
      // Arrange: Mock successful deletion
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      Customer.destroy = jest.fn().mockResolvedValue(1); // 1 row deleted

      // Act: Delete the customer
      await CustomerController.deleteCustomer(req, res);

      // Assert: Verify successful deletion (no content)
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if customer is not found', async () => {
      // Arrange: Simulate customer not found
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Customer.destroy = jest.fn().mockResolvedValue(0); // No rows deleted

      // Act: Attempt to delete non-existing customer
      await CustomerController.deleteCustomer(req, res);

      // Assert: Check for not found error
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });
});