const fs = require('fs')
const path = require('path')

const paths = ['../dist/browser', '../dist/es']

paths.forEach(dirPath => {
  fs.readdir(path.join(__dirname, dirPath), (err, files) => {
    if (err) throw err
    const declarations = files.filter(file => file.includes('.d.ts'))
    declarations.forEach(declaration => {
      const declarationPath = path.join(__dirname, dirPath, declaration)
      fs.rm(declarationPath, () => {
        console.log(`✔ ${declarationPath} successfully removed.`)
      })
    })
  })
})
