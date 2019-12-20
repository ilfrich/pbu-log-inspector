import React from "react"
import moment from "moment"

const style = {
    resultContainer: {
        paddingTop: "15px",
    },
    noEntries: {
        width: "100%",
        paddingTop: "15px",
        textAlign: "center",
    },
    listContainer: {
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gridColumnGap: "5px",
        padding: "10px 0px",
        borderBottom: "1px solid #ddd",
    },
    header: {
        padding: "10px",
        background: "#666",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
        textAlign: "center",
    },
    highlight: {
        background: "#ff9"
    },
    link: {
        color: "#2196f3",
        cursor: "pointer",
        paddingTop: "5px",
        display: "inline-block",
    },
}

class LogInspectorResult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterMatch: false,
            expand: {},
        }
        this.filterLogs = this.filterLogs.bind(this)
        this.changeFilterMatch = this.changeFilterMatch.bind(this)
        this.truncateMessages = this.truncateMessages.bind(this)
        this.toggleIndex = this.toggleIndex.bind(this)
    }

    filterLogs(allLogs) {
        return allLogs.filter(item => this.props.filter === "" || item.message.filter(item => item.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1).length > 0)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filter !== this.props.filter) {
            this.setState({
                expand: {},
            })
        }
    }

    changeFilterMatch() {
        this.setState({
            filterMatch: this.filterMatch.checked,
        })
    }

    truncateMessages(index, messages) {
        if (this.state.expand[index] === true) {
            return messages
        }
        return [messages[0]]
    }

    toggleIndex(index) {
        return () => {
            this.setState(oldState => {
                const expand = oldState.expand
                expand[index] = expand[index] == null || expand[index] === false
                return {
                    ...oldState,
                    expand,
                }
            })
        }
    }

    render() {
        // handle filtering
        const allLogs = this.state.filterMatch ? this.filterLogs(this.props.logs) : this.props.logs
        const matchFilter = (
            <div>
                <div>
                    <input type="checkbox" id="show-match" onChange={this.changeFilterMatch} ref={el => {
                        this.filterMatch = el
                    }} defaultChecked={this.state.filterMatch} />
                    {" "}
                    <label htmlFor="show-match">Show Only Matching Messages</label>
                </div>
            </div>
        )
        if (allLogs.length === 0) {
            // no logs available
            return (
                <div style={style.resultContainer}>
                    {matchFilter}
                    <div style={style.noEntries}><em>No log messages for the selected search criteria</em></div>
                </div>
            )
        }

        // helper
        const highLightHelper = msg => {
            if (this.props.filter === "") {
                // no filter
                return msg
            }
            let index = msg.toLowerCase().indexOf(this.props.filter.toLowerCase())
            let subMessage = msg
            if (index === -1) {
                // no match
                return msg
            }

            const result = []
            let token = 0

            while (index !== -1) {
                if (index > 0) {
                    result.push(<span key={token}>{subMessage.substring(0, index)}</span>)
                    token += 1
                }
                result.push(<span key={token} style={style.highlight}>{subMessage.substring(index, index + this.props.filter.length)}</span>)
                token += 1

                subMessage = subMessage.substring(index + this.props.filter.length)
                index = subMessage.toLowerCase().indexOf(this.props.filter.toLowerCase())
            }

            if (subMessage.length > 0) {
                result.push(<span key={token + 1}>{subMessage}</span>)
            }
            return result
        }

        return (
            <div style={style.resultContainer}>
                {matchFilter}
                {/*List of log message*/}
                <div style={style.listContainer}>
                    <div style={style.header}>Date/Time</div>
                    <div style={style.header}>Message</div>
                </div>
                {allLogs.map((log, entryIndex) =>
                    <div style={style.listContainer} key={entryIndex}>
                        <div>{moment(log.timestamp * 1000).format()}</div>
                        <div>
                            {this.truncateMessages(entryIndex, log.message).map((msg, msgIndex) => <div key={(entryIndex * 1000) + msgIndex}>{highLightHelper(msg)}</div>)}
                            {log.message.length > 1
                                ? <div>
                                    <span onClick={this.toggleIndex(entryIndex)} style={style.link}>{this.state.expand[entryIndex] ? "Show Less" : "Show More"}</span>
                                </div>
                                : null}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default LogInspectorResult