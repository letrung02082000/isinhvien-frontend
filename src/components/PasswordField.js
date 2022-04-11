import React from 'react';
import { Form ,FloatingLabel } from 'react-bootstrap';

function PasswordField(props){
    const [showPassword, setShowPassword] = React.useState(true);
    const togglePassword = (event) => {
        setShowPassword(!showPassword);
        if(showPassword){
            event.target.textContent='Hide';
        }
        else{
            event.target.textContent='Show';
        }
    }
    return (
        <Form.Group style={{display:'flex',alignItems:'center'}}>
            <FloatingLabel
                label={props.label}
                className="mb-3"
                style={{width:'100%'}}
            >
                <Form.Control type={showPassword? "password":"text"}  placeholder={props.label} onChange={props.handle}/>
            </FloatingLabel>   
            <span style={{marginLeft:'-50px', cursor:'pointer',marginBottom:'1rem',zIndex:'1',color:'blue'}} onClick={togglePassword}>Show</span>
        </Form.Group>
    )
}
export default PasswordField; 