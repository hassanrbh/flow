import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const InputCrossRoad = ({ data }: any) => {
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <div
        className={`${
          data.color === "green" ? "border-green-400" : "border border-dashed"
        }  bg-[#f3f7fb]  border-green-400 outline-none`}
        style={{
          borderRadius: "10px",
          borderWidth: "2px",
        }}>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={`outline-none ${
            data.color === "green" ? "text-green-600" : "text-[#373873]"
          } bg-[#f3f7fb]  text-sm ml-4  font-semibold`}
        />
      </div>

      <Handle type="target" position={Position.Top} className={"invisible"} />
      <Handle
        type="source"
        position={Position.Bottom}
        className={"invisible"}
      />
    </div>
  );
};

export default InputCrossRoad;
