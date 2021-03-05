import {render} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import RightNav from "../right-nav";

describe('Right Nav',()=>{

    it('should render without fail',()=>{
        const {getByText} = render(<Router><RightNav/></Router>);
        expect(getByText(/MyOrder/i)).toBeInTheDocument();
        expect(getByText(/Home/i)).toBeInTheDocument();
        expect(getByText(/cart/i)).toBeInTheDocument()
    })
})
