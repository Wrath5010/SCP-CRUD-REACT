import { useState, useEffect } from 'react';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import { db } from './fbconfig';
import UpdateComponent from './UpdateComponent';

export let fetchData;

function ReadComponent()
{
    // Reference the SCP collection
    const scpCollection = collection(db, "SCP");
    const [readData, setReadData] = useState([]);
    const [updateId, setUpdateID] = useState([]);

    fetchData = async () => {
        try{
            const snapshot = await getDocs(scpCollection);
            setReadData(
                snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
            );
        }
        catch(error)
        {
            console.error("Error fetching data: ", error);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    useEffect(() => {fetchData()}, []);

    const handDelete = async (id) =>{
            const docRef = doc(db, "SCP", id);
            try{
                await deleteDoc(docRef);
            }
            catch(error)
            {
                console.error("Error deleting document: ", error)
            }
            fetchData();
        }


    const handleRefresh = () =>{
        setUpdateID(null)
        fetchData();
    }

    return(
        <>
            <div className='Document'>
                {
                    readData.map(
                        ({id, scp, scpClass, ContainInfo, Description, imageURL}) =>(
                            <div key={id} className='scp-doc-details'>
                                <div className='flex-info'>
                                    <div>
                                        <h1>Name:</h1>
                                        <h1>{scp}</h1>
                                        <h3>Class:</h3>
                                        <h2>{scpClass}</h2>
                                        <h3>Description Information:</h3>
                                        <p>{Description}</p>
                                    </div>
                                    
                                    {imageURL &&
                                    <img src={imageURL} alt="SCP" className='scp-image' />
                                    }
                                    
                                </div>

                                <h4>Containment Information:</h4>
                                <p>{ContainInfo}</p>

                                <div className='flex-info-btns'>
                                    <button onClick={()=>handDelete(id)} className='delete-btn'>Delete Document</button>
                                    <button onClick={()=> setUpdateID(id)} className='update-btn'>Update Document</button>
                                </div>

                                {
                                    updateId === id &&(
                                        <UpdateComponent
                                            id={id}
                                            initialSCP = {scp}
                                            initialClass={scpClass}
                                            initialDescription={Description}
                                            initialContainmentInfo={ContainInfo}
                                            onUpdated={handleRefresh}
                                        />
                                    )
                                }
                            </div>
                        )
                    )
                }
            </div>
            
            <div className='btn-container-read-scroll-up'>
                <button id="returnToTopButton" onClick={scrollToTop} className='returnToTopButton'>Scroll to Top</button>
            </div>

        </>
    )
}

export default ReadComponent;