console.log('linked');
$(document).ready(function(){
	var $round = $('#round');
	var $redTile = $('#red');
	var $blueTile = $('#blue');
	var $yellowTile = $('#yellow');
	var $greenTile = $('#green');
	var $playButton = $('#play');							//defining of variables
	var $compTurn = $('#computerTurn');
	var $playTurn = $('#playerTurn');
	var $playWon = $('#playerWon');
	var $playLost = $('#playerLost');
	var randomColors=[];
	var playerMoves=[];
	var roundCount=1;
	var $moves = $('#moves');
	


	var getRandomColor=function(){		// this function gets one of 4 colors randomly and pushes them into randomColors array.
		$round.text("Round: " + roundCount); //this displays the round number the player is on
		$playLost.css('visibility','hidden'); //this hides the player lost message
		$compTurn.css('visibility','visible'); //this showes it is the computer's turn message
		var rando=Math.floor(Math.random() * (4 - 1 + 1)) + 1; // from mdn for math.random() definition, gets random number between 1 & 4
		if(rando===1){																
			randomColors.push('red');
			}else if(rando===2){
			randomColors.push('blue');
			}else if(rando===3){								//assigns on of the numbers to a specific color and pushes into array randomColors
			randomColors.push('yellow');
			}else if(rando===4){
			randomColors.push('green');
		}
		randomColors.forEach(animateCompTile); //this is making it so the randomColors array can be aniameted
		setTimeout(function(){$compTurn.css('visibility','hidden')},randomColors.length*1000);	// this modeled after code I found on http://snipplr.com/view/19392/ , it allows the "computer's turn" message to disappear a second after the array has finished animating
		setTimeout(function(){$playTurn.css('visibility','visible')},randomColors.length*1000); // same idea for this one but "Player's Turn" message is made visible
		$moves.text('Moves: '+randomColors.length); //this shows how many moves the computer made
		numMoves = randomColors.length; // this is defining a variable that will be used to show how many moves the player has left to go
	};

	$playButton.on('click',getRandomColor); //this event listener starts the game
	
	var getNumMoves = function(){		//this function shows the player how many moves they have left
		numMoves = numMoves-1;
		$moves.text('Moves: '+numMoves);
	}
	
	$redTile.on('click', getNumMoves);  //these events use the callback function getNumMoves to subtract from the number of moves each time one is clicked
	$blueTile.on('click', getNumMoves);
	$yellowTile.on('click', getNumMoves);
	$greenTile.on('click', getNumMoves);

	


	var animateCompTile = function(name,i){	// this modeled after code I found on snipplr.com, this function will be used to animated the randomColors array.  It ensures there is a delay between each item in the array
		setTimeout(function(){
			$('#'+name).addClass('pulse')
				setTimeout(function(){
				$('#'+name).removeClass('pulse')
				},500)
			},i*800)
	};

	var playedRed=function(){ 		//this records the palyer's choices into an array and adds animation on the div on which they selected
		playerMoves.push('red');
		$redTile.addClass('pulse');
		setTimeout(function(){$redTile.removeClass('pulse')}, 500);
	};
	$redTile.on('click',playedRed);

	var playedBlue=function(){		//this records the palyer's choices into an array and adds animation on the div on which they selected
		playerMoves.push('blue');
		$blueTile.addClass('pulse');
		setTimeout(function(){$blueTile.removeClass('pulse')}, 500);
	};
	$blueTile.on('click',playedBlue);

	var playedYellow=function(){		//this records the palyer's choices into an array and adds animation on the div on which they selected
		playerMoves.push('yellow');
		$yellowTile.addClass('pulse');
		setTimeout(function(){$yellowTile.removeClass('pulse')}, 500);
	};
	$yellowTile.on('click',playedYellow);
	
	var playedGreen=function(){		//this records the palyer's choices into an array and adds animation on the div on which they selected
		playerMoves.push('green');
		$greenTile.addClass('pulse');
		setTimeout(function(){$greenTile.removeClass('pulse')}, 500);
	};
	$greenTile.on('click',playedGreen);

var compareArrays = function(){ 		// this function is used to compare the player's choices with the computers and will notify the player if they have won or lost
	if(event.which===13){
		$playTurn.css('visibility','hidden');
		roundCount+=1;
		for(var i=0; i<randomColors.length; i++){
			if(randomColors[i]!==playerMoves[i]){
				randomColors=[];
				playerMoves=[];
				$round.text("Round: " + roundCount);
				roundCount=0;
				$playLost.css('visibility','visible');
				return;
			}else{
				var istrue = true;
			}
		};
		if(istrue){
			$playWon.css('visibility','visible');
			playerMoves=[];
			setTimeout(function(){
				$playWon.css('visibility','hidden')},1500);
			setTimeout(getRandomColor, 2500);

		}

	}
};

$(document).keypress(compareArrays); // this event listener signifies the player has played their turn and is submitting their answer for review.  the compareArrays function is triggered by this listener event


});