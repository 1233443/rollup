// Rollup plugins
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import jsx from 'rollup-plugin-jsx';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';


import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript';
import globals from 'rollup-plugin-node-globals'


import postcss from 'rollup-plugin-postcss';
// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import will_change from "postcss-will-change"; //提前让浏览器知道某些元素设计的动画
import autoprefixer from "autoprefixer";
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext'; //未来的css语法

//后处理
//兼容ie老版本
import color_rgba_fallback from "postcss-color-rgba-fallback"; //十六进制颜色降级处理
import opacity from "postcss-opacity"; //ie8不支持opacity
import pseudoelements from "postcss-pseudoelements"; //将:: 转成:
import vmin from "postcss-vmin"; //IE9中并不支持viewport相对单位vmin，但可以使用vm作为等效的单位
import pixrem from "pixrem"; //IE8一直都不支持rem单位，而且在IE9和IE10中他们都不支持伪元素和font的缩写

//优化，压缩
import atImport from "postcss-import"; //内联样式表，合并css  @import 'xxx.css';//它能够自动发现bower_components或node_modules文件夹内的CSS文件位置。
import mqpacker from "css-mqpacker"; //结合匹配的媒体查询，媒体查询可以重复编写
import cssnano from 'cssnano'; //代码压缩和优化，

//预处理，前处理
import precss from "precss";

export default {
	entry: 'src/app.js',
	dest: 'build/js/main.min.js',
	format: 'iife',//amd /  es6 / iife / umd
	sourceMap: 'inline',//true,生成独立的map文件， inline直接内联在bounld里
	plugins: [
		postcss({
			plugins: [
				simplevars(),
				nested(),
				cssnext({
					warnForDuplicates: false,
				}),
				atImport(),
				color_rgba_fallback(),
				pseudoelements(),
				opacity(),
				will_change(),
				autoprefixer({
					browsers: ['last 1 version']
				}),
				mqpacker(),
				precss(),
				cssnano()
			],
			extensions: ['.css'],
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs({
			include: 'node_modules/**',
			namedExports: {
				'node_modules/react-dom/index.js': ['render'],
			},
		}),
		typescript({
			typescript: require("typescript"),
			tsconfig: true
		}),
		babel({
			exclude: 'node_modules/**',
			babelrc: true,
		}),
		globals(),
		replace({
			exclude: 'node_modules/**',
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		jsx({
			factory: 'React.createElement'
		}),
		(process.env.NODE_ENV === 'production' && uglify()),
		(process.argv.indexOf('--live') !== -1 && livereload('build')),
	],
};

 
/*presets: ['es2015-rollup', 'react','stage-0']*/
