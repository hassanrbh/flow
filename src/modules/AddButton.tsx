import { Drawer, TextInput } from "@mantine/core";
import {
  IconPlus,
  IconTool,
  IconSearch,
  IconTooltip,
  IconDirection,
  Icon360View,
  IconPentagram,
} from "@tabler/icons";
import React, { useState } from "react";
import { Edge, Node, Position } from "reactflow";
import { ITool } from "../App";

type Props = {
  setOpen: Function;
  openDrawer: boolean;
  setOpenDrawer: Function;
  open: boolean;
  nodes: Array<Node>;
  setNodes: React.Dispatch<
    React.SetStateAction<Node<{ label: string; id_?: number | undefined }>[]>
  >;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
  activeNode: any;
};

const AddButton = ({
  setOpen,
  openDrawer,
  setOpenDrawer,
  open,
  setNodes,
  setEdges,
  activeNode: PrevNode,
}: Props) => {
  const [searchValue, onSearchChange] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValues, setSearchValues] = useState<ITool[]>([
    {
      img: <IconDirection size={60} className={"text-blue-700"} />,
      label: "Get direction details",
    },
    {
      img: <IconPentagram size={60} className={"text-red-600"} />,
      label: "Microsoft Team",
    },
    {
      img: <Icon360View size={60} className={"text-yellow-800"} />,
      label: "Microsoft Teams",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.currentTarget.value);
  };

  const dataFiltered = searchValues.filter((el) => {
    return el.label.toLowerCase().includes(searchValue);
  });

  const addNode = (tool: ITool, idx: number) => {
    if (PrevNode) {
      const new_current_node = Math.floor(Math.random() * 1000);
      const random_idx = Math.floor(Math.random() * 1000);
      const current_node = {
        id: `node_${new_current_node}`,
        position: { x: 0, y: 130 },
        sourcePosition: Position.Top,
        parentNode: PrevNode.id,
        width: 50,
        type: "tool",
        data: {
          name: tool.label,
          emoji: tool.img,
          label: "",
          position: "top",
          hidden: false,
          id: new_current_node,
          id_: new_current_node,
        },
      };

      const temporery_node = {
        id: `node_${random_idx}`,
        position: {
          x: 100 + Math.floor(Math.random() * 100),
          y: 80 + Math.floor(Math.random() * 100),
        },
        sourcePosition: Position.Top,
        width: 50,
        type: "tool",
        data: {
          name: "hello",
          emogi: "temporery",
          label: "temporery",
          position: "top",
          hidden: true,
          id_: random_idx,
        },
      };

      const temporery_edge = {
        id: `edge-${random_idx}-${new_current_node}`,
        source: `node_${new_current_node}`,
        animated: true,
        target: `node_${random_idx}`,
        type: "plus",
        data: {
          setEdges,
          setNodes,
          activeNode: current_node,
        },
      };

      const edge = {
        id: `edge-${PrevNode.data.id}-${new_current_node}`,
        source: `node_${PrevNode.data.id}`,
        animated: true,
        target: `node_${new_current_node}`,
        data: {
          setEdges,
          setNodes,
          activeNode: current_node,
        },
      };

      const handleDeletingTemporerNodes = (
        nodes: Node<{
          id_?: number;
          label: string;
        }>[]
      ) => {
        const nodes_temp = nodes.filter(
          (node) => node.data.label !== "temporery"
        );
        return [...nodes_temp, current_node, temporery_node];
      };

      setNodes((nodes) => handleDeletingTemporerNodes(nodes));

      setEdges((edges: any) => {
        return [...edges, edge, temporery_edge];
      });

      setOpen(false);
      setOpenDrawer(false);
    } else {
      debugger;
    }
  };

  const addCrossRoad = () => {
    if (PrevNode) {
      const new_current_node = Math.floor(Math.random() * 10000);
      const input_node = Math.floor(Math.random() * 10000);
      const second_node = Math.floor(Math.random() * 10000);
      const random_idx = Math.floor(Math.random() * 10000);
      const random_idx_second = Math.floor(Math.random() * 10000);

      const current_node = {
        id: `node_${new_current_node}`,
        position: { x: 0, y: 130 },
        sourcePosition: Position.Bottom,
        parentNode: PrevNode.id,
        width: 50,
        type: "CrossRoad",
        data: {
          label: "",
          id: new_current_node,
        },
      };

      const FirstInputCrossRoad = {
        id: `node_${input_node}`,
        position: {
          x: 100 + Math.floor(Math.random() * 100),
          y: 80 + Math.floor(Math.random() * 100),
        },
        sourcePosition: Position.Left,
        parentNode: current_node.id,
        width: 50,
        type: "Input",
        data: {
          label: "",
          id: input_node,
        },
      };
      const SecondInputCrossRoad = {
        id: `node_${second_node}`,
        position: {
          x: 100 + Math.floor(Math.random() * 100),
          y: 80 + Math.floor(Math.random() * 100),
        },
        sourcePosition: Position.Left,
        parentNode: current_node.id,
        width: 50,
        type: "Input",
        data: {
          label: "",
          color: "green",
          id: second_node,
        },
      };

      const edge_second_input = {
        id: `edge-${new_current_node}-${second_node}`,
        source: `node_${new_current_node}`,
        animated: true,
        target: `node_${second_node}`,
        data: {
          setEdges,
          setNodes,
          activeNode: current_node,
        },
      };

      const edge_first_input = {
        id: `edge-${new_current_node}-${input_node}`,
        source: `node_${new_current_node}`,
        animated: true,
        target: `node_${input_node}`,
        data: {
          setEdges,
          setNodes,
          activeNode: current_node,
        },
      };

      const edge = {
        id: `edge-${PrevNode.data.id}-${new_current_node}`,
        source: `node_${PrevNode.data.id}`,
        animated: true,
        target: `node_${new_current_node}`,
        data: {
          setEdges,
          setNodes,
          activeNode: current_node,
        },
      };

      const temporery_node = {
        id: `node_${random_idx}`,
        position: {
          x: 100 + Math.floor(Math.random() * 100),
          y: 80 + Math.floor(Math.random() * 100),
        },
        sourcePosition: Position.Top,
        width: 50,
        type: "tool",
        data: {
          name: "hello",
          emogi: "temporery",
          label: "temporery",
          position: "top",
          hidden: true,
        },
      };

      const temporery_edge = {
        id: `edge-${random_idx}-${input_node}`,
        source: `node_${input_node}`,
        animated: true,
        target: `node_${random_idx}`,
        type: "plus",
        data: {
          setEdges,
          setNodes,
          activeNode: FirstInputCrossRoad,
        },
      };

      const temporery_node_second = {
        id: `node_${random_idx_second}`,
        position: {
          x: 100 + Math.floor(Math.random() * 100),
          y: 80 + Math.floor(Math.random() * 100),
        },
        sourcePosition: Position.Top,
        width: 50,
        type: "tool",
        data: {
          name: "hello",
          emogi: "temporery",
          label: "temporery",
          position: "top",
          hidden: true,
        },
      };

      const temporery_edge_second = {
        id: `edge-${random_idx_second}-${second_node}`,
        source: `node_${second_node}`,
        animated: true,
        target: `node_${random_idx_second}`,
        type: "plus",
        data: {
          setEdges,
          setNodes,
          activeNode: SecondInputCrossRoad,
        },
      };

      const handleDeletingTemporeryNodes = (
        nodes: Node<{
          label: string;
        }>[]
      ) => {
        const k = nodes.filter((node) => node.data.label !== "temporery");
        return [
          ...k,
          current_node,
          FirstInputCrossRoad,
          SecondInputCrossRoad,
          temporery_node,
          temporery_node_second,
        ];
      };

      setNodes((nodes) => handleDeletingTemporeryNodes(nodes));
      setEdges((edges) => {
        return [
          ...edges,
          edge,
          edge_first_input,
          edge_second_input,
          temporery_edge,
          temporery_edge_second,
        ];
      });
    }
  };

  return (
    <div className={"updatenode__controls flex gap-2"}>
      <div>
        <button
          className={"add_button_minimal"}
          onClick={() => setOpen((prev: any) => !prev)}>
          <IconPlus fontWeight={900} width={30} height={30} />
        </button>
      </div>

      {open ? (
        <div
          className={
            "flex items-center justify-between alocate_minimilst shadow-lg transition-all duration-300 ease-in-out delay-50 rounded-sm w-[400px]"
          }>
          <div className={"flex flex-col items-center align-middle z-10 "}>
            <IconTool color="#6865f1" width={30} height={30} />
            <Drawer
              opened={openDrawer}
              onClose={() => setOpenDrawer(false)}
              title="Add Tool"
              padding="xl"
              position="right"
              size="lg">
              <div className={"text-[#292b68] font-bold mb-2"}>Select tool</div>
              <TextInput
                placeholder={"Search"}
                icon={<IconSearch />}
                onChange={(e) => handleInputChange(e)}
                value={searchValue}
              />
              <ul className={"mt-7"}>
                {dataFiltered.map((searchInput, idx) => (
                  <li
                    className={
                      "flex gap-2 mt-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    }
                    onClick={() => addNode(searchInput, idx)}
                    key={searchInput.label}>
                    {searchInput.img}
                    <div className={"text-gray-600 font-light text-lg"}>
                      {searchInput.label}
                    </div>
                  </li>
                ))}
              </ul>
            </Drawer>
            <button
              className={"text-[#6865f1] font-bold text-2xl z-10 relative"}
              onClick={() => setOpenDrawer(true)}>
              Add tool
            </button>
          </div>
          <div className={"flex flex-col items-center align-middle z-10"}>
            <IconTooltip color="#6bc596" width={30} height={30} />

            <button
              className={"text-[#6bc596] font-bold text-2xl z-10"}
              onClick={() => addCrossRoad()}>
              Add Croosroad
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddButton;
