import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from '../network/notes_api';
import { Modal,Form,Button } from "react-bootstrap";
import TextInputFiled from "./form/TextInputFiled";
import styleUtils from '../styles/utils.module.css'
interface SignUpModalProps{
    onDismiss : ()=> void,
    onSignUpSuccessful: (user : User) => void,

}

const SignUpModal = ({onDismiss, onSignUpSuccessful} : SignUpModalProps) => {
    
    const {register, handleSubmit, formState: { errors, isSubmitting} } = useForm<SignUpCredentials>()

    async function onSubmit(credentials:SignUpCredentials) {
        try{
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        }catch(error){
            alert(error)
            console.error(error)
        }
    }
    return ( 
       <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                SignUp
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputFiled 
                        name = "username"
                        label='Username'
                        type = "text"
                        placeholder="Enter username"
                        register={register}
                        registerOptions={{required : "Required"}}
                        error = {errors.username}
                    />
                    <TextInputFiled 
                        name = "email"
                        label='Email'
                        type = "email"
                        placeholder="Enter email"
                        register={register}
                        registerOptions={{required : "Required"}}
                        error = {errors.email}
                    />
                    <TextInputFiled 
                        name = "password"
                        label='Password'
                        type = "password"
                        placeholder="Enter password"
                        register={register}
                        registerOptions={{required : "Required"}}
                        error = {errors.password}
                    />
                    <Button
                     type="submit"
                     disabled = {isSubmitting}
                     className={styleUtils.width100}
                     >Sign Up
                     </Button>
                </Form>
            </Modal.Body>
       </Modal> 
     );
}
 
export default SignUpModal;