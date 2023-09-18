import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from '../network/notes_api';
import { Modal, Form, Button } from "react-bootstrap";
import TextInputFiled from "./form/TextInputFiled";
import styleUtils from '../styles/utils.module.css'
interface LoginModalProps{
    onDismiss : ()=> void,
    onLoginSuccessful : (user : User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccessful} : LoginModalProps) => {
    
    const { register, handleSubmit, formState : {errors, isSubmitting}} = useForm<LoginCredentials>();

    async function onSubmit(credentials:LoginCredentials) {
        try{
            const user = await NotesApi.login(credentials);
            onLoginSuccessful(user);
        }catch(error){
            alert(error);
            console.error(error);
        }
    }
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputFiled
                        name="username"
                        label = 'Username'
                        type = "text"
                        placeholder = "Username"
                        register={register}
                        registerOptions={{required : "Required"}}
                        error = {errors.username}
                    />
                    <TextInputFiled
                        name="password"
                        label = 'Password'
                        type = "password"
                        placeholder = "Enter password"
                        register={register}
                        registerOptions={{required : "Required"}}
                        error = {errors.password}
                    />
                    <Button
                     type="submit"
                     disabled = {isSubmitting}
                     className={styleUtils.width100}
                     >Login
                     </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default LoginModal;
