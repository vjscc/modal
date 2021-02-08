import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import pkg from './package.json'

const name = 'GmAlert'

export default {
  input: 'src/index.js',
  output: [
    {
      name,
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      name,
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    clear({ targets: ['dist'] }),
    resolve(),
    commonjs(),
    eslint({ exclude: 'node_modules' }),
    babel({ exclude: 'node_modules', babelHelpers: 'bundled' })
  ]
}
