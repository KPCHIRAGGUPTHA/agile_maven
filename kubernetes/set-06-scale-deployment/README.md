# Set 6: Implement a Jenkins Pipeline to Scale a Kubernetes Deployment to Three Replicas

## Objective
Implement a parameterized Jenkins Pipeline to scale a Kubernetes Deployment dynamically to 3 replicas (or user-defined replica count) and monitor replica convergence.

---

## Files Included
- [`deployment.yaml`](./deployment.yaml): Base Deployment configured with `replicas: 1`.
- [`Jenkinsfile`](./Jenkinsfile): Parameterized pipeline that deploys the application, triggers `kubectl scale deployment/scalable-deployment --replicas=3`, waits for rollout, and verifies all 3 pods are Running.

---

## Key Pipeline Features
- **Parameterized**: Accepts `TARGET_REPLICAS` (default `3`).
- **Rollout Verification**: Waits for the ReplicaSet to stabilize.
- **Pod State Verification**: Lists all pod names, IPs, and ready states.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-06-Scale-Deployment` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) into the Pipeline definition.
3. Click **Save**.
4. Click **Build with Parameters** -> Leave `TARGET_REPLICAS=3` (or adjust) -> Click **Build**.
5. Check Console Output: Verify `3/3` pods ready and running.
