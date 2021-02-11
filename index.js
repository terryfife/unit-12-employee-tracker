const inquirer = require("inquirer");
const connection = require('./db/db');
require("console.table");

const start = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "userAction",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add Employee"
      ]
    }
  ]).then(answer => {
  
    if(answer.userAction == "View all employees") {
      // run the SELECT * FROM employee
      readEmployees();

    } else if (answer.userAction == "View all departments") {
      // run the SELECT * FROM employee 
      readDepartments()
    } else if(answer.userAction == "Add Employee") {
      createEmployee();
    }else if (answer.userAction == "View all roles") {
      // run the SELECT * FROM employee 
      readRoles()
  
  })
}


const readEmployees = () => {
  console.log('Selecting all employees...\n');
  connection.query("SELECT * FROM employee", (err, queryResults) => {
    console.table(queryResults);
    connection.end();
  })
}

const readDepartments = () => {
  console.log('Selecting all departments...\n');
  connection.query("SELECT * FROM department", (err, queryResults) => {
    console.table(queryResults);
    connection.end();
  })
}

const createEmployee = () => {

  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is first name?'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name?'
      },
      {
        name: 'role_id',
        type: 'number',
        message: 'What is the role id?',
      },
      {
        name: 'manager_id',
        type: 'number',
        message: 'What manager id?',
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        (err) => {
          if (err) throw err;
          console.log('Your employee was created successfully!');
          start();
        }
      );
    });
};


connection.connect(function(err) {
  console.log("Connected to database!")

  start();

});