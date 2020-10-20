import React, {Component} from "react";
import {observer} from "mobx-react";
import {Inputs} from "../Inputs/Inputs";
import MatrixStore from "../../stores/MatrixStore";
import Graph from "react-graph-vis";
import "./Graphs.scss";
import {IoIosArrowRoundForward} from "react-icons/io";
import classNames from "classnames";
import {bigInt} from "../../algorithm/dijkstra";

@observer
class Graphs extends Component {
    store = MatrixStore;

    render() {
        const graph = {
            nodes: this.store.nodes,
            edges: this.store.edges
        };

        const newGraph = {
            nodes: this.store.nodes,
            edges: this.store.newEdges
        };

        const options = {
            nodes: {
                color: "rgb(180,214,242)"
            },
            edges: {
                color: {
                    inherit: false,
                },
                smooth: {
                    type: "vertical",
                    forceDirection: "none",
                    roundness: 0.25
                }
            },
            height: "500px",
            width: "500px"
        };

        return <div className="container">
            <header className="mtx">
                <div className="mtx__about">
                    <div className="mtx__title">
                        Матрица смежности
                    </div>
                    <div className="mtx__description">
                        Для корректной работы алгоритма, в матрице смежности на позиции (0,0) должна стоять вершина,
                            от которой необходимо найти кратчайшие пути.
                    </div>
                    <div>
                        <label className="mtxDim" htmlFor="mtxDim">Размерность матрицы</label>
                        <input id="mtxDim" type="number" placeholder="dim" name="dim" onChange={this.store.handleInputChange}/>
                    </div>
                {
                    this.store.dim !== 0 &&
                    <button onClick={this.store.fill} className="btn btn-rnd">random</button>
                }
                </div>
                {
                    this.store.dim !== 0 &&
                    <div className="mtxContainer">
                        <Inputs dim={this.store.dim}/>
                    </div>
                }
            </header>

            <div className="graphOptions">
                <div>
                    <label htmlFor="endVertex" className="text">Путь к вершине: </label>
                    <input id="endVertex" type="number" name="endVertex" onChange={this.store.handleInputChange}/>
                </div>

                <button onClick={this.store.generateGraph} className="btn"
                        disabled={this.store.dim == 0}
                >
                    граф
                </button>

                <button onClick={this.store.onClickDijkstra} className="btn"
                        disabled = {this.store.endVertex == 0 ||
                                    this.store.endVertex > this.store.dim - 1
                        }
                >
                    дейкстра
                </button>
            </div>

            <div className="graphs">
                {
                    this.store.isShowGraph &&
                    <div className="graphContainer">
                        <Graph
                            graph={graph}
                            options={options}
                        />
                    </div>
                }
                {
                    this.store.isShowPath &&
                    <div className="graphContainer">
                        <Graph
                            graph={newGraph}
                            options={options}
                        />
                    </div>
                }
                {
                    this.store.isShowError &&
                    <div className="errorMessage">
                        <div className="errorMessage__text">
                            В графе есть контур отрицательной длины,
                            который приводит к зацикливанию.
                        </div>
                    </div>
                }
            </div>

            {
                Boolean(this.store.info) && this.store.isShowPath &&
                    <ul className="pathsList">
                        {
                            Array.from(this.store.info, ([key, value]) => value).map((value, index) =>
                                value.distance !== bigInt &&
                                <li key={index} className={classNames("pathsList__item",
                                    {"pathsList__item_searched" : this.store.endVertex == index + 1})}
                                >
                                    <div className="pathsList__path">
                                        <p>Кратчайший путь к вершине {index + 1}:</p>
                                        {
                                            value.path.slice().reverse().map((value, index) =>
                                                <React.Fragment key={index}>
                                                    {index !== 0 && <IoIosArrowRoundForward/>}
                                                    <p className="pathsList__pathVertex">
                                                        {value}
                                                    </p>
                                                </React.Fragment>)
                                        }
                                    </div>

                                    <p>расстояние: {value.distance}</p>
                                </li>
                            )
                        }
                    </ul>
            }
        </div>
    }
}

export {Graphs};