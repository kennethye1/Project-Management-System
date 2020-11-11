CREATE DATABASE pms;

CREATE TABLE projects(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id uuid, 
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100), 
    progress text,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY NOT NULL,
    proj_id INTEGER REFERENCES projects(id),
    title VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(10) NOT NULL, 
   
);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

);