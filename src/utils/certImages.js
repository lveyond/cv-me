// 证书查看密码（仅内存，刷新后失效）
export const CERT_PASSWORD = 'Qq654321'

export const verifyCertPassword = (input) => input === CERT_PASSWORD

// 资质/荣誉标签索引 -> 证书图片（public 目录下，路径 /xxx.jpg）
export const QUALIFICATIONS_IMAGES = {
  0: 'senior.jpg',   // 副高级工程师
  1: 'sf.jpg',       // 软件设计师
  2: 'senior.jpg',   // 信息系统项目管理师
  3: 'bcm.jpg',      // 区块链技术软件开发师（中级）
}

export const HONORS_IMAGES = {
  0: 'pk.jpg',       // 2024年南京浦口区优秀中青年人才
  1: 'dataxjx.jpg',  // 2024年"数据要素x"江西分赛三等奖
  2: 'xzxlh.jpg',    // 上饶信州区2024年第二批数字"新蓝海"人才
  3: 'szzg3.jpg',    // 2023数字中国创新大赛三等奖
}

export const getCertImage = (section, index) => {
  const map = section === 'qualifications' ? QUALIFICATIONS_IMAGES : HONORS_IMAGES
  const file = map[index]
  return file ? `/${file}` : null
}
