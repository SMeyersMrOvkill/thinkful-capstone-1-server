const UsersService = {
    __select(db) {
        return db.select('id', 'user_name', 'full_name');
    },
    getAllUsers(db) {
        return this.__select().from('users');
    },
    getUserByUsername(db, username) {
        return this.__select().from('users').where('user_name', username);
    }
};