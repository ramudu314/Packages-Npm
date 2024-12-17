import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      justify="space-around"
      align="center"
      height="80px"
      backgroundColor="teal.400"  
      paddingX={8}
      color="white" 
      fontFamily="Arial, sans-serif"  
      margin="20px"
      boxShadow="md"  
    >
      <Link to="/" style={{ color: "white", textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
      <Link to="/add" style={{ color: "white", textDecoration: 'none', transition: 'color 0.3s' }}>Add Favorite</Link>
      <Link to="/fav" style={{ color: "white", textDecoration: 'none', transition: 'color 0.3s' }}>Favorite</Link>
    </Flex>
  );
};

export default Navbar;
