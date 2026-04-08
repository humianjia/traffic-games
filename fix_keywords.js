const fs = require('fs');
const path = require('path');

const categories = ['clicker', 'driving', 'escape', 'parking', 'racing', 'trafficControl'];
const baseDir = 'f:\\DATA\\MyWorkspace\\h5game\\traffic games';
let fixedCount = 0;

categories.forEach(category => {
    const categoryPath = path.join(baseDir, category);
    if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.html'));
        files.forEach(file => {
            const filePath = path.join(categoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            const match = content.match(/<meta name="keywords" content="([^"]+)"/);
            if (match) {
                const currentKeywords = match[1];
                if (!currentKeywords.toLowerCase().startsWith('traffic games')) {
                    const newKeywords = `traffic games, ${currentKeywords}`;
                    const newContent = content.replace(
                        `<meta name="keywords" content="${currentKeywords}"`,
                        `<meta name="keywords" content="${newKeywords}"`
                    );
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Fixed: ${filePath}`);
                    fixedCount++;
                } else {
                    console.log(`Skipped: ${filePath}`);
                }
            }
        });
    }
});

console.log('');
console.log(`Total files fixed: ${fixedCount}`);
