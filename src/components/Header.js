function Header(){
    return(
        <div className="dotted-border">
        <nav>
          <ul>
            
            <div className="inline" style={{marginLeft:"100px", fontSize:"20px", fontWeight:"bold"}}>
              <li className="inline" ><a>Todo List</a></li>
            </div>
            <div className="inline" style={{paddingLeft:"60%"}}>
              <li className="inline" style={{paddingRight:"30px"}}><a>Hi,  Firstname</a></li>
              <li className="inline"><a><button className="btn">Logout</button></a></li>
            </div>
          </ul>
        </nav>
      </div>
    )
}

export default Header;