#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const distPath = path.join(__dirname, '../build')
const isDistExists = fs.existsSync(distPath)
if (isDistExists) {
  fs.rmdir(distPath, { recursive: true }, err => {
    if (err) throw err
  })
}
