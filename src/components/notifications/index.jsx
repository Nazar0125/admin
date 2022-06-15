import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export const Notifications = () => {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
        <>
        {
            isOpen &&
            <div className = "notifications">
                <div className = "notifications-left">
                    <CheckCircleIcon style = {{color: '#03cc14'}}/>
                    <p className = "notifications-text">
                        Успешно сохранено
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
