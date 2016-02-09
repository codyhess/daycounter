/*
 * Popsicle JS - A raw JavaScript touch event library.
 */
function Popsicle(element) {
  // What are we listening on?
  this.element = element || document

  // What are we listening for?
  this.startX, this.startY, this.execute, this.fingers, this.originalFingerId

  // What events do we send?
  var oneFingerTapEvent = new Event('onefingertap', {bubbles: true})
  var twoFingerTapEvent = new Event('twofingertap', {bubbles: true})
  var threeFingerTapEvent = new Event('threefingertap', {bubbles: true})
  var fourFingerTapEvent = new Event('fourfingertap', {bubbles: true})
  var swipeRightEvent = new Event('swiperight', {bubbles: true})
  var swipeLeftEvent = new Event('swipeleft', {bubbles: true})
  var swipeUpEvent = new Event('swipeup', {bubbles: true})
  var swipeDownEvent = new Event('swipedown', {bubbles: true})

  this.element.addEventListener('touchstart', startTouch)
  this.element.addEventListener('touchend', endTouch)

  function startTouch (event) {
    event.preventDefault()
    // initialize our start variables
    this.execute = true; // keep this at the beginning
    this.fingers = event.touches.length
    this.startX = this.startX || event.touches[0].pageX
    this.startY = this.startY || event.touches[0].pageY
    if (this.originalFingerId !== 0) {
      this.originalFingerId = event.touches[0].identifier
    }
  }
  function endTouch (event) {
    event.preventDefault()
    // Only fire an event on the first finger lift.
    if (!this.execute) { return }

    // Where did the finger go?
    var originalTouch
    if (this.originalFingerId === event.changedTouches[0].identifier) {
      originalTouch = event.changedTouches[0]
    } else {
      for (var i=0; i<event.touches.length; i++) {
        if (this.originalFingerId === event.touches[i].identifier) {
          originalTouch = event.touches[i]
        }
      }
    }

    // I like to move it move it.
    var deltaX = originalTouch.pageX - this.startX
    var deltaY = originalTouch.pageY - this.startY

    // Detect and dispatch events.
    if (this.fingers === 1) {
      if (deltaX > 30) {
        event.target.dispatchEvent(swipeRightEvent)
      } else if (deltaX < -30) {
        event.target.dispatchEvent(swipeLeftEvent)
      } else if (deltaY > 30) {
        event.target.dispatchEvent(swipeDownEvent)
      } else if (deltaY < -30) {
        event.target.dispatchEvent(swipeUpEvent)
      } else {
        event.target.dispatchEvent(oneFingerTapEvent)
      }
    } else if (this.fingers === 2) {
      event.target.dispatchEvent(twoFingerTapEvent)
    } else if (this.fingers === 3) {
      event.target.dispatchEvent(threeFingerTapEvent)
    } else if (this.fingers === 4) {
      event.target.dispatchEvent(fourFingerTapEvent)
    }

    // We're finished here. Reset the state.
    this.execute = false // keep this at the end
    this.startX = false
    this.startY = false
    this.originalFingerId = false
    this.fingers = false
  }
}
