import {render,screen} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from "../navbar";

describe('Navbar',()=>{

    it('should render without fail',()=>{
        const {getByText} = render(<Router><NavBar/></Router>);
        expect(getByText(/eCommerce/i)).toBeDefined();
        expect(getByText(/Home/i)).toBeDefined();
    })
})
