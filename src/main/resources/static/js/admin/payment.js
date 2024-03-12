/**
 * 
 */




$(document).ready(function() {
	let str = ''
	$.ajax({

		type: 'post',
		url: '/admin/paymentTable',
		success: function(res) {
			console.table(res)

			paymentTalbe = `
				<center>
				<table border = 2>
					<thead >
						<tr>
							<th>날짜</th>
							<th>아이디</th>
							<th>결제금액</th>
							<th>포인트</th>
						</tr>
					</thead>
				
					<tbody id = "paymentDetail">
			
					
					</tbody>
				</table>
				</center>`

			$('#paymentTable').html(paymentTalbe)
			let trtd = ''
			for (let i in res) {

				trtd = `<tr >
							<td>${res[i]['pdate']}</td>
							<td>${res[i]['userId']}</td>
							<td>${res[i]['userCash']}</td>
							<td>${res[i]['userPoint']}</td>
						</tr>`

				$('#paymentDetail').append(trtd)
			}


		}
	})

})