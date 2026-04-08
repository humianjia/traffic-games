import os
import re

def fix_keywords_in_file(file_path):
    """将traffic games添加到keywords的第一位"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 查找meta keywords标签
        pattern = r'<meta name="keywords" content="([^"]+)"'
        match = re.search(pattern, content)
        
        if match:
            current_keywords = match.group(1)
            # 检查是否已经有traffic games
            if not current_keywords.lower().startswith('traffic games'):
                # 在开头添加traffic games
                new_keywords = f"traffic games, {current_keywords}"
                new_content = content.replace(
                    f'<meta name="keywords" content="{current_keywords}"',
                    f'<meta name="keywords" content="{new_keywords}"'
                )
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✓ Fixed: {file_path}")
                return True
            else:
                print(f"  Skipped (already has traffic games first): {file_path}")
                return False
        return False
    except Exception as e:
        print(f"✗ Error: {file_path} - {e}")
        return False

def main():
    base_dir = r"f:\DATA\MyWorkspace\h5game\traffic games"
    categories = ['clicker', 'driving', 'escape', 'parking', 'racing', 'trafficControl']
    
    fixed_count = 0
    
    for category in categories:
        category_path = os.path.join(base_dir, category)
        if os.path.exists(category_path):
            for filename in os.listdir(category_path):
                if filename.endswith('.html'):
                    file_path = os.path.join(category_path, filename)
                    if fix_keywords_in_file(file_path):
                        fixed_count += 1
    
    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == "__main__":
    main()
