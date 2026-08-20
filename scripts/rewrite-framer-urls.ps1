$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$pages = Get-ChildItem -Path $root -Recurse -Filter index.html
$mapPath = Join-Path $root "framer-assets\\asset-map.csv"

if (-not (Test-Path -LiteralPath $mapPath)) {
    throw "Asset map not found: $mapPath"
}

$assetMap = Import-Csv -LiteralPath $mapPath
$replacementMap = @{}

function Get-RelativeAssetPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FromDirectory,
        [Parameter(Mandatory = $true)]
        [string]$ToPath
    )

    $fromUri = New-Object System.Uri(($FromDirectory.TrimEnd('\') + '\'))
    $toUri = New-Object System.Uri($ToPath)
    return [System.Uri]::UnescapeDataString($fromUri.MakeRelativeUri($toUri).ToString()).Replace('\', '/')
}

foreach ($entry in $assetMap) {
    $relativeAsset = ($entry.file -replace '^.*?framer-assets\\', 'framer-assets\') -replace '\\', '/'
    $replacementMap[$entry.url] = $relativeAsset
}

foreach ($page in $pages) {
    $pageDir = Split-Path -Parent $page.FullName
    $content = Get-Content -LiteralPath $page.FullName -Raw
    $updated = $content

    foreach ($sourceUrl in $replacementMap.Keys) {
        $targetRelative = Resolve-Path -LiteralPath (Join-Path $root ($replacementMap[$sourceUrl] -replace '/', '\'))
        $targetPath = $targetRelative.Path
        $relativePath = Get-RelativeAssetPath -FromDirectory $pageDir -ToPath $targetPath
        $relativePath = $relativePath -replace ' ', '%20'

        $updated = $updated.Replace($sourceUrl, $relativePath)
        $updated = $updated.Replace(($sourceUrl -replace '&', '&amp;'), $relativePath)
    }

    if ($updated -ne $content) {
        Set-Content -LiteralPath $page.FullName -Value $updated -NoNewline
    }
}

Write-Output "Rewrote Framer asset URLs in $($pages.Count) pages."
