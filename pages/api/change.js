import { GraphQLClient} from 'graphql-request'



export default async function change({body},res){
    const url = process.env.URL
    const graphcms = new GraphQLClient(url, {
        headers: {
          authorization: process.env.TOKEN,
        },
      })
      const data = body.slug
      

      await graphcms.request(`
      mutation($slug: String!){
            updateVideo(where:
            {slug: $slug},
            data:{
            seen: true
            }
            ),{
            id,
            title,
            seen,
            }
        }`,{slug:body.slug})

        await graphcms.request(`
        mutation publishVideo($slug: String){
            publishVideo(where: {
                slug: $slug
            },
            to: PUBLISHED){
                slug
            }
        }`,{slug:body.slug})
        
}