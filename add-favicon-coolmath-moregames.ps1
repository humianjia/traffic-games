# 为coolmath和more-games目录中的HTML文件添加favicon引用

# 设置根目录
$rootDir = "F:\DATA\MyWorkspace\h5game\traffic games"

# 定义需要处理的目录
$dirsToProcess = @("coolmath", "more-games")

# 遍历每个目录
foreach ($dir in $dirsToProcess) {
    $dirPath = Join-Path -Path $rootDir -ChildPath $dir
    if (Test-Path -Path $dirPath) {
        # 查找目录中的HTML文件
        $htmlFiles = Get-ChildItem -Path $dirPath -Filter "*.html"
        
        # 遍历每个HTML文件
        foreach ($file in $htmlFiles) {
            # 读取文件内容
            $content = Get-Content -Path $file.FullName -Raw
            
            # 检查是否已经有favicon引用
            if ($content -notmatch 'rel="icon"') {
                # 找到</title>标签的位置
                $titleEnd = $content.IndexOf('</title>')
                if ($titleEnd -gt 0) {
                    # 生成favicon代码
                    $faviconCode = '<link rel="icon" href="../favicon.svg" type="image/svg+xml">
    <link rel="icon" href="../favicon.ico" sizes="32x32" type="image/x-icon">
    <link rel="icon" href="../favicon.ico" sizes="16x16" type="image/x-icon">'
                    
                    # 在</title>标签后添加favicon代码
                    $newContent = $content.Substring(0, $titleEnd + 8) + "`n    " + $faviconCode + $content.Substring($titleEnd + 8)
                    
                    # 写回文件
                    Set-Content -Path $file.FullName -Value $newContent
                    Write-Host "Added favicon to: $($file.FullName)"
                }
            }
        }
    }
}

Write-Host "Favicon addition completed for coolmath and more-games directories!"