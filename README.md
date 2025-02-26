# GeneRxAPI

A RESTful API built with Node.js, Express, and MongoDB to manage and retrieve medicine information.

## Features

- **Search Medicines**: Find medicines by brand name, generic alternatives, drug class, or indication.
- **View Medicine Details**: Retrieve comprehensive information about a specific medicine.
- **Add New Medicines**: Insert new medicine records into the database.
- **Filter Medicines**: Browse medicines by drug class, indication, or other categories.

## Tech Stack

- **Node.js & Express**: Backend server and API handling.
- **MongoDB & Mongoose**: Database and object data modeling.

## Getting Started

### Prerequisites

- **Node.js**
- **MongoDB Atlas Account**
- **Git**

### Installation

1. **Clone the Repository:**

   ```bash
    git clone https://github.com/Dev07-Harsh/GeneRxAPI.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/medicine_db?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

### Running the API Locally

Start the server:

```bash
node api/index.js
```

The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Medicine Endpoints

- **GET /api/medicines**: Retrieve all medicines.
- **GET /api/medicines/search?q=**: Search medicines by name, indication, or drug class.
- **POST /api/medicines**: Add a new medicine record.

---

**Developed with ❤️ by [HARSH]**

