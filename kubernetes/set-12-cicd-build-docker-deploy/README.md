# Set 12: Create a Jenkins CI/CD Pipeline to Build a Docker Image and Deploy It to Kubernetes

## Objective
Implement an automated end-to-end CI/CD workflow in Jenkins that runs automated application unit tests, builds and tags a container image using Docker, optionally pushes it to Docker Hub, and rolls out the newly minted image to a Kubernetes cluster.

---

## Files Included
- [`deployment.yaml`](./deployment.yaml): Kubernetes Deployment configured for `kpchiragguptha/devops-k8s-app` with `imagePullPolicy: IfNotPresent`.
- [`service.yaml`](./service.yaml): NodePort Service exposing port 8080 at `nodePort: 30092`.
- [`Jenkinsfile`](./Jenkinsfile): Complete pipeline automating `npm test` -> `docker build` -> `docker push` -> `kubectl apply` -> `kubectl set image` -> rollout tracking.

---

## Pipeline Stages
1. **Unit Testing**: Runs `npm test` in the `app/` folder before containerizing.
2. **Build Docker Image**: Builds with build number tag (`v${BUILD_NUMBER}`) and `latest`.
3. **Optional Registry Push**: Authenticates using Jenkins credentials `docker-hub-credentials` if configured, or gracefully uses local Docker Desktop image.
4. **Deploy to Kubernetes**: Applies manifests and updates deployment image to match the build tag.
5. **Verify Rollout**: Confirms healthy pods and endpoint accessibility.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-12-Docker-CICD` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Test in browser: `http://localhost:30092`.
