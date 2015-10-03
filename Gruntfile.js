//'use strict';

var ngrok = require('ngrok');

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	var config = grunt.file.readYAML('Gruntconfig.yml');



	grunt.initConfig({
		pagespeed: {
			options: {
				nokey: true,
				locale: "en_GB",
				threshold: 40
			},
			local: {
				options: {
					strategy: "desktop"
				}
			},
			mobile: {
				options: {
					strategy: "mobile"
				}
			}
		},

		concat:{
			dist:{
				src: config.jsSrcDir+'*.js',
				dest: config.jsConcatDir+'app.js'
			}
		},

		jshint:{
			all:[
				'Gruntfile.js',
				config.jsSrcDir+"*.js",
				'src/views/js/'+'*.js',
			]
		},

		imagemin:{
			dynamic:{
				files:[{
					expand:true,
					cwd:'src/img',
					src:['*.{png,jpg,gif}'],
					dest:'dist/img'
				}]
			},
			//pizzeria.jpg fails
			/*
			veiw:{
				files:[{
					expand:true,
					cwd:'src/views/images',
					src:['*.{png,jpg,gif}'],
					dest:'dist/views/images'
				}]
			}
			*/
		},

		htmlmin:{
			dist:{
				options:{
					removeComments: true,
					collaspeWhitespace: true
				},
				files: {

					//expand:true,
					//cwd:'src/',
					//src:['**/*.html'],
					//dest:'dist/',

					//'dist/index.html': 'src/index.html',
					'dist/project-2048.html' : 'src/project-2048.html',
					'dist/project-mobile.html': 'src/project-mobile.html',
					'dist/project-webperf.html': 'src/project-webperf.html',
					//'dist/views/pizza.html':'src/views/pizza.html'

				},
			}
		},

		cssmin:{
			target:{
				files:[{
					expand:true,
					cwd:'src/css',
					src:['*.css'],
					dest:'dist/css'
				}]
			},
			views:{
				files:[{
					expand:true,
					cwd:'src/views/css',
					src:['*.css'],
					dest:'dist/views/css'
				}]
			},

		},


		critical: {
			test: {
				options: {
					base: './',
					inline:true,
					minify: true,
					css: [
						'src/css/style.css',
					],

				},
				src:'src/index.html',
				dest: 'dist/index.html'
			},
			views: {
				options: {
					base: './',
					inline:true,
					minify: true,
					css: [
						'src/views/css/style.css',
						'src/views/css/bootstrap-grid.css'
					],

				},
				src:'src/views/pizza.html',
				dest: 'dist/views/pizza.html'
			}
		},

		copy:{
			main: {
				files:[{
					expand:true,
					flatten: true,
					src:['src/views/js/*.js'],
					dest:'dist/views/js/'
				}]
			}
		}



	});


	grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
		var done = this.async();
		var port = 8080;

		ngrok.connect(port, function(err, url) {
			if (err !== null) {
				grunt.fail.fatal(err);
				return done();
			}
			grunt.config.set('pagespeed.options.url', url);
			grunt.task.run('pagespeed');
			done();
		});
	});



	grunt.registerTask('default', [
		//'psi-ngrok',
		'jshint',
		'imagemin',
		'htmlmin',
		'critical',
		'copy',

	]);
};
