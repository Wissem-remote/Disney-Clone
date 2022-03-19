import Navbar from "../../composant/NavBar"
import { useRouter } from "next/router"



const Check = ()=>{
    const route = useRouter()
    return<>
        <Navbar/>
        <div className="sm:w-1/3 m-auto  w-3/4 text-center content-center mt-4">
        <h1 className="text-3xl   font-blod text-gray-700">
                        Félicitation vous venez de vous Inscrire
                        </h1>
                        <button
                        onClick={()=>{
                            route.push("/login/auth")
                        }}
                        className="hover:bg-blue-700 text-xl rounded py-2 px-3 bg-blue-900 mt-4 m-3">
                            Connecter-vous ?
                        </button>
                        <button
                           onClick={()=>{
                            route.push("/")
                        }}
                        className="hover:bg-blue-700  text-xl rounded py-2 px-3 bg-blue-900 mt-4 m-3">
                            Aller à l'acceuil ?
                            </button>
        </div>
        </>
}


export default Check