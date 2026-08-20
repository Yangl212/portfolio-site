$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$manifestDir = Join-Path $root ".codex\\framer-assets"
$assetRoot = Join-Path $root "framer-assets"
$lists = @{
    fonts = "fonts.txt"
    images = "images.txt"
    data = "data.txt"
    video = "video.txt"
    scripts = "scripts.txt"
    other = "other.txt"
}

function Get-HashedFileName {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url
    )

    $normalized = $Url -replace "&amp;", "&"
    $uri = [System.Uri]$normalized
    $extension = [System.IO.Path]::GetExtension($uri.AbsolutePath)
    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = ".bin"
    }

    $sha1 = [System.Security.Cryptography.SHA1]::Create()
    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($normalized)
        $hash = ($sha1.ComputeHash($bytes) | ForEach-Object { $_.ToString("x2") }) -join ""
    }
    finally {
        $sha1.Dispose()
    }

    return "$hash$extension"
}

if (-not (Test-Path -LiteralPath $manifestDir)) {
    throw "Manifest directory not found: $manifestDir. Run extract-framer-assets.ps1 first."
}

New-Item -ItemType Directory -Force -Path $assetRoot | Out-Null
$mapRows = @()

foreach ($category in $lists.Keys) {
    $listPath = Join-Path $manifestDir $lists[$category]
    if (-not (Test-Path -LiteralPath $listPath)) {
        continue
    }

    $categoryDir = Join-Path $assetRoot $category
    New-Item -ItemType Directory -Force -Path $categoryDir | Out-Null

    $urls = Get-Content -LiteralPath $listPath | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    foreach ($url in $urls) {
        $cleanUrl = $url -replace "&amp;", "&"
        $fileName = Get-HashedFileName -Url $cleanUrl
        $targetPath = Join-Path $categoryDir $fileName

        $targetExists = Test-Path -LiteralPath $targetPath
        $targetReady = $false

        if ($targetExists) {
            try {
                $targetInfo = Get-Item -LiteralPath $targetPath
                $targetReady = $targetInfo.Length -gt 0
            }
            catch {
                $targetReady = $false
            }
        }

        if (-not $targetReady) {
            $tempPath = "$targetPath.$PID.part"
            if (Test-Path -LiteralPath $tempPath) {
                Remove-Item -LiteralPath $tempPath -Force
            }

            Invoke-WebRequest -Uri $cleanUrl -OutFile $tempPath

            if (Test-Path -LiteralPath $targetPath) {
                try {
                    Remove-Item -LiteralPath $targetPath -Force
                }
                catch {
                    Remove-Item -LiteralPath $tempPath -Force
                    continue
                }
            }

            Move-Item -LiteralPath $tempPath -Destination $targetPath
        }

        $mapRows += [pscustomobject]@{
            category = $category
            url = $cleanUrl
            file = $targetPath.Replace($root + "\\", "")
        }
    }
}

$mapRows | Export-Csv -NoTypeInformation -LiteralPath (Join-Path $assetRoot "asset-map.csv")
Write-Output "Downloaded assets to $assetRoot"
