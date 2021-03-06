(function(){
	// Lightweight password strength evaluation
	
	this.scorePassword = function(pass){
		// Ignore common phrases for ranking
		pass = this.ignoreCommonPhrases(pass);
		
		var score = 0;
		if(!pass)
			return score;
		// award every unique letter until 5 repetitions
		var letters = new Object();
		for (var i=0; i<pass.length; i++) {
			letters[pass[i]] = (letters[pass[i]] || 0) + 1;
			score += 5.0 / letters[pass[i]];
		}
		// bonus points for very long length (max: 30)
		if(pass.length > 17){
			score += Math.min((pass.length-17) * 2, 30);
		}
		// bonus points for mixing it up
		var variations = {
			digits: /\d/.test(pass),
			lower: /[a-z]/.test(pass),
			upper: /[A-Z]/.test(pass),
			nonWords: /\W/.test(pass),
		}

		variationCount = 0;
		for (var check in variations) {
			variationCount += (variations[check] == true) ? 1 : 0;
		}
		score += (variationCount - 1) * 7;

		return parseInt(score);
	}
	
	var commonPhrases = ["123", "456", "789", "987", "654", "321", "Pass", "p4ss", "pass", "word", "w0rd", "000", "qwe", "rty", "asd", "fgh", "zxc", "vbn", "abc", "vault", "password"];
	this.ignoreCommonPhrases = function(password){
		for(var i = 0; i < commonPhrases.length; i++){
			password = password.replace(commonPhrases[i], "");
		}
		return password;
	}
	
	this.checkStrength = function(pass){
		var score = this.scorePassword(pass);
		if(score < 50){
			return "Too weak"; 
		} else if(score < 75){
			return "Good";
		} else {
			return "Strong";
		}
	}
}).call(window.PasswordStrength = {});
