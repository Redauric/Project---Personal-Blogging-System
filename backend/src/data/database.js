import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import fs from "fs";
import bcrypt from "bcrypt";

/** @type Database<sqlite3.Database, sqlite3.Statement> */
let db;

/**
 * Opens the database if it's not already open, then returns it.
 *
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>} the database instance.
 */
export async function getDatabase() {
  if (!db) {
    db = await openDatabase();
  }
  return db;
}

/**
 * Opens the database identified in the DB_FILENAME env variable.
 * Then, if it didn't already exist, initializes it.
 *
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>} the database instance.
 */
async function openDatabase() {
  const dbExists = fs.existsSync(process.env.DB_FILENAME);
  const db = await open({
    filename: process.env.DB_FILENAME,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await db.exec("PRAGMA foreign_keys = ON");

  if (!dbExists) {
    console.log(`Database ${process.env.DB_FILENAME} doesn't exist.`);
    await initDatabase(db);
  }

  return db;
}

/**
 * Initializes the database using the init script provided in the DB_INIT_SCRIPT env variable.
 *
 * @param {Database<sqlite3.Database, sqlite3.Statement>} db the database instance to initialize.
 */
async function initDatabase(db) {
  const initScript = process.env.DB_INIT_SCRIPT;
  console.log(`Initializing database using init script ${initScript}`);
  const sql = fs.readFileSync(initScript).toString();
  await db.exec(sql);
  console.log("Database initialized successfully!");

  // Creating dummy users as an array of objects.
  const users = [
    {
      user_id: 1,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar2.png`,
      username: "johndoe",
      firstname: "John",
      lastname: "Doe",
      user_password: "12345",
      birth_date: "1990-01-15",
      user_desc: "A passionate web developer."
    },
    {
      user_id: 2,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar6.png`,
      username: "janesmith",
      firstname: "Jane",
      lastname: "Smith",
      user_password: "56789",
      birth_date: "1992-05-22",
      user_desc: "Coffee lover and tech enthusiast."
    },
    {
      user_id: 3,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar4.png`,
      username: "alicejohnson",
      firstname: "Alice",
      lastname: "Johnson",
      user_password: "12345",
      birth_date: "1988-03-30",
      user_desc: "Designer and artist."
    },
    {
      user_id: 4,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar5.png`,
      username: "bobbrown",
      firstname: "Bob",
      lastname: "Brown",
      user_password: "78901",
      birth_date: "1985-07-10",
      user_desc: "Digital marketer."
    },
    {
      user_id: 5,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar3.png`,
      username: "charlieblack",
      firstname: "Charlie",
      lastname: "Black",
      user_password: "56789",
      birth_date: "1995-12-05",
      user_desc: "Content creator."
    },
    {
      user_id: 6,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar1.png`,
      username: "dianagreen",
      firstname: "Diana",
      lastname: "Green",
      user_password: "12345",
      birth_date: "1993-11-25",
      user_desc: "Freelance writer."
    },
    {
      user_id: 7,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar3.png`,
      username: "edwardwhite",
      firstname: "Edward",
      lastname: "White",
      user_password: "78901",
      birth_date: "1987-09-20",
      user_desc: "Photographer and traveler."
    },
    {
      user_id: 8,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar2.png`,
      username: "frankyellow",
      firstname: "Frank",
      lastname: "Yellow",
      user_password: "78901",
      birth_date: "1991-06-18",
      user_desc: "Software engineer."
    },
    {
      user_id: 9,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar1.png`,
      username: "gracepurple",
      firstname: "Grace",
      lastname: "Purple",
      user_password: "12345",
      birth_date: "1994-04-12",
      user_desc: "Fitness enthusiast."
    },
    {
      user_id: 10,
      user_avatar_url: `${process.env.PUBLIC_IMAGES_URL}/avatar6.png`,
      username: "hannahblue",
      firstname: "Hannah",
      lastname: "Blue",
      user_password: "56789",
      birth_date: "1996-10-30",
      user_desc: "Food blogger."
    }
  ];

  // Adding users to the Users table using Bcrypt password hashing and salting.

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.user_password, 10);
    await db.run(
      `INSERT INTO Users(user_id, user_avatar_url, username, firstname, lastname, user_password, birth_date, user_desc) VALUES (?,?,?,?,?,?,?,?)`,
      user.user_id,
      user.user_avatar_url,
      user.username,
      user.firstname,
      user.lastname,
      hashedPassword,
      user.birth_date,
      user.user_desc
    );
  }

  console.log("User data inserted after hashing and salting of password");
  const initScript2 = process.env.DB_INIT_SCRIPT2;
  console.log(`Initializing database using init script ${initScript2}`);
  const sql2 = fs.readFileSync(initScript2).toString();
  await db.exec(sql2);
  console.log("Database initialized successfully!");
}
