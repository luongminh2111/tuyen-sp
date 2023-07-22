import React, { useState, useRef, useEffect } from "react";
import "../styles/DragTaskItem.scss";

function DragTaskItem({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  if (list?.length === 0) return null;

  return (
    <div className="drag-n-drop">
      {list.map((item, grpI) => {
        return (
          <div className="drag-item">
            <div
              className={`status-title ${item?.status}`}
              style={{ marginBottom: "16px" }}
            >
              <span>
                <i className="fa-solid fa-circle"></i>
              </span>
              <span>{item?.status || "Open"}</span>
              <span style={{ marginLeft: "8px" }}>({3})</span>
            </div>
            <div
              key={item.title}
              onDragEnter={
                dragging && !item.items.length
                  ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                  : null
              }
              className="list-issue"
            >
              {item.items.map((item, itemI) => (
                <div
                  draggable
                  key={item}
                  onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
                  onDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, { grpI, itemI });
                        }
                      : null
                  }
                  className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                >
                  <div className="task-item">
                    <div className="row-1 mb-2 mt-2">
                      <div className="_left">
                        <div className="type">Task</div>
                        <div className="prj-name">PMA_web</div>
                      </div>
                      <div className="_right">
                        <div className="dots">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      </div>
                    </div>
                    <div className="row-2">
                      <div className="desc">Sơ đồ luồng hệ thống</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DragTaskItem;
