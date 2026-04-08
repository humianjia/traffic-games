$categories = @('clicker', 'driving', 'escape', 'parking', 'racing', 'trafficControl')
$baseDir = "f:\DATA\MyWorkspace\h5game\traffic games"
$fixedCount = 0

foreach ($category in $categories) {
    $categoryPath = Join-Path $baseDir $category
    if (Test-Path $categoryPath) {
        $htmlFiles = Get-ChildItem -Path $categoryPath -Filter "*.html"
        foreach ($file in $htmlFiles) {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            
            # 查找meta keywords
            if ($content -match '<meta name="keywords" content="([^"]+)"') {
                $currentKeywords = $matches[1]
                
                # 检查是否已经有traffic games在开头
                if (-not ($currentKeywords -match '^traffic games')) {
                    $newKeywords = "traffic games, $currentKeywords"
                    $newContent = $content -replace [regex]::Escape('<meta name="keywords" content="' + $currentKeywords + '"'), ('<meta name="keywords" content="' + $newKeywords + '"')
                    
                    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
                    Write-Host "Fixed: $($file.FullName)"
                    $fixedCount++
                } else {
                    Write-Host "Skipped: $($file.FullName)"
                }
            }
        }
    }
}

Write-Host ""
Write-Host "Total files fixed: $fixedCount"
