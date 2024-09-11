let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let { getAllEmployees, getEmployeeById } = require("../controllers");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn()
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 3: Test Retrieve All Employees
  it("GET API /employees should retrieve all employees and return status code as 200", async () => {
    let mockedEmployees = [
      {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
      },
      {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
      },
      {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
      },
    ];
    getAllEmployees.mockResolvedValue(mockedEmployees);
    let result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockedEmployees);
  });
  // Exercise 4: Test Retrieve Employee by ID
  it("GET API /employees/details/:id should return an employee by id and status code as 200", async () => {
    let mockedEmployee =  {
      employeeId: 2,
      name: 'Priya Singh',
      email: 'priya.singh@example.com',
      departmentId: 2,
      roleId: 2,
  };
  getEmployeeById.mockResolvedValue(mockedEmployee);
  let result = await request(server).get("/employees/details/2");
  expect(result.statusCode).toEqual(200);
  expect(result.body).toEqual(mockedEmployee);
  });
});
describe("Functions Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 5: Mock the Get All Employees Function
  it("getAllEmployees function should return all employees", () => {
    let mockedEmployees = [
      {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
      },
      {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
      },
      {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
      },
    ];
    getAllEmployees.mockReturnValue(mockedEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });
});