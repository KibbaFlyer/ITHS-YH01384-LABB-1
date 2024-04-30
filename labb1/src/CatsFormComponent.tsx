import { useState, useRef, useEffect } from 'react';
import PopupComponent from './PopupComponent';
import { catDataObject } from './PopupComponent';

function CatsFormComponent() {
    const [name, setName] = useState("");
    const [furColor, setFurColor] = useState("");
    const [description, setDescription] = useState("");
    const renderAmount = useRef(0);
    const [catData, setCatData] = useState<catDataObject>({
        name: '',
        furColor: '',
        description: ''
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [picture, setPicture] = useState("");

    useEffect(() =>{
        renderAmount.current = renderAmount.current + 1;
    })

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        // MDN WEB DOCS used for treating of the response img: 
        // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
        fetch("https://cataas.com/cat?height=200")
            .then(response => response.body)
            .then(body => {
                const reader = body?.getReader()
                return new ReadableStream({
                    start(controller) {
                        return pump();
                        function pump(): unknown {
                            return reader?.read().then(({ done, value }) => {
                                // When no more data needs to be consumed, close the stream
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                // Enqueue the next data chunk into our target stream
                                controller.enqueue(value);
                                return pump();
                            });
                        }
                    },
                });
            })
            // Create a new response out of the stream
            .then((stream) => new Response(stream))
            // Create an object URL for the response
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            // Update image
            .then((url) => {
                setPicture(url)
                setOpenPopup(true);
                setCatData({
                    "name": name,
                    "furColor": furColor,
                    "description": description
                })
            })
            .catch((err) => console.error(err));
    }

    const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleSetFurColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFurColor(event.target.value);
    }

    const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setDescription(event.target.value);
    }

    return (
        <>
            {openPopup && <PopupComponent setOpenPopup={setOpenPopup} picture={picture} catData={ catData } />}
            <form onSubmit={handleSubmit} className="component">
                <h1>Create your favorite cat!</h1>
                <div className="form">
                    <label>Cat Name </label>
                    <input type="text" value={name} onChange={handleSetName} className="form-rows" />
                    <br />
                    <br />
                    <label>Fur color </label>
                    <input type="text" value={furColor} onChange={handleSetFurColor} className="form-rows" />
                    <br />
                    <br />
                    <label>Description </label>
                    <input type="text" value={description} onChange={handleSetDescription} className="form-rows" />
                </div>
                <button type="submit" className='cat-button'>Submit</button>
                <div>I have rendered {renderAmount.current} times</div>
            </form>
        </>
    )
}

export default CatsFormComponent;