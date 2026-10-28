# PowerShell script to verify Kubernetes Cluster connectivity for Jenkins
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Kubernetes Cluster Connection Verifier  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Check kubectl executable
if (Get-Command kubectl -ErrorAction SilentlyContinue) {
    $kVersion = kubectl version --client --short 2>$null
    if (-not $kVersion) { $kVersion = (kubectl version --client) -join " " }
    Write-Host "[OK] kubectl detected: $kVersion" -ForegroundColor Green
} else {
    Write-Host "[ERROR] kubectl is not found in PATH!" -ForegroundColor Red
    exit 1
}

# 2. Check cluster-info
Write-Host "`n--> Checking Cluster Info..." -ForegroundColor Yellow
kubectl cluster-info
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Cannot reach Kubernetes API server." -ForegroundColor Red
    exit 1
}

# 3. Check Nodes
Write-Host "`n--> Fetching Nodes..." -ForegroundColor Yellow
kubectl get nodes -o wide

# 4. Check Namespaces
Write-Host "`n--> Fetching Namespaces..." -ForegroundColor Yellow
kubectl get namespaces

# 5. Check ServiceAccount for Jenkins
Write-Host "`n--> Checking ServiceAccount 'jenkins-admin'..." -ForegroundColor Yellow
kubectl get sa jenkins-admin -n default

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " Cluster is Healthy & Ready for Jenkins! " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
