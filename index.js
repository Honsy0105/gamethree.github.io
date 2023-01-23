var formDom = document.querySelector('.form')
var usernameDom = document.querySelector('.username')
var passwordDom =  document.querySelector('.password')
var submitBtn = document.querySelector('.btn-submit')
var alertDom = document.querySelector('.alertDom')



formDom.addEventListener('submit', async(e)=>{
    e.preventDefault();
    var username = usernameDom.value;
    var password = passwordDom.value;
    try {
        await axios.post('/api/v1/login', {username, password})    
        usernameDom.value = '';
        passwordDom.value = ''
        alertDom.textContent = 'task valid!'
        alertDom.classList.add('text-success')
        showTask()
    } catch (error) {
        alertDom.textContent = 'task invalid!'
    }
    setTimeout(()=>{
        alertDom.classList.remove('text-success')

    }, 2000)

})

const showTask =()=>{
    var username = usernameDom.value
    var password = passwordDom.value
    if(username =='' || password !==''){
        alertDom.innerHTML = 'sorry, your username not provided'
    } else if(username !=='' || password ==''){
        alertDom.innerHTML = 'sorry, your password not provided '
    } else{
        alertDom.innerHTML = 'welcom to your acount'
    }
}
showTask()