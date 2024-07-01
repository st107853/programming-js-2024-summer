//The array for storing users and current Id
let users = [];
let currentId = 1;

module.exports = {
    getUsers: () => users,
    addUser: (user) => {
        user.id = currentId++;
        users.push(user);
    },
    updateUser: (id, updatedData) => {
        const userIndex = users.findIndex(item => item.id === id);
        if (~userIndex) {
            users[userIndex] = {...users[userIndex], ...updatedData};
            return users[userIndex];
        }
        return null;
    },
    deleteUser: (id) => {
        const userIndex = users.findIndex(item => item.id === id);
        if (~userIndex) {
            users.splice(userIndex, 1);
            return true;
        }
        return false;
    },
    getUserById: (id) => users.find(item => item.id === id),
};
