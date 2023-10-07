//settled promises
// const p = Promise.resolve({"name":"abdullah"})
// const p2 = Promise.reject(new Error('an error occured'))

// p.then((result)=>console.log(result))
// p2.catch((err)=>console.log(err.message))

//parallel Promises

const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve('Calling facebook api 1 .....');
    },3000)
})
const p4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve('Calling twiter api 2 .....');
    },2000)
})
const p5 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('Calling google api 3.....');
    },1000)
})

Promise.all([p3,p4,p5])
.then((result)=>console.log(result))
.catch((error)=>console.log(error))

//promise.race when one of the promises is done get the 
//value immediately