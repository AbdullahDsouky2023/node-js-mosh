const cookingPromise= new Promise((resolve,reject)=>{
    setTimeout(()=>{
// resolve('cookign is ready')
reject(new Error('i am busy'))
},200)
})

cookingPromise
.then((result)=>console.log(result))
.catch((err)=>console.log(err.message))