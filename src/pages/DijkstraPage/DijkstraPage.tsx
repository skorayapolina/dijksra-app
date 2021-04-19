import React, {Component} from 'react';
import {Graphs} from '../../components/Graphs/Graphs';

class DijkstraPage extends Component {
  render() {
    return (
      <>
        <div className="app">
          <h1 className="app__title">Алгоритм Дейкстры</h1>
          <p className="app__descriptionAlg">
            Алгоритм нахождения кратчайшего пути от заданной вершины графа до остальных вершин.
          </p>
        </div>

        <Graphs />
      </>
    );
  }
}

export {DijkstraPage};
