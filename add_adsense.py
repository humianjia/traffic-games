import os
import re

# Google AdSense 代码
adsense_code = '''    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7534347140708021"
        crossorigin="anonymous"></script>
'''

def add_adsense_to_file(filepath):
    """为单个HTML文件添加AdSense代码"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经有AdSense代码
        if 'adsbygoogle.js' in content:
            print(f"跳过 (已有AdSense): {filepath}")
            return
        
        # 在 </head> 前添加AdSense代码
        # 尝试在 <link rel="stylesheet"> 之后添加
        pattern = r'(<link[^>]*stylesheet[^>]*>)'
        matches = list(re.finditer(pattern, content))
        
        if matches:
            # 在最后一个stylesheet链接后添加
            last_match = matches[-1]
            insert_pos = last_match.end()
            new_content = content[:insert_pos] + '\n' + adsense_code + content[insert_pos:]
        else:
            # 如果没有找到stylesheet，在 </head> 前添加
            head_end = content.find('</head>')
            if head_end == -1:
                print(f"跳过 (找不到</head>): {filepath}")
                return
            new_content = content[:head_end] + adsense_code + content[head_end:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"已添加: {filepath}")
        
    except Exception as e:
        print(f"错误 {filepath}: {e}")

def process_directory(directory):
    """递归处理目录中的所有HTML文件"""
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                add_adsense_to_file(filepath)
                count += 1
    return count

if __name__ == '__main__':
    base_dir = r'f:\DATA\MyWorkspace\h5game\traffic games'
    
    # 排除已经处理的文件
    exclude_files = ['index.html', 'categories.html']
    
    print("开始添加 Google AdSense 代码到所有HTML文件...")
    print("-" * 60)
    
    total = 0
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.html'):
                # 跳过根目录下已处理的文件
                if root == base_dir and file in exclude_files:
                    continue
                # 跳过 games/traffic-jam-3d.html (已处理)
                if 'games' in root and file == 'traffic-jam-3d.html':
                    continue
                    
                filepath = os.path.join(root, file)
                add_adsense_to_file(filepath)
                total += 1
    
    print("-" * 60)
    print(f"处理完成! 共处理 {total} 个HTML文件")
