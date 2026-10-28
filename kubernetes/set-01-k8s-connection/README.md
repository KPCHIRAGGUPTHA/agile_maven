# Set 1: Configure Jenkins to Connect to a Kubernetes Cluster and Verify Connection

## Objective
Configure Jenkins to communicate with a local or remote Kubernetes cluster and verify the connection, nodes, and API authorization.

---

## Prerequisites
1. **Kubernetes Cluster Running**: Ensure Docker Desktop Kubernetes (or Minikube / Kind) is running.
2. **Kubectl Configured**: Run `kubectl cluster-info` in PowerShell / terminal to verify it can reach the API server.
3. **Jenkins Installed & Running**: Run on port 8080 (`java -jar jenkins.war`).

---

## Connection Methods

### Method A: Host Agent Kubeconfig (Default for Local Windows Jenkins)
When Jenkins runs on the host machine (`localhost:8080`), it automatically inherits `C:\Users\<user>\.kube\config`.
- Simply ensure `kubectl.exe` is in your system `PATH`.
- The pipeline executes `kubectl cluster-info` directly.

### Method B: Jenkins Credentials & Kubernetes CLI Plugin
1. Open Jenkins Dashboard -> **Manage Jenkins** -> **Credentials** -> **System** -> **Global credentials**.
2. Click **Add Credentials**:
   - Kind: **Secret file** (Upload your `~/.kube/config`)
   - ID: `k8s-kubeconfig`
3. In Jenkinsfile, you can wrap commands using `withKubeConfig([credentialsId: 'k8s-kubeconfig']) { ... }`.

---

## How to Run in Jenkins
1. Go to Jenkins Dashboard -> **New Item**.
2. Enter item name: `K8s-Set-01-Connection`.
3. Select **Pipeline** and click **OK**.
4. In the Pipeline configuration:
   - **Definition**: Pipeline script
   - Copy and paste the contents of [`Jenkinsfile`](./Jenkinsfile)
5. Click **Save** -> **Build Now**.
6. View **Console Output** to verify connection, nodes, and RBAC permissions.
