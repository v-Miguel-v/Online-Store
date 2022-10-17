const helpers = {
	searchInDataById(itemId, data) {
		let itemFound = null;
		itemId = Number(itemId);
		
		data.forEach(item => {if (item.id === itemId) itemFound = item});
		return itemFound;
	}
}

module.exports = helpers;