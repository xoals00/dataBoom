/**
 * 
 */




$(document).ready(function() {
	let str = ''
	$.ajax({

		type: 'post',
		url: '/admin/hrd/memberTable',
		success: function(res) {
			console.table(res)
			memberTable = `
			
				<center>
				<table border = 2>
					<thead >
						<tr>
							<th width = "120px" style="text-align:center">아이디</th>
							<th width = "90px"  style="text-align:center">현재 권한</th>
							<th width = "90px"  style="text-align:center">권한부여버튼</th>
						
						</tr>
					</thead>
				
					<tbody id = "memberDetail">
			
					
					</tbody>
				</table>
				</center>`
			$('#memberTable').html(memberTable)
			let trtd = ''
			for (let i in res) {

				
				trtd += `<tr >
							<td style="text-align:center"><a href = "#">${res[i]['userId']}</a></td>
							<td style="text-align:center">${res[i]['role']}</td>
							<td style="text-align:center"><a href = "#"><input type = "button" value = "권한부여시 클릭!" onclick = " authority(\'${res[i]['userId']}\',\'${res[i]['role']}\')"></a></td>
						</tr>`
			}

			$('#memberDetail').html(trtd)
		}
	})

})

function authority(userId, role){
	
	str1 = `<div>
				<table border = '2'>
					<thead >
						<tr>
							<th style="text-align:center">권한</th>
							<th style="text-align:center">아이디</th>
							<th style="text-align:center">현재</th>
							<th style="text-align:center">변경</th>
						
						</tr>
					</thead>
				
					<tbody id = "authorityDetail">
						<tr>
							<td  width = "100px" style="text-align:center">권한설정</td>
							<td   "120px" style="text-align:center"> ${userId} </td>
							<td  width = "120px"style="text-align:center">${role}</td>
							<td  width = "120px"style="text-align:center"><button></button></td>
						</tr>
					</tbody>
				</table>
			</div>`
	
	$(".memberCL").html(str1)
	console.log(userId)
	
}