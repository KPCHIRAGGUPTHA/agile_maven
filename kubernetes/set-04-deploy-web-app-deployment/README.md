# Set 4: Use Jenkins to Deploy a Web Application to Kubernetes Using a Deployment

## Objective
Use a Jenkins pipeline to deploy a web application to Kubernetes managed by a Deployment controller, verifying high availability, replica sets, and declarative updates.

---

## Files Included
- [`webapp-deployment.yaml`](./webapp-deployment.yaml): Kubernetes Deployment resource specifying:
  - `replicas: 3`
  - Zero-downtime rolling update strategy (`maxSurge: 1`, `maxUnavailable: 0`)
  - Resource requests & limits
- [`Jenkinsfile`](./Jenkinsfile): Declarative pipeline automating validation, deployment, rollout tracking, and ReplicaSet inspection.

---

## Why a Deployment Controller?
Unlike standalone pods, a Kubernetes Deployment provides:
1. Automated self-healing (if a pod crashes or node fails, it restarts).
2. Declarative rolling updates with rollback capabilities.
3. Scalability with ReplicaSets under the hood.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-04-Web-Deployment` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Confirm pods are running with `kubectl get pods -l app=webapp`.
