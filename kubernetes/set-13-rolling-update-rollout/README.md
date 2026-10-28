# Set 13: Configure Jenkins to Perform Rolling Updates and Verify the Rollout Status of a Kubernetes Deployment

## Objective
Configure a Jenkins Pipeline to execute a zero-downtime rolling update strategy, track real-time rollout progression with `kubectl rollout status`, inspect revision histories, and automatically initiate rollbacks on failure.

---

## Files Included
- [`deployment.yaml`](./deployment.yaml): Kubernetes Deployment configured with:
  ```yaml
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  ```
  `maxUnavailable: 0` guarantees zero dropped connections during deployment transitions.
- [`Jenkinsfile`](./Jenkinsfile): Pipeline executing the rolling update, monitoring rollout status, capturing revisions, and implementing automated rollback logic in `post { failure { ... } }`.

---

## Key Commands Demonstrated
- `kubectl rollout status deployment/<name>`: Blocks until rollout is fully deployed.
- `kubectl rollout history deployment/<name>`: Inspects revision increments.
- `kubectl rollout undo deployment/<name>`: Rolls back to the previous stable revision.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-13-Rolling-Update` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) into the Pipeline definition.
3. Click **Save**.
4. Click **Build with Parameters** -> Choose `UPDATED_IMAGE=nginx:1.25-alpine` -> Click **Build**.
5. Observe zero-downtime replacement of pods in the Console Output.
