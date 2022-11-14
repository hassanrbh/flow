import {
  IconCirclesRelation,
  IconMedicalCrossOff,
  IconPlane,
  IconPlus,
  IconX,
} from "@tabler/icons";
import { Handle, Position } from "reactflow";

type Props = {};

function CrossRoad({}: Props) {
  return (
    <div>
      <div
        className={
          " rounded-full w-[50px] h-[50px] border-4 border-green-200 flex items-center justify-center bg-white"
        }>
        <IconMedicalCrossOff
          size={30}
          className={"text-green-400 bg-green-100 rounded-full "}
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className={
          "w-[70px] h-[70px] visible p-[5px] bottom-[-12px] !bg-[#6865f1] "
        }
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={
          "!w-[20px] !h-[20px] !bg-green-500 !bottom-[-15px] flex justify-center items-center"
        }>
        <IconPlus
          size={15}
          strokeWidth={4}
          className={"text-white font-bold"}
        />
      </Handle>
    </div>
  );
}

export default CrossRoad;
