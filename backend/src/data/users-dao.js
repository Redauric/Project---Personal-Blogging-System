import yup from "yup";
import bcrypt from "bcrypt";
import { getDatabase } from "./database.js";
import { updateDatabase } from "./util.js";

/**
 * Using Sam Meech-Ward's youtube tutorial on "Hashing Passwords in Node and Express using bcrypt", to run the script for storing passwords.
 */

/**
 * Gets the user with the specified username, if it exists.
 *
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export async function getUserWithUsername(username) {
  const db = await getDatabase();
  return await db.get("SELECT * from Users WHERE username = ?", username);
}

/**
 * Validates user credentials by checking if the user exists and comparing the supplied password with the hashed password stored in the database.
 *
 * @param {string} username - The username of the user.
 * @param {string} user_password - The user's password to validate.
 * @returns {Promise<Object|null>} The user object if credentials are valid, otherwise null.
 */
export async function getUserWithCredentials(username, user_password) {
  const user = await getUserWithUsername(username);
  if (user && (await bcrypt.compare(user_password, user.user_password))) {
    return user;
  }
  return null;
}

/**
 * Schema to define a valid create user request.
 * - The request must have a username, password, first name, last name, date of birth, description and avatar.
 * - Username must be at least 3 characters long.
 * - Password must be at least 5 characters long.
 */
const createUserSchema = yup
  .object({
    user_avatar_url: yup.string().required(),
    username: yup.string().min(3).required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    user_password: yup.string().min(5).required(),
    birth_date: yup.string().required(),
    user_desc: yup.string().required()
  })
  .required();

/**
 * Creates a new user in the database after validating the input data.
 * Checks if the username already exists.
 * Throws an error if any required data is undefined.
 *
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<Object>} The newly created user object.
 * @throws {Error} If the username already exists or validation fails.
 */
export async function createUser(userData) {
  const newUser = createUserSchema.validateSync(userData, {
    abortEarly: false,
    stripUnknown: true
  });

  const existingUser = await getUserWithUsername(newUser.username);
  if (existingUser) {
    throw new Error("Username already exists, please choose another username");
  }

  const hash = await bcrypt.hash(newUser.user_password, 10);

  const db = await getDatabase();
  const dbResult = await db.run(
    "INSERT INTO Users(user_avatar_url, username, firstname, lastname, user_password, birth_date, user_desc) VALUES(?, ?, ?, ?, ?, ?, ?)",
    newUser.user_avatar_url,
    newUser.username,
    newUser.firstname,
    newUser.lastname,
    hash,
    newUser.birth_date,
    newUser.user_desc
  );

  newUser.id = dbResult.lastID;
  return newUser;
}

/**
 * Schema for updating user data.
 * Users cannot edit their id or password.
 * Any other fields can be updated as long as they are valid.
 */
const updateUserSchema = yup
  .object({
    user_avatar_url: yup.string().optional(),
    username: yup.string().min(3).optional(),
    firstname: yup.string().min(1).optional(),
    lastname: yup.string().min(1).optional(),
    user_password: yup.string().min(5).optional(),
    user_desc: yup.string().min(1).optional(),
    birth_date: yup.string().optional()
  })
  .noUnknown()
  .required();

/**
 * Updates the user with the specified id if they exist, using the provided updated data.
 * Validates the data and throws an error if invalid.
 *
 * @param {number} id - The id of the user to update.
 * @param {Object} updateData - The data to update the user with.
 * @returns {Promise<boolean>} True if changes were applied, false if not.
 */
export async function updateUser(id, updateData) {
  const parsedUpdateData = updateUserSchema.validateSync(updateData, {
    abortEarly: false,
    stripUnknown: true
  });

  const db = await getDatabase();
  const dbResult = await updateDatabase(db, "Users", parsedUpdateData, id, "user_id");

  return dbResult.changes > 0;
}

/**
 * Deletes the user with the specified id if they exist.
 * This function also deletes all articles and comments authored by the user due to ON DELETE CASCADE.
 *
 * @param {number} id - The id of the user to delete.
 * @returns {Promise<boolean>} True if the user was deleted, false if not.
 */
export async function deleteUser(id) {
  const db = await getDatabase();

  // Deletes the user. Since our database has ON DELETE CASCADE the database will auto delete data related to this user_id automatically.
  const dbResult = await db.run("DELETE FROM Users WHERE user_id = ?", id);
  return dbResult.changes > 0;
}
