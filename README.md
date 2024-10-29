## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Himanshu-Paliwal525/Nextjs-user-portal.git
    cd Nextjs-user-portal
    ```

2. **Create .env and .env.local files**:
   As shown in example files

3. **Install dependencies**:

    ```bash
    npm install
    ```

## Running the Application

1. **Generate Prisma client**:

    ```bash
    npx prisma generate
    ```

2. **Run Migrations**:

    ```bash
    npx prisma migrate dev --name init
    ```

3. **Start the Development Server**:

    ```bash
    npm run dev
    ```
