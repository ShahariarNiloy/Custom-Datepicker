import { useCallback, useEffect, useRef } from "react";
import "./Slider.css";

interface SliderOptions {
  sliders: SliderConfig[];
}

interface SliderConfig {
  radius: number;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  color?: string;
  displayName?: string;
}

export function Slider({ sliders }: SliderOptions) {
  const sliderWidth = 290;
  const sliderHeight = 290;
  const cx = sliderWidth / 2;
  const cy = sliderHeight / 2;
  const tau = 2 * Math.PI;
  let mouseDown = false;
  let activeSlider: Element | null = null;
  const arcFractionLength = 10;
  const initialArcFractionSpacing = 0.85;
  const arcFractionThickness = 25;
  const arcBgFractionColor = "#D8D8D8";
  const handleFillColor = "#fff";
  const handleStrokeColor = "#888888";
  const handleStrokeThickness = 3;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svgGRef = useRef<SVGSVGElement | null>(null);
  const sliderPathRef = useRef<SVGPathElement | null>(null);
  const sliderActivePathRef = useRef<SVGPathElement | null>(null);
  const sliderHandleRef = useRef<SVGCircleElement | null>(null);

  const drawArcPath = useCallback(
    (
      color: string,
      radius: number,
      angle: number,
      singleSpacing: number,
      type: string
    ): void => {
      const path =
        type === "active" ? sliderActivePathRef.current : sliderPathRef.current;
      if (path) {
        path.setAttribute("d", describeArc(cx, cy, radius, 0, angle));
        path.style.stroke = color;
        path.style.strokeWidth = String(arcFractionThickness);
        path.style.fill = "none";
      }
    },
    []
  );
  const drawSingleSliderOnInit = useCallback(
    (slider: SliderConfig, index: number): void => {
      slider.radius = slider.radius ?? 50;
      slider.min = slider.min ?? 0;
      slider.max = slider.max ?? 1000;
      slider.step = slider.step ?? 50;
      slider.initialValue = slider.initialValue ?? 0;
      slider.color = slider.color ?? "#FF5733";

      // Calculate slider circumference
      const circumference: number = slider.radius * tau;

      // Calculate initial angle
      const initialAngle: number = Math.floor(
        (slider.initialValue / (slider.max - slider.min)) * 360
      );

      // Calculate spacing between arc fractions
      const arcFractionSpacing: number = calculateSpacingBetweenArcFractions(
        circumference,
        arcFractionLength,
        initialArcFractionSpacing
      );

      // Create a single slider group - holds all paths and handle
      const sliderGroup: SVGSVGElement = svgGRef.current as SVGSVGElement;
      sliderGroup.setAttribute("data-slider", `${index}`);
      sliderGroup.setAttribute(
        "transform",
        "rotate(-90," + cx + "," + cy + ")"
      );
      sliderGroup.setAttribute("rad", `${slider.radius}`);

      // Draw background arc path
      drawArcPath(
        arcBgFractionColor,
        slider.radius,
        360,
        arcFractionSpacing,
        "bg"
        //   sliderGroup
      );

      // Draw active arc path
      drawArcPath(
        slider.color,
        slider.radius,
        initialAngle,
        arcFractionSpacing,
        "active"
        //   sliderGroup
      );

      // Draw handle
      drawHandle(slider, initialAngle, sliderGroup);
    },
    [cx, cy, drawArcPath, drawHandle, tau]
  );

  const draw = useCallback(() => {
    const svgContainer: HTMLDivElement =
      svgContainerRef.current as HTMLDivElement;
    // const svg: SVGElement = svgRef.current as SVGElement;

    sliders.forEach((slider, index) => drawSingleSliderOnInit(slider, index));

    svgContainer.addEventListener("mousedown", mouseTouchStart, false);
    svgContainer.addEventListener("touchstart", mouseTouchStart, false);
    svgContainer.addEventListener("mousemove", mouseTouchMove, false);
    svgContainer.addEventListener("touchmove", mouseTouchMove, false);
    window.addEventListener("mouseup", mouseTouchEnd, false);
    window.addEventListener("touchend", mouseTouchEnd, false);
  }, [
    drawSingleSliderOnInit,
    mouseTouchEnd,
    mouseTouchMove,
    mouseTouchStart,
    sliders,
  ]);

  function drawHandle(
    slider: SliderConfig,
    initialAngle: number,
    group: Element
  ): void {
    const handleCenter: { x: number; y: number } = calculateHandleCenter(
      (initialAngle * tau) / 360,
      slider.radius
    );

    // Draw handle
    const handle = sliderHandleRef.current;
    if (handle) {
      handle.setAttribute("cx", String(handleCenter.x));
      handle.setAttribute("cy", String(handleCenter.y));
      handle.setAttribute("r", String(arcFractionThickness / 2));
      handle.style.stroke = handleStrokeColor;
      handle.style.strokeWidth = String(handleStrokeThickness);
      handle.style.fill = handleFillColor;
      group.appendChild(handle);
    }
  }

  //   function createLegendUI(): void {
  //     // Create legend
  //     const display: HTMLUListElement | null = document.createElement("ul");
  //     display.classList.add("slider__legend");

  //     // Legend heading
  //     const heading: HTMLHeadingElement = document.createElement("h2");
  //     heading.innerText = "Legend";
  //     display.appendChild(heading);

  //     // Legend data for all sliders
  //     sliders.forEach((slider, index) => {
  //       const li: HTMLLIElement = document.createElement("li");
  //       li.setAttribute("data-slider", String(index));
  //       const firstSpan: HTMLSpanElement = document.createElement("span");
  //       firstSpan.style.backgroundColor = slider.color ?? "#FF5733";
  //       firstSpan.classList.add("colorSquare");
  //       const secondSpan: HTMLSpanElement = document.createElement("span");
  //       secondSpan.innerText = slider.displayName ?? "Unnamed value";
  //       const thirdSpan: HTMLSpanElement = document.createElement("span");
  //       thirdSpan.innerText = String(slider.initialValue ?? 0);
  //       thirdSpan.classList.add("sliderValue");
  //       li.appendChild(firstSpan);
  //       li.appendChild(secondSpan);
  //       li.appendChild(thirdSpan);
  //       display.appendChild(li);
  //     });
  //     if (containerRef.current) containerRef.current.appendChild(display);
  //   }

  function redrawActiveSlider(rmc: { x: number; y: number }): void {
    const activePath: Element | null = (activeSlider as Element).querySelector(
      ".sliderSinglePathActive"
    );
    const radius: number = +((activeSlider as Element).getAttribute(
      "rad"
    ) as string);
    const currentAngle: number = calculateMouseAngle(rmc) * 0.999;

    // Redraw active path
    (activePath as Element).setAttribute(
      "d",
      describeArc(cx, cy, radius, 0, radiansToDegrees(currentAngle))
    );

    // Redraw handle
    const handle: Element | null = (activeSlider as Element).querySelector(
      ".sliderHandle"
    );
    const handleCenter: { x: number; y: number } = calculateHandleCenter(
      currentAngle,
      radius
    );
    if (handle) {
      handle.setAttribute("cx", String(handleCenter.x));
      handle.setAttribute("cy", String(handleCenter.y));
    }

    // Update legend
    // updateLegendUI(currentAngle);
  }

  //   function updateLegendUI(currentAngle: number): void {
  //     if (!activeSlider) return;
  //     const targetSlider: string | null =
  //       activeSlider.getAttribute("data-slider");
  //     const targetLegend: Element | HTMLDataListElement | null =
  //       document.querySelector(`li[data-slider="${targetSlider}"] .sliderValue`);
  //     const currentSlider: SliderConfig = sliders[0] as SliderConfig;

  //     const currentSliderRange: number =
  //       currentSlider.max && currentSlider.min
  //         ? currentSlider.max - currentSlider.min
  //         : 0;
  //     let currentValue: number = (currentAngle / tau) * currentSliderRange;
  //     const numOfSteps: number = currentSlider.step
  //       ? Math.round(currentValue / currentSlider.step)
  //       : 0;
  //     currentValue = currentSlider.min + numOfSteps * currentSlider.step;
  //     if (targetLegend && targetLegend instanceof HTMLDataListElement)
  //       targetLegend.innerText = String(currentValue);
  //   }

  function mouseTouchStart(e: MouseEvent | TouchEvent): void {
    if (mouseDown) return;
    mouseDown = true;
    const rmc: { x: number; y: number } = getRelativeMouseOrTouchCoordinates(e);
    findClosestSlider(rmc);
    redrawActiveSlider(rmc);
  }

  function mouseTouchMove(e: MouseEvent | TouchEvent): void {
    if (!mouseDown) return;
    e.preventDefault();
    const rmc: { x: number; y: number } = getRelativeMouseOrTouchCoordinates(e);
    redrawActiveSlider(rmc);
  }

  function mouseTouchEnd(): void {
    if (!mouseDown) return;
    mouseDown = false;
    activeSlider = null;
  }

  function calculateSpacingBetweenArcFractions(
    circumference: number,
    arcBgFractionLength: number,
    arcBgFractionBetweenSpacing: number
  ): number {
    const numFractions: number = Math.floor(
      (circumference / arcBgFractionLength) * arcBgFractionBetweenSpacing
    );
    const totalSpacing: number =
      circumference - numFractions * arcBgFractionLength;
    return totalSpacing / numFractions;
  }

  function describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string {
    const endAngleOriginal: number = endAngle;

    if (endAngleOriginal - startAngle === 360) {
      endAngle = 359;
    }

    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    let path = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      arcSweep,
      0,
      end.x,
      end.y,
    ].join(" ");

    if (endAngleOriginal - startAngle === 360) {
      path += "z";
    }

    return path;
  }

  function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): { x: number; y: number } {
    const angleInRadians: number = (angleInDegrees * Math.PI) / 180;
    const x: number = centerX + radius * Math.cos(angleInRadians);
    const y: number = centerY + radius * Math.sin(angleInRadians);
    return { x, y };
  }

  function calculateHandleCenter(
    angle: number,
    radius: number
  ): { x: number; y: number } {
    const x: number = cx + Math.cos(angle) * radius;
    const y: number = cy + Math.sin(angle) * radius;
    return { x, y };
  }

  function getRelativeMouseOrTouchCoordinates(e: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    const containerRect: DOMRect = (
      document.querySelector(".slider__data") as Element
    ).getBoundingClientRect();
    let clientPosX: number = 0,
      clientPosY: number = 0;

    // Touch Event triggered
    if (window.TouchEvent && e instanceof TouchEvent) {
      clientPosX = e.touches[0].pageX;
      clientPosY = e.touches[0].pageY;
    }
    // Mouse Event Triggered
    else if (window.MouseEvent && e instanceof MouseEvent) {
      clientPosX = e.clientX;
      clientPosY = e.clientY;
    }

    // Get Relative Position
    const x = clientPosX - containerRect.left;
    const y = clientPosY - containerRect.top;

    return { x, y };
  }

  function calculateMouseAngle(rmc: { x: number; y: number }): number {
    const angle: number = Math.atan2(rmc.y - cy, rmc.x - cx);

    if (angle > -tau / 2 && angle < -tau / 4) {
      return angle + tau * 1.25;
    } else {
      return angle + tau * 0.25;
    }
  }

  function radiansToDegrees(angle: number): number {
    return angle / (Math.PI / 180);
  }

  function findClosestSlider(rmc: { x: number; y: number }): void {
    const mouseDistanceFromCenter: number = Math.hypot(rmc.x - cx, rmc.y - cy);
    const container: Element | null = document.querySelector(".slider__data");
    const sliderGroups: Element[] = container
      ? Array.from(container.querySelectorAll("g"))
      : [];

    // Get distances from client coordinates to each slider
    const distances: number[] = sliderGroups.map((slider) => {
      const rad: number = parseInt(slider.getAttribute("rad") as string);
      return Math.min(Math.abs(mouseDistanceFromCenter - rad));
    });

    // Find closest slider
    const closestSliderIndex: number = distances.indexOf(
      Math.min(...distances)
    );
    activeSlider = sliderGroups[closestSliderIndex];
  }

  useEffect(() => {
    draw();
  }, [draw]);
  return (
    <div className="container">
      <h1>JS Round Range Slider App</h1>

      <div className="c17hj48u s1wankt3 dir dir-ltr">
        <div className="t1h4y4bb dir dir-ltr"></div>
        <div className="t178krht dir dir-ltr"></div>
        <div className="i1g3hhz1 dir dir-ltr">
          <div
            aria-hidden="true"
            className="oito7zs dir dir-ltr"
            data-lang="en"
          >
            <div className="o1s1tobx dir dir-ltr">4</div>
            <div className="okvcgj0 dir dir-ltr" data-lang="en">
              months
            </div>
          </div>
        </div>
        <div
          aria-label="Number of months"
          aria-valuemax={12}
          aria-valuemin={1}
          aria-valuenow={4}
          aria-valuetext="4 months"
          className="ti6o12m dir dir-ltr"
          role="slider"
          tabIndex={0}
        ></div>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "45.4071px", left: "202.5px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "87.5px", left: "244.593px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "145px", left: "260px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "202.5px", left: "244.593px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "244.593px", left: "202.5px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "260px", left: "145px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "244.593px", left: "87.5px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "202.5px", left: "45.4071px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "145px", left: "30px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "87.5px", left: "45.4071px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: " 45.4071px", left: "87.5px" }}
        ></span>
        <span
          aria-hidden="true"
          className="d1u68d5p dir dir-ltr"
          style={{ top: "30px", left: "145px" }}
        ></span>
        <div id="app" ref={containerRef}>
          <div
            className="slider__data"
            ref={svgContainerRef}
            style={{ zIndex: "999" }}
          >
            <svg height={sliderWidth} width={sliderWidth} ref={svgRef}>
              <defs>
                <mask id="trackBackground">
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="black"
                  ></rect>
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
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="black"
                  ></rect>
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
                <filter
                  id="trackForegroundDropShadow1"
                  filterUnits="userSpaceOnUse"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    flood-color="#ed2343"
                    flood-opacity="0.5"
                    stdDeviation="20"
                  ></feDropShadow>
                </filter>
                <filter
                  id="trackForegroundDropShadow2"
                  filterUnits="userSpaceOnUse"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    flood-color="#41000c"
                    flood-opacity="0.9"
                    stdDeviation="3"
                  ></feDropShadow>
                </filter>
                <filter
                  id="trackForegroundDropShadow3"
                  filterUnits="userSpaceOnUse"
                >
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
              <g className="sliderSingle" ref={svgGRef}>
                {/* <path className="sliderSinglePath" ref={sliderPathRef} /> */}
                <path
                  className="sliderSinglePathActive"
                  fill="#ff234b"
                  filter="url(#trackForegroundDropShadow2)"
                  //   mask="url(#trackBackground)"
                  ref={sliderActivePathRef}
                />
                <circle className="sliderHandle" ref={sliderHandleRef} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
