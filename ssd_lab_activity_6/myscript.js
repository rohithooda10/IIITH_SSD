function allowDrop(evnt) {
        evnt.preventDefault();
 }
 
function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}
 
function drop(evnt) {
        let id = evnt.dataTransfer.getData('text');
        evnt.target.appendChild(document.getElementById(id));
 }

function validateUsername()
{
	let regex = /[A-Z].*\d|\d.*[A-Z]/;
	if(!regex.test(document.getElementById("serverusername").value) || document.getElementById("serverusername").value=="")
		document.getElementById("invaliduser").innerHTML = "Invalid Username!";
	else
		document.getElementById("invaliduser").innerHTML ="";
};
function confirmPassword()
{
	if(document.getElementById("serverpass").value != document.getElementById("confirmpass").value)
		document.getElementById("invalidpass").innerHTML = "Password not matching!";
	else
		document.getElementById("invalidpass").innerHTML ="";
	
}

function getPlayers() {
    var list="";
    var elms = document.getElementById("right").getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        list+=elms[i].value+"\n";
    }
    return list;
}
function validateForm()
{
	let regex = /[A-Z].*\d|\d.*[A-Z]/;
	if(document.getElementById("managername").value=="")
	{
		document.write("No name");
		return 0;
	}
	if(document.getElementById("teamlead").value=="none")
	{
		alert("Select team lead!");
		return 0;
	}
	if(!regex.test(document.getElementById("serverusername").value))
	{
		alert("Invalid username!");
		return 0;
	}
	if(document.getElementById("serverpass").value != document.getElementById("confirmpass").value)
	{
		alert("Invalid password confirmation!");
		return 0;
	}
	var list = getPlayers();
	window.alert(
		"Name:"+document.getElementById("managername").value+"\n"+
		"Email:"+document.getElementById("grpemail").value+"\n"+
		"UserName:"+document.getElementById("serverusername").value+"\n"+
		"Team Lead:"+document.getElementById("teamlead").value+
		list
	);
		
}

