# 🚀 Deployment Guide: LeetCode Backend Microservices

Deploying a microservices architecture for free can be challenging because of the multiple moving parts (DB, Redis, and 4 separate services). Below is the best strategy using modern free tiers.

## 🏗️ Architecture Strategy

| Component | Platform | Why? |
| :--- | :--- | :--- |
| **Database (MongoDB)** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) | Best-in-class free tier (512MB). |
| **Message Broker (Redis)** | [Upstash](https://upstash.com/) | Generous free tier for Serverless Redis / BullMQ. |
| **API Services (Submission, Problem, Socket)** | [Render](https://render.com/) | Extremely easy to use, supports WebSockets and GitHub auto-deploy. |
| **Evaluator Service (Docker-based)** | [Oracle Cloud](https://www.oracle.com/cloud/free/) or VPS | **Crucial:** Since this service runs Docker containers internally, it needs a full VM (VPS). Render/Railway won't support spawning Docker containers inside their environment. |

---

## 🛠️ Step 1: Set up Infrastructure (Databases)

### 1. MongoDB Atlas
1. Create a free "M0" Cluster.
2. In **Network Access**, allow access from `0.0.0.0/0` (or specific IPs later).
3. Get the Connection String: `mongodb+srv://<user>:<password>@cluster.mongodb.net/leetcode`.

### 2. Upstash Redis
1. Create a "Global" or regional Redis database.
2. Copy the **REDIS_URL** (format: `redis://default:<password>@<endpoint>:<port>`).
3. **Note:** BullMQ works perfectly with Upstash.

---

## 🛠️ Step 2: Deploy API Services on Render

You will create 3 **Web Services** on Render.

### 1. Problem Admin Service
- **Link GitHub Repository**: Select your repo.
- **Root Directory**: `leetcode-Problem-Service`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGO_URL`: (Paste Atlas string)
  - `PORT`: `3000`

### 2. Submission Service
- **Link GitHub Repository**: Select same repo.
- **Root Directory**: `submission-service`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGO_URL`: (Paste Atlas string)
  - `REDIS_HOST`: (Upstash host)
  - `REDIS_PORT`: (Upstash port)
  - `PROBLEM_ADMIN_SERVICE_URL`: (The URL of the Problem Admin Service you just deployed)

### 3. Socket Service
- **Link GitHub Repository**: Select same repo.
- **Root Directory**: `leetcode-socket-service`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `REDIS_HOST`: (Upstash host)
  - `REDIS_PORT`: (Upstash port)

---

## 🛠️ Step 3: The Evaluator Service (The "Docker" Challenge)

Because this service interacts with the Docker Engine to run code securely, it **cannot** run on Render's free tier.

### Option A: Oracle Cloud (Free Forever)
1. Sign up for Oracle Cloud (requires Credit Card for verification, but doesn't charge).
2. Create an **"Always Free" Compute Instance** (ARM Ampere is best: 4 OCPUs, 24GB RAM).
3. SSH into the instance and install Docker:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
4. Clone your code and run the Evaluator service using Docker Compose or PM2.

### Option B: Local Execution (Hybrid)
If you just want to demo the project:
1. Deploy DB, Redis, and 3 services on the cloud.
2. Build and run the **Evaluator Service** on your local machine.
3. It will connect to the Cloud Redis queue, pick up jobs, run them in local Docker, and push results back to Cloud Redis.
4. The system will work end-to-end!

---

## 📝 Important Tips for Free Tiers
- **Spin-down**: Render free services go to "sleep" after 15 minutes of inactivity. The first request after a sleep can take 30-50 seconds to wake it up.
- **CORS**: Ensure your services allow requests from each other's Render URLs.
- **Upstash Limits**: Monitor your Upstash console to ensure you don't hit the daily request limit (usually set to 10k commands, which is plenty for personal testing).
