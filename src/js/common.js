function makeAdvice() {
		var advice = ['Бесспорно', 'Предрешено', 'Никаких сомнений', 
				'Определённо да', 'Можешь быть уверен в этом', 
				'Мне кажется да', 'Вероятнее всего', 
				'Хорошие перспективы', 'Хорошие перспективы', 
				'Знаки говорят «да»', 'Да','Пока не ясно, попробуй снова',
				'Спроси позже', 'Лучше не рассказывать', 'Сейчас нельзя предсказать',
				'Сконцентрируйся и спроси опять', 'Даже не думай', 'Мой ответ нет',
				'По моим данным нет', 'Перспективы не очень хорошие', 'Весьма сомнительно'];

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
