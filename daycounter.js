$(document).ready(function(){
  // test taphold
  var startX, endX, startY, endY, ctfd
  var messageBoxShown = false
  var dateStringShown = false

  var colorClasses = ['blackonwhite', 'blackonpurple',
      'blackonyellow', 'whiteonblack', 'whiteonblue']
  var colorState = localStorage.getItem('colorState')
  var colorIndex = localStorage.getItem('colorIndex') || 0


  if (colorState) {
    $('body').removeClass('blackonwhite')
    $('body').addClass(colorState)
  }

  var message = localStorage.getItem('message')
  if (message) { $('#message').text(message) }


  $(window).on('resize', function(event) {
	  event.preventDefault()
  })
  $('#dateform').on('touchstart', function(event) {
	  event.stopPropagation()
  }).on('touchend', function(event) {
	  event.stopPropagation()
  })
  $('#count').on('touchend', function(event) {
      event.preventDefault()
      event.stopPropagation()
      if(!messageBoxShown) {
        $('#messageBox').show()
        $('#messageBox').val(message)
        $('#message').hide()
        messageBoxShown = true
      }
      else {
        message = $('#messageBox').val()
        $('#message').text(message)
        localStorage.setItem('message', message)
        $('#messageBox').hide()
        $('#message').show()
        messageBoxShown = false
      }
      if (messageBoxShown) {
        document.getElementById('messageBox').focus()
        document.getElementById('messageBox').focus()
        document.getElementById('messageBox').focus()
        document.getElementById('messageBox').focus()
        document.getElementById('messageBox').focus()
        document.getElementById('messageBox').focus()
      }
  })//.on('touchstart', function(event) { event.stopPropagation() })

  //$('html').on('touchstart', function(event) {
  document.addEventListener('touchstart', function(event) {
    ctfd = true
    if(event.touches.length > 1) { event.preventDefault() }
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
  })
  $('form').on('submit', function(event) {
    message = $('#messageBox').val()
    $('#message').text(message)
    localStorage.setItem('message', message)
    $('#messageBox').hide()
    $('#message').show()
    messageBoxShown = false
  })
  //$('html').on('touchend', function(event) {
  document.addEventListener('touchend', function(event) {
	  event.preventDefault()
	  if (messageBoxShown) {
		  document.getElementById('messageBox').focus()
	  }
    if (event.touches.length === 1 && ctfd) {
	    event.preventDefault()
      // TWO FINGER TAP
      ctfd = false
      if (dateStringShown) {
        $('#datestring').hide()
        $('#dateform').show()
        dateStringShown = false
        localStorage.setItem('dateState', dateStringShown)
      } else {
        $('#dateform').hide()
        $('#datestring').show()
        dateStringShown = true
        localStorage.setItem('dateState', dateStringShown)
      }
    }
    else if (true && ctfd) {
      ctfd = false
      endX = event.changedTouches[0].pageX
      endY = event.changedTouches[0].pageY
      var countFontSize = $('#count').css('font-size')
      countFontSize = countFontSize.replace('px', '')
      if (((endX - startX) > 30)
          || ((endY - startY) > 30)) {
        // RIGHT SWIPE
        $('#count').animate({'font-size': countFontSize*1 + 20})
        $('#count').animate({'font-size': countFontSize})
      }
      else if (((endX - startX) < -30)
          || ((endY - startY) < -30)) {
        // LEFT SWIPE
        $('#count').animate({'font-size': countFontSize*1 - 20})
        $('#count').animate({'font-size': countFontSize})
      } else {
        // ONE FINGER TAP
        $body = $('body')
        $days = $('#days')
        $('body').removeClass(colorClasses[colorIndex])
        colorIndex = ++colorIndex % colorClasses.length
        $('body').addClass(colorClasses[colorIndex])
        localStorage.setItem('colorIndex', colorIndex)
        localStorage.setItem('colorState', colorClasses[colorIndex])
      }
    }
  })

  // build years
  var year = new Date(Date.now()).getFullYear()
  var $year = $('#year')
  var startDate
  for (var i=0; i<50; i++) {
    $('#year').append('<option value="'+(year-i)+'">'
                      +(year-i)+'</option>')
  }
  // set date
  var startString = localStorage.getItem('startDate')
  var dateState = localStorage.getItem('dateState')
  if (dateState === 'true') {
    $('#datestring').show()
    $('#dateform').hide()
    dateStringShown = true
  }
  if (startString) {
    startDate = new Date(startString)
  } else {
    startDate = new Date(Date.now()-100)
  }
  var dateString = startDate.toDateString()
  $('#datestring').text(dateString)
  var startMonth = startDate.getMonth()
  var startDay = startDate.getDate()
  var startYear = startDate.getFullYear()
  var dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
  $('#count').text(Math.ceil(dayCount))
  $('#month').val(startMonth)
  $('#day').val(startDay)
  $('#year').val(startYear)

  // give events to the inputs
  $('#month').on('change', function(event) {
    startMonth = $(this).val()
    startDate = new Date(startYear, startMonth, startDay)
    localStorage.setItem('startDate', startDate.toString())
    dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
    $('#count').text(Math.ceil(dayCount))
    $('#datestring').text(startDate.toDateString())
  })
  $('#day').on('change', function(event) {
    startDay = $(this).val()
    startDate = new Date(startYear, startMonth, startDay)
    localStorage.setItem('startDate', startDate.toString())
    dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
    $('#count').text(Math.ceil(dayCount))
    $('#datestring').text(startDate.toDateString())
  })
  $('#year').on('change', function(event) {
    startYear = $(this).val()
    startDate = new Date(startYear, startMonth, startDay)
    localStorage.setItem('startDate', startDate.toString())
    dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
    $('#count').text(Math.ceil(dayCount))
    $('#datestring').text(startDate.toDateString())
  })
})
