CREATE TABLE users (
    id SERIAL PRIMARY KEY,              -- Kullanıcı ID'si
    name VARCHAR(255) NOT NULL,          -- Kullanıcı adı
    email VARCHAR(255) UNIQUE,           -- E-posta (opsiyonel olabilir)
    username VARCHAR(255) UNIQUE,        -- Kullanıcı adı
    password TEXT NOT NULL,        -- Parola hash'i (şifre güvenliği için)
    role VARCHAR(50) NOT NULL,          -- Kullanıcı rolü (admin, teacher, student)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Hesap oluşturulma zamanı
);
