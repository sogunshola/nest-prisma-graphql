### Documentation: Setup and Run the Application

This guide outlines how to set up and run the NestJS-based RESTful API with Prisma, GraphQL, and user authentication (standard and biometric). Follow the steps below to clone, configure, and run the application.

#### **1. Clone the Repository**

Start by cloning the project repository from GitHub:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

#### **2. Install Dependencies**

Install all required Node.js dependencies using `npm` or `yarn`:

```bash
npm install
```

or

```bash
yarn install
```

#### **3. Environment Configuration**

Set up the environment variables by creating a `.env` file in the root directory of your project. You can copy the existing `.env.example` as a template:

```bash
cp .env.example .env
```

Make sure to update the following variables in the `.env` file with your PostgreSQL database credentials:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
JWT_SECRET="your-secret-key"
PORT=3000
```

#### **4. Set Up the Database with Prisma**

Prisma is used as the ORM for the database. After configuring your `.env` file, you need to set up the database schema by running the following commands:

- **Migrate the database**:

```bash
npx prisma migrate dev --name init
```

- **Generate the Prisma client**:

```bash
npx prisma generate
```

#### **5. Run the Application**

After setting up the environment and database, you can run the NestJS application in development mode:

```bash
npm run start:dev
```

This will start the application at `http://localhost:3000`.

#### **6. Access the GraphQL Playground**

Once the application is running, you can access the GraphQL Playground by navigating to:

```
http://localhost:3000/graphql
```

Here, you can test the API by running GraphQL queries and mutations.

---

#### **7. Running Tests**

If there are unit or integration tests in the repository, you can run them using:

```bash
npm run test
```

This will execute all the tests in the project and display the results.

---

### Summary of Commands

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the `.env` file and configure the PostgreSQL database.

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Start the application:

   ```bash
   npm run start:dev
   ```

6. Access GraphQL Playground at `http://localhost:3000/graphql`.

7. Run tests (optional):

   ```bash
   npm run test
   ```