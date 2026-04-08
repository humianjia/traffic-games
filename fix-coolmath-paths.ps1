# 批量修复coolmath目录下HTML文件中的more-games-data.js路径

# 获取coolmath目录下的所有HTML文件
$htmlFiles = Get-ChildItem -Path "f:\DATA\MyWorkspace\h5game\traffic games\coolmath" -Filter "*.html"

# 遍历每个HTML文件
foreach ($file in $htmlFiles) {
    # 读取文件内容
    $content = Get-Content -Path $file.FullName -Raw
    
    # 替换错误的路径
    $newContent = $content -replace '../js/coolmath/more-games-data.js', '../js/more-games/more-games-data.js'
    
    # 写入修改后的内容
    Set-Content -Path $file.FullName -Value $newContent
    
    Write-Host "修复了文件: $($file.Name)"
}

Write-Host "所有文件修复完成!"