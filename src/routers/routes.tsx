import { BrowserRouter, Routes, Route } from 'react-router-dom'
//BrowserRouter -> Para iniciar el ruteado, el cómo se va a navegar.
//Routes        -> La lista de rutas que se va a ocupar.
//Route         -> La ruta como tal.
import Home from '../pages/Home'
import Matches from '../pages/Matches'
import Clubs from '../pages/Clubs'
import Rules from '../pages/Rules'
import News from '../pages/News'

function MyRoutes() {
    return (
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/matches' element={ <Matches/> } />
            <Route path='/clubs' element={ <Clubs/> } />
            <Route path='/rules' element={ <Rules/> } />
            <Route path='/news' element={ <News/> } />
        </Routes>    
    )
}

export default MyRoutes