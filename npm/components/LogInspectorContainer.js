import React from "react"
import moment from "moment"
import LogInspectorForm from "./LogInspectorForm";
import LogInspectorResult from "./LogInspectorResult";

const DATE_FORMAT = "YYYY-MM-DD"

class LogInspectorContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            fetching: false,
            level: "info.log",
            date: moment().format(DATE_FORMAT),
            logs: [],
            filter: "",
        }

        this.getLogs = this.getLogs.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.changeFilter = this.changeFilter.bind(this)
        this.changeLevel = this.changeLevel.bind(this)
    }

    componentDidMount() {
        this.getLogs()
    }

    getLogs() {
        // compile url
        const apiPrefix = this.props.apiPrefix || "/api"
        let url = `${apiPrefix}/_logs?date=${this.state.date}`
        if (this.state.level != null) {
            url += `&level=${this.state.level}`
        }

        // compile request options
        let requestOptions = {}
        if (this.props.applyRequestOptions != null) {
            requestOptions = this.props.applyRequestOptions(requestOptions)
        }

        // get log messages
        this.setState({ fetching: true })
        fetch(url, requestOptions)
            .then(res => {
                // parse response
                if (res.status === 200) {
                    return res.json()
                }
                throw Error(`Logs could not be loaded: (${res.status}) ${res.text()}`)
            })
            .then(logs => {
                // success, store logs
                this.setState({
                    logs: logs.sort((a, b) => a.timestamp - b.timestamp),
                    fetching: false
                })
            })
            .catch(err => {
                // wrong status code or invalid payload
                this.setState({ fetching: false })
                if (this.props.errorHandler) {
                    this.props.errorHandler(err)
                }
            })
    }

    changeFilter(newFilter) {
        this.setState({
            filter: newFilter,
        })
    }

    changeLevel(newLevel) {
        this.setState({
            level: newLevel,
        })
    }

    changeDate(newDate) {
        this.setState({
            date: newDate,
        })
    }

    render() {
        return <div>
            <LogInspectorForm
                filter={this.state.filter}
                level={this.state.level}
                date={this.state.date}
                changeDate={this.changeDate}
                changeLevel={this.changeLevel}
                changeFilter={this.changeFilter}
                fetch={this.getLogs}
            />
            <LogInspectorResult logs={this.state.logs} filter={this.state.filter}/>
        </div>
    }
}

export default LogInspectorContainer
