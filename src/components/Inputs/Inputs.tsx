import {observer} from "mobx-react";
import React, {Component} from "react";
import MatrixStore from "../../stores/MatrixStore";
import {action, observable} from "mobx";
import "./Inputs.css";

@observer
class  Inputs extends Component <{dim: number}> {
    store = MatrixStore;
    @observable array: number[] = [];

    setTextInputRef: (element, num) => void;

    constructor(props) {
        super(props);

        this.setTextInputRef = (element, num) => {
            this.store.matrixInputs[num] = element;
        };
    }

    componentDidMount (): void {
        this.createArray(this.props.dim * this.props.dim);
    }

    componentDidUpdate (prevProps: Readonly<{ dim: number }>): void {
        if ((prevProps.dim !== this.props.dim) && (this.props.dim !== 0)) {
            this.createArray(this.props.dim * this.props.dim);
        }
    }

    @action.bound
    createArray (num) {
        this.array = [];
        for (let i = 0; i < num; i++) {
            this.array.push(i);
        }
    }

    render () {
        return (
            <div>
                {
                    this.array.map ( num => {
                        return <React.Fragment key={num}>
                                <input
                                    className="inputMatrix"
                                    type="number"
                                    name={"input" + num}
                                    ref={(element) => this.setTextInputRef(element, num)}
                                />
                                {
                                    (num + 1) % this.props.dim === 0 &&
                                    <br/>
                                }
                            </React.Fragment>
                        }
                    )
                }
            </div>
        )
    }
}

export {Inputs};