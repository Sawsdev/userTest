const { UsersService } = require("../src/users/service");

describe("Register", () => {
  test("a empty user is not possible", async () => {
    const result = await UsersService.createUser({});
    expect(result).toBeNull();
  });

  test("a existing user is not posible", async () => {
    const result = await UsersService.createUser({
      username: "Sawsdevx8",
      first_name: "Sergio",
      last_name: "Salazar",
      email: "sawsdevx8@gmail.com",
      password: "abc12345678",
    });
    const type = typeof result;
    expect(type).toBe("object");
  });
});
describe("Search", () => {
  test("a user by id using empty id", async () => {
    const result = await UsersService.getUserById("");
    expect(result).toBeNull();
  });

  test("a user by email using a empty email", async () => {
    const result = await UsersService.getUserByEmail("");
    expect(result).toBeNull();
  });

  test("an user point of interest with an empty request", async () => {
    const result = await UsersService.getUserPOI({});
    expect(result).toBeNull();
  });
});
