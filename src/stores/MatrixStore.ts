import {action, observable} from "mobx";
import {bigInt, dijkstra} from "../algorithm/dijkstra";
import {IEdge, INode} from "../helpers/interfaces";
import _ from 'lodash';

class MatrixStore {
    @observable nodes: INode[] = [];
    @observable edges: IEdge[] = [];
    @observable searchedPath: any;
    @observable newEdges: IEdge[] = [];
    @observable dim = 0;
    @observable matrix: number[][] = [];
    @observable isShowPath = false;
    @observable isShowGraph = false;
    @observable isShowError = false;
    @observable endVertex = 0;
    @observable matrixInputs: HTMLInputElement[] = [];

    @observable info;

    @action.bound
    handleInputChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "dim") {
            this.dim = 0;
        }
        this[name] = Number(value);
    }

    @action.bound
    generateGraph () {
        let nodes = [];
        let edges = [];
        this.matrix = [];
        let counter = 0;

        this.isShowPath = false;
        this.isShowGraph = true;
        this.isShowError = false;

        for (let i = 0; i < this.dim; i++) {
            this.matrix[i] = new Array(this.dim - 1).fill(bigInt);
        }

        for (let i = 0; i < this.dim; i++) {  //fill the matrix
            for (let j = 0; j < this.dim; j++) {
                this.matrix[i][j] = this.matrixInputs[counter].value !== "" ? Number(this.matrixInputs[counter].value)
                    : bigInt; // make empty values as big int value
                counter++;
            }
        }

        for (let i = 0; i < this.dim; i++) {
            // @ts-ignore
            nodes.push({id: i, label: i.toString()})
        }

        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                if (this.matrix[i][j] !== bigInt) {
                    // @ts-ignore
                    edges.push({from: i, to: j, label: this.matrix[i][j].toString(), font: { align: "middle" }, color: "rgba(19,41,61,0.55)"})
                }
            }
        }

        this.nodes = nodes;
        this.edges = edges;
    };

    @action.bound
    onClickDijkstra () {
        this.info  = dijkstra(this.dim, this.matrix);
        if (this.info !== -bigInt) {
            this.searchedPath = this.info.get(this.endVertex - 1).path;
            this.emphasisePath(_.cloneDeep(this.edges), this.searchedPath);
            this.isShowPath = true;
        } else {
            this.isShowError = true;
        }
    };

    @action.bound
    emphasisePath (edges, path) {
        edges.forEach((edge) => {
            for (let i = path.length - 1; i > 0; i--) {
                if (edge.from === path[i] && edge.to === path[i - 1]) {
                    edge.color = 'red';
                }
            }
        });
        this.newEdges = edges;
    }

    @action.bound
    fill() {
        let counter = this.dim;
        for (let i = 0; i < this.dim * this.dim; i++) {

            if (i % (this.dim + 1) === 0) {
                this.matrixInputs[i].value = "";

                for (let j = 1; j < counter; j++) {
                    this.matrixInputs[i + j].value = String(_.random(0, 10));
                }

                i = i + counter;
                counter = counter -1;
            }
        }
    }
}

export default new MatrixStore();