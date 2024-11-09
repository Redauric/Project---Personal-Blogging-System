-- TODO Replace this SQL initialization script with an init script for your own database schema.

-- This is our SQL initialization script. Dummy data for users is in database.js and dummy data for articles and comments is in init-db2.sql.

DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS Users;

-- Create users table.
CREATE TABLE Users (
    user_id INTEGER NOT NULL PRIMARY KEY,
    user_avatar_url VARCHAR(255),
    username VARCHAR(64),
    firstname VARCHAR(64),
    lastname VARCHAR(64),
    user_password VARCHAR(255),
    birth_date DATE,
    user_desc VARCHAR(255)
);

-- Create articles table.
CREATE TABLE Articles (
    article_id INTEGER NOT NULL PRIMARY KEY,
    article_image_url VARCHAR(255),
    article_title VARCHAR(255),
    article_subtitle VARCHAR(255),
    article_date DATE,
    user_id INTEGER NOT NULL,
    article_text VARCHAR(5000),
    article_genre VARCHAR(64),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create comments table.
CREATE TABLE Comments (
    comment_id INTEGER NOT NULL PRIMARY KEY,
    comment_text TEXT,
    user_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE, 
    FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE
);
