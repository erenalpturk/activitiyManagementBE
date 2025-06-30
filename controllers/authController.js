const jwt = require('jsonwebtoken');
const supabase = require('../supabase');  // Supabase veritabanı bağlantısı

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     description: Kullanıcı adı ve parola ile giriş yapar ve JWT token döner
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Geçersiz kimlik bilgileri
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
// Kullanıcı Girişi (Login)
const login = async (req, res) => {
    const { username, password } = req.body;

    // Kullanıcıyı veritabanında bulma
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Parolayı düz metin olarak karşılaştır
    if (password !== data.password) {
        return res.status(401).json({ message: 'Geçersiz şifre' });
    }

    // JWT Token oluşturma
    const token = jwt.sign(
        { userId: data.id, role: data.role },  // Token içinde kullanıcı bilgilerini saklarız
        process.env.JWT_SECRET,  // Secret key (environment variable)
        { expiresIn: '1h' }  // Token süresi (1 saat)
    );

    // Başarılı giriş
    res.status(200).json({ message: 'Login successful', token });
};

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Kullanıcı çıkışı
 *     description: Kullanıcı çıkışı yapar (token invalidate işlemi frontend tarafında yapılır)
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Başarılı çıkış
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 */
// Kullanıcı Çıkışı (Logout)
const logout = (req, res) => {
    // Çıkış işlemi için token'ı invalidate etme (genellikle frontend tarafında yapılır)
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { login, logout };
