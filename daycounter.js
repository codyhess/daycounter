document.addEventListener('DOMContentLoaded', function(event) {
  // popsicle
  var popsicle = new Popsicle()

  // state variables
  var messageBoxShown = false
  var dateStringShown = false
  var colorClasses = ['blackonwhite', 'blackonpurple',
      'blackonyellow', 'whiteonblack', 'whiteonblue']
  var colorState = localStorage.getItem('colorState') || 'blackonwhite'
  var colorIndex = localStorage.getItem('colorIndex') || 0
  var message = localStorage.getItem('message') || ''
  var dateStringShown = localStorage.getItem('showDateString')

  // dates are a pain in the rear end
  var startDateString = localStorage.getItem('startDate')
  var startDate
  if (startDateString) { startDate = new Date(startDateString) }
  else { startDate = new Date(Date.now()-100) }
  var dateString = startDate.toDateString()

  // elements
  var body = document.getElementsByTagName('body')[0]
  var dateForm = document.getElementById('dateForm')
  var count = document.getElementById('count')
  var messageBox = document.getElementById('messageBox')
  var messageSpan = document.getElementById('message')
  var elDateString = document.getElementById('dateString')
  var month = document.getElementById('month')
  var day = document.getElementById('day')
  var year = document.getElementById('year')
  var messageForm = document.getElementById('messageForm')
  
  /*
   * DATES ARE A PAIN IN THE REAR END
   */
  // build years input
  var fullYear = new Date(Date.now()).getFullYear()
  for (var i=0; i<50; i++) {
    var iFullYear = document.createElement('option')
    iFullYear.value = fullYear-i
    iFullYear.innerText = fullYear-i
    year.appendChild(iFullYear)
  }
  if (dateStringShown === 'true') {
    elDateString.className = 'shown'
    dateForm.className = 'hidden'
    dateStringShown = true
  }
  elDateString.innerText = dateString
  var startMonth = startDate.getMonth()
  var startDay = startDate.getDate()
  var startYear = startDate.getFullYear()
  var dayCount = (Date.now()-startDate.getTime()) / 8.64e+7
  count.innerText = Math.ceil(dayCount)
  month.value = startMonth
  day.value = startDay
  year.value = startYear

  // prepare state
  body.className = colorState
  messageSpan.innerText = message

  /*
   * EVENTS
   */
  document.addEventListener('onefingertap', rotateBackgroundColor)
  document.addEventListener('swipeup', embiggenCount)
  document.addEventListener('swiperight', embiggenCount)
  document.addEventListener('swipedown', shrinkCount)
  document.addEventListener('swipeleft', shrinkCount)
  document.addEventListener('twofingertap', toggleDateString)
  document.addEventListener('threefingertap', toggleHelpPage)
  document.addEventListener('fourfingertap', refreshAppcache)
  dateForm.addEventListener('change', updateDayCount)
  messageForm.addEventListener('submit', updateMessageString)
  count.addEventListener('touchstart', showMessageForm)
  count.addEventListener('animationend', clearAnimationClass)
  dateForm.addEventListener('touchstart', function(event) {event.stopPropagation()})
  dateForm.addEventListener('touchend', function(event) {event.stopPropagation()})

  /*
   * UTILITY FUNCTIONS
   */
  function rotateBackgroundColor(event) {
    event.preventDefault()
    colorIndex = ++colorIndex % colorClasses.length
    colorState = colorClasses[colorIndex]
    localStorage.setItem('colorIndex', colorIndex)
    localStorage.setItem('colorState', colorState)
    body.className = colorState
  }
  function embiggenCount(event) {
    count.className = 'embiggen'
  }
  function shrinkCount(event) {
    count.className = 'shrink'
  }
  function toggleDateString(event) {
    if (elDateString.className === 'hidden') {
      dateForm.className = 'hidden'
      elDateString.className = 'shown'
      dateStringShown = true
      localStorage.setItem('showDateString', dateStringShown)
    } else {
      dateForm.className = 'shown'
      elDateString.className = 'hidden'
      dateStringShown = false
      localStorage.setItem('showDateString', dateStringShown)
    }
  }
  function updateDayCount(event) {
    if (event.target.id === 'month') {
      startMonth = event.target.value
    } else if (event.target.id === 'day') {
      startDay = event.target.value
    } else if (event.target.id === 'year') {
      startYear = event.target.value
    }
    startDate = new Date(startYear, startMonth, startDay)
    localStorage.setItem('startDate', startDate.toString())
    dayCount = (Date.now() - startDate.getTime()) / 8.64e+7
    count.innerText = Math.ceil(dayCount)
    elDateString.innerText = startDate.toDateString()
  }
  function updateMessageString(event) {
    event.preventDefault()
    message = event.target[0].value
    localStorage.setItem('message', message)
    messageSpan.innerText = message
    messageSpan.className = 'shown'
    messageForm.className = 'hidden'
    messageBoxShown = false
  }
  function showMessageForm(event) {
    if (!messageBoxShown) {
      if (message) {
        messageBox.value = message
      }
      messageSpan.className = 'hidden'
      messageForm.className = 'shown'
      messageBox.focus()
      event.preventDefault()
      messageBoxShown = true
    } else {
      message = messageBox.value
      localStorage.setItem('message', message)
      messageSpan.innerText = message
      messageSpan.className = 'shown'
      messageForm.className = 'hidden'
      messageBoxShown = false
    }
  }
  function toggleHelpPage(event) {
  }
  function refreshAppcache(event) {
    applicationCache.update()
    location.reload()
  }
  function clearAnimationClass(event) {
    count.className = ''
  }
})
