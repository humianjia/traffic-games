# 批量为HTML文件添加favicon引用

# 设置根目录
$rootDir = "f:\DATA\MyWorkspace\h5game\traffic games"

# 查找所有HTML文件
$htmlFiles = Get-ChildItem -Path $rootDir -Recurse -Filter "*.html"

# 定义基本的favicon代码
$faviconBaseCode = '<link rel="icon" href="{0}favicon.svg" type="image/svg+xml">
    <link rel="icon" href="{0}favicon.ico" sizes="32x32" type="image/x-icon">
    <link rel="icon" href="{0}favicon.ico" sizes="16x16" type="image/x-icon">'

# 遍历每个HTML文件
foreach ($file in $htmlFiles) {
    # 计算文件相对于根目录的路径
    $relativePath = $file.FullName.Substring($rootDir.Length)
    # 计算目录深度（根据反斜杠的数量）
    $depth = [Math]::Max(0, ($relativePath -split '\\').Count - 2)
    # 生成相对路径前缀
    $pathPrefix = "../" * $depth
    # 生成完整的favicon代码
    $faviconCode = $faviconBaseCode -f $pathPrefix
    
    # 读取文件内容
    $content = Get-Content -Path $file.FullName -Raw
    
    # 检查是否已经有favicon引用
    if ($content -match 'rel="icon"') {
        # 替换现有的favicon引用（匹配所有类型）
        $newContent = $content -replace '<link rel="icon"[^>]*>', ''
        # 找到</title>标签的位置
        $titleEnd = $newContent.IndexOf('</title>')
        if ($titleEnd -gt 0) {
            # 在</title>标签后添加favicon代码
            $newContent = $newContent.Substring(0, $titleEnd + 8) + "`n    " + $faviconCode + $newContent.Substring($titleEnd + 8)
            
            # 写回文件
            Set-Content -Path $file.FullName -Value $newContent
            Write-Host "Updated favicon in: $($file.FullName)"
        }
    } else {
        # 找到</title>标签的位置
        $titleEnd = $content.IndexOf('</title>')
        if ($titleEnd -gt 0) {
            # 在</title>标签后添加favicon代码
            $newContent = $content.Substring(0, $titleEnd + 8) + "`n    " + $faviconCode + $content.Substring($titleEnd + 8)
            
            # 写回文件
            Set-Content -Path $file.FullName -Value $newContent
            Write-Host "Added favicon to: $($file.FullName)"
        }
    }
}

Write-Host "Favicon addition completed!"