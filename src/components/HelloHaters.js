import React from 'react';
import { Remarkable } from 'remarkable';
import './HelloHaters.css';
import HatersList from './HatersList';
import { logMessage } from '../utils/logger';

class HelloHaters extends React.Component {
    constructor(props) {
        super(props);

        // set initial state
        this.state = { 
            seconds: 0, 
            sampleClass: 'super-white',
            hatersList: [],
            text: "",
            html: "",
            focusChecked: false
        };

        // haha some nice binding
        this.initializeEventBindings();

        // callback refs (from react 16.3+ => this.textBoxRef = React.createRef())
        // takes ref to 2nd input, focuses it on each click on 1st input
        this.textBoxRef = null;
        this.setTextBoxRef = element => this.textBoxRef = element;

        // others
        this.interval = null;
        this.md = new Remarkable();
        // console.log = () => {};
    }

    initializeEventBindings() {
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onHtmlTextChange = this.onHtmlTextChange.bind(this);
        this.focusMarkdownInput = this.focusMarkdownInput.bind(this);

        // alternative: define them as anonymous functions assigned to variables
    }

    //#region lifecycle events
    componentWillMount() {
        logMessage("DEPRECATED. Component  will mount");
    }

    componentDidMount() {
        console.log("Component did mount");
        this.interval = setInterval(() => this.tick(), 1000);
    }

    /** ---- update management -----  */
    shouldComponentUpdate(nextProps, nextState) {
        // return boolean to indicate if the component should re-render
        console.log("Checking if should render")
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        // do something before the update takes place
        console.log("DEPRECATED. Component will be rendered");
    }

    componentDidUpdate(prevProps, prevState) {
        // do something after the update takes place
        console.log("Component has been rendered");
    }

    /** --------- props update management ----------- */
    componentWillReceiveProps(nextProps) {
        // here you detect if the changes matter to you, and then you use setState to trigger the render/update lifecycle
        console.log("DEPRECATED. component will receive props", nextProps);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log("Props might be changed, can trigger state update", props);
    // }


    /** ---------- unmounting -------------- */
    componentWillUnmount() {
        console.log("Component will unmount")
        clearInterval(this.interval);
    }
    //#endregion

    tick() {
        // sets state based on previous state
        // do i need ...?
        this.setState(state => ({
            ...state,
            seconds: state.seconds + 1,
            sampleClass: (state.seconds + 1) % 2 === 0 ? 'super-white' : 'super-red'
        }));
    }

    onTextChange(event) {
        // sets state without need of previous value
        this.setState({ text: event.target.value }, 
            () => console.log(this.state.text) // prints new value
        );
        // console.log(this.state.text); // prints previous value
    }

    onFocusCheckChanged = (event) => {
        console.log("Focus changed", event.target.checked);
        this.setState({ focusChecked: event.target.checked });
    }

    onHtmlTextChange(event) {
        this.setState({ html: event.target.value });
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.html) };
    }

    focusMarkdownInput() {
        if (this.state.focusChecked && this.textBoxRef)
            this.textBoxRef.focus();
    }

    onSubmit(event) {
        event.preventDefault(); // otherwise would trigger normal submit behavior (refresh)
        if (!this.state.text)
            return;
        
        // this.state.hatersList.push(this.state.text); // does not update instantly, but when something else triggers (change detection)
        let list = this.state.hatersList;
        list.push(this.state.text);
        this.setState({ hatersList: list });
    }

    render() {
        let hatersName = "hooters";
        return <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="focus-checker">
                    Auto-switch focus? </label>
                <input
                    id="focus-checker"
                    type="checkbox"
                    onChange={this.onFocusCheckChanged}
                    value={this.state.focusChecked}
                />
                <br/>
                <label htmlFor="new-todo">
                    What needs to be done? </label>
                <input
                    id="new-todo"
                    onChange={this.onTextChange}
                    value={this.state.text}
                    onClick={this.focusMarkdownInput}
                />
                <button>
                    Add #{this.state.hatersList.length + 1}
                </button>
                <br/>
                <label htmlFor="direct-html">
                    Have some HTML? </label>
                <input
                    id="direct-html"
                    onChange={this.onHtmlTextChange}
                    defaultValue={this.state.text}
                    ref={this.setTextBoxRef}
                />
            </form>
            <h3>Output</h3>
            <div
            className="content"
            dangerouslySetInnerHTML={this.getRawMarkup()}
            />
            <div className={this.state.sampleClass}>Hello, {hatersName}!
                <HatersList hatersList={this.state.hatersList} />
            </div>
        </div>;
    }
}

// for default props, check HatersList

export default HelloHaters;