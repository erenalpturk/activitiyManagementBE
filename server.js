const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const supabase = require('./supabase');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const pointsRoutes = require('./routes/pointsRoutes');

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Activity Management API Documentation'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/points', pointsRoutes);

// Port ve server başlatma
const PORT = process.env.PORT || 5002;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`📚 Swagger Documentation: http://localhost:${PORT}/api-docs`);
    
    try {
        // Supabase bağlantısını test et
        const { data, error } = await supabase.from('users').select('count').limit(1);
        
        if (error) {
            console.error('Veritabanı bağlantı hatası:', error.message);
        } else {
            console.log('✅ Veritabanı bağlantısı başarılı!');
        }
    } catch (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    }
});
