import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './styles.css'

export default function LoginWithFacebook() {
    const responseFacebook = (response) => {
        console.log(response);
        setIslogin(true)
        setName(response.name)
        setEmail(response.email)
        setimage(response.picture.data.url)
    };

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setimage] = useState("")
    const [isLogin, setIslogin] = useState(false)

    return (
        <div className="facebook-log">
            {
                isLogin ? (
                    <div>  
                        <h1>{name}</h1>
                        <h1>{email}</h1>
                        <img src={image} />
                    </div>
                ) : (
                    <FacebookLogin
                        // appId="672059003733065"
                        autoLoad
                        callback={responseFacebook}
                        fields="name,picture,email"
                        render={renderProps => (
                            <button onClick={renderProps.onClick}>Continue with Facebook</button>
                        )}
                    />
                )
            }
        </div>
    )
}
