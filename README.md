# SvelteKit Demo Application with GitHub Actions

This guide will walk you through creating a simple SvelteKit Hexadecimal Calculator application, setting up Git and GitHub, and creating a GitHub Action to run tests automatically. We'll assume you have basic programming knowledge but are new to Git, Node.js, and GitHub. We are going to start of with some functional

---

## **Functional Requirements for Hexadecimal Calculator Application**

#### **1. Core Functionality**
1.1. The application should perform **addition** on two hexadecimal numbers.  
1.2. The application should perform **subtraction** on two hexadecimal numbers.  
1.3. The application should perform **multiplication** on two hexadecimal numbers.  
1.4. The application should perform **division** on two hexadecimal numbers.  

---

#### **2. Input Handling**
2.1. The application should accept **hexadecimal numbers** as input.  
2.2. The application should **restrict input values** to a maximum of **2 digits** (e.g., 0x00 to 0xFF).  
2.3. The application should **validate input values** to ensure they are valid hexadecimal numbers.  
2.4. The application should provide **confirmation of input values** before performing calculations.  

---

#### **3. Output Handling**
3.1. The application should **display results** in hexadecimal format.  
3.2. The application should **restrict output values** to a maximum of **4 digits** (e.g., 0x0000 to 0xFFFF).  
3.3. The application should **not return negative values**. If a subtraction operation results in a negative value, the application should display an error message (e.g., "Negative result not allowed").  
3.4. The application should **not return decimal values**. If a division operation results in a decimal value, the application should truncate the result to the nearest whole number.  

---

#### **4. Error Handling**
4.1. The application should display an error message if the input values exceed **2 digits**.  
4.2. The application should display an error message if the output value exceeds **4 digits**.  
4.3. The application should display an error message if the user attempts to divide by zero (e.g., "Division by zero not allowed").  
4.4. The application should display an error message if the user inputs an invalid hexadecimal value (e.g., "Invalid input").  

---

#### **5. User Interface**
5.1. The application should provide a **user-friendly interface** for inputting hexadecimal values.  
5.2. The application should display **clear labels** for input fields and operation buttons (e.g., "Add", "Subtract", "Multiply", "Divide").  
5.3. The application should display the **result prominently** after each calculation.  

---

#### **6. Performance**
6.1. The application should perform calculations **instantaneously** for valid inputs.  
6.2. The application should handle invalid inputs and edge cases **without crashing**.  

---

### **Categories Summary**
1. **Core Functionality**: Basic arithmetic operations.  
2. **Input Handling**: Rules and validation for input values.  
3. **Output Handling**: Rules and formatting for output values.  
4. **Error Handling**: Handling invalid inputs and edge cases.  
5. **User Interface**: Design and usability of the application.  
6. **Performance**: Speed and reliability of the application.  
7. **Example Scenarios**: Demonstrations of valid and invalid use cases.  

---

With the core functional requirements completed we can start with the building of the application

## **Videos**

In order to make the process easier videos have been made to aid in the creation of the application

1. **YouTube Links**:
   - Video One Functional requirements: [YouTube](https://youtu.be/zXS5BYm2K9s).
   - Video Two Dev Tools setup: [YouTube](https://youtu.be/r2JDRXaYHrw).
   - Video One Repository setup: [YouTube](https://youtu.be/YionoI4tIBY).

## Prerequisites

Before we start, you'll need to install the following tools:

1. **Git**: A version control system to manage your code.
2. **Node.js**: A JavaScript runtime to run your SvelteKit application.
3. **GitHub Account**: A free account to host your code and set up GitHub Actions.

---

## Step 1: Install Git

1. **Download Git**:
   - Go to [git-scm.com](https://git-scm.com/).
   - Download and install Git for your operating system.

2. **Verify Installation**:
   - Open a terminal or command prompt.
   - Run the following command to check if Git is installed:
     ```bash
     git --version
     ```
   - You should see the Git version displayed.

---

## Step 2: Install Node.js

1. **Download Node.js**:
   - Go to [nodejs.org](https://nodejs.org/).
   - Download and install the LTS (Long Term Support) version of Node.js.

2. **Verify Installation**:
   - Open a terminal or command prompt.
   - Run the following commands to check if Node.js and npm (Node Package Manager) are installed:
     ```bash
     node --version
     npm --version
     ```
   - You should see the versions displayed.

---

## Step 3: Create a GitHub Account

1. **Sign Up**:
   - Go to [github.com](https://github.com/).
   - Click "Sign up" and follow the instructions to create a free account.

2. **Set Up Git**:
   - Open a terminal or command prompt.
   - Configure Git with your GitHub username and email:
     ```bash
     git config --global user.name "Your GitHub Username"
     git config --global user.email "your.email@example.com"
     ```

---

## Step 4: Create a GitHub Repository

1. **Create a New Repository**:
   - Go to [github.com](https://github.com/).
   - Click the "+" button in the top-right corner and select "New repository."
   - Name your repository (e.g., `my-calculator-app`) and click "Create repository."

2. **Clone the Repository Locally**:
   - Open a terminal or command prompt.
   - Run the following command to clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/my-calculator-app.git
     cd my-calculator-app
     ```

---

## Step 5: Create a SvelteKit Application

1. **Install SvelteKit**:
   - In the cloned repository folder, run the following command to create a new SvelteKit project:
     ```bash
     npm create svelte@latest .
     ```
   - Follow the prompts to set up your project. Choose the following options:
     - **Skeleton project**: Yes
     - **TypeScript**: Yes (or No if you prefer)
     - **ESLint**: Yes
     - **Prettier**: Yes
     - **Playwright**: No
     - **Vitest**: Yes (for testing)

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```
   - Open your browser and go to `http://localhost:5173` to see your SvelteKit app running.

---

## Step 6: Commit and Push Your Code

1. **Add and Commit Your Code**:
   - In your project folder, run:
     ```bash
     git add .
     git commit -m "Initial commit with SvelteKit setup"
     ```

2. **Push to GitHub**:
   - Push your code to the GitHub repository:
     ```bash
     git push
     ```

---

## Step 7: Set Up GitHub Actions for Testing

1. **Create a GitHub Actions Workflow**:
   - In your project, create a folder named `.github/workflows`.
   - Inside the `workflows` folder, create a file named `run-tests.yml`.
   - Add the following content to the file:
     ```yaml
     name: Run Tests
     on:
       push:
         branches:
           - main
           - develop
       pull_request:
         branches:
           - main
           - develop

     jobs:
       build:
         name: Unit Tests
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - uses: actions/setup-node@v2
             with:
               node-version: 18.17.0
           - uses: oven-sh/setup-bun@v1
             with:
               bun-version: latest
           - name: Install dependencies
             run: bun install
           - name: Run Unit Tests
             run: bun run test:unit
     ```

2. **Commit and Push the Workflow**:
   - Add the workflow file to Git and push it to GitHub:
     ```bash
     git add .
     git commit -m "First action for testing"
     git push
     ```

3. **Check GitHub Actions**:
   - Go to your GitHub repository.
   - Click on the "Actions" tab to see the workflow running.
   - Once the workflow completes, you should see the results of your tests.

---

## Congratulations! 🎉

You've successfully created a SvelteKit application, set up Git and GitHub, and configured GitHub Actions to run tests automatically. Since we are using test driven developement in the next section we will be writing some test! 🚀