import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	envDir: resolve(__dirname, './'),
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@assets': resolve(__dirname, './src/assets'),
			'@components': resolve(__dirname, './src/components'),
			'@hooks': resolve(__dirname, './src/hooks'),
			'@models': resolve(__dirname, './src/models'),
			'@services': resolve(__dirname, './src/services'),
			'@store': resolve(__dirname, './src/store'),
			'@utils': resolve(__dirname, './src/utils'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	build: {
		// sourcemap: true,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			sourceMap: true,
			format: {
				comments: false,
			},
		},
		rollupOptions: {
			output: {
				// manualChunks(id) {
				// 	if (id.includes('node_modules')) {
				// 		return id.toString().split('node_modules/')[1].split('/')[0].toString().replace('@', 'dog_')
				// 	}
				// },
				// sourcemap: true,
			},
			plugins: [],
		},
	},
})
