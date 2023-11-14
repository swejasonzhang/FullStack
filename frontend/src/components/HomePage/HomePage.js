import amazeonhomepage from '../images/amazeonhomepage.jpeg'

import './HomePage.css'

const HomePage = () => {
    return (
        // <>
            <div className="navbar">
                
                <div className="divamazeonhome">
                    <img className="amazeonhomepage" src={amazeonhomepage} alt="amazeonhomemain"></img>
                </div>

                <div class="search-container">
                    <button class="catagories">All</button>
                    <input type="text" class="search-box" placeholder="Search Amazeon"></input>
                    <button class="search-button">Search</button>
                </div>

                <div>Hello User</div>
                <div>Cart</div>
            </div>
        // </>
    )
}

export default HomePage;