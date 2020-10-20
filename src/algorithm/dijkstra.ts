export let bigInt = 999999;

export function dijkstra (dim: number, matrix: number[][]) {
    let preD = new Array(dim);
    let min = bigInt;
    let nextNode = 0;
    let distance = new Array(dim);
    let visited = new Array(dim);

    let info = new Map();

    for (let i = 0; i < distance.length; i++) {
        visited[i] = 0;
        preD[i] = 0;
    }

    distance = matrix[0].slice();
    visited[0] = 1;
    distance[0] = 0;

    do {
        min = bigInt;

        for (let i = 0; i < dim; i++) {
            if (min > distance[i] && visited[i] !== 1) {
                min = distance[i];
                nextNode = i;
            }
        }

        visited[nextNode] = 1;

        for (let i = 0; i < dim; i++) {
            if (min + matrix[nextNode][i] < distance[i]) {
                distance[i] = min + matrix[nextNode][i];
                preD[i] = nextNode;
                visited[i] = 0;
            }
        }

        if (distance[0] < -300) {
            return -bigInt;
        }
    } while (visited.includes(0));

    let j;

    for (let i = 0; i < dim; i++) {
        let path: number[] = [];

        if (i !== 0) {
            path.push(i);
            j = i;
            do {
                j = preD[j];
                path.push(j);
            } while (j !== 0);
            info.set(i - 1, {path: path, distance: distance[i]})
        }
    }

    return info;
}