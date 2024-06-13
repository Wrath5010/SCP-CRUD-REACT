import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from './fbconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { fetchData } from './ReadComponent';

function CreateComponent() {
    const [scp, setSCP] = useState("");
    const [scpClass, setClass] = useState("");
    const [Description, setDesc] = useState("");
    const [ContainInfo, setContInfo] = useState("");
    const [image, setImage] = useState(null);
    const [containerVisible, setContainerVisible] = useState(false);
    const ourCollection = collection(db, "SCP");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Submitting form...");
    
        try {
            let imageURL = null;
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                imageURL = await getDownloadURL(imageRef);
                console.log("Uploading image successful:", imageURL);
            }
    
            await addDoc(ourCollection, {
                scp: scp,
                scpClass: scpClass,
                Description: Description,
                ContainInfo: ContainInfo,
                imageURL: imageURL
            });
    
            console.log("Document created successfully");
    
            fetchData();
            setSCP("");
            setClass("");
            setDesc("");
            setContInfo("");
            setImage(null);
    
        } catch (error) {
            console.error("Error creating document: ", error);
        }
    };


    


    function enablebtn() {
        setContainerVisible(!containerVisible);
    };

    const handleCancel = () => {
        setSCP("");
        setClass("");
        setDesc("");
        setContInfo("");
        setImage(null);
        setContainerVisible(false);
    };


    return (
        <>  
            <div style={{ display: containerVisible ? 'none' : 'block' }}>
                <div className="access-container">
                <h3>Want to document an SCP? </h3>
                <button className="access-btn-create-cont" onClick={enablebtn}>Create SCP</button>
                </div>
            </div>
            

            <div className="Create-container-SCP" id="Create-container-SCP" style={{ display: containerVisible ? 'block' : 'none' }}>

                <form onSubmit={handleSubmit}>

                    <h2 className="Create-scp-tagline">Add SCP Creature:</h2>

                    <div className="Flex-container">
                        <div>
                            <h3>Name:</h3>
                            <input placeholder="Enter SCP Name" className="name-input" value={scp} onChange={e => setSCP(e.target.value)}></input>

                            <h3>SCP Description:</h3>

                            <textarea id="description" name="description" rows="4" cols="50" placeholder="Write SCP Description" className="description-input" value={Description} onChange={e => setDesc(e.target.value)}></textarea>
        
                            <h3>SCP Containment Information:</h3>

                            <textarea id="Containment_info" name="Container Information" rows="4" cols="50" placeholder="Write SCP Containment Information" className="containment-input" value={ContainInfo} onChange={e => setContInfo(e.target.value)}></textarea>
                        </div>

                        <div className="second-container-scp-create">
                            <h3>Class of the SCP:</h3>

                            <input className="select-input" type="text" value={scpClass} onChange={e => setClass(e.target.value)} placeholder="Class"/>

                            <div className="image-container">
                                <h3>Insert SCP Image:</h3>

                                <input type="file" className="image-input" onChange={e => setImage(e.target.files[0])} />
                            </div>

                            <div className="btn-create-cancel-container">
                                <button className="Cancel-btn" onClick={handleCancel} type="button">Cancel</button>
                                
                                <button className="Create-btn" type="submit" >Submit SCP</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateComponent;
