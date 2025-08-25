-- Initialize MySQL database and user permissions for development

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS todo_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user with proper permissions for all hosts (development setup)
CREATE USER IF NOT EXISTS 'upendartodo'@'%' IDENTIFIED BY 'upendartodo123';
CREATE USER IF NOT EXISTS 'upendartodo'@'localhost' IDENTIFIED BY 'upendartodo123';
CREATE USER IF NOT EXISTS 'upendartodo'@'127.0.0.1' IDENTIFIED BY 'upendartodo123';

-- Grant all privileges on todo_app database
GRANT ALL PRIVILEGES ON todo_app.* TO 'upendartodo'@'%';
GRANT ALL PRIVILEGES ON todo_app.* TO 'upendartodo'@'localhost';
GRANT ALL PRIVILEGES ON todo_app.* TO 'upendartodo'@'127.0.0.1';

-- Grant additional privileges for development
GRANT CREATE, ALTER, DROP, INDEX ON todo_app.* TO 'upendartodo'@'%';
GRANT CREATE, ALTER, DROP, INDEX ON todo_app.* TO 'upendartodo'@'localhost';
GRANT CREATE, ALTER, DROP, INDEX ON todo_app.* TO 'upendartodo'@'127.0.0.1';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Use the database
USE todo_app;

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(50) DEFAULT 'blue',
    completed BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_created_at ON todos(createdAt);

-- Insert sample data
INSERT IGNORE INTO todos (id, title, description, color, completed) VALUES 
(1, 'Welcome to Todo App', 'This is your first task!', 'blue', false),
(2, 'Learn VS Code Database Management', 'Explore the Database Client extension features', 'green', false),
(3, 'Build Amazing Apps', 'Use this todo app as a foundation for bigger projects', 'purple', false);
