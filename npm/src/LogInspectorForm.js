import React from "react"

const style = {
    container: {
        padding: "10px",
        border: "1px solid #ccc",
        background: "#f6f6f6",
        width: "calc(100% - 20px)",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "150px 150px 100px 1fr",
        gridColumnGap: "10px",
    },
    label: {
        fontWeight: "bold",
        fontSize: "12px",
        width: "100%",
        marginBottom: "10px",
        display: "block",
        textDecoration: "underline",
    },
    buttonContainer: {
        paddingTop: "25px",
        paddingLeft: "5px",
        borderRight: "1px solid #ccc",
    },
    button: {
        background: "#666",
        color: "#fff",
        border: "none",
        padding: "7px 5px",
    },
    formElement: {
        padding: "5px",
        width: "calc(100% - 10px)",
    },
}

const LOG_LEVELS = {
    INFO: "info.log",
    ERROR: "error.log",
    DEBUG: "debug.log",
    WARNING: "warning.log",
}

class LogInspectorForm extends React.Component {

    constructor(props) {
        super(props)

        this.changeDate = this.changeDate.bind(this)
        this.changeFilter = this.changeFilter.bind(this)
        this.changeLevel = this.changeLevel.bind(this)
    }

    changeLevel() {
        this.props.changeLevel(this.level.value)
    }

    changeDate() {
        if (this.date.value != null && this.date.value !== "") {
            // only allow valid dates
            this.props.changeDate(this.date.value)
        }
    }

    changeFilter() {
        this.props.changeFilter(this.filter.value)
    }

    render() {
        return (
            <div style={style.container}>
                <div style={style.grid}>
                    {/*Log Level*/}
                    <div>
                        <label htmlFor="level" style={style.label}>Log Level</label>
                        <select id="level" defaultValue={this.props.level} onChange={this.changeLevel} ref={el => { this.level = el }} style={style.formElement}>
                            {Object.keys(LOG_LEVELS).map(level => <option key={level} value={LOG_LEVELS[level]}>{level}</option>)}
                        </select>
                    </div>
                    {/*Date Filter*/}
                    <div>
                        <label htmlFor="date" style={style.label}>Date</label>
                        <input id="date" type="date" defaultValue={this.props.date} ref={el => { this.date = el }} onChange={this.changeDate} style={style.formElement}/>
                    </div>
                    {/*Go Button*/}
                    <div style={style.buttonContainer}>
                        <button type="button" onClick={this.props.fetch} style={{ ...style.formElement, ...style.button }}>Fetch</button>
                    </div>
                    {/*Filter*/}
                    <div>
                        <label htmlFor="filter" style={style.label}>Filter</label>
                        <input type="text" defaultValue={this.props.filter} onChange={this.changeFilter} style={style.formElement} ref={el => {
                            this.filter = el
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default LogInspectorForm
