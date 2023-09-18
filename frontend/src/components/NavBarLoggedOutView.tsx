import { Button } from "react-bootstrap"
interface NavBarloggedOutViewProps {
    onSignUpClicked : ()=>void,
    onLogiInClicked : ()=>void,

}
const NavBarLoggedOutView = ({onSignUpClicked, onLogiInClicked} : NavBarloggedOutViewProps) => {
    return ( 
        <>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onLogiInClicked}>Log In</Button>
        </>
     );
}
 
export default NavBarLoggedOutView;