# Set 14: Implement a Jenkins Pipeline to Detect and Troubleshoot Kubernetes Deployment Failures

## Objective
Implement an intelligent self-healing Jenkins Pipeline that detects deployment failure conditions (such as `ImagePullBackOff`, `CrashLoopBackOff`, or timed-out rollouts), collects troubleshooting forensics (pod states, warning events, logs), and automatically triggers an automated rollback (`kubectl rollout undo`) to restore system availability.

---

## Files Included
- [`valid-deployment.yaml`](./valid-deployment.yaml): Stable baseline deployment (`nginx:alpine`).
- [`faulty-deployment.yaml`](./faulty-deployment.yaml): Faulty deployment specifying an invalid image (`nginx:nonexistent-faulty-tag-999`) to simulate an `ImagePullBackOff` error.
- [`Jenkinsfile`](./Jenkinsfile): Pipeline executing the 4-phase resilience workflow:
  1. Baseline deployment
  2. Failure detection via bounded rollout timeout
  3. Diagnostic logging & forensic root-cause analysis
  4. Automated remediation (`kubectl rollout undo`)

---

## Troubleshooting Commands Captured
- `kubectl get pods -l app=troubleshoot-demo`: Captures pod error states (`ImagePullBackOff`, `ErrImagePull`).
- `kubectl describe pods`: Highlights exact Kubernetes event warnings (e.g. `Failed to pull image: manifest unknown`).
- `kubectl get events --field-selector type=Warning`: Isolates all recent cluster warning events.
- `kubectl rollout undo deployment/<name>`: Restores cluster back to the last stable revision.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-14-Troubleshoot-Failures` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Check Console Output: Notice the failure detection, event forensics, and automated recovery.
