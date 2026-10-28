# Set 8: Configure a Jenkins Pipeline to Deploy an Application Using a Kubernetes ConfigMap

## Objective
Configure a Jenkins declarative pipeline to decouple configuration from container images by provisioning a Kubernetes ConfigMap and injecting it as environment variables and mounted files into an application Deployment.

---

## Files Included
- [`configmap.yaml`](./configmap.yaml): Kubernetes ConfigMap containing:
  - Key-value pairs: `APP_ENV`, `DATABASE_HOST`, `APP_MESSAGE`
  - Multi-line JSON file: `app-settings.json`
- [`deployment.yaml`](./deployment.yaml): Deployment referencing the ConfigMap via `envFrom` and volume mount at `/etc/config`.
- [`Jenkinsfile`](./Jenkinsfile): Pipeline executing validation, ConfigMap creation, deployment rollout, and `kubectl exec` verification.

---

## Key Verification Steps
The pipeline automatically runs `kubectl exec` inside the created pod to:
1. Grep environment variables (`APP_ENV`, `DATABASE_HOST`, `APP_MESSAGE`).
2. Read the mounted configuration file at `/etc/config/app-settings.json`.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-08-ConfigMap` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Check the console log to view the verified environment variables and JSON file!
