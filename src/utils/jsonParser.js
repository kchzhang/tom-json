import { parseTree } from "jsonc-parser";
import { traverse } from "./traverse";
import { addEdgeToGraph } from "./addEdgeToGraph";
import { addNodeToGraph } from "./addNodeToGraph";
// import { getNodePath } from "./getNodePath";

function initializeStates() {
    return {
        parentName: "",
        bracketOpen: [],
        objectsFromArray: [],
        objectsFromArrayId: 0,
        notHaveParent: [],
        brothersNode: [],
        brothersParentId: undefined,
        brotherKey: "",
        brothersNodeProps: [],
        graph: {
            nodes: [],
            edges: [],
        },
    };
}

// 解析json
export function parser(jsonStr) {
    try {
        const states = initializeStates();
        const parsedJsonTree = parseTree(jsonStr);

        if (!parsedJsonTree) {
            throw new Error("Invalid document");
        }

        traverse({ states, objectToTraverse: parsedJsonTree });
        const { notHaveParent, graph } = states;

        if (notHaveParent.length > 1 && parsedJsonTree.type !== "array") {
            const emptyNode = { id: null, text: "", isEmpty: true, data: {} };
            const emptyId = addNodeToGraph({ graph, ...emptyNode });

            notHaveParent.forEach(childId => addEdgeToGraph(graph, emptyId, childId));
        }

        states.graph.nodes = states.graph.nodes.map(node => ({
            ...node,
            // path: getNodePath(states.graph.nodes, states.graph.edges, node.id),
        }));

        return states.graph;


    } catch (error) {
        return { nodes: [], edges: [] };
    }
}