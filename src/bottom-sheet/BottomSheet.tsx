import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function BottomSheet() {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState<number>(0);
  const [startHeight, setStartHeight] = useState<number>(0);

  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  const showBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.add("show");
      document.body.style.overflowY = "hidden";
      updateSheetHeight(50);
    }
  };

  const updateSheetHeight = (height: number) => {
    if (sheetContentRef.current) {
      sheetContentRef.current.style.height = `${height}vh`;
      if (bottomSheetRef.current) {
        bottomSheetRef.current.classList.toggle("fullscreen", height === 100);
      }
    }
  };

  const hideBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.remove("show");
      document.body.style.overflowY = "auto";
    }
  };

  const dragStart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent
  ) => {
    setIsDragging(true);
    setStartY(
      (e as React.MouseEvent<HTMLDivElement, MouseEvent>).pageY ||
        (e as TouchEvent).touches?.[0].pageY
    );
    setStartHeight(parseInt(sheetContentRef.current?.style.height || "0"));
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.add("dragging");
    }
  };

  const dragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const delta =
      startY -
      ((e as MouseEvent).pageY || (e as TouchEvent).touches?.[0].pageY);
    const newHeight = startHeight + (delta / window.innerHeight) * 100;
    updateSheetHeight(newHeight);
  };

  const dragStop = () => {
    setIsDragging(false);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.remove("dragging");
    }
    const sheetHeight = parseInt(sheetContentRef.current?.style.height || "0");
    sheetHeight < 25
      ? hideBottomSheet()
      : sheetHeight > 75
      ? updateSheetHeight(100)
      : updateSheetHeight(50);
  };

  useEffect(() => {
    document.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    document.addEventListener("touchmove", dragging);
    document.addEventListener("touchend", dragStop);

    return () => {
      document.removeEventListener("touchmove", dragging);
      document.removeEventListener("touchend", dragStop);
      document.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
    };
  }, [isDragging]);
  return (
    <div>
      <button className="show-modal" onClick={showBottomSheet}>
        Show Modal
      </button>
      <div ref={bottomSheetRef} className="bottom-sheet">
        <div className="sheet-overlay" onClick={hideBottomSheet}></div>
        <div
          ref={sheetContentRef}
          className="content"
          style={{ height: "50vh" }}
        >
          <div className="header">
            <div className="drag-icon" onMouseDown={(e) => dragStart(e)}>
              <span></span>
            </div>
          </div>
          <div className="body">
            <h2>Bottom Sheet Modal</h2>
            <p>
              Create a bottom sheet modal that functions similarly to Facebook
              modal using HTML CSS and JavaScript. This modal allows user to
              view its contents, drag it up or down, and close it. It also works
              on touch-enabled devices. Lorem Ipsum are simply dummy text of
              there printing and typesetting industry. Lorem new Ipsum has been
              the industryss standard dummy text ever since the 1500s, when an
              off unknown printer tooks a galley of type and scrambled it to
              makes type spemen book It has survived not only five centuries.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              quae facere, quaerat deleniti, voluptates optio ipsam ipsum
              beatae, maxime quis ea quasi minima numquam. Minima accusamus
              reiciendis, impedit blanditiis nulla quia? Odio deleniti commodi
              id nesciunt voluptas cumque odit, vel molestias ratione sit
              consectetur inventore error ullam magni labore voluptate doloribus
              sed similique. Delectus non pariatur eligendi eos voluptatum
              provident eveniet consequuntur. Laboriosam, nesciunt reiciendis
              libero sunt adipisci numquam voluptas ullam, iure voluptates
              soluta mollitia quam voluptatem? Nemo, ipsum magnam.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
              eligendi commodi tenetur est beatae cupiditate incidunt aspernatur
              asperiores repudiandae? Odit, nulla modi ducimus assumenda ad
              voluptatem explicabo laudantium est unde ea similique excepturi
              fugiat nisi facere ab pariatur libero eius aperiam, non
              accusantium, asperiores optio. Accusantium, inventore in. Quaerat
              exercitationem aut, alias dolorem facere atque sint quo quasi
              vitae sed corrupti perferendis laborum eligendi repudiandae esse
              autem doloribus sapiente deleniti.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              voluptates, animi ipsa explicabo assumenda molestiae adipisci.
              Amet, dignissimos reiciendis, voluptatibus placeat quo ab
              quibusdam illum repellat, ad molestias quaerat saepe modi aperiam
              distinctio dolore id sapiente molestiae quas! Animi optio nobis
              nesciunt pariatur? Non necessitatibus mollitia veniam nihil eos
              natus libero quaerat vitae maiores. Praesentium nesciunt natus
              tempora. Doloremque, fuga?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
              deleniti a non dolorem delectus possimus distinctio! Nemo officiis
              tempore quos culpa fugit iste suscipit minus voluptatem, officia
              dicta ad deleniti harum voluptatibus dignissimos in, commodi
              placeat accusamus sint tenetur non natus? Error fugit quasi
              repudiandae mollitia doloribus officia eius magnam ratione soluta
              aut in iusto vel ut minima, at facere, minus sequi earum dolores
              animi ipsa nihil labore. Odio eius vitae iste repellendus
              molestias, amet sapiente laudantium optio, provident dignissimos
              voluptatum nesciunt nemo magni obcaecati commodi officiis delectus
              esse sed.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
              atque labore eligendi iusto sint! Fuga vel eius dolor eligendi ab
              cumque, maxime commodi, ducimus inventore temporibus illo delectus
              iste, quisquam ipsum labore eaque ipsa soluta praesentium
              voluptatem accusamus amet recusandae. Veniam necessitatibus
              laboriosam deleniti maxime, saepe vitae officia tempora voluptates
              voluptas ratione fugiat ad? Nostrum explicabo, earum dolor magnam
              commodi maiores iusto delectus porro ducimus architecto non enim
              eum, perspiciatis facere mollitia. Minus, mollitia animi! Nostrum
              deleniti, error quia hic eum modi? Corrupti illo provident dolores
              qui enim, expedita adipisci.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
