import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Input,
  InputGroup,
  Button
} from "reactstrap";

import AppContext from "./../AppProvider/AppContext";
import { connect } from "./../../utils/renderWithContext";

import FavIcon from "./../../../static/img/favicon.png";
import FavIconText from "./../../../static/img/nav-text.png";

import "./NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoggedIn: false
    };
    this.navbar = React.createRef();

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log(props);
  }

  toggleNavbar() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  openNav = () => {
    const header = document.querySelector("#nav-bottom");
    //Clearing up the search input
    const search = document.querySelector("#nav-input");

    if (this.state.isOpen) {
      header.style.marginBottom = "0px";
      search.value = "";
    } else {
      header.style.marginBottom = "235px";
    }

    this.toggleNavbar();
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" fixed={"top"} id="header">
          <NavbarBrand href="/" className="nav-brand">
            <img
              src={FavIcon}
              alt="Main Logo"
              className="nav-img"
              id="head-img-1"
            />{" "}
            <img
              src={FavIconText}
              alt="ECEhub.in"
              className="nav-img__side"
              id="head-img-2"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.openNav} id="nav-toggler" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="subjects nav-elements">
                  Subjects
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Digital circuits and systems</DropdownItem>
                  <DropdownItem>Field and waves</DropdownItem>
                  <DropdownItem>Analog Electronics Circuits</DropdownItem>
                  <DropdownItem>Communication System</DropdownItem>
                  <DropdownItem>Power Electronics</DropdownItem>
                  <DropdownItem>CAO</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem className="nav-elements">
                <InputGroup>
                  <Input
                    id="nav-input"
                    className="search-input"
                    placeholder="Search for Articles"
                    // onChange={e => {
                    //   this.props.history.push(`/search?q=${e.target.value}`);
                    // }}
                    // autoFocus={true}
                  />
                </InputGroup>
              </NavItem>
              <NavItem className="nav-elements">
                <Button
                  color="success"
                  id="nav-btn"
                  className="add-article__btn"
                  onClick={() => (window.location.href = "/add")}
                >
                  Add Article
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div id="nav-bottom" />
      </div>
    );
  }
}

export default connect(NavBar)(AppContext);
