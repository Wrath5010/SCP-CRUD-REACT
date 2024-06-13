import {useState} from "react";
import {doc, updateDoc} from 'firebase/firestore';
import { db } from "./fbconfig";

function UpdateComponent({id, initialSCP, initialClass, initialContainmentInfo, initialDescription, onUpdated})
{
    const[scp, setSCP] = useState(initialSCP);
    const[scpClass, setClass] = useState(initialClass);
    const[Description, setDesc] = useState(initialDescription);
    const[ContainInfo, setContInfo] = useState(initialContainmentInfo);

    const handleUpdate = async(e) => {

        e.preventDefault();
        const documentRef = doc(db, "SCP", id);
        try{
            await updateDoc(documentRef, {scp: scp, scpClass: scpClass, Description: Description, ContainInfo: ContainInfo});
            onUpdated();
        }
        catch(error)
        {
            console.error("Error Updating Document", error)
        }
    }

    return(
        <>
            <form onSubmit={handleUpdate} className="UpdateForm">

                <div className="flex-row-update">
                    <h1 className="update-tagline-form">Update Form</h1>

                    <div>
                        <h3>Name:</h3>
                        <input type="text" value={scp} onChange={e=>setSCP(e.target.value)} placeholder="Enter SCP name" className="SCP-name"/>
                    </div>

                    <div>
                        <h3>Class:</h3>
                        <input type="text" value={scpClass} onChange={e=>setClass(e.target.value)} placeholder="SCP Class" className="SCP-class"/>
                    </div>

                </div>
                
                <div className="flex-row-update">
                    <div>
                        <h3>Description Information</h3>
                        <textarea value={Description} onChange={e=> setDesc(e.target.value)} placeholder="Enter Description" className="SCP-description"/>
                    </div>

                    <div className="flex-row-upd">
                        <div>  
                        <h3>Containment Information</h3>
                        <textarea type="text" value={ContainInfo} onChange={e=>setContInfo(e.target.value)} placeholder="Containment Information" className="SCP-Containment"/>
                        </div>
                    </div>
                </div>

                <div className="btn-container-flex">
                    <button type="submit" className="btn-update-form">Update SCP Document</button>
                </div>
            </form>
        </>
    );
}

export default UpdateComponent;