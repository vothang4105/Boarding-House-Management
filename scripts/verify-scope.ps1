<#
.SYNOPSIS
  Audits git status against authorized Target Files in a Daily Plan.
.PARAMETER PlanFile
  Path to the Daily Plan markdown file (e.g. docs/planning/daily-plans/DAY-001.md).
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$PlanFile
)

if (-not (Test-Path $PlanFile)) {
    Write-Error "Plan file not found: $PlanFile"
    exit 1
}

Write-Host "=== Auditing Scope against: $PlanFile ===" -ForegroundColor Cyan

# 1. Parse Target Files from Markdown
$planContent = Get-Content -Path $PlanFile -Raw
$isTargetSection = $false
$authorizedFiles = [System.Collections.Generic.List[string]]::new()

# Always authorize workflow log
$authorizedFiles.Add("docs/development/DEVELOPMENT_LOG.md")

foreach ($line in (Get-Content -Path $PlanFile)) {
    if ($line -match '^##\s+3\.\s+Target Files') {
        $isTargetSection = $true
        continue
    }
    if ($isTargetSection -and $line -match '^##\s+\d+\.') {
        $isTargetSection = $false
        break
    }
    if ($isTargetSection -and $line -match '^\s*-\s+([^\s#]+)') {
        $cleanPath = $matches[1].Trim().Replace('\', '/')
        if ($cleanPath -notmatch '\.\.\.' -and $cleanPath -ne "") {
            $authorizedFiles.Add($cleanPath)
        }
    }
}

Write-Host "Authorized files:" -ForegroundColor Gray
$authorizedFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }

# 2. Get Changed Files from Git
$gitChanges = git status --porcelain | ForEach-Object {
    $parts = $_.Trim() -split '\s+', 2
    if ($parts.Length -eq 2) {
        $parts[1].Trim().Replace('\', '/')
    }
}

# 3. Compare
$violations = @()
foreach ($changed in $gitChanges) {
    $normalized = $changed.Replace('\', '/')
    # Check if exact match or subpath match
    $allowed = $false
    foreach ($auth in $authorizedFiles) {
        if ($normalized -eq $auth -or $normalized.EndsWith($auth)) {
            $allowed = $true
            break
        }
    }
    if (-not $allowed) {
        $violations += $normalized
    }
}

if ($violations.Count -gt 0) {
    Write-Host "`n[SCOPE VIOLATION DETECTED]" -ForegroundColor Red
    Write-Host "The following files were modified but are NOT authorized in $PlanFile:" -ForegroundColor Red
    $violations | ForEach-Object { Write-Host "  [!] $_" -ForegroundColor Red }
    exit 1
} else {
    Write-Host "`n[SCOPE AUDIT PASSED] All modified files are within authorized Target Files." -ForegroundColor Green
    exit 0
}
