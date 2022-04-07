const url = 'http://localhost:3030/to-do'

const handleDataPrinting = (data) => {
    let children = '';
    const mainDiv = document.getElementById('task-container');

    if(data.length !== 0) {
        children = data.map((element, index) => 
        (
             `
                <div id="tasks" class="col-10 offset-1 d-flex justify-content-between">
                    <div>
                    <input type="checkbox" name="${element.id}" onclick="updateStatus(this)" ${element.status==true&&("checked")}/>
                </div>
                    <p ${element.status==1&&("class='text-decoration-line-through'")}>${element.task}</p>
                <div>
                    <button id="update" value="${index}" class="btn me-3" onclick="update(this)"
                    ${element.status==1&&("disabled")}><i class="fa fa-pencil"></i></button>
                    <button id="delete" value="${element.id}" class="btn" onclick="delete(this)"><i class="fa fa-trash"></i></button>
                </div>
                </div>
            `
        ));
    } else {
        console.log('entre aqui');
        children = `
            <div id="tasks" class="col-10 offset-1 d-flex justify-content-between">
                <h3>empty to-do list...</h3>
            </div>
        `;
    }
    mainDiv.innerHTML = ((String(children)));
}

const getValues = () => {
    document.getElementById("add-button").style.display = 'none';
    let local= JSON.parse(window.localStorage.getItem("list"))
    if (local === null) { 
        const response = axios.get(url);
        const list = response.data;
        handleDataPrinting(list)  
        window.localStorage.setItem("list",JSON.stringify(list)) 
    } else{
      handleDataPrinting(local)
    }
};

getValues();
