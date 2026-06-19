let employees =
JSON.parse(
localStorage.getItem("employees")
) || [];

let scoreChart;
let deptChart;

function saveData(){
localStorage.setItem(
"employees",
JSON.stringify(employees)
);
}

function addEmployee(){

const name =
document.getElementById("name").value;

const department =
document.getElementById("department").value;

const score =
Number(
document.getElementById("score").value
);

if(!name || !department || !score){
return;
}

employees.push({
id:Date.now(),
name,
department,
score
});

saveData();

document.getElementById("name").value="";
document.getElementById("department").value="";
document.getElementById("score").value="";

renderEmployees();
updateDashboard();
drawCharts();
}

function deleteEmployee(id){

employees =
employees.filter(
emp=>emp.id!==id
);

saveData();

renderEmployees();
updateDashboard();
drawCharts();
}

function renderEmployees(){

const search =
document.getElementById("search")
.value
.toLowerCase();

const tbody =
document.getElementById("employeeTable");

tbody.innerHTML="";

employees
.filter(emp=>
emp.name.toLowerCase()
.includes(search)
)
.forEach(emp=>{

tbody.innerHTML += `
<tr>

<td>${emp.name}</td>

<td>${emp.department}</td>

<td>${emp.score}</td>

<td>

<button
class="deleteBtn"
onclick="deleteEmployee(${emp.id})"
>
Delete
</button>

</td>

</tr>
`;

});
}

function updateDashboard(){

document.getElementById(
"totalEmployees"
).innerText =
employees.length;

let avg =
0;

if(employees.length){

avg =
employees.reduce(
(a,b)=>a+b.score,
0
) / employees.length;
}

document.getElementById(
"avgScore"
).innerText =
avg.toFixed(1)+"%";

let top =
employees.sort(
(a,b)=>b.score-a.score
)[0];

document.getElementById(
"topPerformer"
).innerText =
top ? top.name : "-";

let dept =
new Set(
employees.map(
e=>e.department
)
);

document.getElementById(
"departments"
).innerText =
dept.size;
}

function drawCharts(){

const names =
employees.map(
e=>e.name
);

const scores =
employees.map(
e=>e.score
);

const deptMap={};

employees.forEach(emp=>{

deptMap[emp.department] =
(deptMap[emp.department]||0)+1;

});

if(scoreChart){
scoreChart.destroy();
}

if(deptChart){
deptChart.destroy();
}

scoreChart =
new Chart(
document.getElementById(
"scoreChart"
),
{
type:"bar",
data:{
labels:names,
datasets:[{
label:"Performance",
data:scores
}]
}
}
);

deptChart =
new Chart(
document.getElementById(
"deptChart"
),
{
type:"pie",
data:{
labels:Object.keys(deptMap),
datasets:[{
data:Object.values(deptMap)
}]
}
}
);
}

renderEmployees();
updateDashboard();
drawCharts();