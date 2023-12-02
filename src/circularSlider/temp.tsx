// class Slider {
//   /**
//    * @constructor
//    *
//    * @param {string} DOM selector
//    * @param {array} sliders
//    */
//   constructor({ DOMselector, sliders }) {
//     this.DOMselector = DOMselector;
//     this.container = document.querySelector(this.DOMselector); // Slider container
//     this.sliderWidth = 400; // Slider width
//     this.sliderHeight = 400; // Slider length
//     this.cx = this.sliderWidth / 2; // Slider center X coordinate
//     this.cy = this.sliderHeight / 2; // Slider center Y coordinate
//     this.tau = 2 * Math.PI; // Tau constant
//     this.sliders = sliders; // Sliders array with opts for each slider
//     this.arcFractionSpacing = 0.85; // Spacing between arc fractions
//     this.arcFractionLength = 10; // Arc fraction length
//     this.arcFractionThickness = 25; // Arc fraction thickness
//     this.arcBgFractionColor = "#D8D8D8"; // Arc fraction color for background slider
//     this.handleFillColor = "#fff"; // Slider handle fill color
//     this.handleStrokeColor = "#888888"; // Slider handle stroke color
//     this.handleStrokeThickness = 3; // Slider handle stroke thickness
//     this.mouseDown = false; // Is mouse down
//     this.activeSlider = null; // Stores active (selected) slider
//   }

//   /**
//    * Draw sliders on init
//    *
//    */
//   draw() {
//     // Create legend UI
//     this.createLegendUI();

//     // Create and append SVG holder
//     const svgContainer = document.createElement("div");
//     svgContainer.classList.add("slider__data");
//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("height", this.sliderWidth);
//     svg.setAttribute("width", this.sliderHeight);
//     svgContainer.appendChild(svg);
//     this.container.appendChild(svgContainer);

//     // Draw sliders
//     this.sliders.forEach((slider, index) =>
//       this.drawSingleSliderOnInit(svg, slider, index)
//     );

//     // Event listeners
//     svgContainer.addEventListener(
//       "mousedown",
//       this.mouseTouchStart.bind(this),
//       false
//     );
//     svgContainer.addEventListener(
//       "touchstart",
//       this.mouseTouchStart.bind(this),
//       false
//     );
//     svgContainer.addEventListener(
//       "mousemove",
//       this.mouseTouchMove.bind(this),
//       false
//     );
//     svgContainer.addEventListener(
//       "touchmove",
//       this.mouseTouchMove.bind(this),
//       false
//     );
//     window.addEventListener("mouseup", this.mouseTouchEnd.bind(this), false);
//     window.addEventListener("touchend", this.mouseTouchEnd.bind(this), false);
//   }

//   /**
//    * Draw single slider on init
//    *
//    * @param {object} svg
//    * @param {object} slider
//    * @param {number} index
//    */
//   drawSingleSliderOnInit(svg, slider, index) {
//     // Default slider opts, if none are set
//     slider.radius = slider.radius ?? 50;
//     slider.min = slider.min ?? 0;
//     slider.max = slider.max ?? 1000;
//     slider.step = slider.step ?? 50;
//     slider.initialValue = slider.initialValue ?? 0;
//     slider.color = slider.color ?? "#FF5733";

//     // Calculate slider circumference
//     const circumference = slider.radius * this.tau;

//     // Calculate initial angle
//     const initialAngle = Math.floor(
//       (slider.initialValue / (slider.max - slider.min)) * 360
//     );

//     // Calculate spacing between arc fractions
//     const arcFractionSpacing = this.calculateSpacingBetweenArcFractions(
//       circumference,
//       this.arcFractionLength,
//       this.arcFractionSpacing
//     );

//     // Create a single slider group - holds all paths and handle
//     const sliderGroup = document.createElementNS(
//       "http://www.w3.org/2000/svg",
//       "g"
//     );
//     sliderGroup.setAttribute("class", "sliderSingle");
//     sliderGroup.setAttribute("data-slider", index);
//     sliderGroup.setAttribute(
//       "transform",
//       "rotate(-90," + this.cx + "," + this.cy + ")"
//     );
//     sliderGroup.setAttribute("rad", slider.radius);
//     svg.appendChild(sliderGroup);

//     // Draw background arc path
//     this.drawArcPath(
//       this.arcBgFractionColor,
//       slider.radius,
//       360,
//       arcFractionSpacing,
//       "bg",
//       sliderGroup
//     );

//     // Draw active arc path
//     this.drawArcPath(
//       slider.color,
//       slider.radius,
//       initialAngle,
//       arcFractionSpacing,
//       "active",
//       sliderGroup
//     );

//     // Draw handle
//     this.drawHandle(slider, initialAngle, sliderGroup);
//   }

//   /**
//    * Output arch path
//    *
//    * @param {number} cx
//    * @param {number} cy
//    * @param {string} color
//    * @param {number} angle
//    * @param {number} singleSpacing
//    * @param {string} type
//    */
//   drawArcPath(color, radius, angle, singleSpacing, type, group) {
//     // Slider path class
//     const pathClass =
//       type === "active" ? "sliderSinglePathActive" : "sliderSinglePath";

//     // Create svg path
//     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     path.classList.add(pathClass);
//     path.setAttribute(
//       "d",
//       this.describeArc(this.cx, this.cy, radius, 0, angle)
//     );
//     path.style.stroke = color;
//     path.style.strokeWidth = this.arcFractionThickness;
//     path.style.fill = "none";
//     path.setAttribute(
//       "stroke-dasharray",
//       this.arcFractionLength + " " + singleSpacing
//     );
//     group.appendChild(path);
//   }

//   /**
//    * Draw handle for single slider
//    *
//    * @param {object} slider
//    * @param {number} initialAngle
//    * @param {group} group
//    */
//   drawHandle(slider, initialAngle, group) {
//     // Calculate handle center
//     const handleCenter = this.calculateHandleCenter(
//       (initialAngle * this.tau) / 360,
//       slider.radius
//     );

//     // Draw handle
//     const handle = document.createElementNS(
//       "http://www.w3.org/2000/svg",
//       "circle"
//     );
//     handle.setAttribute("class", "sliderHandle");
//     handle.setAttribute("cx", handleCenter.x);
//     handle.setAttribute("cy", handleCenter.y);
//     handle.setAttribute("r", this.arcFractionThickness / 2);
//     handle.style.stroke = this.handleStrokeColor;
//     handle.style.strokeWidth = this.handleStrokeThickness;
//     handle.style.fill = this.handleFillColor;
//     group.appendChild(handle);
//   }

//   /**
//    * Create legend UI on init
//    *
//    */
//   createLegendUI() {
//     // Create legend
//     const display = document.createElement("ul");
//     display.classList.add("slider__legend");

//     // Legend heading
//     const heading = document.createElement("h2");
//     heading.innerText = "Legend";
//     display.appendChild(heading);

//     // Legend data for all sliders
//     this.sliders.forEach((slider, index) => {
//       const li = document.createElement("li");
//       li.setAttribute("data-slider", index);
//       const firstSpan = document.createElement("span");
//       firstSpan.style.backgroundColor = slider.color ?? "#FF5733";
//       firstSpan.classList.add("colorSquare");
//       const secondSpan = document.createElement("span");
//       secondSpan.innerText = slider.displayName ?? "Unnamed value";
//       const thirdSpan = document.createElement("span");
//       thirdSpan.innerText = slider.initialValue ?? 0;
//       thirdSpan.classList.add("sliderValue");
//       li.appendChild(firstSpan);
//       li.appendChild(secondSpan);
//       li.appendChild(thirdSpan);
//       display.appendChild(li);
//     });

//     // Append to DOM
//     this.container.appendChild(display);
//   }

//   /**
//    * Redraw active slider
//    *
//    * @param {element} activeSlider
//    * @param {obj} rmc
//    */
//   redrawActiveSlider(rmc) {
//     const activePath = this.activeSlider.querySelector(
//       ".sliderSinglePathActive"
//     );
//     const radius = +this.activeSlider.getAttribute("rad");
//     const currentAngle = this.calculateMouseAngle(rmc) * 0.999;

//     // Redraw active path
//     activePath.setAttribute(
//       "d",
//       this.describeArc(
//         this.cx,
//         this.cy,
//         radius,
//         0,
//         this.radiansToDegrees(currentAngle)
//       )
//     );

//     // Redraw handle
//     const handle = this.activeSlider.querySelector(".sliderHandle");
//     const handleCenter = this.calculateHandleCenter(currentAngle, radius);
//     handle.setAttribute("cx", handleCenter.x);
//     handle.setAttribute("cy", handleCenter.y);

//     // Update legend
//     this.updateLegendUI(currentAngle);
//   }

//   /**
//    * Update legend UI
//    *
//    * @param {number} currentAngle
//    */
//   updateLegendUI(currentAngle) {
//     const targetSlider = this.activeSlider.getAttribute("data-slider");
//     const targetLegend = document.querySelector(
//       `li[data-slider="${targetSlider}"] .sliderValue`
//     );
//     const currentSlider = this.sliders[targetSlider];
//     const currentSliderRange = currentSlider.max - currentSlider.min;
//     let currentValue = (currentAngle / this.tau) * currentSliderRange;
//     const numOfSteps = Math.round(currentValue / currentSlider.step);
//     currentValue = currentSlider.min + numOfSteps * currentSlider.step;
//     targetLegend.innerText = currentValue;
//   }

//   /**
//    * Mouse down / Touch start event
//    *
//    * @param {object} e
//    */
//   mouseTouchStart(e) {
//     if (this.mouseDown) return;
//     this.mouseDown = true;
//     const rmc = this.getRelativeMouseOrTouchCoordinates(e);
//     this.findClosestSlider(rmc);
//     this.redrawActiveSlider(rmc);
//   }

//   /**
//    * Mouse move / touch move event
//    *
//    * @param {object} e
//    */
//   mouseTouchMove(e) {
//     if (!this.mouseDown) return;
//     e.preventDefault();
//     const rmc = this.getRelativeMouseOrTouchCoordinates(e);
//     this.redrawActiveSlider(rmc);
//   }

//   /**
//    * Mouse move / touch move event
//    * Deactivate slider
//    *
//    */
//   mouseTouchEnd() {
//     if (!this.mouseDown) return;
//     this.mouseDown = false;
//     this.activeSlider = null;
//   }

//   /**
//    * Calculate number of arc fractions and space between them
//    *
//    * @param {number} circumference
//    * @param {number} arcBgFractionLength
//    * @param {number} arcBgFractionBetweenSpacing
//    *
//    * @returns {number} arcFractionSpacing
//    */
//   calculateSpacingBetweenArcFractions(
//     circumference,
//     arcBgFractionLength,
//     arcBgFractionBetweenSpacing
//   ) {
//     const numFractions = Math.floor(
//       (circumference / arcBgFractionLength) * arcBgFractionBetweenSpacing
//     );
//     const totalSpacing = circumference - numFractions * arcBgFractionLength;
//     return totalSpacing / numFractions;
//   }

//   /**
//    * Helper functiom - describe arc
//    *
//    * @param {number} x
//    * @param {number} y
//    * @param {number} radius
//    * @param {number} startAngle
//    * @param {number} endAngle
//    *
//    * @returns {string} path
//    */
//   describeArc(x, y, radius, startAngle, endAngle) {
//     let path,
//       endAngleOriginal = endAngle,
//       start,
//       end,
//       arcSweep;

//     if (endAngleOriginal - startAngle === 360) {
//       endAngle = 359;
//     }

//     start = this.polarToCartesian(x, y, radius, endAngle);
//     end = this.polarToCartesian(x, y, radius, startAngle);
//     arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

//     path = [
//       "M",
//       start.x,
//       start.y,
//       "A",
//       radius,
//       radius,
//       0,
//       arcSweep,
//       0,
//       end.x,
//       end.y,
//     ];

//     if (endAngleOriginal - startAngle === 360) {
//       path.push("z");
//     }

//     return path.join(" ");
//   }

//   /**
//    * Helper function - polar to cartesian transformation
//    *
//    * @param {number} centerX
//    * @param {number} centerY
//    * @param {number} radius
//    * @param {number} angleInDegrees
//    *
//    * @returns {object} coords
//    */
//   polarToCartesian(centerX, centerY, radius, angleInDegrees) {
//     const angleInRadians = (angleInDegrees * Math.PI) / 180;
//     const x = centerX + radius * Math.cos(angleInRadians);
//     const y = centerY + radius * Math.sin(angleInRadians);
//     return { x, y };
//   }

//   /**
//    * Helper function - calculate handle center
//    *
//    * @param {number} angle
//    * @param {number} radius
//    *
//    * @returns {object} coords
//    */
//   calculateHandleCenter(angle, radius) {
//     const x = this.cx + Math.cos(angle) * radius;
//     const y = this.cy + Math.sin(angle) * radius;
//     return { x, y };
//   }

//   /**
//    * Get mouse/touch coordinates relative to the top and left of the container
//    *
//    * @param {object} e
//    *
//    * @returns {object} coords
//    */
//   getRelativeMouseOrTouchCoordinates(e) {
//     const containerRect = document
//       .querySelector(".slider__data")
//       .getBoundingClientRect();
//     let x, y, clientPosX, clientPosY;

//     // Touch Event triggered
//     if (window.TouchEvent && e instanceof TouchEvent) {
//       clientPosX = e.touches[0].pageX;
//       clientPosY = e.touches[0].pageY;
//     }
//     // Mouse Event Triggered
//     else {
//       clientPosX = e.clientX;
//       clientPosY = e.clientY;
//     }

//     // Get Relative Position
//     x = clientPosX - containerRect.left;
//     y = clientPosY - containerRect.top;

//     return { x, y };
//   }

//   /**
//    * Calculate mouse angle in radians
//    *
//    * @param {object} rmc
//    *
//    * @returns {number} angle
//    */
//   calculateMouseAngle(rmc) {
//     const angle = Math.atan2(rmc.y - this.cy, rmc.x - this.cx);

//     if (angle > -this.tau / 2 && angle < -this.tau / 4) {
//       return angle + this.tau * 1.25;
//     } else {
//       return angle + this.tau * 0.25;
//     }
//   }

//   /**
//    * Helper function - transform radians to degrees
//    *
//    * @param {number} angle
//    *
//    * @returns {number} angle
//    */
//   radiansToDegrees(angle) {
//     return angle / (Math.PI / 180);
//   }

//   /**
//    * Find closest slider to mouse pointer
//    * Activate the slider
//    *
//    * @param {object} rmc
//    */
//   findClosestSlider(rmc) {
//     const mouseDistanceFromCenter = Math.hypot(
//       rmc.x - this.cx,
//       rmc.y - this.cy
//     );
//     const container = document.querySelector(".slider__data");
//     const sliderGroups = Array.from(container.querySelectorAll("g"));

//     // Get distances from client coordinates to each slider
//     const distances = sliderGroups.map((slider) => {
//       const rad = parseInt(slider.getAttribute("rad"));
//       return Math.min(Math.abs(mouseDistanceFromCenter - rad));
//     });

//     // Find closest slider
//     const closestSliderIndex = distances.indexOf(Math.min(...distances));
//     this.activeSlider = sliderGroups[closestSliderIndex];
//   }
// }

const svg = (
  <svg
    aria-hidden="true"
    class="sluqdv6 dir dir-ltr"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <mask id="trackBackground">
        <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
        <circle
          cx="50%"
          cy="50%"
          fill="none"
          r="115"
          stroke="white"
          stroke-width="60"
        ></circle>
        <path
          fill="black"
          filter="blur(10px)"
          d="M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 273.6726188957804 273.6726188957803 L 273.6726188957804 334 L 157 334 L 157 157"
        ></path>
      </mask>
      <radialGradient id="trackBackgroundInnerShadow">
        <stop offset="56%" stop-color="rgba(188, 0, 55, 0.6)"></stop>
        <stop offset="62%" stop-color="transparent"></stop>
        <stop offset="66%" stop-color="transparent"></stop>
        <stop offset="89%" stop-color="rgba(188, 0, 55, 0.4)"></stop>
      </radialGradient>
      <mask id="trackForeground">
        <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
        <path
          fill="white"
          stroke="white"
          d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
        ></path>
      </mask>
      <radialGradient id="trackForegroundFill">
        <stop offset="69%" stop-color="#cb005e"></stop>
        <stop offset="100%" stop-color="#ff234b"></stop>
      </radialGradient>
      <filter id="trackForegroundDropShadow1" filterUnits="userSpaceOnUse">
        <feDropShadow
          dx="0"
          dy="0"
          flood-color="#ed2343"
          flood-opacity="0.5"
          stdDeviation="20"
        ></feDropShadow>
      </filter>
      <filter id="trackForegroundDropShadow2" filterUnits="userSpaceOnUse">
        <feDropShadow
          dx="0"
          dy="0"
          flood-color="#41000c"
          flood-opacity="0.9"
          stdDeviation="3"
        ></feDropShadow>
      </filter>
      <filter id="trackForegroundDropShadow3" filterUnits="userSpaceOnUse">
        <feDropShadow
          dx="0"
          dy="0"
          flood-color="#ed2343"
          flood-opacity="1"
          stdDeviation="6"
        ></feDropShadow>
        <feDropShadow
          dx="0"
          dy="0"
          flood-color="#ed2343"
          flood-opacity="0.5"
          stdDeviation="6"
        ></feDropShadow>
      </filter>
      <filter id="trackForegroundInsetShadow1">
        <feOffset dx="0" dy="-10"></feOffset>
        <feGaussianBlur stdDeviation="10" result="offset-blur"></feGaussianBlur>
        <feComposite
          operator="out"
          in="SourceGraphic"
          in2="offset-blur"
          result="inverse"
        ></feComposite>
        <feFlood
          flood-color="#ffc0cb"
          flood-opacity="0.7"
          result="color"
        ></feFlood>
        <feComposite
          operator="in"
          in="color"
          in2="inverse"
          result="shadow"
        ></feComposite>
        <feComponentTransfer in="shadow" result="shadow">
          <feFuncA type="linear" slope="1"></feFuncA>
        </feComponentTransfer>
      </filter>
      <filter id="trackForegroundInsetShadow2">
        <feOffset dx="0" dy="-2"></feOffset>
        <feGaussianBlur stdDeviation="4" result="offset-blur"></feGaussianBlur>
        <feComposite
          operator="out"
          in="SourceGraphic"
          in2="offset-blur"
          result="inverse"
        ></feComposite>
        <feFlood
          flood-color="#cf0020"
          flood-opacity="1"
          result="color"
        ></feFlood>
        <feComposite
          operator="in"
          in="color"
          in2="inverse"
          result="shadow"
        ></feComposite>
        <feComponentTransfer in="shadow" result="shadow">
          <feFuncA type="linear" slope="1"></feFuncA>
        </feComponentTransfer>
      </filter>
      <filter id="trackForegroundInsetShadow3">
        <feOffset dx="0" dy="-10"></feOffset>
        <feGaussianBlur stdDeviation="5" result="offset-blur"></feGaussianBlur>
        <feComposite
          operator="out"
          in="SourceGraphic"
          in2="offset-blur"
          result="inverse"
        ></feComposite>
        <feFlood
          flood-color="white"
          flood-opacity="0.1"
          result="color"
        ></feFlood>
        <feComposite
          operator="in"
          in="color"
          in2="inverse"
          result="shadow"
        ></feComposite>
        <feComponentTransfer in="shadow" result="shadow">
          <feFuncA type="linear" slope="1"></feFuncA>
        </feComponentTransfer>
      </filter>
    </defs>

    <path
      fill="#ff234b"
      filter="url(#trackForegroundDropShadow2)"
      mask="url(#trackBackground)"
      d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
    ></path>
    <circle
      cx="50%"
      cy="50%"
      fill="url(#trackForegroundFill)"
      mask="url(#trackForeground)"
      r="145"
    ></circle>
  </svg>
);

const full = (
  <div class="c17hj48u s1wankt3 dir dir-ltr" style="--angle: 120deg;">
    <div class="t1h4y4bb dir dir-ltr"></div>
    <div class="t178krht dir dir-ltr"></div>
    <div class="i1g3hhz1 dir dir-ltr">
      <div aria-hidden="true" class="oito7zs dir dir-ltr" data-lang="en">
        <div class="o1s1tobx dir dir-ltr">4</div>
        <div class="okvcgj0 dir dir-ltr" data-lang="en">
          months
        </div>
      </div>
    </div>
    <div
      aria-label="Number of months"
      aria-valuemax="12"
      aria-valuemin="1"
      aria-valuenow="4"
      aria-valuetext="4 months"
      class="ti6o12m dir dir-ltr"
      role="slider"
      tabindex="0"
    ></div>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 45.4071px; left: 202.5px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 87.5px; left: 244.593px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 145px; left: 260px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 202.5px; left: 244.593px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 244.593px; left: 202.5px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 260px; left: 145px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 244.593px; left: 87.5px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 202.5px; left: 45.4071px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 145px; left: 30px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 87.5px; left: 45.4071px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 45.4071px; left: 87.5px;"
    ></span>
    <span
      aria-hidden="true"
      class="d1u68d5p dir dir-ltr"
      style="top: 30px; left: 145px;"
    ></span>
    <svg
      aria-hidden="true"
      class="sluqdv6 dir dir-ltr"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="trackBackground">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <circle
            cx="50%"
            cy="50%"
            fill="none"
            r="115"
            stroke="white"
            stroke-width="60"
          ></circle>
          <path
            fill="black"
            filter="blur(10px)"
            d="M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 273.6726188957804 273.6726188957803 L 273.6726188957804 334 L 157 334 L 157 157"
          ></path>
        </mask>
        <radialGradient id="trackBackgroundInnerShadow">
          <stop offset="56%" stop-color="rgba(188, 0, 55, 0.6)"></stop>
          <stop offset="62%" stop-color="transparent"></stop>
          <stop offset="66%" stop-color="transparent"></stop>
          <stop offset="89%" stop-color="rgba(188, 0, 55, 0.4)"></stop>
        </radialGradient>
        <mask id="trackForeground">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <path
            fill="white"
            stroke="white"
            d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
          ></path>
        </mask>
        <radialGradient id="trackForegroundFill">
          <stop offset="69%" stop-color="#cb005e"></stop>
          <stop offset="100%" stop-color="#ff234b"></stop>
        </radialGradient>
        <filter id="trackForegroundDropShadow1" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="0.5"
            stdDeviation="20"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundDropShadow2" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#41000c"
            flood-opacity="0.9"
            stdDeviation="3"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundDropShadow3" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="1"
            stdDeviation="6"
          ></feDropShadow>
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="0.5"
            stdDeviation="6"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundInsetShadow1">
          <feOffset dx="0" dy="-10"></feOffset>
          <feGaussianBlur
            stdDeviation="10"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="#ffc0cb"
            flood-opacity="0.7"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id="trackForegroundInsetShadow2">
          <feOffset dx="0" dy="-2"></feOffset>
          <feGaussianBlur
            stdDeviation="4"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="#cf0020"
            flood-opacity="1"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id="trackForegroundInsetShadow3">
          <feOffset dx="0" dy="-10"></feOffset>
          <feGaussianBlur
            stdDeviation="5"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="white"
            flood-opacity="0.1"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
      </defs>
      <circle
        cx="50%"
        cy="50%"
        fill="url(#trackBackgroundInnerShadow)"
        filter="blur(10px)"
        mask="url(#trackBackground)"
        r="145"
      ></circle>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundDropShadow1)"
        mask="url(#trackBackground)"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundDropShadow2)"
        mask="url(#trackBackground)"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <circle
        cx="50%"
        cy="50%"
        fill="url(#trackForegroundFill)"
        mask="url(#trackForeground)"
        r="145"
      ></circle>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow1)"
        stroke="#ff234b"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow2)"
        stroke="#ff234b"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow3)"
        stroke="#ff234b"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
    </svg>
    <div aria-hidden="true" class="wowqio9 dir dir-ltr" inert="true"></div>
  </div>
);
