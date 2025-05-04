# Deployment to AWS Using Docker, ECR, and ECS Fargate

To deploy the containerized IMY Calculator web application to the cloud, I used **Amazon Web Services (AWS)**, specifically **Elastic Container Registry (ECR)** for container image hosting and **Elastic Container Service (ECS) Fargate** for serverless container orchestration. Below are the documented steps:

---

## 1. Containerizing the Application with Docker

The project was first containerized using a custom `Dockerfile` based on the official Node.js image with Bun installed. The Dockerfile performed the following:

* Installed dependencies using Bun
* Built the SvelteKit application using `bun run build`
* Started the app using Vite’s preview server on port `4173`

```Dockerfile
FROM node:20

WORKDIR /app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun

COPY . .

RUN bun install
RUN bun run build

EXPOSE 4173

CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0"]
```

To build the image for deployment:

```bash
docker buildx build --platform linux/amd64 -t imy-calculator . --load
```

---

## 2. Hosting the Image on AWS ECR

AWS ECR was used to store the Docker image:

1. **ECR Repository Creation**:

   * Navigated to ECR in the AWS Console
   * Created a private repository named `imy-calculator`

2. **Image Push**:
   After authenticating Docker with ECR, the image was tagged and pushed:

   ```bash
   docker tag imy-calculator:latest 000000000000.dkr.ecr.us-east-1.amazonaws.com/imy/imy-calculator:latest
   docker push 000000000000.dkr.ecr.us-east-1.amazonaws.com/imy/imy-calculator:latest
   ```

---

## 3. Deploying to AWS ECS (Fargate)

AWS ECS with the Fargate launch type was used for deployment, eliminating the need to manage EC2 instances.

#### A. **Cluster Setup**:

* Created a new ECS cluster via the AWS Console
* Chose “Networking only (Fargate)” for serverless deployment

#### B. **Task Definition**:

* Created a new task definition named `imy-task`
* Configured the container with:

  * Image URI from ECR
  * Port mapping: `4173` TCP
  * App protocol: `HTTP`
  * CPU: `0.25 vCPU`, Memory: `512 MiB`

#### C. **Service Creation**:

* Launched a new ECS service using the Fargate launch type
* Assigned it to the VPC and public subnets
* Enabled **auto-assign public IP**

---

## 4. Security Group Configuration

To allow public access to the application:

* Opened the VPS Security Group associated with the ECS task
* Edited **Inbound Rules** to allow TCP traffic on port `4173` from `0.0.0.0/0`

```text
Type: Custom TCP
Port Range: 4173
Source: 0.0.0.0/0
```

---

## 5. Accessing the Application

Once the task was running, the public IP was retrieved from the **Elastic Network Interface (ENI)** under the ECS task. The app was accessible at:

```
    http://51.21.222.13:4173
```
Note: The link will be up for a maximum of a 1 week to manage costs
---

### ✅ Summary of AWS Services Used

| Service                             | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| **ECR**                             | Container image hosting                        |
| **ECS (Fargate)**                   | Serverless container orchestration             |
| **VPC/Subnets**                     | Networking infrastructure for ECS tasks        |
| **Security Groups**                 | Firewall rules to expose port 4173             |
| **Elastic Network Interface (ENI)** | Provided public IP for accessing the container |

---
