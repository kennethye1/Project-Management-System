CREATE DATABASE pms;

CREATE TABLE projects(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100), 
    progress text
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY NOT NULL,
    proj_id INTEGER REFERENCES projects(id),
    title VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(10) NOT NULL
);