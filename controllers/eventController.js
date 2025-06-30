const supabase = require('../supabase');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Tüm etkinlikleri listele
 *     description: Sistemdeki tüm etkinlikleri getirir
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Etkinlikleri Listele
const getAllEvents = async (req, res) => {
    try {
        // Supabase'ten tüm etkinlikleri alıyoruz
        const { data, error } = await supabase
            .from('events')
            .select('*');  // Tüm etkinlikleri seç

        if (error) {
            throw error;
        }

        // Etkinlikleri başarılı bir şekilde döndürüyoruz
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Yeni etkinlik oluştur
 *     description: Yeni bir etkinlik oluşturur (teacher/admin için)
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - event_date
 *               - point
 *               - created_by
 *             properties:
 *               title:
 *                 type: string
 *                 description: Etkinlik başlığı
 *               category:
 *                 type: string
 *                 description: Etkinlik kategorisi
 *               description:
 *                 type: string
 *                 description: Etkinlik açıklaması
 *               location:
 *                 type: string
 *                 description: Etkinlik konumu
 *               application_deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Başvuru son tarihi
 *               event_date:
 *                 type: string
 *                 format: date-time
 *                 description: Etkinlik tarihi
 *               point:
 *                 type: integer
 *                 description: Etkinlik puanı
 *               quota:
 *                 type: integer
 *                 description: Etkinlik kotası
 *               created_by:
 *                 type: integer
 *                 description: Etkinliği oluşturan öğretmen ID (zorunlu)
 *     responses:
 *       201:
 *         description: Etkinlik başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Geçersiz veri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Yeni Etkinlik Oluştur
const createEvent = async (req, res) => {
    const { title, category, description, location, application_deadline, event_date, point, quota, created_by } = req.body;

    // Zorunlu alanları kontrol et
    if (!title || !event_date || !point || !created_by) {
        return res.status(400).json({ message: 'Title, event_date, point ve created_by alanları zorunludur' });
    }

    try {
        // Yeni etkinlik verilerini Supabase'e ekliyoruz
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title: title,
                    category: category,
                    description: description,
                    location: location,
                    application_deadline: application_deadline,
                    event_date: event_date,
                    point: point,
                    quota: quota,
                    created_by: created_by
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        // Yeni etkinlik başarılı bir şekilde oluşturulduğunda, etkinlik verilerini döndürüyoruz
        res.status(201).json({ message: 'Event created successfully', data: data });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Etkinlik güncelle
 *     description: Belirtilen ID'ye sahip etkinliği günceller (teacher/admin için)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Etkinlik ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Etkinlik başlığı
 *               category:
 *                 type: string
 *                 description: Etkinlik kategorisi
 *               description:
 *                 type: string
 *                 description: Etkinlik açıklaması
 *               location:
 *                 type: string
 *                 description: Etkinlik konumu
 *               application_deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Başvuru son tarihi
 *               event_date:
 *                 type: string
 *                 format: date-time
 *                 description: Etkinlik tarihi
 *               point:
 *                 type: integer
 *                 description: Etkinlik puanı
 *               quota:
 *                 type: integer
 *                 description: Etkinlik kotası
 *     responses:
 *       200:
 *         description: Etkinlik başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Etkinlik bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Etkinlik Güncelleme
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, category, description, location, application_deadline, event_date, point, quota } = req.body;

    try {
        // Supabase'te ilgili etkinliği güncelliyoruz
        const { data, error } = await supabase
            .from('events')
            .update([
                {
                    title: title,
                    category: category,
                    description: description,
                    location: location,
                    application_deadline: application_deadline,
                    event_date: event_date,
                    point: point,
                    quota: quota
                }
            ])
            .eq('id', id)
            .select();  // id'yi eşleştirerek güncelleme yapıyoruz

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı' });
        }

        // Güncellenmiş etkinlik verilerini döndürüyoruz
        res.status(200).json({ message: 'Event updated successfully', data: data });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Etkinlik sil
 *     description: Belirtilen ID'ye sahip etkinliği siler (admin için)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Etkinlik ID
 *     responses:
 *       200:
 *         description: Etkinlik başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event deleted successfully"
 *       404:
 *         description: Etkinlik bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Etkinlik Silme
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        // Supabase'ten ilgili etkinliği siliyoruz
        const { data, error } = await supabase
            .from('events')
            .delete()
            .eq('id', id)
            .select();  // id'yi eşleştirerek silme işlemi

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı' });
        }

        // Başarıyla silindiğinde, ilgili mesajı döndürüyoruz
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
