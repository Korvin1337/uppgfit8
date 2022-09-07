const readline = require('readline/promises');
const { stdin: input, stdout: output, exit } = require('process');
const User = require('./public/users.js')

const userList = []
const loggedInUser = []
let menuLoop = true;

function removeUser(deleteUser) {
    for(let i = 0; i < userList.length; i++) {
        if(deleteUser == userList[i].name) {
            console.log(userList[i].name + " Deleted");
            userList.splice(i)
        }
    }
}

function loginUser(userName, password) {
    for(let i = 0; i < userList.length; i++) {
        if(userName == userList[i].name && password == userList[i].password) {
            loggedInUser.push(userList[i])
            console.log(loggedInUser[0].name + " Logged in");
        }
    }
    if(loggedInUser.length < 1) {
        console.log("Sry, wrong username or password");
    }
}

function createUser(newName, newPassword) {
    let checkName = true;
    for(let i = 0; i < userList.length; i++) {
        if(newName == userList[i].name) {
            console.log("Username already exists!");
            checkName = false;
        }
    }
    if(checkName == true) {
        userList.push(new User(newName, newPassword))
    }
}

async function menu() {
    const rl = readline.createInterface({ input, output });
    let menuChoice = await rl.question("1) Register user\n" + "2) List users\n" + "3) Remove user\n" + "4) Login user\n" + "5) Logout user\n" + "6) Quit\n" + "Make a choice: \n")
    switch(menuChoice) {
        case "1":
          let userName = await rl.question("Choose a username: ")
          let passWord = await rl.question("Choose a password: ")
          createUser(userName, passWord)
          menu()
          break
        case "2":
          console.log(userList)
          menu()
          break
        case "3":
          let deleteUser = await rl.question("Username of user: ")
          removeUser(deleteUser)
          menu()
          break
        case "4":
          if(loggedInUser.length > 0) {
            console.log("Already Logged In")
          } if(loggedInUser.length < 1) {
            let loginName = await rl.question("Username: ")
            let loginPassword = await rl.question("Password: ")
            loginUser(loginName, loginPassword)
            menu()
            break
          }
        case "5":
          console.log(loggedInUser[0].name + " logged out");
          loggedInUser.pop()
          menu()
          break
        case "6":
          console.log("Until next time!");
          exit()
          break
        default:
          console.log("Not a valid option");
          menu()
          break
      } 
}

if (menuLoop) {
    menu()
}