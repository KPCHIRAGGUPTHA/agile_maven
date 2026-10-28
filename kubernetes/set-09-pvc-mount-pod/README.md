# Set 9: Use Jenkins to Create a Kubernetes PersistentVolumeClaim and Mount It Inside a Pod

## Objective
Implement a Jenkins Pipeline to provision dynamic storage using a Kubernetes PersistentVolumeClaim (PVC), bind it to a PersistentVolume (PV), mount the volume inside a Pod, and verify stateful file persistence.

---

## Files Included
- [`pvc.yaml`](./pvc.yaml): PersistentVolumeClaim requesting `1Gi` storage with `ReadWriteOnce`.
- [`pod-pvc.yaml`](./pod-pvc.yaml): Pod mounting the PVC at `/data`.
- [`Jenkinsfile`](./Jenkinsfile): Pipeline handling dry-run, PVC creation, Pod scheduling, binding verification, and a live file write/read persistence test.

---

## Key Verification Steps
1. Checks that the PVC moves from `Pending` to `Bound`.
2. Runs `kubectl exec` inside `pvc-demo-pod` to write `jenkins-persist.txt` into `/data/`.
3. Verifies file contents and inspects filesystem mount via `df -h /data`.

---

## How to Run in Jenkins
1. Jenkins Dashboard -> **New Item** -> Name: `K8s-Set-09-PVC-Mount` -> **Pipeline** -> **OK**.
2. Paste [`Jenkinsfile`](./Jenkinsfile) content into the Pipeline definition.
3. Click **Save** -> **Build Now**.
4. Review the console logs to see the bound storage volume and persistent file output.
