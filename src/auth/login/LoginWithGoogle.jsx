import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import './styles.css'
export default function LoginWithGoogle() {
    //const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setimage] = useState("")
    const [isLogin, setIslogin] = useState(false)


    const responseGoogle = (response) => {
        console.log(response.profileObj);
        setIslogin(true)
         setName(response.profileObj.name)
        setEmail(response.profileObj.email)
        setimage(response.profileObj.imageUrl)
    }
    return (
        <div>
            {
                isLogin ? (
                    <div>
                        <h1>{name}</h1>
                        <h1>{email}</h1>
                        <img src={image} />
                    </div>
                ) : (
                    <GoogleLogin
                        clientId="847941636440-5o0adntqs5s2ioqb948vcqanr64b6i50.apps.googleusercontent.com"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Continue with Google</button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                )
            }


        </div>
    )
}
