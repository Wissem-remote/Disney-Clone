import { GraphQLClient} from 'graphql-request'



export default async function  auth ({body},res){
    const url = process.env.URL
    const graphcms = new GraphQLClient(url, {
        headers: {
          authorization: process.env.TOKEN,
        },
      })
      

      await graphcms.request(`
      mutation($user: String!,$pass: String!,$email: String!){
        createAccount
        (data:{
        userName:$user,
        password:$pass,
        email: $email,
       
        platform:{
        connect:{
            slug:"czve32deefe"
        }
        }
        }
        ),{
            userName
            }
        }`,{user:body.user,pass:body.pass,email:body.email})

        await graphcms.request(`
        mutation publishManyAccountsConnection($email: String){
            publishManyAccountsConnection(where: {
                email_contains: $email
            },
            to: PUBLISHED){
                edges{
                    node{
                      id
                    }
                  }
            }
        }`,{email:body.email})
        
}