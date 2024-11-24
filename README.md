This project is a **Customer Service Messaging Application** that allows customers to send messages and agents to respond to them. The system includes features like locking messages for agents, viewing open client messages, and filtering previously responded messages.

## Features

### **1. Basic Features**
- Customers can send messages via a user-friendly interface.
- Agents can:
  - Lock messages to prevent other agents from responding.
  - View messages locked by them.
  - Respond to messages.
  - See previously responded messages.
  - multiple agent login at same time.
- Messages are stored in a MongoDB database.

### **2. Additional Features**
- A scheme to help agents divide work amongst themselves, and to prevent multiple agents working on the same message at once via locking system.
---

### **Setup Instructions to Run the Solution**

Follow these steps to set up and run the project on a local machine from scratch:

---

### **1. Install Dependencies**

#### **Install Node.js**
1. Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
2. Verify installation:
   ```bash
   node -v
   npm -v
   ```

#### **Install MongoDB**
1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
2. Install and run the MongoDB service.
   - **Windows**:
     - Start MongoDB from the Services app or run:
       ```bash
       net start MongoDB
       ```
   - **Mac/Linux**:
     - Start MongoDB:
       ```bash
       brew services start mongodb-community
       ```

---

### **2. Download the Project**

Download the project ZIP file and extract it.

---

### **3. Install Project Dependencies**

#### **Backend**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### **Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---


### **4. Start the Backend Server**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the server:
   ```bash
   npm start
   ```

---

### **5. Start the Frontend Server**
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Start the React application:
   ```bash
   npm start
   ```
3. Open the browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### **6. Application Workflow**

1. **Customer Login**:
   - Go to `/customer`.
   - Enter `customer_id` to view and send messages.

2. **Agent Login**:
   - Go to `/agent`.
   - Enter `agent_id` to access the agent dashboard.
   - Use the tabs to:
     - Respond to locked messages.
     - Lock/unlock open messages.
     - View previously responded messages.

---
