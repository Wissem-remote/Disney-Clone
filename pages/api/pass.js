import { GraphQLClient} from 'graphql-request'



export default async({body},res)=>{
    const url = process.env.URL
    const graphcms = new GraphQLClient(url, {
        headers: {
          authorization: process.env.TOKEN,
        },
      })
      

      await graphcms.request(`
      mutation($id: ID!,$pass: String!){
        updateAccount
        (where: { 
            id: $id,
          },data:{
       
        password:$pass,
       
       
        platform:{
        connect:{
            slug:"czve32deefe"
        }
        }
        }
        ),{
            userName
            }
        }`,{pass:body.newpass,id:body.id})

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