const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const items = [
  { name: 'PROFILE_PHOTO', file: 'public/profile.jpg' },
  { name: 'CERT_SENIOR', file: 'public/senior.jpg' },
  { name: 'CERT_SF', file: 'public/sf.jpg' },
  { name: 'CERT_BCM', file: 'public/bcm.jpg' },
  { name: 'CERT_PK', file: 'public/pk.jpg' },
  { name: 'CERT_DATAXJX', file: 'public/dataxjx.jpg' },
  { name: 'CERT_XZXLH', file: 'public/xzxlh.jpg' },
  { name: 'CERT_SZZG3', file: 'public/szzg3.jpg' }
]

console.log('Generating base64...\n')

items.forEach(({ name, file }) => {
  const filePath = path.join(root, file)
  if (fs.existsSync(filePath)) {
    const buf = fs.readFileSync(filePath)
    const b64 = buf.toString('base64')
    const outPath = path.join(__dirname, name + '.txt')
    fs.writeFileSync(outPath, b64, 'utf8')
    console.log('  ' + name + ' -> scripts/' + name + '.txt')
  } else {
    console.log('  Skip ' + file + ' (not found)')
  }
})

console.log('\nDone. Add to GitHub Secrets: PROFILE_PHOTO, CERT_SENIOR, CERT_SF, CERT_BCM, CERT_PK, CERT_DATAXJX, CERT_XZXLH, CERT_SZZG3')
