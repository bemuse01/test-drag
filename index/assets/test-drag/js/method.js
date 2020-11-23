const method = {
    createEdge(){
        const edges = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        return edges.map((e, i) => ({
            id: i,
            cls: e
        }))
    }
}