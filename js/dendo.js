//base code from D3.js

function loadDendo(searchTerm, url){
	

	var width = 960,
    height = 1000;

	var cluster = d3.layout.cluster()
	    .size([height, width - 160]);
	
	var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });
	
	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
    	.attr("transform", "translate(40,0)");

	d3.json("results.php?term="+searchTerm+"&url="+url, function(error, root) {
  var nodes = cluster.nodes(root),
      links = cluster.links(nodes);
  
  

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal)
      
  var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .attr("resource_uri", function(d) { return d.uri; })
      .attr("search_term", function(d){ return d.name; });

  node.append("circle")
      .attr("r", 6.5)
      .attr("id", "circle");


  node.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });
  
  
  
  $("#image").html('<img src="'+root.misc.image+'">');
  $("#description").html('<span class="glyphicon glyphicon-paperclip"></span> '+root.misc.desc);
  $("#loading").hide();
  
  
});

	d3.select(self.frameElement).style("height", height + "px");
	
	
	
	
}