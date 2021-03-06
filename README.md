# PBU Log Inspector

Flask (pip) and React (npm) integration for [python-basic-utils](https://github.com/ilfrich/python-basic-utils) logs.

## Installation

```bash
pip3 install pbu-log-inspector
npm install pbu-log-inspector
```

## Integration

### Backend

```python
from flask import Flask
from loginspect import register_endpoint

app = Flask(__name__)
register_endpoint(app)
app.run(host="0.0.0.0", port=5444)
```

The `register_endpoint` function will register an endpoint `GET /api/_logs`, which will can be used to serve daily logs.
There are additional parameters available for this function: 

```python
register_endpoint(app, log_folder="_logs", api_prefix="/api", log_file_mapping=None, login_check=None)
```

- The default **`log_folder`** is relative to the start script of your application, since that is the `pbu` default.
- If you provide a different **`api_prefix`** this will just be the prefix, not the `/_logs` part. E.g. `/rest` would
result in an endpoint `/rest/_logs`
- The **`log_file_mapping`** is optional and only necessary, if you instructed `pbu` to write to different file names
than the defaults. When provided, the mapping needs to provide a dictionary with keys representing the default pbu log
file names (info.log, debug.log, warning.log, error.log) and their respective values are the name of the log file in 
your app.
- If your application includes authentication, provide a function via the **`login_check`** parameter that performs the 
authentication. No parameters are passed to the function. You can use `from flask import request` and access all request 
data

**Restrictions**

- The date needs to be the first part of a log message
- The date needs to be in the format `%Y-%m-%d %H:%M:%S.%s`, e.g. `2019-12-25 13:37:01.567`
- There is no limit on how many logs the endpoint delivers. This can easily cause large payloads and potentially exceed
operational limits (e.g. browser performance, response size, ...)

### Frontend

```js
import React from "react"
import LogInspectorContainer from "pbu-log-inspector"

const MyContainer = props => (
    <div>
        <LogInspectorContainer />
    </div>
)
```

The container provides the following properties:

- **`apiPrefix`** - default `"/api"` - corresponds to the `api_prefix` parameter configured on the Flask backend
- **`applyRequestOptions`** - default `null` - a function that takes the base request parameters and has to return the 
parameters for the fetch request, in case authentication is required and headers need to be set
- **`errorHandler`** - default `null` - a function to handle an error during fetching logs (e.g. show an alert), no 
`return` is expected. The parameter is the error thrown.
