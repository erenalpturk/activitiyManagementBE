CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,               -- Bildirim ID'si
    user_id INT REFERENCES users(id),    -- Bildirim gönderilen kullanıcı ID'si
    title VARCHAR(255),                   -- Bildirim başlığı
    message TEXT,                         -- Bildirim içeriği
    is_read BOOLEAN DEFAULT FALSE,        -- Kullanıcı bildirim okudu mu?
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Bildirim gönderilme zamanı
);
