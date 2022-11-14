import React, { memo } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ data, isConnectable }: any) => {
  return (
    <div
      className={`pl-[0.5rem] pr-[1rem] py-2 shadow-md rounded-full bg-white border-2 border-stone-400 ${
        data.hidden ? "invisible" : "visible"
      }`}>
      <div className="flex items-center w-[260px]">
        <div className="rounded-full w-[4.5rem] h-[4.5rem] flex justify-center items-center bg-gray-100 ">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold ml-3 text-[#292b68]">
            {data.name}
          </div>
        </div>
      </div>

      {data.position === "bottom" ? (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-[70px] h-[70px] visible p-[5px] bottom-[-12px] !bg-[#6865f1] "
        />
      ) : (
        <>
          {data.label === "temporery" ? (
            <Handle
              type="target"
              position={Position.Top}
              className="w-[70px] h-[70px] visible p-[5px]  bottom-[-12px] !bg-[#6865f1] "
            />
          ) : (
            <>
              <Handle
                type="target"
                position={Position.Top}
                className="w-[70px] h-[70px] visible p-[5px]  bottom-[-12px] !bg-[#6865f1] "
              />
              <Handle
                type="source"
                position={Position.Bottom}
                className="w-[70px] h-[70px] visible p-[5px]  bottom-[-12px] !bg-[#6865f1] "
              />
            </>
          )}
        </>
      )}
    </div>
  );
});
