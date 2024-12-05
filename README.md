# Getting Started

This repo is created to practice with automation testing. As I am a beginner myself the files here will change and grow as time goes on. All the notes in this file are beginner friendly and helpful to recall steps or learn more about specific topics.

Before you can start to practice you would need to know the basics on the topics listed below:

1. Visual Studio + Basics VS Code
2. Git Version Control
3. Playwright
4. Programming Fundamentals

### Setting up Playwright in VS Code

Open VS Code and go to the terminal and enter the following: " npm init playwright@latest "  and press ENTER

Now you will be asked some setup questions. To keep things simple I select the following:

1. Choose JavaScript or TypeScript(Javascript)
2. Where to put your tests press ENTER
3. Press y or n for adding GitHub Actions workflow(y)
4. Press y or n to install Playwright browsers(y)


Using the terminal with Playwright

The following commands can be types into the terminal to execute a test and you can decide if you only want a perticular testfile to be executed or if you want to execute all. Besides that you can also choose to execute a test in debug mode or if you want to see the test run in the browser you can add the flag --headed. Bare in mind that these are just the basics to get started.

- npx playwright test
- npx playwright test tests/example.spec.js
- npx playwright test --headed
- npx playwright test --debug
- npx playwright codegen (put url at the end)

### Structure and Principles

In order tp write tests we need to follow certained rules: 

- Define a Page Object Model to represent the web application.
- Use fixtures to handle browser sessions and test data setup.
- Write tests using the POM(Page Object Model) to perform actions and assertions.
- Integrate the tests into a framework for execution and reporting.

How does this work?

Breaking it down into easy steps:

1. Create the POM(Object Page Model)
- save locators
- create functions

Sample of a POM:

```javascript
// Creating the model
class LoginPage {
    constructor(page) {
        this.page = page; // Playwright's page object
        this.usernameField = page.locator('#username'); // Locator for username field
        this.passwordField = page.locator('#password'); // Locator for password field
        this.loginButton = page.locator('#login'); // Locator for login button
    }

    // Function to perform login
    async login(username, password) {
        await this.usernameField.fill(username); // Fill in the username
        await this.passwordField.fill(password); // Fill in the password
        await this.loginButton.click(); // Click the login button
    }
}

module.exports = LoginPage; // Export the model for use in tests>

```

2. Write the test

Sample of a test:

```javascript
const { test, expect } = require('@playwright/test');
const LoginPage = require('../models/LoginPage'); // Import the model

test('User can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page); // Create an instance of the model

    await page.goto('https://example.com/login'); // Navigate to the login page
    await loginPage.login('user123', 'securepassword'); // Use the model's login function

    // Verify successful login
    const welcomeMessage = page.locator('#welcome');
    await expect(welcomeMessage).toHaveText('Welcome, user123!');
});

```

### Getting started with Git

1. Git vs Github
2. CI/CD In GitHub
3. Branches


Typical Workflow:

- Create a new branch (e.g., feature/new-feature).
- Make changes, commit, and push to the branch.
- Create a Pull Request to merge your branch into main.
- Merge the Pull Request after review.


Use commands below in the terminal:

- git add .
- git commit -m "Initial commit with project setup"
- git push -u origin main                   <--To commit main
- git push -u origin new-branch-name        <--For commit branch (git push -u origin MyFirstBranch)


### Practice websites for test automation

- https://www.saucedemo.com/
- https://uitestingplayground.com/
