import { calculateNodeSize } from "./calculateNodeSize";


export const addNodeToGraph = ({ graph, text, type = "null", isEmpty = false }) => {
    const id = String(graph.nodes.length + 1);
    const isParent = type === "array" || type === "object";
    const { width, height } = calculateNodeSize(text, isParent);
    const node = {
        id,
        text,
        width,
        height,
        data: {
            type,
            isParent,
            isEmpty,
            childrenCount: isParent ? 1 : 0,
        },
        sourcePosition: 'right',
        targetPosition: 'left',
    };

    graph.nodes.push(node);

    return id;
};