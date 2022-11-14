import React, { useCallback, useState } from "react";
import "./App.css";
import { ReactFlowProvider, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { Drawer, Header, TextInput } from "@mantine/core";
import {
  Icon360View,
  IconDirection,
  IconPentagram,
  IconPlus,
  IconSearch,
  IconTool,
  IconTooltip,
} from "@tabler/icons";
import "reactflow/dist/style.css";
import Tool from "./modules/Tool";
import PlusNode from "./modules/plus-node";
import CrossRoad from "./modules/CrossRoad";
import InputCrossRoad from "./modules/InputCrossRoad";
import { SideBar } from "./modules/sidebar";
import { HeaderSearch } from "./modules/Header";

type Node = {
  id: string;
  data: {
    label: string;
  };
  sourcePosition: Position;
  width: number;
  type: string;
  position: {
    x: number;
    y: number;
  };
};

type Edge = {
  id: string;
  source: string;
  target: string;
  type: string;
};

export const initialNodes: Node[] = [];
export const initialEdges: Edge[] = [];

export type ITool = {
  img: React.ReactElement;
  label: string;
};

const edgeTypes = {
  plus: PlusNode,
};
const nodeTypes = { tool: Tool, CrossRoad: CrossRoad, Input: InputCrossRoad };

// const hide = (hidden: any) => (nodeOrEdge: any) => {
//   nodeOrEdge.hidden = hidden;
//   return nodeOrEdge;
// };

function App() {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  const addNode = (tool: ITool, idx: number) => {
    const current_node = {
      id: `node_${idx}`,
      position: { x: 0, y: -100 },
      sourcePosition: Position.Bottom,
      width: 50,
      type: "tool",
      data: {
        name: tool.label,
        emoji: tool.img,
        label: "",
        position: "bottom",
        hidden: false,
        id: idx,
        id_: idx,
      },
    };

    const temporery_node = {
      id: `node_${idx + 2}`,
      position: { x: 0, y: 180 },
      sourcePosition: Position.Top,
      width: 50,
      type: "tool",
      data: {
        name: "hello",
        emogi: "temporery_node",
        label: "temporery",
        position: "top",
        hidden: true,
        id_: idx + 2,
      },
    };

    const nodes_transfer = [...nodes, current_node, temporery_node];

    const edge = {
      id: `edge-${idx}-${idx + 2}`,
      source: `node_${idx}`,
      animated: true,
      target: `node_${idx + 2}`,
      type: "plus",
      data: {
        label: "",
        nodes_transfer,
        setNodes,
        setEdges,
        activeNode: current_node,
      },
    };

    setNodes((nodes) => {
      return [...nodes, current_node, temporery_node];
    });

    setEdges((edges) => {
      return [...edges, edge];
    });

    setOpen(false);
    setOpenDrawer(false);
  };

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "black", type: "plus" },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.currentTarget.value);
  };

  const dataFiltered = searchValues.filter((el) => {
    return el.label.toLowerCase().includes(searchValue);
  });

  return (
    <div style={{ height: "100vh", width: "100vw" }} className={"flex"}>
      <SideBar />
      <div style={{ height: "100vh", width: "100vw" }}>
        <HeaderSearch links={[]} />
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            fitView
            onConnect={onConnect}
            snapToGrid={true}
            attributionPosition="top-right"
            fitViewOptions={{
              minZoom: 9,
              maxZoom: 1,
            }}
            nodeTypes={nodeTypes}>
            {nodes.length === 0 ? (
              <div className={"updatenode__controls"}>
                <button
                  className={"add_button"}
                  onClick={() => setOpen((prev) => !prev)}>
                  <IconPlus fontWeight={900} width={30} height={30} />
                </button>
                {open && nodes.length === 0 ? (
                  <div
                    className={
                      "flex items-center justify-between alocate shadow-lg transition-all duration-300 ease-in-out delay-50"
                    }>
                    <div
                      className={
                        "flex flex-col items-center align-middle z-10 "
                      }>
                      <IconTool color="#6865f1" width={30} height={30} />
                      <Drawer
                        opened={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                        title="Add Tool"
                        padding="xl"
                        position="right"
                        size="lg">
                        <div className={"text-[#292b68] font-bold mb-2"}>
                          Select tool
                        </div>
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
                              <div
                                className={"text-gray-600 font-light text-lg"}>
                                {searchInput.label}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </Drawer>
                      <button
                        className={
                          "text-[#6865f1] font-bold text-2xl z-10 relative"
                        }
                        onClick={() => setOpenDrawer(true)}>
                        Add tool
                      </button>
                    </div>
                    <div
                      className={
                        "flex flex-col items-center align-middle z-10"
                      }>
                      <IconTooltip color="#6bc596" width={30} height={30} />

                      <button
                        className={"text-[#6bc596] font-bold text-2xl z-10"}>
                        Add Croosroad
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <MiniMap style={{ width: 350, height: 250 }} zoomable pannable />
            <Background
              gap={15}
              variant={BackgroundVariant.Dots}
              color={"black"}
              style={{ background: "#f3f7fb" }}
            />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
