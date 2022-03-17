import { useRouter } from 'next/router'

export default function Logout() {
    const route= useRouter()
    route.push('/')
    return (
        <div>
            
        </div>
    )
}
