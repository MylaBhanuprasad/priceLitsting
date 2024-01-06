document.getElementById('submit').addEventListener('click',addUser)

var finalPrice=0;

function addUser(){
    const obj={
        name:document.getElementById('productName').value,
        price:document.getElementById('productPrice').value
    }
    axios.post('https://crudcrud.com/api/14dfbb0e9f794dd9b20331148efe9d65/listing',obj)
    .then((response)=>{
        showUsersOnScreen(response.data)
    })
    .catch((err)=>console.log(err))
}

function showUsersOnScreen(userData){
    document.getElementById('productName').value=""
    document.getElementById('productPrice').value=""
    finalPrice=finalPrice+parseInt(userData.price)

    const parent=document.getElementById('container')
    const child=document.createElement('li')
    child.innerHTML=`${userData.name}--${userData.price}
                    <button onclick=deleteUser('${userData._id}')>Delete Product</button>`
    child.id=userData._id
    parent.appendChild(child)
    document.getElementById('amount').textContent=finalPrice

}

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/14dfbb0e9f794dd9b20331148efe9d65/listing/${userId}`)
    .then((Response)=>{
        removeUserFromScreen(userId)
    })
    .catch((err)=>console.log(err))
}

function removeUserFromScreen(userId){
    const parent=document.getElementById('container')
    const child=document.getElementById(userId)
    parent.removeChild(child)
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/14dfbb0e9f794dd9b20331148efe9d65/listing")
    .then((Response)=>{
        for(var i=0;i<Response.data.length;i++){
            showUsersOnScreen(Response.data[i])
        }
    })
    .catch((err)=>console.log(err))
})