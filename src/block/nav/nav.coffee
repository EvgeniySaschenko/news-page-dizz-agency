$(document).ready ()->
	# Скрыть меню
	$('.nav .toggler').on 'click', ->
		active = $(this).parent().hasClass('active')
		
		if active
			$(this).parent().removeClass('active')
		else
			$(this).parent().addClass('active')

	# Активный пункт
	$('.nav .menu__item').on 'click', ->
		$('.nav .menu__item').removeClass('active')
		$(this).addClass('active')