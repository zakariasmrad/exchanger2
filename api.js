let history = JSON.parse(localStorage.getItem('history')) || [];
let hist = JSON.parse(localStorage.getItem('hist')) || [];
displayhistory();
let price = {
	apikey: "3904b2b0d78a99e6ef4c127305460f98",
	fetchprice: function(cur, res) {
		fetch(
			"https://api.metalpriceapi.com/v1/latest?api_key=" + this.apikey +"&base="+ cur +"&currencies="+ res
		)
        .then ((response) =>{
			if (!response.ok){
				alert("No result found");
				throw new Error("No result found");
			}
			 return response.json();
			})
			.then((data) => this.displayprice(data));
		},
		displayprice: function(data){
			const base = data.base;
			const result1 = Object.values(data.rates);
            const result2 = result1[0];
			document.querySelector('.loading').innerText = "You can buy " + result2 +"-"+ document.querySelector('.result').value.toUpperCase() +" "+ " using this " +base;
		    console.log(base);
			console.log(result2);
			const recent = {
				base: base,
				result: result1,
			};
			history.push(recent);
			localStorage.setItem('history' ,JSON.stringify(history));
			console.log(recent);
			displayhistory();
		},
	     exchange: function(){
            this.fetchprice(document.querySelector('.base').value, document.querySelector('.result').value)
			displayhistory();
		},
	};
document.querySelector('.search button').addEventListener('click' , ()=>{
		price.exchange();
		displayhistory();
});
document.getElementById('ser').addEventListener('keyup' , (e) =>{
    if (e.key == "Enter"){
        price.exchange();
		displayhistory();
    }

	});
	function displayhistory(){
		const hist = document.querySelector('#history');
		hist.innerHTML = "";
		history.forEach( recent => {
		const hitem = document.createElement('li');
		hist.appendChild(hitem);
		hitem.innerHTML = "1-" +recent.base +"= "+ recent.result + document.querySelector('.result').value.toUpperCase() ;
		localStorage.setItem('hist' ,JSON.stringify(hist))
		});
};
 function after(){
    var element = document.getElementById("hist");
    element.classList.toggle("hist");
	element.style.marginTop = 10+"px";
 };
	function reset() {
		alert(`Hi your HISTORY will be reseted
		Thank you`);
		history = [];
		localStorage.setItem('history', JSON.stringify(history));
	displayhistory();
	};


