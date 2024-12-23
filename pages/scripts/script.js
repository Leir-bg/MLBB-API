'use strict'

const btn = document.querySelectorAll('.run_curl')
btn.forEach(b => {
    b.addEventListener('click', function(e){
        const url_cmd = this.parentElement.querySelector('code').innerText
        const url = url_cmd.split(' ')[1]
        const response_block = document.querySelector('.curl_result p')
    
        fetch(url)
            .then(res => {
                if(!res.ok) throw new Error('Error')
                
                return res.json()
            })
            .then(data => {
                response_block.parentElement.classList.add('open')
                response_block.innerHTML = JSON.stringify(data, null, 4)
            })
            .catch(err => alert('Error fetching data.'))
    })
})

const close_btn = document.querySelector('.close')
close_btn.addEventListener('click', function(){
    this.parentElement.classList.remove('open')
    this.parentElement.querySelector('p').innerHTML = ''
})