import moonDark from "/images/icon-moon-dark.svg"
import moonLight from "/images/icon-moon-light.svg"
import sunDark from "/images/icon-sun-dark.svg"
import sunLight from "/images/icon-sun-light.svg"
import "./header.scss"



export default function Header({colorTheme, toggleColorTheme}) {
    
  return (
    <header className="header" style={{justifyContent: "flex-end"}}>
        <div className="selected-topic"></div>
        <div className="light-dark">
            <img src={colorTheme === "dark" ? sunLight: sunDark} alt="Sun icon for light theme" />

            <label className="switch">
                <input type="checkbox" onChange={toggleColorTheme}/>
                <span className="slider round"></span>
            </label>

            <img src={colorTheme === "dark" ? moonLight: moonDark} alt="Moon icon for light theme" />
        </div>
    </header>
)
}
