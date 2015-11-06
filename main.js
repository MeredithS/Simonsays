console.log('linked');
$(document).ready(function(){
	var $round = $('#round');
	var $redTile = $('#red');
	var $blueTile = $('#blue');
	var $yellowTile = $('#yellow');
	var $greenTile = $('#green');
	var $playButton = $('#play');
	var $compTurn = $('#computerTurn');
	var $playTurn = $('#playerTurn');
	var $playWon = $('#playerWon');
	var $playLost = $('#playerLost');
	var randomColors=[];
	var playerMoves=[];
	var roundCount=1;
	var playerCount=0;


	var getRandomColor=function(){		// this function gets one of 4 colors randomly and pushes them into randomColors array.
		$round.text("Round: " + roundCount);
		$playLost.css('visibility','hidden');
		$compTurn.css('visibility','visible');
		var rando=Math.floor(Math.random() * (4 - 1 + 1)) + 1; // from mdn for math.random() definition
		if(rando===1){																
			randomColors.push('red');
			}else if(rando===2){
			randomColors.push('blue');
			}else if(rando===3){
			randomColors.push('yellow');
			}else if(rando===4){
			randomColors.push('green');
		}
		randomColors.forEach(animateCompTile); //this is making it so when the computer gets the tiles it chooses and saves into an array will animate
		setTimeout(function(){$compTurn.css('visibility','hidden')},randomColors.length*1000);	// this modeled after code I found on http://snipplr.com/view/19392/
		setTimeout(function(){$playTurn.css('visibility','visible')},randomColors.length*1000);
		console.log(playerCount);
		console.log(randomColors);
	};

	$playButton.on('click',getRandomColor);


	var animateCompTile = function(name,i){	// this modeled after code I found on snipplr.com
		setTimeout(function(){
			$('#'+name).addClass('pulse')
				setTimeout(function(){
				$('#'+name).removeClass('pulse')
				},500)
			},i*800)
	};

	var playedRed=function(){
		playerMoves.push('red');
		$redTile.addClass('pulse');
		setTimeout(function(){$redTile.removeClass('pulse')}, 500);
		console.log(playerMoves);
	};
	$redTile.on('click',playedRed);

	var playedBlue=function(){
		playerMoves.push('blue');
		$blueTile.addClass('pulse');
		setTimeout(function(){$blueTile.removeClass('pulse')}, 500);
		console.log(playerMoves);
	};
	$blueTile.on('click',playedBlue);

	var playedYellow=function(){
		playerMoves.push('yellow');
		$yellowTile.addClass('pulse');
		setTimeout(function(){$yellowTile.removeClass('pulse')}, 500);
		console.log(playerMoves);
	};
	$yellowTile.on('click',playedYellow);
	
	var playedGreen=function(){
		playerMoves.push('green');
		$greenTile.addClass('pulse');
		setTimeout(function(){$greenTile.removeClass('pulse')}, 500);
		console.log(playerMoves);
	};
	$greenTile.on('click',playedGreen);

var compareArrays = function(){
	if(event.which===13){
		$playTurn.css('visibility','hidden');
		roundCount+=1;
		playerCount+=1;
		console.log(playerCount);
		for(var i=0; i<randomColors.length; i++){
			if(randomColors[i]!==playerMoves[i]){
				randomColors=[];
				playerMoves=[];
				roundCount=0;
				$round.text("Round: " + roundCount);
				$playLost.css('visibility','visible');
				return;
			}else{
				var istrue = true;
			}
		}
		if(istrue){
			$playWon.css('visibility','visible');
			playerMoves=[];
			setTimeout(function(){
				$playWon.css('visibility','hidden')},1500);
			setTimeout(getRandomColor, 2500);

		}

	}
};

$(document).keypress(compareArrays);


});