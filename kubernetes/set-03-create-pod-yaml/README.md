# Set 3: Implement a Jenkins Pipeline to Create a Kubernetes Pod Using a YAML File

## Objective
Implement a Jenkins Pipeline to create a standalone Kubernetes Pod directly from a declarative YAML manifest file and verify its runtime lifecycle.

---

## Files Included
- [`pod.yaml`](./pod.yaml): Kubernetes Pod definition running `nginx:alpine` with resource requests and limits.
- [`Jenkinsfile`](./Jenkinsfile): Pipeline that validates the YAML, creates the Pod via `kubectl apply`, waits for the `Ready` condition, and inspects pod placement.

---

## Key Pipeline Features
- **Dry-run validation**: Catches schema or indentation issues before cluster submission.
- **Wait condition**: Uses `kubectl wait --for=condition=Ready pod/standalone-web-pod` to ensure synchronization before succeeding.
- **Diagnostics**: Runs `kubectl describe pod` to display container state and IP allocation.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-03-Create-Pod` -> **Pipeline** -> **OK**.
2. Paste the contents of [`Jenkinsfile`](./Jenkinsfile) in the Pipeline script box.
3. Click **Save** -> **Build Now**.
4. Check the console output and verify pod status using `kubectl get pod standalone-web-pod`.
