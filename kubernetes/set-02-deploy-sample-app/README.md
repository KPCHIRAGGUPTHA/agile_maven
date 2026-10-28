# Set 2: Create a Jenkins Pipeline to Deploy a Sample Application to Kubernetes

## Objective
Create a Jenkins declarative pipeline that validates, applies, and checks the status of a sample application deployment and service on Kubernetes.

---

## Files Included
- [`sample-app.yaml`](./sample-app.yaml): Kubernetes Deployment (2 replicas) and NodePort Service (`port: 80`, `nodePort: 30082`).
- [`Jenkinsfile`](./Jenkinsfile): Declarative pipeline executing dry-run validation, `kubectl apply`, rollout tracking, and verification.

---

## Pipeline Execution Steps
1. **Validate Manifest**: Runs `kubectl apply --dry-run=client -f sample-app.yaml` to detect syntax errors before deployment.
2. **Deploy to Kubernetes**: Applies the YAML manifest using `kubectl apply -f sample-app.yaml`.
3. **Wait for Rollout**: Waits up to 120s for all replicas to be Ready using `kubectl rollout status`.
4. **Verify Deployment & Service**: Prints running pods, node IP, and service NodePort.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-02-Deploy-Sample-App` -> **Pipeline** -> **OK**.
2. Under **Pipeline**:
   - Select **Pipeline script from SCM** (pointing to your repo `KPCHIRAGGUPTHA/agile_maven`), script path: `kubernetes/set-02-deploy-sample-app/Jenkinsfile`
   - OR select **Pipeline script** and copy-paste [`Jenkinsfile`](./Jenkinsfile).
3. Click **Save** -> **Build Now**.
4. Test application access in browser at: `http://localhost:30082`.
