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

$mapRows = @()

foreach ($category in $lists.Keys) {
    $listPath = Join-Path $manifestDir $lists[$category]
    if (-not (Test-Path -LiteralPath $listPath)) {
        continue
    }

    $urls = Get-Content -LiteralPath $listPath | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    foreach ($url in $urls) {
        $cleanUrl = $url -replace "&amp;", "&"
        $fileName = Get-HashedFileName -Url $cleanUrl
        $targetPath = Join-Path (Join-Path $assetRoot $category) $fileName

        if (-not (Test-Path -LiteralPath $targetPath)) {
            continue
        }

        $mapRows += [pscustomobject]@{
            category = $category
            url = $cleanUrl
            file = $targetPath.Replace($root + "\\", "")
        }
    }
}

$mapRows | Export-Csv -NoTypeInformation -LiteralPath (Join-Path $assetRoot "asset-map.csv")
Write-Output "Rebuilt asset map with $($mapRows.Count) entries."
