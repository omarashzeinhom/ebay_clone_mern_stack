import { Nav } from "../../components";

export default function SignIn(){
    
    async function handleSignIn(){
        const query = "";
        console.log(`${query}`);

    }
    
    return (
        <>
        <Nav/>

        <button onClick={handleSignIn}>
            SignIn
        </button>
        </>
    )
}