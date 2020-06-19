(function() {
	
	// Create the connector object
    var myConnector = tableau.makeConnector();

	// Init function for connector, called during every phase
	myConnector.init = function(initCallback) {
		tableau.authType = tableau.authTypeEnum.basic;
		initCallback();
	};

	
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {

        var cols = [{
            id: "faculty",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "organizationId",
			alias: "organizationId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "shiftGroup",
			alias: "shiftGroup",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "shiftId",
			alias: "shiftId",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "tmstBegin",
			alias: "tmstBegin",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "tmstCreated",
			alias: "tmstCreated",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "tmstEnd",
			alias: "tmstEnd",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "workgroupId",
			alias: "workgroupId",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "capacity",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "employeeCount",
			alias: "employeeCount",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "originalCapacity",
			alias: "originalCapacity",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "PlatoCapacities",
            alias: "Capacities extracted from the Plato Layover Tool",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {	
		
		// connectionData contains the userinput passed in the onclick event.
		var user_input = tableau.connectionData

		 $.ajax({
		 type: 'GET',
		 //crossDomain: true,
		 dataType: 'json',
		 url: "https://sww-e.lht.fra.dlh.de/mplan-rpc/rest/layover/capacities?profile=tap_wf&role=6003&date=" + user_input.date,
		 //headers: {'Authorization' : 'Basic ' + btoa('ltpProdRpc' + ':' + 'ltpProdRpc!')},
		 /*beforeSend: function(xhr) { 
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa('ltpProdRpc' + ':' + 'ltpProdRpc!'));
		 },*/
		 username: user_input.user,
		 password: user_input.pwd,
		 success: function(resp) {
			 
			var tableData = [];

            // Iterate over the JSON object
            for (var i = 0; i < resp.length; i++) {
                tableData.push({
                    "id": resp[i].id,
					"tmstBegin": resp[i].tmstBegin,
					"capacity": resp[i].capacity,
					"originalCapacity": resp[i].originalCapacity,
					"employeeCount": resp[i].employeeCount,
					"tmstCreated": resp[i].tmstCreated,
					"tmstEnd": resp[i].tmstEnd,
					"faculty": resp[i].faculty,
					"organizationId": resp[i].organizationId,
					"shiftGroup": resp[i].shiftGroup,
					"shiftId": resp[i].shiftId,
					"workgroupId": resp[i].workgroupId
                });
            }
            table.appendRows(tableData);
            doneCallback();
		 }
		 });
	};
	tableau.registerConnector(myConnector);
    
	// Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			// Store User Input from HTML-Form in an object and return it for use in another function
			var user_input = {user:$("#txtUsername").val().trim(), pwd:$("#txtPassword").val().trim(), date:$("#dateInput").val().trim()}
			
			tableau.connectionData = JSON.stringify(user_input); // Use the connectionData method to pass the user_credentials to the getSchema and getData functions
			tableau.connectionName = "Plato Capacities"; // This will be the data source name in Tableau
			tableau.submit(); // This sends the connector object to Tableau
		});
   });
})();
