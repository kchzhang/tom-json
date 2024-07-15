export const addEdgeToGraph = (graph, from, to) => {
    const newEdge = {
        id: `e${from}-${to}`,
        from: from,
        to: to,
        source: from,
        target: to,
        animated: true
    };

    graph.edges.push(newEdge);
};
