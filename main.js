console.log('linked');

var $round;
var $redTile;
var $blueTile;
var $yellowTile;
var $greenTile;
var $playButton;
var $compTurn;
var $playTurn;
var $playWon;
var $playLost;
var randomColors;
var playerMoves;
var roundCount;
var $moves;
var $title;
var tilesArray;
var $board;
var numMoves;
var beTrue;
var $yourGame;
var $three;
var $two;
var $one;
var countDown;
var $redTone;

var animateCompTile = function(name,i){	// this modeled after code I found on snipplr.com, this function will be used to animated the randomColors array.  It ensures there is a delay between each item in the array
	setTimeout(function(){
		$('#'+name).addClass('pulse');
		setTimeout(function(){
			$('#'+name).removeClass('pulse');
		},500);
	},i*800);
};

var animateTiles = function(){		//this function creates the animation a few seconds after page load.
	tilesArray.forEach(animateCompTile);
};


var startCountDown = function(name,i){
	$board.hide();
	setTimeout(function(){
		$('#' + name).show();
		setTimeout(function(){
			$('#'+name).toggle();
		},1000);
	},i*1100);
	setTimeout(function(){
		$board.show();
	},4500);
};

var getRandomColor = function(){		// this function gets one of 4 colors randomly and pushes them into randomColors array.
	$round.text("Round: " + roundCount); //this displays the round number the player is on
	$playLost.hide(); //this hides the player lost message
	$compTurn.toggle(); //this shows it is the computer's turn message
	console.log($compTurn);
	var rando = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // from mdn for math.random() definition, gets random number between 1 & 4
	// TODO this could be a switch
	if(rando===1){																
		randomColors.push('red');
	} else if(rando===2){
		randomColors.push('blue');
	} else if(rando===3){								//assigns on of the numbers to a specific color and pushes into array randomColors
		randomColors.push('yellow');
	} else if(rando===4){
		randomColors.push('green');
	}
	randomColors.forEach(animateCompTile); //this is making it so the randomColors array can be aniameted
	setTimeout(function(){
		$compTurn.hide();
	}, randomColors.length * 1000);	// this modeled after code I found on http://snipplr.com/view/19392/ , it allows the "computer's turn" message to disappear a second after the array has finished animating
	setTimeout(function(){
		$playTurn.show();
	},randomColors.length * 1000); // same idea for this one but "Player's Turn" message is made visible
	$moves.show();
	//this shows how many moves the computer made
	numMoves = randomColors.length; // this is defining a variable that will be used to show how many moves the player has left to go
	$('#movesCount').text(numMoves);
	console.log(randomColors);	
};

var getNumMoves = function(){	
	console.log('getNumMoves', numMoves);	//this function shows the player how many moves they have left
	$('#movesCount').text(numMoves - 1);
};

var playedRed = function(){ 	//this records the palyer's choices into an array and adds animation on the div on which they selected
	document.getElementById('redTone').play();
	playerMoves.push('red');
	$redTile.addClass('pulse');
	console.log(playerMoves);
	setTimeout(function(){
		$redTile.removeClass('pulse');
	}, 500);
};

var playedBlue=function(){		//this records the palyer's choices into an array and adds animation on the div on which they selected
	document.getElementById('blueTone').play();
	playerMoves.push('blue');
	$blueTile.addClass('pulse');
	console.log(playerMoves);
	setTimeout(function(){
		$blueTile.removeClass('pulse');
	}, 500);
};


var playedYellow=function(){	//this records the palyer's choices into an array and adds animation on the div on which they selected
	document.getElementById('yellowTone').play();
	playerMoves.push('yellow');
	$yellowTile.addClass('pulse');
	console.log(playerMoves);
	setTimeout(function(){
		$yellowTile.removeClass('pulse');
	}, 500);
};


var playedGreen=function(){		//this records the palyer's choices into an array and adds animation on the div on which they selected
	document.getElementById('greenTone').play();
	playerMoves.push('green');
	$greenTile.addClass('pulse');
	console.log(playerMoves);
	setTimeout(function(){
		$greenTile.removeClass('pulse');
	}, 500);
};

var compareArrays = function(){ 		// this function is used to compare the player's choices with the computers and will notify the player if they have won or lost
	if(event.which===13){
		$playTurn.hide();
		roundCount+=1;
		console.log(randomColors);
		for(var i=0; i<randomColors.length; i++){
			if(randomColors[i]!==playerMoves[i]){
				$round.text("Round: " + roundCount);
				$playLost.show();
				$redTile.off('click',playedRed);
				$blueTile.off('click',playedBlue);
				$yellowTile.off('click',playedYellow);
				$greenTile.off('click',playedGreen);
				$(document).unbind('keypress');
				$redTile.off('click', getNumMoves);
				$blueTile.off('click', getNumMoves);
				$yellowTile.off('click', getNumMoves);
				$greenTile.off('click', getNumMoves);
				$moves.hide();
				return;
			} else {
				beTrue = true;
			}
		}
		if(beTrue){
			$playWon.show();
			playerMoves = [];
			setTimeout(function(){
				$playWon.hide();
			},1500);
			setTimeout(getRandomColor, 2500);
		}
	}
}; 

var resetGame = function(){		//should the player decide to reset the game in the middle of it they can just click on let's play button and will reset game!
	randomColors=[];
	numMoves = 0;
	playerMoves = [];
	roundCount = 1;
	$moves.hide();
	$playLost.hide();
	$playTurn.hide();
	$redTile.on('click',playedRed);
	$blueTile.on('click',playedBlue);
	$yellowTile.on('click',playedYellow);
	$greenTile.on('click',playedGreen);
	$(document).keypress(compareArrays);  // this event listener signifies the player has played their turn and is submitting their answer for review.  the compareArrays function is triggered by this listener event
	$redTile.on('click', getNumMoves);
	$blueTile.on('click', getNumMoves);
	$yellowTile.on('click', getNumMoves);
	$greenTile.on('click', getNumMoves);
};

$(document).ready(function(){
	$round = $('#round');
	$redTile = $('#red');
	$blueTile = $('#blue');
	$yellowTile = $('#yellow');
	$greenTile = $('#green');
	$playButton = $('#play');							//defining of variables
	$compTurn = $('#computerTurn');
	$playTurn = $('#playerTurn');
	$playWon = $('#playerWon');
	$playLost = $('#playerLost');
	randomColors = [];
	playerMoves = [];
	roundCount = 1;
	$moves = $('#moves');
	$title = $('#simon');
	tilesArray=['red','blue','green','yellow'];
	$board = $('#board');
	$yourGame = $('#yourGame').hide();
	$three = $('#three').hide();
	$two = $('#two').hide();
	$one = $('#one').hide();
	countDown =['yourGame', 'three', 'two', 'one'];
	$redTone = $('#redTone');

	setTimeout(animateTiles,1500); // this time out puts the above callback funtion into action 1.5 seconds after loading
	setTimeout(function(){
		$board.addClass('rollIn'); // this makes the board roll into the screen
	},250);
	setTimeout(function(){
		$title.addClass('tada');
	},250);

	$playButton.on('click', function(){
		countDown.forEach(startCountDown);
	});

	$playButton.on('click', function(){
		setTimeout(getRandomColor,5500);
	}); //this event listener starts the game.  I created a delay because the putton also has an event listener for resetting the game so in order for the game not to be reset at the same time that it starts created a half second delay.

	$playButton.on('click',resetGame);

}); // document.ready