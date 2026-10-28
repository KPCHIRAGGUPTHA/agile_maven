# Set 11: Integrate GitHub with Jenkins to Automatically Deploy Code Changes to Kubernetes

## Objective
Establish automated continuous delivery (CD) by connecting a GitHub repository with Jenkins via Webhooks/SCM Polling to trigger automated Kubernetes deployments whenever code changes are pushed.

---

## Files Included
- [`deployment.yaml`](./deployment.yaml): Application Deployment with revision labels.
- [`service.yaml`](./service.yaml): NodePort Service exposing application on `30091`.
- [`Jenkinsfile`](./Jenkinsfile): SCM-driven pipeline with `triggers { githubPush(); pollSCM('H/5 * * * *') }`, automated checkout, change inspection, and Kubernetes deployment.

---

## How to Configure GitHub Integration in Jenkins
1. **GitHub Repository Settings**:
   - Go to your GitHub repository -> **Settings** -> **Webhooks** -> **Add webhook**.
   - Payload URL: `http://<YOUR_JENKINS_PUBLIC_IP_OR_NGROK>:8080/github-webhook/`
   - Content type: `application/json`
   - Which events: **Just the push event**.
2. **Jenkins Pipeline Configuration**:
   - Create a new Pipeline item named `K8s-Set-11-GitHub-Auto-Deploy`.
   - Check **GitHub hook trigger for GITScm polling**.
   - Set Pipeline definition to **Pipeline script from SCM**:
     - SCM: **Git**
     - Repository URL: `https://github.com/KPCHIRAGGUPTHA/agile_maven.git`
     - Branch: `*/main`
     - Script Path: `kubernetes/set-11-github-auto-deploy/Jenkinsfile`
3. Click **Save**.
4. Test by pushing a commit to GitHub: Jenkins automatically detects the push and deploys the new revision to Kubernetes!
