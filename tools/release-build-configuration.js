( {
	appDir : "../src",
	baseUrl : "billboard/javascripts",
	dir : "../build/release",
	optimize : "uglify",
	uglify : {
		toplevel : true,
		ascii_only : false,
		beautify : false
	},
	optimizeCss : "standard",
	modules : [{
		name : "Billboard"
	}]
})