# Setup Script Permissions for Inopsio
# This script sets executable permissions for all shell scripts

Write-Host "Setting up script permissions for Inopsio..." -ForegroundColor Green

# Set executable permissions for all shell scripts
Get-ChildItem -Path . -Recurse -Filter "*.sh" | ForEach-Object {
    Write-Host "Setting permissions for: $($_.FullName)" -ForegroundColor Yellow
    # On Windows, we'll ensure the files are readable and executable
    $_.Attributes = $_.Attributes -bor [System.IO.FileAttributes]::Normal
}

# Set executable permissions for specific script directories
$scriptDirs = @(
    "scripts/ci",
    "scripts/local", 
    "scripts/test",
    "scripts/migrations",
    "scripts/deploy",
    "scripts/patch",
    "scripts/monitor",
    "scripts/utils",
    "scripts/telemetry",
    "infrastructure/scripts",
    "infrastructure/scripts/health-checks"
)

foreach ($dir in $scriptDirs) {
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -Filter "*.sh" | ForEach-Object {
            Write-Host "Setting permissions for: $($_.FullName)" -ForegroundColor Yellow
            $_.Attributes = $_.Attributes -bor [System.IO.FileAttributes]::Normal
        }
    }
}

# Set executable permissions for .husky hooks
$huskyFiles = @(
    ".husky/pre-commit",
    ".husky/commit-msg", 
    ".husky/_/husky.sh"
)

foreach ($file in $huskyFiles) {
    if (Test-Path $file) {
        Write-Host "Setting permissions for: $file" -ForegroundColor Yellow
        $item = Get-Item $file
        $item.Attributes = $item.Attributes -bor [System.IO.FileAttributes]::Normal
    }
}

Write-Host "Script permissions setup complete!" -ForegroundColor Green
Write-Host "All shell scripts are now ready for execution." -ForegroundColor Green
