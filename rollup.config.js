import path from 'path'
import pkg from './package.json'

import clear from 'rollup-plugin-clear'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'

/** @type import('rollup').RollupOptions */
const config = {
  input: path.join(__dirname, 'src/index.ts'),
  output: [
    {
      name: pkg.global,
      file: pkg.main,
      format: 'umd',
      exports: 'auto'
    },
    {
      name: pkg.global,
      file: pkg.browser,
      format: 'iife',
      exports: 'auto',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'auto'
    }
  ],

  plugins: [
    clear({
      targets: ['dist']
    }),
    resolve(),
    commonjs(),
    ts({
      transpiler: 'babel'
    })
  ]
}

export default config
