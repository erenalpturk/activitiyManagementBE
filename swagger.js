const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Activity Management Backend API',
      version: '1.0.0',
      description: 'Etkinlik Yönetim Sistemi Backend API Dokümantasyonu',
      contact: {
        name: 'API Destek',
        email: 'destek@activitymanagement.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5002',
        description: 'Geliştirme Sunucusu'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Kullanıcı ID'
            },
            name: {
              type: 'string',
              description: 'Kullanıcı adı'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-posta adresi'
            },
            username: {
              type: 'string',
              description: 'Kullanıcı kullanıcı adı'
            },
            password_hash: {
              type: 'string',
              description: 'Şifrelenmiş parola'
            },
            role: {
              type: 'string',
              enum: ['student', 'teacher', 'admin'],
              description: 'Kullanıcı rolü'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Hesap oluşturulma zamanı'
            }
          }
        },
        Event: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Etkinlik ID'
            },
            title: {
              type: 'string',
              description: 'Etkinlik başlığı'
            },
            category: {
              type: 'string',
              description: 'Etkinlik kategorisi'
            },
            description: {
              type: 'string',
              description: 'Etkinlik açıklaması'
            },
            location: {
              type: 'string',
              description: 'Etkinlik konumu'
            },
            application_deadline: {
              type: 'string',
              format: 'date-time',
              description: 'Başvuru son tarihi'
            },
            event_date: {
              type: 'string',
              format: 'date-time',
              description: 'Etkinlik tarihi'
            },
            point: {
              type: 'integer',
              description: 'Etkinlik puanı'
            },
            quota: {
              type: 'integer',
              description: 'Etkinlik kotası'
            },
            created_by: {
              type: 'integer',
              description: 'Etkinliği oluşturan öğretmen ID'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Etkinlik oluşturulma zamanı'
            }
          }
        },        
        Registration: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Kayıt ID'
            },
            event_id: {
              type: 'integer',
              description: 'Etkinlik ID'
            },
            student_id: {
              type: 'integer',
              description: 'Öğrenci ID'
            },
            is_participated: {
              type: 'boolean',
              description: 'Katılım durumu'
            },
            is_volunteer: {
              type: 'boolean',
              description: 'Gönüllü durumu'
            },
            extra_point: {
              type: 'integer',
              description: 'Ekstra puan'
            },
            recorded_by: {
              type: 'integer',
              description: 'Yoklamayı yapan öğretmen ID'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Kayıt oluşturulma zamanı'
            }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Bildirim ID'
            },
            user_id: {
              type: 'integer',
              description: 'Kullanıcı ID'
            },
            title: {
              type: 'string',
              description: 'Bildirim başlığı'
            },
            message: {
              type: 'string',
              description: 'Bildirim mesajı'
            },
            is_read: {
              type: 'boolean',
              description: 'Okunma durumu'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Bildirim gönderilme zamanı'
            }
          }
        },
        PointsHistory: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Puan geçmişi ID'
            },
            student_id: {
              type: 'integer',
              description: 'Öğrenci ID'
            },
            event_id: {
              type: 'integer',
              description: 'Etkinlik ID'
            },
            total_point: {
              type: 'integer',
              description: 'Öğrencinin etkinlikten aldığı toplam puan'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Puanın kaydedilme zamanı'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Kullanıcı adı'
            },
            password: {
              type: 'string',
              description: 'Parola'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'İşlem mesajı'
            },
            token: {
              type: 'string',
              description: 'JWT token'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Hata mesajı'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 