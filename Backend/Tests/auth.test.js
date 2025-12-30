const { Logout, Login } = require("../Controllers/AuthController");
const { changePassword } = require("../Controllers/UserController");
const User = require("../Models/UserModel");
const bcrypt=require('bcrypt')

jest.mock("../Models/UserModel", () => ({
  findOne: jest.fn(),
  findById: jest.fn()
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn()
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

test("logout should clear auth cookie", async () => {
  const req = {};
  const res = mockResponse();

  await Logout(req, res);

  expect(res.clearCookie).toHaveBeenCalled();
});

test("login fails if user is deactivated", async () => {
  const req = {
    body: { email: "a@a.com", password: "123" }
  };

  const res = mockResponse();

  User.findOne.mockResolvedValue({
    isActive: false
  });

  await Login(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
});


test("change password fails if old password is incorrect", async () => {
  const req = {
    user: { id: "123" },
    body: {
      oldPassword: "wrongOld",
      newPassword: "newPassword123"
    }
  };

  const res = mockResponse();

  User.findById.mockResolvedValue({
    password: "hashedpassword",
    save: jest.fn()
  });

  bcrypt.compare.mockResolvedValue(false);

  await changePassword(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
});
