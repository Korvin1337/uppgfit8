class User {
    constructor(name, password) {
        this.name = name
        this.password = password
    }

    print() {
        console.log('User: ' + this.name + ' Password ' + this.password);
    }
}

module.exports = User