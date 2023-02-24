import './Header.css'
function Header()
{
    return(
            <header className=''>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-8">
                            <h3>$k Artworks.</h3>
                        </div>
                        <div className="col-md-8 d-none d-md-block ">
                            <ul>
                                <li><a href="/#">Game</a> </li>
                                <li><a href="/#">About</a></li>
                                <li><a href="/#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
    )
}
export default Header