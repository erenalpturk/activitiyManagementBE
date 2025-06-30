const supabase = require('../supabase');  // Supabase veritabanı bağlantısı

/**
 * @swagger
 * /api/registrations/{id}/register:
 *   post:
 *     summary: Etkinliğe kayıt ol
 *     description: Öğrenci belirtilen etkinliğe kayıt olur
 *     tags: [Registrations]
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
 *             required:
 *               - student_id
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: Kayıt olacak öğrenci ID'si
 *     responses:
 *       201:
 *         description: Başarıyla kayıt olundu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully registered for the event"
 *                 data:
 *                   $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Etkinlik kaydını yap (student için)
const registerForEvent = async (req, res) => {
    const { id } = req.params;  // Etkinlik ID'si
    const { student_id } = req.body;  // Öğrenci ID'si

    try {
        // Supabase'e etkinlik kaydını ekliyoruz
        const { data, error } = await supabase
            .from('event_registrations')
            .insert([
                {
                    event_id: id,
                    student_id: student_id,
                    is_participated: false,  // Başlangıçta katılım durumu 'false'
                    is_volunteer: false,     // Öğrenci gönüllü değil
                    extra_point: 0           // Başlangıçta ekstra puan yok
                }
            ]);

        if (error) {
            throw error;
        }

        // Başarıyla kaydettikten sonra, etkinlik ve öğrenci bilgisi döndürülür
        res.status(201).json({ message: 'Successfully registered for the event', data });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/registrations/{id}:
 *   delete:
 *     summary: Etkinlik kaydını sil
 *     description: Belirtilen kayıt ID'sine sahip etkinlik kaydını siler (teacher/admin için)
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kayıt ID
 *     responses:
 *       200:
 *         description: Kayıt başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registration removed successfully"
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Etkinlik kaydını sil (teacher/admin için)
const removeRegistration = async (req, res) => {
    const { id } = req.params;  // Kayıt ID'si

    try {
        // Supabase'ten etkinlik kaydını siliyoruz
        const { data, error } = await supabase
            .from('event_registrations')
            .delete()
            .eq('id', id);  // Kayıt ID'sine göre silme işlemi

        if (error) {
            throw error;
        }

        // Başarıyla silindiğinde, ilgili mesajı döndürüyoruz
        res.status(200).json({ message: 'Registration removed successfully' });
    } catch (error) {
        console.error('Error removing registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/registrations/{id}/attendance:
 *   put:
 *     summary: Etkinlik yoklamasını güncelle
 *     description: Belirtilen kayıt ID'sine sahip etkinlik yoklamasını günceller (teacher için)
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kayıt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_participated
 *             properties:
 *               is_participated:
 *                 type: boolean
 *                 description: Katılım durumu
 *               is_volunteer:
 *                 type: boolean
 *                 description: Gönüllü durumu
 *               extra_point:
 *                 type: integer
 *                 description: Ekstra puan
 *                 default: 0
 *               recorded_by:
 *                 type: integer
 *                 description: Yoklamayı yapan öğretmen ID
 *     responses:
 *       200:
 *         description: Yoklama başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Etkinlik yoklamasını güncelle (teacher için)
const updateAttendance = async (req, res) => {
    const { id } = req.params;  // Kayıt ID'si
    const { is_participated, is_volunteer, extra_point, recorded_by } = req.body;  // Katılım durumu ve ekstra puan

    try {
        // Supabase'teki etkinlik kaydını güncelliyoruz
        const { data, error } = await supabase
            .from('event_registrations')
            .update([
                {
                    is_participated: is_participated,  // Katılım durumu
                    is_volunteer: is_volunteer,        // Gönüllü durumu
                    extra_point: extra_point,          // Ekstra puan
                    recorded_by: recorded_by           // Yoklamayı yapan öğretmen
                }
            ])
            .eq('id', id);  // Kayıt ID'sine göre güncelleme yapıyoruz

        if (error) {
            throw error;
        }

        // Başarıyla güncellendikten sonra, güncellenmiş veriyi döndürüyoruz
        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { registerForEvent, removeRegistration, updateAttendance };
