import React, { useState } from "react";
import { getBezierPath } from "reactflow";
import AddButton from "./AddButton";

const foreignObjectSize = 40;

export default function PlusNode({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: any) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const onEdgeClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: any
  ) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
  };

  console.log(data.activeNode);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={348.7}
        height={300}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml">
        <AddButton
          activeNode={data.activeNode}
          setEdges={data.setEdges}
          setNodes={data.setNodes}
          nodes={data.nodes}
          openDrawer={openDrawer}
          setOpen={setOpen}
          setOpenDrawer={setOpenDrawer}
          open={open}
        />
      </foreignObject>
    </>
  );
}
