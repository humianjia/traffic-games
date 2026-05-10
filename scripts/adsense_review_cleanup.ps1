$ErrorActionPreference = "Stop"

$legacyDirs = @(
    "racing",
    "driving",
    "parking",
    "trafficControl",
    "escape",
    "trivia",
    "clicker",
    "twoPlayer"
)

$adsensePattern = '(?ms)^[ \t]*<!-- Google AdSense -->\r?\n[ \t]*<script async src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-7534347140708021"\s*\r?\n?[ \t]*crossorigin="anonymous"></script>\r?\n?'
$gaScriptPattern = "(?ms)^[ \t]*<!-- Google tag \(gtag\.js\) -->\r?\n[ \t]*<script async src=""https://www\.googletagmanager\.com/gtag/js\?id=G-VWTXKBQEVM""></script>\r?\n[ \t]*<script>\r?\n.*?gtag\('config', 'G-VWTXKBQEVM'\);\r?\n[ \t]*</script>\r?\n?"
$robotsPattern = '<meta name="robots" content="index, follow"\s*/?>'
$robotsReplacement = '<meta name="robots" content="noindex, follow" />'

$updatedFiles = @()

foreach ($dir in $legacyDirs) {
    Get-ChildItem -Path $dir -Filter *.html -File | ForEach-Object {
        $path = $_.FullName
        $content = Get-Content -Path $path -Raw
        $original = $content

        $content = [regex]::Replace($content, $adsensePattern, "")
        $content = [regex]::Replace($content, $gaScriptPattern, "")
        $content = [regex]::Replace($content, $robotsPattern, $robotsReplacement)

        if ($content -ne $original) {
            Set-Content -Path $path -Value $content -NoNewline
            $updatedFiles += $path
        }
    }
}

Write-Output ("Updated files: " + $updatedFiles.Count)
$updatedFiles
