const supabase = require('../supabase'); // Supabase veritabanı bağlantısı

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Bildirim gönder
 *     description: Belirtilen kullanıcıya yeni bir bildirim gönderir
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - message
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: Bildirim gönderilecek kullanıcı ID'si
 *               title:
 *                 type: string
 *                 description: Bildirim başlığı
 *               message:
 *                 type: string
 *                 description: Bildirim mesajı
 *     responses:
 *       201:
 *         description: Bildirim başarıyla gönderildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification sent successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Bildirim Gönderme
const sendNotification = async (req, res) => {
    const { user_id, title, message } = req.body;

    try {
        // Supabase'e yeni bildirim ekliyoruz
        const { data, error } = await supabase
            .from('notifications')
            .insert([
                {
                    user_id: user_id,   // Bildirim gönderilen kullanıcı ID'si
                    title: title,       // Bildirim başlığı
                    message: message,   // Bildirim içeriği
                    is_read: false      // Yeni bildirim olduğu için is_read false olarak eklenir
                }
            ]);

        if (error) {
            throw error;
        }

        // Başarılı bir şekilde bildirim gönderildiyse, veriyi döndürüyoruz
        res.status(201).json({ message: 'Notification sent successfully', data });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Kullanıcı bildirimlerini listele
 *     description: Belirtilen kullanıcının tüm bildirimlerini getirir
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Kullanıcının Bildirimlerini Listeleme
const getUserNotifications = async (req, res) => {
    const { user_id } = req.query; // Kullanıcı ID'si sorgu parametresi olarak alınır

    try {
        // Kullanıcının bildirimlerini Supabase'ten alıyoruz
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user_id)  // Kullanıcı ID'sine göre filtreleme yapıyoruz
            .order('created_at', { ascending: false }); // Bildirimleri en yeniye göre sıralıyoruz

        if (error) {
            throw error;
        }

        // Kullanıcının bildirimlerini başarılı bir şekilde döndürüyoruz
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { sendNotification, getUserNotifications };
