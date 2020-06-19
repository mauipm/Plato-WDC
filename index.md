<html>
<head>
    <title>Plato Capacity Data</title>
    <meta http-equiv="Cache-Control" content="no-store" />
    
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js" type="text/javascript"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    
    <script src="https://connectors.tableau.com/libs/tableauwdc-2.3.latest.js" type="text/javascript"></script>
    <script src="./plato_capacities.js" type="text/javascript"></script>
</head>

<body>
    <div class="container container-table">
        <div class="row vertical-center-row">
            <div class="text-center col-md-4 col-md-offset-4">
			<br /><br />
			<input type="text" id="txtUsername" placeholder="username" required>
			<br /><br />
			<input type="text" id="txtPassword" placeholder="password" required>
			<br /><br />
			<input type="date" id="date" required>
			<br /><br />
                <button type = "button" id = "submitButton" class = "btn btn-success" style = "margin: 10px;">Get Data!</button>
            </div>
        </div>
    </div>
</body>
</html>