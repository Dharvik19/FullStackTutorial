import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Form } from "react-bootstrap";
interface TextInputFiledProps {
    name : string,
    label : string,
    register : UseFormRegister<any>,
    registerOptions? : RegisterOptions,
    error? : FieldError,
    [x : string] : any, //any other props we might need to send in the component
}
const TextInputFiled = ({name, label, register, registerOptions, error, ...props} : TextInputFiledProps) => {
    return (  
        <Form.Group className = "mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
             {...props}
             {...register(name , registerOptions)}
             isValid = {!!error}
            >
            </Form.Control>
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
 
export default TextInputFiled;