CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    location VARCHAR(255),
    application_deadline TIMESTAMP,
    event_date TIMESTAMP NOT NULL,
    point INT NOT NULL,
    quota INT,
    created_by INT REFERENCES users(id),  -- Etkinliği oluşturan öğretmen
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
