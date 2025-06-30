CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,               -- Kayıt ID'si
    event_id INT REFERENCES events(id),  -- Etkinlik ID'si
    student_id INT REFERENCES users(id), -- Öğrenci ID'si (student rolünde)
    is_participated BOOLEAN DEFAULT FALSE, -- Öğrenci etkinlikte fiilen yer aldı mı?
    is_volunteer BOOLEAN DEFAULT FALSE,    -- Öğrenci etkinlik görevlisi mi?
    extra_point INT DEFAULT 0,            -- Ekstra puan (gönüllü/katılımın etkisiyle)
    recorded_by INT REFERENCES users(id), -- Yoklamayı yapan öğretmen ID'si
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Kayıt oluşturulma zamanı
);
