import React from "react";

interface DraggableState {
  isDragging: boolean;

  originalX: number;
  originalY: number;

  translateX: number;
  translateY: number;

  lastTranslateX: number;
  lastTranslateY: number;
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
    const { onDrag } = this.props;
    console.log(clientX);
    if (!isDragging) {
      return;
    }

    this.setState(
      (prevState) => {
        const newX = clientX - prevState.originalX + prevState.lastTranslateX;
        const newY = clientY - prevState.originalY + prevState.lastTranslateY;

        return {
          translateX: newX,
          translateY: newY,
        };
      },
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY,
          });
        }
      }
    );
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false,
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
      <div
        onMouseDown={this.handleMouseDown}
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`,
          ...dragStyle,
        }}
      >
        {children}
      </div>
    );
  }
}
