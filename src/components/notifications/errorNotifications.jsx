import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export const ErrorNotifications = ({text}) => {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
        <>
        {
            isOpen &&
            <div className = "notifications-error">
                <div className = "notifications-left">
                    <p className = "notifications-text">
                        {text}
                    </p>
                </div>
                <div className = "notifications-right" onClick = {() => setIsOpen(!isOpen)}>
                    <CloseIcon style = {{fontSize: '20px', color: '#22577E'}} />
                </div>
            </div> 
        }
        
        </>    
    )
};
