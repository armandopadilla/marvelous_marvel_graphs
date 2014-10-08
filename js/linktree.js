//base code from D3.js

function loadNodeLinkTree(searchTerm, url){
	
	var diameter = 960;

	var tree = d3.layout.tree()
	    .size([360, diameter / 2 - 120])
	    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

	var diagonal = d3.svg.diagonal.radial()
	    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

	var svg = d3.select("body").append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	  .append("g")
	    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

	d3.json("results.php?term="+searchTerm+"&url="+url, function(error, root) {
	  var nodes = tree.nodes(root),
	      links = tree.links(nodes);

	  var link = svg.selectAll(".link")
	      .data(links)
	    .enter().append("path")
	      .attr("class", "link")
	      .attr("d", diagonal);

	  var node = svg.selectAll(".node")
	      .data(nodes)
	      .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
	      .attr("resource_uri", function(d) { return d.uri; })
	      .attr("search_term", function(d){ return d.name; });

	  node.append("circle")
	      .attr("r", 4.5);

	  node.append("text")
	      .attr("dy", ".31em")
	      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
	      .text(function(d) { return d.name; });
	  
	  
	  $("#image").html('<img src="'+root.misc.image+'">');
	  $("#description").html('<span class="glyphicon glyphicon-paperclip"></span> '+root.misc.desc);
	  $("#loading").hide();
	
	
	});

	d3.select(self.frameElement).style("height", diameter - 150 + "px");
	
	
}