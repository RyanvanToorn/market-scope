import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import { Menu } from "@components/Menu/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";



export interface BasicMenuProps {
    menuContent?: React.ReactNode;
}

export function BasicMenu(props: BasicMenuProps): React.ReactElement | null{

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    function toggleMenu(){
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <Button onClick={toggleMenu} variant="contained">
                <Icon icon={MenuIcon}/>
            </Button>
            <Menu isOpen={isMenuOpen}>
                {props.menuContent}
            </Menu>
        </>
    );
}