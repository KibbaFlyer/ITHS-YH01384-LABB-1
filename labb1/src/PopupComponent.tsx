interface PopupComponentProps {
    setOpenPopup: (value: boolean) => void;
    picture: string | ArrayBuffer | null;
    catData: catDataObject
}

export interface catDataObject {
    name: string,
    furColor: string,
    description: string
}


function PopupComponent({ setOpenPopup, picture, catData }: PopupComponentProps) {

    const closePopup = () => {
        setOpenPopup(false);
    }

    return (
        <>
            <div className="popup-background" onClick={closePopup} />
            <div className="popup">
                <div className="popup-button" onClick={closePopup}>
                    <span>&times;</span>
                </div>
                <div className="popupHeader">
                    <h2>Created Cat</h2>
                </div>
                <div>
                    <div className="popupBody">
                        {picture && <img className="popupPicture" src={picture.toString()}></img>}
                        <div className="popupTextBody">
                            <div >
                                <p className="header">Name</p>
                                <p className="bodyText">{catData.name}</p>
                            </div>
                            <div >
                                <p className="header">Fur Color</p>
                                <p className="bodyText">{catData.furColor}</p>
                            </div>
                            <div>
                                <p className="header">Description</p>
                                <p className="bodyText">{catData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupComponent;