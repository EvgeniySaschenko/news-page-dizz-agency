$(document).ready ()->
	# Вызвать modal-feadback
	$('.header .link-img_feedback').on 'click', ->
		$('.modal-feadback').removeClass('close')
		$('.modal-feadback').addClass('active')

	$('.modal-feadback__close').on 'click', ->
		$('.modal-feadback').removeClass('active')
		$('.modal-feadback').addClass('close')