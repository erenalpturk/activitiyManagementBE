# Activity Management Backend API

Etkinlik Yönetim Sistemi Backend API'si

## 🚀 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Gerekli environment değişkenlerini ayarlayın:
```bash
# .env dosyası oluşturun
JWT_SECRET=your_jwt_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Sunucuyu başlatın:
```bash
# Geliştirme modu
npm run dev

# Prodüksiyon modu
npm start
```

## 📚 API Dokümantasyonu

Swagger UI ile API dokümantasyonuna erişebilirsiniz:

**URL:** `http://localhost:5002/api-docs`

### API Endpoints

#### 🔐 Authentication
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Kullanıcı çıkışı

#### 👥 Users
- `GET /api/users` - Tüm kullanıcıları listele
- `POST /api/users` - Yeni kullanıcı oluştur
- `PUT /api/users/{id}` - Kullanıcı güncelle
- `DELETE /api/users/{id}` - Kullanıcı sil

#### 🎯 Events
- `GET /api/events` - Tüm etkinlikleri listele
- `POST /api/events` - Yeni etkinlik oluştur
- `PUT /api/events/{id}` - Etkinlik güncelle
- `DELETE /api/events/{id}` - Etkinlik sil

#### 📝 Registrations
- `POST /api/registrations/{id}/register` - Etkinliğe kayıt ol
- `DELETE /api/registrations/{id}` - Etkinlik kaydını sil
- `PUT /api/registrations/{id}/attendance` - Etkinlik yoklamasını güncelle

#### 🔔 Notifications
- `POST /api/notifications` - Bildirim gönder
- `GET /api/notifications?user_id={id}` - Kullanıcı bildirimlerini listele

#### 🏆 Points
- `GET /api/points/history?student_id={id}` - Öğrenci puan geçmişini listele
- `POST /api/points/history` - Puan geçmişi kaydı oluştur
- `GET /api/points/student/{student_id}/total` - Öğrenci toplam puanını getir

## 🗄️ Veritabanı Şeması

### Users Tablosu
- `id` (Primary Key, SERIAL)
- `name` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), UNIQUE, Opsiyonel)
- `username` (VARCHAR(255), UNIQUE)
- `password_hash` (TEXT, NOT NULL)
- `role` (VARCHAR(50), NOT NULL) - admin, teacher, student
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### Events Tablosu
- `id` (Primary Key, SERIAL)
- `title` (VARCHAR(255), NOT NULL)
- `category` (VARCHAR(100))
- `description` (TEXT)
- `location` (VARCHAR(255))
- `application_deadline` (TIMESTAMP)
- `event_date` (TIMESTAMP, NOT NULL)
- `point` (INT, NOT NULL)
- `quota` (INT)
- `created_by` (INT, Foreign Key -> users(id))
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### Event_Registrations Tablosu
- `id` (Primary Key, SERIAL)
- `event_id` (INT, Foreign Key -> events(id))
- `student_id` (INT, Foreign Key -> users(id))
- `is_participated` (BOOLEAN, DEFAULT FALSE)
- `is_volunteer` (BOOLEAN, DEFAULT FALSE)
- `extra_point` (INT, DEFAULT 0)
- `recorded_by` (INT, Foreign Key -> users(id))
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### Notifications Tablosu
- `id` (Primary Key, SERIAL)
- `user_id` (INT, Foreign Key -> users(id))
- `title` (VARCHAR(255))
- `message` (TEXT)
- `is_read` (BOOLEAN, DEFAULT FALSE)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### Points_History Tablosu
- `id` (Primary Key, SERIAL)
- `student_id` (INT, Foreign Key -> users(id))
- `event_id` (INT, Foreign Key -> events(id))
- `total_point` (INT, NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## 🔧 Teknolojiler

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - Database & Authentication
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Swagger** - API documentation

## 📝 Kullanım Örnekleri

### Kullanıcı Girişi
```bash
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student1",
    "password": "password123"
  }'
```

### Etkinlik Oluşturma
```bash
curl -X POST http://localhost:5002/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Yazılım Geliştirme Atölyesi",
    "category": "Teknoloji",
    "description": "Modern web teknolojileri hakkında atölye",
    "location": "A101",
    "application_deadline": "2024-01-15T23:59:59Z",
    "event_date": "2024-01-20T14:00:00Z",
    "point": 50,
    "quota": 30,
    "created_by": 1
  }'
```

### Puan Geçmişi Kaydetme
```bash
curl -X POST http://localhost:5002/api/points/history \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "event_id": 1,
    "total_point": 75
  }'
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje ISC lisansı altında lisanslanmıştır. 