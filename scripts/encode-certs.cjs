const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const MAX_B64_BYTES = 45 * 1024
const items = [
  { name: 'PROFILE_PHOTO', file: 'public/profile.jpg', maxWidth: 320 },
  { name: 'CERT_SENIOR', file: 'public/senior.jpg', maxWidth: 600 },
  { name: 'CERT_SF', file: 'public/sf.jpg', maxWidth: 600 },
  { name: 'CERT_BCM', file: 'public/bcm.jpg', maxWidth: 600 },
  { name: 'CERT_PK', file: 'public/pk.jpg', maxWidth: 600 },
  { name: 'CERT_DATAXJX', file: 'public/dataxjx.jpg', maxWidth: 600 },
  { name: 'CERT_XZXLH', file: 'public/xzxlh.jpg', maxWidth: 600 },
  { name: 'CERT_SZZG3', file: 'public/szzg3.jpg', maxWidth: 600 }
]

async function compressAndEncode(filePath, maxWidth) {
  const sharp = require('sharp')
  const sizes = [[maxWidth, 800], [500, 600], [400, 500], [300, 400]]
  for (const [w, h] of sizes) {
    for (let quality = 50; quality >= 15; quality -= 5) {
      const buf = await sharp(filePath)
        .resize(w, h, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality })
        .toBuffer()
      const b64 = buf.toString('base64')
      if (Buffer.byteLength(b64, 'utf8') <= MAX_B64_BYTES) return b64
    }
  }
  const buf = await sharp(filePath)
    .resize(256, 384, { fit: 'inside' })
    .jpeg({ quality: 15 })
    .toBuffer()
  return buf.toString('base64')
}

async function main() {
  console.log('Compressing images (GitHub Secret limit 48KB)...\n')
  for (const { name, file, maxWidth } of items) {
    const filePath = path.join(root, file)
    if (fs.existsSync(filePath)) {
      try {
        const b64 = await compressAndEncode(filePath, maxWidth)
        const b64Len = Buffer.byteLength(b64, 'utf8')
        const b64Size = (b64Len / 1024).toFixed(1)
        const outPath = path.join(__dirname, name + '.txt')
        fs.writeFileSync(outPath, b64, 'utf8')
        const ok = b64Len <= MAX_B64_BYTES ? 'OK' : 'WARN: over 45KB'
        console.log('  ' + name + ' -> ' + name + '.txt (' + b64Size + 'KB) ' + ok)
      } catch (e) {
        console.log('  ' + name + ' ERROR: ' + e.message)
        console.log('  Run: npm install')
      }
    } else {
      console.log('  Skip ' + file + ' (not found)')
    }
  }
  console.log('\nDone. Add to GitHub Secrets.')
}

main().catch(console.error)
