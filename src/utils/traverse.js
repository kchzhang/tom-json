import { addNodeToGraph } from "./addNodeToGraph";
import { addEdgeToGraph } from "./addEdgeToGraph";
import { calculateNodeSize } from "./calculateNodeSize";

const isPrimitiveOrNullType = (type) => {
    return ["boolean", "string", "number", "null"].includes(type);
};

const alignChildren = (nodeA, nodeB) => {
    const aChildType = nodeA?.children?.[1]?.type;
    const bChildType = nodeB?.children?.[1]?.type;

    if (isPrimitiveOrNullType(aChildType) && !isPrimitiveOrNullType(bChildType)) {
        return -1;
    }

    return 0;
};

function handleNoChildren(value, states, graph, myParentId, parentType, nextType) {
    if (value === undefined) return;

    if (parentType === "property" && nextType !== "object" && nextType !== "array") {
        states.brothersParentId = myParentId;
        if (nextType === undefined && Array.isArray(states.brothersNode)) {
            states.brothersNode.push([states.brotherKey, value]);
        } else {
            states.brotherKey = value;
        }
    } else if (parentType === "array") {
        const nodeFromArrayId = addNodeToGraph({ graph, text: String(value) });

        if (myParentId) {
            addEdgeToGraph(graph, myParentId, nodeFromArrayId);
        }
    }

    if (nextType && parentType !== "array" && (nextType === "object" || nextType === "array")) {
        states.parentName = value;
    }
}

function handleHasChildren(type, states, graph, children, myParentId, parentType) {

    let parentId;

    if (type !== "property" && states.parentName !== "") {

        if (states.brothersNode.length > 0) {
            const findBrothersNode = states.brothersNodeProps.find(
                e =>
                    e.parentId === states.brothersParentId &&
                    e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
            );

            if (findBrothersNode) {
                const findNodeIndex = graph.nodes.findIndex(e => e.id === findBrothersNode?.id);

                if (findNodeIndex !== -1) {
                    const modifyNodes = [...graph.nodes];
                    const foundNode = modifyNodes[findNodeIndex];

                    foundNode.text = foundNode.text.concat(states.brothersNode);
                    const { width, height } = calculateNodeSize(foundNode.text, false);

                    foundNode.width = width;
                    foundNode.height = height;

                    graph.nodes = modifyNodes;
                    states.brothersNode = [];
                }
            } else {
                const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode });

                states.brothersNode = [];

                if (states.brothersParentId) {
                    addEdgeToGraph(graph, states.brothersParentId, brothersNodeId);
                } else {
                    states.notHaveParent.push(brothersNodeId);
                }

                states.brothersNodeProps.push({
                    id: brothersNodeId,
                    parentId: states.brothersParentId,
                    objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
                });
            }
        }

        parentId = addNodeToGraph({ graph, type, text: states.parentName });
        states.bracketOpen.push({ id: parentId, type });
        states.parentName = "";

        const brothersProps = states.brothersNodeProps.filter(
            e =>
                e.parentId === myParentId &&
                e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
        );

        if (
            (brothersProps.length > 0 &&
                states.bracketOpen[states.bracketOpen.length - 2]?.type !== "object") ||
            (brothersProps.length > 0 && states.bracketOpen.length === 1)
        ) {
            addEdgeToGraph(graph, brothersProps[brothersProps.length - 1].id, parentId);
        } else if (myParentId) {
            addEdgeToGraph(graph, myParentId, parentId);
        } else {
            states.notHaveParent.push(parentId);
        }
    } else if (parentType === "array") {
        states.objectsFromArray = [...states.objectsFromArray, states.objectsFromArrayId++];
    }
    const traverseObject = (objectToTraverse, nextType) => {
        traverse({
            states,
            objectToTraverse,
            parentType: type,
            myParentId: states.bracketOpen[states.bracketOpen.length - 1]?.id,
            nextType,
        });
    };

    const traverseArray = () => {
        children.forEach((objectToTraverse, index, array) => {
            const nextType = array[index + 1]?.type;

            traverseObject(objectToTraverse, nextType);
        });
    };

    if (type === "object") {
        children.sort(alignChildren);
        traverseArray();
    } else {
        traverseArray();
    }

    if (type !== "property") {
        if (states.brothersNode.length > 0) {
            const findBrothersNode = states.brothersNodeProps.find(
                e =>
                    e.parentId === states.brothersParentId &&
                    e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
            );

            if (findBrothersNode) {
                const modifyNodes = [...graph.nodes];
                const findNodeIndex = modifyNodes.findIndex(e => e.id === findBrothersNode?.id);

                if (modifyNodes[findNodeIndex] && typeof states.brothersNode === "string") {
                    modifyNodes[findNodeIndex].text += states.brothersNode;

                    const { width, height } = calculateNodeSize(modifyNodes[findNodeIndex].text, false);

                    modifyNodes[findNodeIndex].width = width;
                    modifyNodes[findNodeIndex].height = height;

                    graph.nodes = modifyNodes;
                    states.brothersNode = [];
                }
            } else {
                const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode });

                states.brothersNode = [];

                if (states.brothersParentId) {
                    addEdgeToGraph(graph, states.brothersParentId, brothersNodeId);
                } else {
                    states.notHaveParent = [...states.notHaveParent, brothersNodeId];
                }

                const brothersNodeProps = {
                    id: brothersNodeId,
                    parentId: states.brothersParentId,
                    objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
                };

                states.brothersNodeProps = [...states.brothersNodeProps, brothersNodeProps];
            }
        }

        if (parentType === "array") {
            if (states.objectsFromArray.length > 0) {
                states.objectsFromArray.pop();
            }
        } else {
            if (states.bracketOpen.length > 0) {
                states.bracketOpen.pop();
            }
        }

        if (parentId) {
            const myChildren = graph.edges.filter(edge => edge.from === parentId);
            const parentIndex = graph.nodes.findIndex(node => node.id === parentId);

            graph.nodes = graph.nodes.map((node, index) => {
                if (index === parentIndex) {
                    const childrenCount = myChildren.length;

                    return { ...node, data: { ...node.data, childrenCount } };
                }
                return node;
            });
        }
    }
}

export function traverse({ states, objectToTraverse, myParentId, nextType, parentType, }) {

    const graph = states.graph;
    const { type, children, value } = objectToTraverse;
    if (!children) {
        handleNoChildren(value, states, graph, myParentId, parentType, nextType);
    } else if (children) {
        handleHasChildren(type, states, graph, children, myParentId, parentType);
    }

}