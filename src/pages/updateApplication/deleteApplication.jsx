import React from "react";
import Modal from 'react-modal';
import {applicationsApi} from '../../utils/api/applicationsApi';
import {deleteApplicationsAC} from '../../store/ducks/applications/actionCreators'
import { useDispatch } from "react-redux";
import {LinearIndeterminate} from '../../components/loading/linearProgress'
import { useNavigate} from "react-router-dom";

export const DeleteApplication = ({id}) => {
    let dispatch = useDispatch()
    let navigate = useNavigate();

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
            let obj = await applicationsApi.deleteApplicationsApi(id);
            console.log(obj)
                setIsDelete(false)
                dispatch(deleteApplicationsAC(id))
                setLoading(false)
                return navigate(`/applications`);
        } catch(error) {
            console.log('deleteObjects', error)
            setLoading(true)
        }
    };
    return (
        <>
            <div className = "deleteBtn" onClick={openModal}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2.66667H10.9334C10.7786 1.91428 10.3693 1.23823 9.77421 0.752479C9.17916 0.266727 8.43484 0.000969683 7.66671 0L6.33337 0C5.56524 0.000969683 4.82092 0.266727 4.22587 0.752479C3.63083 1.23823 3.22144 1.91428 3.06671 2.66667H1.00004C0.82323 2.66667 0.65366 2.7369 0.528636 2.86193C0.403612 2.98695 0.333374 3.15652 0.333374 3.33333C0.333374 3.51014 0.403612 3.67971 0.528636 3.80474C0.65366 3.92976 0.82323 4 1.00004 4H1.66671V12.6667C1.66777 13.5504 2.0193 14.3976 2.64419 15.0225C3.26908 15.6474 4.11631 15.9989 5.00004 16H9.00004C9.88377 15.9989 10.731 15.6474 11.3559 15.0225C11.9808 14.3976 12.3323 13.5504 12.3334 12.6667V4H13C13.1769 4 13.3464 3.92976 13.4714 3.80474C13.5965 3.67971 13.6667 3.51014 13.6667 3.33333C13.6667 3.15652 13.5965 2.98695 13.4714 2.86193C13.3464 2.7369 13.1769 2.66667 13 2.66667ZM6.33337 1.33333H7.66671C8.08022 1.33384 8.48346 1.46225 8.82112 1.70096C9.15877 1.93967 9.41432 2.27699 9.55271 2.66667H4.44737C4.58576 2.27699 4.84131 1.93967 5.17897 1.70096C5.51662 1.46225 5.91986 1.33384 6.33337 1.33333ZM11 12.6667C11 13.1971 10.7893 13.7058 10.4143 14.0809C10.0392 14.456 9.53047 14.6667 9.00004 14.6667H5.00004C4.46961 14.6667 3.9609 14.456 3.58583 14.0809C3.21075 13.7058 3.00004 13.1971 3.00004 12.6667V4H11V12.6667Z" fill="#EC8383"/>
                </svg>
                <span>
                    Удалить заявку
                </span>
            </div>
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