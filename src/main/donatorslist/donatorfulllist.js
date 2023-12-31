import { useEffect, useState } from "react";
import { dataRef } from "../../firebase";
import Topmain from "../topmain";
import "./donatorlist.css"
export default function DonatorFullList(){
    const imagePerRow = 3;
    let [donationDetails,setDonationDetails] = useState([]);
    let [filter,setFilter] = useState(true);
    useEffect(() =>{
        dataRef.ref().child("Donators").on('value', data =>{
            const getData = Object.values(data.val());            
                setDonationDetails(getData)
        })
    },[])

    const [next, setNext] = useState(imagePerRow);
    const handleMoreImage = () => {
        setNext(next + imagePerRow);
      };
      const handleLessImage = () => {
        setNext(next - imagePerRow);
      };
    let finalDetails = filter === true ? donationDetails.sort((a,b) => new Date(b.todaysDate) - new Date(a.todaysDate)) : donationDetails.sort((a,b) => b.kg - a.kg); 
    return (
        <div className="donators-fulllist-container">
            <Topmain />
            <div className="donators-list-container">
                <div className="donators-list-filter">
                    <button onClick={() =>{
                        setFilter(true)
                    }}>MOST RECENT</button>
                    <button onClick={(e) => {
                        setFilter(false)
                }}>MOST TRASH</button>
                </div>
                {finalDetails?.slice(0,next).map(value => {
                    return (
                        <div key={value.key} className="donatorslist-donators">
                            <div className="donatorslist-donators-top">
                                <h4>{value.displayName}</h4>
                                <p>{value.message}</p>
                            </div>
                            <div  className="donatorslist-donators-bottom">
                                <h4>{value.kg} KGS</h4>
                                <p>{value.todaysDate}</p>
                            </div>
                        </div>
                    )
                })}
                <div className="showmore-less-donators">
                {
                    next < finalDetails?.length && (
                        <button
                        className="donatorlist-showmoreless"
                        target="_blank" to="donatorfulllist"
                        onClick={handleMoreImage}
                        >
                        Load more
                        </button>
                    )
                }
                {
                    next > imagePerRow && (
                        <button
                        className="donatorlist-showmoreless"
                        onClick={handleLessImage}
                        >
                        Show less
                        </button>
                    )
                }
                </div>
            </div>
        </div>
    )
}