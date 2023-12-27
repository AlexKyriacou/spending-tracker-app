-- Switch to the specified database
\c spending

-- Create the users table
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the categories table
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the expenses table
CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    amount DECIMAL NOT NULL,
    description VARCHAR(255),
    category_id INTEGER REFERENCES category(id),
    person_id INTEGER REFERENCES person(id),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
