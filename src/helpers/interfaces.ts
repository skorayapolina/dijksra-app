export interface INode {
    id: number,
    label: string,
    font?: object,
    color?: string
}

export interface IEdge {
    from: number,
    to: number,
    label: string,
    font?: object,
    color?: string
}
