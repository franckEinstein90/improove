
exports.parseQuery = function (qry){
	switch(qry.pathname){
		case "/improove/client":
			return "client.html";
			break;
		case "/improove/trainer":
			return "trainer.html";
			break;
		default: 
			return  "index.html";
	}
}

