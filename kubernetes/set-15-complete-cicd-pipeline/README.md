# Set 15: Complete CI/CD Pipeline Using GitHub, Jenkins, Docker, and Kubernetes

## Objective
Implement an end-to-end industry-standard Continuous Integration and Continuous Deployment (CI/CD) pipeline that automates the lifecycle of a modern web application:
1. **GitHub**: SCM repository holding source code and Kubernetes infrastructure as code.
2. **Jenkins**: Automated orchestrator listening for webhooks and executing multi-stage pipeline.
3. **Automated Testing**: Running `npm test` unit tests prior to artifact creation.
4. **Docker**: Building production container images, tagging with unique build IDs, and publishing.
5. **Kubernetes**: Zero-downtime rolling update deployment with ConfigMaps, readiness probes, and NodePort service.
6. **Self-Healing**: Automated failure recovery and rollback.

---

## Architecture Diagram
```
  +--------------+         +--------------+         +--------------+
  |  Developer   | ------> | GitHub Repo  | ------> |   Jenkins    |
  |  git push    |         | (Webhook)    |         |  Pipeline    |
  +--------------+         +--------------+         +-------+------+
                                                            |
                                        +-------------------+-------------------+
                                        |                   |                   |
                                        v                   v                   v
                                   [Unit Tests]       [Docker Build]    [Deploy to K8s]
                                    npm test            & Tag Image      Rollout & Probe
                                                            |                   |
                                                            v                   v
                                                      [Docker Hub]      [K8s Cluster Node]
                                                                        http://localhost:30095
```

---

## Files Included
- `kubernetes/app/`: Application source code, `Dockerfile`, `server.js`, and `test/server.test.js`.
- [`k8s/configmap.yaml`](./k8s/configmap.yaml): Environment configuration.
- [`k8s/deployment.yaml`](./k8s/deployment.yaml): RollingUpdate deployment (3 replicas, readiness & liveness probes).
- [`k8s/service.yaml`](./k8s/service.yaml): NodePort Service exposing application on `port 30095`.
- [`Jenkinsfile`](./Jenkinsfile): Master declarative 7-stage pipeline.

---

## How to Set Up and Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-15-Complete-CICD` -> **Pipeline** -> **OK**.
2. Under **Pipeline**:
   - Select **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/KPCHIRAGGUPTHA/agile_maven.git`
   - Branch Specifier: `*/main`
   - Script Path: `kubernetes/set-15-complete-cicd-pipeline/Jenkinsfile`
   *(Or select **Pipeline script** and paste the [`Jenkinsfile`](./Jenkinsfile) content directly)*
3. Click **Save** -> **Build Now**.
4. Access the deployed web application at: `http://localhost:30095`.
