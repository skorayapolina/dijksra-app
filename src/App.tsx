import React, {Component} from 'react';
import './App.css';
import {Graphs} from "./components/Graphs/Graphs";
import {observer} from "mobx-react";

@observer
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="app">
                    <h1 className="app__title">Алгоритм Дейкстры</h1>
                    <p className="app__descriptionAlg">
                        Алгоритм нахождения кратчайшего пути от заданной вершины графа до остальных вершин.
                    </p>
                </header>
                <Graphs/>
            </div>
        );
    }
}

export default App;
