import { resolve } from 'path'
import rollupTs from 'rollup-plugin-typescript2'
import rollupDts from 'rollup-plugin-dts'
import rollupJson from '@rollup/plugin-json'
import rollupNodeResolve from '@rollup/plugin-node-resolve'

export default [
	{
		input: './src/core/index.ts',
		output: [
			{
				file: resolve(__dirname, './lib/index.esm.js'),
				format: 'esm',
				exports: 'auto'
			},
			{
				file: resolve(__dirname, './lib/index.cjs.js'),
				format: 'cjs',
				exports: 'auto'
			},
			{
				file: resolve(__dirname, './lib/index.umd.js'),
				format: 'umd',
				name: 'BuriedPointTracker'
			}
		],
		plugins: [rollupTs(), rollupJson(), rollupNodeResolve()]
	},
	{
		input: './src/core/index.ts',
		output: {
			file: resolve(__dirname, './lib/index.d.ts'),
			format: 'esm'
		},
		plugins: [
			rollupDts({
				compilerOptions: {
					baseUrl: '.',
					paths: {
						'@/*': ['src/*']
					}
				}
			})
		]
	}
]
