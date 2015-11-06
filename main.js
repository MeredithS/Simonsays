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
	var roundCount=0;
	var playerCount=0;


	var getRandomColor=function(){
		$compTurn.css('visibility','visible');
		var rando=Math.floor(Math.random() * (4 - 1 + 1)) + 1; // from mdn for math.random() definition
		// console.log(rando);
		if(rando===1){
			randomColors.push('red');
			}else if(rando===2){
			randomColors.push('blue');
			}else if(rando===3){
			randomColors.push('yellow');
			}else if(rando===4){
			randomColors.push('green');
		}
		randomColors.forEach(animateCompTile);
		console.log(playerCount);
		console.log(randomColors);
	};

	$playButton.on('click',getRandomColor);



	var animateCompTile = function(i,name){					//working on getting the items in randomcolors array to pulse!
		console.log(randomColors);
		$('#name').addClass('pulse');
		console.log($('#name'));
		setTimeout(function(){$('#name').removeClass('pulse')}, 500);
		console.log($('#name'));
	}

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
		roundCount+=1;
		playerCount+=1;
		console.log(playerCount);
		$round.text("Round: " + roundCount);
		for(var i=0; i<randomColors.length; i++){
			if(randomColors[i]!==playerMoves[i]){
				randomColors=[];
				playerMoves=[];
				roundCount=0;
				return;
			}else{
				var istrue = true;
			}
		}
		if(istrue){
			alert('player wins!');
			playerMoves=[];
			setTimeout(getRandomColor, 500);

		}

	}
};

$(document).keypress(compareArrays);


});