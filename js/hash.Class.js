var Hash = function(cleanHash){
	this.mediaType = cleanHash.slice(1,5);
}
Hash.getId = function(arr){
	return arr[2];
}