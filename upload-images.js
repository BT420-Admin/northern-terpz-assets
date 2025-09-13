// upload-images.js
const { v2: cloudinary } = require('cloudinary');
const { execSync } = require('child_process');

// No need to call cloudinary.config()—SDK reads CLOUDINARY_URL automatically
async function main() {
  // Find all images you’ve added
  const files = execSync('git diff --name-only HEAD~1 HEAD')
    .toString()
    .split('\n')
    .filter(f => f.startsWith('assets/images/'));

  for (const file of files) {
    try {
      const res = await cloudinary.uploader.upload(file, {
        folder: 'northern-terpz',
        public_id: file.replace('assets/images/', '').split('.')[0],
        upload_preset: 'unsigned_assets'
      });
      console.log(`✔ Uploaded ${file} → ${res.secure_url}`);
    } catch (err) {
      console.error(`✖ Failed ${file}:`, err.message);
    }
  }
}

main();
