// PasswordGenerator.js
// Adam Al-Jumaily
/*

Criteria for a good password:
	1) Pseudorandom
	2) Alphanumeric
	3) Human friendly

	With these criteria in mind, this password generator provides users with pseudorandom
alphanumeric passwords that are easily remembered. The human-friendly nature of these passwords
is achieved by simple placement of numbers (either at the beginning or end of the password), and
the arrangement of vowels and constonants to produce "words" that can be pronounced and therefore easily remembered. Sample passwords generated look like:
	muhaik72
	85fidiai
	651cugoofui
	
	These passwords are secure against dictionary attacks as long as they dont produce an 
actual english word. However, with all passwords, they are vulnerable to brute force attacks.


*/

var password;
var vowels = ['a', 'e', 'i', 'o', 'u'];
var constonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
		   'm', 'n', 'p', 'q', 'r', 's', 't', 'v',
                   'w', 'x', 'y', 'z'];

// Initializes the passwrod generation.
function interfaceCallGenerate(){
	password = [];
	var length = document.getElementById("pwlength").value;
	document.getElementById("pwdisplay").innerHTML = generatePassWord(length);
}

// Generates the password.
function generatePassWord(length){
	// Determine amount of numbers.
	var amountOfNumbers = Math.round(length/4);
	// Fill the password array with vowels.
	for(var i = 0; i < length; i++){
		password[i] = vowels[Math.floor(Math.random()*vowels.length)];
	}
	// Insert constonants based on working length
	insertConstonants(length-amountOfNumbers);
	// Insert numbers.
	insertNumbers(length, amountOfNumbers);

	// Concat the password into a string and return it.
	var pw = "";
	for(var i = 0; i < password.length; i++){
		pw = pw.concat(password[i]);
	}
	return pw;
}

// Inserts constonants into the password so that no two are next to each other.
function insertConstonants(length){
	// Create an array of indices to control where we enter our constonants.
	var pwIndices = [];
	for(var i = 0; i < length; i++){
		pwIndices.push(i);
	}
	// Determine the number of constonants.
	var numOfConstonants = Math.floor(length/2);
	var constonantLocation;

	for(var i = 0; i < numOfConstonants; i++){
		// Randomly choose a constonant.
		var chosenConstonant = Math.floor(Math.random()*constonants.length);
		// If there is nowhere left to insert then break.
		if(pwIndices.length == 0) {
			break;
		// If there is only one spot left to insert then insert there.
		} else if(pwIndices.length == 1) {
			password[pwIndices[0]] = constonants[chosenConstonant];
		} else {
			// Determine where to insert.
			constonantLocation = Math.floor(Math.random()*pwIndices.length);
			// Insert constonant based on the available indices after pruning.
			password[pwIndices[constonantLocation]] = constonants[chosenConstonant];
			
			// If inserting into 1st location and second hasnt been mofidied.
			if(constonantLocation == 0 && 
				pwIndices[constonantLocation] == pwIndices[constonantLocation+1]-1){
				pwIndices.splice(constonantLocation, 2);
			// If inserting into 1st location and second has been modified.
			} else if (constonantLocation == 0 && 
				pwIndices[constonantLocation] != pwIndices[constonantLocation+1]-1){
				pwIndices.splice(constonantLocation, 1);
			// If inserting into last location and prev hasnt been modified.
			} else if (constonantLocation == (pwIndices.length-1) &&
				pwIndices[constonantLocation] == pwIndices[constonantLocation-1]+1) {
				pwIndices.splice(constonantLocation-1, 2);
			// If inserting into last location and prev has been modified.
			} else if (constonantLocation == (pwIndices.length-1) &&
				pwIndices[constonantLocation] != pwIndices[constonantLocation-1]+1){
				pwIndices.splice(constonantLocation, 1);
			// If inserting into position and neither prev nor next has been modified.
			} else if (pwIndices[constonantLocation] == pwIndices[constonantLocation+1]-1
				&& pwIndices[constonantLocation] == pwIndices[constonantLocation-1]+1){
				pwIndices.splice(constonantLocation-1, 3);
			// If inserting into position and only next has been modified.
			} else if (pwIndices[constonantLocation] != pwIndices[constonantLocation+1]-1
				&& pwIndices[constonantLocation] == pwIndices[constonantLocation-1]+1){
				pwIndices.splice(constonantLocation-1, 2);
			// If inserting into position and only prev has been modified.
			} else if (pwIndices[constonantLocation] == pwIndices[constonantLocation+1]-1
				&& pwIndices[constonantLocation] != pwIndices[constonantLocation-1]+1){
				pwIndices.splice(constonantLocation, 2);
			}
		}
	}
}

// Inserts numbers into the password array.
function insertNumbers(length, amountOfNumbers){
	// Determine if we are inserting numbers before or after.
	var insertBefore = Math.round(Math.random());
	// Modify array and insert before.
	if(insertBefore){
		password.splice((password.length-1-amountOfNumbers), amountOfNumbers);
		for(var i = 0; i < amountOfNumbers; i++){
			password.unshift(Math.floor(Math.random()*9));
		}
	// Otherwise, overwrite array values to insert after. 
	} else {
		for(var i = (password.length-amountOfNumbers); i < password.length; i++){
			password[i] = Math.floor(Math.random()*9);
		}
	}
}
