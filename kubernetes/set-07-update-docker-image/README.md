# Set 7: Use Jenkins to Update a Kubernetes Deployment with a New Docker Image

## Objective
Implement a Jenkins Pipeline to perform an in-place rolling update of a Kubernetes Deployment container image using `kubectl set image` without application downtime.

---

## Files Included
- [`deployment.yaml`](./deployment.yaml): Initial Deployment using image `nginx:1.24-alpine`.
- [`Jenkinsfile`](./Jenkinsfile): Parameterized pipeline that deploys v1, applies image update to `nginx:1.25-alpine` (or specified tag), monitors the rollout, and checks revision history.

---

## Key Pipeline Features
- **Zero Downtime**: Employs rolling update logic so old pods are terminated only as new pods become ready.
- **Rollout History Tracking**: Uses `kubectl rollout history` to verify revision progression.
- **Parametrized Image Tag**: Allows dynamic updates to any Docker tag.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-07-Update-Docker-Image` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save**.
4. Click **Build with Parameters** -> Set `NEW_IMAGE=nginx:1.25-alpine` -> Click **Build**.
5. Verify revision history and image update in the Console Output.
