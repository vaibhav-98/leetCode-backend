# 🚀 LeetCode Engine - Microservices Architecture

A high-performance, asynchronous code execution platform built with a microservices architecture. This system handles code submissions, isolated execution against test cases, and real-time result notifications.

## 🏗 System Architecture



## 🔄 Step-by-Step Workflow

1. **Client sends a request** to the submission service.
2. **Submission service requests** (in a sync fashion) the problem admin service to fetch the problem details.
3. **Problem admin service queries** the MongoDB to fetch the problem details.
4. **Problem admin service sends** the problem details back to the submission service.
5. **Database Entry**: We make a submission entry in the DB.
6. **Queue Submission**: Submission service adds the submission payload with the updated stub into the Redis queue.
7. **Response**: Sends a response back to the client that the submission has been made.
8. **Evaluation**: Evaluator service picks the message from the queue and evaluates the code.
9. **Matching**: The evaluator service matches test cases and adds the status to another Redis queue (Evaluation Queue).
10. **Result Update**: Submission service takes the evaluation from the evaluation queue.
11. **Persistence**: Submission service makes a call to the DB and updates submission details.
12. **Notification**: Submission service notifies the WebSocket service about the updated status.
13. **Real-time Push**: WebSocket service sends a message about the code execution status to the client.

---

## 🛠 Services Overview

### 1. **Submission Service**
The orchestrator of the submission lifecycle. It receives code from the user, prepares the execution payload, and manages the database state.
- **Role**: API Gateway for submissions, Job Producer.
- **Tech**: Node.js, Express, BullMQ, MongoDB.

### 2. **Evaluator Service**
The "brain" service that handles the heavy lifting of executing untrusted code in a safe environment.
- **Role**: Execution Strategy (Python/C++/Java), Result Comparison.
- **Tech**: TypeScript, Docker (for isolation), BullMQ.

### 3. **Websocket Service**
Manages real-time communication with the client to provide a seamless user experience.
- **Role**: Live Notifications, User-Socket Mapping.
- **Tech**: Node.js, Socket.io, Redis (for mapping).

### 4. **Problem Admin Service**
Dedicated service for managing problem metadata, test cases, and code stubs.
- **Role**: Metadata provider.
- **Tech**: Node.js, MongoDB.

---

## 📡 Tech Stack
- **Languages**: JavaScript, TypeScript.
- **Runtime**: Node.js.
- **Message Broker**: BullMQ (Redis-based).
- **Database**: MongoDB.
- **Communication**: REST API, WebSockets (Socket.io).
