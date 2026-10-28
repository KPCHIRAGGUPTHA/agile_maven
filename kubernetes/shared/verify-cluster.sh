#!/usr/bin/env bash
# Bash script to verify Kubernetes Cluster connectivity for Jenkins
set -e

echo "========================================="
echo " Kubernetes Cluster Connection Verifier  "
echo "========================================="

# 1. Check kubectl executable
if command -v kubectl >/dev/null 2>&1; then
    echo "[OK] kubectl detected"
else
    echo "[ERROR] kubectl is not found in PATH!"
    exit 1
fi

# 2. Check cluster-info
echo -e "\n--> Checking Cluster Info..."
kubectl cluster-info

# 3. Check Nodes
echo -e "\n--> Fetching Nodes..."
kubectl get nodes -o wide

# 4. Check Namespaces
echo -e "\n--> Fetching Namespaces..."
kubectl get namespaces

# 5. Check ServiceAccount for Jenkins
echo -e "\n--> Checking ServiceAccount 'jenkins-admin'..."
kubectl get sa jenkins-admin -n default

echo -e "\n========================================="
echo " Cluster is Healthy & Ready for Jenkins! "
echo "========================================="
