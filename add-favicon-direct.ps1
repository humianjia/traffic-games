# 为coolmath和more-games目录中的HTML文件添加favicon引用

# 处理coolmath目录
$coolmathDir = "F:\DATA\MyWorkspace\h5game\traffic games\coolmath"
if (Test-Path -Path $coolmathDir) {
    $htmlFiles = Get-ChildItem -Path $coolmathDir -Filter "*.html"
    foreach ($file in $htmlFiles) {
        $content = Get-Content -Path $file.FullName -Raw
        if ($content -notmatch 'rel="icon"') {
            $titleEnd = $content.IndexOf('</title>')
            if ($titleEnd -gt 0) {
                $faviconCode = '<link rel="icon" href="../favicon.svg" type="image/svg+xml">
    <link rel="icon" href="../favicon.ico" sizes="32x32" type="image/x-icon">
    <link rel="icon" href="../favicon.ico" sizes="16x16" type="image/x-icon">'
                $newContent = $content.Substring(0, $titleEnd + 8) + "`n    " + $faviconCode + $content.Substring($titleEnd + 8)
                Set-Content -Path $file.FullName -Value $newContent
                Write-Host "Added favicon to: $($file.FullName)"
            }
        }
    }
}

# 处理more-games目录
$moreGamesDir = "F:\DATA\MyWorkspace\h5game\traffic games\more-games"
if (Test-Path -Path $moreGamesDir) {
    $htmlFiles = Get-ChildItem -Path $moreGamesDir -Filter "*.html"
    foreach ($file in $htmlFiles) {
        $content = Get-Content -Path $file.FullName -Raw
        if ($content -notmatch 'rel="icon"') {
            $titleEnd = $content.IndexOf('</title>')
            if ($titleEnd -gt 0) {
                $faviconCode = '<link rel="icon" href="../favicon.svg" type="image/svg+xml">
    <link rel="icon" href="../favicon.ico" sizes="32x32" type="image/x-icon">
    <link rel="icon" href="../favicon.ico" sizes="16x16" type="image/x-icon">'
                $newContent = $content.Substring(0, $titleEnd + 8) + "`n    " + $faviconCode + $content.Substring($titleEnd + 8)
                Set-Content -Path $file.FullName -Value $newContent
                Write-Host "Added favicon to: $($file.FullName)"
            }
        }
    }
}

Write-Host "Favicon addition completed for coolmath and more-games directories!"