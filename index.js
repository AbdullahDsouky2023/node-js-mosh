console.log('Before');//sync == blocking
//promises
//  const user = getUser(1)
//  const repos= getRepos(user.name)
// repos.then((repos)=>{
//      console.log(repos)
//  })
 
 //async and await
 async function printRepos()
 {
    try {

        const user = await getUser(1)
        const repos= await getRepos(user.name)
        console.log(repos)
       }
       catch(err){
           console.log(err.message)
       };
 }
 printRepos()
/**
 * this will lead to undefined unless you use
 * 1- Callbacks [ok]
 * 2- Async / await
 * 3- Promises
 */
console.log('After');//sync == blocking

function getUser(id)
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('reading a user from a db.........');//async == nonblocking op
            resolve({
                id:id,
                name:'abdullah'
            })
        },1000)
    })
    }

function getRepos(userName)
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('getting user repo')
            resolve(['repo1','repo2','repo3'])
        },2000)
    })
}