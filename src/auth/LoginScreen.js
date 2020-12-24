import React from 'react';
import './login.css';
import { useForm }from '../hooks/useForm'
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../action/auth';
import Swal from 'sweetalert2';

        export const LoginScreen = () => {
        const dispatch = useDispatch();

            const [ formLoginValues, handleLoginInputChange, resetLogin ] = useForm( {
                lEmail:'tobby@gmail.com',
                lpassword:'123456'
            } );
 const { lEmail,lpassword}=formLoginValues;
  const handleLogin=(e)=>{
                e.preventDefault();

                dispatch( startLogin(lEmail,lpassword) ) 
            }   

 const [ formRegisterValues, handleRegisterInputChange, resetRegister ] = useForm( {
                rName:'tooby',
                rEmail:'tobby@gmail.com',
                rpassword1:'123456',
                rpassword2:'123456'
                
            } );
 const {rName,rEmail,rpassword1,rpassword2 }=formRegisterValues;        

           const handleRegister=(e)=>{
               e.preventDefault()
              if(rpassword1 !== rpassword2){
                  return Swal.fire('Error','Las contraseñas deben ser iguales','error' )
              }

              dispatch( startRegister( rEmail,rpassword1,rName ) )
           } 



            return (
                <div className="container login-container">
                    <div className="row">
                        <div className="col-md-6 login-form-1">
                            <h3>Ingreso</h3>
                            <form onSubmit={ handleLogin } >
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo"
                                        name='lEmail'
                                        value={ lEmail }
                                        onChange={ handleLoginInputChange }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name='lpassword'
                                        value={ lpassword }
                                        onChange={ handleLoginInputChange }
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="submit"
                                        className="btnSubmit"
                                        value="Login" 
                                    />
                                </div>
                            </form>
                        </div>
        
                        <div className="col-md-6 login-form-2">
                            <h3>Registro</h3>
                            <form onSubmit={ handleRegister } >
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        name='rName'
                                        value={rName}
                                        onChange={ handleRegisterInputChange }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo"
                                        name='rEmail'
                                        value={rEmail}
                                        onChange={ handleRegisterInputChange }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña" 
                                        name='rpassword1'
                                        value={rpassword1}
                                        onChange={ handleRegisterInputChange }
                                    />
                                </div>
        
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Repita la contraseña" 
                                        name='rpassword2'
                                        value={rpassword2}
                                        onChange={ handleRegisterInputChange }
                                    />
                                </div>
        
                                <div className="form-group">
                                    <input 
                                        type="submit" 
                                        className="btnSubmit" 
                                        value="Crear cuenta" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
