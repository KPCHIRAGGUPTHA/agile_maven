# Set 10: Implement a Jenkins Pipeline to Configure a Readiness Probe for a Kubernetes Application

## Objective
Configure a Jenkins pipeline to deploy an application with a Kubernetes `readinessProbe` and `livenessProbe`, ensuring Kubernetes only routes client traffic to pods that are completely initialized and healthy.

---

## Files Included
- [`readiness-deployment.yaml`](./readiness-deployment.yaml):
  - Deployment with HTTP `readinessProbe` (`path: /`, `port: 80`, `initialDelaySeconds: 5`, `periodSeconds: 5`)
  - HTTP `livenessProbe`
  - NodePort Service on `port 30090`
- [`Jenkinsfile`](./Jenkinsfile): Pipeline managing YAML validation, deployment, readiness tracking, and endpoint registration verification.

---

## Readiness vs Liveness Probes
- **Readiness Probe**: Determines if a container is ready to accept network traffic. If it fails, Kubernetes removes the pod's IP from the Service Endpoints until it recovers.
- **Liveness Probe**: Determines if a container is still alive. If it fails, Kubernetes kills and restarts the container according to its `restartPolicy`.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-10-Readiness-Probe` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Check the console log to observe `READY 1/1` transitions and registered endpoints.
