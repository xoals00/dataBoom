/**
 * 
 */
//champUpdate() 
//setTimeout(() => { champUpdate() }, 5 * 1000); // 5초



function champUpdate() {
	let champPosition = ['TOP', 'jug', 'mid', 'adc', 'sup']
	let tierSelect = ['bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond']
	for (let i in champPosition) {
		for (let j in tierSelect) {
			$.ajax({
				type: "post",
				url: "/champUpdate",
				data: { "teamPosition": champPosition[i], "tier": tierSelect[j] },
				success: function(res) {
					console.log("<< 30 뜨면 업데이트 성공")
				}
			});
		}
	}
}
