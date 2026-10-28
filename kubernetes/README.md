# Agile Development Process and DevOps
## Lab Exercise: Kubernetes Implemented Through Jenkins – 15 Sets Complete Guide

This repository contains the complete, tested, and production-ready implementation of all **15 Lab Sets** for integrating **Jenkins** with **Kubernetes**, covering continuous integration, continuous delivery, rolling deployments, failure handling, storage management, and monitoring.

---

## 📋 15 Sets Matrix & Quick Reference

| Set | Topic | Manifests | Jenkinsfile | Port / NodePort |
|:---:|:---|:---|:---|:---:|
| **1** | Connect Jenkins to K8s & verify | [`shared/jenkins-rbac.yaml`](./shared/jenkins-rbac.yaml) | [`set-01/Jenkinsfile`](./set-01-k8s-connection/Jenkinsfile) | N/A (API Server) |
| **2** | Deploy sample app to K8s | [`set-02/sample-app.yaml`](./set-02-deploy-sample-app/sample-app.yaml) | [`set-02/Jenkinsfile`](./set-02-deploy-sample-app/Jenkinsfile) | 30082 |
| **3** | Create Pod from YAML | [`set-03/pod.yaml`](./set-03-create-pod-yaml/pod.yaml) | [`set-03/Jenkinsfile`](./set-03-create-pod-yaml/Jenkinsfile) | 80 (Internal) |
| **4** | Deploy web app via Deployment | [`set-04/webapp-deployment.yaml`](./set-04-deploy-web-app-deployment/webapp-deployment.yaml) | [`set-04/Jenkinsfile`](./set-04-deploy-web-app-deployment/Jenkinsfile) | 80 (Internal) |
| **5** | Expose web app via Service | [`set-05/service.yaml`](./set-05-expose-service/service.yaml) | [`set-05/Jenkinsfile`](./set-05-expose-service/Jenkinsfile) | 30085 |
| **6** | Scale Deployment to 3 replicas | [`set-06/deployment.yaml`](./set-06-scale-deployment/deployment.yaml) | [`set-06/Jenkinsfile`](./set-06-scale-deployment/Jenkinsfile) | N/A |
| **7** | Update Deployment with new image | [`set-07/deployment.yaml`](./set-07-update-docker-image/deployment.yaml) | [`set-07/Jenkinsfile`](./set-07-update-docker-image/Jenkinsfile) | N/A |
| **8** | Deploy app using ConfigMap | [`set-08/configmap.yaml`](./set-08-configmap-deployment/configmap.yaml) | [`set-08/Jenkinsfile`](./set-08-configmap-deployment/Jenkinsfile) | N/A |
| **9** | PVC creation & Pod mount | [`set-09/pvc.yaml`](./set-09-pvc-mount-pod/pvc.yaml) | [`set-09/Jenkinsfile`](./set-09-pvc-mount-pod/Jenkinsfile) | N/A |
| **10** | Configure Readiness Probe | [`set-10/readiness-deployment.yaml`](./set-10-readiness-probe/readiness-deployment.yaml) | [`set-10/Jenkinsfile`](./set-10-readiness-probe/Jenkinsfile) | 30090 |
| **11** | GitHub auto-deploy integration | [`set-11/deployment.yaml`](./set-11-github-auto-deploy/deployment.yaml) | [`set-11/Jenkinsfile`](./set-11-github-auto-deploy/Jenkinsfile) | 30091 |
| **12** | CI/CD build Docker & deploy | [`set-12/deployment.yaml`](./set-12-cicd-build-docker-deploy/deployment.yaml) | [`set-12/Jenkinsfile`](./set-12-cicd-build-docker-deploy/Jenkinsfile) | 30092 |
| **13** | Rolling updates & rollout status | [`set-13/deployment.yaml`](./set-13-rolling-update-rollout/deployment.yaml) | [`set-13/Jenkinsfile`](./set-13-rolling-update-rollout/Jenkinsfile) | N/A |
| **14** | Detect & troubleshoot failures | [`set-14/faulty-deployment.yaml`](./set-14-detect-troubleshoot-failures/faulty-deployment.yaml) | [`set-14/Jenkinsfile`](./set-14-detect-troubleshoot-failures/Jenkinsfile) | N/A |
| **15** | Complete CI/CD (GitHub+Jenkins+Docker+K8s) | [`set-15/k8s/`](./set-15-complete-cicd-pipeline/k8s/) | [`set-15/Jenkinsfile`](./set-15-complete-cicd-pipeline/Jenkinsfile) | 30095 |

---

## 🛠️ Step-by-Step Instructions: What You Need To Do

### Step 1: Ensure Prerequisites are Running
1. **Docker Desktop & Kubernetes**:
   - Open Docker Desktop settings -> **Kubernetes** -> Ensure **Enable Kubernetes** is checked and running (green status).
   - In terminal, verify:
     ```powershell
     kubectl cluster-info
     kubectl get nodes
     ```
2. **Start Jenkins**:
   - If Jenkins is not currently running in background, start it from your terminal:
     ```powershell
     java -jar C:\Users\dell9\Downloads\jenkins.war --httpPort=8080
     ```
   - Open your browser at `http://localhost:8080`.

---

### Step 2: How to Execute Any Set in Jenkins

For each Set, you can run it via either of two simple methods:

#### Method 1: Direct Pipeline Script (Fastest for Labs/Viva)
1. Go to Jenkins Dashboard (`http://localhost:8080`) -> Click **New Item**.
2. Enter item name (e.g. `K8s-Set-01` or `K8s-Set-15`).
3. Select **Pipeline** and click **OK**.
4. Scroll down to the **Pipeline** configuration section.
5. In **Definition**, leave it as **Pipeline script**.
6. Open the `Jenkinsfile` from the corresponding set folder (e.g., `kubernetes/set-01-k8s-connection/Jenkinsfile`), copy its entire contents, and paste it into the script box.
7. Click **Save**.
8. Click **Build Now** (or **Build with Parameters** if the set has configurable options like Set 6, 7, or 13).
9. Click the build number (`#1`) -> **Console Output** to observe the logs.

#### Method 2: SCM Pipeline (From GitHub)
1. When creating the Pipeline item, choose **Pipeline script from SCM**.
2. Select **Git** and enter:
   - Repository URL: `https://github.com/KPCHIRAGGUPTHA/agile_maven.git`
   - Branch Specifier: `*/main`
   - Script Path: `kubernetes/set-<XX>-<name>/Jenkinsfile` (e.g. `kubernetes/set-15-complete-cicd-pipeline/Jenkinsfile`)
3. Click **Save** -> **Build Now**.

---

## 🔍 Verification Commands Summary for Each Set

After running a pipeline in Jenkins, you can verify the results in terminal using these exact commands:

| Set | Command to Verify |
|:---|:---|
| **Set 1** | `kubectl cluster-info` and `kubectl get nodes` |
| **Set 2** | `kubectl get deployment sample-app-deployment` and `kubectl get svc sample-app-service` |
| **Set 3** | `kubectl get pod standalone-web-pod -o wide` and `kubectl describe pod standalone-web-pod` |
| **Set 4** | `kubectl get deployment webapp-deployment` and `kubectl get rs -l app=webapp` |
| **Set 5** | `kubectl get svc service-demo-service` and `kubectl get endpoints service-demo-service` |
| **Set 6** | `kubectl get deployment scalable-deployment` (replicas should show 3/3) |
| **Set 7** | `kubectl get deployment update-demo-deployment -o jsonpath="{..image}"` and `kubectl rollout history deployment/update-demo-deployment` |
| **Set 8** | `kubectl get configmap app-config` and `kubectl exec <pod-name> -- env` |
| **Set 9** | `kubectl get pvc app-storage-pvc` (Status: Bound) and `kubectl exec pvc-demo-pod -- cat /data/jenkins-persist.txt` |
| **Set 10** | `kubectl get pods -l app=readiness-demo` (Status: Ready 1/1) and `kubectl describe pod <pod-name>` |
| **Set 11** | `kubectl get deployment github-auto-deployment` and check Jenkins build triggered by SCM |
| **Set 12** | `docker images kpchiragguptha/devops-k8s-app` and `kubectl get deployment cicd-docker-deployment` |
| **Set 13** | `kubectl rollout history deployment/rolling-demo-deployment` and `kubectl rollout status deployment/rolling-demo-deployment` |
| **Set 14** | `kubectl get events --field-selector type=Warning` and `kubectl rollout status deployment/troubleshoot-demo-deployment` |
| **Set 15** | `kubectl get all -l app=full-cicd-app` and open browser at `http://localhost:30095` |

---

## 📂 Project Architecture

```
kubernetes/
├── README.md                               <-- Master documentation (this file)
├── app/                                    <-- Shared web application
│   ├── package.json                        <-- App configuration & test script
│   ├── server.js                           <-- Node.js HTTP server (/healthz, /api/info)
│   ├── Dockerfile                          <-- Production multi-stage container build
│   ├── public/index.html                   <-- Modern dark-mode web interface
│   └── test/server.test.js                 <-- Automated unit test suite
├── shared/                                 <-- RBAC and validation utilities
│   ├── jenkins-rbac.yaml                   <-- Jenkins ServiceAccount and ClusterRoleBinding
│   ├── verify-cluster.ps1                  <-- PowerShell verification tool
│   └── verify-cluster.sh                   <-- Bash verification tool
├── set-01-k8s-connection/                 <-- Set 1: Cluster connection verification
├── set-02-deploy-sample-app/               <-- Set 2: Sample app deployment
├── set-03-create-pod-yaml/                 <-- Set 3: Standalone Pod creation
├── set-04-deploy-web-app-deployment/       <-- Set 4: Web app Deployment controller
├── set-05-expose-service/                  <-- Set 5: Service exposure & endpoints
├── set-06-scale-deployment/                <-- Set 6: Dynamic scaling to 3 replicas
├── set-07-update-docker-image/             <-- Set 7: Image updates & revision tracking
├── set-08-configmap-deployment/            <-- Set 8: ConfigMap environment & volume injection
├── set-09-pvc-mount-pod/                   <-- Set 9: PersistentVolumeClaim mount & persistence
├── set-10-readiness-probe/                 <-- Set 10: Readiness & Liveness probes
├── set-11-github-auto-deploy/              <-- Set 11: GitHub automated CD pipeline
├── set-12-cicd-build-docker-deploy/        <-- Set 12: CI/CD Docker build & deploy
├── set-13-rolling-update-rollout/          <-- Set 13: Zero-downtime rolling update & rollout
├── set-14-detect-troubleshoot-failures/    <-- Set 14: Failure detection & automated rollback
└── set-15-complete-cicd-pipeline/          <-- Set 15: Full GitHub + Jenkins + Docker + K8s
```
