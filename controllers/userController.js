const supabase = require('../supabase');  // Supabase bağlantısını al

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Tüm kullanıcıları listele
 *     description: Sistemdeki tüm kullanıcıları getirir
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Tüm kullanıcıları listele
const getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users') // Supabase tablosu adı
            .select('*');  // Tüm veriyi al

        if (error) {
            throw error;
        }

        res.status(200).json(data);  // Kullanıcıları döndür
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Yeni kullanıcı oluştur
 *     description: Yeni bir kullanıcı oluşturur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Kullanıcı adı
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-posta adresi (opsiyonel)
 *               username:
 *                 type: string
 *                 description: Kullanıcı kullanıcı adı
 *               password:
 *                 type: string
 *                 description: Şifrelenmiş parola
 *               role:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 description: Kullanıcı rolü
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Yeni kullanıcı oluştur
const createUser = async (req, res) => {
    const { name, email, username, password, role } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    name: name,
                    email: email,
                    username: username,
                    password: password,  // Parola düz metin olarak kaydediliyor
                    role: role
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        res.status(201).json({ message: 'User created successfully', data: data });  // Başarılı yanıt
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Kullanıcı güncelle
 *     description: Belirtilen ID'ye sahip kullanıcıyı günceller
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kullanıcı ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Kullanıcı adı
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-posta adresi
 *               username:
 *                 type: string
 *                 description: Kullanıcı kullanıcı adı
 *               password:
 *                 type: string
 *                 description: Şifrelenmiş parola
 *               role:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 description: Kullanıcı rolü
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Kullanıcıyı güncelle
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, username, password, role } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .update([
                { name: name, email: email, username: username, password: password, role: role }
            ])
            .eq('id', id);  // id'ye göre güncelleme yap

        if (error) {
            throw error;
        }

        res.status(200).json(data);  // Güncellenmiş veriyi döndür
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Kullanıcı sil
 *     description: Belirtilen ID'ye sahip kullanıcıyı siler
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kullanıcı ID
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Kullanıcıyı sil
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);  // id'ye göre silme işlemi

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
