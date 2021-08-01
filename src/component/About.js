import { useLocation } from "react-router-dom"

export const About = ()=>{
    const {location} = useLocation();
    const { fromNotifications } = location.state
    return(
        <div>
            this is about component {fromNotifications}
        </div>
    )
}