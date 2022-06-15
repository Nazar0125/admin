import React from "react";
import Modal from 'react-modal';
import {applicationsApi} from '../../utils/api/applicationsApi';
import {deleteApplicationsAC} from '../../store/ducks/applications/actionCreators'
import { useDispatch } from "react-redux";
import {LinearIndeterminate} from '../../components/loading/linearProgress'

export const DeleteApplications = ({id}) => {
    let dispatch = useDispatch()
    let [isDelete, setIsDelete] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const openModal = () => {
        setIsDelete(true);
    }
  
    const closeModal = () => {
        setIsDelete(false);
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await applicationsApi.deleteApplicationsApi(id);
            setIsDelete(false)
            dispatch(deleteApplicationsAC(id))
            setLoading(false)
        } catch(error) {
            console.log('deleteObjects', error)
            setLoading(true)
        }
    };
    return (
        <>
            <span onClick={openModal} className = "deleteTemplate">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2.66667H11.9333C11.7786 1.91428 11.3692 1.23823 10.7741 0.752479C10.1791 0.266727 9.43478 0.000969683 8.66665 0L7.33331 0C6.56518 0.000969683 5.82086 0.266727 5.22581 0.752479C4.63077 1.23823 4.22138 1.91428 4.06665 2.66667H1.99998C1.82317 2.66667 1.6536 2.7369 1.52858 2.86193C1.40355 2.98695 1.33331 3.15652 1.33331 3.33333C1.33331 3.51014 1.40355 3.67971 1.52858 3.80474C1.6536 3.92976 1.82317 4 1.99998 4H2.66665V12.6667C2.6677 13.5504 3.01923 14.3976 3.64413 15.0225C4.26902 15.6474 5.11625 15.9989 5.99998 16H9.99998C10.8837 15.9989 11.7309 15.6474 12.3558 15.0225C12.9807 14.3976 13.3323 13.5504 13.3333 12.6667V4H14C14.1768 4 14.3464 3.92976 14.4714 3.80474C14.5964 3.67971 14.6666 3.51014 14.6666 3.33333C14.6666 3.15652 14.5964 2.98695 14.4714 2.86193C14.3464 2.7369 14.1768 2.66667 14 2.66667ZM7.33331 1.33333H8.66665C9.08016 1.33384 9.4834 1.46225 9.82106 1.70096C10.1587 1.93967 10.4143 2.27699 10.5526 2.66667H5.44731C5.5857 2.27699 5.84125 1.93967 6.1789 1.70096C6.51656 1.46225 6.9198 1.33384 7.33331 1.33333ZM12 12.6667C12 13.1971 11.7893 13.7058 11.4142 14.0809C11.0391 14.456 10.5304 14.6667 9.99998 14.6667H5.99998C5.46955 14.6667 4.96084 14.456 4.58577 14.0809C4.21069 13.7058 3.99998 13.1971 3.99998 12.6667V4H12V12.6667Z" fill="#EB5757"/>
                    <path d="M6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333V7.33334C7.33333 7.15653 7.2631 6.98696 7.13807 6.86193C7.01305 6.73691 6.84348 6.66667 6.66667 6.66667C6.48986 6.66667 6.32029 6.73691 6.19526 6.86193C6.07024 6.98696 6 7.15653 6 7.33334V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12Z" fill="#EB5757"/>
                    <path d="M9.33335 12C9.51016 12 9.67973 11.9298 9.80476 11.8047C9.92978 11.6797 10 11.5101 10 11.3333V7.33334C10 7.15653 9.92978 6.98696 9.80476 6.86193C9.67973 6.73691 9.51016 6.66667 9.33335 6.66667C9.15654 6.66667 8.98697 6.73691 8.86195 6.86193C8.73693 6.98696 8.66669 7.15653 8.66669 7.33334V11.3333C8.66669 11.5101 8.73693 11.6797 8.86195 11.8047C8.98697 11.9298 9.15654 12 9.33335 12Z" fill="#EB5757"/>
                </svg>
            </span>
            <Modal
                isOpen = {isDelete}
                onRequestClose = {closeModal}
                contentLabel = "Example Modal"
                className={'sdsa'}
                ariaHideApp = {false}
                style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(51, 51, 51, 0.50)'
                    }
                  }}
            >
                    <div className="delete-modal">
                        {
                            loading ?
                            <>
                                <p className="delete-modal__content">
                                    Удаление
                                </p>
                                <LinearIndeterminate />
                            </>
                            :
                            <>
                            <p className="delete-modal__content">
                                Вы уверены что хотите удалить эту заявку?
                            </p>
                            <div className="delete-modal__footer">
                                <div className="delete-modal__no" onClick = {closeModal}>
                                    Отмена
                                </div>
                                <div className="delete-modal__yes" onClick={() => onDelete()}>
                                    Подтвердить
                                </div>
                            </div>
                        </>
                        }                
                    </div>
            </Modal>
        </>
    )
};