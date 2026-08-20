$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$pages = Get-ChildItem -Path $root -Recurse -Filter index.html
$outputDir = Join-Path $root ".codex\\framer-assets"
$regex = 'https://(?:framerusercontent\.com|framer\.com)[^"''\s<>)]+' 

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$allUrls = foreach ($page in $pages) {
    $content = Get-Content -LiteralPath $page.FullName -Raw
    [regex]::Matches($content, $regex) | ForEach-Object { $_.Value }
}

$unique = $allUrls | Sort-Object -Unique
$fonts = @($unique | Where-Object { $_ -match '\.(woff2?|ttf|otf)(\?|$)' })
$images = @($unique | Where-Object { $_ -match '\.(png|jpe?g|webp|gif|svg)(\?|$)' })
$data = @($unique | Where-Object { $_ -match 'searchIndex|\.json(\?|$)' })
$video = @($unique | Where-Object { $_ -match '\.(mp4|webm|mov)(\?|$)' })
$scripts = @($unique | Where-Object { $_ -match '\.(mjs|js)(\?|$)' })
$other = @(
    $unique | Where-Object {
        ($_ -notin $fonts) -and
        ($_ -notin $images) -and
        ($_ -notin $data) -and
        ($_ -notin $video) -and
        ($_ -notin $scripts)
    }
)

$summary = @(
    "pages=$($pages.Count)"
    "total_unique=$($unique.Count)"
    "fonts=$($fonts.Count)"
    "images=$($images.Count)"
    "data=$($data.Count)"
    "video=$($video.Count)"
    "scripts=$($scripts.Count)"
    "other=$($other.Count)"
)

$summary | Set-Content -LiteralPath (Join-Path $outputDir "summary.txt")
$fonts | Set-Content -LiteralPath (Join-Path $outputDir "fonts.txt")
$images | Set-Content -LiteralPath (Join-Path $outputDir "images.txt")
$data | Set-Content -LiteralPath (Join-Path $outputDir "data.txt")
$video | Set-Content -LiteralPath (Join-Path $outputDir "video.txt")
$scripts | Set-Content -LiteralPath (Join-Path $outputDir "scripts.txt")
$other | Set-Content -LiteralPath (Join-Path $outputDir "other.txt")
$unique | Set-Content -LiteralPath (Join-Path $outputDir "all.txt")

Write-Output "Wrote asset manifests to $outputDir"
