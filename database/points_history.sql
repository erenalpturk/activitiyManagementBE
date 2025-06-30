CREATE TABLE points_history (
    id SERIAL PRIMARY KEY,               -- Puan geçmişi ID'si
    student_id INT REFERENCES users(id), -- Öğrenci ID'si
    event_id INT REFERENCES events(id),  -- Etkinlik ID'si
    total_point INT NOT NULL,             -- Öğrencinin etkinlikten aldığı toplam puan
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Puanın kaydedilme zamanı
);
