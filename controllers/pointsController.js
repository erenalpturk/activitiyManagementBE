const supabase = require('../supabase');

/**
 * @swagger
 * /api/points/history:
 *   get:
 *     summary: Öğrenci puan geçmişini listele
 *     description: Belirtilen öğrencinin tüm puan geçmişini getirir
 *     tags: [Points]
 *     parameters:
 *       - in: query
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Öğrenci ID'si
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PointsHistory'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Öğrenci puan geçmişini listele
const getStudentPointsHistory = async (req, res) => {
    const { student_id } = req.query;

    try {
        const { data, error } = await supabase
            .from('points_history')
            .select('*')
            .eq('student_id', student_id)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching points history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/points/history:
 *   post:
 *     summary: Puan geçmişi kaydı oluştur
 *     description: Öğrencinin etkinlikten aldığı puanı kaydeder
 *     tags: [Points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - event_id
 *               - total_point
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: Öğrenci ID'si
 *               event_id:
 *                 type: integer
 *                 description: Etkinlik ID'si
 *               total_point:
 *                 type: integer
 *                 description: Öğrencinin etkinlikten aldığı toplam puan
 *     responses:
 *       201:
 *         description: Puan geçmişi başarıyla kaydedildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointsHistory'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Puan geçmişi kaydı oluştur
const createPointsHistory = async (req, res) => {
    const { student_id, event_id, total_point } = req.body;

    try {
        const { data, error } = await supabase
            .from('points_history')
            .insert([
                {
                    student_id: student_id,
                    event_id: event_id,
                    total_point: total_point
                }
            ]);

        if (error) {
            throw error;
        }

        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating points history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/points/student/{student_id}/total:
 *   get:
 *     summary: Öğrenci toplam puanını getir
 *     description: Belirtilen öğrencinin tüm etkinliklerden aldığı toplam puanı hesaplar
 *     tags: [Points]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Öğrenci ID'si
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student_id:
 *                   type: integer
 *                   description: Öğrenci ID'si
 *                 total_points:
 *                   type: integer
 *                   description: Toplam puan
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Öğrenci toplam puanını getir
const getStudentTotalPoints = async (req, res) => {
    const { student_id } = req.params;

    try {
        const { data, error } = await supabase
            .from('points_history')
            .select('total_point')
            .eq('student_id', student_id);

        if (error) {
            throw error;
        }

        const totalPoints = data.reduce((sum, record) => sum + record.total_point, 0);

        res.status(200).json({
            student_id: parseInt(student_id),
            total_points: totalPoints
        });
    } catch (error) {
        console.error('Error calculating total points:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getStudentPointsHistory, createPointsHistory, getStudentTotalPoints }; 