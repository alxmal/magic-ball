function makeAdvice() {
		var advice = ['As I see it, yes', 'Ask again later', 'Better not tell you now', 
				'Cannot predict now', 'Concentrate and ask again', 
				'Don\'t count on it', 'It is certain', 
				'It is decidedly so', 'Most likely', 
				'My reply is no', 'Да','My sources say no',
				'Outlook not so good', 'Outlook good', 'Reply hazy, try again',
				'Signs point to yes', 'Very doubtful', 'Without a doubt',
				'Yes', 'Yes – definitely', 'You may rely on it'];

		var randomRoll 		= Math.floor(Math.random() * advice.length);
		var ballSays 		= advice[randomRoll];
		var dest 			= document.querySelector('.advice-text');
		var randomAngle 	= Math.floor(Math.random() * 46 - 12);

		$(triangle).css('transform', 'rotate(' + randomAngle + 'deg)');
		
		console.log(randomAngle);
		console.log(ballSays);

		dest.innerHTML = ballSays;
		$(triangle).hide().delay(890).fadeIn(500); 
}

var ball 		= document.querySelector('.magic-ball');
var triangle 	= document.querySelector('.triangle');

ball.addEventListener('click', makeAdvice);

$(ball).on("click", function() {
	$(this).addClass('shaker').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd', function(){
		$(this).removeClass('shaker');
	});
});
