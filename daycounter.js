$(document).ready(function(){
  // test taphold
  var state = 'content'
  var startX, endX, ctfd
  var colorClasses = ['blackonwhite', 'blackonpurple',
      'blackonyellow', 'whiteonblack', 'whiteonblue']
  var colorIndex = 0
  var countFontSize = $('#count').css('font-size').replace('px', '')
  console.log(countFontSize)
  $('html').on('touchstart', function(event) {
    ctfd = true
    startX = event.originalEvent.touches[0].pageX
  })
  $('html').on('touchend', function(event) {
    if (event.originalEvent.touches.length === 2 && ctfd) {
      // THREE FINGER TAP
      ctfd = false
      if (state === 'content') {
        $('#content').hide()
        $('#options').show()
        state = 'options'
      } else if (state === 'options') {
        $('#options').hide()
        $('#content').show()
        state = 'content'
      }
    }
    else if (event.originalEvent.touches.length === 1 && ctfd) {
      // TWO FINGER TAP
      ctfd = false
    }
    else if (true && ctfd) {
      ctfd = false
      endX = event.originalEvent.changedTouches[0].pageX
      if ((endX - startX) > 30) {
        // RIGHT SWIPE
        $('#count').animate({'font-size': countFontSize*1 + 20})
        $('#count').animate({'font-size': countFontSize})
      } else if ((endX - startX) < -30) {
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
  if (startString) {
    startDate = new Date(startString)
  } else {
    startDate = new Date(Date.now()-100)
  }
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
  })
  $('#day').on('change', function(event) {
    startDay = $(this).val()
    startDate = new Date(startYear, startMonth, startDay)
    localStorage.setItem('startDate', startDate.toString())
    dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
    $('#count').text(Math.ceil(dayCount))
  })
  $('#year').on('change', function(event) {
    startYear = $(this).val()
    startDate = new Date(startYear, startMonth, startDay)
    localStorage.setItem('startDate', startDate.toString())
    dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
    $('#count').text(Math.ceil(dayCount))
  })
})
