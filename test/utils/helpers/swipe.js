const SWIPE_DIRECTION = {
     down: {
         start: { x: 50, y: 15 },
         end: { x: 50, y: 85 },
     },
     left: {
         start: { x: 95, y: 50 },
         end: { x: 5, y: 50 },
     },
     right: {
         start: { x: 5, y: 50 },
         end: { x: 95, y: 50 },
     },
     up: {
         start: { x: 50, y: 85 },
         end: { x: 50, y: 15 },
     },
};
 
 /**
  * @internal
  */
 const CORNER_OFFSET = 50;
 
 function calculateXY(coordinate, percentage) {
     return {
         x: coordinate.x * percentage,
         y: coordinate.y * percentage,
     };
 }
 
 function getDeviceScreenCoordinates(
     screenSize,
     coordinate
 ) {
     return {
         x: Math.round(screenSize.width * (coordinate.x / 100)),
         y: Math.round(screenSize.height * (coordinate.y / 100)),
     };
 }
 
 export function swipe(from_coord, to) {
     browser.touchPerform([
         {
             action: 'press',
             options: from_coord,
         },
         {
             action: 'wait',
             options: { ms: 1000 },
         },
         {
             action: 'moveTo',
             options: to,
         },
         {
             action: 'release',
         },
     ]);
     browser.pause(1000);
 }
 
 export function swipeOnPercentage(from_coord, to) {
     SCREEN_SIZE = SCREEN_SIZE || browser.getWindowRect();
     const pressOptions = getDeviceScreenCoordinates(SCREEN_SIZE, from_coord);
     const moveToScreenCoordinates = getDeviceScreenCoordinates(SCREEN_SIZE, to);
     swipe(pressOptions, moveToScreenCoordinates);
 }
 
 export function swipeUp(percentage = 1) {
     swipeOnPercentage(
         calculateXY(SWIPE_DIRECTION.up.start, percentage),
         calculateXY(SWIPE_DIRECTION.up.end, percentage)
     );
 }

 export function checkIfDisplayedWithScrollDown(
     element,
     maxScrolls,
     amount = 0
 ) {
     if (
         (!element.isExisting() || !element.isDisplayed()) &&
         amount <= maxScrolls
     ) {
         swipeUp(0.85);
         checkIfDisplayedWithScrollDown(element, maxScrolls, amount + 1);
     } else if (amount > maxScrolls) {
         throw new Error(
             `The element '${element}' could not be found or is not visible.`
         );
     }
 }

 export function swipeDown(percentage = 1) {
     swipeOnPercentage(
         calculateXY(SWIPE_DIRECTION.down.start, percentage),
         calculateXY(SWIPE_DIRECTION.down.end, percentage)
     );
 }

 export function swipeLeft(percentage = 1) {
     swipeOnPercentage(
         calculateXY(SWIPE_DIRECTION.left.start, percentage),
         calculateXY(SWIPE_DIRECTION.left.end, percentage)
     );
 }

 export function swipeRight(percentage = 1) {
     swipeOnPercentage(
         calculateXY(SWIPE_DIRECTION.right.start, percentage),
         calculateXY(SWIPE_DIRECTION.right.end, percentage)
     );
 }
 
 function calculateHorizontalSwipeOffset(element) {
     return element.getSize().width / 2;
 }
 
 export function swipeRightOnElement(element) {
     /**
      * X and Y are at the corners of the element's bounds.
      * We need to move inside of the element in order to be able to swipe afterwards.
      */
     const positionX = element.getLocation().x + CORNER_OFFSET;
     const positionY = element.getLocation().y + CORNER_OFFSET;
 
     const from = { x: positionX, y: positionY };
     const to = {
         x: positionX + calculateHorizontalSwipeOffset(element),
         y: positionY,
     };
 
     swipe(from, to);
 }
 
 export function swipeLeftOnElement(element) {
     /**
      * X and Y are at the corners of the element's bounds.
      * We need to move inside of the element in order to be able to swipe afterwards.
      */
     const positionX = element.getSize().width - CORNER_OFFSET;
     const positionY = element.getLocation().y + CORNER_OFFSET;
 
     const from = { x: positionX, y: positionY };
     const to = {
         x: positionX - calculateHorizontalSwipeOffset(element),
         y: positionY,
     };
 
     swipe(from, to);
 }