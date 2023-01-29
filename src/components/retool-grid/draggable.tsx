import React from "react";

interface DraggableState {
  isDragging: boolean;
  originalX: number;
  originalY: number;
  translateX: number;
  translateY: number;
  lastTranslateX: number;
  lastTranslateY: number;
  multiplier: number;
}
interface Props {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrag?: (value: { translateX: number; translateY: number }) => void;
  children: React.ReactNode;
  n: number;
}
// origin is the starting point
// lastTranslateX is where it was left off
// translateX is the current
export default class Draggable extends React.Component<Props, DraggableState> {
  state = {
    isDragging: false,
    originalX: 0,
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    multiplier: 0,
  };
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }
  handleMouseDown = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
    });
  };
  handleMouseMove = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    const { isDragging } = this.state;
    const { onDrag, n } = this.props;
    // console.log(clientX);
    if (!isDragging) {
      return;
    }
    // "where i am in the container" - "where I dragged from" + "offset from my very beginning"
    // clientX - this.state.originalX = how much I moved
    // lastTranslateX: where I was originally in the dom when the broswer painted me

    // const newX = clientX - this.state.originalX + this.state.lastTranslateX;
    const newY = clientY - this.state.originalY + this.state.lastTranslateY;

    // problem is, after it went left, horizonalDiff is negative
    // when we go right again, horinzontalDiff is poistive, but its less than the current translateX
    // so it will get the negative n

    const horizontalDiff =
      clientX - this.state.originalX + this.state.lastTranslateX;
    const multiplier = Math.floor(Math.abs(horizontalDiff) / n);

    if (multiplier !== this.state.multiplier) {
      const dir = horizontalDiff > this.state.translateX ? n : -n;

      const translateX = this.state.translateX + dir;
      this.setState({
        translateX,
        translateY: newY,
        multiplier,
      });
    }
  };
  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.setState(
      {
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,
        isDragging: false,
        multiplier: 0,
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  };
  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;
    const dragStyle = isDragging ? { opacity: 0.8, cursor: "grabbing" } : {};
    return (
      <>
        <div>{`translatex: ${translateX} translatey:${translateY}`}</div>
        <div
          onMouseDown={this.handleMouseDown}
          style={{
            transform: `translate(
                ${translateX}px, ${translateY}px)`,
            ...dragStyle,
          }}
        >
          {children}
        </div>
      </>
    );
  }
}
// import React from "react";

// interface DraggableState {
//   isDragging: boolean;

//   x: number;
//   y: number;
// }
// interface Props {
//   onDragStart?: () => void;
//   onDragEnd?: () => void;
//   onDrag?: (value: { translateX: number; translateY: number }) => void;
//   children: React.ReactNode;
//   n: number;
// }
// // origin is the starting point
// // lastTranslateX is where it was left off
// // translateX is the current
// export default class Draggable extends React.Component<Props, DraggableState> {
//   state = {
//     isDragging: false,

//     x: 0,
//     y: 0,
//   };

//   componentWillUnmount() {
//     window.removeEventListener("mousemove", this.handleMouseMove);
//     window.removeEventListener("mouseup", this.handleMouseUp);
//   }

//   handleMouseDown = ({
//     clientX,
//     clientY,
//   }: {
//     clientX: number;
//     clientY: number;
//   }) => {
//     window.addEventListener("mousemove", this.handleMouseMove);
//     window.addEventListener("mouseup", this.handleMouseUp);

//     if (this.props.onDragStart) {
//       this.props.onDragStart();
//     }
//     console.log(clientX, clientY);
//     this.setState({
//       x: clientX,
//       y: clientY,
//       isDragging: true,
//     });
//   };

//   handleMouseMove = ({
//     clientX,
//     clientY,
//   }: {
//     clientX: number;
//     clientY: number;
//   }) => {
//     const { isDragging } = this.state;
//     const { onDrag } = this.props;

//     console.log(clientX);
//     if (!isDragging) {
//       return;
//     }

//     this.setState({ x: clientX, y: clientY });

//     // this.setState(
//     //   (prevState) => {
//     //     const newX = clientX - prevState.originalX + prevState.lastTranslateX;
//     //     const newY = clientY - prevState.originalY + prevState.lastTranslateY;

//     //     return {
//     //       translateX: newX,
//     //       translateY: newY,
//     //     };
//     //   },
//     //   () => {
//     //     if (onDrag) {
//     //       onDrag({
//     //         translateX: this.state.translateX,
//     //         translateY: this.state.translateY,
//     //       });
//     //     }
//     //   }
//     // );
//   };

//   handleMouseUp = () => {
//     window.removeEventListener("mousemove", this.handleMouseMove);
//     window.removeEventListener("mouseup", this.handleMouseUp);

//     this.setState(
//       {
//         isDragging: false,
//       },
//       () => {
//         if (this.props.onDragEnd) {
//           this.props.onDragEnd();
//         }
//       }
//     );
//   };

//   render() {
//     const { children } = this.props;
//     const { x, y, isDragging } = this.state;

//     const dragStyle = isDragging ? { opacity: 0.8, cursor: "grabbing" } : {};

//     return (
//       <>
//         <div>
//           `x:${x} y:${y}`
//         </div>
//         <div
//           onMouseDown={this.handleMouseDown}
//           style={{
//             transform: `translate(${x}px, ${y}px)`,
//             ...dragStyle,
//           }}
//         >
//           {children}
//         </div>
//       </>
//     );
//   }
// }
