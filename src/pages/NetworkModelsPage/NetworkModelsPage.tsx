import React, {Component} from 'react';
import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import Graph from "react-graph-vis";
import {createNetworkModel} from '../../algorithm/bakhtin';
import {rankingEvents} from '../../algorithm/ranking';
import {getGraphCopy} from '../../algorithm/helpers';
import "./NetworkModelsPage.css";

@observer
class NetworkModelsPage extends Component {
  graph = {};
  options = {};
  @observable numberOfEvents = 0;
  @observable graphCreated = false;
  @observable pred = {};

  @computed
  get nodesArray() {
    return Array.from({length: this.numberOfEvents}, (_, i) => i + 1);
  }

  createGraph = () => {
    this.graphCreated = false;
    const graph = createNetworkModel(this.pred);
    const mapToRename = rankingEvents(getGraphCopy(graph));

    this.graph = {
      nodes: graph.nodes().map(node => ({
        id: node,
        label: mapToRename[node]
      })),
      edges: graph.serialize().links.map(link => ({
        from: link.source,
        to: link.target,
        label: String(link.weight),
        ...(link.weight ? {} : {dashes: true})
      }))
    }

    this.options = {
      nodes: {
        color: "rgb(136,169,229)"
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
      height: "600px",
      // width: "600px"
    };

    this.graphCreated = true;
  }

  @action
  onChange = event => {
    const target = event.target;
    this.pred[target.name] = target.value ? target.value.split(',').map(v => Number(v) || '') : [];
  }

  @action
  changeNumberOfEvents = event => {
    this.numberOfEvents = event.target.value;

    this.pred = {};
    for (let i = 1; i <= this.numberOfEvents; i++) {
      this.pred[i] = [];
    }
  }

  render() {
    return (
      <div className="main">
        <div className="app">
          <h1 className="app__title">Построение сетевой модели</h1>
        </div>

        <div className="content">
          <div className="input__section">
            <div className="input__wrapper">
              <label htmlFor="numOfEvents">Количество работ</label>

              <input
                id="numOfEvents"
                type="number"
                onChange={this.changeNumberOfEvents}
                value={this.numberOfEvents}
              />
            </div>

            {
              !!this.numberOfEvents && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Номер работы</th>
                        <th>Каким работам предшествует</th>
                      </tr>
                    </thead>

                    <tbody>
                    {
                      this.nodesArray.map(node => (
                        <tr key={node}>
                          <td>{node}</td>

                          <td>
                            <input
                              type="text"
                              onChange={this.onChange}
                              name={`${node}`}
                              value={this.pred[node]}
                            />
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>

                  <button onClick={this.createGraph} className="btn btn__construct">Построить модель</button>
                </>
              )
            }
          </div>

          {this.graphCreated && (
            <Graph
              graph={this.graph}
              options={this.options}
            />
          )}
        </div>
      </div>
    );
  }
}

export {NetworkModelsPage};