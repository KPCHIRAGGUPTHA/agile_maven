# Set 5: Configure Jenkins to Expose a Kubernetes Application Using a Service

## Objective
Configure Jenkins to create and expose a Kubernetes Service (NodePort), route external client traffic to backend pods, and verify endpoint registration.

---

## Files Included
- [`deployment.yaml`](./deployment.yaml): Deployment managing 2 nginx web server pods (`app: service-demo`).
- [`service.yaml`](./service.yaml): Kubernetes Service exposing the deployment on `NodePort: 30085`.
- [`Jenkinsfile`](./Jenkinsfile): Pipeline deploying both manifests, inspecting endpoints, and testing HTTP connectivity.

---

## Understanding Kubernetes Service Types
- **ClusterIP** (Default): Internal cluster IP only, accessible inside the cluster.
- **NodePort**: Allocates a static port (range 30000-32767) on all cluster nodes.
- **LoadBalancer**: Provisions an external cloud load balancer (supported directly by Docker Desktop k8s).

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-05-Expose-Service` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Open your browser and navigate to: `http://localhost:30085`.
